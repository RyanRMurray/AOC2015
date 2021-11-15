import { Answers } from "../utils";

const re = new RegExp(/(.+) can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds/);
const racetime = 2503;

interface Deer{
    name: string,
    speed: number,
    duration: number,
    rest: number,
    running: boolean,
    swapon: number,
    distance: number,
    points: number
};

function tick(deer:Deer): number{
    if(deer.running){
        deer.distance += deer.speed;
    }
    deer.swapon--;
    if(deer.swapon == 0){
        if(deer.running){
            deer.running = false;
            deer.swapon = deer.rest;
        }else{
            deer.running = true;
            deer.swapon = deer.duration;
        }
    }

    return deer.distance
}

function round(reindeer: Deer[]){
    let best = 0;
    let leader = -1;

    for(let i = 0; i < reindeer.length; i++){
        let d = tick(reindeer[i]);
        if(d > best){
            best = d;
            leader = i;
        }
    }

    reindeer[leader].points++;
}

export default function main(input: string): Answers{
    let reindeer = [];

    for(let l of input.split("\n")){
        let match = re.exec(l);
        console.log
        reindeer.push({
            name: match[1],
            speed: +match[2],
            duration: +match[3],
            rest: +match[4],
            running: true,
            swapon: +match[3],
            distance: 0,
            points: 0
        })
    }

    for(let j = 0; j < racetime; j++){
        round(reindeer);
    }

    let p1 = 0;
    let p2 = 0;
    for(let d of reindeer){
        p1 = p1 < d.distance ? d.distance : p1;
        p2 = p2 < d.points ? d.points : p2;
    }

    return {part1:p1.toString(),part2:p2.toString()}
}