// global variables that will help with clear's button functionality and set operands values.
let currentDigit = '';
let previousDigit = '';
let operation = null;

// DOM elements
const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-display');
const clearBtn = document.querySelector('[data-type="clear"]');
const equalBtn = document.querySelector('[data-type="equal"]');
const dotBtn = document.querySelector('[data-type="dot"]');
const digits = document.querySelectorAll('[data-type="number"]');
const operators = document.querySelectorAll('[data-type="operator"]');

equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
dotBtn.addEventListener('click', appendDot);

// go through DOM's node lists to add events to each button.
digits.forEach((button) => {
    button.addEventListener('click', (e) => {
        appendNumber(e.target.textContent);
    });
});
operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        chooseOperation(e.target.textContent);
    });
});

// appends numbers to screen and sets a limit to display's length, not allowing more entries if has already 12 digits on screen.
function appendNumber(number) {
    if(currentDigit.length <= 11) {
    currentDigit += number;
    currentDisplay.textContent = currentDigit;
    } else {
        currentDisplay.textContent = currentDigit + '...';
    }
}

// set operation and store current digit value on previous digit to make room for the second operand's input.
function chooseOperation(operator) {
    operation = operator;
    previousDigit = currentDigit;
    previousDisplay.textContent = `${previousDigit} ${operation}`;
    currentDigit = '';
    currentDisplay.textContent = '';
}

// appends a dot to the number, turning it in a decimal number, if it's not a decimal number already.
function appendDot() {
    if(!currentDigit.includes(".")){
        currentDigit += '.';
        currentDisplay.textContent = currentDigit;
    }
}

// restores all values of global variables and DOM variables that had been manipulated.
function clear() {
    previousDisplay.textContent = '';
    currentDisplay.textContent = '0';
    previousDigit = '';
    currentDigit = '';
    operation = null;
}

/* evaluates the equation and call the operate function to do the math if every check passed.
checks if: 
- user didn't pressed any digit and operation before click on equals button, so nothing must happen.
- user tried to divide 0 by any number, so an alert must pop-up to let him aware of his mistake. */
function evaluate() {
    if(previousDigit === '' && operation === null) return
    if(previousDigit === '0' && operation === '÷'){
        alert('You can\'t divide 0!');
        return;
    }
    operate(previousDigit, operation, currentDigit);
    operation = null;
}

// rounds the result so it doesn't break the display size.
const roundResult = (result) => Math.round(result * 1000) / 1000;

// handles arithmetic operations and update the screen with the result.
function operate(previousDigit, operation, currentDigit) {
    previousDigit = +(previousDigit);
    currentDigit = +(currentDigit);

    if (operation === '÷') previousDigit /= currentDigit;
    if (operation === '×') previousDigit *= currentDigit;
    if (operation === '−') previousDigit -= currentDigit;
    if (operation === '+') previousDigit += currentDigit;

    previousDisplay.textContent = '';
    currentDisplay.textContent = roundResult(previousDigit);
    operation = null;
}