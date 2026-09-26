/* 阶段五 A：Supabase 浏览器适配层。未配置时不加载远程 SDK，并明确返回未配置状态。 */
(function(){
  'use strict';
  const raw=window.CLUB_SUPABASE_CONFIG||{},url=String(raw.url||'').trim(),anonKey=String(raw.anonKey||'').trim();
  const configured=Boolean(url&&anonKey&&/^https:\/\/[^\s]+\.supabase\.co(?:\/.*)?$/i.test(url));
  const backend={status:configured?'loading':'unconfigured',client:null,user:null,profile:null,memberships:[],pendingMemberships:[],pendingApplications:[],participations:[],eventInterests:[],companionIntents:[],groupMemberships:[],interestGroups:[],error:null,ready:null};
  const normalizeError=error=>{if(!error)return '未知错误';if(typeof error==='string')return error;return error.message||error.error_description||'请求失败';};
  const loadSdk=()=>import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  backend.ready=(async()=>{
    if(!configured){backend.status='unconfigured';return backend;}
    try{
      const sdk=await loadSdk();
      backend.client=sdk.createClient(url,anonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
      const {data,error}=await backend.client.auth.getSession();
      if(error)throw error;
      backend.user=data?.session?.user||null;
      backend.status=backend.user?'authenticated':'anonymous';
      if(backend.user)await backend.refreshProfile();
    }catch(error){backend.status='error';backend.error=normalizeError(error)}
    return backend;
  })();
  backend.refreshProfile=async()=>{
    if(!backend.client||!backend.user)return null;
    const [{data:profile,error:profileError},{data:memberships,error:membershipError},{data:pendingApplications,error:applicationError},{data:participations,error:participationError},{data:eventInterests,error:eventInterestError},{data:companionIntents,error:companionError},{data:groupMemberships,error:groupMembershipError},{data:interestGroups,error:interestGroupError}]=await Promise.all([
      backend.client.from('users').select('id,nickname,avatar,school_id,created_at').eq('id',backend.user.id).maybeSingle(),
      backend.client.from('club_members').select('id,club_id,user_id,role,status,joined_at,clubs(id,name,description,logo,school_id,status,created_at)').eq('user_id',backend.user.id),
      backend.client.rpc('list_pending_club_join_requests'),
      backend.client.from('event_participants').select('id,event_id,user_id,status,joined_at').eq('user_id',backend.user.id),
      backend.client.from('event_interests').select('id,event_id,user_id,status,created_at,updated_at').eq('user_id',backend.user.id),
      backend.client.from('event_companion_intents').select('id,event_id,user_id,status,visibility,created_at,updated_at').eq('user_id',backend.user.id),
      backend.client.from('group_memberships').select('id,group_id,user_id,status,created_at,updated_at').eq('user_id',backend.user.id),
      backend.client.from('interest_groups').select('id,creator_id,name,description,tags,school_id,join_mode,status,created_at').eq('status','active').order('created_at',{ascending:false})
    ]);
    if(profileError)throw profileError;
    if(membershipError)throw membershipError;
    if(participationError)throw participationError;
    if(eventInterestError)throw eventInterestError;if(companionError)throw companionError;if(groupMembershipError)throw groupMembershipError;if(interestGroupError)throw interestGroupError;
    const relations=memberships||[];backend.profile=profile||null;backend.memberships=relations.filter(item=>item.status==='active');backend.pendingMemberships=relations.filter(item=>item.status!=='active');backend.pendingApplications=applicationError?[]:(pendingApplications||[]);backend.participations=participations||[];backend.eventInterests=eventInterests||[];backend.companionIntents=companionIntents||[];backend.groupMemberships=groupMemberships||[];backend.interestGroups=interestGroups||[];return backend;
  };
  backend.signIn=async(email,password)=>{
    await backend.ready;if(!backend.client)throw new Error('未配置后端');
    const {data,error}=await backend.client.auth.signInWithPassword({email,password});if(error)throw error;
    backend.user=data.user;backend.status='authenticated';await backend.refreshProfile();return backend;
  };
  backend.signUp=async(email,password,nickname)=>{
    await backend.ready;if(!backend.client)throw new Error('未配置后端');
    const {data,error}=await backend.client.auth.signUp({email,password,options:{data:{nickname}}});if(error)throw error;
    // 开启邮箱验证时，Supabase 会返回 user 但暂不返回 session；此时不能以匿名身份直写 users。
    backend.user=data.session?.user||null;backend.status=backend.user?'authenticated':'anonymous';
    if(backend.user){const {error:profileError}=await backend.client.from('users').upsert({id:backend.user.id,nickname:nickname||email.split('@')[0]},{onConflict:'id'});if(profileError)throw profileError;await backend.refreshProfile();}
    return {needsEmailConfirmation:Boolean(data.user&&!data.session),user:data.user||null};
  };
  backend.updateProfile=async nickname=>{
    await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');
    const next=String(nickname||'').trim();if(next.length<1||next.length>40)throw new Error('昵称需要为 1 到 40 个字符。');
    const {data,error}=await backend.client.from('users').update({nickname:next}).eq('id',backend.user.id).select('id,nickname,avatar,school_id,created_at').single();
    if(error)throw error;backend.profile=data||{...(backend.profile||{}),nickname:next};return backend.profile;
  };
  backend.signOut=async()=>{await backend.ready;if(backend.client){const {error}=await backend.client.auth.signOut();if(error)throw error}backend.user=null;backend.profile=null;backend.memberships=[];backend.pendingMemberships=[];backend.pendingApplications=[];backend.participations=[];backend.status=backend.client?'anonymous':'unconfigured';backend.eventInterests=[];backend.companionIntents=[];backend.groupMemberships=[];backend.interestGroups=[];};
  backend.getPublicClubs=async()=>{await backend.ready;if(!backend.client)throw new Error('未配置后端');const {data,error}=await backend.client.from('clubs').select('id,name,description,logo,school_id,status,created_at').eq('status','active').order('created_at',{ascending:false});if(error)throw error;return data||[]};
  backend.getInterestGroups=async()=>{await backend.ready;if(!backend.client)throw new Error('未配置后端');const {data,error}=await backend.client.from('interest_groups').select('id,creator_id,name,description,tags,school_id,join_mode,status,created_at').eq('status','active').order('created_at',{ascending:false});if(error)throw error;return data||[]};
  backend.getLeaderEvents=async()=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('list_leader_events');if(error)throw error;return data||[]};
  backend.getLeaderEventRoster=async eventId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('list_leader_event_roster',{target_event_id:eventId});if(error)throw error;return data||[]};
  backend.getPublishedEvents=async()=>{await backend.ready;if(!backend.client)throw new Error('未配置后端');const [eventResult,statsResult]=await Promise.all([backend.client.from('events').select('id,club_id,creator_id,title,description,location,start_at,deadline,capacity,min_people,status,created_at,event_kind,visibility,gathering_group_id,meeting_point,host_contact,organizer_note,clubs(id,name,logo),event_details(expected_scale,needs_intro,meet_point,welcome_host,requirements,roles)').eq('status','published').order('start_at',{ascending:true}),backend.client.rpc('get_published_event_stats')]);if(eventResult.error)throw eventResult.error;if(statsResult.error)throw statsResult.error;const stats=new Map((statsResult.data||[]).map(row=>[row.event_id,row]));return (eventResult.data||[]).map(row=>({...row,...(stats.get(row.id)||{confirmed_count:0,waitlisted_count:0,current_user_status:null})}))};
  backend.requestClubMembership=async clubId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.from('club_members').insert({club_id:clubId,user_id:backend.user.id,role:'member',status:'pending'}).select('id,club_id,user_id,role,status,joined_at').single();if(error){if(error.code==='23505')throw new Error('你已经提交过该社团的加入申请，当前状态仍在处理中。');throw error}return data};
  backend.reviewClubJoinRequest=async(membershipId,decision)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('review_club_join_request',{target_membership_id:membershipId,decision});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.setEventInterest=async(eventId,isInterested)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('set_event_interest',{target_event_id:eventId,is_interested:Boolean(isInterested)});if(error)throw error;return data};
  backend.setEventCompanionIntent=async(eventId,isSeeking,visibility='count_only')=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('set_event_companion_intent',{target_event_id:eventId,is_seeking:Boolean(isSeeking),requested_visibility:visibility});if(error)throw error;return data};
  backend.createInterestGroup=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('create_interest_group',{group_name:payload.name,group_description:payload.description||'',group_tags:payload.tags||[],group_join_mode:payload.joinMode||'request'});if(error)throw error;return data};
  backend.joinInterestGroup=async groupId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('join_interest_group',{target_group_id:groupId});if(error)throw error;return data};
  backend.leaveInterestGroup=async groupId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('leave_interest_group',{target_group_id:groupId});if(error)throw error;return data};
  backend.reviewInterestGroupMembership=async(membershipId,decision)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('review_interest_group_membership',{target_membership_id:membershipId,decision});if(error)throw error;return data};
  backend.createMemberGathering=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('create_member_gathering',{event_title:payload.title,event_description:payload.description||'',event_location:payload.location||'',event_start_at:payload.startAt,event_deadline:payload.deadline||null,event_capacity:payload.capacity,event_min_people:payload.minPeople||0,event_visibility:payload.visibility,event_meeting_point:payload.meetingPoint||'',event_host_contact:payload.hostContact||'',event_group_id:payload.groupId||null,event_status:payload.status||'published'});if(error)throw error;return data};  backend.joinEvent=async eventId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('join_event',{target_event_id:eventId});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.cancelEvent=async eventId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('cancel_event_participation',{target_event_id:eventId});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.createEvent=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('create_event',payload);if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.createClub=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('create_club',payload);if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.renameLeaderClub=async (clubId,name)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('rename_leader_club',{target_club_id:clubId,new_club_name:name});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.archiveLeaderClub=async (clubId,confirmationName)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('archive_leader_club',{target_club_id:clubId,confirmation_name:confirmationName});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.getLeaderTransferCandidates=async clubId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('list_club_lead_transfer_candidates',{target_club_id:clubId});if(error)throw error;return data||[]};
  backend.transferClubLeadership=async (clubId,targetUserId,confirmationName)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('transfer_club_leadership',{target_club_id:clubId,target_user_id:targetUserId,confirmation_name:confirmationName});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.createEventWithDetails=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('create_event_with_details',payload);if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.updateLeaderEvent=async payload=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('update_leader_event',payload);if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.cancelLeaderEvent=async eventId=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('cancel_leader_event',{target_event_id:eventId});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.promoteWaitlistedParticipant=async (participantId,reason)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('promote_waitlisted_participant',{target_participant_id:participantId,action_reason:reason});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  backend.cancelEventParticipantByLeader=async (participantId,reason)=>{await backend.ready;if(!backend.client||!backend.user)throw new Error('请先登录');const {data,error}=await backend.client.rpc('cancel_event_participant_by_leader',{target_participant_id:participantId,action_reason:reason});if(error)throw error;return Array.isArray(data)?data[0]||null:data};
  if(configured){backend.ready.then(()=>{if(backend.client)backend.client.auth.onAuthStateChange(async(_event,session)=>{backend.user=session?.user||null;backend.status=backend.user?'authenticated':'anonymous';if(backend.user){try{await backend.refreshProfile()}catch(error){backend.error=normalizeError(error)}}else{backend.profile=null;backend.memberships=[];backend.pendingMemberships=[];backend.pendingApplications=[]}window.dispatchEvent(new CustomEvent('club-auth-change'));});window.dispatchEvent(new CustomEvent('club-backend-ready'));});}
  window.clubBackend=backend;
})();








