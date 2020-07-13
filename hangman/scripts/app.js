const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    }
    else {
        throw new Error('Unable to fetch puzzle')
    }
}

const boardEle = document.querySelector('#board')
const guessedEle = document.querySelector('#guesses')
let game1

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () => {
    boardEle.innerHTML = ''
    guessedEle.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((letter) => {
        const letterEle = document.createElement('span')
        letterEle.textContent = letter
        boardEle.appendChild(letterEle)
    })
}

const startGame = async () => {
    const puzzle = await getPuzzle('2')
    game1 = new Hangman(puzzle, 5)
    render()
}

document.querySelector('#reset').addEventListener('click', startGame)

startGame()