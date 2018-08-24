export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'Quản lý gara ô tô',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Quản lý xe & nhật ký bảo dưỡng',
      url: '/car/manager',
      icon: 'cui-arrow-circle-right'
    },
    {
      name: 'Quản lý khách hàng',
      url: '/customer/manager',
      icon: 'cui-arrow-circle-right'
    },
    {
      name: 'Quản lý nhà cung cấp',
      url: '/icons/coreui-icons',
      icon: 'cui-arrow-circle-right'
    },
    {
      name: 'Cố vấn và báo giá',
      url: '/icons/coreui-icons',
      icon: 'cui-arrow-circle-right'
    },
    {
      name: 'Báo cáo',
      url: '/icons/coreui-icons',
      icon: 'cui-arrow-circle-right'
    },
    {
      title: true,
      name: 'Giữ xe và mặt bằng',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      title: true,
      name: 'Quản lý nhà trọ',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      title: true,
      name: 'Báo cáo chung',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
  ]
}