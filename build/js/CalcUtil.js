var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _CalcUtil_add, _CalcUtil_sub, _CalcUtil_mul, _CalcUtil_div, _CalcUtil_pow, _CalcUtil_mod, _CalcUtil_degToRad, _CalcUtil_sin, _CalcUtil_cos, _CalcUtil_tan, _CalcUtil_cot, _CalcUtil_sec, _CalcUtil_cosec, _CalcUtil_asin, _CalcUtil_acos, _CalcUtil_atan, _CalcUtil_acot, _CalcUtil_asec, _CalcUtil_acosec, _CalcUtil_abs, _CalcUtil_ceil, _CalcUtil_floor, _CalcUtil_sqrt, _CalcUtil_log, _CalcUtil_ln, _CalcUtil_fact;
class CalcUtil {
    static calc(op1, op2, op) {
        let tmpans = 0;
        switch (op) {
            case "+":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_add).call(this, op1, op2);
                break;
            case "-":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_sub).call(this, op1, op2);
                break;
            case "*":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_mul).call(this, op1, op2);
                break;
            case "/":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_div).call(this, op1, op2);
                break;
            case "^":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_pow).call(this, op1, op2);
                break;
            case "%":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_mod).call(this, op1, op2);
                break;
        }
        return tmpans;
    }
    static fcalc(op1, op) {
        let tmpans = 0;
        switch (op) {
            case "sin":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_sin).call(this, op1);
                break;
            case "cos":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_cos).call(this, op1);
                break;
            case "tan":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_tan).call(this, op1);
                break;
            case "cot":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_cot).call(this, op1);
                break;
            case "sec":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_sec).call(this, op1);
                break;
            case "cosec":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_cosec).call(this, op1);
                break;
            case "asin":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_asin).call(this, op1);
                break;
            case "acos":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_acos).call(this, op1);
                break;
            case "atan":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_atan).call(this, op1);
                break;
            case "acot":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_acot).call(this, op1);
                break;
            case "asec":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_asec).call(this, op1);
                break;
            case "acosec":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_acosec).call(this, op1);
                break;
            case "abs":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_abs).call(this, op1);
                break;
            case "floor":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_floor).call(this, op1);
                break;
            case "ceil":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_ceil).call(this, op1);
                break;
            case "sqrt":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_sqrt).call(this, op1);
                break;
            case "log":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_log).call(this, op1);
                break;
            case "ln":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_ln).call(this, op1);
                break;
            case "fact":
                tmpans = __classPrivateFieldGet(this, _a, "f", _CalcUtil_fact).call(this, op1);
                break;
        }
        return tmpans;
    }
    static get funs() {
        return [
            "abs",
            "mod",
            "sqrt",
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
}
_a = CalcUtil;
_CalcUtil_add = { value: (op1, op2) => {
        return op1 + op2;
    } };
_CalcUtil_sub = { value: (op1, op2) => {
        return op1 - op2;
    } };
_CalcUtil_mul = { value: (op1, op2) => {
        return op1 * op2;
    } };
_CalcUtil_div = { value: (op1, op2) => {
        return op1 / op2;
    } };
_CalcUtil_pow = { value: (op1, op2) => {
        return Math.pow(op1, op2);
    } };
_CalcUtil_mod = { value: (op1, op2) => {
        return op1 % op2;
    } };
_CalcUtil_degToRad = { value: (op1) => {
        return op1 * (Math.PI / 180);
    } };
_CalcUtil_sin = { value: (op1) => {
        return (!_a.isDeg && Math.sin(op1)) || Math.sin(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_cos = { value: (op1) => {
        return (!_a.isDeg && Math.cos(op1)) || Math.cos(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_tan = { value: (op1) => {
        return (!_a.isDeg && Math.tan(op1)) || Math.tan(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_cot = { value: (op1) => {
        return (!_a.isDeg && 1 / Math.tan(op1)) || 1 / Math.tan(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_sec = { value: (op1) => {
        return (!_a.isDeg && 1 / Math.cos(op1)) || 1 / Math.cos(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_cosec = { value: (op1) => {
        return (!_a.isDeg && 1 / Math.sin(op1)) || 1 / Math.sin(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_asin = { value: (op1) => {
        return (!_a.isDeg && Math.asin(op1)) || Math.asin(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_acos = { value: (op1) => {
        return (!_a.isDeg && Math.acos(op1)) || Math.acos(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_atan = { value: (op1) => {
        return (!_a.isDeg && Math.atan(op1)) || Math.atan(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, op1));
    } };
_CalcUtil_acot = { value: (op1) => {
        return (!_a.isDeg && Math.atan(1 / op1)) || Math.atan(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, 1 / op1));
    } };
_CalcUtil_asec = { value: (op1) => {
        return (!_a.isDeg && Math.acos(1 / op1)) || Math.acos(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, 1 / op1));
    } };
_CalcUtil_acosec = { value: (op1) => {
        return ((!_a.isDeg && Math.asin(1 / op1)) || Math.asin(__classPrivateFieldGet(_a, _a, "f", _CalcUtil_degToRad).call(_a, 1 / op1)));
    } };
_CalcUtil_abs = { value: (op1) => {
        return Math.abs(op1);
    } };
_CalcUtil_ceil = { value: (op1) => {
        return Math.ceil(op1);
    } };
_CalcUtil_floor = { value: (op1) => {
        return Math.floor(op1);
    } };
_CalcUtil_sqrt = { value: (op1) => {
        return Math.sqrt(op1);
    } };
_CalcUtil_log = { value: (op1) => {
        return Math.log10(op1);
    } };
_CalcUtil_ln = { value: (op1) => {
        return Math.log(op1);
    } };
_CalcUtil_fact = { value: (op1) => {
        let ans = 1;
        for (let i = 1; i <= op1; i++) {
            ans *= i;
        }
        return ans;
    } };
CalcUtil.isDeg = true;
CalcUtil.isSecond = false;
export default CalcUtil;
