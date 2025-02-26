import CalcUtil from "./CalcUtil.js";
import InfixToPostfixUtil from "./InfixToPostfixUtil.js";

const ops = CalcUtil.ops;
const funs = CalcUtil.funs;
const directBtns = document.querySelectorAll(
	".di"
) as NodeListOf<HTMLButtonElement>; // which can be directly written to input field no need to process
const nonDirectBtns = document.querySelectorAll(
	".ndi"
) as NodeListOf<HTMLButtonElement>; // which can't be directly written to input field no need to process
const nonDirectDropdowns = document.querySelectorAll(
	"select"
) as NodeListOf<HTMLSelectElement>;
const input = document.querySelector("#input") as HTMLInputElement;
const clearBtn = document.querySelector("#c") as HTMLButtonElement;
const equalBtn = document.querySelector("#eq") as HTMLButtonElement;
const backspaceBtn = document.querySelector("#backspace") as HTMLButtonElement;
const degreeRadianBtn = document.querySelector("#deg-rad") as HTMLButtonElement;
const signBtn = document.querySelector("#sign") as HTMLButtonElement;
const feBtn = document.querySelector("#f-e") as HTMLButtonElement;
const secondbtn = document.querySelector("#second") as HTMLButtonElement;
const themebtn = document.querySelector("#theme") as HTMLButtonElement;
// memory buttons
const MS = document.querySelector("#MS") as HTMLButtonElement;
const MC = document.querySelector("#MC") as HTMLButtonElement;
const MR = document.querySelector("#MR") as HTMLButtonElement;
const M_p = document.querySelector("#M_p") as HTMLButtonElement; // M+
const M_m = document.querySelector("#M_m") as HTMLButtonElement; // M-

let cursorPos: number | null = 0;

themebtn.addEventListener("click", themeHandler);

MS.addEventListener("click", (_) => {
	localStorage.setItem("M", input?.value || "0");
});

MC.addEventListener("click", (_) => {
	localStorage.removeItem("M");
});

MR.addEventListener("click", (_) => {
	input.value =
		localStorage.getItem("M") ||
		(() => {
			alert("nothing stored in memory");
			return input.value;
		})();
});

M_m.addEventListener("click", (_) => {
	if (localStorage.getItem("M") == null) {
		alert("nothing stored in memory");
	} else {
		input.value = input.value + "-" + localStorage.getItem("M");
	}
});

M_p.addEventListener("click", (_) => {
	if (localStorage.getItem("M") == null) {
		alert("nothing stored in memory");
	} else {
		input.value = input.value + "+" + localStorage.getItem("M");
	}
});

secondbtn.addEventListener("click", (_) => {
	CalcUtil.isSecond = !CalcUtil.isSecond;
	if (!CalcUtil.isSecond) {
		(document.getElementById("xpow3") as HTMLButtonElement).innerHTML =
			"x<sup>2</sup>";
		(document.getElementById("xpow3") as HTMLButtonElement).id = "xpow2";
		secondbtn.style.backgroundColor = "";
	} else {
		{
			secondbtn.style.backgroundColor = "#FF7F7F";
			(document.getElementById("xpow2") as HTMLButtonElement).innerHTML =
				"x<sup>3</sup>";
			(document.getElementById("xpow2") as HTMLButtonElement).id = "xpow3";
		}
	}
});

feBtn.addEventListener("click", (_) => {
	try {
		const num = parseFloat(input.value.toString());
		if (!Number.isNaN(num)) {
			const tmp = num
				.toExponential()
				.toString()
				.split(/\s*([e+])\s*/)
				.filter((c) => c != "");
			const ans = "(" + tmp[0] + ")*10^(" + tmp[3] + ")";
			input.value = ans;
			cursorPos = input.value.toString().length + 1;
			// console.log();
		} else {
			throw new Error("invalid input");
		}
	} catch (error) {
		alert(error.toString());
	}
});

signBtn.addEventListener("click", (_) => {
	if (input.value != "") {
		input.value = input.value + "*" + "(-1)";
	}
});

degreeRadianBtn.addEventListener("click", (_) => {
	CalcUtil.isDeg = !CalcUtil.isDeg;
	degreeRadianBtn.textContent = (CalcUtil.isDeg && "DEG") || "RAD";
});

input.addEventListener("click", (_) => {
	cursorPos = input.selectionStart;
});
directBtns.forEach((directBtn) => {
	directBtn.addEventListener("click", (e) => {
		// input.focus();
		input.value =
			input.value.slice(0, cursorPos!) +
			(e.target as HTMLButtonElement).textContent +
			input.value.slice(cursorPos!);
		cursorPos = cursorPos! + 1;
		input.focus();
	});
});

