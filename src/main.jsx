import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './HomePage/Home';
import Register from './Register/Register';
import LogIn from './components/LogIn';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContextProvider } from './components/UserContext';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,

		children: [
			{
				element: <LogIn />,
				index: true,
			},
			{
				element: <LogIn />,
				path: '/log-in',
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},
	{
		path: '/calculator',
		element: <App />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	</React.StrictMode>
);
