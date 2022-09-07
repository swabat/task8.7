const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');
const startGame = document.querySelector(".startGame"); 

const formMin = document.querySelector('.form-group-min');
const formMax = document.querySelector('.form-group-max');
const alertStart = document.querySelector('.alertStart');

let textNumber ='';
let orderNumber = 1;
let gameRun = true;

let minValue = 0;
let maxValue = 0;

document.querySelector('#orderNumberField').innerText = orderNumber;

let answerNumber = 0;
let calcAnswerNumber = () => Math.floor((minValue + maxValue) / 2);


//----------------------function for bringing the entered number to the interval from -999 to 999----------------------

function valueCheck (value) {
 value = (value < -999) ? -999 : value;
 value = (value > 999) ? 999 : value;
 return value;
}


// input and processing of the minimum value

document.querySelector('#btn-minValue').addEventListener('click', function () {
    minValue = parseInt(document.querySelector('#minValue').value);
    minValue = (minValue || 0);
    minValue = valueCheck (minValue);
    formMin.classList.add("hidden");
    formMax.classList.remove("hidden");
})


//-------------input and processing of the maximum value, swappind min and max value if min > max or max < min------------

document.querySelector('#btn-maxValue').addEventListener('click', function () {

    maxValue = parseInt(document.querySelector('#maxValue').value);
    maxValue = (maxValue || 100);
    maxValue = valueCheck (maxValue);

    if (minValue > maxValue || maxValue < minValue) {
        minValue = minValue + maxValue;
        maxValue = minValue - maxValue;
        minValue = minValue - maxValue;
    }

    startGame.innerText=`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю \u{1F61C}`;

    formMax.classList.add("hidden");
    alertStart.classList.remove("hidden");
})


//------------------calc answer number and start the game---------------------------------------------------------------------

document.querySelector('#btn-alertStart').addEventListener('click', function () {

    answerNumber = calcAnswerNumber(minValue, maxValue);
    textNumber = numberToText(answerNumber);
    answerField.textContent = `Вы загадали число ${textNumber}?`;

    alertStart.classList.add("hidden");
    document.querySelector('#game-card').classList.remove('hidden');
})




//-------------GUESSING PHRASES-------------------------------------------------------------------------------------------------

const guessPhrase = function (textNumber) {
    
   const phraseRandomGuess = Math.round( Math.random()*3);
            
    switch (phraseRandomGuess) {
        case 1: answerField.innerText = `Может быть это число ${textNumber}?`
        break;

        case 2: answerField.innerText = `Хммм... Это число ${textNumber}?`
        break;

        case 3: answerField.innerText = `Да это легко! Ты загадал ${textNumber}?`
        break;
        
        default: answerField.innerText = `Ваше число ${textNumber}?`
                        
}
}



//---------------------------NUMBER TO TEXT FUNCTION------------------------------

