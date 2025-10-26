document.addEventListener('DOMContentLoaded', () => {
    let staffData = [];
    const STAFF_DATA_VERSION = '1.3'; // 数据结构的版本号

    // 获取初始模拟员工数据
    const getInitialStaffData = () => {
        return [
            { id: 1, account: 'zhangsan', name: '张三', status: 'active', description: '负责海淀区、通州区的家电维修', permissions: '维修师傅' },
            { id: 2, account: 'lisi', name: '李四', status: 'active', description: '负责朝阳区、西城区的家电维修', permissions: '维修师傅' },
            { id: 3, account: 'wangwu', name: '王五', status: 'suspended', description: '高级工程师', permissions: 'admin' },
            { id: 4, account: 'zhaoliu', name: '赵六', status: 'active', description: '负责东城区的电视、电脑维修', permissions: '维修师傅' },
            { id: 5, account: 'sunqi', name: '孙七', status: 'suspended', description: '主管', permissions: 'admin' }
        ];
    };

    // 存储员工数据到 localStorage
    const saveStaffData = () => {
        const dataToSave = {
            version: STAFF_DATA_VERSION,
            data: staffData
        };
        localStorage.setItem('staffData', JSON.stringify(dataToSave));
    };

    // 从 localStorage 加载员工数据
    const loadStaffData = () => {
        const rawData = localStorage.getItem('staffData');
        if (rawData) {
            const parsedData = JSON.parse(rawData);
            // 检查版本号是否匹配，不匹配则重置
            if (parsedData.version === STAFF_DATA_VERSION && parsedData.data) {
                staffData = parsedData.data;
            } else {
                staffData = getInitialStaffData();
                saveStaffData();
            }
        } else {
            // 如果 localStorage 中没有数据，则使用初始数据并保存
            staffData = getInitialStaffData();
            saveStaffData();
        }
    };

    // 渲染员工列表
    const renderStaffList = () => {
        const staffTableBody = document.querySelector('#staffTable tbody');
        if (!staffTableBody) return;
        
        staffTableBody.innerHTML = '';
        const dataToRender = staffData;

        if (dataToRender.length === 0) {
            staffTableBody.innerHTML = '<tr><td colspan="5">暂无员工数据</td></tr>';
            return;
        }

        dataToRender.forEach(staff => {
            const row = document.createElement('tr');
            const statusClass = staff.status === 'active' ? 'status-active' : 'status-suspended';
            const statusText = staff.status === 'active' ? '正常' : '已暂停';
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
            staffTableBody.appendChild(row);
        });
    };

    // 筛选和搜索员工
    const filterAndSearch = () => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;

        const filteredData = staffData.filter(staff => {
            const matchesSearch = staff.name.toLowerCase().includes(searchTerm) || 
                                  staff.account.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || staff.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        const staffTableBody = document.querySelector('#staffTable tbody');
        staffTableBody.innerHTML = '';
        
        if (filteredData.length === 0) {
            staffTableBody.innerHTML = '<tr><td colspan="5">未找到符合条件的员工</td></tr>';
            return;
        }

        filteredData.forEach(staff => {
            const row = document.createElement('tr');
            const statusClass = staff.status === 'active' ? 'status-active' : 'status-suspended';
            const statusText = staff.status === 'active' ? '正常' : '已暂停';
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
            staffTableBody.appendChild(row);
        });
    };

    // 切换员工状态
    const toggleStaffStatus = (id) => {
        const staff = staffData.find(s => s.id === id);
        if (staff) {
            staff.status = staff.status === 'active' ? 'suspended' : 'active';
            saveStaffData();
            filterAndSearch();
            alert('账号状态更新成功！');
        }
    };

    // 删除员工
    const deleteStaff = (id) => {
        if (confirm('确定要删除该员工账号吗？此操作不可恢复。')) {
            staffData = staffData.filter(s => s.id !== id);
            saveStaffData();
            filterAndSearch();
            alert('员工账号删除成功！');
        }
    };
    
    // 加载员工详情
    const loadStaffDetails = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const staffId = parseInt(urlParams.get('id'));
        const staff = staffData.find(s => s.id === staffId);
        
        const detailsContainer = document.getElementById('detailsContainer');
        if (staff && detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="details-item"><span class="details-label">账号:</span> <span class="details-value">${staff.account}</span></div>
                <div class="details-item"><span class="details-label">姓名:</span> <span class="details-value">${staff.name}</span></div>
                <div class="details-item"><span class="details-label">状态:</span> <span class="details-value">${staff.status === 'active' ? '正常' : '已暂停'}</span></div>
                <div class="details-item"><span class="details-label">描述:</span> <span class="details-value">${staff.description}</span></div>
                <div class="details-item"><span class="details-label">权限:</span> <span class="details-value">${staff.permissions}</span></div>
            `;
        } else if (detailsContainer) {
            detailsContainer.innerHTML = '<p>未找到该员工的信息。</p>';
        }
    };

    // 处理添加员工表单
    const handleAddStaff = (e) => {
        e.preventDefault();
        
        const newStaff = {
            id: Date.now(), // 使用时间戳作为唯一ID
            account: document.getElementById('account').value,
            name: document.getElementById('name').value,
            password: document.getElementById('password').value,
            description: document.getElementById('description').value,
            permissions: document.getElementById('permissions').value,
            status: 'active'
        };

        staffData.push(newStaff);
        saveStaffData();
        alert('新员工账号添加成功！');
        window.location.href = 'staff-list.html';
    };

    // --- 事件监听 ---

    // 页面加载时加载数据
    loadStaffData();

    // 员工列表页面
    if (document.getElementById('staffTable')) {
        renderStaffList();
        document.getElementById('searchBtn').addEventListener('click', filterAndSearch);
        
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

    // 员工详情页面
    if (document.getElementById('detailsContainer')) {
        loadStaffDetails();
    }

    // 添加员工页面
    const addStaffForm = document.getElementById('addStaffForm');
    if (addStaffForm) {
        addStaffForm.addEventListener('submit', handleAddStaff);
    }
});
