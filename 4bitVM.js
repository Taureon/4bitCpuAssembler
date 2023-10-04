//Emulates this: https://simulator.io/board/AWZpw7Fy3I/2

let pointer = 0,

regA = 0,
regB = 0,

flag = 0,

rom = Array(16).fill(0);

while (pointer < 16) {
	switch (rom[pointer++]) {
		case 0x0: // IN  | reads input to A
			break;

		case 0x1: // OUT | writes A to display
			break;

		case 0x2: // MOV | loads intermediate number to A
			regA = rom[pointer++];
			break;

		case 0x3: // SWP | swaps register A and B
			[regA, regB] = [regB, regA];
			break;

		case 0x4: // ADD | adds B to A, saves in A
			regA += regB;
			flag = regA;
			break;

		case 0x5: // SUB | subtracts B from A, saves in A
			regA -= regB;
			flag = regA;
			break;

		case 0x6: // AND | AND on A and B, saves in A
			regA &= regB;
			flag = regA;
			break;

		case 0x7: // OR  | OR on A and B, saves in A
			regA |= regB;
			flag = regA;
			break;

		case 0x8: // XOR | XOR on A and B, saves in A
			regA ^= regB;
			flag = regA;
			break;

		case 0x9: // NOT | NOT on A
			regA = ~regA;
			flag = regA;
			break;

		case 0xA: // JMP | jumps to address
			pointer = rom[pointer];
			break;

		case 0xB: // JZ  | jumps to address, if zero flag is set
			if (flag) pointer = rom[pointer];
			break;
	}
}