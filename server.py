from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlparse,unquote
from email.parser import BytesParser
from email.policy import default
import json,secrets,uuid,re,threading,os
ROOT=Path(__file__).resolve().parent
DATA=ROOT/'local-data.json'
if not DATA.exists(): DATA.write_bytes((ROOT/'initial-data.json').read_bytes())
TOKEN=secrets.token_urlsafe(32)
LOCK=threading.RLock()
class Handler(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(ROOT/'dist'),**kwargs)
 def reply(self,data,status=200):
  raw=json.dumps(data).encode();self.send_response(status);self.send_header('Content-Type','application/json');self.send_header('Content-Length',str(len(raw)));self.end_headers();self.wfile.write(raw)
 def valid(self):return self.headers.get('Host','').split(':')[0] in ('127.0.0.1','localhost')
 def authed(self):return self.headers.get('Authorization')=='Bearer '+TOKEN
 def do_GET(self):
  if not self.valid():return self.reply({'detail':'Local access only'},403)
  path=unquote(urlparse(self.path).path)
  if path=='/local-editor':
   self.send_response(200);self.send_header('Content-Type','text/html');self.end_headers();self.wfile.write(('<script>localStorage.setItem("bw_token",'+json.dumps(TOKEN)+');location.replace("/admin")</script>').encode());return
  if path.startswith('/api/'):
   d=json.loads(DATA.read_text())
   if path=='/api/settings':return self.reply(d['settings'])
   if path=='/api/projects':return self.reply(sorted(d['projects'],key=lambda p:p.get('order',0)))
   if path.startswith('/api/projects/'):
    p=next((p for p in d['projects'] if path.split('/')[-1] in (p['id'],p['slug'])),None);return self.reply(p if p else {'detail':'Not found'},200 if p else 404)
   if path=='/api/auth/me':return self.reply({'email':'local-owner'} if self.authed() else {'detail':'Open /local-editor to edit on this computer'},200 if self.authed() else 401)
   if path=='/api/messages':return self.reply(d['messages'] if self.authed() else {'detail':'Sign in required'},200 if self.authed() else 401)
   if path.startswith('/api/uploads/'):
    self.path='/uploads/'+Path(path).name;return super().do_GET()
   return self.reply({'detail':'Not found'},404)
  if not (ROOT/'dist'/path.lstrip('/')).is_file():self.path='/index.html'
  super().do_GET()
 def do_POST(self):self.mutate('POST')
 def do_PUT(self):self.mutate('PUT')
 def do_PATCH(self):self.mutate('PATCH')
 def do_DELETE(self):self.mutate('DELETE')
 def mutate(self,method):
  if not self.valid():return self.reply({'detail':'Local access only'},403)
  origin=self.headers.get('Origin')
  if origin and origin not in ('http://localhost:4173','http://127.0.0.1:4173'):return self.reply({'detail':'Origin rejected'},403)
  path=urlparse(self.path).path
  if path!='/api/messages' or method!='POST':
   if not self.authed():return self.reply({'detail':'Open /local-editor to edit on this computer'},401)
  size=int(self.headers.get('Content-Length','0'))
  if size>100*1024*1024:return self.reply({'detail':'File exceeds 100 MB'},413)
  raw=self.rfile.read(size)
  if path=='/api/upload':
   msg=BytesParser(policy=default).parsebytes(('Content-Type: '+self.headers.get('Content-Type','')+'\r\nMIME-Version: 1.0\r\n\r\n').encode()+raw)
   part=next((x for x in msg.iter_parts() if x.get_filename()),None)
   if part is None:return self.reply({'detail':'No file'},400)
   suffix=Path(part.get_filename()).suffix.lower()
   if suffix not in ('.png','.jpg','.jpeg','.webp','.gif','.avif','.pdf','.mp4','.webm','.mov','.mp3','.wav','.ogg','.m4a'):return self.reply({'detail':'Unsupported file type'},400)
   name=uuid.uuid4().hex+suffix;folder=ROOT/'dist/uploads';folder.mkdir(exist_ok=True);(folder/name).write_bytes(part.get_payload(decode=True));return self.reply({'url':'/api/uploads/'+name})
  if path=='/api/ai/write':return self.reply({'detail':'AI provider is not connected. Writing can be edited directly or with ChatGPT.'},503)
  try:body=json.loads(raw or '{}')
  except ValueError:return self.reply({'detail':'Invalid JSON'},400)
  with LOCK:
   d=json.loads(DATA.read_text());out={'ok':True}
   if path=='/api/settings' and method=='PUT':d['settings'].update(body);out=d['settings']
   elif path=='/api/projects' and method=='POST':
    body.update(id=str(uuid.uuid4()),slug=re.sub(r'[^a-z0-9]+','-',body.get('title','project').lower()).strip('-')+'-'+secrets.token_hex(3));d['projects'].append(body);out=body
   elif path.startswith('/api/projects/'):
    ident=path.rsplit('/',1)[1];p=next((x for x in d['projects'] if x['id']==ident),None)
    if not p:return self.reply({'detail':'Not found'},404)
    if method=='DELETE':d['projects'].remove(p)
    else:p.update({k:v for k,v in body.items() if k!='id'});out=p
   elif path=='/api/messages' and method=='POST':
    from datetime import datetime,timezone
    if not body.get('email') or not body.get('message'):return self.reply({'detail':'Email and message required'},400)
    body.update(id=str(uuid.uuid4()),read=False,created_at=datetime.now(timezone.utc).isoformat());d['messages'].append(body)
   elif path.startswith('/api/messages/'):
    ident=path.split('/')[3];p=next((x for x in d['messages'] if x['id']==ident),None)
    if p and method=='DELETE':d['messages'].remove(p)
    elif p:p.update(body);out=p
   else:return self.reply({'detail':'Not found'},404)
   tmp=DATA.with_suffix('.tmp');tmp.write_text(json.dumps(d,ensure_ascii=False,indent=2));tmp.replace(DATA)
  self.reply(out)
if __name__=='__main__':
 print('Portfolio: http://127.0.0.1:4173\nLocal editor: http://127.0.0.1:4173/local-editor',flush=True)
 ThreadingHTTPServer(('127.0.0.1',4173),Handler).serve_forever()
