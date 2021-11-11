import { Answers } from "../utils";

type shnumbers = [number, number, number, number, number, number, number, number];
const disallowed = [
    'i'.charCodeAt(0)-97,
    'o'.charCodeAt(0)-97,
    'l'.charCodeAt(0)-97
]

function validate(password:shnumbers): boolean{
    //find increasing
    let found1 = false;
    for(let i = 0; i < 6; i++){
        if((password[i] == password[i+1]-1) &&
           (password[i] == password[i+2]-2)
        ) found1 = true;
    }
    if(!found1) return false;

    //filter
    if(password.some((item) => {return disallowed.includes(item)})) return false;

    //find non-overlapping
    let found2 = 0;
    for(let i = 0; i < 7; i++){
        if(password[i] == password[i+1]){
            found2 ++;
            i++;
        }
    }
    if(found2 < 2) return false;

    return true
}

function shmincrement(password:shnumbers): shnumbers{
    for(let i = 7; i >= 0; i--){
        if(password[i] < 25){
            //skip disallowed
            do{
                password[i]++;
            }while(disallowed.includes(password[i]));
            break;
        }else{
            password[i] = 0;
        }
    }
    return password;
}

function to_shnumbers(password: string): shnumbers{
    let res: shnumbers = [0,0,0,0,0,0,0,0];

    for(let i = 0; i < 8; i++){
        res[i] = password.charCodeAt(i) - 97;
    }

    return res;
}

function from_shnumbers(password: shnumbers): string{
    let res = ['.','.','.','.','.','.','.','.'];
    
    for(let i = 0; i < 8; i++){
        res[i] = String.fromCharCode(password[i]+97);
    }

    return res.join("");
}

export default function main(input: string): Answers{
    let pwd = to_shnumbers(input);

    while(!validate(pwd)){
        pwd = shmincrement(pwd);
    }
    let p1 = from_shnumbers(pwd);
    pwd = shmincrement(pwd);

    while(!validate(pwd)){
        pwd = shmincrement(pwd);
    }
    let p2 = from_shnumbers(pwd);
    
    return {part1:p1,part2:p2}
}