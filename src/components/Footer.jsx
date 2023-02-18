import '../css/footer.css';
import { useDataContext } from './DataContext';
import Sum from './Sum';


function Footer() {

	const context = useDataContext();

	function clearSheet() {
		const updatedData = [
			{
				line_number: 1,
				input_string: '',
				output_string: '',
				selected: false,
			},
		];
		context.updateStorage(updatedData)
		context.setData(updatedData);
	}

	function addLine() {
		const updatedData = context.data.slice();
		const newLine = {
			line_number: context.data.length + 1,
			input_string: '',
			output_string: '',
			selected: false,
		};
		updatedData.push(newLine);
		context.updateStorage(updatedData);
		context.setData(updatedData);
	}

	return (
		<footer>
			<div
				style={{
					display: 'flex',
					gap: '0.75rem',
				}}
			>
				<button
					className='footer-button desktop'
					onClick={(event) => {
						event.stopPropagation();
						clearSheet();
					}}
				>
					Clear Sheet
				</button>

				<button
					className='footer-button mobile'
					onClick={(event) => {
						event.stopPropagation();
						clearSheet();
					}}
				>
					Clr
				</button>

				<button
					className='footer-button desktop'
					onClick={(event) => {
						event.stopPropagation();
						addLine();
					}}
				>
					Add Line
				</button>

				<button
					className='footer-button mobile'
					onClick={(event) => {
						event.stopPropagation();
						addLine();
					}}
				>
					+
				</button>
			</div>
			<Sum />
		</footer>
	);
}

export default Footer;
