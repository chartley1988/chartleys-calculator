
function HelpButton(props: any) {
    const { openHelp } = props;

	return (
		<button id="help-button" onClick={(event)=>{
            event.stopPropagation();
            openHelp();
        }}>
			Help
		</button>
	);
}

export default HelpButton
