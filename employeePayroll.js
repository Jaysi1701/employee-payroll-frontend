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

    const salary =
        document.querySelector('#salary');

    const output =
        document.querySelector('#salary-output');

    output.textContent =
        salary.value;

    salary.addEventListener('input', function () {

        output.textContent =
            salary.value;
    });
});