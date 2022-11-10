const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');
const container = document.querySelector(".container");
let updateCheck = false;
let currentexpense = {};
form?.addEventListener('submit', onSubmit);

document.addEventListener('DOMContentLoaded', async () => {

    //GET expenses from crudcrud and populate the expenses display
    try {
        let res = await axios.get('https://crudcrud.com/api/f852f8595d514154bd4b3c99614194ba/expenses')

        for (let expense of res.data) {
            displayExpenses(expense);
        }
    }
    catch (err) { console.log(err) };
});


//add new expenses
async function onSubmit(e) {

    e.preventDefault();
    const amt = document.querySelector('#amount');
    const desc = document.querySelector('#desc');
    const category = document.querySelector('#category')

    if (amt.value === '' || desc.value === '') {
        msg.classList.add('bg-danger')
        msg.classList.add('text-light')
        msg.innerHTML = 'Please enter values in all fields.'
        setTimeout(() => msg.remove(), 3000);
    }
    else {
        let expense = {
            amt: amt.value,
            desc: desc.value,
            category: `|${category.value}|`
        }

        if (!updateCheck) {
            //POST expenses to crudcrud
            try {
                let res = await axios.post('https://crudcrud.com/api/f852f8595d514154bd4b3c99614194ba/expenses', expense)
                displayExpenses(res.data)
            }
            catch (err) { console.log(err) };
        }
        else {
            //update expenses if edit event is triggered
            try {
                let res = await axios.put(`https://crudcrud.com/api/f852f8595d514154bd4b3c99614194ba/expenses/${currentexpense._id}`, expense)
                displayExpenses(expense);
            }
            catch (err) { console.log(err) };
            currentexpense = {};
            updateCheck = false;
        }
        amt.value = '';
        desc.value = '';
    }

}



//display existing expenses   
function displayExpenses(expense) {


    let amt = document.querySelector('#amount');
    let desc = document.querySelector('#desc');
    let category = document.querySelector('#category')

    let newDiv = document.createElement('div');
    newDiv.className = 'list-group-item m-auto bg-dark text-light w-75';
    newDiv.setAttribute('id', expense._id);

    let editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-primary mr-2 float-right';
    editBtn.textContent = 'Edit'
    editBtn.addEventListener('click', (e) => {

        //remove contents from display
        let delDiv = document.getElementById(expense._id);
        delDiv.innerHTML = '';
        delDiv.style.display = 'none';

        //populate expense fields
        amt.value = expense.amt;
        desc.value = expense.desc;
        category.value = expense.category;

        //edit expenses details after submit
        updateCheck = true;
        currentexpense = expense;

    })

    let delBtn = document.createElement('button');
    delBtn.textContent = 'X'
    delBtn.className = 'btn btn-sm btn-danger float-right';

    delBtn.addEventListener('click', async (e) => {

        //delete expenses
        try {
            let res = await axios.delete(`https://crudcrud.com/api/f852f8595d514154bd4b3c99614194ba/expenses/${expense._id}`)

            let delDiv = document.getElementById(expense._id);
            delDiv.innerHTML = '';
            delDiv.style.display = 'none';

        }
        catch (err) { console.log(err) }
    })

    let data = document.createTextNode(expense.amt + ": " + expense.desc + expense.category);
    newDiv.appendChild(data);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(editBtn);

    container.appendChild(newDiv);
}



