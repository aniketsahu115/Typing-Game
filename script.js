// inside script.js
// all of our quotes
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth. The world is full of obvious things which nobody by any chance ever observes. There is a fine line between deduction and imagination.',
  'There is nothing more deceptive than an obvious fact. It is a capital mistake to theorize before one has data. Insensibly one begins to twist facts to suit theories, instead of theories to suit facts.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation. You see, but you do not observe. The distinction is clear.',
  'I never make exceptions. An exception disproves the rule. To a great mind, nothing is little. We must not overlook any detail, however small.',
  'What one man can invent another can discover. There is a mystery about this which stimulates the imagination; where there is no imagination there is no horror. Logic is rare; therefore it is upon the logic rather than upon the crime that you should dwell.',
  'Nothing clears up a case so much as stating it to another person. It is most refreshingly unusual. But there is, if you will excuse my saying so, something just a little funny about it. Humor and tragedy are closely linked.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last. It has long been an axiom of mine that the little things are infinitely the most important. It is often in those unconsidered trifles that the real clues lie.',
];


// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
// at the end of script.js
document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();
  });

  // at the end of script.js
typedValueElement.addEventListener('input', () => {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // end of sentence
      // Display success
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
      messageElement.innerText = message;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  });
  // at the end of script.js
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

  document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;

    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function (word) {
      return `<span>${word} </span>`;
    });
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';

    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
    typedValueElement.addEventListener('input', handleInput);

    // Start the timer
    startTime = new Date().getTime();
  });

  function handleInput() {
    // Get the current word
    const currentWord = words[wordIndex];
    // get the current value
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {

      // Disable the input event listener
      typedValueElement.removeEventListener('input', handleInput);
      // Disable the textbox
      typedValueElement.disabled = true;
      // Display modal dialog box
      showModalDialog(message);
      // Store high score
      const score = elapsedTime / 1000;
      highScores.push(score);
      localStorage.setItem('highScores', JSON.stringify(highScores));
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // end of word
      // clear the typedValueElement for the new word
      typedValueElement.value = '';
      // move to the next word
      wordIndex++;
      // reset the class name for all elements in quote
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // highlight the new word
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // currently correct
      // highlight the next word
      typedValueElement.className = '';
    } else {
      // error state
      typedValueElement.className = 'error';
    }
  }

  function showModalDialog(message) {
    // Create a modal dialog box element
    const modal = document.createElement('div');
    modal.className = 'modal';
    // Create a close button
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => {
      // Remove the modal dialog box from the DOM
      modal.remove();
    });
    // Append the message and close button to the modal dialog box
    modal.appendChild(messageElement);
    modal.appendChild(closeButton);
    // Append the modal dialog box to the body
    document.body.appendChild(modal);
  }


