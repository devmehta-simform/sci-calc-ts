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
});
eqbtn.addEventListener("click", (e) => {
  // console.log(
  //   "eq",

  // );
  const infCharArray = input.value
    .toString()
    .split(/\s*([\(\)+\-*/^])\s*/)
    .filter((c) => c != "");
  console.log(infCharArray);

  const postCharArray = infToPost(infCharArray);
  console.log(postCharArray);
  /* function isValid(str) {
    const stack = [];
    for (const c of str) {
      if (c == "(") stack.push();
      else if(c==')') {
        while()
      }
    }
  } */
  function getPrec(ch) {
    switch (ch) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      case "^":
        return 3;
      default:
        return -1;
    }
  }
  function infToPost(str) {
    const stack = [];
    const ans = [];
    /* if (!isValid(str)) {
      alert("error invalid input");
      return [];
    } */
    for (const c of str) {
      if (!Number.isNaN(parseFloat(c))) {
        ans.push(c);
        continue;
      } else if (c == "(") {
        stack.push(c);
        continue;
      } else if (c == ")") {
        while (stack.length != 0 && stack.at(stack.length - 1) != "(") {
          ans.push(stack.pop());
        }
        if (stack.length == 0) {
          alert("error invalid input");
          break;
        } else stack.pop();
        continue;
      } else {
        while (
          stack.length != 0 &&
          getPrec(stack.at(stack.length - 1)) >= getPrec(c)
        ) {
          ans.push(stack.pop());
        }
        stack.push(c);
      }
    }
    while (stack.length != 0) {
      const t = stack.pop();
      if (t == "(") {
        alert("error invalid input");
        break;
      }
      ans.push(t);
    }
    return ans;
  }
});
