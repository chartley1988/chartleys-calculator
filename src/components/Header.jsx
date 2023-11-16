import { Logo } from '../components/Logo';
import '../css/header.css';
import HelpButton from './HelpButton';
import { useUserContext } from './UserContext';

function Header(props) {
	const user = useUserContext();
	const { openHelp } = props;
	return (
		<header>
			<div>
				<Logo />
				SUMMIT
			</div>
			<div>
				{user[0]? `${user[0].userName}` : '' }
			</div>
			<HelpButton openHelp={openHelp} />
		</header>
	);
}

export default Header;
