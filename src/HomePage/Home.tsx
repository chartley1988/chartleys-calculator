import React from 'react';
import style from './Home.module.css';
import LogIn from '../components/LogIn';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<div className={style.background}>
			<main className={style.container}>
				<h1>Summit Calculator</h1>

				<div className={style.hero}>
					<div>
						<h2>Welcome to Summit Calculator</h2>
						<p>
							Summit Calculator is an app that allows you to write
							calculations naturally.
						</p>
					</div>
					<Outlet />

					
				</div>
			</main>
		</div>
	);
}

export default Home;
