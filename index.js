/* Constants */
const colors = require("colors");
const mathjs = require("mathjs");
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const iterations = 5;
/* End Constants */

main();
function main() {
    process.stdout.write('\u001B[2J\u001B[0;0f');
    rl.question('Explicit or recursive formula? (e/r)', (answer) => { //Ask if explicit or recursive
        if(answer.toLowerCase() === "e" || answer.toLowerCase() === "explicit") {
            explicit();
        } else if(answer.toLowerCase() === "r" || answer.toLowerCase() === "recursive") {
            recursive();
        } else {
            console.log(colors.red("I couldn't understand what you wrote :("));
        }
    });
}

function recursive() {
    rl.question(colors.green("U0 = ? "), U0 => { // Ask U0
        rl.question(colors.cyan("U(n+1) = ? \nExample: (Un + 2) / 5\n"), answer => { //Ask U(n+1)
            const formula = answer.replace("Un", "x");
            const Un = mathjs.eval(("f(x) = " + formula));
            
            console.time("Sequence calculation time");
            let UNext = U0;
            const sequence = [];
            sequence.push(U0);
            for(let i = 0; i < iterations; i++) {
                sequence.push(UNext = Un(UNext));
            }
            console.timeEnd("Sequence calculation time");
            console.log(colors.cyan("Sequence: " + sequence));
            method1(sequence);
            method2(sequence);

            rl.close();
        });
    });
}

function explicit() {
    rl.question(colors.green("U(n) = "), answer => { //Ask U(n)
        const formula = answer.replace("n", "x");
        const Un = mathjs.eval(("f(x) = " + formula));
        
        const sequence = [];
        console.time("Sequence calculation time");        
        for(let i = 0; i < iterations; i++) {
            sequence.push(Un(i));
        }
        console.timeEnd("Sequence calculation time");
        console.log(colors.cyan("Sequence: " + sequence));
        method1(sequence);
        method2(sequence);
        method3(formula);
        rl.close();
    });
}

const increasing = () => console.log(colors.green("Increasing sequence\n"));
const decreasing = () => console.log(colors.yellow("Decreasing sequence\n"));

function method1(sequence) {
    console.log(colors.blue("\nFirst method (Un+1 - Un):"));
    const Un = sequence[0], Unext = sequence[1];

    if(Unext - Un > 0) {
        increasing();
    } else if (Unext - Un < 0) {
        decreasing();
    }
}

function method2(sequence) {
    console.log(colors.blue("Second method ((Un+1)/Un):"));
    let isValidSequence = true;
    for(let i = 0; i < sequence.length; i++) {
        if(sequence[i] < 0) isValidSequence = false;
    }
    if(!isValidSequence) {
        console.log(colors.red("Every terms of the sequence has to be > 0."));
    } else {
        const Un = sequence[0], Unext = sequence[1];
        const calculation = Unext / Un;

        if(calculation >= 1) {
            increasing();
        } else if(calculation <= 1) {
            decreasing()
        }
    }
}

function method3(formula) {
    console.log(colors.blue("Third method:"));
    const deritative = mathjs.derivative(formula, "x");
    if(deritative.op === "-") {
        decreasing();
    } else {
        increasing();
    }
}