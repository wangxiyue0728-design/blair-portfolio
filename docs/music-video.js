window.renderMusicVideoProject=function(React,p){
 const h=React.createElement;
 return h('article',{className:'dfl-project mv-project','data-testid':'music-video-project'},
  h('a',{href:'/blairwang.portfolio/work/cinematography-photography',className:'dfl-back'},'← Eyes · Cinematography & Photography'),
  h('header',{className:'dfl-header'},
   h('p',{className:'dfl-eyebrow'},'STUDENT MUSIC VIDEO · SPRING 2026'),
   h('h1',null,'Who ',h('em',null,'Knows')),
   h('p',{className:'sw-subtitle'},'Music by Daniel Caesar'),
   h('div',{className:'dfl-meta'},h('span',null,'Cinematography & editing · Xiyue “Blair” Wang · 王晰乐'),h('span',null,'MIT 380: Lighting and Cinematography')),
   h('a',{href:location.pathname + '#watch-music-video',className:'dfl-bottom'},'Watch the music video ↓')),
  h('section',{className:'mv-stills',id:'stills','aria-label':'Who Knows film stills'},h('p',{className:'dfl-eyebrow'},'SELECTED FRAMES'),h('h2',null,'Stills'),h('div',{className:'mv-stills-grid'},...p.gallery.map((src,i)=>h('figure',{key:src},h('a',{href:src,target:'_blank',rel:'noopener noreferrer','aria-label':'Open still '+(i+1)+' at full size'},h('img',{src,alt:['A young man standing under warm interior light, with the subtitle “This is my boyfriend”','A young man lighting a cigarette beside a window at dusk','A young man holding a drink on a city street at night','A figure facing an illuminated church at night'][i],loading:'lazy',width:2048,height:1280})))))),
  h('section',{id:'watch-music-video',className:'doc-watch','aria-label':'Watch Who Knows music video'},
   h('p',{className:'dfl-eyebrow'},'THE MUSIC VIDEO'),
   h('div',{className:'doc-player'},h('iframe',{src:p.video_embed_url,title:'Who Knows — student music video',loading:'lazy',allow:'fullscreen; encrypted-media',allowFullScreen:true})),
   h('a',{href:p.video_url,target:'_blank',rel:'noopener noreferrer',className:'doc-drive-link'},'Open the music video in Google Drive ↗')),
  h('div',{className:'dfl-body'},
   h('section',null,h('p',{className:'dfl-eyebrow'},'THE CONCEPT'),h('h2',null,p.logline),h('p',null,p.description),h('h2',null,'Light & atmosphere'),h('p',null,p.visual_approach)),
   h('aside',{className:'dfl-materials'},h('p',{className:'dfl-eyebrow'},'PRE-PRODUCTION'),h('h2',null,'The pitch'),h('p',null,'Concept, visual references, moodboard, production plan and lighting analysis.'),...p.documents.map(doc=>h('a',{key:doc.label,href:doc.url,target:'_blank',rel:'noopener noreferrer'},doc.label+' ↗')))),
  h('section',{className:'sw-origin'},h('p',{className:'dfl-eyebrow'},'CREDITS'),h('h2',null,'My contribution'),...p.credits.map(c=>h('p',{key:c.role},h('strong',null,c.role+' · '),c.name))),
  h('a',{className:'dfl-bottom',href:'/blairwang.portfolio/work/cinematography-photography'},'Explore more visual work ↗'));
};
