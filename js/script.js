//Selects the unordered list where player's guessed letters appear
const guessedLettersList = document.querySelector(".guessed-letters");

//Selects "Guess!" button
const guessButton = document.querySelector(".guess");

//Selects text input where player guesses letter
const letterInput = document.querySelector(".letter");

//Selects paragraph where word in progress appears
const wordInProgressDisplay = document.querySelector(".word-in-progress");

//Selects paragraph where remaining guesses are displayed
const remainingGuessesParagraph = document.querySelector(".remaining");

//Selects span that displays number of remaining guesses
const remainingGuessesSpan = document.querySelector(".remaining span");

//Selects message paragraph
const message = document.querySelector(".message");

//Selects "Play Again" button
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";

let guessedLetters = [];

let remainingGuesses = 8;

//===========================================================

//Chooses a random word from a .txt file

const getWord = async function () {
  const data = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const parsedData = await data.text();

  const wordArray = parsedData.split("\n");

  const randomIndex = Math.floor(Math.random() * wordArray.length);
  const randomWord = wordArray[randomIndex].trim();
  word = randomWord;
  addPlaceholders(word);
}

getWord();

//===========================================================

//Adds placeholders for each letter

const addPlaceholders = function (word) {
  const wordArray = word.split("");
  const placeholderArray = [];

  for (let letter of wordArray) {
    placeholderArray.push("●");
  };

  const placeholderString = placeholderArray.join("");
  wordInProgressDisplay.innerText = `${placeholderString}`;
};


//==========================================================

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "One letter at a time, please!";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "That's not a letter and you know it.";
  } else {
    return input;
  }

};

//==========================================================

//Captures input

const makeGuess = function (usersGuess) {

    usersGuess = usersGuess.toUpperCase();
    if (guessedLetters.includes(usersGuess)) {
      message.innerText = "You've already guessed that letter! Why don't you try a new one?";
    } else {
      guessedLetters.push(usersGuess);
      showGuessedLetters();
      console.log(guessedLetters);
      countGuesses(usersGuess);
      updateWordInProgress(guessedLetters);
    }

};

//==========================================================

//Updates the page with the letters the player has already guessed

const showGuessedLetters = function () {
  guessedLettersList.innerHTML = "";

  for (let letter of guessedLetters) {
      const li = document.createElement("li");
      li.innerText = `${letter}`;
      guessedLettersList.append(li);
  };
};

//==========================================================

//Updates the word in progress display if the word contains the guessed letter

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);

    const updatedWord = [];

    for (let letter of wordArray) {
      if (guessedLetters.includes(letter)) {
        updatedWord.push(letter);
      } else {
        updatedWord.push("●");
      }
      console.log(updatedWord);
    }

    const updatedWordString = updatedWord.join("");
    console.log(updatedWordString);
    wordInProgressDisplay.innerText = `${updatedWordString}`;

    checkWin();
};

//==========================================================

//Keeps track of remaining guesses

const countGuesses = function (guess) {
    const upperWord = word.toUpperCase();

    if (!upperWord.includes(guess)) {
      message.innerText = "Sorry, that letter isn't in this word :(";
      remainingGuesses -= 1;
    } else {
      message.innerText = "Good job!  That letter is in the word! :)";
    };

    if (remainingGuesses === 0) {
      message.innerText = `Game over. The word was ${upperWord}.`;
      remainingGuessesSpan.innerText = "0 guesses"
      startOver();
    } else if (remainingGuesses === 1) {
      remainingGuessesSpan.innerText = "only 1 guess";
    } else {
      remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

//==========================================================

//Checks to see if player won the game

const checkWin = function () {
    if (wordInProgressDisplay.innerText === word.toUpperCase()) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
      startOver();
    }
};

//==========================================================

//Adds an event listener for the Guess Button

guessButton.addEventListener("click", function (e) {
    //Prevents page reloading when form is submitted
    e.preventDefault();

    //Clears message field
    message.innerText = "";

    const usersGuess = letterInput.value;

    //Validates that user's guess is a single letter
    const validatedGuess = validateInput(usersGuess);
    console.log(validatedGuess);

    if (validatedGuess) {
      makeGuess(usersGuess);
    };

    letterInput.value = "";

});

//=========================================================

//Starts game over after winning or losing

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesParagraph.classList.add("hide");
  guessedLettersList.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

//========================================================

//Adds click Event Listener for Play Again button

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerText = "";

    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    playAgainButton.classList.add("hide");

    getWord();
});
