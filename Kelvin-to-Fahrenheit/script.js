function displayTemp(){
const kelvin = document.getElementById('kelvin').value;
/*
  var to take in the number from to user
  stores in calvin
*/

// Where the fahrenheit value will go
const outputText = document.getElementById('outputText');

/*
  Celsius is similar to Kelvin — the only difference is that Celsius is 273 degrees less than Kelvin.

  Let’s convert Kelvin to Celsius by subtracting 273 from the kelvin variable. Store the result in another variable, named celsius.
*/
let celsius = kelvin - 273;


/*
  Use this equation to calculate Fahrenheit, then store the answer in a variable named fahrenheit
*/
let fahrenheit = celsius * (9/5) + 32;

/*
  When you convert from Celsius to Fahrenheit, you often get a decimal number.

  se the .floor() method from the built-in Math object to round down the Fahrenheit temperature. Save the result to the fahrenheit variable.
*/
fahrenheit = Math.floor(fahrenheit);


  outputText.textContent = fahrenheit;
}