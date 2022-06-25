
function operate(a, operator, b) {
    a = +(a);
    b = +(b);

    if(operator === 'divide') return a / b;
    if(operator === 'multiply') return a * b;
    if(operator === 'minus') return a - b;
    if(operator === 'plus') return a + b;
};

console.log(operate(5, 'multiply', 10));