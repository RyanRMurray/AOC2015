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
}

//simple operators for map updating
export function increment(a:number){return a + 1};