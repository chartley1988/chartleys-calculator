import { useEffect, useState } from 'react';
import { Logo } from '../components/Logo';
import style from '../css/Header.module.css';
import HelpButton from './HelpButton';
import Menu from './Menu/Menu.jsx';
import { getUserContext } from './UserContext';

function Header(props) {
	const { openHelp } = props;

	return (
		<header>
			<div className={style['title-container']}>
				<Logo />
				SUMMIT
			</div>
			<div className={style['icon-container']}>
				<UserPicture />
				<HelpButton />
				<Menu openHelp={openHelp} />
			</div>
		</header>
	);
}

function UserPicture() {
	const context = getUserContext();
	const [url, setUrl] = useState(null);

	useEffect(() => {
		if (context.user) {
			setUrl(context.user.photoURL);
		} else {
			setUrl(null);
		}
	}, [context]);

	return (
		<>
			{url ? (
				<div className={`${style.icon} `}>
					<img src={url} alt='' className={style['profile-picture']} />
				</div>
			) : (
				<div className={`${style.icon} `}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={`w-6 h-6 ${style['profile-picture']}`}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
						/>
					</svg>
				</div>
			)}
		</>
	);
}

export default Header;
