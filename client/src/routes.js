import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const CarGeneral = Loadable({
  loader: () => import('./views/Car/CarGeneral'),
  loading: Loading,
})

const CarManager = Loadable({
  loader: () => import('./views/Car/CarManager'),
  loading: Loading,
})

const CustomerGeneral = Loadable({
  loader: () => import('./views/Customer/CustomerGeneral'),
  loading: Loading,
})

const CustomerManager = Loadable({
  loader: () => import('./views/Customer/CustomerManager'),
  loading: Loading,
})

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Trang chủ', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/car', exact: true, name: 'Xe', component: CarGeneral },
  { path: '/car/manager', name: 'Quản lý', component: CarManager },
  { path: '/customer', exact: true,  name: 'Khách hàng', component: CustomerGeneral },
  { path: '/customer/manager', name: 'Quản lý', component: CustomerManager },
  { path: '/users', exact: true,  name: 'Người dùng', component: Users },
  { path: '/users/:id', exact: true, name: 'Chi tiết người dùng', component: User },
];

export default routes;
