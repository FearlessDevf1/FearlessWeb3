var acc1 = {
	owner: 'Dev Boss',
	movement: [200, -400, -400, 3000, 200, 100],
	interestRate: 1.2,
	pin: 1234
}

var acc2 = {
	owner: 'Fearless Web3',
	movement: [400, 600, 500, 5000, 600, -100],
	interestRate: 1.5,
	pin: 1111
}

var acc3 = {
	owner: 'Ivy Baby',
	movement: [200, 300, 1000, -2000, 300, 200],
	interestRate: 0.7,
	pin: 1111
}

var acc4 = {
	owner: 'Web3 Legend',
	movement: [400, 1000, 500, -2000, -200, 300],
	interestRate: 1,
	pin: 1111
}

var accounts = [acc1, acc2, acc3, acc4]

//////////////////////// TO SAVE IT IN THE LOCAL STORAGE ////////////////////////
function saveLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

////////////////////// LOAD LOGGED-IN USER FROM LOCAL STORAGE ////////////////////////
function loadLoggedInUser() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
        return JSON.parse(storedUser);
    }
    return null;
}

// for (var i = 0; i < accounts.length; i++) {
// 	const element = accounts[i].owner.split(" ").map(name => name[0]).join("").toLowerCase();
// 	console.log(element)
// }

//////////////////////// HEADER INPUTS \\\\\\\\\\\\\\\\\\\\\\\\\
const userName_Input = document.querySelector('.userName_Input');
const userInput = document.querySelector('.userInput');
const userName = document.querySelector('.userName');
const UserPin = document.querySelector('.UserPin');
const userSubmit = document.querySelector('.userSubmit');
const sign_inField = document.querySelector('#sign_inField');
const userLogout = document.querySelector('.userLogout');
const loginDetails = document.querySelector('.loginDetails');
const totalDeposit = document.querySelector('.totalDeposit');
const totalWithdraw = document.querySelector('.totalWithdraw');

///////////////////// BODY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const body = document.querySelector('#body');

///////////////////// TOTAL AMOUNT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const totalAmount = document.querySelector('.totalAmount');

//////////////////// TRANSACTION HIISTORY \\\\\\\\\\\\\\\\\\\\\\\\\\\\
const transctions = document.querySelector('.transctions');
const transctions2 = document.querySelector('.transctions2');


///////////////////// PAYMENT FILED \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const transTo = document.querySelector('.transTo');
const transAmount = document.querySelector('.transAmount');
const totalWithdrawAmount = document.querySelector('.totalWithdrawAmount');
const transSubmit = document.querySelector('.transSubmit');
const loanAmount = document.querySelector('.loanAmount');
const loanSubmit = document.querySelector('.loanSubmit');
const close_ConUser = document.querySelector('.close_ConUser');
const close_ConPIn = document.querySelector('.close_ConPIn');
const close_Submit = document.querySelector('.close_Submit');
const main = document.querySelector('#main')

var username;
var owner;
var usersPin;

////////////////////// LOAD LOGGED-IN USER IF AVAILABLE ////////////////////////
const loggedInUser = loadLoggedInUser();
if (loggedInUser) {
    owner = loggedInUser;
    username = owner.owner;
    body.style.display = "block";
    loginDetails.style.display = "none";
    sign_inField.style.height = "80px";
    userLogout.style.display = "block";
    userName.style.display = "block";
    totalAmount.innerHTML = "&#8358;" + currentBal(owner);
    userName.innerHTML = 'welcome back ' + username;
    trnasHistory(owner.movement);
    widthrawBal_DepositBal(owner);
}

////////////////////////// LOGIN DETAILS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////// FUNCTION HOLDING ALL ACCOUNTS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function users() {
	return accounts
}

////////////////// TO FIND USERS \\\\\\\\\\\\\\\\\\\\\\\\\
function getAcc(username) {
	let user = users();
	var userN = user.find((users) => users.owner == username)
	return userN;
}


//////////////////// SHORTEN THE USER NAME \\\\\\\\\\\\\\\\\\\\\\\
function headerInput(user) {
	user.forEach((user) => {
		const username = user.owner.split(' ').map(name => name[0]).join("").toLowerCase();
		user.owner = username;
		console.log(username)
	})
}
headerInput(accounts)

////////////// TO SUBMIT LOGIN DETAILS \\\\\\\\\\\\\\\\\\\\\\\\
function login() {
	var ownerInput = getAcc(userName_Input.value);
	var userPin = Number(UserPin.value);
console.log(ownerInput);
	// transAmount.value = ""
	// transTo.value = ""

	// Check if the entered PIN matches the owner's PIN
	if (ownerInput && userPin === ownerInput.pin) {
		owner = ownerInput;
		username = ownerInput.owner;
		saveLoggedInUser(owner);

		trnasHistory(ownerInput.movement);
		widthrawBal_DepositBal(ownerInput);
		// userName_Input.value = "";
		
		body.style.display = "block"
		loginDetails.style.display = "none"
		sign_inField.style.height = "80px"
		userLogout.style.display = "block"
		userName.style.display = "block"
		// UserPin.value = ""
		totalAmount.innerHTML = "&#8358;" + currentBal(ownerInput);
		userName.innerHTML = 'welcome back ' + username;
	} else {
		// Display an error message or take appropriate action
		alert("Incorrect PIN or USERNAME. Please try again.");
	}
}

