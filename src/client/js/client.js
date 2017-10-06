console.log("Hello There");
var tesing = document.getElementById("testing");
var result = google.script.run.getUserInfo("hello");
testing.innerHTML = "Result: " + result;

var ID_LENGTH = 8;

var employee_id_input = document.getElementById("employee_id");

var employee_found_div = document.getElementById("employee_found");
var employee_not_found_div = document.getElementById("employee_not_found");
var employee_name_p = document.getElementById("employee_name");

var customer_name_input = document.getElementById("customer_name");
var customer_email_input = document.getElementById("customer_email");
var customer_submit = document.getElementById("customer-submit");

function show_user(user) {
    console.log("Showing Employee: ");
    console.log(user);

    if(user.type === "employee") {
        if(user.name !== null) {
            employee_found_div.classList.remove("d-none");
            employee_found_div.classList.add("d-block");
            employee_not_found_div.classList.add("d-none");
            employee_not_found_div.classList.remove("d-block");
            employee_name_p.innerHTML = user.name;
        } else {
            employee_found_div.classList.add("d-none");
            employee_found_div.classList.remove("d-block");
            employee_not_found_div.classList.remove("d-none");
            employee_not_found_div.classList.add("d-block");
        }
    }
}

function upload_customer_info (customer){
    console.log("Uploading customer information...");
    // TODO: Append customer information to google sheets
}

employee_id_input.addEventListener('input', function (e) {
    console.log("Change:", employee_id.value);
    var id = employee_id_input.value;
    if(id.length >= ID_LENGTH) {
        console.log("ID entered");
        google.script.run.withSuccessHandler(show_user).getUserInfo(id, true);
    }else{
        //Hide info when text field is empty
        employee_not_found_div.style.display = "none";
        employee_found_div.style.display = "none";
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
        upload_customer_info(customer);
    }
}, false);
