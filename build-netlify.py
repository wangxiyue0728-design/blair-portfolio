from pathlib import Path
import json,shutil,zipfile
root=Path(__file__).resolve().parent
out=root.parent/'netlify-publish';out.mkdir(exist_ok=True)
data=json.loads((root/'local-data.json').read_text())
public={'settings':data['settings'],'projects':data['projects']}
for name in ['portrait-interactions.css','do-for-love.js','do-for-love.css','screenwriting.js','screenwriting.css','documentary.js','documentary.css','music-video.js','music-video.css']:
 shutil.copy2(root/'dist'/name,out/name)
shutil.copytree(root/'dist/uploads',out/'uploads',dirs_exist_ok=True)
html=(root/'dist/index.html').read_text().replace('</head>','<style>a[href="/admin"]{display:none!important}</style><script src="/portfolio-data.js"></script></head>')
html=html.replace('<div id="root"></div>','<form name="portfolio-contact" method="POST" data-netlify="true" hidden><input name="form-name" value="portfolio-contact"><input name="name"><input name="email"><input name="topic"><textarea name="message"></textarea></form><div id="root"></div>')
(out/'index.html').write_text(html)
(out/'portfolio-data.js').write_text('window.PORTFOLIO_DATA='+json.dumps(public,ensure_ascii=False)+';')
s=(root/'dist/static/js/bundle.js').read_text()
needle='function errMsg(e) {'
adapter='''api.defaults.adapter = async config => {
 const data=window.PORTFOLIO_DATA;
 let value, status=200;
 if(config.method==='get'&&config.url==='/settings')value=data.settings;
 else if(config.method==='get'&&config.url==='/projects')value=[...data.projects].sort((a,b)=>(a.order||0)-(b.order||0));
 else if(config.method==='get'&&config.url.startsWith('/projects/'))value=data.projects.find(p=>p.slug===config.url.split('/').pop()||p.id===config.url.split('/').pop());
 else if(config.method==='post'&&config.url==='/messages'){
  const fields=typeof config.data==='string'?JSON.parse(config.data):config.data;
  const response=await fetch('/contact-submit.html',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({'form-name':'portfolio-contact',...fields}).toString()});
  if(!response.ok)throw new Error('Your message could not be sent. Please try again later.');
  value={ok:true};
 } else {const error=new Error('Editing is available through your local editor.');error.response={status:401,data:{detail:error.message}};throw error;}
 return {data:value,status,statusText:'OK',headers:{},config,request:null};
};
'''
assert s.count(needle)==1
s=s.replace(needle,adapter+needle)
folder=out/'static/js';folder.mkdir(parents=True,exist_ok=True);(folder/'bundle.js').write_text(s)
(out/'contact-submit.html').write_text('<!doctype html><html><title>Thank you</title><body><p>Thank you for your message.</p></body></html>')
(out/'_redirects').write_text('/api/uploads/* /uploads/:splat 200\n/* /index.html 200\n')
(out/'_headers').write_text('/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Cache-Control: public, max-age=0, must-revalidate\n')
archive=root.parent/'Blair_Portfolio_Netlify_Ready.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for f in out.rglob('*'):
  if f.is_file():z.write(f,str(f.relative_to(out)))
print(archive)
