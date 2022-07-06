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

const word = "magnolia";

const guessedLetters = [];

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

addPlaceholders(word);

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
      console.log(guessedLetters);
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
