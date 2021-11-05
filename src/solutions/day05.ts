import { Answers } from "../utils";

function part1(input:string): number{
    const blacklist = new Set(["ab","cd","pq","xy"]);
    const vowels = new Set(["a","e","i","o","u"]);

    let nice_count = 0;

    for(let str of input.split("\n")){
        let naughty = false;
        let dubs = false;
        let v_sum = 0;
        let last = str[0];

        if(vowels.has(last)){
            v_sum++;
        }

        for(let i = 1; i < str.length; i++){
            let curr = str[i];
            //blacklist
            if(blacklist.has(last+curr)){
                naughty = true;
                break;
            }
            //vowel
            if(vowels.has(curr)){
                v_sum++;
            }
            //dubs
            if(!dubs && last === curr){
                dubs = true;
            }
            last = curr;
        }

        if(!naughty && dubs && v_sum > 2){
            nice_count++;
        }
    }
    
    return nice_count;
}

function part2(input:string): number{
    const pair_rep = new RegExp(/(..).*\1/);
    const mirrored = new RegExp(/(.).\1/);
    let nice_count = 0;

    for(let str of input.split("\n")){
        if(pair_rep.test(str) && mirrored.test(str)){
            nice_count++;
        }
    }

    return nice_count;
}

export default function main(input:string): Answers{

    return {
        part1:part1(input).toString(),
        part2:part2(input).toString()
    };
}