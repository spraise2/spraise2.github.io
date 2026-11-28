// 正文、链接和下拉栏目均使用静态 HTML。脚本只处理菜单与小屏布局。
(() => {
  'use strict';
  const mobile = window.matchMedia('(max-width: 800px)');
  const toggle = document.querySelector('.nav-toggle');
  const list = document.querySelector('.nav-list');
  const rail = document.querySelector('.rail');
  const menus = Array.from(document.querySelectorAll('.site-header details'));

  function closeMenus(except) {
    menus.forEach(menu => {
      if (menu !== except && menu.open) menu.open = false;
    });
  }
  function setNav(open) {
    list.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (!open) closeMenus();
  }
  function adjustLayout() {
    setNav(false);
    if (rail) rail.open = !mobile.matches;
  }

  document.documentElement.classList.add('js');
  toggle.addEventListener('click', () => setNav(!list.classList.contains('is-open')));
  document.addEventListener('click', event => {
    const menu = event.target.closest('.site-header details');
    closeMenus(menu);
    if (mobile.matches && !event.target.closest('.site-header')) setNav(false);
  });
  document.addEventListener('focusin', event => closeMenus(event.target.closest('.site-header details')));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const opened = menus.find(menu => menu.open);
    if (opened) {
      opened.open = false;
      opened.querySelector('summary').focus();
    } else if (list.classList.contains('is-open')) {
      setNav(false);
      toggle.focus();
    }
  });
  if (rail) {
    rail.addEventListener('click', event => {
      if (mobile.matches && event.target.closest('a[href^="#"]')) rail.open = false;
    });
  }
  if (mobile.addEventListener) mobile.addEventListener('change', adjustLayout);
  else mobile.addListener(adjustLayout);
  window.addEventListener('pageshow', adjustLayout);
  adjustLayout();
})();
