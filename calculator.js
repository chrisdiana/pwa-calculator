var Calculator = function(displayId, inputClass) {
  this.total = 0;
  this.current = 0;
  this.operation = null;
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
      this.setCurrent(0, "");
      this.fractionExp = 0;
  },
  subtract: function() {
      this.calculate();
      this.operation = function(a, b) { return a - b; };
      this.setCurrent(0, "");
      this.fractionExp = 0;
  },
  multiply: function() {
      this.calculate();
      this.operation = function(a, b) { return a * b; };
      this.setCurrent(0, "");
      this.fractionExp = 0;
  },
  divide: function() {
      this.calculate();
      this.operation = function(a, b) { return a / b; };
      this.setCurrent(0, "");
      this.fractionExp = 0; 
  },
  clear: function() {
      this.setCurrent(0, "");
      this.fractionExp = 0; 
  },
  allClear: function() {
      this.clear();
      this.total = 0;
      this.operation = null;
      this.fractionExp = 0;
  },
  calculate: function() {
    if (this.operation) {
      this.total = this.operation(this.total, this.current);
    } else {
      this.total = this.current;
    }
  },
  equals: function() {
    this.calculate();
    this.updateDisplay(this.total);
  },
  digit: function(number) {
    if (this.fractionExp) {
      this.setCurrent(this.current + (number / Math.pow(10, this.fractionExp)));
      this.fractionExp = this.fractionExp + 1;
    } else {            
      this.setCurrent((this.current * 10) + number);
    }
  },
  point: function() {
      this.fractionExp = 1;
  },
  setCurrent: function(value, text) {
    this.current = value;
    this.updateDisplay(typeof text == "undefined" ? this.current : text);
  },
  updateDisplay: function(value) {
    this.displayEl.innerText = value;
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
      });
    });
  }
};