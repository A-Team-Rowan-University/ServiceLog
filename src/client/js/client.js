console.log("Hello There");
var tesing = document.getElementById("testing");
var result = google.script.run.getUserInfo("hello");
testing.innerHTML = "Result: " + result;

var ID_LENGTH = 8;

var employee_id_input = document.getElementById("employee_id");

var employee_found_div = document.getElementById("employee_found");
var employee_not_found_div = document.getElementById("employee_not_found");
var employee_name_p = document.getElementById("employee_name");

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
