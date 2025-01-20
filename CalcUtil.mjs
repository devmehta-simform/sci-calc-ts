export default class CalcUtil {
  static #add(op1, op2) {
    return op1 + op2;
  }
  static #sub(op1, op2) {
    return op1 - op2;
  }
  static #mul(op1, op2) {
    return op1 * op2;
  }
  static #div(op1, op2) {
    return op1 / op2;
  }
  static #pow(op1, op2) {
    return op1 ** op2;
  }
  static #mod(op1, op2) {
    return op1 % op2;
  }
  static #degToRad(op1) {
    return op1 * (Math.PI / 180);
  }
  // trigo funs
  static #sin(op1) {
    return (!this.isDeg && Math.sin(op1)) || Math.sin(this.#degToRad(op1));
  }
  static #cos(op1) {
    return (!this.isDeg && Math.cos(op1)) || Math.cos(this.#degToRad(op1));
  }
  static #tan(op1) {
    return (!this.isDeg && Math.tan(op1)) || Math.tan(this.#degToRad(op1));
  }
  static #cot(op1) {
    return (!this.isDeg && Math.cot(op1)) || Math.cot(this.#degToRad(op1));
  }
  static #sec(op1) {
    return (!this.isDeg && Math.sec(op1)) || Math.sec(this.#degToRad(op1));
  }
  static #cosec(op1) {
    return (!this.isDeg && Math.cosec(op1)) || Math.cosec(this.#degToRad(op1));
  }
  static #asin(op1) {
    return (!this.isDeg && Math.asin(op1)) || Math.asin(this.#degToRad(op1));
  }
  static #acos(op1) {
    return (!this.isDeg && Math.acos(op1)) || Math.acos(this.#degToRad(op1));
  }
  static #atan(op1) {
    return (!this.isDeg && Math.atan(op1)) || Math.atan(this.#degToRad(op1));
  }
  static #acot(op1) {
    return (!this.isDeg && Math.acot(op1)) || Math.acot(this.#degToRad(op1));
  }
  static #asec(op1) {
    return (!this.isDeg && Math.asec(op1)) || Math.asec(this.#degToRad(op1));
  }
  static #acosec(op1) {
    return (
      (!this.isDeg && Math.acosec(op1)) || Math.acosec(this.#degToRad(op1))
    );
  }
  // funs
  static #abs(op1) {
    return Math.abs(op1);
  }
  static #ceil(op1) {
    return Math.ceil(op1);
  }
  static #floor(op1) {
    return Math.floor(op1);
  }
  static #sqrt(op1) {
    return Math.sqrt(op1);
  }
  static #log(op1) {
    return Math.log10(op1);
  }
  static #ln(op1) {
    return Math.log(op1);
  }

  static #fact(op1) {
    let ans = 1;
    for (let i = 1; i <= op1; i++) {
      ans *= i;
    }
    return ans;
  }

  static calc(op1, op2, op) {
    let tmpans = 0;
    switch (op) {
      case "+":
        tmpans = this.#add(op1, op2);
        break;
      case "-":
        tmpans = this.#sub(op1, op2);
        break;
      case "*":
        tmpans = this.#mul(op1, op2);
        break;
      case "/":
        tmpans = this.#div(op1, op2);
        break;
      case "^":
        tmpans = this.#pow(op1, op2);
        break;
      case "%":
        tmpans = this.#mod(op1, op2);
        break;
    }

    return tmpans;
  }
  static fcalc(op1, op) {
    let tmpans = 0;
    switch (op) {
      case "sin":
        tmpans = this.#sin(op1);
        break;
      case "cos":
        tmpans = this.#cos(op1);
        break;
      case "tan":
        tmpans = this.#tan(op1);
        break;
      case "cot":
        tmpans = this.#cot(op1);
        break;
      case "sec":
        tmpans = this.#sec(op1);
        break;
      case "cosec":
        tmpans = this.#cosec(op1);
        break;
      case "asin":
        tmpans = this.#asin(op1);
        break;
      case "acos":
        tmpans = this.#acos(op1);
        break;
      case "atan":
        tmpans = this.#atan(op1);
        break;
      case "acot":
        tmpans = this.#acot(op1);
        break;
      case "asec":
        tmpans = this.#asec(op1);
        break;
      case "acosec":
        tmpans = this.#acosec(op1);
        break;
      case "abs":
        tmpans = this.#abs(op1);
        break;
      case "floor":
        tmpans = this.#floor(op1);
        break;
      case "ceil":
        tmpans = this.#ceil(op1);
        break;
      case "sqrt":
        tmpans = this.#sqrt(op1);
        break;
      case "log":
        tmpans = this.#log(op1);
        break;
      case "ln":
        tmpans = this.#ln(op1);
        break;
      case "fact":
        tmpans = this.#fact(op1);
        break;
    }

    return tmpans;
  }
  static get funs() {
    return [
      // "xpow2",
      // "reciprocal",
      "abs",
      // "exp",
      "mod",
      "sqrt",
      // "fact",
      // "xpowy",
      // "10powx",
      "log",
      "ln",
      "sin",
      "cos",
      "tan",
      "cot",
      "sec",
      "cosec",
      "asin",
      "acos",
      "atan",
      "acot",
      "asec",
      "acosec",
      "ceil",
      "floor",
      "fact",
    ].sort((a, b) => b.length - a.length);
  }
  static get ops() {
    return ["+", "-", "*", "/", "^", "%"];
  }
  static isDeg = true;
  static isSecond = false;
}
