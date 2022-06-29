// global variables that store initial values for operands and operator.
let currentDigit = '';
let previousDigit = '';
let operation = null;

// DOM elements
const currentDisplay = document.getElementById('current-display');
const previousDisplay = document.getElementById('previous-display');
const clearBtn = document.querySelector('[data-type="clear"]');
const backspcBtn = document.querySelector('[data-type="backspace"]');
const equalBtn = document.querySelector('[data-type="equal"]');
const dotBtn = document.querySelector('[data-type="dot"]');
const digits = document.querySelectorAll('[data-type="number"]');
const operators = document.querySelectorAll('[data-type="operator"]');

window.addEventListener('keydown', getKeyboardInput);
clearBtn.addEventListener('click', clear);
backspcBtn.addEventListener('click', eraseNumber);
equalBtn.addEventListener('click', evaluate);
dotBtn.addEventListener('click', appendDot);

// goes through DOM's node lists to add events to each button.
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

// ########## adds keyboard support ##########
function getKeyboardInput(btn) {
    // keyboard numbers
    if (btn.key >= 0 && btn.key <= 9) appendNumber(btn.key);
    // keyboard operators
    if (btn.key === '/' || btn.key === '*' || btn.key === '-' || btn.key === '+') {
        chooseOperation(convertKey(btn.key));
    }
    // keyboard ESC
    if (btn.key === 'Escape') clear();
    // keyboard backspace
    if (btn.key === 'Backspace') eraseNumber();
    // keyboard enter
    if (btn.key === 'Enter') evaluate();
    // keyboard dot
    if (btn.key === '.') appendDot();
}

// converts arithmetic symbols to match with keyboard symbols input
function convertKey(operator) {
    if (operator === '/') return '÷';
    if (operator === '*') return '×';
    if (operator === '-') return '−';
    if (operator === '+') return '+';
}
// ###########################################

/* appends numbers to screen and sets a limit to display's length, 
not allowing more entries if has already 12 digits on screen. */
function appendNumber(number) {
    if (currentDigit.length <= 11) {
        currentDigit += number;
        currentDisplay.textContent = currentDigit;
    } else {
        currentDisplay.textContent = currentDigit + '...';
    }
}

/* sets operation and stores current digit value on previous digit to make room 
for the second operands input. also calls evaluate function ealier if user tries
to calculate more than one operation before pressing equals button. */
function chooseOperation(operator) {
    if (operation === null) {
        operation = operator;
        previousDigit = currentDigit;
        previousDisplay.textContent = `${previousDigit} ${operation}`;
        currentDigit = '';
        currentDisplay.textContent = '';
    } else {
        evaluate();
        operation = operator;
        previousDigit = currentDisplay.textContent;
        previousDisplay.textContent = `${previousDigit} ${operation}`;
        currentDigit = '';
        currentDisplay.textContent = '';
    }
}

// appends a dot to the number, turning it in a decimal number, if it's not a decimal number already.
function appendDot() {
    if (!currentDigit.includes(".")) {
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

// string slice() method to erase the last number entered.
function eraseNumber() {
    currentDigit = currentDigit.toString().slice(0, -1);
    currentDisplay.textContent = currentDigit;
}

/* evaluates the equation and call the operate function to do the math if every check passed.
checks if: 
- user didn't pressed any digit and operation before click on equals button, so nothing must happen.
- user tried to divide 0 by any number, so an alert must pop to aware this mistake. */
function evaluate() {
    if (previousDigit === '' && operation === null) return
    if (previousDigit === '0' && operation === '÷') {
        clear();
        currentDisplay.textContent = 'Error';
        alert('You can\'t divide 0!');
        return;
    }
    operate(previousDigit, operation, currentDigit);
    previousDisplay.textContent = `${previousDigit} ${operation} ${currentDigit}`;
    currentDigit = currentDisplay.textContent;
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

    currentDisplay.textContent = roundResult(previousDigit);
}