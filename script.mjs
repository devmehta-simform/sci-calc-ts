import BasicCalcUtil from "./BasicCalcUtil.mjs";
import InfixToPostfixUtil from "./InfixToPostfixUtil.mjs";

const ops = BasicCalcUtil.ops;
const funs = BasicCalcUtil.funs;
// const allbtns = document.querySelectorAll("button");
// const funbtns = document.querySelectorAll(".fun");
const dibtns = document.querySelectorAll(".di"); // which can be directly written to input field no need to process
const ndibtns = document.querySelectorAll(".ndi"); // which can't be directly written to input field no need to process
const input = document.querySelector("#input");
const oneargfunbtns = document.querySelectorAll(".one"); // funs that require just one arg
const clrbtn = document.querySelector("#c");
const eqbtn = document.querySelector("#eq");
const backspacebtn = document.querySelector("#backspace");
let cursorPos = 0;

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

ndibtns.forEach((ndibtn) => {
  ndibtn.addEventListener("click", (e) => {
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
    switch (e.currentTarget.id) {
      case "abs":
        input.value = "abs(" + input.value + ")";
        break;
      case "xpow2":
        input.value = "(" + input.value + ")^2";
        break;
      case "reciprocal":
        input.value = "1/(" + input.value + ")";
        break;
      case "exp":
        input.value = "e^(" + input.value + ")";
        break;
      case "mod":
        input.value = "(" + input.value + ")mod()";
        break;
      case "sqrt":
        input.value = "sqrt(" + input.value + ")";
        break;
      case "fact":
        input.value = "(" + input.value + ")!";
        break;
      case "xpowy":
        input.value = "(" + input.value + ")^()";
        break;
      case "10powx":
        input.value = "10^(" + input.value + ")";
        break;
      case "log":
        input.value = "log(" + input.value + ")";
        break;
      case "ln":
        input.value = "ln(" + input.value + ")";
        break;
    }
  });
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
  window.location.reload();
});
eqbtn.addEventListener("click", (e) => {
  // console.log(
  //   "eq",

  // );
  try {
    const infCharArray = input.value
      .toString()
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

        stack.push(BasicCalcUtil.calc(op1, op2, c));
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
const history = document.getElementById("history");
function addToHistory(cal) {
  const newele = document.createElement("li");
  newele.textContent = `${cal}`;
  history.insertBefore(newele, history.firstChild);
}
