let display = document.getElementById('display');
let expression = '';

function appendNumber(number) {
    expression += number;
    display.value = expression;
}

function appendOperator(operator) {
    expression += operator;
    display.value = expression;
}

function appendSymbol(symbol) {
    expression += symbol;
    display.value = expression;
}

function clearDisplay() {
    expression = '';
    display.value = expression;
}

async function calculate() {
    try {
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression })
        });

        const data = await response.json();
        if (response.ok) {
            display.value = data.result;
            expression = data.result.toString();
        } else {
            display.value = 'NaN';
        }
    } catch (error) {
        display.value = 'Error';
    }
}

async function getHistory() {
    try {
        const response = await fetch('/history');
        const data = await response.json();

        if (response.ok) {
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '<table class="highlight" ><tr><th>Expression</th><th>Result</th></tr></table>';
            const table = historyDiv.querySelector('table');

            data.history.forEach(entry => {
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                cell1.textContent = entry.expression;
                cell2.textContent = entry.result;
            });
        } else {
            console.error('Failed to retrieve history');
        }
    } catch (error) {
        console.error('Failed to retrieve history:', error);
    }
}
