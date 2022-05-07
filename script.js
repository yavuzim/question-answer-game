const api = 'data.json'
let selectID = document.querySelector(".container")
selectID.style.display = "none"
let result = document.querySelector(".result")
result.style.display = "none"
let bodyImage = document.querySelector(".body-image")

let index, progressValue, time_sound, progress, progressBar
const start = () => {
    index = -1
    progressValue = 25
    _true = 0, _false = 0, score = 0
    if (selectID.style.display === "none") {
        selectID.style.display = "block";
        bodyImage.style.display = "none"
        result.style.display = "none"
    }
    let query = api
    fetch(query).then(question => {
        return question.json()
    }).then(displayResult)
}

function displayElement() {
    selectID.style.display = "none";
    bodyImage.style.display = "none"
    result.style.display = "block"
}

let arr
const displayResult = (result) => {
    arr = result.datas.map(e => { return e });
    main()
}
const btnClick = (e) => {
    let btn_click = document.getElementById("btn-sound")
    btn_click.play()
    let _index = index;
    let time = 0
    let intervalID1 = setInterval(stop = () => {
        if (time < 3) {
            document.querySelector(`#${e.target.id}`).style.backgroundColor = "orange"
            time++
            clearInterval(progress)
            let _progressValue = progressValue
            document.querySelector(".value-container").innerHTML = `${_progressValue}`
            time_sound.pause()
        }
        else {
            clearInterval(intervalID1)
            isControl(_index, e.target.id)
        }
    }, 1000)
}

let _true = 0, _false = 0, score = 0
const isControl = (i, answer) => {

    if (arr[i].Answer === answer) {
        _true++
        score += 5
        document.querySelector(`#${answer}`).style.backgroundColor = "green"
        let true_audio = document.getElementById("true-sound")
        true_audio.play()
    }
    else {
        _false++
        score -= 2
        document.querySelector(`#${answer}`).style.backgroundColor = "red"
        document.querySelector(`#${arr[i].Answer}`).style.backgroundColor = "green"
        let false_audio = document.getElementById("false-sound")
        if (score < 0) score = 0
        false_audio.play()
    }
    document.querySelector(".score-field").innerHTML = score
    document.querySelector(".true").innerHTML = `${_true} Doğru`
    document.querySelector(".false").innerHTML = `${_false} Yanlış`
    let questionTime = 0
    let intervalID = setInterval(stop = () => {
        if (questionTime < 1) {
            questionTime++
        } else {
            clearInterval(intervalID)
            progressValue = 25
            main()
        }
    }, 1000)
}

const clickOn = () => {
    const a = document.querySelector("#A")
    const b = document.querySelector("#B")
    const c = document.querySelector("#C")
    const d = document.querySelector("#D")
    a.addEventListener("click", btnClick)
    b.addEventListener("click", btnClick)
    c.addEventListener("click", btnClick)
    d.addEventListener("click", btnClick)
}


function main() {
    clickOn()
    index++
    queryGet(index)
    progressBar = document.querySelector(".circular-progress")

    let speed = 1000
    progress = setInterval(() => {
        progressValue--
        document.querySelector(".value-container").innerHTML = `${progressValue}`
        progressBar.style.background = `conic-gradient(
            #4d5bf9 ${progressValue * 15}deg,
            #cadcff ${progressValue * 3.6}deg
            )`
        time_sound = document.getElementById("time-sound")
        time_sound.play()
        if (progressValue === -1) {
            clearInterval(progress)
            time_sound.pause()
            document.querySelector(".value-container").innerHTML = `24`
            progressBar.style.background = `conic-gradient(
                #4d5bf9 ${progressValue * 15}deg,
                #cadcff ${progressValue * 3.6}deg
                )`
            selectID.style.display = "none"
            result.style.display = "block"
            let messageField = document.querySelector(".message-field")
            let messageElement = document.createElement("div")
            messageElement.className = "message"
            messageField.appendChild(messageElement)
            messageElement.textContent = "SÜRENİZ YETMEDİ :("
        }
    }, speed);
}

const queryGet = () => {
    console.log("queryGet");
    console.log("arr : " + arr.length);
    console.log("index : " + index);
    if (index === arr.length) {
        gameResult()
    }

    document.querySelector(".question-count").innerHTML = `${index + 1}. Soru`
    document.querySelector(".question").innerHTML = arr[index].question
    document.querySelector("#A").innerHTML = arr[index].A
    document.querySelector("#B").innerHTML = arr[index].B
    document.querySelector("#C").innerHTML = arr[index].C
    document.querySelector("#D").innerHTML = arr[index].D
    let a = ["A", "B", "C", "D"]
    a.forEach(e => {
        document.getElementById(`${e}`).style.backgroundColor = "#063f3f"
    });
}

const gameResult = () => {
    displayElement()
    let messageField = document.querySelector(".message-field")
    let messageElement = document.createElement("div")
    messageElement.className = "message"
    messageField.appendChild(messageElement)
    let spanElement = document.querySelector(".message")
    let falseElement = document.createElement("span")
    falseElement.className = "false-message"
    let trueElement = document.createElement("span")
    trueElement.className = "true-message"
    let scoreElement = document.createElement("span")
    scoreElement.className = "score-message"
    trueElement.textContent = `Doğru : ${_true}`
    falseElement.textContent = `Yanlış : ${_false}`
    scoreElement.textContent = `Puan : ${score}`
    spanElement.appendChild(trueElement)
    spanElement.appendChild(falseElement)
    spanElement.appendChild(scoreElement)
    trueElement.style.color = "	#4b0082"
    falseElement.style.color = "#ff0000"
    scoreElement.style.color = "#ffd700"

}
