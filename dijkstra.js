
// вводим арифмет выражение:
let str = '(8+9)*(7+1)^2';
str = str.toString();
let spl = str.split('')
let i = 0;
let d = '';
let j = 0;
let stack = [];

let priority= new Object();
priority['-'] = 0; 
priority['+'] = 0; 
priority['*'] = 1; 
priority['/'] = 1; 
priority['^'] = 2;
priority['('] = -1;
while(i < spl.length){
    if(/\d/.test(spl[i])){
        d += spl[i];
    }
    else{
        if(j == 0){
            stack.push(spl[i]);
            j++;
        }
        else{
            if(spl[i] == '('){
                stack.push(spl[i]);
                j++;
            }
            else if (spl[i] == ')'){
                while(stack[j - 1] != '('){
                    d+= stack[j - 1];
                    stack.pop();
                    j--;
                }

            }
            else if(priority[stack[j - 1]] < priority[spl[i]]){
                stack.push(spl[i]);
                j++;
            }
            else if(priority[stack[j - 1]] == priority[spl[i]]){
                d += stack[j - 1];
                stack[j - 1] = spl[i];
            }
            else if(priority[stack[j - 1]] > priority[spl[i]]){
                while((priority[stack[j - 1]] >= priority[spl[i]]) && j != 0){
                    d+=stack[j - 1];
                    stack.pop();
                    j--;
                }
                stack.push(spl[i]);
                j++;

            }
        }
    }
    i++;
}
while(j  != 0){
    if(stack[j-1] == '('){
        j--;
    }
    else{
        d += stack[j-1];
        j--;
    }
}
let str2 = d.split('');
let r = 0;
let stack2= [];
while(r < str2.length){
    if(/\d/.test(str2[r])){
       stack2.push(str2[r]);
       r++;
    }
    else{
        if(str2[r] == '*'){
            stack2.push(parseInt(stack2.pop()) * parseInt(stack2.pop()));
        }
        if(str2[r] == '-'){
            let p1 = parseInt(stack2.pop());
            let p2 = parseInt(stack2.pop());
            stack2.push(p2-p1);
        }
        if(str2[r] == '/'){
            let p1 = parseInt(stack2.pop());
            let p2 = parseInt(stack2.pop());
            stack2.push(p2/p1);
        }
        if(str2[r] == '^'){
            let p1 = parseInt(stack2.pop());
            let p2 = parseInt(stack2.pop());
            stack2.push(p2**p1);
        }
        if(str2[r] == '+'){
            stack2.push(parseInt(stack2.pop()) + parseInt(stack2.pop()));
        }
        r++;
    }
}
//выводим ответ:
console.log(stack2[0]);


