import { Logo } from '../components/Logo';
import '../css/header.css';
import HelpButton from './HelpButton';

function Header(props) {
	const { openHelp } = props;
	return (
		<header>
			<div>
				<Logo />
				SUMMIT
			</div>
			<HelpButton openHelp={openHelp} />
		</header>
	);
}

export default Header;
