// 侧边栏菜单切换
function toggleMenu(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 展开当前激活的菜单
    const activeLinks = document.querySelectorAll('.sidebar a.active');
    activeLinks.forEach(link => {
        const onClickAttr = link.getAttribute('onclick');
        if (onClickAttr && onClickAttr.startsWith('toggleMenu')) {
            const menuId = onClickAttr.match(/'([^']+)'/)[1];
            const menu = document.getElementById(menuId);
            if (menu) {
                menu.style.display = 'block';
            }
        }
    });
});