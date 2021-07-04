var Calculator = function (displayClass, keysClass) {
  this.displayValue = "0";
  this.firstOperand = null;
  this.waitingForSecondOperand = false;
  this.currentOperator = null;
  this.currentOperatorClass = "op-active";
  this.display = document.querySelector(displayClass);
  this.keys = document.querySelector(keysClass);
  this.calculate = {
    "/": (a, b) => new Decimal(a).dividedBy(new Decimal(b)).toString(),
    "*": (a, b) => new Decimal(a).times(new Decimal(b)).toString(),
    "+": (a, b) => new Decimal(a).plus(new Decimal(b)).toString(),
    "-": (a, b) => new Decimal(a).minus(new Decimal(b)).toString(),
    "=": (a, b) => b,
  };
};

Calculator.prototype = {
  operator(nextOperator) {
    const inputValue = this.displayValue;

    if (this.currentOperator && this.waitingForSecondOperand) {
      this.currentOperator = nextOperator;
      return;
    }

    if (this.firstOperand == null) {
      this.firstOperand = inputValue;
    } else if (this.currentOperator) {
      const currentValue = this.firstOperand || 0;
      const result = this.calculate[this.currentOperator](
        currentValue,
        inputValue
      );
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
      this.displayValue =
        this.displayValue === "0" ? digit : this.displayValue + digit;
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
    this.displayValue = "0";
  },

  allclear() {
    this.displayValue = "0";
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.currentOperator = null;
  },

  posneg() {
    if (Math.sign(parseFloat(this.displayValue)) === 1) {
      this.displayValue = "-" + this.displayValue;
    } else {
      this.displayValue = this.displayValue.replace("-", "");
    }
  },

  updateDisplay() {
    this.display.innerText = this.displayValue;
    // always stick to the right when number overflows
    const leftPos = this.display.scrollWidth;
    this.display.scrollLeft = leftPos;
  },

  isOperatorBtn(el) {
    var isOp = false;
    if (typeof el === "object") {
      if (el.getAttribute("data-type") == "operator" && el.innerText !== "=") {
        isOp = true;
      }
    }
    return isOp;
  },

  initEvents() {
    this.keys.addEventListener("click", (e) => {
      for (var i in this.keys.children) {
        var el = this.keys.children[i];
        if (this.isOperatorBtn(el)) {
          el.classList.remove(this.currentOperatorClass);
        }
      }
      if (this.isOperatorBtn(e.target)) {
        e.target.classList.add(this.currentOperatorClass);
      }
      if (this[e.target.getAttribute("data-type")]) {
        this[e.target.getAttribute("data-type")](e.target.value);
      }
      this.updateDisplay();
    });
    this.updateDisplay();
  },
};
