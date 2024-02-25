let numbers = document.querySelectorAll('.num');
let operator;
let clickedNumber1 = '';
let clickedNumber2 = '';
let currentNumber = '';
let display = document.querySelector('.display p');

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', () => {
    currentNumber += numbers[i].textContent;
    updateDisplay();
  });
}
document.querySelector('.sum').addEventListener('click', () => handleOperatorClick("+"));
document.querySelector('.subtract').addEventListener('click', () => handleOperatorClick("-"));
document.querySelector('.multiply').addEventListener('click', () => handleOperatorClick("*"));
document.querySelector('.divide').addEventListener('click', () => handleOperatorClick("/"));
document.querySelector('.remainder').addEventListener('click', () => handleOperatorClick("%"));
document.querySelector('.root').addEventListener('click', () => handleOperatorClick("√"));

document.querySelector('.equals').addEventListener('click', () => {
  if (operator && clickedNumber1 && currentNumber) {
    clickedNumber2 = currentNumber;
    operate();
    currentNumber = '';
  }
});
function handleOperatorClick(selectedOperator) {
  if (currentNumber && clickedNumber1) {
    clickedNumber2 = currentNumber;
    operate(); 
    operator = selectedOperator; // Set the new operator for the next operation
    currentNumber = '';          // Reset currentNumber for the next input
  } else if (currentNumber) {
    operator = selectedOperator;
    clickedNumber1 = currentNumber;
    currentNumber = '';
    updateDisplay();
  } else if (!currentNumber && clickedNumber1) {
    // This condition allows changing the operator if no new number has been entered yet
    operator = selectedOperator;
    updateDisplay();
  }
}
function operate() {
  let result;
  switch (operator) {
    case "+":
      result = add(parseFloat(clickedNumber1), parseFloat(clickedNumber2));
      break;
    case "-":
      result = subtract(parseFloat(clickedNumber1), parseFloat(clickedNumber2));
      break;
    case "*":
      result = multiply(parseFloat(clickedNumber1), parseFloat(clickedNumber2));
      break;
    case "/":
      result = divide(parseFloat(clickedNumber1), parseFloat(clickedNumber2));
      break;
    case "%":
      result = remaind(parseFloat(clickedNumber1), parseFloat(clickedNumber2));
      break;
  }
  display.textContent = clickedNumber1 + ' ' + operator + ' ' + clickedNumber2 + ' = ' + result;
  clickedNumber1 = result.toString(); // Update clickedNumber1 with the result for the next operation
  operator = null;                    // Reset the operator after the operation is completed
  currentNumber = '';                 // Reset currentNumber for the next input
}
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}
function remaind(a, b) {
  return a % b;
}


function updateDisplay() {
  if (clickedNumber1 !== '') {
    display.textContent = clickedNumber1 + (operator ? ' ' + operator : '') + (currentNumber !== '' ? ' ' + currentNumber : '');
  } else {
    display.textContent = currentNumber;
  }
}
document.querySelector('.clear').addEventListener('click', () => {
  display.textContent = '';
  clickedNumber1 = '';
  clickedNumber2 = '';
  currentNumber = '';
});
