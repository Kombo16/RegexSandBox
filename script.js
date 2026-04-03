/*Variables */
  //1. pattern input variable
  //2. flag checkbox variables
  //3. test-string variable
  //4. button variable
  //5. result variable
const regexPattern = document.getElementById(".pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");
/*Functions */

/*1. Function that builds the regex
  input: value of pattern input variable
  output: A full regular expression
*/

/*2. Function that updates the regex based on the flag checked by the checkbox
  input: checkbox vaiable
  description: confirms which checkbox has been checked and returns its value
  output: value of checkbox if checked, empty if nothing is checked
*/

/*3. Function that test the input against the built regex
and prints output
  input: value of test-string variable and function call of function 1
  description: Takes string and regex pattern and checks for all occurences of the regex in string
  output: returns values gotten to result.textContent else return no match
*/

/*Event Listeners */
//Button click listener to call function 3
//Checkbox change listener to update function 2's return value
//regex change listener that updates function 1's return value