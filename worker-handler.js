const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
export default {async fetch(request,env){
 const url=new URL(request.url);let path=decodeURIComponent(url.pathname);
 if(path==='/api/settings'&&request.method==='GET')return json(DATA.settings);
 if(path==='/api/projects'&&request.method==='GET')return json([...DATA.projects].sort((a,b)=>(a.order||0)-(b.order||0)));
 if(path.startsWith('/api/projects/')&&request.method==='GET'){
  const id=path.split('/').pop(),p=DATA.projects.find(p=>p.id===id||p.slug===id);return json(p||{detail:'Not found'},p?200:404);
 }
 if(path==='/api/messages'&&request.method==='POST'){
  if(request.headers.get('Origin')!==url.origin)return json({detail:'Request origin rejected'},403);
  const raw=await request.text();if(raw.length>20000)return json({detail:'Message is too long'},413);
  let body;try{body=JSON.parse(raw)}catch{return json({detail:'Invalid message'},400)}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email||'')||!String(body.message||'').trim())return json({detail:'Enter a valid email and message'},400);
  if(!env.BUCKET)return json({detail:'Contact is temporarily unavailable. Please try again later.'},503);
  const id=crypto.randomUUID();await env.BUCKET.put('contact/'+id+'.json',JSON.stringify({id,name:String(body.name||'').slice(0,200),email:String(body.email).slice(0,254),subject:String(body.subject||'').slice(0,300),message:String(body.message).slice(0,10000),created_at:new Date().toISOString(),read:false}),{httpMetadata:{contentType:'application/json'}});
  return json({ok:true});
 }
 if(path.startsWith('/api/uploads/'))path='/uploads/'+path.split('/').pop();
 else if(path.startsWith('/api/'))return json({detail:'Owner access required'},401);
 if(request.method!=='GET'&&request.method!=='HEAD')return json({detail:'Method not allowed'},405);
 if(path==='/admin'||path.startsWith('/admin/')||path==='/local-editor')return new Response('Not found',{status:404});
 const asset=ASSETS[path]||(!path.split('/').pop().includes('.')?ASSETS['/index.html']:null);
 if(!asset)return new Response('Not found',{status:404});
 let bytes=Uint8Array.from(atob(asset.body),c=>c.charCodeAt(0)),status=200;
 const headers={'Content-Type':asset.mime,'Cache-Control':path==='/index.html'?'no-cache':'public, max-age=300','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes','Referrer-Policy':'strict-origin-when-cross-origin'};
 const range=request.headers.get('Range');
 if(range){const match=/^bytes=(\d+)-(\d*)$/.exec(range);if(match){const total=bytes.length,start=Number(match[1]),end=match[2]?Math.min(Number(match[2]),total-1):total-1;if(start>=total||end<start)return new Response(null,{status:416,headers:{'Content-Range':'bytes */'+total}});bytes=bytes.slice(start,end+1);headers['Content-Range']=`bytes ${start}-${end}/${total}`;status=206;}}
 headers['Content-Length']=String(bytes.length);
 return new Response(request.method==='HEAD'?null:bytes,{status,headers});
}};
