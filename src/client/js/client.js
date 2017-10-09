
var ID_LENGTH = 8;

<<<<<<< HEAD
var id_input = document.getElementById("id_input");

var id_input_div = document.getElementById("id_input_div");
=======
var employee_card = document.getElementById("employee_card");
var employee_card_input = document.getElementById("employee_card_input");
>>>>>>> refs/remotes/origin/dev
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

<<<<<<< HEAD
    if(user.type === "employee") {
        //console.log("Showing Employee: ");
        //console.log(user);
        if(user.name) {
            //console.log("Employee name: ", user.name);
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
=======
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
>>>>>>> refs/remotes/origin/dev
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

<<<<<<< HEAD
id_input.addEventListener('input', function (e) {
    if(!employee_active){
        console.log("Change:", id_input.value);
        var id = id_input.value;
        //Hide info when text field is empty
        hideElements([
            employee_found_div
        ]);

        showElements([
            employee_not_found_div
        ]);
        var employee = google.script.run.withSuccessHandler(show_user).getUserInfo(id, true);
        console.log("Employee = ", employee);
        if(id.length >= ID_LENGTH) {
            console.log("ID entered");
        }
=======
//Customer card search
customer_card_input.addEventListener('input', function (e) {
    var id = customer_card_input.value;
    //Hide info when text field is empty
    customer_not_found_div.style.display = "none";
    customer_found_div.style.display = "none";
    if (id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, false);
>>>>>>> refs/remotes/origin/dev
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
    var customer = {}
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

<<<<<<< HEAD
employee_logout_submit.addEventListener("click", function(e){
    if(employee_active)
        employee_active = null;
    else
        throw "ERR: No employee is signed in";
    id_input.value = "";
    //Hide info when text field is empty
    hideElements([
        employee_not_found_div,
        employee_found_div,
        employee_login_submit,
        employee_logout_submit,
        customer_request_submit
    ]);
}, false);

customer_request_submit.addEventListener("click", function(e){
     hideElements([
        employee_found_div,
        employee_logout_submit
    ]);
}, false);

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
=======
// Employee login
employee_login_submit.addEventListener('click', function (e) {
    // Just need to send request to worker log
}, false);

// Employee logout
employee_logout_submit.addEventListener("click", function (e) {
    // Just need to send request to worker log
}, false);
>>>>>>> refs/remotes/origin/dev
