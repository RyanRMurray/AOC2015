import {Answers} from "../utils";

function to_asc(line:string){
    let nums = [];
    for(let n of line.split("x")){
        nums.push(+n);
    }

    return nums.sort((a,b)=>a-b);
}

function solve(ins){
    let paper = 0;
    let ribbon = 0;
    for(let sh of ins){
        paper += 2 * (
            1.5*sh[0]*sh[1]+
            sh[1]*sh[2]+
            sh[0]*sh[2]
        );
        ribbon += 
            sh[0]*sh[1]*sh[2] + 
            sh[0] * 2 + sh[1] * 2;
    }

    return [paper.toString(),ribbon.toString()];
}

export default function main(input:string) : Answers{
    let ins = input.split("\n").map(l => to_asc(l));

    let [p1,p2] = solve(ins);

    return {
        part1:p1,
        part2:p2
    }


}