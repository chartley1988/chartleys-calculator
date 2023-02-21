Summit Calculator,
a project by Carson Hartley

Summit is a calculator based off a mobile app called Soulver. It's a line based calculator, that reacts to text as its being typed. You can have as many lines as you like, and one line can reference the result of another. In this way, you can chain equations together.

How does it work? Well, basically, every time the text in the input field is changed: 1) The string gets cleaned and filtered. In this step, references are processed, empty spaces removed, etc. This outputs an array of 'tokens'. 2) The array of tokens is then put through an algorith called The Shunting Yard algorithm, and the output of this is RPN, or reverse Polish Notation. This format is much easier for a computer to read then our own readable bracket notation for equations. 3) The RPN is then solved to an output, and the output is printed in the result container.

There are features I'd like to implement in the future such as:

-   units
-   the ability to hide the equation except for specified inputs and outputs
-   save multiple sheets
-   declare custom variables to be used anywhere on the sheet.

I hope you enjoy, it represents my first real foray into a react app, and I had lot of fun making it. If you have some feedback, don't hesititate to let me know
at chartley1988@gmail.com.

Cheers!
Chartley
