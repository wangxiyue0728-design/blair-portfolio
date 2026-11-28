window.renderPromptCutAction = function (React, project) {
 const h = React.createElement;
 const podcasts = '/blairwang.portfolio/work/podcasts';
 const captions = ['Podcast cover mockup', 'Podcast concept mockup'];
 const descriptions = [
  'Prompt, Cut, Action cover with a red clapperboard and the tagline “No Camera, No Problem?”',
  'Podcast concept sheet with a spotlight, director’s chair, and an outline of the show’s topics'
 ];
 return h('article', {className:'dfl-project', 'data-testid':'prompt-cut-action'},
  h('a', {className:'dfl-back', href:podcasts}, '← Mouth · Podcasts'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, 'JOUR 305 · PODCASTING · FALL 2026'),
   h('h1', null, 'Prompt, Cut, ', h('em', null, 'Action')),
   h('p', {className:'sw-subtitle'}, 'No Camera, No Problem?'),
   h('div', {className:'dfl-meta'}, h('span', null, 'Blair Wang with Eray Karatas'),
    h('span', {className:'dfl-status'}, 'In production')),
   h('p', {className:'dfl-logline'}, project.description)),
  ...project.gallery.map((src, index) => h('figure', {className:'dfl-teaser', key:src},
   h('a', {href:src, target:'_blank', rel:'noopener noreferrer'},
    h('img', {src, width:3000, height:3000, alt:descriptions[index]})),
   h('figcaption', null, captions[index]))),
  h('a', {className:'dfl-bottom', href:podcasts}, 'Explore Podcasts'));
};
