window.$ = (sel, root) => (root || document).querySelector(sel);
window.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

(function () {
  let host;
  function getHost() {
    if (!host) {
      host = document.createElement('div');
      host.className = 'toast-host';
      document.body.appendChild(host);
    }
    return host;
  }
  window.toast = function (msg) {
    const h = getHost();
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = msg;
    h.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 200);
    }, 1600);
  };
})();

window.copyToClipboard = async function (text) {
  try {
    await navigator.clipboard.writeText(text);
    window.toast('Copied');
    return true;
  } catch (_) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    ta.remove();
    window.toast(ok ? 'Copied' : 'Copy failed');
    return ok;
  }
};

window.escapeHtml = function (s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
};
