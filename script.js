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
/*2. Function that test the input against the built regex
and return output
  input: value of test-string variable and function call of function 1
  description: Takes string and regex pattern and checks for all occurences of the regex in string
  output: returns values gotten to result.textContent else return no match
*/
function testString(string, regex){
    if (!regex) return "No regex pattern";
    //check if global flag is checked
    if (globalFlag.checked){
        const matches = Array.from(string.matchAll(regex))
        if (matches.length == 0) return "no match";
        return matches.map(match=>match[0]).join(", ")
    }
    else {
        const match = string.match(regex);
        return match ? match[0] : "no match";
    }
}
/*3. Function that updates the regex Pattern
*/
function updateRegex(){
    let regExp;
    try{
        const pattern = regexPattern.value;
        if(pattern == "") {
            regExp = null;
            return;
        }
        regExp = RegExp(pattern, getFlags());
        console.log(regExp);
    } catch (e) {
        console.log("Invalid regex: "+e);
        return;
    }
}
/*Event Listeners */
//regex event listeners that update the regular expression
regexPattern.addEventListener("input",updateRegex);
flagsContainer.addEventListener("change",updateRegex);
//Button click listener to call test string function
testButton.addEventListener("click", ()=>{
    //Keep original text before highlighting
    const originalText = stringToTest.textContent;
    if (originalText.trim() == "") {
        testResult.textContent = "Nothing to test";
        return;
    }
    else {
        let regExp;
        try {
            const pattern = regexPattern.value;
            if(pattern == "") {
                regExp = null;
                return;
            }   
            regExp = RegExp(pattern, getFlags());
            console.log(regExp);
        } catch (e) {
            console.log("Invalid regex: "+e);
            testResult.textContent = "Invalid or empty regex pattern";
            return;
        }
        try{
            const result = testString(stringToTest.textContent, regExp);
            testResult.textContent = result;

            if (result !== "no match" && result !== "Invalid or empty regex pattern") {
                const highlightRegex = new RegExp(regExp.source, getFlags());
                const safe = originalText.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
                stringToTest.innerHTML = safe.replace(highlightRegex, `<span class="highlight">$&</span>`);
            }
            else{
                stringToTest.innerHTML = originalText;
            }
        }
        catch (e){
            testResult.textContent = "Error testing regex"+e.message;
            console.error(e);
        }
    }
})