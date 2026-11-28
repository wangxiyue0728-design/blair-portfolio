window.renderScreenwritingProject=function(React,p){
 const h=React.createElement;
 const paragraphs=text=>(text||'').split(/\n\n+/).map((s,i)=>h('p',{key:i},s));
 return h('article',{className:'dfl-project sw-project','data-testid':'screenwriting-project'},
  h('a',{href:'/blairwang.portfolio/work/directing',className:'dfl-back'},'← Brain · Directing, Art Direction & Design'),
  h('header',{className:'dfl-header'},
   h('p',{className:'dfl-eyebrow'},'SCREENWRITING · MIT 260-0 · FALL 2025'),
   h('h1',null,'Do for ',h('em',null,'Love')),
   h('p',{className:'sw-subtitle'},'The 2025 screenplay'),
   h('div',{className:'dfl-meta'},h('span',null,'Written by Xiyue “Blair” Wang · 王晰乐'),h('span',null,'Final class draft · 2025'))),
  h('div',{className:'dfl-body'},
   h('section',null,h('p',{className:'dfl-eyebrow'},'THE ORIGINAL STORY'),h('h2',null,'Logline'),h('p',{className:'sw-logline'},p.logline),h('h2',null,'Synopsis'),...paragraphs(p.description)),
   h('aside',{className:'dfl-materials'},h('p',{className:'dfl-eyebrow'},'ON THE PAGE'),h('h2',null,'Read the work'),...p.documents.map(doc=>h('a',{key:doc.label,href:doc.url,target:'_blank',rel:'noopener noreferrer'},doc.label+' ↗')))),
  h('section',{className:'sw-origin'},h('p',{className:'dfl-eyebrow'},'FROM CLASS SCRIPT TO STUDIO 20Q'),h('h2',null,'An early starting point'),...paragraphs(p.development_note),h('a',{href:'/blairwang.portfolio/project/do-for-love',className:'dfl-bottom'},'Explore the Studio 20Q film ↗')),
  h('section',{className:'dfl-note sw-treatment'},h('p',{className:'dfl-eyebrow'},'DEVELOPMENT MATERIAL'),h('h2',null,'Original treatment'),h('p',null,'The treatment is presented as originally written for the class. Character names and story details evolved in the final draft.'),h('details',null,h('summary',null,'Read the full treatment'),h('div',{className:'dfl-note-text'},...paragraphs(p.treatment)))),
  h('a',{className:'dfl-bottom',href:'/blairwang.portfolio/work/directing'},'Back to Brain ↗'));
};
