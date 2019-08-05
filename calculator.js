var Calculator = function(displayId, inputClass) {
  this.total = 0;
  this.current = 0;
  this.currentDisplay = 0;
  this.operation = null;
  this.lastOperation = null;
  this.fractionExp = 0;
  this.displayEl = document.getElementById(displayId);
  this.btnEls = document.querySelectorAll('.' + inputClass);
  this.keyMap = {
    'C': 'clear',
    'AC': 'allClear',
    '×': 'multiply',
    '÷': 'divide',
    '+': 'add',
    '-': 'subtract',
    '=': 'equals',
    '.': 'point'
  };
};

Calculator.prototype = {
  add: function() { 
    this.operation = function(a, b) { return a + b; };
    this.calculate();
    this.current = 0;
  },
  subtract: function() {
    this.operation = function(a, b) { return a - b; };
    this.calculate();
    this.current = 0;
  },
  multiply: function() {
    this.operation = function(a, b) { return a * b; };
    this.calculate();
    this.current = 0;
  },
  divide: function() {
    this.operation = function(a, b) { return a / b; };
    this.calculate();
    this.current = 0;
  },
  equals: function() {
    this.calculate();
    this.operation = null;
    this.current = 0;
  },
  calculate: function() {
    if(this.operation) {
      this.total = this.operation(this.total, this.current);
    } 
    // if (this.operation) {
    //   this.total = this.operation(this.total, this.current);
    // } else {
    //   this.total = this.current;
    // }
    this.updateDisplay(this.total);
  },
  clear: function() {
    this.current = 0;
    this.fractionExp = 0;
    this.currentDisplay = 0;
    this.updateDisplay(this.current);
  },
  allClear: function() {
    this.clear();
    this.total = 0;
    this.operation = null;
  },
  digit: function(number) {
    if (this.fractionExp) {
      this.current = this.current + (number / Math.pow(10, this.fractionExp));
      this.fractionExp = this.fractionExp + 1;
    } else {           
      this.current = (this.current * 10) + number;
    }
    this.updateDisplay(this.current);
  },
  point: function() {
    this.fractionExp = 1;
  },
  updateDisplay: function(value) {
    this.currentDisplay = value;
    this.displayEl.innerText = this.currentDisplay;
  },
  initEvents: function() {
    var calc = this;
    this.btnEls.forEach((button) => {
      button.addEventListener('click', function(event) {
        var raw = event.target.innerText;
        var number = parseInt(raw, 10);
        if (isNaN(number)) {
          calc[calc.keyMap[raw]]();
        } else {
          calc.digit(number);
        }
        console.log(calc);
      });
    });
  }
};