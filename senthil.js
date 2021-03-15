'strict mode';
const account1 = {
  owner: 'Senthil Nathan',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2021-03-08T14:11:59.604Z',
    '2021-03-11T17:01:17.194Z',
    '2021-03-12T23:36:17.929Z',
    '2021-03-13T10:51:36.790Z',
  ],
};

const account2 = {
  owner: 'Sathappan',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account3 = {
  owner: 'Gautham Vijay',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2020-11-30T09:48:16.867Z',
    '2020-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-11-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-12-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
};

const account4 = {
  owner: 'Aditi Karthick',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2020-03-01T13:15:33.035Z',
    '2019-02-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-01-05T16:33:06.386Z',
  ],
};

const accounts = [account1, account2, account3, account4];
//outside elements of movements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelIn = document.querySelector('.summary__value--in');
const labelOut = document.querySelector('.summary__value--out');
const labelInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
//containers:we have two containers one is app and other one is movements.
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
//buttons
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
//User inputs
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTrasferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//formating dates for movementsDates  NOTE:this function is called within the displayMovements function for calculating movementsDates
const calcDatePassed = function (date) {
  //calculating the differnce between movementsdate & current date(date2 - date1) for how many dates passed
  const datePassed = function (date1, date2) {
    //we can use either math.round or math.trunc for avoiding the decimal points.math.abs for avoiding the negative sign.NOTE while calculating between dates it will automattically converted into timestamp(milliseconds) and then only it started to calculate between dates EX:(3254855421 - 21276984428)
    return Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  };
  //calling the above datePassed function
  const dateAgo = datePassed(new Date(), date);

  if (dateAgo === 0) return 'Today';
  if (dateAgo === 1) return 'Yesterday';
  if (dateAgo <= 7) return `${dateAgo} days ago`;
  else {
    //creating a movements dates for above 7 days
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();
    return ` ${day}/${month}/${year}`;
  }
};
//displaying deposit and withdrawal movements
const displayMovements = function (acc, sort = false) {
  //containerMovements.innerHTML is used for set the exisisting movements class html code become empty("")
  containerMovements.innerHTML = '';
  //sort method is used for sorting the element in ascending(a-b) or descending(b-a) order.it can able to mutate the orginal element.so that because we are using slice method to create a new array and sorting
  const mov = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  mov.forEach(function (mov, i) {
    //getting a movementsdates using movements index and using new Date to convert from string date to normal date EX:'2021-03-13T10:51:36.790Z' --->                 for calculating the difference and get day,month,year in calcDatePassed function
    const dateString = new Date(acc.movementsDates[i]);
    //calling calcDatePassed function with date parameter for calculating movementsDates
    const displayDate = calcDatePassed(dateString);
    //Checking whether deposit or withdrawal NOTE:toFixed() is used to cutoff after the decimal point by providing range Ex:.toFixed(2)135.7457899----->135.78
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov.toFixed(2)} Rupees</div>      
  </div>`;
    //containerMovements.insertAdjacentHTML is used for insert with posistion(afterbegin) and inserting html code
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//calculating balance
const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)} Rupees`;
};

//calculating summary deposit,withdraw and interest
const displaySummary = function (acc) {
  //deposit
  const deposit = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelIn.textContent = `${deposit.toFixed(2)} Rupees`;
  //withdraw
  const withdraw = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelOut.textContent = `${Math.abs(withdraw.toFixed(2))} Rupees`;
  //interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(function (mov, i, arr) {
      console.log('deposit:' + arr);
      return (mov * acc.interestRate) / 100;
    })
    .filter(function (mov, i, arr) {
      console.log('interest:' + arr);
      return mov >= 1;
    })
    .reduce(function (acc, mov, i, arr) {
      console.log('Greater than 1 deposited interest:' + arr);
      return acc + mov;
    }, 0);
  labelInterest.textContent = `${interest.toFixed(2)} Rupees`;
};

