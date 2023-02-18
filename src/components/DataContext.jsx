import { useContext, createContext, useState } from 'react';

const DataContext = createContext(null)

export function DataContextProvider(props) {
	const [data, setData] = useState([
		{
			line_number: 1,
			input_string: '',
			output_string: '',
			selected: false,
		},
		{
			line_number: 2,
			input_string: '',
			output_string: '',
			selected: false,
		},
		{
			line_number: 3,
			input_string: '',
			output_string: '',
			selected: false,
		},
	]);

    function updateStorage() {
        localStorage.setItem('userData', JSON.stringify(data))
    }

	return (
		<DataContext.Provider value={{ data, setData, updateStorage }}>
            {props.children}
        </DataContext.Provider>
	);
}

export const useDataContext = () => useContext(DataContext);


