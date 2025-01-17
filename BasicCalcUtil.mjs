export default class BasicCalcUtil {
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
    }
    return tmpans;
  }
}
