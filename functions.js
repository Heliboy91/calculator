const displayCalculated = document.querySelector("#calculated");
let display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const buttons = document.querySelectorAll(".button");
const backspace = document.querySelector("#back");
let equalButton = document.querySelector("#equals");

//basic math functions
const add = (a,b) => {return a+b};
const substract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

//a variable for storing last entered character (validation process)
let lastCharacter="";


//calculating function
const operate = (num1, operation, num2) => {
    let result;
    switch (operation) {
        case "+":
            result = add(num1, num2);
            break;
            
        case "-":
            result = substract(num1, num2);
            break;
        case "x":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
    }

    return result;
}

//Erase last
backspace.addEventListener("click", function(e){
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    let content = display.textContent;
    let lastIndex = display.textContent.length-1;
    let withoutLast = content.substring(0, lastIndex);
    
    display.textContent = withoutLast;
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
})

//triggering the equal button
equalButton.addEventListener("click", function(e){
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
    

    //convert number character to number
     const converted = rawSplit.map((element) => {
        if (element !== "+" && element !== "-" && element !== "/" && element !== "x" ) {
            return Number(element);
        } else {
            return String(element);
        }
    })
    const numbers = converted.filter(index => typeof(index) == "number");
    const signs = converted.filter(index => typeof(index) == "string" );
    reduceArray(numbers,signs);
    
   


}

/*safety check of last character  
1. no double sign
2. no zero divison
*/

const isSign = function (value) {
   if (value === "+" || value === "-" ||value === "x" ||value === "/" || value === " ") {
    return true;
   } else {
    return false;
   }
}    
    



//Event listener for input buttons

for(i=0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
    e.target.classList.add('shrink');
    setTimeout(() => {
        e.target.classList.remove('shrink');
      }, 50);
    let value = e.target.textContent;
    const last = display.textContent[display.textContent.length-1];
    
    let a = isSign(value);
    let b = isSign(last);
    console.log("Value is sign: " + a);
    console.log("Last was sign: " + b);

    let controlSign = (a&&b);
    console.log("Double sign: " + controlSign);
    
    switch(controlSign){
        case true:
            value= "";
            break;
        case false:
            if (value === "+" || value === "-" ||value === "x" ||value === "/" ) {
            value = ` ${value} `;
    }
    
        
            
        }
        display.textContent += value;
        
      
    
    
    })
   
}







