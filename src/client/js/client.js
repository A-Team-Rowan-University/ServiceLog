
var requests_div = document.getElementById("requests");

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

var search = new Search(
    document.getElementById("search"),
    [
        {
            name: "Parts Request",
            type: "parts_request"
        },
        {
            name: "Parts Loan",
            type: "parts_loan"
        },
        {
            name: "Other",
            type: "other"
        }
    ]
);

var service_list = new ServiceList(
    requests_div
);


employee_card.focus();
employee_card.on_success = function(user) {
    customer_card.focus();
}
customer_card.on_success = function(user) {
    search.focus();
}

search.onadd = function(search) {
    service_list.add_service(search);
}
