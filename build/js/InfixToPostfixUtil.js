var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _InfixToPostfixUtil_getPrec;
import CalcUtil from "./CalcUtil.js";
const funs = CalcUtil.funs;
const ops = CalcUtil.ops;
class InfixToPostfixUtil {
    static convertInfToPost(str) {
        let prev = null;
        for (let i = 0; i < str.length; i++) {
            const ch = str[i];
            if (ch == "-") {
                if (prev == null || prev == "(" || ops.includes(prev)) {
                    str[i] = "@";
                }
            }
            prev = ch;
        }
        str = str.filter((ch, i) => {
            if (ch == "@") {
                str[i + 1] = "-" + str[i + 1];
                return false;
            }
            else
                return true;
        });
        const stack = [];
        const ans = [];
        for (const c of str) {
            if (!Number.isNaN(parseFloat(c))) {
                ans.push(c);
                continue;
            }
            else if (c == "(") {
                stack.push(c);
                continue;
            }
            else if (c == ")") {
                while (stack.length != 0 && stack.at(stack.length - 1) != "(") {
                    ans.push(stack.pop());
                }
                if (stack.length == 0) {
                    alert("error invalid input");
                    throw new Error("invalid input");
                }
                else {
                    stack.pop();
                    if (stack.length != 0 && funs.includes(stack.at(stack.length - 1)))
                        ans.push(stack.pop());
                }
                continue;
            }
            else if (funs.includes(c))
                stack.push(c);
            else {
                while (stack.length != 0 &&
                    __classPrivateFieldGet(this, _a, "m", _InfixToPostfixUtil_getPrec).call(this, stack.at(stack.length - 1)) >= __classPrivateFieldGet(this, _a, "m", _InfixToPostfixUtil_getPrec).call(this, c)) {
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
_a = InfixToPostfixUtil, _InfixToPostfixUtil_getPrec = function _InfixToPostfixUtil_getPrec(ch) {
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
};
export default InfixToPostfixUtil;
