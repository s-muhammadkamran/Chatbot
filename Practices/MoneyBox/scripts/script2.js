let moneyBox = 50000; // atm machine money box
let ACC_AND_BALANCES = {
    "ABCDE": {"PIN": "1234", "CardDailyLimit": 20000, "AccountBalance": 40000},
    "FGHIJ": {"PIN": "1234", "CardDailyLimit": 20000, "AccountBalance": 50000},
    "KLMNO": {"PIN": "1234", "CardDailyLimit": 20000, "AccountBalance": 80000},
    "PQRST": {"PIN": "1234", "CardDailyLimit": 20000, "AccountBalance": 10000},
    "UVWXY": {"PIN": "1234", "CardDailyLimit": 20000, "AccountBalance": 15000}
};

function checkPinAndWithdraw() {    
    let inputAccNo = "";
    let inputAccData = undefined;
    let result = balanceBefore = balanceAfter = "";
    let inputPin = undefined;
    let inputAmount = undefined;
    try {
        inputAccNo = document.getElementById("txtAccNo").value;
        inputPin = document.getElementById("txtPin").value;
        inputAmount = document.getElementById("txtAmount").value;
        inputAccData = ACC_AND_BALANCES[inputAccNo.trim().toLocaleUpperCase()];

        if(!inputAccNo) { //Check for undefined, null, empty
            throw "Please provide 5 Characters account number.";
        }         
        if (!inputAccData) {
            throw "Provided Acc no doesn't exists.";
        }
        if(!inputPin) { //Check for undefined, null, empty
            throw "Please provide 4 digit PIN number.";
        }
        if (!inputAmount) { //Check for undefined, null, empty
            throw "Please provide amount to withdraw.";
        }        

        //Negative condition testing to avoid nested if
        if(inputPin != inputAccData["PIN"]) {
            result = "PIN did not matched.";
        }
        else if (inputAmount % 500 != 0) {
            result = "Amount must be multiple of 500.";
        }
        else if (moneyBox < inputAmount) {
            result = "System is unable to disburse required amount.";
        }
        else if ((inputAccData["CardDailyLimit"] - inputAmount) < 0) {            
            result = "Daily withdrawal limit exceeded.";
        }
        else if ((inputAccData["AccountBalance"] - inputAmount) < 0) {
            result = "Insufficient account balance. Try another amount.";
        }
        else { // At this point all checks are done
            balanceBefore = `Before Tran: Moneybox=[${moneyBox}], Acc=[${inputAccNo}], RequestedAmount=[${inputAmount}], CardDailyLimit=[${inputAccData["CardDailyLimit"]}], AccountBalance[${inputAccData["AccountBalance"]}]`;
            console.log(balanceBefore);            
            inputAccData["CardDailyLimit"] = inputAccData["CardDailyLimit"] - inputAmount;
            inputAccData["AccountBalance"] = inputAccData["AccountBalance"] - inputAmount;
            moneyBox -= inputAmount;
            result = "Transaction Successfull, please collect your money.";
            balanceAfter = `After Tran: Moneybox=[${moneyBox}], Acc=[${inputAccNo}], RequestedAmount=[${inputAmount}], CardDailyLimit=[${inputAccData["CardDailyLimit"]}], AccountBalance[${inputAccData["AccountBalance"]}]`;
            console.log(balanceAfter);
        }
    } catch(ex) {
        console.log(ex);
        result = ex;
    }    
    document.getElementById("txtBalanceBefore").innerHTML = balanceBefore;
    document.getElementById("txtResult").innerHTML = result;
    document.getElementById("txtBalanceAfter").innerHTML = balanceAfter;
}
