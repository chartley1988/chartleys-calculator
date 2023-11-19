import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Cross, Cross as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { useUserContext } from './UserContext';
import style from '../css/menu.module.css';

// Menu options if logged in
const menuOptionsUser = [
	{
		text: 'Save',
	},
	{
		text: 'Save As',
	},
	{
		text: 'Load',
	},
	{
		text: 'User',
	},
	{
		text: 'Log Out',
	},
	{
		text: 'Help',
	},
];

// Menu options if NOT logged in
const menuOptions = [
	{
		text: 'Sign In',
	},
	{
		text: 'Help',
	},
];

function Menu(props: any) {
	const user = useUserContext();

	return (
		<DropdownMenu.Root dir={'rtl'}>
			{/* Menu Button  */}
			<DropdownMenu.Trigger className={style.menuButton}>
				<Cross />
			</DropdownMenu.Trigger>

			{/* Menu Content  */}
			<DropdownMenu.Content className={style.container}>
				{(user[0] !== undefined)
					? menuOptionsUser.map((item) => {
							return (
								<DropdownMenu.Item>
									{item.text}
								</DropdownMenu.Item>
							);
					  })
					: menuOptions.map((item) => {
							return (
								<DropdownMenu.Item>
									{item.text}
								</DropdownMenu.Item>
							);
					  })}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
}

export default Menu;
