function calculate() {
    console.log("inside calculate");
    let num1 = num2 = result = 0;
    let ops = null;
    try {
        num1 = Number(document.getElementById("num1").value);
        num2 = Number(document.getElementById("num2").value);
        ops = document.getElementById("operation").value;
        console.log(num1, num2, ops);
        if (num1 != null && num2 != null && ops != null) {
            switch(ops) {
                case "add":
                    result = num1 + num2;
                    break;
                case "sub":
                    result = num1 - num2;                    
                    break;
                case "mul":
                    result = num1 * num2;
                    break;
                case "div":
                    result = num1 / num2;
                    break;
                default:
                    throw "No operation selected";
            }
        }
    } catch(ex) {
        result = ex;
    }
    document.getElementById("result").value = "Result: " + result;
}