(() => {
  const base = '/' + location.pathname.split('/')[1];
  const detailSite = 'https://blair-wang-portfolio.esteemedtanager1.chatgpt.site';
  function detailUrl(url) {
    if (url.origin !== location.origin) return null;
    const path = url.pathname.startsWith(base + '/') ? url.pathname.slice(base.length) : url.pathname;
    return /^\/(work|project|about|cv)(\/|$)/.test(path) ? detailSite + path + url.search + url.hash : null;
  }
  const target = detailUrl(new URL(location.href));
  if (target) location.replace(target);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (link) {
      const target = detailUrl(new URL(link.href));
      if (target) { link.href = target; event.stopPropagation(); }
    }
  }, true);
})();