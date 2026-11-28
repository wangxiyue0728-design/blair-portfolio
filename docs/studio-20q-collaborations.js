window.renderStudio20QCollaborations = function (React, project) {
 const h = React.createElement;
 const arms = '/blairwang.portfolio/work/producing-collaborations';
 return h('article', {className:'dfl-project', 'data-testid':'studio-20q-collaborations'},
  h('a', {className:'dfl-back', href:arms}, '← Arms · Producing & Collaborations'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, 'Crew credits'),
   h('h1', null, 'Studio 20Q ', h('em', null, 'Collaborations')),
   h('div', {className:'dfl-meta'}, 'Xiyue “Blair” Wang · 王晰乐')),
  h('section', {className:'mv-stills', 'aria-label':'Film credits'},
   h('div', {className:'mv-stills-grid'}, ...project.credits.map(credit =>
    h('section', {key:credit.name},
     h('h2', null, credit.name),
     h('p', {className:'dfl-meta', style:{margin:'0 0 20px'}}, [credit.role, credit.year].filter(Boolean).join(' · ')),
     credit.photo ? h('figure', null,
      h('a', {href:credit.photo, target:'_blank', rel:'noopener noreferrer', style:{aspectRatio:'auto'}, 'aria-label':'Open ' + credit.name + ' photo at full size'},
       h('img', {src:credit.photo, alt:credit.alt, loading:'lazy', style:{height:'auto'}}))) : null)))),
  h('a', {className:'dfl-bottom', href:arms}, 'Explore more Arms projects'));
};
