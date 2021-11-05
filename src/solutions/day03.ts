import {Answers, GridMap, increment} from "../utils";

export default function main(input:string) : Answers{
    let x = 0;
    let y = 0;
    let sx = 0;
    let sy = 0;
    let rx = 0;
    let ry = 0;
    let visits : GridMap<number> = new GridMap(0);
    let p2_visits : GridMap<number> = new GridMap(0);
    let is_santa = false;

    visits.set([0,0],1);
    p2_visits.set([0,0],1);
    
    for(let d of input){
        switch (d){
            case "^":
                y++; 
                is_santa ? sy++ : ry++;
                break;
            case ">":
                x++; 
                is_santa ? sx++ : rx++;
                break;
            case "v":
                y--; 
                is_santa ? sy-- : ry--;
                break;
            case "<":
                x--; 
                is_santa ? sx-- : rx--;
                break;
        }

        visits.update([x,y], increment);

        if(is_santa){
            p2_visits.update([sx,sy], increment);
        } else {
            p2_visits.update([rx,ry], increment);
        }

        is_santa = !is_santa;
    }

    let p1 = visits.size.toString();

    let p2 = p2_visits.size.toString();

    return {part1:p1,part2:p2}
}