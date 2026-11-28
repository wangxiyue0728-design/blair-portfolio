window.renderDocumentaryProject=function(React,p){
 const h=React.createElement;
 const paragraphs=text=>(text||'').split(/\n\n+/).map((s,i)=>h('p',{key:i},s));
 return h('article',{className:'dfl-project doc-project','data-testid':'documentary-project'},
  h('a',{href:'/blairwang.portfolio/work/directing',className:'dfl-back'},'← Brain · Directing, Art Direction & Design'),
  h('header',{className:'dfl-header'},
   h('p',{className:'dfl-eyebrow'},'ARCHIVAL / DESKTOP DOCUMENTARY · 2026'),
   h('h1',null,p.title),
   h('p',{className:'doc-course'},'Final film · Documentary Production · Spring 2026'),
   h('div',{className:'dfl-meta'},h('span',null,'All roles · Xiyue “Blair” Wang · 王晰乐'),h('span',null,'Solo project'),h('span',null,'MIT 392'),h('span',null,'5 min 19 sec · English · Qatar / China')),
   h('a',{href:location.pathname + '#watch-film',className:'dfl-bottom'},'Watch the film ↓')),
  h('section',{id:'watch-film',className:'doc-watch','aria-label':'Watch Feb 28_Mar12.mov'},
   h('p',{className:'dfl-eyebrow'},'THE FILM'),
   h('div',{className:'doc-player'},h('iframe',{src:p.video_embed_url,title:'Feb 28_Mar12.mov — full documentary',loading:'lazy',allow:'fullscreen; encrypted-media',allowFullScreen:true})),
   h('a',{href:p.video_url,target:'_blank',rel:'noopener noreferrer',className:'doc-drive-link'},'Open the film in Google Drive ↗')),
  h('section',{className:'doc-story'},h('p',{className:'dfl-eyebrow'},'DIGITAL TRACES, PERSONAL HISTORY'),h('h2',null,'Logline'),h('p',{className:'doc-logline'},p.logline),h('h2',null,'Synopsis'),...paragraphs(p.description)),
  h('section',{className:'dfl-note doc-statement'},h('p',{className:'dfl-eyebrow'},'FROM THE DIRECTOR'),h('h2',null,'Director’s statement'),...paragraphs(p.directors_statement)),
  h('a',{className:'dfl-bottom',href:'/blairwang.portfolio/work/directing'},'Explore more work ↗'));
};
