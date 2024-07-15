document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('showFormBtn');
    const dropdownForm = document.getElementById('formContainer');

    dropdownButton.addEventListener('click', function() {
        if (dropdownForm.style.display === 'none' || dropdownForm.style.display === '') {
            dropdownForm.style.display = 'block';
            dropdownForm.style.animation = 'slideUp 0.3s ease-out forwards';
        } else {
            dropdownForm.style.display = 'none';
        }
    });
});

let textAdded = false;

document.getElementById('resetBtn').addEventListener('click', function() {
    history.go(0);
});

document.getElementById('dataBtn').addEventListener('click', function() {
    if (!textAdded) {
        const header = document.getElementById('header-data');
        header.innerText += 'Rafał Sarwa';
        textAdded = true; 
    } else {
        alert('Text has already been added.');
    }
});