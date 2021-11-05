import {Answers} from "../utils";

function solve(input:string):[string,string]{
    let floor : number = 0;
    let entered = false;
    let at = -1;

    for(let i = 0; i < input.length; i++){
        if(input[i] === "("){
            floor++;
        } else {
            floor--;
        }

        if(floor == -1 && !entered){
            at = i + 1;
            entered = true;
        }
    }
    return [floor.toString(),at.toString()];
}

export default function main(input:string) : Answers{
    let [p1,p2] = solve(input);
    return {
        part1:p1,
        part2:p2
    };
}