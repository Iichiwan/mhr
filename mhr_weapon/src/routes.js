import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import Dashboard1 from '@/pages/Dashboard1';

const routerConfig = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dash',
        component: Dashboard,
      },
      {
        path: '/dash1',
        component: Dashboard1,
      },
    ],
  },
];
export default routerConfig;
