import wordsList from "../../assets/words/word-list.json";

const words = wordsList.filter((w) => w.frequency > 150000);

class HelperService {
  static getNewWord() {
    const totalWords = words.length;
    const random = Math.floor(Math.random() * totalWords);
    const word = words[random];
    return word.word;
  }

  static getTileStatus(index, guess, answer) {
    const guessLetters = guess.split("");
    const answerLetters = answer.split("");
    const value = guessLetters[index];

    //if the tile letter is in the right position
    // we mark the tile status as correct.
    if (answerLetters[index] === value) {
      return "CORRECT";
    }

    //if the tile letter does not exist in answer
    // we mark the tile status as incorrect.
    if (answerLetters.indexOf(value) === -1) {
      return "INCORRECT";
    }

    const letterMatchCountInGuess = guessLetters.filter((c) => c === value);
    const letterMatchCountInAnswer = answerLetters.filter((c) => c === value);

    // If you are checking for a letter in guess and
    // if that letter occurs less or equal number of times
    // in the answer, then you can safely mark it as 'WARN'
    // if the position is not correct.
    // E.g.
    // answer = AWARE guess = CANAL or BLAST
    // If you are checking for letter A then you can safely
    // mark the position as 'WARN'
    if (letterMatchCountInGuess <= letterMatchCountInAnswer) {
      return "WARN";
    }

    // ON RARE BUT POSSIBLE OCCASION
    // if the letter in guess occurs more times
    // then the on in answer, then it could be
    // either marked as WARN (If the letter index)
    // is <= last unsuccessful match position index of the same letter.
    // or INCORRECT if its more.
    // E.g.
    // answer = ELITE and guess = WEEZE
    // and you are checking for letter E
    // In this case E occurs at 3 different indexes
    // index = 1, 2 and 4
    // for index = 4 since E is also present at the same position
    // in the match it has to be marked as 'CORRECT'
    // since now there is only 1 unsuccessful match in the answer for letter E
    // the first index in guess (E at index 1) has to be marked as WARN
    // and the 2nd index (E at index 2) has be marked as INCORRECT
    const guessIndex = guessLetters
      .map((l, idx) => (l === value ? idx : -1))
      .filter((n) => n > -1);
    const answerIndex = answerLetters
      .map((l, idx) => (l === value ? idx : -1))
      .filter((n) => n > -1);
    const successIndex = [];

    for (let j = 0; j < guessIndex.length; j++) {
      const idx = guessIndex[j];
      if (guess.at(idx) === answer.at(idx)) {
        successIndex.push(idx);
      }
    }

    // At this stage we have all the indexes that do not match
    const noMatchIndex = guessIndex.filter(
      (id) => successIndex.indexOf(id) === -1
    );

    // Now at this stage noMatchIndex contains indexes of the
    // letter we are testing that does not fit at any position
    // correct
    // in above example
    // guessIndex = [1, 2, 4]
    // answerIndex = [0, 4]
    // successIndex = [4]
    // noMatchIndex = [1, 2]
    // so any Guess_Letter_Index has
    // an index <= (answerIndex - successIndex - 1) in noMatchIndex array
    // will be "WARN". (That letter still exists but at incorrect position)
    // others will be "INCORRECT". (Letter at incorrect position and guess
    // more times than in the answer)
    const threshold = answerIndex.length - successIndex.length - 1;
    if (noMatchIndex.indexOf(index) <= threshold) {
      return "WARN";
    }

    return "INCORRECT";
  }
}

export default HelperService;
