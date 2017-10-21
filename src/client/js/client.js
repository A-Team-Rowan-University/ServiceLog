
var employee_card = new CardLookup(
    "Employee Card", 
    document.getElementById("employee_card"),
    "employee",
);

var customer_card = new CardLookup(
    "Customer Card", 
    document.getElementById("customer_card"),
    "customer",
);

employee_card.focus();
employee_card.on_success = function(user) {
    customer_card.focus();
}
