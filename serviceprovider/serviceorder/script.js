document.addEventListener('DOMContentLoaded', () => {
    // 模拟服务单数据
    let serviceOrderData = [
        {
            id: 1,
            orderNo: 'SO20241201001',
            serviceName: '家电维修服务',
            product: '海尔冰箱BCD-215STPA',
            merchant: '海尔官方旗舰店',
            serviceArea: '北京市朝阳区',
            status: 'pending',
            customerName: '张三',
            customerPhone: '13800138000',
            customerAddress: '北京市朝阳区建国路88号',
            serviceContent: '冰箱制冷故障维修',
            trackingNo: 'YT1234567890'
        },
        {
            id: 2,
            orderNo: 'SO20241201002',
            serviceName: '空调清洗服务',
            product: '格力空调KFR-35GW',
            merchant: '格力专卖店',
            serviceArea: '北京市海淀区',
            status: 'accepted',
            customerName: '李四',
            customerPhone: '13900139000',
            customerAddress: '北京市海淀区中关村大街1号',
            serviceContent: '空调深度清洗保养',
            trackingNo: 'YT1234567891'
        },
        {
            id: 3,
            orderNo: 'SO20241201003',
            serviceName: '洗衣机维修服务',
            product: '小天鹅洗衣机TB80V23H',
            merchant: '小天鹅官方店',
            serviceArea: '北京市西城区',
            status: 'assigned',
            customerName: '王五',
            customerPhone: '13700137000',
            customerAddress: '北京市西城区金融街15号',
            serviceContent: '洗衣机脱水功能故障',
            trackingNo: 'YT1234567892'
        }
    ];

    // 从员工管理模块加载维修师傅数据
    const loadStaffData = () => {
        const data = localStorage.getItem('staffData');
        if (data) {
            return JSON.parse(data);
        } else {
            // 如果没有员工数据，返回默认数据
            return [
                {
                    id: 1,
                    account: 'zhangsan',
                    name: '张师傅',
                    status: 'active',
                    description: '家电维修专家',
                    permissions: 'staff'
                },
                {
                    id: 2,
                    account: 'lisi',
                    name: '李师傅',
                    status: 'active',
                    description: '空调维修专家',
                    permissions: 'staff'
                },
                {
                    id: 3,
                    account: 'wangwu',
                    name: '王师傅',
                    status: 'active',
                    description: '洗衣机维修专家',
                    permissions: 'staff'
                }
            ];
        }
    };

    let staffData = loadStaffData();

    // 存储数据到 localStorage
    const saveServiceOrderData = () => {
        localStorage.setItem('serviceOrderData', JSON.stringify(serviceOrderData));
    };

    const loadServiceOrderData = () => {
        const data = localStorage.getItem('serviceOrderData');
        if (data) {
            serviceOrderData = JSON.parse(data);
        } else {
            saveServiceOrderData();
        }
    };

    loadServiceOrderData();

    // 渲染服务单列表
    const renderServiceOrderList = (data) => {
        const tableBody = document.querySelector('#serviceOrderTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        data.forEach(order => {
            const row = document.createElement('tr');
            const statusText = getStatusText(order.status);
            const statusClass = `status-${order.status}`;
            
            row.innerHTML = `
                <td>${order.orderNo}</td>
                <td>${order.serviceName}</td>
                <td>${order.product}</td>
                <td>${order.merchant}</td>
                <td>${order.serviceArea}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>${order.customerName}</td>
                <td>${order.customerPhone}</td>
                <td class="actions">
                    <a href="serviceorder-details.html?id=${order.id}" class="view-details">详情</a>
                    ${getActionButtons(order.status, order.id)}
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // 获取状态文本
    const getStatusText = (status) => {
        const statusMap = {
            'pending': '待接收',
            'accepted': '已接收',
            'assigned': '已派工',
            'completed': '已完成',
            'cancelled': '已取消'
        };
        return statusMap[status] || status;
    };

    // 获取操作按钮
    const getActionButtons = (status, orderId) => {
        switch (status) {
            case 'pending':
                return `<a href="#" class="accept-order" data-id="${orderId}">接收</a>`;
            case 'accepted':
                return `<a href="serviceorder-assign.html?orderId=${orderId}" class="assign-order">派工</a>`;
            case 'assigned':
                return `<a href="#" class="cancel-order" data-id="${orderId}">取消</a>`;
            default:
                return '';
        }
    };

    // 过滤和搜索服务单
    const filterAndSearch = () => {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const statusFilter = document.getElementById('statusFilter').value;

        const filteredData = serviceOrderData.filter(order => {
            const matchesSearch = order.orderNo.toLowerCase().includes(searchTerm) || 
                                order.serviceName.toLowerCase().includes(searchTerm) ||
                                order.customerName.toLowerCase().includes(searchTerm);
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });

        renderServiceOrderList(filteredData);
    };

    // 接收服务单
    const acceptOrder = (id) => {
        const order = serviceOrderData.find(o => o.id === id);
        if (order && order.status === 'pending') {
            order.status = 'accepted';
            saveServiceOrderData();
            filterAndSearch();
            alert('服务单接收成功！');
        }
    };

    // 取消服务单
    const cancelOrder = (id) => {
        const reason = prompt('请输入取消原因：');
        if (reason) {
            const order = serviceOrderData.find(o => o.id === id);
            if (order) {
                order.status = 'cancelled';
                order.cancelReason = reason;
                saveServiceOrderData();
                filterAndSearch();
                alert('服务单已取消！');
            }
        }
    };

    // 渲染派工列表
    const renderAssignList = (data) => {
        const tableBody = document.querySelector('#assignTable tbody');
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        data.forEach(order => {
            if (order.status === 'accepted' || order.status === 'assigned') {
                const row = document.createElement('tr');
                const statusText = getStatusText(order.status);
                const statusClass = `status-${order.status}`;
                
                row.innerHTML = `
                    <td>${order.orderNo}</td>
                    <td>${order.customerName}</td>
                    <td>${order.customerAddress}</td>
                    <td>${order.customerPhone}</td>
                    <td>${new Date().toLocaleDateString()}</td>
                    <td>${order.serviceContent}</td>
                    <td><span class="status ${statusClass}">${statusText}</span></td>
                    <td class="actions">
                        ${order.status === 'accepted' ? 
                            `<a href="#" class="assign-order" data-id="${order.id}">派工</a>` : 
                            `<span>已派工</span>`
                        }
                    </td>
                `;
                tableBody.appendChild(row);
            }
        });
    };

    // 渲染维修师傅列表
    const renderStaffList = (staffList) => {
        const container = document.getElementById('staffList');
        if (!container) return;
        
        container.innerHTML = '';
        staffList.forEach(staff => {
            // 只显示状态为 active 的员工
            if (staff.status === 'active') {
                const staffItem = document.createElement('div');
                staffItem.className = 'staff-item';
                staffItem.dataset.staffId = staff.id;
                
                const statusClass = 'staff-status available';
                const statusText = '空闲';
                
                staffItem.innerHTML = `
                    <div class="staff-info">
                        <div class="staff-name">${staff.name}</div>
                        <div class="staff-details">
                            账号：${staff.account}<br>
                            描述：${staff.description || '无'}<br>
                            权限：${staff.permissions === 'admin' ? '管理员' : '普通员工'}
                        </div>
                    </div>
                    <div class="staff-status available">${statusText}</div>
                `;
                
                staffItem.addEventListener('click', () => {
                    // 移除其他选中状态
                    document.querySelectorAll('.staff-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    // 添加选中状态
                    staffItem.classList.add('selected');
                });
                
                container.appendChild(staffItem);
            }
        });
    };

    // 显示派工模态框
    const showAssignModal = (orderId) => {
        const order = serviceOrderData.find(o => o.id === orderId);
        if (!order) return;
        
        const modal = document.getElementById('assignModal');
        const orderInfo = document.getElementById('selectedOrderInfo');
        
        orderInfo.innerHTML = `
            <h4>服务单信息：</h4>
            <p><strong>服务单号：</strong>${order.orderNo}</p>
            <p><strong>客户：</strong>${order.customerName}</p>
            <p><strong>地址：</strong>${order.customerAddress}</p>
            <p><strong>服务内容：</strong>${order.serviceContent}</p>
        `;
        
        renderStaffList(staffData);
        modal.style.display = 'block';
        
        // 存储当前选中的订单ID
        modal.dataset.orderId = orderId;
    };

    // 确认派工
    const confirmAssign = () => {
        const modal = document.getElementById('assignModal');
        const orderId = parseInt(modal.dataset.orderId);
        const selectedStaff = document.querySelector('.staff-item.selected');
        
        if (!selectedStaff) {
            alert('请选择一位维修师傅！');
            return;
        }
        
        const staffId = parseInt(selectedStaff.dataset.staffId);
        const order = serviceOrderData.find(o => o.id === orderId);
        const staff = staffData.find(s => s.id === staffId);
        
        if (order && staff) {
            order.status = 'assigned';
            order.assignedStaffId = staffId;
            order.assignedStaffName = staff.name;
            saveServiceOrderData();
            
            modal.style.display = 'none';
            alert(`派工成功！已分配给${staff.name}师傅。`);
            
            // 刷新列表
            if (document.getElementById('assignTable')) {
                renderAssignList(serviceOrderData);
            } else {
                filterAndSearch();
            }
        }
    };

    // 加载服务单详情
    const loadOrderDetails = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = parseInt(urlParams.get('id'));
        const order = serviceOrderData.find(o => o.id === orderId);
        
        const detailsContainer = document.getElementById('detailsContainer');
        if (order && detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="details-item">
                    <span class="details-label">服务单号:</span>
                    <span class="details-value">${order.orderNo}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">服务名称:</span>
                    <span class="details-value">${order.serviceName}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">产品:</span>
                    <span class="details-value">${order.product}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">商户:</span>
                    <span class="details-value">${order.merchant}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">服务地区:</span>
                    <span class="details-value">${order.serviceArea}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">服务单状态:</span>
                    <span class="details-value">${getStatusText(order.status)}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">服务内容:</span>
                    <span class="details-value">${order.serviceContent}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">客户姓名:</span>
                    <span class="details-value">${order.customerName}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">联系电话:</span>
                    <span class="details-value">${order.customerPhone}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">客户地址:</span>
                    <span class="details-value">${order.customerAddress}</span>
                </div>
                <div class="details-item">
                    <span class="details-label">快递单号:</span>
                    <span class="details-value">${order.trackingNo}</span>
                </div>
            `;
        }
    };

    // === 事件监听 ===

    // 服务单列表页面
    if (document.getElementById('serviceOrderTable')) {
        renderServiceOrderList(serviceOrderData);

        document.getElementById('searchBtn').addEventListener('click', filterAndSearch);
        
        document.querySelector('#serviceOrderTable tbody').addEventListener('click', (e) => {
            const target = e.target;
            const orderId = parseInt(target.dataset.id);

            if (target.classList.contains('accept-order')) {
                e.preventDefault();
                acceptOrder(orderId);
            }
            if (target.classList.contains('cancel-order')) {
                e.preventDefault();
                cancelOrder(orderId);
            }
        });
    }

    // 派工页面
    if (document.getElementById('assignTable')) {
        // 重新加载最新的员工数据
        staffData = loadStaffData();
        renderAssignList(serviceOrderData);

        document.getElementById('searchBtn').addEventListener('click', () => {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const statusFilter = document.getElementById('statusFilter').value;
            
            const filteredData = serviceOrderData.filter(order => {
                const matchesSearch = order.orderNo.toLowerCase().includes(searchTerm) || 
                                    order.customerName.toLowerCase().includes(searchTerm);
                const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
                return matchesSearch && matchesStatus;
            });
            
            renderAssignList(filteredData);
        });
        
        document.querySelector('#assignTable tbody').addEventListener('click', (e) => {
            if (e.target.classList.contains('assign-order')) {
                e.preventDefault();
                const orderId = parseInt(e.target.dataset.id);
                showAssignModal(orderId);
            }
        });
    }

    // 服务单详情页面
    if (document.getElementById('detailsContainer')) {
        loadOrderDetails();
        
        document.getElementById('acceptOrder').addEventListener('click', () => {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = parseInt(urlParams.get('id'));
            acceptOrder(orderId);
        });
        
        document.getElementById('rejectOrder').addEventListener('click', () => {
            const reason = prompt('请输入拒绝原因：');
            if (reason) {
                alert('服务单已拒绝！');
                window.location.href = 'serviceorder-list.html';
            }
        });
    }

    // 模态框事件
    const modal = document.getElementById('assignModal');
    if (modal) {
        document.getElementById('confirmAssign').addEventListener('click', confirmAssign);
        document.getElementById('cancelAssign').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        document.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});
