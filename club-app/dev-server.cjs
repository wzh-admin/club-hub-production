'use strict';
/* 阶段五 A：本地真实配置运行入口。
 * 只在内存中读取 .env / 环境变量，不生成配置文件、不打印密钥。
 * 生产部署应使用部署平台的安全环境变量注入，不应把本脚本当作生产服务器。
 */
const http=require('http');
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname);
const port=Number(process.env.PORT||4173);
const envPath=path.join(root,'.env');
const env={};
if(fs.existsSync(envPath)){
  for(const line of fs.readFileSync(envPath,'utf8').split(/\r?\n/)){
    const match=line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if(match)env[match[1]]=match[2].replace(/^['"]|['"]$/g,'');
  }
}
const url=String(process.env.SUPABASE_URL||env.SUPABASE_URL||'').trim();
const anonKey=String(process.env.SUPABASE_ANON_KEY||env.SUPABASE_ANON_KEY||'').trim();
const configScript=`window.CLUB_SUPABASE_CONFIG=${JSON.stringify({url,anonKey})};`;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.mp4':'video/mp4','.woff':'font/woff','.woff2':'font/woff2'};
const safePath=requestPath=>{
  const decoded=decodeURIComponent(requestPath.split('?')[0]);
  const candidate=path.resolve(root,decoded.replace(/^[/\\]+/,''));
  return candidate===root||candidate.startsWith(root+path.sep)?candidate:null;
};
const server=http.createServer((req,res)=>{
  try{
    if(req.url.split('?')[0]==='/supabase-config.js'){
      res.writeHead(200,{'Content-Type':'text/javascript; charset=utf-8','Cache-Control':'no-store'});res.end(configScript);return;
    }
    let file=safePath(req.url==='/ ' ? '/index.html' : (req.url==='/'?'/index.html':req.url));
    if(!file){res.writeHead(403);res.end('Forbidden');return;}
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file)){res.writeHead(404);res.end('Not found');return;}
    res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);
  }catch(error){res.writeHead(500);res.end('Internal server error');}
});
server.listen(port,'127.0.0.1',()=>console.log(`同好据点本地服务已启动：http://127.0.0.1:${port}`));

