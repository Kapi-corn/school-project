const buttons = document.querySelectorAll('.app__btn');
/* */
const result = document.getElementById('res');
const expression = document.getElementById('expr');
let tempExpr = '';

const replace = (i) => i.replaceAll('÷', '/').replaceAll('×', '*');

function updateDisplay(getTotal = false) {
    if (!tempExpr) tempExpr += 0;
    expression.innerText = tempExpr;
    
    let total;
    
    try { total = eval(replace(tempExpr)); }
    catch { total = eval(replace(tempExpr.slice(0, -1))); }
    
    if (tempExpr !== '0') {
        result.innerText = '= ' + total;
    } else {
        result.innerText = '';
    }
    
    if (getTotal) {
        expression.innerText = total;
        result.innerText = '';
    } tempExpr = expression.innerText;
    
} updateDisplay();


buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        const action = btn.getAttribute('data-action');
        let eq = false;
        
        switch (action) {
            case 'clear':
                tempExpr = ''; break;
            case 'percents':
                tempExpr = (eval(replace(tempExpr)) * 0.01).toString();
                eq = true;
                break;
            case 'del':
                tempExpr = tempExpr.slice(0, -1); break;
            case 'equals':
                eq = true; break;
            default:
                const operators = ['+', '-', '÷', '×'];
                const last = (i) => tempExpr[tempExpr.length - i];
                
                if (last(1) === '0' && value !== '.') {
                    if (operators.includes(value)) {
                        tempExpr += value;
                    } else if (value === '.') {
                        tempExpr += value;
                    } else {
                        if (tempExpr.length > 1 && !operators.includes(last(2))) {
                            tempExpr += value;
                        } else {
                            tempExpr = tempExpr.slice(0, -1) + value;;
                        }
                    }
                } else if (operators.includes(last(1)) && operators.includes(value)) {
                    tempExpr = tempExpr.slice(0, -1) + value;
                } else if (value === '.') {
                    const tokens = tempExpr.split(/[\+\-\×\÷]/);
                    const lastToken = tokens[tokens.length-1];
                    
                    if (!lastToken.includes('.')) {
                        tempExpr += '.';
                    }
                } else {
                    tempExpr += value;
                }
        }
        updateDisplay(eq);
    });
});