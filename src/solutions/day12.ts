import { Answers } from "../utils";

function recursive_parse(json_statham: any, ignore_red: boolean): number{
    let sum = 0;
    
    if(!isNaN(json_statham)){
        return +json_statham;
    }
    else if(typeof json_statham === "string"){
        return 0;
    }
    else if(json_statham instanceof Array){
        for(let e of json_statham){
            sum += recursive_parse(e, ignore_red);
        }
    }else{
        for(let p of Object.getOwnPropertyNames(json_statham)){

            if(json_statham[p] === "red" && ignore_red){
                return 0;
            }

            sum += recursive_parse(json_statham[p], ignore_red);
        }
    }

    return sum;
}

export default function main(input: string): Answers{
    let json_borne = JSON.parse(input);


    let p1 = recursive_parse(json_borne, false);
    let p2 = recursive_parse(json_borne, true);

    return {part1:p1.toString(), part2:p2.toString()};
}