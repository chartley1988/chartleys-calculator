import '../css/footer.css'

function FooterSelected(props) {
	const { moveLineUp, moveLineDown, currentLine, sum } = props;
	
	return (
		<footer>
			<div style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '0.5rem'
			}}>
			<button className='footer-button' onClick={() => {moveLineUp(currentLine)}}>
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

			<button className='footer-button' onClick={() => {moveLineDown(currentLine)}}>
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
			<p id="editor-sum">{`Sum: ${sum}`}</p>
		</footer>
	);
}

export default FooterSelected;
