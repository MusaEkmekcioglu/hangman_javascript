const wordLenght = document.querySelector('#word')
const submitBtn = document.querySelector('.btn')
const inputValue = document.querySelector('input')
const wrongLetter = document.querySelector('#wrong-letters')
const popup = document.querySelector('#popup-container')
const revealpopup = document.querySelector('#final-message-reveal-word')
const playBtn = document.querySelector('#play-button')
const containerFigure = document.querySelector('.figure-container')

let wordLenghtScore = []

playBtn.addEventListener('click', () => {
  wordLenghtScore = []
  inputValue.value = ''
  wrongLetter.textContent = ''
  wordLenght.textContent = ''
  popup.style.display = 'none'
  revealpopup.textContent = ''
  for (let i = 4; i < containerFigure.children.length; i++) {
    containerFigure.children[i].classList.add('figure-part')
  }
  getWord()
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let tryLetter = inputValue.value.toLowerCase().charAt(0)
  if (containsAnyLetter(tryLetter)) {
    useWrongLetter(tryLetter)
  } else {
    inputValue.value = ''
  }
})

function containsAnyLetter(str) {
  return /[a-zA-Z]/.test(str)
}

function useWrongLetter(letter) {
  if (
    !localStorage.getItem('word').includes(letter) &&
    !wrongLetter.textContent.includes(letter)
  ) {
    wrongLetter.textContent += letter + ' '
    useAddBoddy()
  } else {
    setWordBottom(letter)
  }

  inputValue.value = ''
}

function useAddBoddy() {
  const hangman = document.querySelectorAll('.figure-part')
  if (hangman.length == 0) {
    popup.style.display = 'flex'
    revealpopup.textContent = 'word : ' + localStorage.getItem('word')
  }
  hangman[0].classList.remove('figure-part')
}

function setWordBottom(letter) {
  for (let i = 0; i < wordLenghtScore.length; i++) {
    if (localStorage.getItem('word')[i] == letter) {
      wordLenghtScore[i] = letter
    }
  }

  wordLenght.textContent = wordLenghtScore.join('')
}

function getWordLenght(no) {
  for (let i = 0; i < no; i++) {
    wordLenghtScore.push('_ ')
  }
  wordLenght.textContent = wordLenghtScore.join('')
}

const getWord = () => {
  const number = Math.floor(Math.random() * 170000)

  axios
    .get('https://random-word-api.herokuapp.com/all')
    .then((res) => {
      localStorage.setItem('word', res.data[number])
      getWordLenght(res.data[number].length)
      //   useWrongLetter(res.data[number])
    })
    .catch((err) => console.log(err))
}

getWord()
