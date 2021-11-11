import { Answers } from "../utils";

const re = new RegExp(/(.)\1*/g);

function numberify(input: string, times: number): string{
    for(let i = 0; i < times; i++){
        let m = input.match(re);
        let new_input = "";

        for(let chrs of m){
            new_input += chrs.length.toString() + chrs[0]; 
        }
        input = new_input;
    }
    return input
}

export default function main(input: string): Answers{

    let p1 = numberify(input, 40);

    let p2 = numberify(p1,10);

    return {
        part1: p1.length.toString(),
        part2: p2.length.toString()
    }
}