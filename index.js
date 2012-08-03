function translate(text) {
  text = text.toUpperCase();

  var words
    , j
    , prefix
    , suffix
    , word
    , translatedWords
    ;

  words = text.split(' ');
  translatedWords = [];

  for (j in words) {
    prefix = words[j].match(/^\W+/) || '';
    suffix = words[j].match(/\W+$/) || '';
    word   = words[j].replace(prefix, '').replace(suffix, '');

    if (word) {
      translatedWords.push(prefix + _translateWord(word) + suffix);
    } else {
      translatedWords.push(words[j]);
    }
  }

  return translatedWords.join(' ');
};

 function _translateWord(word) {
  // Don't translate short words
  if (word.length == 1) {
      return word;
  }

  // Handle specific words
  switch (word) {
  case 'AWESOME':
      return 'ERSUM';
  case 'BANANA':
      return 'BERNERNER';
  case 'BAYOU':
      return 'BERU';
  case 'FAVORITE':
  case 'FAVOURITE':
      return 'FRAVRIT';
  case 'GOOSEBUMPS':
      return 'GERSBERMS';
  case 'LONG':
      return 'LERNG';
  case 'MY':
      return 'MAH';
  case 'THE':
      return 'DA';
  case 'THEY':
      return 'DEY';
  case 'WE\'RE':
      return 'WER';
  case 'YOU':
      return 'U';
  case 'YOU\'RE':
      return 'YER';
  }

  // Before translating, keep a reference of the original word
  var originalWord = word;

  // Drop vowel from end of words
  if (originalWord.length > 2) { // Keep it for short words, like "WE"
      word = word.replace(/[AEIOU]$/, '');
  }

  // Reduce duplicate letters
  word = word.replace(/[^\w\s]|(.)(?=\1)/gi, '');

  // Reduce adjacent vowels to one
  word = word.replace(/[AEIOUY]{2,}/g, 'E'); // TODO: Keep Y as first letter
  // DOWN -> DERN
  word = word.replace(/OW/g, 'ER');

  // PANCAKES -> PERNKERKS
  word = word.replace(/AKES/g, 'ERKS');

  // The mean and potatoes: replace vowels with ER
  word = word.replace(/[AEIOUY]/g, 'ER'); // TODO: Keep Y as first letter
  // OH -> ER
  word = word.replace(/ERH/g, 'ER');

  // MY -> MAH
  word = word.replace(/MER/g, 'MAH');

  // FALLING -> FERLIN
  word = word.replace('ERNG', 'IN');

  // POOPED -> PERPERD -> PERPED
  word = word.replace('ERPERD', 'ERPED');

  // MEME -> MAHM -> MERM
  word = word.replace('MAHM', 'MERM');

  // Keep Y as first character
  // YES -> ERS -> YERS
  if (originalWord.charAt(0) == 'Y') {
      word = 'Y' + word;
  }

  // Reduce duplicate letters
  word = word.replace(/[^\w\s]|(.)(?=\1)/gi, '');

  // YELLOW -> YERLER -> YERLO
  if ((originalWord.substr(-3) == 'LOW') && (word.substr(-3) == 'LER')) {
      word = word.substr(0, word.length - 3) + 'LO';
  }

  return word;
};

module.exports = {
  translate : translate
};