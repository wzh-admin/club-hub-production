export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/supabase-config.js') {
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        return new Response('Method Not Allowed', {
          status: 405,
          headers: { Allow: 'GET, HEAD', 'Cache-Control': 'no-store' },
        });
      }

      const supabaseUrl = String(env.SUPABASE_URL || '').trim();
      const anonKey = String(env.SUPABASE_ANON_KEY || '').trim();
      let validUrl = false;

      try {
        const parsed = new URL(supabaseUrl);
        validUrl = parsed.protocol === 'https:'
          && /^[a-z0-9-]+\.supabase\.co$/i.test(parsed.hostname)
          && parsed.pathname === '/'
          && !parsed.search
          && !parsed.hash;
      } catch {
        validUrl = false;
      }

      const isPublicClientKey = anonKey.startsWith('sb_publishable_')
        || (() => {
          try {
            const payload = anonKey.split('.')[1];
            if (!payload) return false;
            const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
            const claims = JSON.parse(atob(normalized));
            return claims.role === 'anon';
          } catch {
            return false;
          }
        })();
      const configured = validUrl && isPublicClientKey;
      const config = configured
        ? { url: supabaseUrl.replace(/\/$/, ''), anonKey }
        : { url: '', anonKey: '' };
      const body = `window.CLUB_SUPABASE_CONFIG = ${JSON.stringify(config)};\n`;

      return new Response(request.method === 'HEAD' ? null : body, {
        status: configured ? 200 : 503,
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
