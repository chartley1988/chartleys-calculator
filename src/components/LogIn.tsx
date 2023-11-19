import { useState } from 'react';
import style from '../css/LogIn.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';

type Inputs = {
	userEmail: string;
	userPassword: string;
};

function LogIn() {
	const [error, setError] = useState<null | string>(null);
	const userContext = useUserContext();
	const user = userContext[0];
	const setUser = userContext[1];
	const navigate = useNavigate();

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
				setUser({
					userName: data.userName,
				});
				navigate('/calculator');
				return data;
			})
			.catch((error) => {
				setError(error.message);
				setUser(undefined);
			});
	}

	return (
		<div className={style.container}>
			{userContext[0] ? (
				<p>Welcome {userContext[0].userName}!</p>
			) : (
				<p>Welcome Guest</p>
			)}
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
