import React from 'react';
import style from './Register.module.css';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

// TODO - Add a confirm password field, and ensure they match.

type Inputs = {
	userEmail: string;
	userPassword: string;
};

function Register() {
	const [error, setError] = useState<null | string>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => submitUserData(data);

	async function submitUserData(data: Inputs) {
		const inputResult = fetch('http://localhost:3000/users/register', {
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
				return data;
			})
			.catch((error) => {
				setError(error.message);
			});
	}

	return (
		<div className={style.container}>
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

export default Register;
