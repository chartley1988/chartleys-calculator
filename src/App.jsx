import './css/main.css';
import Editor from './components/Editor';

function App() {
	return (
		<div className='App'>
			<header>
				<svg
          fill='currentColor'
					xmlns='http://www.w3.org/2000/svg'
					width='15'
					height='15'
					x='0'
					y='0'
					enableBackground='new 0 0 15 15'
					version='1.1'
					viewBox='0 0 15 15'
					xmlSpace='preserve'
				>
					<path d='M7.5 2c-.3 0-.4.2-.6.4l-5.8 9.5c-.1.1-.1.3-.1.4 0 .5.4.7.7.7h11.6c.4 0 .7-.2.7-.7 0-.2 0-.2-.1-.4L8.2 2.4C8 2.2 7.8 2 7.5 2zm0 1.5L10.8 9H10L8.5 7.5 7.5 9l-1-1.5L5 9h-.9l3.4-5.5z'></path>
				</svg>
				SUMMIT
			</header>
			<Editor />
		</div>
	);
}

export default App;
