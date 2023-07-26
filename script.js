let file = ''
let output = document.getElementById('output')
let main = document.getElementById('main')
let words = document.getElementById('words')
let input = document.getElementById('input')
let word_index = document.getElementById('word_index')
let words_count = document.getElementById('words_count')
let restart = document.getElementById('restart')
let choos_file = document.getElementById('choos_file')
let saat = document.getElementById('saat')
let speed = document.getElementById('speed')
let correct_word = document.getElementById('correct_word')
let wrong_word = document.getElementById('wrong_word')
let text = [], selected = [], play = false, second = 0, interval = null

const openFile = event => {
    if (!words_count.value || isNaN(words_count.value) || words_count.value < 5 || words_count.value > 50) {
        alert('مقدار را عددی بین 5 و 50 وارد کنید')
        window.location.reload()
    }

    if (event)
        file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = () => {
        text = reader.result.split("\r\n").filter(n => n)
        selected = text.sort(() => 0.5 - Math.random()).slice(0, words_count.value)
        for (const [i, word] of selected.entries()) {
            words.innerHTML += `<span>${word}</span> `
            // if (i !== selected.length - 1) {
            //     words.innerHTML += ' - '
            // }
        }
        output.style.display = 'none'
        main.style.display = 'block'
        saat.innerText = 0 + ' دقیقه و ' + 0 + ' ثانیه'
        speed.innerText = 0 + ' کلمه بر دقیقه'
        correct_word.innerText = 0 + ' از ' + selected.length
        wrong_word.innerText = 0 + ' از ' + selected.length
        input.focus()
    };
    reader.readAsText(file)
};
const startTime = () => {
    if(play === false){
        interval = setInterval(() => {
            ++second
            saat.innerText = Math.floor(second / 60) + ' دقیقه و ' + (second % 60) + ' ثانیه'
        }, 1000);
    }
}
const enfOfWords = () => {
    play = false
    clearInterval(interval)
    speed.innerText = Math.floor(selected.length * 60 / second) + ' کلمه بر دقیقه'
    input.disabled = true
    restart.style.display = 'inline-block'
    choos_file.style.display = 'inline-block'
}
const updateWordCount = () => {
    let correct = document.querySelectorAll('.correct')
    let wrong = document.querySelectorAll('.wrong')
    correct_word.innerText = correct.length + ' از ' + selected.length
    wrong_word.innerText = wrong.length + ' از ' + selected.length
}

restart.addEventListener('click', () => {
    restart.style.display = 'none'
    choos_file.style.display = 'none'
    input.disabled = false
    word_index.value = 0
    words.innerHTML = ''
    second = 0
    openFile()
})
choos_file.addEventListener('click', () => {
    window.location.reload()
})

input.addEventListener('keyup', e => {
    startTime()
    play = true
    const spans = document.querySelectorAll('span')
    let val = e.target.value.trim()
    let index = Number(word_index.value)
    const space = e.key == " " || e.code == "Space" || e.keyCode == 32
    if (space){
        if(!val) return
        if(val === selected[index]){
            spans[index].classList.remove('warning')
            spans[index].classList.add('correct')
        }
        else{
            spans[index].classList.remove('warning')
            spans[index].classList.add('wrong')
        }

        updateWordCount()
        spans[index].style.textDecoration = 'none'
        input.value = ''
        index++
        if (!selected[index]) return enfOfWords()
        spans[index].style.textDecoration = 'underline'
        word_index.value = index
    }
    if (!space && (spans[index].innerText.charAt(val.length - 1) !== val.charAt(val.length - 1)))
        spans[index].classList.add('warning')
    else
        spans[index].classList.remove('warning')
})