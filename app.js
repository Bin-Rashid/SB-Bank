/*
const logInButton = document.querySelector('#loginBtn');
const loginArea = document.getElementById('login_section');
const loginForm = document.getElementById('loginForm');
const dashboard = document.querySelector('.dashboard_area');
const depositButton = document.querySelector('#depositBtn');
const withdrawButton = document.querySelector('#withdrawtBtn');
const depositInput = document.querySelector('#deposit');
const withdrawInput = document.querySelector('#withdraw');
const totalDepositElement = document.querySelector('.total-deposit');
const totalWithdrawElement = document.querySelector('.total-withdraw');
const totalBalanceElement = document.querySelector('.total-balance');

const envalid_Input = document.querySelector('#envalidInput');
const noBalence_Input = document.querySelector('#noBalenceInput');

// Initial values
let totalDeposit = 0;
let totalWithdraw = 0;
let totalBalance = 1300; // Initial balance set to $1300

// Login section
logInButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents form submission
    loginArea.classList.add('hideDisplay') // Hides the login section
    dashboard.style.display = 'block' // Hides the login section
});


// Deposit amount adding on deposit card
depositButton.addEventListener('click', function(event){
    event.preventDefault();
    const depositAmmount = parseFloat(depositInput.value);
    if(!isNaN(depositAmmount) && depositAmmount > 0 ){
        totalDeposit += depositAmmount;
        totalBalance += depositAmmount;

        // Update the displayed amounts
        totalDepositElement.innerText = totalDeposit.toFixed(2);
        totalBalanceElement.innerText = totalBalance.toFixed(2);

        depositInput.value = " ";

    }else {
        envalid_Input.style.display = 'block'
    }
});

// Withdraw amount handling
withdrawButton.addEventListener('click', function(event){
    event.preventDefault();
    const withdrawAmmount = parseFloat(withdrawInput.value);

    if(!isNaN(withdrawAmmount) && withdrawAmmount > 0 && withdrawAmmount <= totalBalance){
        totalWithdraw += withdrawAmmount;
        totalBalance -= withdrawAmmount;

        totalWithdrawElement.innerText = totalWithdraw.toFixed(2);
        totalBalanceElement.innerText = totalBalance.toFixed(2);

        withdrawInput.value = "";

    }else if(withdrawAmmount > totalBalance){
        noBalence_Input.style.display = 'block'
    }else {
        envalid_Input.style.display = 'block'
    }

});*/

const logInButton = document.querySelector('#loginBtn');
const loginArea = document.getElementById('login_section');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const envalid_password = document.getElementById('invalidPassword');
const dashboard = document.querySelector('.dashboard_area');
const depositButton = document.querySelector('#depositBtn');
const withdrawButton = document.querySelector('#withdrawtBtn');
const depositInput = document.querySelector('#deposit');
const withdrawInput = document.querySelector('#withdraw');
const totalDepositElement = document.querySelector('.total-deposit');
const totalWithdrawElement = document.querySelector('.total-withdraw');
const totalBalanceElement = document.querySelector('.total-balance');

const envalid_Input = document.querySelector('#envalidInput');
const noBalence_Input = document.querySelector('#noBalenceInput');

// sample credenrials
const saveUsername = 'shaown';
const savePassword = 'local';

// function to check if the session is still valid?
function isSessionValid(){
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    if(loginTimestamp){
        const currentTime = Date.now();
        const sessionDuration = 5 * 60 * 1000; // 5 minustes in milliseconds
        return currentTime - loginTimestamp < sessionDuration;

    }
    return false;
}
// Check if the session is still valid on page load

if(isSessionValid()){
    handleLogin();
}
// Login section
logInButton.addEventListener('click' , function(event){
    event.preventDefault();
    
    const enteredUsername  = usernameInput.value;
    const enteredPassword = passwordInput.value;
    
    if(enteredUsername === saveUsername && enteredPassword === savePassword){
        handleLogin();
    }else{
        envalid_password.style.display = 'block';
    }
});
// Function to check session expiration every minute

setInterval(()=>{
    if(isSessionValid()){
        alert("Session expired. Please log in again.");
        localStorage.removeItem('loginTimestamp');
        location.reload();
    }
}, 60000);


// Function to handle login
function handleLogin(){
    loginArea.style.display = 'none';
    dashboard.style.display = 'block';
    localStorage.setItem('loginTimestamp', Date.now()); // Save the current timestamp in localStorage
}



// Load saved data from localStorage
let totalDeposit = parseFloat(localStorage.getItem('totalDeposit')) || 0;
let totalWithdraw = parseFloat(localStorage.getItem('totalWithdraw')) || 0;
let totalBalance = parseFloat(localStorage.getItem('totalBalance')) || 1300; // Initial balance set to $1300

// Update the displayed amounts with saved data
totalDepositElement.innerText = totalDeposit.toFixed(2);
totalWithdrawElement.innerText = totalWithdraw.toFixed(2);
totalBalanceElement.innerText = totalBalance.toFixed(2);

// Function to save data in localStorage
function saveData() {
    localStorage.setItem('totalDeposit', totalDeposit.toFixed(2));
    localStorage.setItem('totalWithdraw', totalWithdraw.toFixed(2));
    localStorage.setItem('totalBalance', totalBalance.toFixed(2));
}

// Deposit amount adding on deposit card
depositButton.addEventListener('click', function(event){
    event.preventDefault();
    const depositAmmount = parseFloat(depositInput.value);
    if(!isNaN(depositAmmount) && depositAmmount > 0 ){
        totalDeposit += depositAmmount;
        totalBalance += depositAmmount;

        // Update the displayed amounts
        totalDepositElement.innerText = totalDeposit.toFixed(2);
        totalBalanceElement.innerText = totalBalance.toFixed(2);

        // Save updated values to localStorage
        saveData();

        depositInput.value = "";

    }else {
        envalid_Input.style.display = 'block';
    }
});

// Withdraw amount handling
withdrawButton.addEventListener('click', function(event){
    event.preventDefault();
    const withdrawAmmount = parseFloat(withdrawInput.value);

    if(!isNaN(withdrawAmmount) && withdrawAmmount > 0 && withdrawAmmount <= totalBalance){
        totalWithdraw += withdrawAmmount;
        totalBalance -= withdrawAmmount;

        totalWithdrawElement.innerText = totalWithdraw.toFixed(2);
        totalBalanceElement.innerText = totalBalance.toFixed(2);

        // Save updated values to localStorage
        saveData();

        withdrawInput.value = "";

    }else if(withdrawAmmount > totalBalance){
        noBalence_Input.style.display = 'block';
    }else {
        envalid_Input.style.display = 'block';
    }

});
