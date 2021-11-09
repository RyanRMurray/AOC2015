import { Answers, GridMap, increment } from "../utils";

const turn_on = (b:boolean) => {return true};
const turn_off = (b:boolean) => {return false};
const toggle = (b:boolean) => {return !b};
const re = new RegExp(/(.+) (\d+),(\d+) through (\d+),(\d+)/);

const t_to_f = {
    "turn on"  : turn_on,
    "turn off" : turn_off,
    "toggle"   : toggle
};

const t_to_f2 = {
    "turn on"  : increment,
    "turn off" : (n:number) => {return n == 0 ? 0 : n -1},
    "toggle"   : (n:number) => {return n + 2}
}

class Instruction{
    i1 : (b:boolean) => boolean;
    i2 : (n:number) => number;
    x1 : number;
    y1 : number;
    x2 : number;
    y2 : number;

    constructor(f,x1,y1,x2,y2){
        this.i1 = t_to_f[f]
        this.i2 = t_to_f2[f]
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
};

export default function main(input:string): Answers{
    let lights : GridMap<boolean> = new GridMap(false);
    let lights2 : GridMap<number> = new GridMap(0);
    
    let instructions = input.split("\n").map( (l) => {
        let match = re.exec(l);
        return new Instruction(
            match[1],
            +match[2],
            +match[3],
            +match[4],
            +match[5],
        ); 
    });

    //apply instructions
    for(let i of instructions){
        for(let x = i.x1; x <= i.x2; x++){
            for(let y = i.y1; y <= i.y2; y++){
                lights.update([x,y],i.i1);
                lights2.update([x,y],i.i2);
            }
        }
    }

    //count
    let sum1 = 0;
    let sum2 = 0;
    for(let v of lights.values){
        if(v){sum1++};
    }
    for(let v of lights2.values){
        sum2 += v;
    }

    

    return {part1:sum1.toString(),part2:sum2.toString()}
}