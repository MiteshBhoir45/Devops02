const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

let firstValue = null;
let operator = null;
let waitingForSecondValue = false; // flag to indicate if the next input should clear the display

keys.addEventListener('click', (event) => {
    const { target } = event;
    const { value } = target;

    // Exit if the clicked element isn't a button
    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
            handleOperator(value);
            break;
        case '.':
            inputDecimal(value);
            break;
        case 'all-clear':
            resetCalculator();
            break;
        case '=':
            handleCalculate();
            break;
        default:
            // Must be a number
            inputDigit(value);
    }

    // Update the display for non-calculation results
    updateDisplay();
});

function inputDigit(digit) {
    if (waitingForSecondValue === true) {
        display.value = digit;
        waitingForSecondValue = false;
    } else {
        // If display is '0', replace it, otherwise append the digit
        display.value = display.value === '0' ? digit : display.value + digit;
    }
}

function inputDecimal(dot) {
    // Prevent adding multiple decimals
    if (!display.value.includes(dot)) {
        display.value += dot;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(display.value);

    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        firstValue = inputValue;
    } else if (operator) {
        const result = calculate(firstValue, inputValue, operator);
        display.value = result;
        firstValue = result; // Store result for chained operations
    }

    waitingForSecondValue = true;
    operator = nextOperator;
}

function handleCalculate() {
    if (operator === null || waitingForSecondValue) {
        return; // Do nothing if no operator or no second value entered
    }

    const secondValue = parseFloat(display.value);
    const result = calculate(firstValue, secondValue, operator);

    display.value = result;
    // Reset for the next calculation
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
}

function calculate(num1, num2, op) {
    if (op === '+') return num1 + num2;
    if (op === '-') return num1 - num2;
    if (op === '*') return num1 * num2;
    if (op === '/') return num1 / num2;
    return num2;
}

function resetCalculator() {
    firstValue = null;
    operator = null;
    waitingForSecondValue = false;
    display.value = '0';
}

function updateDisplay() {
    // This function is mostly handled within the event listener and inputDigit
    // but can be used for debugging or more complex display logic if needed.
}