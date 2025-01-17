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
      } else {
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
