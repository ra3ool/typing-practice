let file = ''
let output = document.getElementById('output')
let main = document.getElementById('main')
let words = document.getElementById('words')
let input = document.getElementById('input')
let word_index = document.getElementById('word_index')
let restart = document.getElementById('restart')
let choos_file = document.getElementById('choos_file')
let text = [], selected = []

const openFile = event => {
    if (event)
        file = event.target.files[0]

    const reader = new FileReader()
    reader.onload = () => {
        text = reader.result.split("\r\n").filter(n => n)
        selected = text.sort(() => 0.5 - Math.random()).slice(0, 20)
        for (const [i, word] of selected.entries()) {
            words.innerHTML += `<span>${word}</span> `
            // if (i !== selected.length - 1) {
            //     words.innerHTML += ' - '
            // }
        }
        output.style.display = 'none'
        main.style.display = 'block'
        input.focus()
    };
    reader.readAsText(file)
};
const enfOfWords = () => {
    input.disabled = true
    restart.style.display = 'inline-block'
    choos_file.style.display = 'inline-block'
}

restart.addEventListener('click', () => {
    restart.style.display = 'none'
    choos_file.style.display = 'none'
    input.disabled = false
    word_index.value = 0
    words.innerHTML = ''
    input.focus()
    openFile()
})
choos_file.addEventListener('click', () => {
    window.location.reload()
})

input.addEventListener('keyup', e => {
    const spans = document.querySelectorAll('span')
    let val = e.target.value.trim()
    let index = Number(word_index.value)
    if (e.key == " " || e.code == "Space" || e.keyCode == 32){
        if(!val) return
        if(val === selected[index])
            spans[index].style.backgroundColor = '#6cef3a'
        else
            spans[index].style.backgroundColor = '#ff5c5c'

        spans[index].style.textDecoration = 'none'
        input.value = ''
        if (!selected[index + 1]) return enfOfWords()
        spans[index + 1].style.textDecoration = 'underline'
        word_index.value = index + 1
    }
})