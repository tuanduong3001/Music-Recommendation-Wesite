import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import MovieIcon from '@mui/icons-material/Movie';
import FaceIcon from '@mui/icons-material/Face';
export const menus = [
    {
      title: 'Người dùng',
      path: '/users',
      Icon: PersonIcon,
    },
    {
      title: 'Thể loại',
      path: '/categories',
      Icon: CategoryIcon,
    },
    {
      title: 'Ca sĩ',
      path: '/artists',
      Icon: FaceIcon,
    },
    {
      title: 'Nhạc',
      path: '/musics',
      Icon: MovieIcon,
    }
  ];
  