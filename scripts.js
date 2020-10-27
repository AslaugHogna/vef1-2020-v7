/**
 * Verkefni 7 – Caesar dulmál
 */

const LETTERS = `AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ`;

do {
  play();
} while (confirm('Reyna aftur?'));

function play() {
  alert('Halló!');
  let inp = prompt('Hvort viltu kóða eða afkóða streng? Skrifaðu "kóða" eða "afkóða"');

  if (inp == "kóða") {
    let input = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

    let n = Number.parseInt(input, 10);
    if (n < 1 || n > 31 || isNaN(n) ) {
      alert(`${input} er ekki heiltala á bilinu [1,31]. Reyndu aftur.`);
      return;
    }

    let str = prompt(`Gefðu upp strenginn sem á að kóða með hliðrun ${n}:`);
    if (typeof str === 'string') {
      let STR = str.toLocaleUpperCase();
      if (invalid(STR)) {
        alert(`Þú gafst upp stafi sem ekki er hægt að kóða. Nota þarf stafi úr íslenska stafrófinu. Reyndu aftur.`);
        return;
      }
      encode(STR, n);
    } else if (str === "") {
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`);
      return;
    }
  }

  else if (inp == "afkóða") {
    let input = prompt('Hversu mikið á að hliðra streng? Gefðu upp heiltölu á bilinu [1, 31]');

    let n = Number.parseInt(input, 10);
    if (n < 1 || n > 31 || isNaN(n) ) {
      alert(`${input} er ekki heiltala á bilinu [1,31]. Reyndu aftur.`);
      return;
    }

    let str = prompt(`Gefðu upp strenginn sem á að afkóða með hliðrun ${n}:`);
    if (typeof str === 'string'){
      let STR = str.toLocaleUpperCase();
      if (invalid(STR)) {
        alert(`Þú gafst upp stafi sem ekki er hægt að afkóða. Nota þarf stafi úr íslenska stafrófinu. Reyndu aftur.`);
        return;
      }
    decode(STR, n);
    } else if (str === "") {
      alert(`Þú gafst ekki upp streng. Reyndu aftur.`);
      return;
    }
  }
  
  else {
    alert(`Veit ekki hvaða aðgerð "${inp}" er. Reyndu aftur.`);
    return;
  }
}

/**
 * Athugar hvort einhverjir stafir séu ekki hluti af LETTERS
 * 
 * @param {string} STR Strengur sem á að bera saman við LETTERS
 * @returns {boolean} skilar false ef allir stafir finnast í LETTERS, annars true.
 */
function invalid(STR) {
  let count = 0;
  for (let i = 0; i < STR.length; i++) {
    for (let j = 0; j < LETTERS.length; j++) {
      if (STR[i] == LETTERS[j]) {
        count++;
        break;
      } 
    }     
  } 
  if (count == STR.length) {
    return false;
  } else return true;
}

/**
 * Kóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal kóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til hægri
 */
function encode(str, n) {
  
  let str_coded ="";

  for (let i = 0; i < str.length; i++) {
    let ind = LETTERS.indexOf(str[i]);
    let newind;
    
    if (ind + n < LETTERS.length) {
      newind = ind + n; 
    } else {
      newind = ind + n - LETTERS.length; 
    }
    str_coded += (LETTERS[newind]);
  }
  alert(str_coded);
}

/**
 * Afkóðar streng með því að hliðra honum um n stök.
 *
 * @param {string} str Strengur sem skal afkóða, aðeins stafir í stafrófi
 * @param {number} n Hliðrun, heiltala á bilinu [0, lengd stafrófs]
 * @returns {string} Upprunalegi strengurinn hliðraður um n til vinstri
 */
function decode(str, n) {
  let str_decoded ="";

  for (let i = 0; i < str.length; i++) {
    let ind = LETTERS.indexOf(str[i]);
    let newind;

    if (ind - n < 0) {
      newind = ind - n + LETTERS.length; 
    } else {
      newind = ind - n; 
    }
    str_decoded += (LETTERS[newind]);  
  }
  alert(str_decoded);
}

console.assert(encode('A', 3) === 'D', 'kóðun á A með n=3 er D');
console.assert(decode('D', 3) === 'A', 'afkóðun á D með n=3 er A');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 32) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'kóðun með n=32 er byrjunarstrengur');
console.assert(encode('AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 3) === 'DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 'kóðun á stafrófi með n=3');
console.assert(decode('DÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖAÁB', 3) === 'AÁBDÐEÉFGHIÍJKLMNOÓPRSTUÚVXYÝÞÆÖ', 'afkóðun á stafrófi með n=3');
console.assert(decode(encode('HALLÓHEIMUR', 13), 13) === 'HALLÓHEIMUR', 'kóðun og afkóðun eru andhverf');
