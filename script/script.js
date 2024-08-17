let text = "0";

function myFunction(A) {
    if (text === "0") {
        text = ""; // Clear the display if it is zero
    }
    text += A;
    updateTextBox();
}

function updateTextBox() {
    const textBox = document.getElementById("textBox");
    if (textBox) {
        textBox.textContent = text;
    } else {
        console.error("Element with ID 'textBox' not found.");
    }
}

function myFunctionB(B) {
    if (B === "AC") {
        text = "0";
        updateTextBox();
    } else if (B === 'is_equle') {
        try {
            text = evaluate(text).toString();
        } catch (e) {
            text = "Error";
        }
        updateTextBox();
    } else if (B === "back") {
        if (text.length > 0 && text !== "0") {
            text = text.slice(0, -1) || "0";
        }
        updateTextBox();
    }
}

function evaluate(expression) {
    let tokens = expression.split(/([()+*-/^√!π])/).filter(token => token.trim() !== '');

    let values = [];
    let ops = [];

    for (let token of tokens) {
        token = token.trim();

        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } else if (token === '(') {
            ops.push(token);
        } else if (token === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }
            ops.pop(); // Pop the '('
        } else if (token === 'π') {
            values.push(Math.PI);
        } else if (token === '√') {
            values.push(Math.sqrt(values.pop()));
        } else if (token === '!') {
            values.push(factorial(values.pop()));
        } else if (token === '^') {
            let base = values.pop();
            let exponent = values.pop();
            values.push(Math.pow(exponent, base));
        } else if (['+', '-', '*', '/'].includes(token)) {
            while (ops.length > 0 && hasPrecedence(token, ops[ops.length - 1])) {
                values.push(applyOp(ops.pop(), values.pop(), values.pop()));
            }
            ops.push(token);
        }
    }

    while (ops.length > 0) {
        values.push(applyOp(ops.pop(), values.pop(), values.pop()));
    }

    return values.pop();
}

function hasPrecedence(op1, op2) {
    if (op2 === '(' || op2 === ')') return false;
    if (op1 === '^') return false;
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) return false;
    return true;
}

function applyOp(op, b, a) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b === 0 ? "Cannot divide by zero" : a / b;
        case '^': return Math.pow(a, b);
        default: return 0;
    }
}

function factorial(n) {
    if (n < 0) return "Invalid input";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
