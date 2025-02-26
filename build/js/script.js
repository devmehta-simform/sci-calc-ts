import CalcUtil from "./CalcUtil.js";
import InfixToPostfixUtil from "./InfixToPostfixUtil.js";
const ops = CalcUtil.ops;
const funs = CalcUtil.funs;
const directBtns = document.querySelectorAll(".di");
const nonDirectBtns = document.querySelectorAll(".ndi");
const nonDirectDropdowns = document.querySelectorAll("select");
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
            cursorPos = input.value.toString().length + 1;
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
directBtns.forEach((directBtn) => {
    directBtn.addEventListener("click", (e) => {
        input.value =
            input.value.slice(0, cursorPos) +
                e.target.textContent +
                input.value.slice(cursorPos);
        cursorPos = cursorPos + 1;
        input.focus();
    });
});
nonDirectBtns.forEach((nonDirectBtn) => {
    nonDirectBtn.addEventListener("click", nonDigitHandler);
});
nonDirectDropdowns.forEach((nonDirectDropdown) => {
    nonDirectDropdown.addEventListener("change", () => {
        nonDigitHandler(nonDirectDropdown.value);
        nonDirectDropdown.value = "default";
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
    window.location.reload();
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
        input.value = evaluatePost(postCharArray)
            .toFixed(11)
            .toString();
        input.selectionStart = input.selectionEnd = input.value.toString().length;
        cursorPos = input.value.toString().length + 1;
    }
    catch (error) {
        console.trace(error);
    }
    input.setSelectionRange(cursorPos, cursorPos);
    input.focus();
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
        input.value = e === "rand" ? `${input.value}${e}` : `${e}(${input.value})`;
        cursorPos = e === "rand" ? e.length : e.length + 2;
        cursorPos = (cursorPos !== null && cursorPos !== void 0 ? cursorPos : 0) + e.length + 1;
    }
    else {
        switch (e.currentTarget.id) {
            case "abs":
                cursorPos = input.value.toString().length + 4;
                input.value = "abs(" + input.value + ")";
                break;
            case "xpow2":
                cursorPos = input.value.toString().length + 4;
                input.value = "(" + input.value + ")^2";
                break;
            case "xpow3":
                cursorPos = input.value.toString().length + 4;
                input.value = "(" + input.value + ")^3";
                break;
            case "reciprocal":
                cursorPos = input.value.toString().length + 3;
                input.value = "1/(" + input.value + ")";
                break;
            case "exp":
                cursorPos = input.value.toString().length + 3;
                input.value = "℮^(" + input.value + ")";
                break;
            case "mod":
                cursorPos = input.value.toString().length + 6;
                input.value = "(" + input.value + ")mod()";
                break;
            case "sqrt":
                cursorPos = input.value.toString().length + 5;
                input.value = "sqrt(" + input.value + ")";
                break;
            case "fact":
                cursorPos = input.value.toString().length + 5;
                input.value = "fact(" + input.value + ")";
                break;
            case "xpowy":
                cursorPos = input.value.toString().length + 4;
                input.value = "(" + input.value + ")^()";
                break;
            case "10powx":
                cursorPos = input.value.toString().length + 4;
                input.value = "10^(" + input.value + ")";
                break;
            case "log":
                cursorPos = input.value.toString().length + 4;
                input.value = "log(" + input.value + ")";
                break;
            case "ln":
                cursorPos = input.value.toString().length + 3;
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
