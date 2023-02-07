function operators () {
    function addNumbers(a: number, b: number): number {
        return a + b;
    }
    
    function subtractNumbers(a: number, b: number): number {
        return a - b;
    }
    
    function multiplyNumbers(a: number, b: number): number {
        return a * b;
    }
    
    function divideNumbers(a: number, b: number): number | string {
        if (b === 0) return 'Error! Divide by Zero';
        return a / b;
    }
    
    function exponentNumbers(a: number, b: number): number | string {
        return a**b;
    }

    return {
        addNumbers,
        subtractNumbers,
        multiplyNumbers,
        divideNumbers,
        exponentNumbers
    }
};

export default operators