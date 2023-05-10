import './css/main.css';
import Editor from './components/Editor';
import UserContextProvider from './components/UserContext';
import { DataContextProvider } from './components/DataContext';
import Header from './components/Header';
import { useState } from 'react';
import HelpWindow from './components/HelpWindow';

function App() {
	const [helpOpen, setHelpOpen] = useState(false);

	function openHelp() {
		setHelpOpen(true);
	}

	function closeHelp() {
		setHelpOpen(false);
	}

	return (
		<div className='App'>
			<div className='wrapper'>
				<UserContextProvider>
					<Header openHelp={openHelp} />
					<DataContextProvider>
						<Editor />
					</DataContextProvider>
				</UserContextProvider>
				<HelpWindow closeHelp={closeHelp} helpOpen={helpOpen} />
			</div>
		</div>
	);
}

export default App;
