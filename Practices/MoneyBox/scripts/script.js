let moneyBox = 50000; // atm machine money box
let cardDailyLimit = 20000;
let accountBalance = 50000;
let ACC_AND_PIN = {"ABCD":"7777", "EFGH":"7777", "IJKL":"7777"};
let ACC_AND_BALANCES = {
    "ABCDE": {"PIN": "7777", "CardDailyLimit": 20000, "AccountBalance": 40000},
    "FGHIJ": {"PIN": "7777", "CardDailyLimit": 20000, "AccountBalance": 50000},
    "KLMNO": {"PIN": "7777", "CardDailyLimit": 20000, "AccountBalance": 80000},
    "PQRST": {"PIN": "7777", "CardDailyLimit": 20000, "AccountBalance": 10000},
    "UVWXY": {"PIN": "7777", "CardDailyLimit": 20000, "AccountBalance": 15000}
};

const PIN_CODE = "7777";

function checkPinAndWithdraw() {    
    console.log("[Balances before] => CashInATMMachine=[%d], CardDailyLimit=[%d], AccountBalance=[%d]", moneyBox, cardDailyLimit, accountBalance);
    let result = "";
    let inputPin = undefined;
    let inputAmount = undefined;
    try {
        inputPin = document.getElementById("txtPin").value;
        inputAmount = document.getElementById("txtAmount").value;
        if(!inputPin) { //Check for undefined, null, empty
            throw "Please provide 4 digit PIN number";
        }
        if (!inputAmount) { //Check for undefined, null, empty
            throw "Please provide amount to withdraw";
        }

        //Negative condition testing to avoid nested if
        if(inputPin != PIN_CODE) {
            result = "PIN did not matched.";
        }
        else if (inputAmount % 500 != 0) {
            result = "Amount must be multiple of 500.";
        }
        else if (moneyBox < inputAmount) {
            result = "System is unable to disburse required amount.";
        }
        else if ((cardDailyLimit - inputAmount) < 0) {            
            result = "Daily withdrawal limit exceeded.";
        }
        else if ((accountBalance - inputAmount) < 0) {
            result = "Insufficient account balance. Try another amount.";
        }
        else { // At this point all checks are done
            cardDailyLimit -= inputAmount;
            accountBalance -= inputAmount;
            moneyBox -= inputAmount;
            result = "Transaction Successfull, please collect your money.";
            console.log("[Balances after] => CashInATMMachine=[%d], CardDailyLimit=[%d], AccountBalance=[%d]", moneyBox, cardDailyLimit, accountBalance);            
        }

    } catch(ex) {
        console.log(ex);
        result = ex;
    }
    document.getElementById("txtResult").value = result;
}