function logout() {
	userLogout.style.display = "none"
	userName.style.display = "none"
	sign_inField.style.height = "100%"
	body.style.display = "none"
	loginDetails.style.display = "block"
	localStorage.removeItem('loggedInUser');
}
////////////////////////// END OF LOGIN DETAILS \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

////////////////////////// HIDDEN HISTROY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function history_pop() {
	y=document.querySelector(".secondHistroy").style.display='block';
	y=document.querySelector(".totalTransactions").style.display='block';
}
function history_close(){
	document.querySelector(".secondHistroy").style.display='none';
	document.querySelector(".totalTransactions").style.display='none';
}

////////////////// WITHDRAW BALANCE AND DEPOSIT BALANCE \\\\\\\\\\\\\\\\\\\\\\\\\
function widthrawBal_DepositBal(mov) {
	const totalWithdrawBal = mov.movement.filter((num) => num < 0);
	var calWithdrawBal = totalWithdrawBal.reduce((x, y) => x + y, 0)

	const totalDepositBal = mov.movement.filter((num) => num > 0)
	var calDepositBal = totalDepositBal.reduce((x, y) => x + y, 0)

	console.log(totalWithdrawBal)
	console.log(totalDepositBal);
	totalDeposit.innerHTML = `<h2 style="margin-right:10px">total deposit amount</h2>` +
		`<h2><b>&#8358;${calDepositBal}</b></h2>`

	totalWithdraw.innerHTML = `<h2 style="margin-right:10px">total withdraw amount</h2>` +
		`<h2><b>&#8358;${calWithdrawBal}</b></h2>`
}

//////////////// TO CALCULATE A BALANCE OF A USER \\\\\\\\\\\\\\\
function currentBal(mov) {
	const totalBal = mov.movement.reduce((a, b) => a + b, 0);
	return totalBal > 1 ? totalBal : 0;
}

///////////////// PAYMENT SIDE \\\\\\\\\\\\\\\\\\\\\\\\\\\\
transSubmit.addEventListener('click', () => {
	//transfer side
	let convertedTranferAmount = Number(transAmount.value)
	const transToUsername = getAcc(transTo.value);
	
	if (transTo.innerHTML==userName) {
		
	} else {
		alert('Username Unavailable')
	}

	if (convertedTranferAmount <= currentBal(owner)) {
		transToUsername.movement.push(convertedTranferAmount);

		//widthraw side
		owner.movement.push(-convertedTranferAmount)
		totalAmount.innerHTML = '&#8358;' + currentBal(owner)
		
		saveLoggedInUser(owner)
		trnasHistory(owner.movement)
		widthrawBal_DepositBal(owner)

		console.log(transToUsername.movement);
		transTo.value = "";
		transAmount.value = "";
	} else {
		alert('Insulficient Balance')
		totalAmount.innerHTML = '&#8358;' + currentBal(owner)
	}
})

////////////////////// REQUEST LOAN ////////////////////
loanSubmit.addEventListener('click', () => {
	let convertedLoanAmount = Number(loanAmount.value)
	owner.movement.push(convertedLoanAmount)

	trnasHistory(owner.movement)
	widthrawBal_DepositBal(owner)
	saveLoggedInUser(owner)
	currentBal(owner)

	totalAmount.innerHTML = '&#8358;' + currentBal(owner)
	loanAmount.value = ""
})

console.log(Math.floor(Math.random() * 100000000000000000000));

///////////////////////// HISTORY \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//transaction history
function trnasHistory(mov) {
	transctions.innerHTML = '';
	transctions2.innerHTML='';
	mov.forEach((movs, i) => {
		const type = movs > 0 ? 'deposit &#8681' : 'withdraw &#8679';
		const html = `<div id='inAndOut'><button class='transBtn ${type}'>${i + 1} ${type}</button>
		<p style="float: right; font-size:20px; margin-top:10px;"> &#8358;${movs}</p>
		</div>`
		transctions.insertAdjacentHTML('afterbegin', html)
		transctions2.insertAdjacentHTML('afterbegin', html)
		// console.log(type, i)
	})
	// console.log(transctions)
}
//  trnasHistory(acc1.movement);

////////////////////////////// BAR \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function showOverflow() {
	let nav = document.getElementById("nav-overflow");
	nav.classList.add("active");
}
function hideOverflow() {
	let nav = document.getElementById("nav-overflow");
	nav.classList.remove("active")
}
//////////////////////////////////////////////////////////////////