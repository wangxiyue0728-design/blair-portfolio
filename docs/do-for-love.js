window.renderDoForLove=function(React,p){
 const h=React.createElement;
 const paragraphs=(text)=>text.split(/\n\n+/).map((s,i)=>h('p',{key:i},s));
 return h('article',{className:'dfl-project','data-testid':'do-for-love-project'},
  h('a',{href:'/blairwang.portfolio/work/directing',className:'dfl-back'},'← Directing, Art Direction & Design'),
  h('header',{className:'dfl-header'},h('p',{className:'dfl-eyebrow'},'STUDIO 20Q · DIRECTOR'),h('h1',null,'Do for ',h('em',null,'Love')),h('p',{className:'dfl-chinese'},'以爱之名'),h('p',{className:'dfl-logline'},p.logline),
   h('div',{className:'dfl-meta'},h('span',null,'Director · Xiyue “Blair” Wang'),h('span',{className:'dfl-status'},'In post-production · Release 2027'),h('a',{href:p.instagram,target:'_blank',rel:'noopener noreferrer'},'Instagram · @doforlove2027 ↗'))),
  h('figure',{className:'dfl-teaser'},h('img',{src:p.cover_url,alt:'Do for Love teaser — a close-up of a child’s eye',width:1206,height:1507}),h('figcaption',null,'DO FOR LOVE · TEASER IMAGE · 2027')),
  h('div',{className:'dfl-body'},h('section',null,h('p',{className:'dfl-eyebrow'},'THE STORY'),h('h2',null,'Synopsis'),...paragraphs(p.description)),
  h('aside',{className:'dfl-materials'},h('p',{className:'dfl-eyebrow'},'BEHIND THE FILM'),h('h2',null,'Development materials'),h('p',null,'Screenplay and visual treatment.'),...p.documents.map(doc=>h('a',{key:doc.label,href:doc.url,target:'_blank',rel:'noopener noreferrer'},doc.label+' ↗')))),
  h('section',{className:'sw-origin'},h('p',{className:'dfl-eyebrow'},'AN EARLIER STARTING POINT'),h('h2',null,'Before the Studio 20Q film'),h('p',null,'My 2025 screenwriting project for MIT 260-0 was an early prototype for Do for Love. Its mother–daughter story differs substantially from the later film’s plot.'),h('a',{className:'dfl-bottom',href:'/blairwang.portfolio/project/do-for-love-screenwriting-2025'},'Read the 2025 screenplay ↗')),
  h('a',{className:'dfl-bottom',href:'/blairwang.portfolio/work/directing'},'Explore more work ↗'));
};
