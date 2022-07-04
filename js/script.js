//Selects the unordered list where player's guessed letters appear
const guessedLetters = document.querySelector(".guessed-letters");

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

//Adds an event listener for the Guess Button

guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    const inputValue = letterInput.value;
    console.log(inputValue);
    letterInput.value = "";
});
