(function () {
  const KEY = 'theme';
  const root = document.documentElement;

  function apply(theme) {
    if (theme === 'light' || theme === 'dark') {
      root.setAttribute('data-theme', theme);
    } else {
      root.removeAttribute('data-theme');
    }
  }

  const saved = (() => { try { return localStorage.getItem(KEY); } catch (_) { return null; } })();
  apply(saved);

  window.toggleTheme = function () {
    const current = root.getAttribute('data-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let next;
    if (current === 'dark') next = 'light';
    else if (current === 'light') next = 'dark';
    else next = prefersDark ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (_) {}
  };
})();
