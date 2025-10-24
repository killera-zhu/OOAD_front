document.addEventListener('DOMContentLoaded', () => {
    // 模拟员工数据
    let staffData = [
        { id: 1, account: 'zhangsan', name: '张三', status: 'active', description: '金牌维修员', permissions: 'staff' },
        { id: 2, account: 'lisi', name: '李四', status: 'active', description: '普通维修员', permissions: 'staff' },
        { id: 3, account: 'wangwu', name: '王五', status: 'suspended', description: '高级工程师', permissions: 'admin' },
        { id: 4, account: 'zhaoliu', name: '赵六', status: 'active', description: '学徒', permissions: 'staff' },
        { id: 5, account: 'sunqi', name: '孙七', status: 'suspended', description: '主管', permissions: 'admin' }
    ];

    // 存储员工数据到 localStorage
    const saveStaffData = () => {
        localStorage.setItem('staffData', JSON.stringify(staffData));
    };

    // 从 localStorage 加载员工数据
    const loadStaffData = () => {
        const data = localStorage.getItem('staffData');
        if (data) {
            staffData = JSON.parse(data);
        } else {
            saveStaffData(); // 如果没有数据，则保存初始模拟数据
        }
    };
    
    loadStaffData();


    // 渲染员工列表
    const renderStaffList = (data) => {
        const tableBody = document.querySelector('#staffTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        data.forEach(staff => {
            const row = document.createElement('tr');
            const statusText = staff.status === 'active' ? '正常' : '已暂停';
            const statusClass = staff.status === 'active' ? 'status-active' : 'status-suspended';
            const toggleActionText = staff.status === 'active' ? '暂停' : '恢复';
            
            row.innerHTML = `
                <td>${staff.account}</td>
                <td>${staff.name}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td class="actions">
                    <a href="staff-details.html?id=${staff.id}" class="view-details">详情</a>
                    <a href="#" class="toggle-status" data-id="${staff.id}">${toggleActionText}</a>
                    <a href="#" class="delete-staff" data-id="${staff.id}">删除</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // 过滤和搜索员工
    const filterAndSearch = () => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;

        const filteredData = staffData.filter(staff => {
            const matchesSearch = staff.name.toLowerCase().includes(searchTerm) || staff.account.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        renderStaffList(filteredData);
    };

    // 暂停/恢复员工账号
    const toggleStaffStatus = (id) => {
        const staff = staffData.find(s => s.id === id);
        if (staff) {
            staff.status = staff.status === 'active' ? 'suspended' : 'active';
            saveStaffData();
            filterAndSearch();
            alert('账号状态更新成功！');
        }
    };

    // 删除员工账号
    const deleteStaff = (id) => {
        if (confirm('确定要删除该员工账号吗？此操作不可恢复。')) {
            staffData = staffData.filter(s => s.id !== id);
            saveStaffData();
            filterAndSearch();
            alert('员工账号删除成功！');
        }
    };

    // 处理添加新员工
    const handleAddStaff = (event) => {
        event.preventDefault();
        
        const account = document.getElementById('account').value;
        const accountName = document.getElementById('accountName').value;
        const password = document.getElementById('password').value;
        const description = document.getElementById('description').value;
        const permissions = document.getElementById('permissions').value;

        // 检查账号是否已存在
        if (staffData.some(s => s.account === account)) {
            alert('错误：该员工账号已存在！');
            return;
        }

        const newStaff = {
            id: staffData.length > 0 ? Math.max(...staffData.map(s => s.id)) + 1 : 1,
            account: account,
            name: accountName,
            status: 'active',
            description: description,
            permissions: permissions
        };

        staffData.push(newStaff);
        saveStaffData();
        alert('新员工账号添加成功！');
        window.location.href = 'staff-list.html';
    };


    // === 事件监听 ===

    // 员工列表页面
    if (document.getElementById('staffTable')) {
        renderStaffList(staffData);

        document.getElementById('searchInput').addEventListener('input', filterAndSearch);
        document.getElementById('statusFilter').addEventListener('change', filterAndSearch);
        
        document.querySelector('#staffTable tbody').addEventListener('click', (e) => {
            const target = e.target;
            const staffId = parseInt(target.dataset.id);

            if (target.classList.contains('toggle-status')) {
                e.preventDefault();
                toggleStaffStatus(staffId);
            }
            if (target.classList.contains('delete-staff')) {
                e.preventDefault();
                deleteStaff(staffId);
            }
        });
    }

    // 添加员工页面
    if (document.getElementById('addStaffForm')) {
        document.getElementById('addStaffForm').addEventListener('submit', handleAddStaff);
    }
    
    // 员工详情页面
    if (document.getElementById('detailsContainer')) {
        const urlParams = new URLSearchParams(window.location.search);
        const staffId = parseInt(urlParams.get('id'));
        const staff = staffData.find(s => s.id === staffId);
        
        const detailsContainer = document.getElementById('detailsContainer');
        if (staff) {
            const permissionsText = staff.permissions === 'admin' ? '管理员' : '普通员工';
            detailsContainer.innerHTML = `
                <div class="details-item">
                    <span class="details-label">员工账号:</span>
                    <span class="details-value">${staff.account}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">员工姓名:</span>
                    <span class="details-value">${staff.name}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">账号描述:</span>
                    <span class="details-value">${staff.description || '无'}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">权限设置:</span>
                    <span class="details-value">${permissionsText}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">当前状态:</span>
                    <span class="details-value">${staff.status === 'active' ? '正常' : '已暂停'}</span>
                </div>
            `;
        } else {
            detailsContainer.innerHTML = '<p>未找到该员工的信息。</p>';
        }
    }
});
