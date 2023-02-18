import { useEffect, useState } from "react";
import { useDataContext } from "./DataContext";

function Sum () {
    const context = useDataContext();
    const [ sum, setSum ] = useState(calculateSum())
    
    useEffect(()=>{
        setSum(calculateSum())
    }, [context.data])

    function calculateSum() {
		let sum = 0;
		context.data.forEach((entry) => {
			let value = Number(entry.output_string);
			if (
				(entry.output_string === 'NaN') |
				(entry.output_string === 'Error! Divide by Zero')
			) {
				value = 0;
			}
			sum += value;
		});
		return sum;
	}

    return <p id='editor-sum'>{`Sum: ${sum}`}</p>
}

export default Sum