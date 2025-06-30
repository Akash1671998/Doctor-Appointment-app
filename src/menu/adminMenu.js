// src/menus/AdminMenu.js
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import MedicationIcon from '@mui/icons-material/Medication';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const adminMenu = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    label: 'Add Doctor',
    icon: <MedicationIcon />,
    path: '/doctor',
  },
  {
    label: 'Doctor List',
    icon: <FormatListBulletedIcon />,
    path: '/details',
  },
  {
    label: 'User',
    icon: <AccountCircleIcon />,
    path: '/user-profilexxx',
  },
  {
    label: 'User Profile',
    icon: <SupervisedUserCircleIcon />,
    path: '/user-profile',
  },
  {
    label: 'Change User Password',
    icon: <LockResetIcon />,
    path: '/change-user-password',
  },
];

export default adminMenu;
