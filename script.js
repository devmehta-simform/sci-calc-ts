// const allbtns = document.querySelectorAll("button");
// const funbtns = document.querySelectorAll(".fun");
const dibtns = document.querySelectorAll(".di"); // which can be directly written to input field no need to process
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
  console.log("eq");
});