nonDirectBtns.forEach((nonDirectBtn) => {
	nonDirectBtn.addEventListener("click", nonDigitHandler);
});
nonDirectDropdowns.forEach((nonDirectDropdown) => {
	nonDirectDropdown.addEventListener("change", () => {
		nonDigitHandler(nonDirectDropdown.value);
		nonDirectDropdown.value = "default";
	});
});
backspaceBtn.addEventListener("click", (_) => {
	if (cursorPos && cursorPos > 0) {
		input.value =
			input.value.slice(0, cursorPos - 1) + input.value.slice(cursorPos);
		cursorPos--;
	}
});
clearBtn.addEventListener("click", (_) => {
	input.value = "";
	// localStorage.clear();
	// window.location.reload();
});
equalBtn.addEventListener("click", (_) => {
	try {
		if (input.value.toString() == "") {
			throw new Error("empty input");
		}

		const infCharArray = input.value
			.toString()
			.replaceAll("π", Math.PI.toString())
			.replaceAll("rand", () => (Math.random() * 100.0).toString()) // passing a function so every rand is replaced by randomly generated number
			.replaceAll("mod", "%")
			.replaceAll("℮", Math.E.toString())
			.split(/\s*([\(\)+\-*/^])\s*/)
			.filter((c) => c != "");
		// console.log(infCharArray);

		const postCharArray = InfixToPostfixUtil.convertInfToPost(infCharArray);

		// console.log(postCharArray);

		// input.value = evaluatePost(postCharArray as string[]).toString();
		// input.selectionStart = 0;
		input.value = evaluatePost(postCharArray as string[])
			.toFixed(11)
			.toString();
		input.selectionStart = input.selectionEnd = input.value.toString().length;
		cursorPos = input.value.toString().length + 1;
		// console.log(input.value.toString().length);
	} catch (error) {
		console.trace(error);
	}
	input.setSelectionRange(cursorPos, cursorPos);
	// input.selectionStart =input.selectionEnd = cursorPos! + 1;
	input.focus();
	function evaluatePost(str: string[]): number {
		const stack: (string | number)[] = [];
		for (const c of str) {
			const t = parseFloat(c);
			if (!Number.isNaN(t)) stack.push(t);
			else if (ops.includes(c)) {
				if (stack.length == 0) {
					throw new Error("invalid input");
				}
				const op2 = stack.pop() as number;
				if (stack.length == 0) {
					throw new Error("invalid input");
				}
				const op1 = stack.pop() as number;

				stack.push(CalcUtil.calc(op1, op2, c));
			} else if (funs.includes(c)) {
				if (stack.length == 0) {
					throw new Error("invalid input");
				}
				const op1 = stack.pop() as number;
				stack.push(CalcUtil.fcalc(op1, c));
			}
		}
		const res = stack.pop() as number;
		// maintaining history
		// const n = parseInt(localStorage.getItem("n") ?? "0");
		// localStorage.setItem("n", (n + 1).toString());
		// localStorage.setItem(`${n + 1} cal`, `${input.value}=${res}`);
		addToHistory(`${input.value}=${res}`);
		return res;
	}
});
function nonDigitHandler(e: MouseEvent | string) {
	if (typeof e === "string") {
		input.value = e === "rand" ? `${input.value}${e}` : `${e}(${input.value})`;
		cursorPos = e === "rand" ? e.length : e.length + 2;
		/* switch (e) {
			case "sin":
				input.value = "sin(" + input.value + ")";
				break;
			case "cos":
				input.value = "cos(" + input.value + ")";
				break;
			case "tan":
				input.value = "tan(" + input.value + ")";
				break;
			case "cosec":
				input.value = "cosec(" + input.value + ")";
				break;
			case "sec":
				input.value = "sec(" + input.value + ")";
				break;
			case "cot":
				input.value = "cot(" + input.value + ")";
				break;
			case "asin":
				input.value = "asin(" + input.value + ")";
				break;
			case "acos":
				input.value = "acos(" + input.value + ")";
				break;
			case "atan":
				input.value = "atan(" + input.value + ")";
				break;
			case "acosec":
				input.value = "acosec(" + input.value + ")";
				break;
			case "asec":
				input.value = "asec(" + input.value + ")";
				break;
			case "acot":
				input.value = "acot(" + input.value + ")";
				break;
			case "ceil":
				input.value = "ceil(" + input.value + ")";
				break;
			case "floor":
				input.value = "floor(" + input.value + ")";
				break;
			case "rand":
				input.value = input.value + "rand";
				break;
		} */
		cursorPos = (cursorPos ?? 0) + e.length + 1;
	} else {
		switch ((e.currentTarget as HTMLButtonElement).id) {
			case "abs":
				cursorPos = input.value.toString().length + 4;
				input.value = "abs(" + input.value + ")";
				// cursorPos += 4;

				break;
			case "xpow2":
				cursorPos = input.value.toString().length + 4;
				input.value = "(" + input.value + ")^2";
				// cursorPos += 1;

				break;
			case "xpow3":
				cursorPos = input.value.toString().length + 4;
				input.value = "(" + input.value + ")^3";
				// cursorPos += 1;

				break;
			case "reciprocal":
				cursorPos = input.value.toString().length + 3;
				input.value = "1/(" + input.value + ")";
				// cursorPos += 3;

				break;
			case "exp":
				cursorPos = input.value.toString().length + 3;
				input.value = "℮^(" + input.value + ")";
				// cursorPos += 3;

				break;
			case "mod":
				cursorPos = input.value.toString().length + 6;
				input.value = "(" + input.value + ")mod()";
				// cursorPos += input.value.toString().length + 2 + 4;

				break;
			case "sqrt":
				cursorPos = input.value.toString().length + 5;
				input.value = "sqrt(" + input.value + ")";
				// cursorPos += 6;

				break;
			case "fact":
				cursorPos = input.value.toString().length + 5;
				input.value = "fact(" + input.value + ")";

				break;
			case "xpowy":
				cursorPos = input.value.toString().length + 4;
				input.value = "(" + input.value + ")^()";
				break;
			case "10powx":
				cursorPos = input.value.toString().length + 4;
				input.value = "10^(" + input.value + ")";
				// cursorPos += 5;
				break;
			case "log":
				cursorPos = input.value.toString().length + 4;
				input.value = "log(" + input.value + ")";
				// cursorPos += 4;
				break;
			case "ln":
				cursorPos = input.value.toString().length + 3;
				input.value = "ln(" + input.value + ")";
				// cursorPos += 3;
				break;
		}
	}
}

