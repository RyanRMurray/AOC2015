import { Answers } from "../utils";

const all_escapes = new RegExp(/\\(x[0-9a-f][0-9a-f]|\\|")/g);
const two_length = new RegExp(/\\|"/g);

export default function main(input: string): Answers{
    let string_sum = 0;
    let char_sum   = 0;

    for(let l of input.split(/\n/g)){
        string_sum += l.length;
        l = l.substring(1,l.length-1);
        char_sum   += l.replace(all_escapes, "z").length;
    }

    let new_char_sum = 0;
    for(let l of input.split(/\n/g)){
        new_char_sum += l.replace(two_length, "zz").length + 2;
    }

    let p1 = string_sum - char_sum;
    let p2 = new_char_sum - string_sum;


    return {part1:p1.toString(),part2:p2.toString()}
}