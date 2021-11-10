import { Answers } from "../utils";

const re = new RegExp(/(.+) to (.+) = (\d+)/);
type Conns = Map<string, Map<string, number>>

function sum_path(path : [string], map : Conns): number | null{
    let s = 0;

    for(let i = 0; i < path.length-1; i++){
        if(!(path[i+1] in map[path[i]])){
            return null;
        }
        s += map[path[i]][path[i+1]];
    }

    return s
}

function permute(somearray){
    let res = [];

    function perm(a,memo?){
        let current = memo || [];
        memo = memo || [];

        for(let i = 0; i < a.length; i++){
            current = a.splice(i,1);
            if(a.length === 0){
                res.push(memo.concat(current));
            }
            perm(a.slice(), memo.concat(current));
            a.splice(i, 0, current[0]);
        }

        return res;
    }

    return perm(somearray);
}

export default function main(input: string): Answers{
    let locations = new Set();
    let connections: Conns = new Map();

    for(let l of input.split("\n")){
        let m = re.exec(l);
        locations.add(m[1]);
        locations.add(m[2]);

        if(!(m[1] in connections)){
            console.log(connections, m[1]);
            connections[m[1]] = new Map();
        }
        connections[m[1]][m[2]] = +m[3];

        if(!(m[2] in connections)){
            connections[m[2]] = new Map();
        }
        connections[m[2]][m[1]] = +m[3];
    }

    let perms = permute(Array.from(locations.values()));

    let p1 = Infinity;
    let p2 = 0;

    for(let p of perms){
        let p_sum = sum_path(p,connections);
        p1 = p_sum < p1 ? p_sum : p1;
        p2 = p_sum > p2 ? p_sum : p2;
    }

    return {part1:p1.toString(),part2:p2.toString()}
}