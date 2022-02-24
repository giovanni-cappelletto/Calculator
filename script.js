// === Variables ===
const shortcutBtn = document.querySelector('.btn')
const section = document.querySelector('section')

const numbers = document.querySelectorAll('.number') // All the numbers btns 
const operations = document.querySelectorAll('.operation') // All the operations btns

// Special btns
const percentBtn = document.querySelector('.percent') // Percent btn
const deleteBtn = document.querySelector('.delete') // AC btn
const deleteAllBtn = document.querySelector('.delete-all') // C btn
const equalBtn = document.querySelector('.equal') // Equal btn

const display = document.querySelector('.numbers') 
const displayOp = document.querySelector('.display-operation')
let number = '', numberArray = [], oldOperator

// Looping the querySelectorAll number's variables in order to give them an addEventListener
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', () => {
        displayNumber(numbers[i].textContent)
    })
}

// Looping the querySelectorAll operator's variables in order to give them an addEventListener
for (let i = 0; i < operations.length; i++) {
    operations[i].addEventListener('click', () => {
        displayOperation(operations[i].textContent)
    })
}

// === Special operators ===
// AddEventListener for percent func
percentBtn.addEventListener('click', () => {
    displayOp.textContent = '%'
    check()
    calc('%')
})

// AddEventListener for deleteFunc func
deleteBtn.addEventListener('click', () => {
    deleteFunc()
})

const deleteFunc = () => {
    // Converting the number into an array
    number = [...number]
    // Pop the last element
    number.pop()
    // Converting the new array into a string and remove all the commas
    number = number.toString().replaceAll(',', '')

    display.textContent = number
}

// AddEventListener for reset func 
deleteAllBtn.addEventListener('click', () => {
    reset()
})

// Restart the program
const reset = () => {
    number = ''
    numberArray = []
    
    display.textContent = number
    displayOp.textContent = ''
}

// AddEventListener for equal func 
equalBtn.addEventListener('click', () => {
    displayOperation()
})

// === Other Functions === 
const check = () => {
    // Check if the number is empty
    if (number != '' && number != ' ') {
        // Push the number in the array
        numberArray.push(number)
        // Reset the number value
        number = ''
    } 
}

// Display the number properly 
const displayNumber = (pressedNum) => {
    // Save the pressedNum in number 
    number += pressedNum

    display.textContent = number
}

// Display the operation properly 
const displayOperation = (operator) => {
    check()

    // Check if numberArray is empty
    numberArray == false ? alert('Please enter numbers!') : displayOp.textContent = operator

    // If there are two numbers ==> calc func
    if (numberArray.length === 2) calc(oldOperator)

    // To save the previous operator 
    oldOperator = operator
}

// Calcs
const calc = (op) => {
    let helper
    // Transform numberArray's elements from strings to numbers
    // Ex: 
    // ["8", "2"]
    // [2, "8"]
    // [2, 8]
    for (let i = numberArray.length; i >= 0; i--) {
        numberArray.unshift(Number(numberArray[numberArray.length - 1]))
        numberArray.pop()
    }

    // Check what operation must be done
    switch (op) {
        case '+': 
            helper = numberArray[1] + numberArray[0]
        break
        case '-': 
            helper = numberArray[1] - numberArray[0]
        break
        case '*': 
            helper = numberArray[1] * numberArray[0]
        break
        case '/': 
            helper = numberArray[1] / numberArray[0]
        break
        case '%': 
            helper = numberArray[0] / 100
        break
    }

    // Reset numberArray
    numberArray = []

    helper = helper.toString()

    // Push the number (here it's a "string number") 
    numberArray.push(helper)

    display.textContent = helper
}

// === Personal shortcuts === 
window.addEventListener('keyup', e => {
    switch (e.key) {
        case '0': 
        case '1':
        case '2':
        case '3': 
        case '4':
        case '5': 
        case '6': 
        case '7': 
        case '8':
        case '9': 
        case '.':
            displayNumber(e.key)
        break
        case '+':
        case '-':
        case '/':
        case '*':
            displayOperation(e.key)
        break
        case '%':
            displayOp.textContent = '%'
            check()
            calc('%')
        break
        case 'Backspace':
            deleteFunc()
        break
        case '\\': 
            reset()
        break
        case '=':
            displayOperation()  
    }
})

shortcutBtn.addEventListener('click', () => {
    section.classList.toggle('active')
})
