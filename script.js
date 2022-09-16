
const RandomTextApi = 'http://api.quotable.io/random';
const textOutput = document.querySelector("#textOutput");
const textInput = document.querySelector("#textInput");
const countDownTimer = document.querySelector("#countDownTimer");  


function RandomWords() {
    return fetch(RandomTextApi)
        .then((res) => res.json())
        .then((res) => res.content)
}

async function showTextOutput() {
    const quote = await RandomWords();
    textOutput.innerHTML = "";
    quote.split("").forEach((char) => { //her harfi spanlara ayırıyoruz
        const charSpan = document.createElement("span");
        charSpan.innerHTML = char;
        textOutput.appendChild(charSpan);
    })
    textInput.value = null; // text inputu temizliyoruz.
}

function countDown(seconds) {

    textOutput.innerHTML = "";  // text output boşaltıyoruz

    if (seconds > 0) {
        countDownTimer.innerHTML = seconds;
        setTimeout(function () { countDown(seconds - 1) }, 1000);
    } else {
        countDownTimer.innerHTML = ""; // timer count temizliyoruz
        showTextOutput();
    };

}

textInput.addEventListener("input", () => {
    const arrayText = textOutput.querySelectorAll("span");
    const arrayValue = textInput.value.split("");

    let correct = true; // karakterlerin doğruluğunu kontrole ediyoruz
    arrayText.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if (char == null) {
            charSpan.className = "";    // hiçbir şey yazılmadıysa class'ı kaldır
            correct = false;
        } else if (char === charSpan.innerText) {
            charSpan.className = "correct"; // doğru karakterse, correct, yanlışsa incorrect classı ver
        } else {
            charSpan.className = "incorrect";
            correct = false;
        }
    })

    correct && showTextOutput(); // correct true ise, yeni text getir
})

