const displayCalculated = document.querySelector("#calculated");
let display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const buttons = document.querySelectorAll(".button");
const backspace = document.querySelector("#back");
let equalButton = document.querySelector("#equals");

//add keyboard support
document.addEventListener("keydown", function(e){
    const key = e.key;
    console.log(key);
    const content = display.textContent; 
    let parsed = parseInt(key);
    const isNumber= !isNaN(parsed);
    signChar = isSign(key);
    let input;
    if(isNumber || signChar) {
        input = key;
    } else {
        input = "";
    }
    if(key == "Enter") {
        splitString();
    }
    if(key == "Backspace") {
        
        const lastIndex = display.textContent.length-1;
        const lastChar = content[lastIndex];
        let isLastsign = isSign(lastChar);
        let withoutLastChar; 
        isLastsign? withoutLastChar= content.substring(0, lastIndex-2):withoutLastChar=content.substring(0, lastIndex);
        
        display.textContent = withoutLastChar;
    } 

    if(key == "c") {
        display.textContent= "";
        lastCharacter = "";
        secondToLastCharacter = "";
        currentValue = 0;
        displayCalculated.textContent = "";
    }

    validateCharacter(content, input);
    
    
   
})
//basic math functions
const add = (a,b) => {return a+b};
const substract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

//a function to validate the input
function validateCharacter(textcontent, input) {
    //Find extra points and contols 0 division input
    let checkPoint = foundPoint(textcontent);
    let checkDivision = isDivision(textcontent);
    if(checkPoint === true && input == ".") {
        input = "";
    } else if (checkDivision == true && input == "0"){
        input = "";
        alert("Sorry, not allowed to divide by 0");
    } else if (textcontent == "" && (input == "/" || input == "x")){
        input = "";
    } 
    //control double sign input
    const last = textcontent[textcontent.length-1];
    let a = isSign(input);
    let b = isSign(last);
    let controlSign = (a&&b);
    switch(controlSign){
        case true:
            input= "";
            break;
        case false:
            if (input === "+" || input === "-" ||input === "x" ||input === "*" ||input === "/" || input === " " ) {
                input = ` ${input} `;
            }
    
        
            
        }
        display.textContent += input;

}


//calculating function
const operate = (num1, operation, num2) => {
    
    let preConverted;
    switch (operation) {
        case "+":
            preConverted = add(num1, num2);
            break;
            
        case "-":
            preConverted = substract(num1, num2);
            break;
        case "x":
            preConverted = multiply(num1, num2);
            break;
        case "*":
            preConverted = multiply(num1, num2);
            break;
        case "/":
            preConverted = divide(num1, num2); 
            break;
            
    }
    let isInteger = Number.isInteger(preConverted);
    isInteger ? result = preConverted : result = Number.parseFloat(preConverted.toFixed(2));

    return result;
}

//Erase last with button
backspace.addEventListener("click", function(e){
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    const content = display.textContent;
    const lastIndex = display.textContent.length-1;
    const lastChar = content[lastIndex];
    let isLastsign = isSign(lastChar);
    let withoutLastChar; 
    isLastsign? withoutLastChar= content.substring(0, lastIndex-2):withoutLastChar=content.substring(0, lastIndex);
    
    display.textContent = withoutLastChar;
})




//Total erase
clearButton.addEventListener("click", function(e){
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    display.textContent= "";
    lastCharacter = "";
    secondToLastCharacter = "";
    currentValue = 0;
    displayCalculated.textContent = "";
})

//triggering the equal button
equalButton.addEventListener("click", function(e){
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    splitString();
    
})

//A function that operates on the number array by using operaration sign from another array
const reduceArray = function(numArray, signArray) {
    signArray.unshift("+");
    let accumulator = 0;
  
    for(i=0; i < numArray.length; i++) {
        for(j=0; j < signArray.length; j++) {
         
            accumulator = operate(accumulator, signArray[j], numArray[i]);
            i++;
            
        }
        
    }
    displayCalculated.textContent = `Calculated: ${accumulator}`;
}

//spliting string into array
const splitString = function () {
    const content = display.textContent;
    let rawSplit = content.split(" ");
    

    
     const converted = rawSplit.map((element) => {
        if (element !== "+" && element !== "-" && element !== "/" && element !== "x" && element !== "*") {
            return Number(element);
        } else {
            return String(element);
        }
    })
    const numbers = converted.filter(index => typeof(index) == "number");
    const signs = converted.filter(index => typeof(index) == "string" );
    reduceArray(numbers,signs);
    
   


}


//check if a character is sign
const isSign = function (value) {
   if (value === "+" || value === "-" ||value === "x" ||value === "*" ||value === "/" || value === " ") {
    return true;
   } else {
    return false;
   }
}
//check for extra dots
const foundPoint = function (content) {
    //check if last character is a dot
    let lastCharacter = content[content.length-1];
    let lastSignIndex;
    //check if there are no other dots after the last sign
    //1: check the index of last sign chacarcter
     for(i = content.length; i > 0; i--) {
        if(isSign(content[i])) {
            
            lastSignIndex = i;
            break;
        }
     }
     let filterThisForDot = content.substring(lastSignIndex);
     
     let isDotIncluded = filterThisForDot.includes(".");
     if(lastCharacter == "." || isDotIncluded === true) {
        return true;
     }
     else {
        return false;
     }
     

}

//check for divison
const isDivision = function (content) {
    let last3CharsIndex = content.length-3;
    last3Chars = content.substring(last3CharsIndex);
    let includeDivSign = last3Chars.includes("/");
    if(includeDivSign === true) {
        return true;
    } else {
        return false;
    }
}
    



//Event listener for input buttons

for(i=0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
    //animation
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    let value = e.target.textContent;
    let content = display.textContent;
    //character validation
    validateCharacter(content, value);
    })
   
}







