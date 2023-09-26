var Calculator = function(displayClass, keysClass) {
  this.displayValue = '0';
  this.firstOperand = null;
  this.waitingForSecondOperand = false;
  this.currentOperator = null;
  this.currentOperatorClass = 'op-active';
  this.display = document.querySelector(displayClass);
  this.keys = document.querySelector(keysClass);
  this.calculate = {
    '/': (a, b) => a.div(b).valueOf(),
    '*': (a, b) => a.times(b).valueOf(),
    '+': (a, b) => a.add(b).valueOf(),
    '-': (a, b) => a.minus(b).valueOf(),
    '=': (a, b) => b
  };
};

Calculator.prototype = {

  operator(nextOperator) {
    const inputValue = Big(this.displayValue);

    if (this.currentOperator && this.waitingForSecondOperand)  {
      this.currentOperator = nextOperator;
      return;
    }

    if (this.firstOperand == null) {
      this.firstOperand = inputValue;
    } else if (this.currentOperator) {
      const currentValue = Big(this.firstOperand) || Big(0);
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
  },

  allclear() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.currentOperator = null;
  },

  posneg() {
    this.displayValue = Big(this.displayValue).neg().valueOf();
  },

  updateDisplay() {
    this.display.innerText = this.displayValue;
  },

  isOperatorBtn(el) {
    var isOp = false;
    if(typeof(el) === "object") {
      if(el.getAttribute('data-type') == 'operator' && el.innerText !== '=') {
        isOp = true;
      }
    }
    return isOp;
  },

  initEvents() {
    this.keys.addEventListener('click', (e) => {
      for(var i in this.keys.children) {
        var el = this.keys.children[i];
        if(this.isOperatorBtn(el)) {
          el.classList.remove(this.currentOperatorClass);
        }
      }
      if(this.isOperatorBtn(e.target)) {
        e.target.classList.add(this.currentOperatorClass);
      }
      if(this[e.target.getAttribute('data-type')]) {
        this[e.target.getAttribute('data-type')](e.target.value);
      }
      this.updateDisplay();
    });
    this.updateDisplay();
  }
};
