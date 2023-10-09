/*
This snippet of code assembles for executable that is meant to be read by this 4bit cpu

copied from this: https://simulator.io/board/AWZpw7Fy3I/2
Sample 4-Bit-CPU, Bastian Born (build 2015)

This machine has two Registers (A and B) and 12 instructions.
You can write your program using the diode tool on the ROM (upper left corner).
On expected user input (instruction IN) the red light next to the input switches lights up,
to confirm your input press the confirm button once.


Instructions:

0x00  IN         reads input to A
0x01  OUT        writes A to display
0x02  MOV xx     loads intermediate number to A
0x03  SWP        swaps register A and B
0x04  ADD        adds B to A, saves in A
0x05  SUB        subtracts B from A, saves in A
0x06  AND        AND on A and B, saves in A
0x07  OR         OR on A and B, saves in A
0x08  XOR        XOR on A and B, saves in A
0x09  NOT        NOT on A
0x0A  JMP xx     jumps to address
0x0B  JZ  xx     jumps to address, if zero flag is set

All arithmetic/logic instructions update the zero flag.
*/

//source code, edit here
//this example calculates fibbonachi numbers
let source =`
  MOV 0x0
  SWP
  MOV 0x1
a SWP
  OUT
  ADD
  JMP a
`.replace(/[ ]+/g, ' ').split('\n').filter(x=>x).map(x => {
	x = x.split(' ');
	if (!x[0]) x.shift();
	return x;
}),

codeMap = {
	IN : 0x0,
	OUT: 0x1,
	MOV: 0x2,
	SWP: 0x3,
	ADD: 0x4,
	SUB: 0x5,
	AND: 0x6,
	OR : 0x7,
	XOR: 0x8,
	NOT: 0x9,
	JMP: 0xA,
	JZ : 0xB
},

sizeMap = {
	IN : 1,
	OUT: 1,
	MOV: 2,
	SWP: 1,
	ADD: 1,
	SUB: 1,
	AND: 1,
	OR : 1,
	XOR: 1,
	NOT: 1,
	JMP: 2,
	JZ : 2
},

jumps = {},

indexInCode = 0,

final = 'Compiled ROM:\n0: ',

diodify = x => x.toString(2).replace(/\d/g, x => x === '1' ? '#' : '-').padStart(4, '-');

for (let line of source) {
	if (line[0]) {
		jumps[line[0]] = indexInCode;
	}
	line.shift();
	indexInCode += sizeMap[line[0]];
}

outside: for (let i in source) {
	let line = source[i];
	for (let i = 0; i < sizeMap[line[0]]; i++) {
		if (!line[i]) {
			final = `Error on line ${i}: Missing ${i ? 'Argument' : 'Instruction'}`;
			break outside;
		}
	}

	// i = parseInt(i);
	// let token = source[i], addNext = i < source.length - 1;
	// if (token in codeMap) {
	// 	final += diodify(codeMap[token]);
	// } else if (token.match(/^0x[0-f]$/i)) {
	// 	final += diodify(parseInt(token, 16));
	// } else if (token in jumps) {
	// 	final += diodify(jumps[token]);
	// } else {
	// 	jumps[token] = i;
	// 	offset--;
	// 	addNext = false;
	// }

	final += `\n${i + offset}: `;
}

console.log(final);

// so the window does not immediately close if ran by doubleclick with node.js
setInterval(() => {}, 1000_000);
