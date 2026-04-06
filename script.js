/*Variables */
  //1. pattern input variable
  //2. flag checkbox variables
  //3. test-string variable
  //4. button variable
  //5. result variable
const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");
const flagsContainer = document.getElementById("flags-container");
//Variable that stores the regular expression
let regExp;
/*Functions */

/*1. Function that assembles the full regex
    input: user regex input, flags checked
    output: full regex pattern
*/
/*2. Function that updates the regex based on the flag checked by the checkbox
  input: checkbox variable
  description: confirms which checkbox has been checked and returns its value
  output: value of checkbox if checked, empty if nothing is checked
*/
function getFlags(){
    if (caseInsensitiveFlag.checked && globalFlag.checked){
        return "gi";
    }
    else if (caseInsensitiveFlag.checked || globalFlag.checked){
        return (caseInsensitiveFlag.checked) ? "i" : "g";
    }
    return "";
}
/*3. Function that test the input against the built regex
and prints output
  input: value of test-string variable and function call of function 1
  description: Takes string and regex pattern and checks for all occurences of the regex in string
  output: returns values gotten to result.textContent else return no match
*/
function testString(string, regex){
    if (regex.test(string) && globalFlag.checked){
        return string.matchAll(regExp)[0];
    }
    else if (!globalFlag.checked){
        return string.match(regExp)[0];
    }
    return "No matches"
}
/*Event Listeners */
//Button click listener to call function 3
//Checkbox change listener to update function 2's return value
regexPattern.addEventListener("input",()=>{
    regExp = RegExp(regexPattern.value, getFlags());
    console.log(regExp);
})
testButton.addEventListener("click", ()=>{
    if (stringToTest.textContent == "") {
        testResult.textContent = "Nothing to test";
    }
    else {
        //RegExp(string, flags)
        testResult.textContent = testString(stringToTest.textContent, regExp)
    }
})