
var ID_LENGTH = 8;

var id_input_div = document.getElementById("id_input");
var employee_card = document.getElementById("employee_card");
var employee_card_input = document.getElementById("employee_card_input");
var employee_found_div = document.getElementById("employee_found");
var employee_not_found_div = document.getElementById("employee_not_found");
var employee_name_p = document.getElementById("employee_name");

var customer_card = document.getElementById("customer_card");
var customer_card_input = document.getElementById("customer_card_input");
var customer_found_div = document.getElementById("customer_found");
var customer_not_found_div = document.getElementById("customer_not_found");
var customer_name_p = document.getElementById("customer_name");
var customer_request_div = document.getElementById("customer_request_div");

var customer_name_input = document.getElementById("customer_name");
var customer_email_input = document.getElementById("customer_email");
var customer_submit = document.getElementById("customer-submit");

var employee_login_submit = document.getElementById("log_in_button");
var employee_logout_submit = document.getElementById("log_out_button");
var customer_request_submit = document.getElementById("customer_request_button");

//var employee_active;
function show_user(user) {
    if (user.type === "employee") {
        console.log("Showing Employee: ");
        console.log(user);
        if (user.name) {
            console.log("Employee name: ", user.name);
            // Show employee found div
            employee_found_div.classList.remove("d-none");
            employee_found_div.classList.add("d-block");

            // Hide employee not found div
            employee_not_found_div.classList.add("d-none");
            employee_not_found_div.classList.remove("d-block");

            // We do not need to keep track of 'active' employees
            // Any employee is able to customer request

            // Update with employee info
            employee_name_p.innerHTML = user.name;
        } else {
            // Hide employee found div
            employee_found_div.classList.add("d-none");
            employee_found_div.classList.remove("d-block");

            // Show employee not found div
            employee_not_found_div.classList.remove("d-none");
            employee_not_found_div.classList.add("d-block");
        }
    } else {
        console.log("Showing Customer: ");
        console.log(user);
        if (user.name) {
            console.log("Customer name: ", user.name);
            // Show customer found div
            customer_found_div.classList.remove("d-none");
            customer_found_div.classList.add("d-block");

            // Hide customer not found div
            customer_not_found_div.classList.add("d-none");
            customer_not_found_div.classList.remove("d-block");

            // Update with customer info
            customer_name_p.innerHTML = user.name;

        } else {
            // Hide customer found div
            customer_found_div.classList.add("d-none");
            customer_found_div.classList.remove("d-block");

            // Show customer not found div
            customer_not_found_div.classList.remove("d-none");
            customer_not_found_div.classList.add("d-block");
        }
    }
}

// Employee card search
employee_card_input.addEventListener('input', function (e) {
    var id = employee_card_input.value;
    //Hide info when text field is empty
    employee_not_found_div.style.display = "none";
    employee_found_div.style.display = "none";
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, true);
    }
}, false);

//Customer card search
customer_card_input.addEventListener('input', function (e) {
    var id = customer_card_input.value;
    //Hide info when text field is empty
    customer_not_found_div.style.display = "none";
    customer_found_div.style.display = "none";
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, false);
    }
}, false);

customer_request_submit.addEventListener('click', function (e) {
    // Show customer card input
    customer_card.classList.add("d-block");
    customer_card.classList.remove("d-none");
}, false);

// 
customer_submit.addEventListener('click', function (e) {
    // Search database of all people
    console.log("customer submited");
    var customer = {};
    customer.name = customer_name_input.value;
    customer.email = customer_email_input.value;
    customer.department = $("#customer-department-div input:radio:checked").val();

    console.log("name: ", customer.name);
    console.log("email: ", customer.email);
    console.log("dept: ", customer.department);

    if (customer.name !== null && customer.email !== null && customer.department != null) {
        var result = google.script.run.upload_customer_info(customer);
        console.log("Upload result: ", result);
    }
}, false);

// Employee login
employee_login_submit.addEventListener('click', function (e) {
    // Just need to send request to worker log
}, false);

// Employee logout
employee_logout_submit.addEventListener("click", function (e) {
    // Just need to send request to worker log
}, false);
