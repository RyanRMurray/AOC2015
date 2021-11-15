export interface Answers {
    part1:string,
    part2:string
}

//An object representing a weighted graph, using string labels for nodes.
//Note: maybe genericise this later?
export class WGraph<V>{
    private map: Record<string,Record<string,V>> = {};
    private ls: Set<string> = new Set();
    private default: V;

    constructor(d: V){
        this.default = d;
    }

    has(a:string,b:string){
        return (a in this.map) && (b in this.map[a])
    }

    ord(a:string,b:string){
        if(a > b){
            return [b,a];
        }
        return [a,b];
    }

    add(a:string, b:string, val:V){
        this.ls.add(a);
        this.ls.add(b);

        [a,b] = this.ord(a,b);

        if(!(a in this.map)){
            this.map[a] = {};
        }
        if(!(b in this.map)){
            this.map[b] = {};
        }
        this.map[a][b] = val;
    }

    update(a:string, b:string, op: (arg:V) => V){
        [a,b] = this.ord(a,b);

        if(this.has(a,b)){
            this.map[a][b] = op(this.map[a][b]);
        }else{
            this.add(a,b,op(this.default));
        }
    }

    get(a:string,b:string){
        [a,b] = this.ord(a,b);

        if(this.has(a,b)){
            return this.map[a][b];
        }

        return this.default
    }

    get labels(){
        return this.ls
    }
}

//An object representing an infinitely large cartesian grid of arbitrary dimension
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

export function add(a:number,b:number){return a+b};