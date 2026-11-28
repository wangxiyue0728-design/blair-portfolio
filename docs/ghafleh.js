window.renderGhafleh = function (React, project) {
 const h = React.createElement;
 const arms = '/blairwang.portfolio/work/producing-collaborations';
 return h('article', {className:'dfl-project', 'data-testid':'ghafleh-project'},
  h('a', {className:'dfl-back', href:arms}, '← Arms · Producing & Collaborations'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, 'DOHA FILM INSTITUTE–SUPPORTED FILM · ON SET IN 2025'),
   h('h1', null, 'Ghafleh'),
   h('p', {className:'sw-subtitle'}, h('em', null, 'A Matter of Time')),
   h('div', {className:'dfl-meta'}, project.role + ' · ' + project.credits[0].name)),
  h('figure', {className:'dfl-teaser'},
   h('a', {href:project.poster_url, target:'_blank', rel:'noopener noreferrer'},
    h('img', {src:project.poster_url, width:1320, height:1772, alt:'Ghafleh film poster showing a watchmaker at work'})),
   h('figcaption', null, 'Ghafleh · Film poster')),
  h('section', {className:'mv-stills'},
   h('h2', null, 'Behind the scenes'),
   h('div', {className:'mv-stills-grid'}, ...project.gallery.map((src, i) =>
    h('figure', {key:src},
     h('a', {href:src, target:'_blank', rel:'noopener noreferrer', style:{aspectRatio:'auto'}},
      h('img', {src, loading:'lazy', style:{height:'auto'}, alt:[
       'Blair Wang holding a boom pole beside the camera crew indoors',
       'Blair Wang operating the boom during a scene on a seaside terrace'
      ][i]})))))),
  h('a', {className:'dfl-bottom', href:arms}, 'Explore more Arms projects'));
};
