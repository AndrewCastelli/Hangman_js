class Hangman {
    constructor(word, guessesLeft, status) {
        this.word = word.toLowerCase().split('')
        this.guessedLetters = []
        this.guessesLeft = guessesLeft
        this.status = 'playing'
    }
    checkStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.guessesLeft === 0) {
            this.status = 'failed'
        }
        else if (finished) {
            this.status = 'finished'
        }
        else {
            this.status = 'playing'
        }
    }
    get statusMessage() {
        if (this.status === 'playing') {
            return `Guesses left: ${this.guessesLeft}`
        }
        else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word.join('')}"`
        }
        else {
            return 'Great work! You guessed the word'
        }
    }
    get puzzle() {
        let board = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                board += letter
            }
            else {
                board += '*'
            }
        })
        return board
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)

        if (isUnique) {
            this.guessedLetters.push(guess)
        }

        if (isUnique && isBadGuess) {
            this.guessesLeft -= 1
        }
        this.checkStatus()
        console.log(this.status)
    }
}





