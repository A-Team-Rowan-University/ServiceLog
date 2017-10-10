
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
            showElements([
                employee_found_div
            ]);
            hideElements([
                employee_not_found_div
            ]);
            if(employee_active){
                showElements([
                    employee_logout_submit,
                    customer_request_submit
                ]);

                hideElements([
                    employee_login_submit,
                ]);
            }else{
                showElements([
                    employee_login_submit
                ]);
                hideElements([
                    employee_logout_submit,
                    customer_request_submit
                ]);
            }
            employee_name_p.innerHTML = user.name;
        } else {
            hideElements([
                employee_found_div,
                customer_request_div,
                employee_login_submit,
                employee_logout_submit,
                customer_request_submit
            ]);
            showElements([
                employee_not_found_div,
            ]);
        }
    } else {
        console.log("Showing Customer: ");
        console.log(user);
        if (user.name) {
            console.log("Customer name: ", user.name);

            showElements([
                customer_found_div
            ]);

            hideElements([
                customer_not_found_div
            ]);

            // Update with customer info
            customer_name_p.innerHTML = user.name;

        } else {
            showElements([
                customer_not_found_div
            ]);

            hideElements([
                customer_found_div
            ]);
        }
    }
}

function hideElements(elements){
    console.log("hide elements called");
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        console.log(element);
        element.style.display = "none";
        element.classList.add("d-none");
        element.classList.remove("d-block");
        console.log(element);
    }
}

function showElements(elements){
    console.log("show elements called");
    for(var i = 0; i < elements.length; i++){
        var element = elements[i];
        element.style.display = "visible";
        element.classList.add("d-block");
        element.classList.remove("d-none");
        console.log(element);
    }
}

// Employee card search
employee_card_input.addEventListener('input', function (e) {
    var id = employee_card_input.value;
    //Hide info when text field is empty
    hideElements([
        employee_found_div,
        employee_not_found_div
    ]);
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, true);
    }
}, false);

//Customer card search
customer_card_input.addEventListener('input', function (e) {
    var id = customer_card_input.value;
    //Hide info when text field is empty
    hideElements([
        customer_found_div,
        customer_not_found_div
    ]);
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, false);
    }
}, false);

customer_request_submit.addEventListener('click', function (e) {
    // Show customer card input
    showElements([
        customer_card
    ]);
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
