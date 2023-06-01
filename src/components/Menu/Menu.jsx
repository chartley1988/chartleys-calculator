import HelpButton from '../HelpButton';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Fade as Hamburger } from 'hamburger-react';
import { getUserContext } from '../UserContext';
import style from '../Menu/Menu.module.css';

function Menu(props) {
	const { openHelp } = props;

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Hamburger size={32} />
			</DropdownMenu.Trigger>

			<DropdownMenu.Content className={style['menu-container']}>
				<DropdownMenu.Item className={style['menu-item']}>
					<SignIn />
				</DropdownMenu.Item>

				<DropdownMenu.Item
					className={style['menu-item']}
					onSelect={() => {
						openHelp();
					}}
				>
					Help
					<HelpButton openHelp={openHelp} />
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

function SignIn() {
	const userContext = getUserContext();
	const user = userContext.user;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<button
				className={style.hamburger}
				onClick={user ? userContext.signOutUser : userContext.signIn}
			>
				{user ? 'Sign Out' : 'Sign In'}
			</button>
		</div>
	);
}

export default Menu;
