import * as readline from "readline";
import * as fs from "fs";
import settings from "./aoc_config.json";
import * as s from "./solutions";
import {Answers} from "./utils";

let rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const solutions : {[n: number]: Function} = {
    1: s.day01,
    2: s.day02,
    3: s.day03,
    4: s.day04,
    5: s.day05,
    6: s.day06,
    7: s.day07,
    8: s.day08,
    9: s.day09,
    10: s.day10,
    11: s.day11,
    12: s.day12,
    13: s.day13
}

function main(){
    let input : string = "";
    try {
        input = fs.readFileSync(settings.input_file,"utf8");
    } catch (err) {
        if (err.code === "ENOENT"){
            console.error("No input file found at " + settings.input_file);
        } else {
            console.error(err.message);
        }
        process.exit(1);
    }

    rl.question("Enter Day: ", function(day){
        let sol : Answers = solutions[+day](input);

        console.log("Part 1: \n" + sol.part1);
        console.log("Part 2: \n" + sol.part2);
        process.exit(0);
    })
}

main()