import '../css/help-file.css';
import { useEffect, useRef } from 'react';
import useOnClickOutside from '../custom_hooks/UseOnClickOutside';


function HelpWindow(props) {
	const { closeHelp, helpOpen } = props;

	const ref = useRef();
	useOnClickOutside(ref, () => {
		closeHelp();
	});

	return (
		<div id='help-file' className={helpOpen ? 'fade-in' : 'fade-out'}>
			<div ref={ref}>
				<button id='close-help' onClick={(event)=>{
                    event.stopPropagation();
                    closeHelp()
                }}>
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
							d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
				<p>Hello!</p>
			</div>
		</div>
	);
}

export default HelpWindow;
