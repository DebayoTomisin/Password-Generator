// Manipulating the DOM
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// event listener
generateEl.addEventListener('click', () =>{
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasSymbol = symbolEl.checked;
    const hasNumber = numberEl.checked;
    
    resultEl.innerText = generatePassword(
       hasLower,
       hasUpper, 
       hasNumber, 
       hasSymbol,
       length
    );
});

// copy password to clipboard
clipboardEl.addEventListener('click', () => {
    const textArea =  document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password){
        return;
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('password copied to clipboard')
})

// generate password function
function generatePassword(lower, upper, number, symbol, length){
    
    let password = '';

    const typesCount = lower + upper + number + symbol;

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );
        
    if (typesCount == 0){
        return " ";
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            password += randomFunc[funcName]();            
        });
    }
    finalPassword = password.slice(0, length);

    return finalPassword;
}


// Generator functions

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = "!@#$%^&*()_/?.,-|";
    return symbols[Math.floor(Math.random() * symbols.length)]
}