const history = document.getElementById("history");
function addToHistory(cal: string) {
	const persistedHistory = localStorage.getItem("history");
	let parsedPersistedHistory: string[] = [];
	if (persistedHistory) {
		parsedPersistedHistory = JSON.parse(persistedHistory) as string[];
		// console.log(parsedPersistedHistory);
		parsedPersistedHistory.unshift(cal);
	}
	localStorage.setItem(
		"history",
		JSON.stringify(
			parsedPersistedHistory.length === 0 ? [cal] : parsedPersistedHistory
		)
	);
	const newele = document.createElement("li");
	newele.textContent = `${cal}`;
	history?.insertBefore(newele, history.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
	const persistedHistory = localStorage.getItem("history");
	if (persistedHistory) {
		const parsedPersistedHistory = JSON.parse(persistedHistory) as string[];
		for (const item of parsedPersistedHistory) {
			const newele = document.createElement("li");
			newele.textContent = item;
			history?.appendChild(newele);
		}
	}
	const theme = localStorage.getItem("theme") as "light" | "dark";
	themeHandler(theme ?? undefined);
});

function themeHandler(val: "light" | "dark" | Event | undefined) {
	if (val instanceof Event || typeof val === undefined) {
		if (
			(document.querySelector("body") as HTMLBodyElement).classList.contains(
				"light"
			)
		) {
			(document.querySelector("body") as HTMLBodyElement).classList.replace(
				"light",
				"dark"
			);
			localStorage.setItem("theme", "dark");
		} else {
			(document.querySelector("body") as HTMLBodyElement).classList.replace(
				"dark",
				"light"
			);
			localStorage.setItem("theme", "light");
		}
	} else {
		if (val === "dark") {
			if (
				(document.querySelector("body") as HTMLBodyElement).classList.contains(
					"light"
				)
			) {
				(document.querySelector("body") as HTMLBodyElement).classList.replace(
					"light",
					"dark"
				);
			} else if (
				(document.querySelector("body") as HTMLBodyElement).classList.contains(
					"dark"
				)
			) {
				(document.querySelector("body") as HTMLBodyElement).classList.replace(
					"dark",
					"light"
				);
			}
		}
	}
}
