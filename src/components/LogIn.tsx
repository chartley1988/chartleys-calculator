import * as React from 'react';
import { useState } from 'react';
import style from '../css/LogIn.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';

type Inputs = {
	userEmail: string;
	userPassword: string;
};

function LogIn() {
	const [error, setError] = useState<null | string>(null);
	const [user, setUser] = useState<any>(null);
	const userContext = useUserContext();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => submitUserData(data);

	async function submitUserData(data: Inputs) {
		const inputResult = fetch('http://localhost:3000/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then(async (result) => {
				return result.json();
			})
			.then((data) => {
				setError(null);
				console.log(data);
				userContext[1]({
					userName: data.userName,
				});
				return data;
			})
			.catch((error) => {
				setError(error.message);
				userContext[1](undefined);
			});
	}

	return (
		<div className={style.container}>
			{userContext[0] ? <p>Welcome {userContext[0].userName}!</p> : <p>Welcome Guest</p>}
			<form onSubmit={handleSubmit(onSubmit)} className='flex-col'>
				<label htmlFor='userID'>User Email</label>
				<input
					className={style.loginInput}
					type='email'
					{...register('userEmail', {
						required: 'Email Address is Required',
					})}
				/>
				{errors.userEmail && (
					<p role='alert'>{errors.userEmail.message}</p>
				)}

				<label htmlFor='userID'>Password</label>
				<input
					className={style.loginInput}
					type='password'
					{...register('userPassword', {
						required: 'Password required',
					})}
				/>
				{errors.userPassword && (
					<p role='alert'>{errors.userPassword.message}</p>
				)}

				<input type='submit' className={style.btn} />
				{error && <p role='alert'>Request Failed To Send</p>}
			</form>
			<div>
				<p>
					Don't have an account yet?{' '}
					<strong>
						<Link to={'/register'}>Sign up Now!</Link>
					</strong>{' '}
					now!
				</p>
				<p>
					Or <Link to={'/calculator'}>try it out</Link> now without
					signing up.
				</p>
			</div>
		</div>
	);
}

export default LogIn;
