import { Answers } from "../utils";

type operand = number | string | undefined;
type func = (a: operand,b: operand) => number;
const assign = new RegExp(/^(\S+) -> (.+)/);
const operation = new RegExp(/(.+) (\w+) (.+) -> (.+)/);
const not = new RegExp(/NOT (.+) -> (.+)/);

function uint16(n){
    return n & 0xffff;
}

let Instructions : Map<string, Op>; 

function loadInstructions(m:Map<string,Op>){
    Instructions = new Map();
    for(let x in m){
        Instructions[x] = Object.create(m[x]);
    }
}

function val(o:operand){
    switch (typeof o){
        case 'number': return o;
        case 'string': return Instructions[o].evaluate();
        default: return null;
    }
}

const functions : {[key:string]:func} = {
    "AND"    : (a:operand, b: operand) => {return val(a) & val(b)},
    "OR"     : (a:operand, b:operand) => {return val(a) | val(b)},
    "LSHIFT" : (a:operand, b:operand) => {return val(a) << val(b)},
    "RSHIFT" : (a:operand, b:operand) => {return val(a) >> val(b)},
    "NOT"    : (a:operand, b:operand) => {return ~val(b)},
    undefined : (a:operand, b:operand) => {return val(b)}
}

class Op{
    left : operand;
    right : operand;
    f: func;
    value : number;

    constructor(l,r,f){
        this.left  = isNaN(+l) ? l : +l,
        this.right = isNaN(+r) ? r : +r,
        this.f = functions[f];
    }

    evaluate(){
        if(this.value){
            return this.value;
        }
        this.value = uint16(this.f(this.left,this.right));
        return this.value;
    }
}


export default function main(input: string): Answers{
    //generate instruction set
    //we store the parsed instructions so that we can clone anew for both parts of the puzzle.
    let parsed : Map<string, Op> = new Map();
    for(let l of input.split("\n")){
        let match = null; 
        if(operation.test(l)){
            //x OP y -> z
            match = operation.exec(l);
            parsed[match[4]] = new Op(match[1],match[3],match[2]);
        }else if(assign.test(l)){
            //y -> z
            match = assign.exec(l);
            parsed[match[2]] = new Op(null,match[1],undefined);
        }else if(not.test(l)){
            //NOT y -> z
            match = not.exec(l);
            parsed[match[2]] = new Op(null,match[1],"NOT");
        }
    }

    //part 1
    loadInstructions(parsed);
    let p1 = Instructions["a"].evaluate();

    //part 2
    parsed["b"] = new Op(null,p1,undefined);
    loadInstructions(parsed);
    let p2 = Instructions["a"].evaluate();

    return {
        part1: p1.toString(),
        part2: p2.toString()
    };
}