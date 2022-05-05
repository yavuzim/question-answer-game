const api = 'data.json'

let selectID = document.getElementById("content")
selectID.style.display = "none"

const start = () => {
    if (selectID.style.display === "none") {
        selectID.style.display = "block";
    }
    let query = api
    fetch(query).then(question => {
        return question.json()
    }).then(displayResult)
}

let arr
const displayResult = (result) => {
    arr = result.datas.map(e => { return e });
    main()
}
const btnClick = (e) => {
    let btn_click = document.getElementById("btn-sound")
    btn_click.play()
    console.log(e.target.id);
    let _index = index;
    console.log("btnClick");
    let time = 0
    let intervalID1 = setInterval(stop = () => {
        if (time < 3) {
            document.querySelector(`#${e.target.id}`).style.backgroundColor = "orange"
            time++
            clearInterval(letintervalMatch)
            console.log("time 1 : " + time);
            matchTime = 0
            document.querySelector(".time-table").innerHTML = `${matchTime} saniye`
            time_sound.pause()
        }
        else {
            console.log("gel 1");
            clearInterval(intervalID1)
            isControl(_index, e.target.id)
        }
    }, 1000)
}

let _true = 0, _false = 0
const isControl = (i, answer) => {
    console.log("isControl");
    if (arr[i].Answer === answer) {
        _true++
        document.querySelector(`#${answer}`).style.backgroundColor = "green"
        let true_audio = document.getElementById("true-sound")
        true_audio.play()
    }
    else {
        _false++
        document.querySelector(`#${answer}`).style.backgroundColor = "red"
        let false_audio = document.getElementById("false-sound")
        false_audio.play()
    }
    document.querySelector(".true").innerHTML = `${_true} Doğru`
    document.querySelector(".false").innerHTML = `${_false} Yanlış`
    let questionTime = 0
    let intervalID = setInterval(stop = () => {
        if (questionTime < 1) {
            questionTime++
        } else {
            clearInterval(intervalID)
            matchTime = 26
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

let index = -1, matchTime = 25, time_sound,letintervalMatch
function main() {
    console.log("Doğru : " + _true + " \n" + "Yanlış : " + _false);
    clickOn()
    index++
    queryGet(index)

    letintervalMatch=setInterval(() => {
        if (matchTime >= 0) {
            time_sound = document.getElementById("time-sound")
            time_sound.play()
            matchTime--
            document.querySelector(".time-table").innerHTML = `${matchTime} saniye`
        }
        if (matchTime === -1) {
            document.querySelector(".time-table").innerHTML = `0`
            clearInterval(letintervalMatch)
            time_sound.pause()
        }
    }, 1000);
}

const queryGet = () => {
    document.querySelector(".question-count").innerHTML = `${index + 1}. Soru`
    document.querySelector(".question").innerHTML = arr[index].question
    document.querySelector("#A").innerHTML = arr[index].A
    document.querySelector("#B").innerHTML = arr[index].B
    document.querySelector("#C").innerHTML = arr[index].C
    document.querySelector("#D").innerHTML = arr[index].D
    let a = ["A", "B", "C", "D"]
    a.forEach(e => {
        document.getElementById(`${e}`).style.backgroundColor = "#008080"
    });
}
