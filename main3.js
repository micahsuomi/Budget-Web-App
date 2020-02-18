
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
                let description = descriptionInput.value;
                let amount = amountInput.value;
                income.push({description: description,
                amount: parseInt(amount), date: loadDate()}); 
                
    
               },
        
            addExpense: function() {
                let expenses = personAccount.expenses;
                let description = descriptionInput.value;
                let amount = amountInput.value;
                expenses.push({description: description,
                amount: parseInt(amount), date: loadDate()});
              
                                  
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
            
            const clearBtnWrapper = document.querySelector('.clear-local-storage__btn-wrapper');

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
        
            selectionInput.addEventListener('change', () => {
        
                if(selectionInput.value === 'income') {
                    selectionInput.style.outline = '2px solid rgb(85, 165, 197)';
                    descriptionInput.style.outline = '2px solid rgb(85, 165, 197)';
                    amountInput.style.outline = '2px solid rgb(85, 165, 197)';
                    addIncomeExpenseBtn.classList.add('income-btn');
                    addIncomeExpenseBtn.classList.remove('expense-btn');
        
                } else if(selectionInput.value === 'expense') {
                    selectionInput.style.outline = '2px solid rgb(250, 71, 101)';
                    descriptionInput.style.outline = '2px solid rgb(250, 71, 101)';
                    amountInput.style.outline = '2px solid rgb(250, 71, 101)';
                    addIncomeExpenseBtn.classList.add('expense-btn');
                    addIncomeExpenseBtn.classList.remove('income-btn');
        
        
        
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
                let description = descriptionInput.value;
                let amount = parseInt(amountInput.value);
                let date = loadDate();

                if(selectionInput.value === 'income') {
                    selectionInput.style.outline = '2px solid rgb(85, 165, 197)';
                    
                    let getAccount = JSON.parse(localStorage.getItem('personAccountJson'));
                    console.log(getAccount)
                    getAccount.income.push({description, amount, date});
                    personAccount.income = getAccount.income;

                    localStorage.setItem('personAccountJson', JSON.stringify(personAccount));
                    personAccount.addIncome(getJsonAccount);
                    
        
                } else if(selectionInput.value === 'expense') {
                    selectionInput.style.outline = '2px solid rgb(187, 47, 66)';

                    let getAccount = JSON.parse(localStorage.getItem('personAccountJson'));
                    getAccount.expenses.push({description, amount, date});
                    personAccount.expenses = getAccount.expenses;

                    localStorage.setItem('personAccountJson',JSON.stringify(personAccount));
                    personAccount.addExpense(getJsonAccount);

        
                }
                displayAccount();
                location.reload();  
        
            })
        
           
        
            const displayName = () => {
               
                    accountName.textContent = `${personAccount.firstName} ${personAccount.lastName}`; 
                     
                
            }
        
            const displayAccount = () => {
                incomeWrapper.textContent = '';
                expensesWrapper.textContent = '';
                let incomeContent = '';
                let expensesContent = '';
                totalIncome.textContent = personAccount.totalIncome();
                incomeToExpensesPercentage.textContent = `${personAccount.expensesToIncome()}%`;
                totalExpenses.textContent = personAccount.totalExpenses();
                            
        
                // let expensesContent = '';
                
                for(const person in personAccount.income) {
                    let income = personAccount.income[person];
                    let {description, amount, date} = income
                
                
                    incomeContent += 
                            `<div class="income-expenses-div income-div">
                            <p>${description}</p>
                            <p class="income">€${amount}</p>
                            <p>${date}</p>
                            </div>`
                            
                    incomeWrapper.innerHTML = incomeContent;
                   
                }
                     for(const person in personAccount.expenses) {
                        let expenses = personAccount.expenses[person]; 
                            let {description, amount, date} = expenses;
                            
                            expensesContent += 
                            `<div class="income-expenses-div expenses-div">
                            <p>${description}</p>
                            <p class="income">€${amount}</p>
                            <p>${date}</p>
                            </div>`
        
                            expensesWrapper.innerHTML = expensesContent;
        
                    }  

                    accountBalance.textContent = personAccount.accountBalance();
                    
                }
        
             
                
                //setting personAccount to local storage
                //in order to be stored in local storage, it should be converted into a string
                /*const accountJson = JSON.stringify(personAccount);
                //setting the objct to local storage
                localStorage.setItem('personAccountJson2', accountJson);
                //console.log(accountJson) //the object is in string version now
                localStorage.getItem('personAccountJson2');
                let personAccountJson = JSON.parse(localStorage.getItem('personAccountJson2'));
                localStorage.setItem('personAccountJson2', personAccountJson);
                console.log('json', personAccountJson);
                console.log(localStorage)*/
                //once the local storate is set, it can be commented out


        //create a function to set added income and expenses to local storage

        //create a function to get the items from local storage 
        //crate a function to display the personAccount from local storage

        //the const getJsonAccount gets the items of personAccount local storage
        const getJsonAccount = JSON.parse(localStorage.getItem('personAccountJson'));
            
                if (!getJsonAccount) {
                    //if getJsonAccount is not null, the local storage will set the item to local storage, stringyig the personaccount to do so
                    localStorage.setItem('personAccountJson', JSON.stringify(personAccount));
                    
                    //the account will be displayed
                    displayAccount(getJsonAccount);
                    
                } else {

                    //if it's null, the json account will start as an empty object get the items from the local storage 
                    const getJsonAccount = JSON.parse(localStorage.getItem('personAccountJson'));
                    personAccount.income = getJsonAccount.income;
                    personAccount.expenses = getJsonAccount.expenses;
                    displayAccount(getJsonAccount);


                }

                // console.log('json', personAccountJson);
                
            
          
            displayName();
            // displayAccount();

        
     
                    
        
                    
                   
            
        
        
                    
     