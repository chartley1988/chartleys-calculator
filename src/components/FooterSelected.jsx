import '../css/footer.css';
import { useDataContext } from './DataContext';
import Sum from './Sum';

function FooterSelected(props) {
	const { currentLine, setCurrentLine, updateLineInputs } = props;
	const context = useDataContext();

	function moveLineUp(line_number) {
		if (line_number > 1) {
			const updatedData = context.data.slice();
			const entry = updatedData.find(
				(entry) => entry.line_number === line_number
			);
			const index = updatedData.indexOf(entry);
			const deleted = updatedData.splice(index, 1);
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			updatedData.splice(index - 1, 0, {
				line_number: 1, // Temp, reset below
				input_string: deleted[0].input_string,
				output_string: deleted[0].output_string,
				selected: true,
			});
			setCurrentLine(index);
			updatedData.forEach((entry) => {
				entry.line_number = updatedData.indexOf(entry) + 1;
			});
			context.setData(updatedData);
			updateLineInputs(updatedData);
			context.updateStorage();
		}
	}

	function moveLineDown(line_number) {
		if (line_number < context.data.length) {
			const updatedData = context.data.slice();
			const entry = updatedData.find(
				(entry) => entry.line_number === line_number
			);
			const index = updatedData.indexOf(entry);
			const deleted = updatedData.splice(index, 1);
			updatedData.forEach((entry) => {
				entry.selected = false;
			});
			updatedData.splice(index + 1, 0, {
				line_number: 1, // Temp, reset below
				input_string: deleted[0].input_string,
				output_string: deleted[0].output_string,
				selected: true,
			});
			setCurrentLine(index + 2);
			updatedData.forEach((entry) => {
				entry.line_number = updatedData.indexOf(entry) + 1;
			});
			context.setData(updatedData);
			updateLineInputs(updatedData);
			context.updateStorage();
		}
	}

	return (
		<footer>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '0.5rem',
				}}
			>
				<button
					className='footer-button'
					onClick={(event) => {
						event.stopPropagation();
						moveLineUp(currentLine);
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5'
						/>
					</svg>
				</button>

				<button
					className='footer-button'
					onClick={(event) => {
						event.stopPropagation();
						moveLineDown(currentLine);
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5'
						/>
					</svg>
				</button>
			</div>
			<Sum />
		</footer>
	);
}

export default FooterSelected;
