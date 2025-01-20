import CalcUtil from "./CalcUtil.mjs";
const funs = CalcUtil.funs;
const ops = CalcUtil.ops;
export default class InfixToPostfixUtil {
  static #getPrec(ch) {
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

  static convertInfToPost(str) {
    let prev = null;
    /* reference stackoverflow */
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch == "-") {
        if (prev == null || prev == "(" || ops.includes(prev)) {
          // @ means that "-" is a unary operator and signifies the sign of the operand
          str[i] = "@";
        }
      }
      prev = ch;
    }
    str = str.filter((ch, i) => {
      if (ch == "@") {
        str[i + 1] = "-" + str[i + 1];
        return false;
      } else return true;
    });

    const stack = [];
    const ans = [];
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
          throw new Error("invalid input");
        } else stack.pop();
        continue;
      } else if (funs.includes(c)) stack.push(c);
      else {
        while (
          stack.length != 0 &&
          this.#getPrec(stack.at(stack.length - 1)) >= this.#getPrec(c)
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
        throw new Error("invalid input");
      }
      ans.push(t);
    }
    return ans;
  }
}