//creating username
const userName = function (account) {
  account.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
userName(accounts);
console.log(accounts);
//timefunction is basically used to startout the timer for particullar period if the currentaccount is inactive then the currentaccount automatically logged out.This function is also called in transfer and loan for reset timer because the currentaccount is active.
const timeFunction = function () {
  //timeinterval function is called within this function before we give this function to setinterval callback function because the starting one sec delay is avoided by doing this(ex:10:00 in starting then-->05:00 05:59 05:58 05:57 and so on..decreasing.This one is avoided(10:00 in starting)).
  const timeInterval = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
    }
    //decreasing time
    time--;
  };
  //5 minutes in seconds
  let time = 300;
  //timeInterval function is calling
  timeInterval();
  //setInterval callback function is executing NOTE:setInterval function will execute continuously till we use clearInterval  NOTE:setInterval and setTimeout function can able to execute without calling after the milliseconds completed
  const timer = setInterval(timeInterval, 1000);
  return timer;
};

//creating action for login button
let currentAccount, timerExist;
btnLogin.addEventListener('click', function (e) {
  //preventing auto reload from login button.Because in html form button element set as default reload when it clicked
  e.preventDefault();
  console.log('login');
  //creating a logic for every individual account to enter into their own account by using own username and pin
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  //here we are using optional chaing (?) for avoid errors when user putting wrong username
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('login');
    // display UI
    containerApp.style.opacity = 100;
    // display message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    //clearing input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    //bluring the cursor blynking in pin field
    inputLoginPin.blur();
    //current account current login date,month,year,hours and minutes
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = ` ${day}/${month}/${year},${hours}:${minutes}`;
    //Case 1 :if we want to login into another acount from current account the timer overlap will be happen because in current account the timer is already running because we first login into the currentaccount then only we moving to another account by logging in from currentaccount.so that because IF block is used here to avoid the overlap between the timers by clearing the timers by clearInterval and reset a timer in another(new logged in account) by calling the timefunction.
    //Case 2:if we first logged into one account then the if part will be neglected because timerExist undefiend in starting then the timeFunction will be called then the timeExist will be defined.
    if (timerExist) clearInterval(timerExist);
    //calling timer function
    timerExist = timeFunction();
    //Update UI
    //balance
    displayBalance(currentAccount);
    //movements
    displayMovements(currentAccount);
    //summary
    displaySummary(currentAccount);
  }
});

//creating transfer event
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTrasferAmount.value);
  const recieveracc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, recieveracc);
  //clearing input fields
  inputTransferTo.value = inputTrasferAmount.value = '';
  //checking whether the transfer amount greater than 0,current balance is greater than or equal to amount we will going to send,recieveracc obj(acc) exist or not,can't able to send data to himself
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    recieveracc &&
    recieveracc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    recieveracc.movements.push(amount);
    //creating current withdrawal date on current account while transfer and current deposit date on reciever account
    currentAccount.movementsDates.push(new Date().toISOString());
    recieveracc.movementsDates.push(new Date().toISOString());
    //reset timer
    if (timerExist) clearInterval(timerExist);
    timerExist = timeFunction();
    //Update UI
    //balance
    displayBalance(currentAccount);
    //movements
    displayMovements(currentAccount);
    //summary
    displaySummary(currentAccount);
  }
});

//creating loan event
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //getting the loan amount from UI    NOTE: we can use either math.truc or math.floor both are same.
  const amount = Math.trunc(inputLoanAmount.value);
  //checking whether the loan amount is positive number or not and using "some" array method to check the loan amount will be a 10% of any deposit//some method return boolean
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    //setting 5 second delay to credit loan amount using timeout function NOTE:setTimeout will be execute only once after the provided millisecond happend.
    setTimeout(function () {
      //loan amount deposited
      currentAccount.movements.push(amount);
      //created current deposit date while getting loan
      currentAccount.movementsDates.push(new Date().toISOString());
      //reset timer
      if (timerExist) clearInterval(timerExist);
      timerExist = timeFunction();
      //update UI
      //balance
      displayBalance(currentAccount);
      //movements
      displayMovements(currentAccount);
      //summary
      displaySummary(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';
});

//creating close account event
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //checking whether the userid and pin is correct or not
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    //findIndex method is used to get the index for delete in splice method
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username //inputCloseUsername.value (Both are same so we can use either one of this)
    );
    //delete account
    accounts.splice(index, 1);
    //hide UI
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Log in to get started';
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//creating action for sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  //calling displaymovements function with two arguments such as currentaccount and NoT sorted variable value
  displayMovements(currentAccount, !sorted);
  //storing sorted value EX:let sorted = true(!false)
  sorted = !sorted;
});
