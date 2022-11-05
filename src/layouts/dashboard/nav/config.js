// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'home',
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: 'crypto',
    path: '/dashboard/crypto',
    icon: icon('ic_bitcoin'),
  },
  {
    title: 'NFTS',
    path: '/dashboard/products',
    icon: icon('ic_nft'),
  },
];

export default navConfig;
