import CalcUtil from "./CalcUtil.mjs";
import InfixToPostfixUtil from "./InfixToPostfixUtil.mjs";

const ops = CalcUtil.ops;
const funs = CalcUtil.funs;
// const allbtns = document.querySelectorAll("button");
// const funbtns = document.querySelectorAll(".fun");
const dibtns = document.querySelectorAll(".di"); // which can be directly written to input field no need to process
const ndibtns = document.querySelectorAll(".ndi"); // which can't be directly written to input field no need to process
const ndiDropdowns = document.querySelectorAll("select");
const input = document.querySelector("#input");
// const oneargfunbtns = document.querySelectorAll(".one"); // funs that require just one arg
const clrbtn = document.querySelector("#c");
const eqbtn = document.querySelector("#eq");
const backspacebtn = document.querySelector("#backspace");
const degradbtn = document.querySelector("#deg-rad");
const signbtn = document.querySelector("#sign");
const secondbtn = document.querySelector("#second");
const themebtn = document.querySelector("#theme");
// memory buttons
const MS = document.querySelector("#MS");
const MC = document.querySelector("#MC");
const MR = document.querySelector("#MR");
const M_p = document.querySelector("#M_p"); // M+
const M_m = document.querySelector("#M_m"); // M-

let cursorPos = 0;

themebtn.addEventListener("click", (e) => {
  if (document.querySelector("body").classList.contains("light")) {
    document.querySelector("body").classList.replace("light", "dark");
  } else {
    document.querySelector("body").classList.replace("dark", "light");
  }
});

MS.addEventListener("click", (e) => {
  localStorage.setItem("M", input.value || 0);
});

MC.addEventListener("click", (e) => {
  localStorage.removeItem("M");
});

MR.addEventListener("click", (e) => {
  input.value =
    localStorage.getItem("M") ||
    (() => {
      alert("nothing stored in memory");
      return input.value;
    })();
});

M_m.addEventListener("click", (e) => {
  if (localStorage.getItem("M") == null) {
    alert("nothing stored in memory");
  } else {
    // if(input.value==""){input.value=localStorage.getItem("M")}
    // else {input.value=evaluatePost()}
    input.value = input.value + "-" + localStorage.getItem("M");
  }
});

M_p.addEventListener("click", (e) => {
  if (localStorage.getItem("M") == null) {
    alert("nothing stored in memory");
  } else {
    // if(input.value==""){input.value=localStorage.getItem("M")}
    // else {input.value=evaluatePost()}
    input.value = input.value + "+" + localStorage.getItem("M");
  }
});

secondbtn.addEventListener("click", (e) => {
  CalcUtil.isSecond = !CalcUtil.isSecond;
  if (!CalcUtil.isSecond) {
    document.getElementById("xpow3").innerHTML = "x<sup>2</sup>";
    document.getElementById("xpow3").id = "xpow2";
    secondbtn.style.backgroundColor = "";
  } else {
    {
      secondbtn.style.backgroundColor = "#FF7F7F";
      document.getElementById("xpow2").innerHTML = "x<sup>3</sup>";
      document.getElementById("xpow2").id = "xpow3";
    }
  }
});

signbtn.addEventListener("click", (e) => {
  if (input.value != "") {
    input.value = input.value + "*" + "(-1)";
  }
});

degradbtn.addEventListener("click", (e) => {
  CalcUtil.isDeg = !CalcUtil.isDeg;
  degradbtn.textContent = (CalcUtil.isDeg && "DEG") || "RAD";
});

input.addEventListener("click", (e) => {
  cursorPos = input.selectionStart;
});
dibtns.forEach((dibtn) => {
  dibtn.addEventListener("click", (e) => {
    input.value =
      input.value.slice(0, cursorPos) +
      e.target.textContent +
      input.value.slice(cursorPos);
    cursorPos++;
  });
});
// console.log(ndibtns);