let numberToText = function (num) {

num = Math.abs(num);
let simpleNum; 
let dozens;
let hundreds;

simpleNum = num%10;
dozens = num%100 - simpleNum;
hundreds = num%1000 - (dozens + simpleNum);

 switch (dozens) {

    case 20: dozens = "двадцать"
    break;
    case 30: dozens = "тридцать"
    break;
    case 40: dozens = "сорок"
    break;
    case 50: dozens = "пятьдесят"
    break;
    case 60: dozens = "шестьдесят"
    break;
    case 70: dozens = "семьдесят"
    break;
    case 80: dozens = "восемьдесят"
    break;
    case 90: dozens = "девяносто"
    break;
}

switch (hundreds) {
    case 100: hundreds = "сто"
    break;
    case 200: hundreds = "двести"
    break;
    case 300: hundreds = "триста"
    break;
    case 400: hundreds = "четыреста"
    break;
    case 500: hundreds = "пятьсот"
    break;
    case 600: hundreds = "шестьсот"
    break;
    case 700: hundreds = "семьсот"
    break;
    case 800: hundreds = "восемьсот"
    break;
    case 900: hundreds = "девятьсот"
    break;
}

if (num%100 > 9 && num%100 < 20){
    
    simpleNum = num%100;

    switch(simpleNum){   
       case 10: simpleNum = "десять"
       break;
       case 11: simpleNum = "одиннадцать"
       break;
       case 12: simpleNum = "двенадцать"
       break;
       case 13: simpleNum = "тринадцать"
       break;
       case 14: simpleNum = "четырнадцать"
       break;
       case 15: simpleNum = "пятнадцать"
       break;
       case 16: simpleNum = "шестнадцать"
       break;
       case 17: simpleNum = "семнадцать"
       break;
       case 18: simpleNum = "восемнадцать"
       break;
       case 19: simpleNum = "девятнадцать"
       break;
   } 
   } else {   
   switch(simpleNum) {
       case 1: simpleNum = "один"
       break;
       case 2: simpleNum = "двa"
       break;
       case 3: simpleNum = "три"
       break;
       case 4: simpleNum = "четыре"
       break;
       case 5: simpleNum = "пять"
       break;
       case 6: simpleNum = "шесть"
       break;
       case 7: simpleNum = "семь"
       break;
       case 8: simpleNum = "восемь"
       break;
       case 9: simpleNum = "девять"
       break;
    }
}

if (num <= 19) {
    num=`${simpleNum}`;
} else if (num >= 20 && num < 100 && simpleNum !== 0) {
    num=`${dozens} ${simpleNum}`;
} else if (num >= 20 && num < 100 && simpleNum == 0) {
    num=`${dozens}`;
} else if (num >= 100) {
    if (num%100 > 9 && num%100 < 20) {
        num=`${hundreds} ${simpleNum}`;}
    else if (simpleNum !== 0 && dozens !== 0 && hundreds !== 0) {
    num=`${hundreds} ${dozens} ${simpleNum}`;
    } else if (simpleNum !== 0 && dozens == 0 && hundreds !== 0) {
        num=`${hundreds} ${simpleNum}`;
    } else if (simpleNum == 0 && dozens !== 0 && hundreds !== 0) {
        num=`${hundreds} ${dozens}`;
    } else if (simpleNum == 0 && dozens == 0 && hundreds !== 0) {
        num=`${hundreds}`;
    } 
    }

    return num;
}






//---------------------------BUTTON RETRY------------------------------

document.querySelector('#btnRetry').addEventListener('click', function () {

    document.querySelector('#minValue').value = 0;
    document.querySelector('#maxValue').value = 100;
    
    orderNumber = 1;
    document.querySelector('#orderNumberField').innerText = orderNumber;

    gameRun = true;

    formMin.classList.remove("hidden");
    document.querySelector('#game-card').classList.add('hidden');
})



//---------------------------BUTTON LESS------------------------------

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        console.log(minValue, maxValue);
        if (minValue >=  maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber - 1;
            answerNumber = calcAnswerNumber(minValue, (maxValue - 1));
            textNumber = numberToText(answerNumber);

            textNumber = answerNumber < 0 ? `минус ${textNumber}` : textNumber;
            textNumber = textNumber.length > 20 ? answerNumber : textNumber;

            orderNumber++;
            orderNumberField.innerText = orderNumber;
            
            guessPhrase(textNumber);
                   
        }
    }
})


//---------------------------BUTTON OVER------------------------------

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        console.log(minValue, maxValue);
        if (minValue >= maxValue){
            const phraseRandom = Math.round( Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                `Вы загадали неправильное число!\n\u{1F914}` :
                `Я сдаюсь..\n\u{1F92F}`;

            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = calcAnswerNumber(minValue, maxValue);
            textNumber = numberToText(answerNumber);

            textNumber = answerNumber < 0 ? `минус ${textNumber}` : textNumber;
            textNumber = textNumber.length > 20 ? answerNumber : textNumber;

            orderNumber++;
            orderNumberField.innerText = orderNumber;

            guessPhrase(textNumber);
        }
    }
})

//---------------------------BUTTON EQUAL------------------------------

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        const phraseRandomWin = Math.round( Math.random()*3);
        
        switch (phraseRandomWin) {
            case 1: answerField.innerText = `Я всегда угадываю\u{1F60E}`
            break;

            case 2: answerField.innerText = `Ура! Давай сыграем еще раз!\u{2B50}`
            break;

            case 3: answerField.innerText = `Есть попадание!\u{1F3AF}`
            break;
            
            default: answerField.innerText = `Я читаю твои мысли!\u{1F9D0}`
        
        
    }
        gameRun = false;
    }
})

