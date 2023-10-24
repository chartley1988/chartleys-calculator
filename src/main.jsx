import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './HomePage/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/calculator",
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
