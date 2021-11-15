import { Answers, WGraph, permute, add } from "../utils";

const re = new RegExp(/(\w+).+(gain|lose) (\d+).+ (\w+)./);

interface relation{
    a: string,
    b: string,
    val: number
}

function happiness(graph: WGraph<number>, order:string[]): number{
    let sum = graph.get(order[0],order[order.length-1]);


    for(let i = 0; i < order.length-1; i++){
        sum += graph.get(order[i],order[i+1]);
    }

    return sum
}

export default function main(input: string): Answers{
    let graph = new WGraph<number>(0);

    for(let l of input.split("\n")){
        let match = re.exec(l);
        graph.update(
            match[1],
            match[4],
            (b:number) => {return add(
                match[2] === "gain" ? +match[3] : -(+match[3]),
                b
            )}
        );
    }

    let perms = permute(Array.from(graph.labels));

    let p1 = 0;
    for(let p of perms){
        let v = happiness(graph,p);
        p1 = p1 < v ? v : p1;
    }

    for(let n of perms[0]){
        graph.add("Ryan",n,0);
    }

    perms = permute(Array.from(graph.labels));
    let p2 = 0;
    for(let p of perms){
        let v = happiness(graph,p);
        p2 = p2 < v ? v : p2;
    }

    return {part1:p1.toString(),part2:p2.toString()}
}