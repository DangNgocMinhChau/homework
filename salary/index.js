
let submittedData = [];

function clearForm() {
    document.getElementById("sales").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("personalTax").value = "";
    document.getElementById("total").value = "";
}
function convertToFormattedNumber(number) {
    let formattedNumber = number.toLocaleString();
    
    return formattedNumber;
}

function getCurrentDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1; 
    let day = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let dateTime = year + '-' + padZero(month) + '-' + padZero(day) + ' ' + padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
    return dateTime;
}
function padZero(num) {
    return (num < 10 ? '0' : '') + num;
}

function renderTable(data) {
    let table = document.getElementById("table-container");
    
    table.innerHTML = "";

    let headerRow = table.insertRow();
    for (let key in data[0]) {
        let headerCell = document.createElement("th");
        headerCell.textContent = key.charAt(0).toUpperCase() + key.slice(1); 
        headerRow.appendChild(headerCell);
    }

    data.forEach((item) => {
        let row = table.insertRow();
        for (let key in item) {
            let cell = row.insertCell();
            cell.textContent = item[key];
        }
    });
}

function submit() {
    let timeNow = getCurrentDateTime();
    console.log(timeNow);
    let sales = parseFloat(document.getElementById("sales").value);
    let salary = 0;
    let personalTax = 0;
    let totalIncome = 0;
    if (sales < 8888) {
        salary = sales * 0.07;
    } else if (sales >= 8888 && sales <= 19000) {
        salary = sales * 0.12;
    }else{
        salary = sales * 0.18;
    }

    if (salary >= 1223) {
        personalTax = '11.5';
        totalIncome = salary - (salary * 0.115) ;
    } else {
        personalTax = '2%';
        totalIncome = salary - (salary * 0.02) ;
    }

    document.getElementById("salary").value = convertToFormattedNumber(salary)
    document.getElementById("personalTax").value = personalTax
    document.getElementById("total").value = convertToFormattedNumber(totalIncome)
    let data = {
        Time: timeNow,
        sales: convertToFormattedNumber(sales),
        salary: convertToFormattedNumber(salary),
        Tax : convertToFormattedNumber(salary * 0.115),
        Total: convertToFormattedNumber(totalIncome)
    };

    submittedData.push(data);
    renderTable(submittedData);
}



