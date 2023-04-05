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
    // TODO: implement this!

    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null
  }
}

let m = new MarkovMachine('The apple pie. The peach tree.');
console.log(m);



module.exports = {
  MarkovMachine
}
