window.renderBabaFramedMe = function (React, p) {
 const h = React.createElement;
 const descriptions = ['A garlanded portrait in a turquoise room', 'A figure facing a brightly lit shop', 'A man in a suit standing before shelves'];
 return h('article', {className:'dfl-project'},
  h('a', {className:'dfl-back', href:'/work/producing-collaborations'}, '← Arms · Producing & Collaborations'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, 'Independent study · Spring 2026'),
   h('h1', null, 'Baba ', h('em', null, 'Framed Me')),
   h('div', {className:'dfl-meta'}, h('span', null, p.role + ' · Xiyue “Blair” Wang'), h('span', null, 'MIT 399: Collaborative Film Construction'))),
  h('div', {className:'dfl-body'},
   h('section', null, h('h2', null, 'Logline'), h('p', null, h('em', null, p.title), p.logline.slice(p.title.length))),
   h('aside', {className:'dfl-materials'}, h('p', {className:'dfl-eyebrow'}, 'Final deliverable'), h('h2', null, 'Production bible'),
    h('a', {href:p.documents[0].url, target:'_blank', rel:'noopener noreferrer'}, 'Open production bible (PDF) ↗'))),
  h('section', {className:'mv-stills'}, h('h2', null, 'Concept photos'),
   h('div', {className:'mv-stills-grid',style:{gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))'}}, ...p.gallery.map((src,i) =>
    h('figure', {key:src}, h('a', {href:src, target:'_blank', rel:'noopener noreferrer',style:{aspectRatio:'auto'}},
     h('img', {src,alt:descriptions[i] || 'Film concept image',style:{height:'auto'},loading:'lazy'})))))));
};
