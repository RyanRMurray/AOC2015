import {Answers} from "../utils";
import {Md5} from "ts-md5/dist/md5";

export default function main(input:string) : Answers{
    let p1_found = false;
    let p2_found = false;
    let p1 = "";
    let p2 = "";
    let append = 0;

    while(!p1_found || !p2_found){
        let str = Md5.hashStr(input+append);
        if(!p1_found && str.substring(0,5) === "00000"){
            p1_found = true;
            p1 = append.toString();
        }
        if(!p2_found && str.substring(0,6) === "000000"){
            p2_found = true;
            p2 = append.toString();
        }
        append++;
    }

    return {part1:p1,part2:p2}
}