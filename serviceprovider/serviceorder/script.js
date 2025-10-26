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
        },
        {
            id: 4,
            orderNo: 'SO20241201004',
            serviceName: '电视维修服务',
            product: 'TCL 55寸智能电视',
            merchant: 'TCL官方旗舰店',
            serviceArea: '北京市东城区',
            status: 'pending',
            customerName: '赵六',
            customerPhone: '13600136000',
            customerAddress: '北京市东城区王府井大街',
            serviceContent: '电视屏幕显示异常',
            trackingNo: 'YT1234567893'
        },
        {
            id: 5,
            orderNo: 'SO20241201005',
            serviceName: '热水器维修服务',
            product: '美的热水器F60-21WB1',
            merchant: '美的官方店',
            serviceArea: '北京市丰台区',
            status: 'accepted',
            customerName: '孙七',
            customerPhone: '13500135000',
            customerAddress: '北京市丰台区方庄路123号',
            serviceContent: '热水器加热功能故障',
            trackingNo: 'YT1234567894'
        },
        {
            id: 6,
            orderNo: 'SO20241201006',
            serviceName: '微波炉维修服务',
            product: '格兰仕微波炉P70D20TL-D4',
            merchant: '格兰仕专卖店',
            serviceArea: '北京市石景山区',
            status: 'completed',
            customerName: '周八',
            customerPhone: '13400134000',
            customerAddress: '北京市石景山区八角街道',
            serviceContent: '微波炉不加热故障',
            trackingNo: 'YT1234567895'
        },
        {
            id: 7,
            orderNo: 'SO20241201007',
            serviceName: '空调维修服务',
            product: '美的空调KFR-26GW',
            merchant: '美的专卖店',
            serviceArea: '北京市通州区',
            status: 'cancelled',
            customerName: '吴九',
            customerPhone: '13300133000',
            customerAddress: '北京市通州区运河大街',
            serviceContent: '空调制冷效果差',
            trackingNo: 'YT1234567896'
        }
    ];

    let staffData = [];
    let currentAssignOrderId = null;
    const STAFF_DATA_VERSION = '1.3'; // 与员工模块同步的数据版本号

    // 从 localStorage 加载员工数据
    const loadStaffData = () => {
        const rawData = localStorage.getItem('staffData');
        if (rawData) {
            const parsedData = JSON.parse(rawData);
            // 检查版本号和数据结构是否正确
            if (parsedData.version === STAFF_DATA_VERSION && Array.isArray(parsedData.data)) {
                return parsedData.data;
            }
        }
        // 如果数据不存在或版本不匹配，返回空数组
        return [];
    };

    // 存储服务单数据到 localStorage
    const saveServiceOrderData = () => {
        localStorage.setItem('serviceOrderData', JSON.stringify(serviceOrderData));
    };
    
    // 强制更新服务单模拟数据
    const forceUpdateData = () => {
        // 重新定义完整的服务单数据
        const updatedServiceOrderData = [
            {
                id: 1,
                orderNo: 'SO20241201001',
                serviceName: '家电维修服务',
                product: '海尔冰箱BCD-215STPA',
                merchant: '海尔官方旗舰店',
                serviceArea: '北京市朝阳区',
                status: 'pending',
                customerName: '王浩西',
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
                customerName: '王浩南',
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
                customerName: '王浩北',
                customerPhone: '13700137000',
                customerAddress: '北京市西城区金融街15号',
                serviceContent: '洗衣机脱水功能故障',
                trackingNo: 'YT1234567892'
            },
            {
                id: 4,
                orderNo: 'SO20241201004',
                serviceName: '电视维修服务',
                product: 'TCL 55寸智能电视',
                merchant: 'TCL官方旗舰店',
                serviceArea: '北京市东城区',
                status: 'pending',
                customerName: '赵一名',
                customerPhone: '13600136000',
                customerAddress: '北京市东城区王府井大街',
                serviceContent: '电视屏幕显示异常',
                trackingNo: 'YT1234567893'
            },
            {
                id: 5,
                orderNo: 'SO20241201005',
                serviceName: '热水器维修服务',
                product: '美的热水器F60-21WB1',
                merchant: '美的官方店',
                serviceArea: '北京市丰台区',
                status: 'accepted',
                customerName: '赵二名',
                customerPhone: '13500135000',
                customerAddress: '北京市丰台区方庄路123号',
                serviceContent: '热水器加热功能故障',
                trackingNo: 'YT1234567894'
            },
            {
                id: 6,
                orderNo: 'SO20241201006',
                serviceName: '微波炉维修服务',
                product: '格兰仕微波炉P70D20TL-D4',
                merchant: '格兰仕专卖店',
                serviceArea: '北京市石景山区',
                status: 'completed',
                customerName: '周八七',
                customerPhone: '13400134000',
                customerAddress: '北京市石景山区八角街道',
                serviceContent: '微波炉不加热故障',
                trackingNo: 'YT1234567895'
            },
            {
                id: 7,
                orderNo: 'SO20241201007',
                serviceName: '空调维修服务',
                product: '美的空调KFR-26GW',
                merchant: '美的专卖店',
                serviceArea: '北京市通州区',
                status: 'cancelled',
                customerName: '吴九十',
                customerPhone: '13300133000',
                customerAddress: '北京市通州区运河大街',
                serviceContent: '空调制冷效果差',
                trackingNo: 'YT1234567896'
            }
        ];
        
        serviceOrderData = updatedServiceOrderData;
        localStorage.setItem('serviceOrderData', JSON.stringify(serviceOrderData));
    };

    // 强制更新数据
    forceUpdateData();

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
            'accepted': '待派工',
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
                return `<a href="serviceorder-assign.html?orderId=${orderId}" class="assign-order">派工</a> <a href="#" class="cancel-order" data-id="${orderId}">取消</a>`;
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
            
            let matchesStatus = false;
            if (statusFilter === 'all') {
                matchesStatus = true;
            } else if (statusFilter === 'cancellable') {
                // 可取消：包含待派工(accepted)和已派工(assigned)状态
                matchesStatus = order.status === 'accepted' || order.status === 'assigned';
            } else {
                matchesStatus = order.status === statusFilter;
            }
            
            return matchesSearch && matchesStatus;
        });

        renderServiceOrderList(filteredData);
    };

    // 接收服务单
    const acceptOrder = (id) => {
        const order = serviceOrderData.find(o => o.id === id);
        if (!order || order.status !== 'pending') return;
        
        // 显示服务单详细信息
        const orderInfo = `
服务单详细信息：

服务单号：${order.orderNo}
服务名称：${order.serviceName}
产品：${order.product}
商户：${order.merchant}
服务地区：${order.serviceArea}
服务单状态：${getStatusText(order.status)}
服务内容：${order.serviceContent}
客户姓名：${order.customerName}
联系电话：${order.customerPhone}
客户地址：${order.customerAddress}
快递单号：${order.trackingNo}

确认接收此服务单吗？
        `;
        
        if (confirm(orderInfo)) {
            order.status = 'accepted';
            saveServiceOrderData();
            
            alert('接收服务单成功！');
            
            // 如果在详情页面，刷新页面显示最新状态
            if (document.getElementById('detailsContainer')) {
                loadOrderDetails();
            } else {
                // 如果在列表页面，刷新列表
                filterAndSearch();
            }
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
                            `<a href="#" class="assign-order" data-id="${order.id}">派工</a> <a href="#" class="cancel-order" data-id="${order.id}">取消</a>` : 
                            `<span>已派工</span> <a href="#" class="cancel-order" data-id="${order.id}">取消</a>`
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

    // 在派工页面渲染可选的维修师傅列表
    const renderAssignableStaffList = (staffList) => {
        const staffListContainer = document.getElementById('staffList');
        if (!staffListContainer) return;
        
        staffListContainer.innerHTML = '';
        if (staffList.length === 0) {
            staffListContainer.innerHTML = '<p>没有可派工的维修师傅。</p>';
            return;
        }

        staffList.forEach(staff => {
            const staffItem = document.createElement('div');
            staffItem.className = 'staff-item';
            staffItem.dataset.staffId = staff.id;
            
            const statusText = staff.status === 'active' ? '空闲' : '繁忙';
            const statusClass = staff.status === 'active' ? 'status-active' : 'status-suspended';
            
            staffItem.innerHTML = `
                <div class="staff-details">
                    <div class="staff-name">${staff.name}</div>
                    <div class="staff-meta">账号: ${staff.account}</div>
                    <div class="staff-meta">描述: ${staff.description}</div>
                </div>
                <div class="staff-status-badge ${statusClass}">${statusText}</div>
            `;
            
            staffItem.addEventListener('click', () => {
                document.querySelectorAll('.staff-item.selected').forEach(item => {
                    item.classList.remove('selected');
                });
                staffItem.classList.add('selected');
            });

            staffListContainer.appendChild(staffItem);
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
    const confirmAssign = (orderId, staffId) => {
        const order = serviceOrderData.find(o => o.id === orderId);
        const staff = staffData.find(s => s.id === staffId);
        
        if (order && staff) {
            order.status = 'assigned';
            order.assignedStaffId = staffId;
            order.assignedStaffName = staff.name;
            // saveServiceOrderData();
            
            alert(`派工成功！\n\n服务单已分配给 ${staff.name} 师傅。\n派工通知已发送。`);
            window.location.href = 'serviceorder-list.html';
        } else {
            alert('派工失败！无法找到服务单或维修师傅的详细信息，请刷新页面后重试。');
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
            
            // 根据服务单状态显示相应的操作按钮
            loadActionButtons(order);
        }
    };

    // 根据服务单状态加载操作按钮
    const loadActionButtons = (order) => {
        const actionButtons = document.getElementById('actionButtons');
        if (!actionButtons) return;
        
        let buttons = '';
        
        switch (order.status) {
            case 'pending':
                buttons = `
                    <button class="btn btn-primary" id="acceptOrder">接收服务单</button>
                    <button class="btn btn-danger" id="rejectOrder">拒绝服务单</button>
                `;
                break;
            case 'accepted':
                buttons = `
                    <a href="serviceorder-assign.html?orderId=${order.id}" class="btn btn-primary">派工</a>
                    <button class="btn btn-danger" id="cancelOrder">取消服务单</button>
                `;
                break;
            case 'assigned':
                buttons = `
                    <button class="btn btn-danger" id="cancelOrder">取消服务单</button>
                `;
                break;
            case 'completed':
                buttons = `
                    <span class="btn btn-success" style="background-color: #28a745; color: white; padding: 8px 16px; border-radius: 4px;">已完成</span>
                `;
                break;
            case 'cancelled':
                buttons = `
                    <span class="btn btn-secondary" style="background-color: #6c757d; color: white; padding: 8px 16px; border-radius: 4px;">已取消</span>
                `;
                break;
            default:
                buttons = '';
        }
        
        actionButtons.innerHTML = buttons + '<a href="serviceorder-list.html" class="btn btn-secondary">返回列表</a>';
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
    if (document.getElementById('assignContainer')) {
        // 重新加载最新的员工数据
        staffData = loadStaffData();
        
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = parseInt(urlParams.get('orderId'));
        const order = serviceOrderData.find(o => o.id === orderId);

        const assignContainer = document.getElementById('assignContainer');
        if (order && assignContainer) {
            assignContainer.innerHTML = `
                <div class="details-container">
                    <h4>服务单信息：</h4>
                    <div class="details-item"><span class="details-label">服务单号:</span> <span class="details-value">${order.orderNo}</span></div>
                    <div class="details-item"><span class="details-label">客户姓名:</span> <span class="details-value">${order.customerName}</span></div>
                    <div class="details-item"><span class="details-label">客户地址:</span> <span class="details-value">${order.customerAddress}</span></div>
                    <div class="details-item"><span class="details-label">服务内容:</span> <span class="details-value">${order.serviceContent}</span></div>
                </div>
            `;
            const assignableStaff = staffData.filter(staff => staff.permissions === '维修师傅' && staff.status === 'active');
            renderAssignableStaffList(assignableStaff);
        } else {
            assignContainer.innerHTML = '<p>无效的服务单！</p>';
        }

        document.getElementById('confirmAssign').addEventListener('click', () => {
            const selectedStaff = document.querySelector('.staff-item.selected');
            if (!selectedStaff) {
                alert('请选择一位维修师傅！');
                return;
            }
            const staffId = parseInt(selectedStaff.dataset.staffId);
            confirmAssign(orderId, staffId);
        });
    }

    // 服务单详情页面
    if (document.getElementById('detailsContainer')) {
        loadOrderDetails();
        
        // 使用事件委托处理动态生成的按钮
        document.addEventListener('click', (e) => {
            if (e.target.id === 'acceptOrder') {
                const urlParams = new URLSearchParams(window.location.search);
                const orderId = parseInt(urlParams.get('id'));
                acceptOrder(orderId);
            }
            
            if (e.target.id === 'rejectOrder') {
                const urlParams = new URLSearchParams(window.location.search);
                const orderId = parseInt(urlParams.get('id'));
                const order = serviceOrderData.find(o => o.id === orderId);
                
                if (order) {
                    const reason = prompt('请输入拒绝原因：');
                    if (reason) {
                        // 更新服务单状态为已取消，并记录拒绝原因
                        order.status = 'cancelled';
                        order.rejectReason = reason;
                        saveServiceOrderData();
                        
                        alert('服务单已拒绝！\n\n服务单号：' + order.orderNo + '\n拒绝原因：' + reason);
                        window.location.href = 'serviceorder-list.html';
                    }
                }
            }
            
            if (e.target.id === 'cancelOrder') {
                const urlParams = new URLSearchParams(window.location.search);
                const orderId = parseInt(urlParams.get('id'));
                cancelOrder(orderId);
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
