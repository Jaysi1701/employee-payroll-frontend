window.addEventListener('DOMContentLoaded', () => {

    const name = document.querySelector('#name');

    name.addEventListener('input', function () {

        const nameRegex =
            RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');

        if (nameRegex.test(name.value))
            document.querySelector('.text-error').textContent = "";
        else
            document.querySelector('.text-error').textContent =
                "Name is Incorrect";
    });

    const salary = document.querySelector('#salary');
    const output = document.querySelector('#salary-output');

    output.textContent = salary.value;

    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
});

const save = (event) => {

    event.preventDefault();

    try {

        let employeePayrollData =
            createEmployeePayroll();

        createAndUpdateStorage(employeePayrollData);

        console.log(employeePayrollData.toString());

        resetForm();

    } catch (e) {

        console.error(e);
        return;
    }
}

const createEmployeePayroll = () => {

    let employeePayrollData =
        new EmployeePayrollData();

    employeePayrollData.name =
        getInputValueById('#name');

    employeePayrollData.profilePic =
        getSelectedValues('[name=profile]').pop();

    employeePayrollData.gender =
        getSelectedValues('[name=gender]').pop();

    employeePayrollData.department =
        getSelectedValues('[name=department]');

    employeePayrollData.salary =
        getInputValueById('#salary');

    employeePayrollData.note =
        getInputValueById('#notes');

    employeePayrollData.startDate =
        getInputValueById('#day') + " "
        + getInputValueById('#month') + " "
        + getInputValueById('#year');

    return employeePayrollData;
}

function createAndUpdateStorage(employeePayrollData) {

    let employeePayrollList =
        JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (employeePayrollList != undefined) {

        employeePayrollList.push(employeePayrollData);

    } else {

        employeePayrollList = [employeePayrollData];
    }

    localStorage.setItem(
        "EmployeePayrollList",
        JSON.stringify(employeePayrollList)
    );
}

const resetForm = () => {

    setValue('#name', '');
    setValue('#notes', '');

    document.querySelector('#salary').value = 400000;
    document.querySelector('#salary-output').textContent = 400000;

    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');

    document.querySelector('#day').selectedIndex = 0;
    document.querySelector('#month').selectedIndex = 0;
    document.querySelector('#year').selectedIndex = 0;

    document.querySelector('.text-error').textContent = "";
}

const setValue = (id, value) => {

    const element =
        document.querySelector(id);

    element.value = value;
}

const unsetSelectedValues = (propertyValue) => {

    let allItems =
        document.querySelectorAll(propertyValue);

    allItems.forEach(item => {
        item.checked = false;
    });
}

const getInputValueById = (id) => {
    return document.querySelector(id).value;
}

const getSelectedValues = (propertyValue) => {

    let allItems =
        document.querySelectorAll(propertyValue);

    let selectedItems = [];

    allItems.forEach(item => {

        if (item.checked)
            selectedItems.push(item.value);
    });

    return selectedItems;
}