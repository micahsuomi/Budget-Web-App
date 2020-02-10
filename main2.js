const loadDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let currentMonth = months[month];
  
    let currentYear = date.getFullYear();
    let currentHour = date.getHours();
    let currentMinutes = date.getMinutes();
    let currentSeconds = date.getSeconds();
    let fullDate = `${day} ${currentMonth} ${currentYear} ${currentHour}:${currentMinutes}:${currentSeconds}`;
    return fullDate

}

     personAccount = {
            firstName: "Jon",
            lastName: "Doe",
            income: [{
                description: 'Salary',
                amount: 4000,
                date: loadDate()
            },
            {
                description: 'Bonus',
                amount: 200,
                date: loadDate()

            },
            {
                description: 'Stocks',
                amount: 300,
                date: loadDate()

            },
        ],
        expenses: [{
                description: 'Mortgage',
                amount: 700,
                date: loadDate()

            },
            {
                description: 'Transport',
                amount: 100,
                date: loadDate()

            },
            {
                description: 'Daycare',
                amount: 165,
                date: loadDate()

            }
        ],

            addIncome: function() {
            let income = personAccount.income;
           
            income.push({description: descriptionInput.value,
                amount: parseInt(amountInput.value), date: loadDate()});        
    
               },

            addExpense: function() {
                let expenses = personAccount.expenses;
    
                expenses.push({description: descriptionInput.value,
                    amount: parseInt(amountInput.value), date: loadDate()});
                          
     
                 },

            totalIncome: function() {
                let count = 0;
                
                for (const person in personAccount.income) {
                    let income = personAccount.income[person];
                        let {amount} = income;
                        count += amount;
                }
                return count;     
           
            },

            totalExpenses: function() {
                let count = 0;

                for(const person in personAccount.expenses) {
                    let expense = personAccount.expenses[person];
                        let {amount} = expense;
                        count += amount
          
                }
                return count;


            },

            removeIncome: function(item, index) {
                let income = personAccount.income;
                index = income.indexOf(item);
                if (index !== -1) {
                    income.splice(index, 1);
            
                }
        
                
            },

            removeExpense: function(item, index) {
                let expenses = personAccount.expenses;
                index = expenses.indexOf(item);
                if (index !== -1) {
                    expenses.splice(index, 1);
                    
            
                }
                
            },

            accountBalance: function() {
                let totalExpenses = this.totalIncome();
                let totalIncome = this.totalExpenses();
                let accountBalance = totalExpenses -  totalIncome;
                return accountBalance;

            },  
            
            expensesToIncome: function() {
                let totalIncome = this.totalIncome();
                let totalExpenses = this.totalExpenses();
                let percentage = Math.floor(totalExpenses / totalIncome * 100);
                return percentage;
            }
          
            }
     

         
    const accountBalance = document.querySelector('.account-balance');
    const accountName = document.querySelector('.account-name');
    const dateParagraph = document.querySelector('.date-paragraph');
    const currentDate = document.querySelector('.current-date');

    const form = document.querySelector('.form');
    const descriptionInput = document.querySelector('.type');
    const amountInput = document.querySelector('.amount');
    const selectionInput = document.querySelector('.income-expenses-selection');
    const addIncomeExpenseBtn = document.querySelector('.btn-add');

    const input = document.querySelectorAll('input');
    const incomeWrapper = document.querySelector('.income-wrapper');
    const expensesWrapper = document.querySelector('.expenses-wrapper');

    const warning = document.querySelector('.warning');

    const totalIncome = document.querySelector('.total-income');
    const totalExpenses = document.querySelector('.total-expenses');
    const incomeToExpensesPercentage = document.querySelector('.expenses-to-balance__percentage');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });



    totalIncome.setAttribute('class', 'total-income');

    const calculatePercentage = () => accountBalance / totalExpenses * 100;
    
    const i = setInterval(() => {

        let currentTime =  loadDate(); 
        currentDate.textContent = currentTime;
    
    }, 1000);



    currentDate.setAttribute('class', 'date');
    dateParagraph.append(currentDate);

    warning.setAttribute('class', 'warning');

    selectionInput.addEventListener('focus', () => {
        console.log('testing')
        if(selectionInput.value === 'income') {
            selectionInput.style.outline = '2px solid rgb(85, 165, 197)';
            descriptionInput.style.outline = '2px solid rgb(85, 165, 197)';
            amountInput.style.outline = '2px solid rgb(85, 165, 197)';



            console.log(selectionInput.value)

        } else if(selectionInput.value === 'expense') {
            selectionInput.style.outline = '2px solid rgb(187, 47, 66)';
            descriptionInput.style.outline = '2px solid rgb(187, 47, 66)';
            amountInput.style.outline = '2px solid rgb(187, 47, 66)';
            addIncomeExpenseBtn.style.backgroundColor = 'rgb(187, 47, 66)';
            addIncomeExpenseBtn.classList.add('expense-btn');
            console.log(selectionInput.value)


        }
    })

    addIncomeExpenseBtn.addEventListener('click', validateInput = () => {

        let strMatch = /^[A-Zaz]+$/ig
        let numMatch = /^[0-9]+$/
        if(descriptionInput.value.length === 0 || amountInput.value.length === 0)
        { 
            warning.textContent = 'Please fill all input values'

        } else if(!descriptionInput.value.match(strMatch) || !amountInput.value.match(numMatch)) {
            warning.textContent = 'Please input correct values'

        } else {
            checkInputValue();
        }

 })

    addIncomeExpenseBtn.addEventListener('click', checkInputValue = () => {

        if(selectionInput.value === 'income') {
            selectionInput.style.outline = '2px solid rgb(85, 165, 197)';
            personAccount.addIncome();

        } else if(selectionInput.value === 'expense') {
            personAccount.addExpense();
            selectionInput.style.outline = '2px solid rgb(187, 47, 66)';

        }
        displayAccount();
        form.reset();  

    })


    const displayName = () => {
       
            accountName.textContent = `${personAccount.firstName} ${personAccount.lastName}`; 
             
        
    }

    const displayAccount = () => {
        incomeWrapper.textContent = '';
        expensesWrapper.textContent = '';
        let incomeContent = '';
        let expensesContent = '';

        // let expensesContent = '';
        
        for(const person in personAccount.income) {
            let income = personAccount.income[person];
            let {description, amount, date} = income
        
            incomeContent += 
                    `<div class="income-expenses-div income-div">
                    <p>${description}</p>
                    <p class="income">€${amount}</p>
                    <p>${date}</p>
                    <div class="deleteBtnContainer">
                    <i class="fas fa-trash" onclick="removeIncomeUI()"></i>
                    </div>
                    </div>`
            incomeWrapper.innerHTML = incomeContent;
            
           /*
            let incomeDiv = document.createElement('div');
            let incomeType = document.createElement('p');
            let incomeAmount = document.createElement('p');
            let timeRecorded = document.createElement('p');
            let deleteBtnContainer = document.createElement('div');
            let deleteBtn = document.createElement('i');

            
            incomeDiv.setAttribute('class', 'income-expenses-div income-div');
            deleteBtnContainer.setAttribute('class', 'deleteBtnContainer');
            deleteBtn.setAttribute('class', 'fas fa-trash');
            incomeType.textContent = description;
            incomeAmount.textContent = `€${amount}`;
            incomeAmount.setAttribute('class', 'income');
            timeRecorded.textContent = date;

            deleteBtnContainer.append(deleteBtn);
            incomeDiv.append(incomeType, incomeAmount, timeRecorded, deleteBtnContainer);
            incomeWrapper.append(incomeDiv);*/
    
            
            totalIncome.textContent = personAccount.totalIncome();
            incomeToExpensesPercentage.textContent = `${personAccount.expensesToIncome()}%`;
            // const deleteBtn = document.querySelector('.fa-times-circle');

             removeIncomeUI = () => {
                personAccount.removeIncome(income);
                displayAccount();
            
            }
           
        }
             for(const person in personAccount.expenses) {
                let expenses = personAccount.expenses[person]; 
                    let {description, amount, date} = expenses;
                    /*
                    expensesContent += 
                    `<div class="income-expenses-div expenses-div">
                    <p>${description}</p>
                    <p class="income">€${amount}</p>
                    <p>${date}</p>
                    <div class="deleteBtnContainer">
                    <i class="fas fa-trash" onclick="removeExpenseUI()></i>
                    </div>
                    </div>`

                    expensesWrapper.innerHTML = expensesContent;*/

    
                    
                    let expensesDiv = document.createElement('div');
                    let expensesType = document.createElement('p');
                    let expensesAmount = document.createElement('p');
                    let timeRecorded = document.createElement('p');
                    let deleteBtnContainer = document.createElement('div');
                    let deleteBtn = document.createElement('i');

                    expensesDiv.setAttribute('class', 'income-expenses-div expenses-div');
                    expensesType.textContent = description;
                    expensesAmount.textContent = `€${amount}`;
                    expensesAmount.setAttribute('class', 'expense');
                    timeRecorded.textContent = date;
                    deleteBtnContainer.setAttribute('class', 'deleteBtnContainer');
                    deleteBtn.setAttribute('class', 'fas fa-trash');

                    deleteBtnContainer.append(deleteBtn);
                    expensesDiv.append(expensesType, expensesAmount, timeRecorded, deleteBtnContainer);
                    expensesWrapper.append(expensesDiv);

                    totalExpenses.textContent = personAccount.totalExpenses();
                    
                    // deleteBtn = document.querySelector('.fa-trash');
                    deleteBtn.addEventListener('click', removeExpenseUI = () => {

                        personAccount.removeExpense(expenses);
                        displayAccount();

                    });
     

            }  
            accountBalance.textContent = personAccount.accountBalance();


            
        }

     

    

    //put this in the same function
    /*
    const removeIncome = (item, index) => {
        let income = personAccount.income;
        index = income.indexOf(item);
        if (index !== -1) {
            income.splice(index, 1);
    
        }

        displayAccount()
        
    }*/

    /*
    const removeExpense = (item, index) => {
        console.log('inside remove')
        let expenses = personAccount.expenses;
        index = expenses.indexOf(item);
        if (index !== -1) {
            expenses.splice(index, 1);
            
    
        }
        displayAccount()
        
    }*/

    
    
    const personAccountJson = JSON.stringify(personAccount);
    localStorage.setItem('personAccount', personAccountJson);

    const testAccountJson = JSON.parse(localStorage.getItem('personAccount'));
    console.log(testAccountJson)
    displayName();
    displayAccount();

   


            

            
           
    


            