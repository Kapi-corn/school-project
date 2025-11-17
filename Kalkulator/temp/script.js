let display = document.getElementById('display');
let calcValue = '';

function getval(value) {
    let cvalue;
    switch (value) {
        case '÷': cvalue = '/'; break;
        case '×': cvalue = '*'; break;
        default: cvalue = value;
    }

    const operators = ['+', '-', '×', '÷', '.'];
    const lastVal = display.value.slice(-1);

    if (operators.includes(lastVal) && operators.includes(value)) {
        display.value = display.value.slice(0, -1) + value;
        calcValue = calcValue.slice(0, -1) + cvalue;
    } else {
        display.value += value;
        calcValue += cvalue;
    }
}

function clearval(all = false) {
    if (all) {
        display.value = '';
        calcValue = '';
    } else {
        display.value = display.value.slice(0, -1);
        calcValue = calcValue.slice(0, -1);
    }
}

function result() {
    try {
        if (calcValue) {
            if (calcValue.includes('/0')) {
                alert("Divided by zero? hmm, intresting...")
                clearval(all = true);
                return;
            }
            let res = eval(calcValue);

            display.value = res;
            calcValue = '' + res;
        }
    } catch {
        alert("Please enter the input correctly.");
        clearval(all = true);
    }
}