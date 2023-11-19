import { Logo } from '../components/Logo';
import style from '../css/header.module.css';
import HelpButton from './HelpButton';
import { useUserContext } from './UserContext';
import Menu from '../components/Menu';

function Header(props) {
	const user = useUserContext();
	const { openHelp } = props;
	return (
		<header>
			<div>
				<Logo />
			</div>
			<h1>Sheet Name</h1>
			<Menu openHelp={openHelp} />
		</header>
	);
}

export default Header;
