// script.js（增强版）
/**
 * 切换子菜单显示
 * id: submenu 元素的 id
 * triggerEl: 触发元素（可选），用于更新 aria-expanded
 */
function toggleMenu(id, triggerEl) {
  const menu = document.getElementById(id);
  if (!menu) return;

  // 关闭其他已打开的 submenu（如果你要让多个同时打开，可以删除这段）
  document.querySelectorAll('.submenu').forEach(sm => {
    if (sm.id !== id) {
      sm.style.display = 'none';
      sm.setAttribute('aria-hidden', 'true');
      // update triggers for other menus
      const triggers = document.querySelectorAll(`[aria-controls="${sm.id}"]`);
      triggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    }
  });

  // 切换当前菜单
  const isOpen = menu.style.display === 'flex';
  menu.style.display = isOpen ? 'none' : 'flex';
  menu.setAttribute('aria-hidden', isOpen ? 'true' : 'false');

  if (triggerEl) {
    triggerEl.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  }
}

// 可选：DOM 加载完后把带 aria-controls 的元素都绑定回车/空格键以支持键盘操作
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[aria-controls]').forEach(el => {
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = el.getAttribute('aria-controls');
        toggleMenu(id, el);
      }
    });
  });
});
