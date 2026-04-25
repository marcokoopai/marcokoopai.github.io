(function () {
  const KEY = 'theme';
  const root = document.documentElement;
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function normalize(mode) {
    return mode === 'light' || mode === 'dark' ? mode : 'system';
  }

  function systemTheme() {
    return media && media.matches ? 'dark' : 'light';
  }

  function effectiveTheme(mode) {
    mode = normalize(mode);
    return mode === 'system' ? systemTheme() : mode;
  }

  function readMode() {
    try { return normalize(localStorage.getItem(KEY)); }
    catch (_) { return 'system'; }
  }

  function writeMode(mode) {
    try {
      if (mode === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, mode);
    } catch (_) {}
  }

  function nextMode(mode) {
    mode = normalize(mode);
    if (mode === 'system') return effectiveTheme(mode) === 'dark' ? 'light' : 'dark';
    return mode === 'light' ? 'dark' : 'system';
  }

  function syncControls(mode) {
    const effective = effectiveTheme(mode);
    const label = mode === 'system'
      ? `System theme (${effective})`
      : `${mode[0].toUpperCase()}${mode.slice(1)} theme`;
    const next = nextMode(mode);

    document.querySelectorAll('[onclick*="toggleTheme"]').forEach(button => {
      button.setAttribute('aria-label', label);
      button.setAttribute('title', `${label}; click for ${next}`);
      button.textContent = mode === 'system' ? '◐' : (effective === 'dark' ? '☾' : '☀');
    });
  }

  function apply(mode) {
    mode = normalize(mode);
    const effective = effectiveTheme(mode);
    root.setAttribute('data-theme', effective);
    root.setAttribute('data-theme-mode', mode);
    syncControls(mode);

    try {
      document.dispatchEvent(new CustomEvent('themechange', {
        detail: { mode, theme: effective }
      }));
    } catch (_) {}
  }

  apply(readMode());

  window.toggleTheme = function () {
    const next = nextMode(root.getAttribute('data-theme-mode'));
    writeMode(next);
    apply(next);
  };

  function handleSystemChange() {
    if (readMode() === 'system') apply('system');
  }

  if (media) {
    if (media.addEventListener) media.addEventListener('change', handleSystemChange);
    else if (media.addListener) media.addListener(handleSystemChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => syncControls(root.getAttribute('data-theme-mode')));
  } else {
    syncControls(root.getAttribute('data-theme-mode'));
  }
})();