ndibtns.forEach((ndibtn) => {
  ndibtn.addEventListener("click", ndiHandler);
});
ndiDropdowns.forEach((ndiDropdown) => {
  ndiDropdown.addEventListener("change", () => ndiHandler(ndiDropdown.value));
});
backspacebtn.addEventListener("click", (e) => {
  if (cursorPos > 0) {
    input.value =
      input.value.slice(0, cursorPos - 1) + input.value.slice(cursorPos);
    cursorPos--;
  }
});

/* oneargfunbtns.forEach((oneargfunbtn) => {
  oneargfunbtn.addEventListener("click", (e) => {
    const arg = parseFloat(input.value);
    let val;
    switch (e.currentTarget.id) {
      case "abs":
        val = Math.abs(arg).toString();
        break;
      case "xpow2":
        val = Math.pow(arg, 2).toString();
        break;
      case "reciprocal":
        val = 1 / arg;
        break;
      case "fact":
        val = ((n) => {
          let ans = 1;
          while (n > 0) {
            ans *= n;
            n--;
          }
          return ans;
        })(arg);
        break;
      case "log":
        val = Math.log10(arg);
        break;
      case "ln":
        val = Math.log(arg);
        break;
    }

    input.value = val;
  });
}); */
clrbtn.addEventListener("click", (e) => {
  input.value = "";
  localStorage.clear();
  window.location.reload();
});
eqbtn.addEventListener("click", (e) => {
  // console.log(
  //   "eq",

  // );

  try {
    if (input.value.toString() == "") {
      throw new Error("empty input");
    }
    /*  let tmpstr = input.value.toString();
    for (let i = 0; i < funs.length; i++) {
      tmpstr = tmpstr.replaceAll(funs[i], `#{${i + 1}}`);
    } */
    // console.log(tmpstr);
    // tmpstr.

    const infCharArray = input.value
      .toString()
      .replaceAll("π", Math.PI)
      .replaceAll("rand", () => Math.random() * 100.0) // passing a function so every rand is replaced by randomly generated number
      .replaceAll("mod", "%")
      .replaceAll("℮", Math.E)
      .split(/\s*([\(\)+\-*/^])\s*/)
      .filter((c) => c != "");
    console.log(infCharArray);

    const postCharArray = InfixToPostfixUtil.convertInfToPost(infCharArray);

    console.log(postCharArray);

    input.value = evaluatePost(postCharArray);
    input.selectionStart = 0;
  } catch (error) {
    console.trace(error);
  }

  function evaluatePost(str) {
    const stack = [];
    for (const c of str) {
      const t = parseFloat(c);
      if (!Number.isNaN(t)) stack.push(t);
      else if (ops.includes(c)) {
        if (stack.length == 0) {
          throw new Error("invalid input");
        }
        const op2 = stack.pop();
        if (stack.length == 0) {
          throw new Error("invalid input");
        }
        const op1 = stack.pop();

        stack.push(CalcUtil.calc(op1, op2, c));
      } else if (funs.includes(c)) {
        if (stack.length == 0) {
          throw new Error("invalid input");
        }
        const op1 = stack.pop();
        stack.push(CalcUtil.fcalc(op1, c));
      }
    }
    const res = stack.pop();
    // maintaining history
    const n = parseInt(localStorage.getItem("n")) || 0;
    localStorage.setItem("n", n + 1);
    localStorage.setItem(`${n + 1} cal`, `${input.value}=${res}`);
    addToHistory(`${input.value}=${res}`);
    return res;
  }
});

function ndiHandler(e) {
  /*
button#xpow2. =
button#reciprocal. =
button#abs. =
button#exp.=
button#mod.=
button#sqrt.=
button#fact.=
button#xpowy.=
button#10powx.
button#log.
button#ln. */
  if (typeof e == typeof "") {
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
    cursorPos += e.length + 1;
  } else {
    switch (e.currentTarget.id) {
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
function addToHistory(cal) {
  const newele = document.createElement("li");
  newele.textContent = `${cal}`;
  history.insertBefore(newele, history.firstChild);
}
