const api = 'data.json'
let selectID = document.getElementById("content")
selectID.style.display = "none"

const start = () => {
    if (selectID.style.display === "none") {
        selectID.style.display = "block";
    }
    document.querySelector(".time-table").innerHTML = count
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
    console.log(e.target.id);
    let _index = index;
    isControl(_index, e.target.id)
}

let _true = 0, _false = 0
const isControl = (i, answer) => {
    if (arr[i].Answer === answer) _true++
    else _false++
    document.querySelector(".true").innerHTML = _true
    document.querySelector(".false").innerHTML = _false
    main()
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

let index = -1
function main() {
    console.log("Doğru : " + _true + " \n" + "Yanlış : " + _false);
    clickOn()
    index++
    queryGet(index)
}

const queryGet = () => {
    document.querySelector(".question").innerHTML = arr[index].question
    document.querySelector("#A").innerHTML = arr[index].A
    document.querySelector("#B").innerHTML = arr[index].B
    document.querySelector("#C").innerHTML = arr[index].C
    document.querySelector("#D").innerHTML = arr[index].D
}
