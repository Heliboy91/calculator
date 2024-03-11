//basic functions
const add = (a,b) => {return a+b};
const substract = (a,b) => {return a-b};
const multiply = (a,b) => {return a*b};
const divide = (a,b) => {return a/b};

const operate = (currentValue, operation, nextNumber)=> {
    switch (operation) {
        case "+":
            currentValue = add(currentValue, nextNumber);
            break;
            
        case "-":
            currentValue = substract(currentValue, nextNumber);
            break;
        case "*":
            currentValue = multiply(currentValue, nextNumber);
            break;
        case "/":
            currentValue = divide(currentValue, nextNumber);
    }

    return currentValue;
}

let example = operate(10, "*", 3);
console.log(example);