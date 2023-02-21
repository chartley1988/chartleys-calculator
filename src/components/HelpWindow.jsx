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
				<button
					id='close-help'
					onClick={(event) => {
						event.stopPropagation();
						closeHelp();
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
							d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
				</button>
				<h2>How to use this thing!</h2>
				<div id='help-content'>
					<section>
						<h3>What is Summit?</h3>
						<p>
							Summit is a Calculator that works by computing a
							text input into an answer. The input field is the
							left side, and the result appears on the right. Try
							typing an equation such as:
							<br />
							<code>4 + 9(2*3)</code>
							<br />
							As you type, the answer on the right will update.
							Summit can also incorporate basic note taking into
							the equations. Summit is smart enough to know what
							is math, and what are notes. So try something like:
							<br />
							<code> Sample Equation 4 + 9(2*3)</code>
							<br />
							Summit allows you to have as many lines as you want,
							and each line is its own calculator. In the bottom
							right, the <em>Sum</em> of all the results is
							caclulated. The name of the app is a terrible pun
							that comes from this function, '<i>sum-it</i>'. Get
							it??
						</p>
					</section>

					<br />

					<section>
						<h3>Basics</h3>
						<p>
							The interface of Summit is determined by whether a
							line is selected or not. You can select a line by
							either clicking the line number on the left, or the
							line input area. Clicking anywhere outside of the
							line will deselect it.
						</p>

						<h4>Valid Operators</h4>
						<p>
							Currently, the following operators are supported in
							equations:
						</p>
						<ul className='help-list'>
								<li>
									<code>+</code> :Addition
								</li>
                                <li>
									<code>-</code> :Subtraction
								</li>
                                <li>
									<code>*</code> :Multiplication
								</li>
                                <li>
									<code>/</code> :Division
								</li>
                                <li>
									<code>^</code> :Exponents
								</li>
                                <li>
									<code>()</code> :Brackets
								</li>
							</ul>

						<h4>Adding Lines</h4>
						<p>
							If no line is selected, you'll see a button that
							says 'Add Line', or on mobile it will simply be a
							'+'. Click this to add as many lines as you like.
							New lines are added to the bottom.
						</p>

						<h4>Clearing the Sheet</h4>
						<p>
							If no line is selected, a button labeled 'Clear
							Sheet' or 'Clr' on mobile will clear the entire
							sheet. Careful! This will erase <em>all lines</em>.
						</p>

						<h4>Re-ordering Lines</h4>
						<p>
							If a line is selected, there will be an up and down
							arrow in the control bar below. These controls will
							move a line up or down. Note that you will have to
							correct any line references yourself if you move any
							lines with line references.
						</p>
					</section>

					<br />

					<section>
						<h3>Line References</h3>
						<p>
							A line reference is a pointer to the result of a
							different line. For example, Line2 could take the
							result of Line1 and add a number to it. Updating the
							first line will then update the answer to any line
							that references it. This is very handy for chaining
							equations! Be careful not to have two lines
							reference each other though, this causes an infinite
							loop in the math, and result in an incorrect answer.
						</p>

						<p>
							There are two ways to reference a line. The first is
							manually typing it, this is done through the syntax
							of:
							<code>Line#</code>
							It must be typed exactly like that, with the first
							letter capitalized. Example would be 'Line2', would
							point to the result of the Second line.
						</p>

						<p>
							The second way to reference a line is while you have
							a cursor in an input field, click the result of any
							line. It will then automatically add the reference
							to the field.
						</p>

                        <br />

                        <button onClick={(event)=>{
                            event.stopPropagation();
                            closeHelp();
                        }}> ~That's it! Give it a try~ </button>
					</section>
				</div>
			</div>
		</div>
	);
}

export default HelpWindow;
