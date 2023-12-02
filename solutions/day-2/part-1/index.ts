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
    const validIds = [];
    const thresholds: Record<Color, number> = {
        red: 12,
        green: 13,
        blue: 14,
    }

    const input = await fs.readFile('input.txt', 'utf8');
    const lines = input.trim().split('\n');
    for (const line of lines) {
        const { id, items } = parser(line);
        const isInvalid = items.some((item)  => item.red > thresholds.red ||
            item.green > thresholds.green ||
            item.blue > thresholds.blue);
        console.log(`${id} is ${isInvalid ? 'invalid' : 'valid'}    ${JSON.stringify(items, null, 2)}`)
        if (!isInvalid) {
            validIds.push(id);
        }
    }
    const result = validIds.reduce((acc, id) => acc + parseInt(id, 10), 0);
    console.log(result);
};

main().catch(console.error);