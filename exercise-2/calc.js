function calculate(number1Field, number2Field, operationField) {
  var number1 = parseFloat(number1Field.value);
  var number2 = parseFloat(number2Field.value);

  switch (operationField.value) {
    case 'plus':
      return number1 + number2;

    default:
      return NaN;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var number1Field = document.getElementById('number1');
  var number2Field = document.getElementById('number2');
  var operationField = document.getElementById('operation');
  var resultField = document.getElementById('result');

  number1Field.addEventListener('input', function() {
    var result = calculate(number1Field, number2Field, operationField);
    resultField.innerText = result;
  });

  number2Field.addEventListener('input', function() {
    var result = calculate(number1Field, number2Field, operationField);
    resultField.innerText = result;
  });
});
