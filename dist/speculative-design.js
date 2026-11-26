window.renderSpeculativeDesign = function (React, p) {
 const h = React.createElement;
 const asset = name => '/uploads/echor/' + name;
 function figure(name, alt, caption) {
  return h('figure', {className:'dfl-teaser'},
   h('a', {href:asset(name), target:'_blank', rel:'noopener noreferrer'},
    h('img', {src:asset(name), alt, loading:'lazy', style:{width:'100%', height:'auto', objectFit:'contain'}})),
   h('figcaption', null, caption));
 }
 return h('article', {className:'dfl-project'},
  h('a', {className:'dfl-back', href:'/work/directing'}, '← Brain · Directing, Art Direction & Design'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, 'MIT 3XX · Fall 2025'),
   h('h1', null, 'Speculative ', h('em', null, 'Design')),
   h('p', {className:'dfl-logline'}, p.logline),
   h('div', {className:'dfl-meta'}, 'Xiyue “Blair” Wang · Cross-registered at VCU-Q')),
  figure('poster.png','The Last Truth concept poster with eyewear, a chip, a knife and a microphone','The Last Truth · Concept poster'),
  figure('horizon.png','Blue wraparound Echor eyewear','Echor Horizon · Eyewear concept'),
  h('div', {className:'dfl-body'},
   h('section', null, h('h2', null, 'The Echor System'),
    h('p', null, 'In this imagined world, a neural implant called Seed records memories, dreams, and thoughts. Horizon eyewear lets its wearer step back inside them. When a recording has gaps, the system quietly fills them in.'),
    h('p', null, 'Layla replays a memory of her mother cooking dinner. Then she hears her mother sing a song she knows was never sung. In The Last Truth, the same uncertainty reaches a courtroom when a victim’s final memory implicates an Echor engineer.')),
   h('aside', {className:'dfl-materials'}, h('h2', null, 'Development materials'),
    ...[['Echor System · World building','system.docx'],['Seven-point story plan','plan.docx'],['Character narrative · Layla','character.docx'],['Eyewear 3D print model','base.obj']].map(([label,file]) =>
     h('a', {key:file,href:asset(file),download:file}, label+' ↓')))),
  figure('eyewear.png','Two interior views of the black eyewear model','Eyewear · Interior design'),
  figure('storyboard.svg?v=white','Storyboard for the Echor project','Storyboard'),
  h('a', {className:'dfl-bottom',href:'/work/directing'}, 'Explore more Brain projects'));
};
