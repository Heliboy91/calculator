//initiate currentvalue variable


const displayCalculated = document.querySelector("#calculated");

let display = document.querySelector("#display");
const clearButton = document.querySelector("#clear");
const buttons = document.querySelectorAll(".button");
const backspace = document.querySelector("img");
let equalButton = document.querySelector("#equals");

//basic math functions
const add = (a,b) => {return a+b};
const substract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};



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
backspace.addEventListener("click", function(){
    let content = display.textContent;
    let lastIndex = display.textContent.length-1;
    let withoutLast = content.substring(0, lastIndex);
    
    display.textContent = withoutLast;
})




//Total erase
clearButton.addEventListener("click", function(e){
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
    console.log(numArray);
    console.log(signArray);
    for(i=0; i < numArray.length; i++) {
        for(j=0; j < signArray.length; j++) {
            console.log("Accumulator: " + accumulator);
            console.log("Sign: " + signArray[j]);
            console.log("Current num: " + numArray[i]);
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

//a function that styles the textcontent
const styleContent = function (textContainer) {
        const text = textContainer.textContent;
        for(i=0; i < text.length; i++) {
            if (text[i] === "+" || text[i] === "-" ||text[i] === "x" ||text[i] === "/" ) {
                text[i].style.color = "green";
        }
        }

}



//Event listener for input buttons

for(i=0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function(e) {
    let value = e.target.textContent;
    if (value === "+" || value === "-" ||value === "x" ||value === "/" ) {
        value = ` ${value} `;
        
    }
    display.textContent += value;
    
    
    })
   
}







