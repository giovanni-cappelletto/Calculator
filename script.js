// Variables 
const buttons = document.querySelectorAll('.btn')
const screen = document.querySelector('#num')
const equal = document.querySelector('.equal')
const del = document.querySelector('.canc')

const regExp = /[0-9]/

const operation = ['+', '-', '*', '/', '=']

let x = ''
let checkTheOperation = 0
let numbers = []
let result = 0

buttons.forEach(button => {
    button.addEventListener('click', () => {
        calc(button.textContent)
    })
})

// Functions and AddEventListeners
window.addEventListener('keyup', (e) => {
    if(e.key == 0) {
        calc('0')
    } else if(e.key == 1) {
        calc('1')
    } else if(e.key == 2) {
        calc('2')
    } else if(e.key == 3) {
        calc('3')
    } else if(e.key == 4) {
        console.log(e.key);
        calc('4')
    } else if(e.key == 5) {
        calc('5')
    } else if(e.key == 6) {
        calc('6')
    } else if(e.key == 7) {
        calc('7')
    } else if(e.key == 8) {
        calc('8')
    } else if(e.key == 9) {
        calc('9')
    } else if(e.key == '+') {
        // Shift + +
        calc('+')
    } else if(e.key == '-') {
        // -
        calc('-')
    } else if(e.key == '*') {
        // Shift + 8
        calc('*')
    } else if(e.key == '/') {
        // ù
        calc('/')
    } else if(e.key == 'Backspace') {
        location.reload()
    }
})

const calc = (number) => {
    for(let i = 0; i < operation.length; i++) {
        if(operation[i] === number) {
            checkTheOperation++
        }
    }

    if(checkTheOperation === 0) {
        x += number + ''
        screen.textContent = x
    } else {
        numbers.push(x)
        x = ''
        screen.textContent = number
        checkTheOperation = 0
    }

    equal.addEventListener('click', () => {
        display(number)
    })
}

const display = (number) => {

    if(regExp.test(number)) {
        return
    } else {
        for(let i = 0; i < numbers.length; i++) {

            if(number === '+') {
                result += Number(numbers[i])
            } else if(number === '-') {
                if(Number(numbers[0]) > Number(numbers[1])) {
                    result = Math.abs(Number(numbers[i]) - result)
                } else {
                    result = Number(numbers[0])
                    result = - (Number(numbers[1]) - result)
                }
            } else if(number === '*') {
                result = Number(numbers[0])
                result = Number(numbers[1]) * result
            } else if(number === '/') {
                result = Number(numbers[0])
                result = result / Number(numbers[1])
            }
        }
        screen.textContent = result
        checkTheOperation++
    }

    if(checkTheOperation > 0) {
        reset()
    }

}

del.addEventListener('click', () => {
    location.reload()
})

const reset = () => {
    result = 0
    checkTheOperation = 0
    numbers = []
}
