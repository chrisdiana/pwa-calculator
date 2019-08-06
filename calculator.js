var Calculator = function(displayClass, keysClass) {
  this.displayValue = '0';
  this.firstOperand = null;
  this.waitingForSecondOperand = false;
  this.currentOperator = null;
  this.display = document.querySelector(displayClass);
  this.keys = document.querySelector(keysClass);
  this.calculate = {
    '/': (a, b) => (a / b),
    '*': (a, b) => (a * b),
    '+': (a, b) => (a + b),
    '-': (a, b) => (a - b),
    '=': (a, b) => b
  };
};

Calculator.prototype = {

  operator(nextOperator) {
    const inputValue = parseFloat(this.displayValue);

    if (this.currentOperator && this.waitingForSecondOperand)  {
      this.currentOperator = nextOperator;
      return;
    }

    if (this.firstOperand == null) {
      this.firstOperand = inputValue;
    } else if (this.currentOperator) {
      const currentValue = this.firstOperand || 0;
      const result = this.calculate[this.currentOperator](currentValue, inputValue);
      this.displayValue = String(result);
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.currentOperator = nextOperator;
  },

  digit(digit) {
    if (this.waitingForSecondOperand === true) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue = this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  },

  decimal(dot) {
    if (this.waitingForSecondOperand === true) return;
    // If the `displayValue` does not contain a decimal point
    if (!this.displayValue.includes(dot)) {
      // Append the decimal point
      this.displayValue += dot;
    }
  },

  clear() {
    this.displayValue = '0';
    this.currentOperator = null;
  },

  allclear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.currentOperator = null;
  },

  updateDisplay() {
    this.display.innerText = this.displayValue;
  },

  initEvents() {
    this.keys.addEventListener('click', (e) => {
      this[e.target.getAttribute('data-type')](e.target.value);
      this.updateDisplay();
    });
    this.updateDisplay();
  }
};
