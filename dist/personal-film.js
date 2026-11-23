window.renderPersonalFilmProject = function (React, p) {
 const h = React.createElement;
 return h('article', {className:'dfl-project personal-film-project', 'data-testid':'personal-film-project'},
  h('a', {href:'/work/cinematography-photography', className:'dfl-back'}, '← Eyes · Cinematography & Photography'),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, p.format + ' · ' + p.year),
   h('h1', null, h('em', null, p.title)),
   h('div', {className:'dfl-meta'}, h('span', null, p.role + ' · Xiyue “Blair” Wang · 王晰乐'), h('span', null, p.year)),
   h('a', {href:'#watch-film', className:'dfl-bottom'}, 'Watch the film ↓')),
  (p.gallery || []).length ? h('section', {className:'mv-stills', 'aria-label':p.title + ' film stills'},
   h('p', {className:'dfl-eyebrow'}, 'SELECTED FRAMES'), h('h2', null, 'Stills'),
   h('div', {className:'mv-stills-grid'}, ...p.gallery.map((src,i) => h('figure', {key:src}, h('img', {src, alt:p.title + ' — still ' + (i+1), loading:'lazy'}))))) : null,
  h('section', {id:'watch-film', className:'doc-watch', 'aria-label':'Watch ' + p.title},
   h('p', {className:'dfl-eyebrow'}, 'THE FILM'),
   h('div', {className:'doc-player'}, h('iframe', {src:p.video_embed_url, title:p.title + ' — film', allow:'fullscreen; encrypted-media', allowFullScreen:true})),
   h('a', {href:p.video_url, target:'_blank', rel:'noopener noreferrer', className:'doc-drive-link'}, 'Open the film in Google Drive ↗')),
  h('section', {className:'sw-origin'},
   h('p', {className:'dfl-eyebrow'}, 'CREDITS'), h('h2', null, 'My contribution'),
   ...(p.credits || []).map(c => h('p', {key:c.role}, h('strong', null, c.role + ' · '), c.name))),
  h('a', {className:'dfl-bottom', href:'/work/cinematography-photography'}, 'Explore more visual work ↗'));
};
