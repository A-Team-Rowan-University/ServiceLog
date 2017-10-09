console.log("Hello There");
var tesing = document.getElementById("testing");
var result = google.script.run.getUserInfo("hello");
testing.innerHTML = "Result: " + result;

var ID_LENGTH = 8;

var id_input = document.getElementById("id_input");

var id_input_div = document.getElementById("id_input_div");
var employee_found_div = document.getElementById("employee_found");
var employee_not_found_div = document.getElementById("employee_not_found");
var customer_request_div = document.getElementById("customer_request_div");
var employee_name_p = document.getElementById("employee_name");

var customer_name_input = document.getElementById("customer_name");
var customer_email_input = document.getElementById("customer_email");
var customer_submit = document.getElementById("customer-submit");

var employee_login_submit = document.getElementById("log_in_button");
var employee_logout_submit = document.getElementById("log_out_button");
var customer_request_submit = document.getElementById("customer_request_button");

var employee_active;
function show_user(user) {

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
        }
    }
}

function set_employee_active(employee){
    employee_active = employee;
    console.log("Active Employee = ", employee_active);
    show_user(employee);
}

employee_login_submit.addEventListener('click', function (e) {
    var id = id_input.value;
    var employee_active = google.script.run.withSuccessHandler(set_employee_active).getUserInfo(id, true);
}, false);

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
    }
}, false);


customer_submit.addEventListener('click', function(e) {
    console.log("customer submited");
    var customer = {}
    customer.name = customer_name_input.value;
    customer.email= customer_email_input.value;
    customer.department = $("#customer-department-div input:radio:checked").val();

    console.log("name: ",customer.name);
    console.log("email: ",customer.email);
    console.log("dept: ",customer.department);

    if(customer.name !== null && customer.email !== null && customer.department != null){
        var result = google.script.run.upload_customer_info(customer);
        console.log("Upload result: ", result);
    }
}, false);

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