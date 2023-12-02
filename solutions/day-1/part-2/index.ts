import { promises as fs }from 'fs';


const findFirst = (input: string, regex: RegExp) => {
  const match = input.match(regex);
  return match?.index ?? -1;
};

const numRegex = /[0-9]/;
const wordsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5, 
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const wordRegex = new RegExp(`(${Object.keys(wordsMap).join('|')})`);
const wordReverseRegex = new RegExp(`(${Object.keys(wordsMap).map((word: string) => word.split('').reverse().join('')).join('|')})`);

const findRealWord = (input: string, reverse: boolean = false) => {
  const mappedInput = reverse ? input.split('').reverse().join('') : input;
  const wordMatch = mappedInput.match(reverse ? wordReverseRegex : wordRegex);
  const numIndex = findFirst(mappedInput, numRegex);
  if (wordMatch !== null && ((numIndex > -1 && wordMatch.index! < numIndex) || numIndex === -1)) {
    const actualMatch = reverse ? wordMatch[0].split('').reverse().join('') : wordMatch[0];
    return String(wordsMap[actualMatch as keyof typeof wordsMap]);
  }
  if (numIndex === -1) throw new Error('Invalid calibration input');
  return mappedInput[numIndex];
}

const main = async () => {
  const input = await fs.readFile('input.txt', 'utf8');
  const numbers = input
    .trim()
    .split('\n')
    .map((line: string) => {
      const first = findRealWord(line);
      const second = findRealWord(line, true);
      console.log(`${first} + ${second}`);
      return first + second;
    })
    .map((num: string) => parseInt(num, 10));
  
  const answer = numbers.reduce((acc: number, num: number) => acc + num, 0);
  
  console.log(`Answer: ${answer}`);
}

main().catch(console.error);