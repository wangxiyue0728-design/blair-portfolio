window.renderSoundDesignProject = function (React, project) {
  const h = React.createElement;
  const timeline = (project.gallery || [])[0];
  const externalLink = {target: '_blank', rel: 'noopener noreferrer'};

  return h('article', {className: 'dfl-project', 'data-testid': 'sound-design-project'},
    h('a', {href: '/blairwang.portfolio/work/sound-design', className: 'dfl-back'}, '← Ears · Sound Design'),
    h('header', {className: 'dfl-header'},
      h('p', {className: 'dfl-eyebrow'}, project.role),
      h('h1', null, h('em', null, project.title)),
      h('p', {className: 'doc-course'}, project.description),
      h('div', {className: 'dfl-meta'}, h('span', null, project.course + ' · Fall ' + project.year))),
    h('section', {id: 'watch-video', className: 'doc-watch', 'aria-label': 'Watch ' + project.title},
      h('p', {className: 'dfl-eyebrow'}, 'THE VIDEO'),
      h('div', {className: 'doc-player'},
        h('iframe', {src: project.video_embed_url, title: project.title + ' — video', loading: 'lazy', allow: 'fullscreen; encrypted-media', allowFullScreen: true})),
      h('a', {...externalLink, href: project.video_url, className: 'doc-drive-link'}, 'Open the video in Google Drive')),
    timeline && h('section', {className: 'mv-stills', 'aria-labelledby': 'audition-timeline'},
      h('h2', {id: 'audition-timeline'}, 'Adobe Audition timeline'),
      h('div', {className: 'dfl-teaser'},
        h('a', {...externalLink, href: timeline, 'aria-label': 'Open the Adobe Audition timeline at full size'},
          h('img', {src: timeline, alt: 'Adobe Audition multitrack session with six layers of sound beneath the video reference', loading: 'lazy'})))),
    h('section', {className: 'sw-origin'},
      h('h2', null, 'Credits'),
      ...project.credits.map(credit => h('p', {key: credit.role},
        h('strong', null, credit.role + ' · '),
        credit.url ? h('a', {...externalLink, href: credit.url, className: 'doc-drive-link'}, credit.name) : credit.name))));
};
