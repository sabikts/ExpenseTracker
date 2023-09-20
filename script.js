const expenses = [];

function displayExpenses() {
    const expensesList = document.getElementById('expenses');
    expensesList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `Date: ${expense.date}, Category: ${expense.category}, Description: ${expense.description}, Amount: ₹${expense.amount.toFixed(2)}, Location: ${expense.location}, Payment Method: ${expense.paymentMethod}`;
        li.setAttribute('data-index', index);
        expensesList.appendChild(li);
    });
}

function addExpense() {
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (category && description && !isNaN(amount) && date && paymentMethod) {
        expenses.push({
            category: category,
            description: description,
            amount: amount,
            date: date,
            location: location,
            paymentMethod: paymentMethod,
        });

        displayExpenses();
        clearForm();
        alert('Expense added successfully!');
    } 
    else {
        alert('Please fill in all required fields and enter a valid amount.');
    }
}

function deleteExpense() {
    const selectedListItems = document.querySelectorAll('#expenses li.selected');
    if (selectedListItems.length > 0) {
        const selectedIndices = [];
        selectedListItems.forEach((listItem) => {
            const index = parseInt(listItem.getAttribute('data-index'), 10);
            if (!isNaN(index) && index >= 0 && index < expenses.length) {
                selectedIndices.push(index);
            }
        });

        selectedIndices.sort((a, b) => b - a);

        selectedIndices.forEach((index) => {
            expenses.splice(index, 1);
        });

        selectedListItems.forEach((listItem) => {
            listItem.classList.remove('selected');
        });

        displayExpenses();
    }
}

function handleDeselectOutsideClick(event) {
    const selectedItems = document.querySelectorAll('#expenses li.selected');
    if (selectedItems.length > 0) {
        const clickedItem = event.target;
        const isOutsideSelectedItems = Array.from(selectedItems).every((item) => !item.contains(clickedItem));
        if (isOutsideSelectedItems) {
            selectedItems.forEach((item) => {
                item.classList.remove('selected');
            });
        }
    }
}

document.addEventListener('click', handleDeselectOutsideClick);

function toggleExpenseSelection(event) {
    const listItem = event.target;
    if (listItem.tagName === 'LI') {
        if (!listItem.classList.contains('selected')) {
            listItem.classList.add('selected');
        }
    }
}

document.getElementById('expense-entry-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addExpense();
});

document.getElementById('clear-button').addEventListener('click', () => {
    clearForm();
});

document.getElementById('delete-button').addEventListener('click', () => {
    deleteExpense();
});

document.getElementById('expenses').addEventListener('click', toggleExpenseSelection);

displayExpenses();

function clearForm() {
    document.getElementById('category').value = '';
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';
    document.getElementById('location').value = '';
    document.getElementById('payment-method').value = '';
}
