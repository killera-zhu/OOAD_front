// 服务商管理后台 JavaScript 功能

// 菜单切换功能
function toggleMenu(id) {
    const menu = document.getElementById(id);
    const isVisible = menu.style.display === 'flex';
    
    // 关闭所有其他菜单
    const allMenus = document.querySelectorAll('.submenu');
    allMenus.forEach(submenu => {
        if (submenu.id !== id) {
            submenu.style.display = 'none';
        }
    });
    
    // 切换当前菜单
    menu.style.display = isVisible ? 'none' : 'flex';
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化菜单状态
    initializeMenus();
    
    // 添加键盘导航支持
    addKeyboardNavigation();
    
});

// 初始化菜单
function initializeMenus() {
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(menu => {
        menu.style.display = 'none';
    });
}

// 添加键盘导航支持
function addKeyboardNavigation() {
    const menuItems = document.querySelectorAll('.sidebar > a');
    
    menuItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const menuId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                toggleMenu(menuId);
            }
        });
    });
}


// 卡片悬停效果增强
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 侧边栏响应式处理
function handleSidebarResize() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    
    if (window.innerWidth <= 768) {
        sidebar.style.position = 'relative';
        sidebar.style.width = '100%';
        main.style.marginLeft = '0';
    } else {
        sidebar.style.position = 'fixed';
        sidebar.style.width = '200px';
        main.style.marginLeft = '250px';
    }
}

// 监听窗口大小变化
window.addEventListener('resize', handleSidebarResize);

// 页面加载时检查窗口大小
window.addEventListener('load', handleSidebarResize);

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
