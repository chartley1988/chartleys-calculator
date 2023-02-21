import './css/main.css';
import Editor from './components/Editor';
import { DataContextProvider } from './components/DataContext';
import Header from './components/Header';
import { useState } from 'react';
import HelpWindow from './components/HelpWindow';

function App() {
	const [ helpOpen, setHelpOpen ] = useState(false);

	function openHelp () {
        setHelpOpen(true);
    }

	function closeHelp () {
		setHelpOpen(false);
	}

	return (
		<div className='App'>
			<Header openHelp={openHelp} />
			<DataContextProvider>
				<Editor />
			</DataContextProvider>
			<HelpWindow closeHelp={closeHelp} helpOpen={helpOpen} />
		</div>
	);
}

export default App;
