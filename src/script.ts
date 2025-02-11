import CalcUtil from "./CalcUtil";
import InfixToPostfixUtil from "./InfixToPostfixUtil";

const ops = CalcUtil.ops;
const funs = CalcUtil.funs;
const dibtns= document.querySelectorAll(".di")as NodeListOf<HTMLButtonElement>; // which can be directly written to input field no need to process
const ndibtns = document.querySelectorAll(".ndi") as NodeListOf<HTMLButtonElement>; // which can't be directly written to input field no need to process
const ndiDropdowns = document.querySelectorAll("select") as NodeListOf<HTMLSelectElement>;
const input = document.querySelector("#input") as HTMLInputElement;
const clrbtn = document.querySelector("#c") as HTMLButtonElement;
const eqbtn = document.querySelector("#eq") as HTMLButtonElement;
const backspacebtn = document.querySelector("#backspace") as HTMLButtonElement;
const degradbtn = document.querySelector("#deg-rad") as HTMLButtonElement;
const signbtn = document.querySelector("#sign") as HTMLButtonElement;
const febtn = document.querySelector("#f-e") as HTMLButtonElement;
const secondbtn = document.querySelector("#second") as HTMLButtonElement;
const themebtn = document.querySelector("#theme") as HTMLButtonElement;
// memory buttons
const MS = document.querySelector("#MS") as HTMLButtonElement;
const MC = document.querySelector("#MC") as HTMLButtonElement;
const MR = document.querySelector("#MR") as HTMLButtonElement;
const M_p = document.querySelector("#M_p") as HTMLButtonElement; // M+
const M_m = document.querySelector("#M_m") as HTMLButtonElement; // M-

let cursorPos:number|null = 0;

themebtn.addEventListener("click", (_) => {
  if ((document.querySelector("body") as HTMLBodyElement).classList.contains("light")) {
    (document.querySelector("body") as HTMLBodyElement).classList.replace("light", "dark");
  } else {
    (document.querySelector("body") as HTMLBodyElement).classList.replace("dark", "light");
  }
});

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
    (document.getElementById("xpow3") as HTMLButtonElement).innerHTML = "x<sup>2</sup>";
    (document.getElementById("xpow3") as HTMLButtonElement).id = "xpow2";
    secondbtn.style.backgroundColor = "";
  } else {
    {
      secondbtn.style.backgroundColor = "#FF7F7F";
      (document.getElementById("xpow2") as  HTMLButtonElement).innerHTML = "x<sup>3</sup>";
      (document.getElementById("xpow2") as  HTMLButtonElement).id = "xpow3";
    }
  }
});

febtn.addEventListener("click", (_) => {
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
      console.log();
    } else {
      throw new Error("invalid input");
    }
  } catch (error) {
    alert(error.toString());
  }
});

signbtn.addEventListener("click", (_) => {
  if (input.value != "") {
    input.value = input.value + "*" + "(-1)";
  }
});

degradbtn.addEventListener("click", (_) => {
  CalcUtil.isDeg = !CalcUtil.isDeg;
  degradbtn.textContent = (CalcUtil.isDeg && "DEG") || "RAD";
});

input.addEventListener("click", (_) => {
  cursorPos = input.selectionStart;
});
dibtns.forEach((dibtn) => {
  dibtn.addEventListener("click", (e) => {
    input.value =
      input.value.slice(0, cursorPos??0) +
      (e.target as HTMLButtonElement).textContent +
      input.value.slice(cursorPos??0);
    cursorPos=cursorPos?cursorPos+1:0;
  });
});

ndibtns.forEach((ndibtn) => {
  ndibtn.addEventListener("click", ndiHandler);
});
ndiDropdowns.forEach((ndiDropdown) => {
  ndiDropdown.addEventListener("change", () => ndiHandler(ndiDropdown.value));
});
backspacebtn.addEventListener("click", (_) => {
  if (cursorPos && cursorPos > 0) {
    input.value =
      input.value.slice(0, cursorPos - 1) + input.value.slice(cursorPos);
    cursorPos--;
  }
});
clrbtn.addEventListener("click", (_) => {
  input.value = "";
  localStorage.clear();
  window.location.reload();
});
eqbtn.addEventListener("click", (_) => {
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
    console.log(infCharArray);

    const postCharArray = InfixToPostfixUtil.convertInfToPost(infCharArray);

    console.log(postCharArray);

    input.value = evaluatePost(postCharArray as string[]).toString();
    input.selectionStart = 0;
  } catch (error) {
    console.trace(error);
  }

  function evaluatePost(str: string[]):number {
    const stack:(string|number)[] = [];
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
    const n = parseInt(localStorage.getItem("n")??"0");
    localStorage.setItem("n", (n + 1).toString());
    localStorage.setItem(`${n + 1} cal`, `${input.value}=${res}`);
    addToHistory(`${input.value}=${res}`);
    return res;
  }
});
function ndiHandler(e:MouseEvent|string) {
  if (typeof e === "string") {
    switch (e) {
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
    }
    cursorPos = (cursorPos??0)+ e.length + 1;
  } else {
    switch ((e.currentTarget as HTMLButtonElement).id) {
      case "abs":
        input.value = "abs(" + input.value + ")";
        // cursorPos += 4;

        break;
      case "xpow2":
        input.value = "(" + input.value + ")^2";
        // cursorPos += 1;

        break;
      case "xpow3":
        input.value = "(" + input.value + ")^3";
        // cursorPos += 1;

        break;
      case "reciprocal":
        input.value = "1/(" + input.value + ")";
        // cursorPos += 3;

        break;
      case "exp":
        input.value = "℮^(" + input.value + ")";
        // cursorPos += 3;

        break;
      case "mod":
        input.value = "(" + input.value + ")mod()";
        // cursorPos += input.value.toString().length + 2 + 4;

        break;
      case "sqrt":
        input.value = "sqrt(" + input.value + ")";
        // cursorPos += 6;

        break;
      case "fact":
        input.value = "fact(" + input.value + ")";
        // cursorPos += 1;

        break;
      case "xpowy":
        input.value = "(" + input.value + ")^()";
        // cursorPos += input.value.toString().length + 2 + 2;

        break;
      case "10powx":
        input.value = "10^(" + input.value + ")";
        // cursorPos += 5;
        break;
      case "log":
        input.value = "log(" + input.value + ")";
        // cursorPos += 4;
        break;
      case "ln":
        input.value = "ln(" + input.value + ")";
        // cursorPos += 3;
        break;
    }
  }
}

const history = document.getElementById("history");
function addToHistory(cal:string) {
  const newele = document.createElement("li");
  newele.textContent = `${cal}`;
  history?.insertBefore(newele, history.firstChild);
}
