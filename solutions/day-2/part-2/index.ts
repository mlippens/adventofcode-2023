import { promises as fs } from 'fs';

type Color = 'blue' | 'red' | 'green';
const parser = (line: string) => {
    const reg = /Game ([0-9]+?):(.*)$/;
    const result = line.match(reg); 
    const id = result?.[1]!;
    const rest = result?.[2]!;
    const record = rest.trim().split(';');
    const results = record.map((r) => {
        const items = r.split(',')
        return items.reduce((result, current) => {
            const [amountAsStr, color] = current.trim().split(' ');
            result[color as Color] = parseInt(amountAsStr, 10);
            return result;
        }, {} as Record<Color, number>)
    });
    return { id, items: results };
}

const main = async () => {

    const input = await fs.readFile('input.txt', 'utf8');
    const lines = input.trim().split('\n');
    const results: number[] = [];
    for (const line of lines) {
        const { id, items } = parser(line);
        const minimumViable = items.reduce((acc, current) => {
            if (current.blue > acc.blue)
                acc.blue = current.blue;
            if (current.red > acc.red)
                acc.red = current.red;
            if (current.green > acc.green)
                acc.green = current.green;
            return acc;
        }, { blue: 0, red: 0, green: 0 });
        const power = Object.values(minimumViable).reduce((acc, current) => acc * current, 1);
        results.push(power);
    }
    const result = results.reduce((acc, res) => acc + res, 0);
    console.log(result);
};

main().catch(console.error);