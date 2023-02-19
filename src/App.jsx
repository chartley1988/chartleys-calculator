import './css/main.css';
import Editor from './components/Editor';
import { DataContextProvider } from './components/DataContext';
import { Logo } from './components/Logo';

function App() {
	return (
		<div className='App'>
			<header>
				<Logo />
				SUMMIT
			</header>
			<DataContextProvider>
				<Editor />
			</DataContextProvider>
		</div>
	);
}

export default App;
