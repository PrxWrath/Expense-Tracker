const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');
const container = document.querySelector(".container");
let expenseCount = 0;
form?.addEventListener('submit', onSubmit);

//display users in local storage when document is loaded
document.addEventListener('DOMContentLoaded', displayExpenses(0));

function onSubmit(e){

    e.preventDefault();    
    const amt = document.querySelector('#amount');
    const desc = document.querySelector('#desc');
    const category = document.querySelector('#category')
   
    if(amt.value==='' || desc.value===''){
        msg.classList.add('bg-danger')
        msg.classList.add('text-light')
        msg.innerHTML='Please enter values in all fields.'
        setTimeout(()=>msg.remove(),3000);
    }
    else{
        expenseCount++;
        
        let expense = {
            id: expenseCount,
            amt: amt.value,
            desc: desc.value,
            category: `|${category.value}|`
        }
        
        let expenseJSON = JSON.stringify(expense);
        localStorage.setItem(`Expense${expense.id}`, expenseJSON);
        amt.value = '';
        desc.value = '';
    }
    displayExpenses(localStorage.length-1) //display the recently added user  
}


    
function displayExpenses(k){

    for(let i=k; i<localStorage.length; i++){

        let amt = document.querySelector('#amount');
        let desc = document.querySelector('#desc');
        let category = document.querySelector('#category')
        let expense = JSON.parse(localStorage.getItem(localStorage.key(i)));
            
            //create a new list item to show expense
            let newDiv = document.createElement('div');
            newDiv.className = 'list-group-item m-auto bg-dark text-light w-75';
            let data = document.createTextNode(expense.amt+": "+expense.desc+" "+expense.category);
            
            let editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-primary mr-2 float-right';
            editBtn.textContent = 'Edit Expense'
            editBtn.addEventListener('click', (e)=>{
                amt.value = expense.amt;
                desc.value = expense.desc;
                ewDiv.remove();
                localStorage.removeItem(`Expense${expense.id}`)
                
                expenseCount>=0?expenseCount--:expenseCount=0;
            })

            let delBtn = document.createElement('button');
            delBtn.textContent = 'Delete Expense'
            delBtn.className = 'btn btn-sm btn-danger ml-2 float-right';
            delBtn.addEventListener('click', (e)=>{
                newDiv.remove();
                localStorage.removeItem(`Expense${expense.id}`)
                
                expenseCount>=0?expenseCount--:expenseCount=0;
            })

            newDiv.appendChild(data);
            newDiv.appendChild(delBtn);
            newDiv.appendChild(editBtn);
            container.appendChild(newDiv);  

    }
} 



