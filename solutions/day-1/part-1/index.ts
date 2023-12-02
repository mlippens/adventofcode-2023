import { promises as fs }from 'fs';


const findFirstNum = (input: string, regex: RegExp) => {
  console.log(`matching ${input} with ${regex}`)
  const match = input.match(regex);
  if (!match) throw new Error('Invalid calibration input');
  return match[0];
};


const main = async () => {
  const input = await fs.readFile('input.txt', 'utf8');

  const numRegex = /[0-9]/;

  console.log(input);
  const numbers = input
    .trim()
    .split('\n')
    .map((line: string) => {
      const reversed = line.split('').reverse().join('');
      return `${findFirstNum(line, numRegex)}${findFirstNum(reversed, numRegex)}`;
    })
    .map((num: string) => parseInt(num, 10));
  
  const answer = numbers.reduce((acc: number, num: number) => acc + num, 0);
  
  console.log(`Answer: ${answer}`);
}

main().catch(console.error);