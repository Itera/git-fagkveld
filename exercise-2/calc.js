function calculate(number1Field, number2Field, operationField) {
  var number1 = parseFloat(number1Field.value);
  var number2 = parseFloat(number2Field.value);

  switch (operationField.value) {
    case 'plus':
      return number2 + number1;

    case 'minus':
      return number2 - number1;

    default:
      return NaN;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var number1Field = document.getElementById('number1');
  var number2Field = document.getElementById('number2');
  var operationField = document.getElementById('operation');
  var resultField = document.getElementById('result');

  var updateCalculation = function() {
    var result = calculate(number1Field, number2Field, operationField);
    resultField.innerText = result;
  };

  number1Field.addEventListener('input', updateCalculation);
  number2Field.addEventListener('input', updateCalculation);

  updateCalculation();
});
