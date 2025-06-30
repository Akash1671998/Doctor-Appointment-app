
import TableChartIcon from '@mui/icons-material/TableChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockResetIcon from '@mui/icons-material/LockReset';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const userMenu = [
  {
    label: 'Appointment',
    icon: <WorkHistoryIcon />,
    path: '/expense-table',
  },
  {
    label: 'Apply Doctor',
    icon: <LocalHospitalIcon />,
    path: '/add-expense',
  },
  {
    label: "Profile",
    icon: <AccountBoxIcon />,
    path: '/add-expense',
  },
  {
    label: 'Change Password',
    icon: <LockResetIcon />,
    path: '/ChangePassword',
  },
];

export default userMenu;
