import * as readline from "readline";
import * as fs from "fs";
import settings from "./aoc_config.json";
import day01 from "./solutions/day01";
import day02 from "./solutions/day02";
export * from "./solutions/day01";

let rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const solutions : {[n: number]: Function} = {
    1: day01,
    2: day02
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