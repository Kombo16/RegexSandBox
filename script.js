/*Variables */
//1. pattern input variable
const regexPattern = document.getElementById("pattern");
//2. test-string variable
const stringToTest = document.getElementById("test-string");
//3. button variable
const testButton = document.getElementById("test-btn");
//4. result variable
const testResult = document.getElementById("result");
//5. flag checkbox variables
const flagsContainer = document.getElementById("flags-container");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");
//Variable that stores the regular expression
let regExp;
/*Functions */

/*1. Function that updates the regex based on the flag checked by the checkbox
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
and return output
  input: value of test-string variable and function call of function 1
  description: Takes string and regex pattern and checks for all occurences of the regex in string
  output: returns values gotten to result.textContent else return no match
*/
function testString(string, regex){
        //check if regex matches at least once
        let pattern = string.match(regex);
        if (!pattern) return "no match";
        else if (globalFlag.checked){
            pattern = string.matchAll(regex).toArray().map(match=>{
                return match[0];
            })
            return pattern.join(", ");
        }
        else return pattern[0];
}
/*Event Listeners */
//regex event listeners that update the regular expression
regexPattern.addEventListener("input",()=>{
    regExp = RegExp(regexPattern.value, getFlags());
})
flagsContainer.addEventListener("change",()=>{
    regExp = RegExp(regexPattern.value, getFlags());
})
//Button click listener to call test string function
testButton.addEventListener("click", ()=>{
    if (stringToTest.textContent == "") {
        testResult.textContent = "Nothing to test";
    }
    else {
        //RegExp(string, flags)
        testResult.textContent = testString(stringToTest.innerHTML, regExp);
        stringToTest.innerHTML = stringToTest.innerHTML.replace(regExp, `<span class="highlight">$&</span>`);
    }
})