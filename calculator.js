var Calculator = function(displayId, inputClass) {
  this.total = 0;
  this.current = 0;
  this.currentDisplay = 0;
  this.operation = null;
  this.lastOperation = null;
  this.fractionExp = 0;
  this.displayEl = document.getElementById(displayId);
  this.btnEls = document.querySelectorAll('.' + inputClass);
  this.map = {
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
    this.calculate();
    this.operation = function(a, b) { return a + b; };
    this.currentDisplay = this.current;
    this.current = 0;
    this.fractionExp = 0;
  },
  subtract: function() {
    this.calculate();
    this.operation = function(a, b) { return a - b; };
    this.currentDisplay = this.current;
    this.current = 0;
    this.fractionExp = 0;
  },
  multiply: function() {
    this.calculate();
    this.operation = function(a, b) { return a * b; };
    this.currentDisplay = this.current;
    this.current = 0;
    this.fractionExp = 0;
  },
  divide: function() {
    this.calculate();
    this.operation = function(a, b) { return a / b; };
    this.currentDisplay = this.current;
    this.current = 0;
    this.fractionExp = 0; 
  },
  clear: function() {
    this.current = 0;
    this.fractionExp = 0;
    this.currentDisplay = 0;
    this.updateDisplay();
  },
  allClear: function() {
    this.clear();
    this.total = 0;
    this.operation = null;
  },
  calculate: function() {
    if (this.operation) {
      this.total = this.operation(this.total, this.current);
    } else {
      this.total = this.current;
    }
    this.currentDisplay = this.total;
    this.updateDisplay();
  },
  equals: function() {
    this.calculate();
  },
  digit: function(number) {
    var num = null;
    if (this.fractionExp) {
      num = this.current + (number / Math.pow(10, this.fractionExp));
      this.current = num;
      this.fractionExp = this.fractionExp + 1;
      //this.setCurrentDisplay(num);
    } else {           
      num = (this.current * 10) + number; 
      this.current = num;
      //this.setCurrentDisplay(num);
    }
    this.currentDisplay = this.current;
    this.updateDisplay();
  },
  point: function() {
    this.fractionExp = 1;
  },
  updateDisplay: function() {
    this.displayEl.innerText = this.currentDisplay;
  },
  initEvents: function() {
    var calc = this;
    this.btnEls.forEach((button) => {
      button.addEventListener('click', function(event) {
        var raw = event.target.innerText;
        var number = parseInt(raw, 10);
        if (isNaN(number)) {
          calc[calc.map[raw]]();
        } else {
          calc.digit(number);
        }
        console.log(calc);
      });
    });
  }
};