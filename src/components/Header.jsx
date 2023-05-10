import { useState } from 'react';
import { Logo } from '../components/Logo';
import '../css/header.css';
import HelpButton from './HelpButton';
import { getUserContext } from './UserContext';

function Header(props) {
	const { openHelp } = props;
	return (
		<header>
			<div>
				<Logo />
				SUMMIT
			</div>
			<SignIn />
			<HelpButton openHelp={openHelp} />
		</header>
	);
}

function SignIn() {
	const userContext = getUserContext();
	const user = userContext.user;

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<h2>{user ? `${user}` : ''}</h2>
			<button onClick={user ? userContext.signOutUser : userContext.signIn}>
				{user ? 'Sign Out' : 'Sign In'}
			</button>
		</div>
	);
}

export default Header;
