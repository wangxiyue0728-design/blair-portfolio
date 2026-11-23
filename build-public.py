from pathlib import Path
import json,base64,mimetypes
root=Path(__file__).resolve().parent
source=root/'local-data.json'
if source.exists():
 d=json.loads(source.read_text()); data={'settings':d['settings'],'projects':d['projects']}
 (root/'public-data.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
else:data=json.loads((root/'public-data.json').read_text())
assets={}
for name in ['index.html','portrait-interactions.css','do-for-love.js','do-for-love.css','static/js/bundle.js','uploads/blair-portrait-cutout.png','uploads/do-for-love-teaser.jpg','uploads/do-for-love-script.pdf','uploads/do-for-love-visual-treatment.pdf','screenwriting.js','screenwriting.css','uploads/do-for-love-2025-screenplay-cover.svg','uploads/do-for-love-2025-screenplay.pdf','uploads/do-for-love-2025-treatment-logline.docx','documentary.js','documentary.css','uploads/feb-28-mar12-cover.svg','uploads/feb-28-mar12-dossier-cover.jpg','music-video.js','uploads/who-knows-music-video-cover.jpg','uploads/who-knows-music-video-pitch.pdf','music-video.css','uploads/who-knows-still-1.png','uploads/who-knows-still-2.png','uploads/who-knows-still-3.png','uploads/who-knows-still-4.png']:
 p=root/'dist'/name; mime=mimetypes.guess_type(name)[0] or 'application/octet-stream'
 raw=p.read_bytes()
 if name=='index.html':
  raw=raw.replace(b'</head>',b'<meta name="description" content="Blair Wang / Xiyue Wang - director, cinematographer, sound designer and producer. Explore an interactive filmmaking portfolio."><style>a[href="/admin"]{display:none!important}</style></head>')
 assets['/'+name]={'mime':mime,'body':base64.b64encode(raw).decode()}
worker='const DATA='+json.dumps(data,ensure_ascii=False)+';\nconst ASSETS='+json.dumps(assets)+';\n'+(root/'worker-handler.js').read_text()
out=root/'dist/server';out.mkdir(parents=True,exist_ok=True);(out/'index.js').write_text(worker)
print('Built public portfolio with',len(assets),'assets')
