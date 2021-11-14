export interface Answers {
    part1:string,
    part2:string
}

export class GridMap<T>{
    private map = new Map<string,T>();
    private default: T;

    constructor(d:T){
        this.default = d;
    }

    update(k: number[], op: (arg:T) => T){
        let key = JSON.stringify(k);
        if(this.map.has(key)){
            this.map.set(key, op(this.map.get(key)));
        } else {
            this.map.set(key, op(this.default));
        }
    }

    set(k: number[], v: T): this{
        this.map.set(JSON.stringify(k),v);
        return this;
    }
    get(k: number[]): T | undefined{
        return this.map.get(JSON.stringify(k));
    }

    has(k: number[]): boolean{
        return this.map.has(JSON.stringify(k))
    }

    get size(){
        return this.map.size;
    }

    get keys(){
        return this.map.keys();
    }

    get values(){
        return this.map.values();
    }
}


export function permute(somearray){
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

//simple operators for map updating
export function increment(a:number){return a + 1};