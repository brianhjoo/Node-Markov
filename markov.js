'use strict';


/** generate random num between 0 and max */
function getRandomNum(max) {
  return Math.floor(Math.random() * max);
}


/** Textual markov chain generator. */
class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   *
   * */

  getChains() {
    const markovChain = new Map();

    // 'The apple pie. The peach tree.'

    for (const word of this.words){
      if (!markovChain.has(word)){
        markovChain.set(word, []);
      }
    }

    for (let i = 0; i < this.words.length; i++) {
      if(i === this.words.length - 1) {
        let wordVal = markovChain.get(this.words[i]);
        wordVal.push(null);
      } else {
        let wordVal = markovChain.get(this.words[i]);
        wordVal.push(this.words[i + 1]);
      }
    }

    return markovChain;
  }


  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    const firstWord = this.words[0];
    const randomText = [firstWord];
    let currentWord = firstWord;

    while (currentWord !== null) {
      const primaryWordChoices = this.chains.get(currentWord);
      const randomIdx = getRandomNum(primaryWordChoices.length);
      currentWord = primaryWordChoices[randomIdx];

      randomText.push(currentWord);
    }

    return randomText.join(' ');
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}

let m = new MarkovMachine(`Four score and seven years ago our fathers brought forth on this continent, a
new nation, conceived in Liberty, and dedicated to the proposition that all men
[sic] are created equal.

Now we are engaged in a great civil war, testing whether that nation, or any
nation so conceived and so dedicated, can long endure. We are met on a great
battlefield of that war. We have come to dedicate a portion of that field, as
a final resting place for those who here gave their lives that that nation
might live. It is altogether fitting and proper that we should do this.

But, in a larger sense, we can not dedicate -- we can not consecrate -- we can
not hallow -- this ground. The brave men, living and dead, who struggled here,
have consecrated it, far above our poor power to add or detract. The world will
little note, nor long remember what we say here, but it can never forget what
they did here. It is for us the living, rather, to be dedicated here to the
unfinished work which they who fought here have thus far so nobly advanced. It
is rather for us to be here dedicated to the great task remaining before us --
that from these honored dead we take increased devotion to that cause for which
they gave the last full measure of devotion -- that we here highly resolve that
these dead shall not have died in vain -- that this nation, under God, shall
have a new birth of freedom -- and that government of the people, by the
people, for the people, shall not perish from the earth.`);

console.log(m.getText());



module.exports = {
  MarkovMachine
}
