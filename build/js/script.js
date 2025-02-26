import CalcUtil from "./CalcUtil.js";
import InfixToPostfixUtil from "./InfixToPostfixUtil.js";
const ops = CalcUtil.ops;
const funs = CalcUtil.funs;
const digitBtns = document.querySelectorAll(".di");
const nonDigitBtns = document.querySelectorAll(".ndi");
const nonDigitDropdowns = document.querySelectorAll("select");
const input = document.querySelector("#input");
const clearBtn = document.querySelector("#c");
const equalBtn = document.querySelector("#eq");
const backspaceBtn = document.querySelector("#backspace");
const degreeRadianBtn = document.querySelector("#deg-rad");
const signBtn = document.querySelector("#sign");
const feBtn = document.querySelector("#f-e");
const secondbtn = document.querySelector("#second");
const themebtn = document.querySelector("#theme");
const MS = document.querySelector("#MS");
const MC = document.querySelector("#MC");
const MR = document.querySelector("#MR");
const M_p = document.querySelector("#M_p");
const M_m = document.querySelector("#M_m");
let cursorPos = 0;
themebtn.addEventListener("click", (_) => {
    if (document.querySelector("body").classList.contains("light")) {
        document.querySelector("body").classList.replace("light", "dark");
    }
    else {
        document.querySelector("body").classList.replace("dark", "light");
    }
});
MS.addEventListener("click", (_) => {
    localStorage.setItem("M", (input === null || input === void 0 ? void 0 : input.value) || "0");
});
MC.addEventListener("click", (_) => {
    localStorage.removeItem("M");
});
MR.addEventListener("click", (_) => {
    input.value =
        localStorage.getItem("M") ||
            (() => {
                alert("nothing stored in memory");
                return input.value;
            })();
});
M_m.addEventListener("click", (_) => {
    if (localStorage.getItem("M") == null) {
        alert("nothing stored in memory");
    }
    else {
        input.value = input.value + "-" + localStorage.getItem("M");
    }
});
M_p.addEventListener("click", (_) => {
    if (localStorage.getItem("M") == null) {
        alert("nothing stored in memory");
    }
    else {
        input.value = input.value + "+" + localStorage.getItem("M");
    }
});
secondbtn.addEventListener("click", (_) => {
    CalcUtil.isSecond = !CalcUtil.isSecond;
    if (!CalcUtil.isSecond) {
        document.getElementById("xpow3").innerHTML =
            "x<sup>2</sup>";
        document.getElementById("xpow3").id = "xpow2";
        secondbtn.style.backgroundColor = "";
    }
    else {
        {
            secondbtn.style.backgroundColor = "#FF7F7F";
            document.getElementById("xpow2").innerHTML =
                "x<sup>3</sup>";
            document.getElementById("xpow2").id = "xpow3";
        }
    }
});
feBtn.addEventListener("click", (_) => {
    try {
        const num = parseFloat(input.value.toString());
        if (!Number.isNaN(num)) {
            const tmp = num
                .toExponential()
                .toString()
                .split(/\s*([e+])\s*/)
                .filter((c) => c != "");
            const ans = "(" + tmp[0] + ")*10^(" + tmp[3] + ")";
            input.value = ans;
        }
        else {
            throw new Error("invalid input");
        }
    }
    catch (error) {
        alert(error.toString());
    }
});
signBtn.addEventListener("click", (_) => {
    if (input.value != "") {
        input.value = input.value + "*" + "(-1)";
    }
});
degreeRadianBtn.addEventListener("click", (_) => {
    CalcUtil.isDeg = !CalcUtil.isDeg;
    degreeRadianBtn.textContent = (CalcUtil.isDeg && "DEG") || "RAD";
});
input.addEventListener("click", (_) => {
    cursorPos = input.selectionStart;
});
digitBtns.forEach((digitBtn) => {
    digitBtn.addEventListener("click", (e) => {
        input.value =
            input.value.slice(0, cursorPos) +
                e.target.textContent +
                input.value.slice(cursorPos);
        cursorPos = cursorPos + 1;
    });
});
nonDigitBtns.forEach((nonDigitBtn) => {
    nonDigitBtn.addEventListener("click", nonDigitHandler);
});
nonDigitDropdowns.forEach((nonDigitDropdown) => {
    nonDigitDropdown.addEventListener("change", () => {
        nonDigitHandler(nonDigitDropdown.value);
        nonDigitDropdown.value = "default";
    });
});
backspaceBtn.addEventListener("click", (_) => {
    if (cursorPos && cursorPos > 0) {
        input.value =
            input.value.slice(0, cursorPos - 1) + input.value.slice(cursorPos);
        cursorPos--;
    }
});
clearBtn.addEventListener("click", (_) => {
    input.value = "";
});
equalBtn.addEventListener("click", (_) => {
    try {
        if (input.value.toString() == "") {
            throw new Error("empty input");
        }
        const infCharArray = input.value
            .toString()
            .replaceAll("π", Math.PI.toString())
            .replaceAll("rand", () => (Math.random() * 100.0).toString())
            .replaceAll("mod", "%")
            .replaceAll("℮", Math.E.toString())
            .split(/\s*([\(\)+\-*/^])\s*/)
            .filter((c) => c != "");
        const postCharArray = InfixToPostfixUtil.convertInfToPost(infCharArray);
        input.value = evaluatePost(postCharArray).toString();
        input.selectionStart = input.selectionEnd = input.value.toString().length;
        cursorPos = input.value.toString().length;
    }
    catch (error) {
        console.trace(error);
    }
    function evaluatePost(str) {
        const stack = [];
        for (const c of str) {
            const t = parseFloat(c);
            if (!Number.isNaN(t))
                stack.push(t);
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
            }
            else if (funs.includes(c)) {
                if (stack.length == 0) {
                    throw new Error("invalid input");
                }
                const op1 = stack.pop();
                stack.push(CalcUtil.fcalc(op1, c));
            }
        }
        const res = stack.pop();
        addToHistory(`${input.value}=${res}`);
        return res;
    }
});
function nonDigitHandler(e) {
    if (typeof e === "string") {
        input.value = `${e}(${input.value})`;
        cursorPos = (cursorPos !== null && cursorPos !== void 0 ? cursorPos : 0) + e.length + 1;
    }
    else {
        switch (e.currentTarget.id) {
            case "abs":
                input.value = "abs(" + input.value + ")";
                break;
            case "xpow2":
                input.value = "(" + input.value + ")^2";
                break;
            case "xpow3":
                input.value = "(" + input.value + ")^3";
                break;
            case "reciprocal":
                input.value = "1/(" + input.value + ")";
                break;
            case "exp":
                input.value = "℮^(" + input.value + ")";
                break;
            case "mod":
                input.value = "(" + input.value + ")mod()";
                break;
            case "sqrt":
                input.value = "sqrt(" + input.value + ")";
                break;
            case "fact":
                input.value = "fact(" + input.value + ")";
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
    }
}
const history = document.getElementById("history");
function addToHistory(cal) {
    const persistedHistory = localStorage.getItem("history");
    let parsedPersistedHistory = [];
    if (persistedHistory) {
        parsedPersistedHistory = JSON.parse(persistedHistory);
        console.log(parsedPersistedHistory);
        parsedPersistedHistory.unshift(cal);
    }
    localStorage.setItem("history", JSON.stringify(parsedPersistedHistory.length === 0 ? [cal] : parsedPersistedHistory));
    const newele = document.createElement("li");
    newele.textContent = `${cal}`;
    history === null || history === void 0 ? void 0 : history.insertBefore(newele, history.firstChild);
}
document.addEventListener("DOMContentLoaded", () => {
    const persistedHistory = localStorage.getItem("history");
    if (persistedHistory) {
        const parsedPersistedHistory = JSON.parse(persistedHistory);
        for (const item of parsedPersistedHistory) {
            const newele = document.createElement("li");
            newele.textContent = item;
            history === null || history === void 0 ? void 0 : history.appendChild(newele);
        }
    }
});
