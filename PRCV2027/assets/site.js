// 中文与英文共用同一文件。站内链接和浏览器后退都保留所选语言。
(() => {
  'use strict';
  const english = document.documentElement.lang === 'en';
  const view = document.getElementById(english ? 'en' : 'zh');
  const mobile = window.matchMedia('(max-width: 900px)');
  const list = view.querySelector('.nav-list');
  const toggle = view.querySelector('.nav-toggle');
  const rail = view.querySelector('.rail');
  const menus = Array.from(view.querySelectorAll('.site-header details'));
  const switcher = view.querySelector('[data-language-switch]');

  function updateLanguageLink() {
    const id = location.hash.slice(1);
    const destination = new URL(location.href);
    const anchor = id === 'zh' || id === 'en' ? '' : id.replace(/^en-/, '');
    destination.searchParams.set('lang', english ? 'zh' : 'en');
    destination.hash = english ? (anchor || 'zh') : (anchor ? 'en-' + anchor : 'en');
    switcher.href = destination.href;
  }

  function closeMenus(except) {
    menus.forEach(menu => { if (menu !== except && menu.open) menu.open = false; });
  }
  function setNav(open) {
    list.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) closeMenus();
  }
  function layout() {
    setNav(false);
    if (rail) rail.open = !mobile.matches;
  }

  document.documentElement.classList.add('js');
  updateLanguageLink();
  layout();
  window.addEventListener('pageshow', () => { layout(); updateLanguageLink(); });
  window.addEventListener('hashchange', updateLanguageLink);
  toggle.addEventListener('click', () => setNav(!list.classList.contains('is-open')));
  document.addEventListener('click', event => {
    closeMenus(event.target.closest('.site-header details'));
    if (mobile.matches && !event.target.closest('.site-header')) setNav(false);
  });
  document.addEventListener('focusin', event => closeMenus(event.target.closest('.site-header details')));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const menu = menus.find(item => item.open);
    if (menu) {
      menu.open = false;
      menu.querySelector('summary').focus();
    } else if (list.classList.contains('is-open')) {
      setNav(false);
      toggle.focus();
    }
  });
  if (rail) rail.addEventListener('click', event => {
    if (mobile.matches && event.target.closest('a[href^="#"]')) rail.open = false;
  });
  if (mobile.addEventListener) mobile.addEventListener('change', layout);
  else mobile.addListener(layout);
})();
