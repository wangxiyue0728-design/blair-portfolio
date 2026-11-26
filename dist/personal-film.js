window.renderPersonalFilmProject = function (React, p) {
 const h = React.createElement;
 const commercial = p.detail_layout === 'commercial';
 const texasChicken = p.slug === 'texas-chicken-flavor-unleashed';
 const armsCommercial = commercial && p.category === 'arms';
 const videoFirst = texasChicken || armsCommercial;
 const categoryUrl = armsCommercial ? '/work/producing-collaborations' : commercial ? '/work/directing' : '/work/cinematography-photography';
 const categoryLabel = armsCommercial ? 'Arms · Producing & Collaborations' : commercial ? 'Directing, Art Direction & Design' : 'Eyes · Cinematography & Photography';
 const galleryTitle = commercial ? 'Behind the scenes' : 'Stills';
 const imageLabel = commercial ? 'behind-the-scenes photo' : 'still';
 const gallery = (p.gallery || []).length ? h('section', {className:'mv-stills', id:'stills', 'aria-label':commercial ? galleryTitle : p.title + ' film stills'},
   h('p', {className:'dfl-eyebrow'}, commercial ? 'ON SET' : 'SELECTED FRAMES'), h('h2', null, galleryTitle),
   p.on_set_vlog_url ? h('a', {href:p.on_set_vlog_url, target:'_blank', rel:'noopener noreferrer', className:'doc-drive-link'}, 'Watch the on-set vlog on Instagram ↗') : null,
   h('div', {className:texasChicken ? 'mv-stills-grid uncropped-photo-preview' : 'mv-stills-grid', style:armsCommercial ? {gridTemplateColumns:'minmax(0, 380px)'} : undefined}, ...p.gallery.map((src,i) =>
    h('figure', {key:src},
     h('a', {href:src, target:'_blank', rel:'noopener noreferrer', style:armsCommercial ? {aspectRatio:'auto'} : undefined, 'aria-label':'Open ' + imageLabel + ' ' + (i+1) + ' at full size'},
      h('img', {src, alt:p.title + ' — ' + imageLabel + ' ' + (i+1), loading:'lazy', style:armsCommercial ? {height:'auto', transform:'none'} : undefined})))))) : null;
 const video = h('section', {id:'watch-film', className:'doc-watch', 'aria-label':'Watch ' + p.title},
   h('p', {className:'dfl-eyebrow'}, commercial ? 'THE COMMERCIAL' : 'THE FILM'),
   h('div', {className:'doc-player'}, h('iframe', {src:p.video_embed_url, title:p.title + ' — film', allow:'fullscreen; encrypted-media; picture-in-picture', allowFullScreen:true})),
   h('a', {href:p.video_url, target:'_blank', rel:'noopener noreferrer', className:'doc-drive-link'}, commercial ? 'Watch on Vimeo' : 'Open the film in Google Drive ↗'));
 return h('article', {className:'dfl-project personal-film-project', 'data-testid':'personal-film-project'},
  h('a', {href:categoryUrl, className:'dfl-back'}, '← ' + categoryLabel),
  h('header', {className:'dfl-header'},
   h('p', {className:'dfl-eyebrow'}, (texasChicken ? 'Texas Chicken · ' : p.client ? p.client + ' · ' : '') + p.format + ' · ' + p.year),
   h('h1', null, texasChicken ? 'Flavor ' : p.heading ? p.heading.lead + ' ' : null, h('em', null, texasChicken ? 'Unleashed' : p.heading?.emphasis || p.title)),
   commercial && p.description ? h('p', {className:'dfl-logline'}, p.description) : null,
   h('div', {className:'dfl-meta'}, h('span', null, p.role + ' · Xiyue “Blair” Wang · 王晰乐'), h('span', null, commercial ? p.agency : p.year), commercial ? h('a', {href:'#watch-film'}, 'Watch the commercial ↓') : null),
   commercial ? null : h('a', {href:'#watch-film', className:'dfl-bottom'}, 'Watch the film ↓')),
  videoFirst ? video : gallery,
  videoFirst ? gallery : video,
  h('section', {className:'sw-origin'},
   h('p', {className:'dfl-eyebrow'}, 'CREDITS'), h('h2', null, 'My contribution'),
   ...(p.credits || []).map(c => h('p', {key:c.role}, h('strong', null, c.role + ' · '), c.name))),
  h('a', {className:'dfl-bottom', href:categoryUrl}, armsCommercial ? 'Explore more Arms projects' : commercial ? 'Explore more Brain projects' : 'Explore more visual work ↗'));
};
