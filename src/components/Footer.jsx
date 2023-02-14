import '../css/footer.css';

function Footer(props) {
	const { clearSheet, addLine, sum } = props;

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
			<p id='editor-sum'>{`Sum: ${sum}`}</p>
		</footer>
	);
}

export default Footer;
