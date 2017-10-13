// Veiw live at
// https://script.google.com/a/students.rowan.edu/macros/s/AKfycby1jrdWg8-SYiR-T-CGLcPMsrrdOgafNUuQGe7Xs_3e/dev

Logger.log("Hello World");

var userSpreadsheetID = "1SDhT_8Oud8eTdrtuloioYj8j6pGUVcfp0ZldBCWq0RQ";

var userSpreadsheet = SpreadsheetApp.openById(userSpreadsheetID);

var employeeSheet = userSpreadsheet.getSheetByName("Employees");
var employeeRange = employeeSheet.getRange(2, 1, employeeSheet.getLastRow(), employeeSheet.getLastColumn());

var customerSheet = userSpreadsheet.getSheetByName("Customers");
var customerRange = customerSheet.getRange(2, 1, customerSheet.getLastRow(), customerSheet.getLastColumn());


function log(e) {
    Logger.log(e);
}

function doGet(e) {
    return HtmlService.createTemplateFromFile('index.html').evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function getUserInfo(user_id, is_employee) {
    Logger.log(user_id);
    Logger.log(is_employee);

    if(is_employee) {
        Logger.log("Employee");

        var employee = {
            card_id: user_id,
            name: null,
            email: null,
            type: "employee",
        }

        var values = employeeRange.getValues();
        var len = values.length;
        for(var i = 0; i < len; i++) {
            var row = values[i]
            Logger.log(row[0]);
            if(user_id != "" && row[0] === user_id) {
                employee.name = row[1];
                employee.email = row[2];
            }
        }
        return employee;
    } else {
        Logger.log("Customer");

        var customer = {
            card_id: user_id,
            name: null,
            department: null,
            email: null,
            type: "customer",
        }

        var values = customerRange.getValues();
        var len = values.length;
        for(var i = 0; i < len; i++) {
            var row = values[i]
            Logger.log(row[0]);
            if(user_id != "" && row[0] === user_id) {
                customer.name = row[1];
                customer.department = row[2];
                customer.email = row[3];
            }
        }
        return customer;
    }
}

function new_customer(card_id, email) {
    Logger.log("New Customer!");
    Logger.log(card_id);
    Logger.log(email);

    var customer = {
        card_id: card_id,
        name: null,
        department: null,
        email: email,
        type: "customer",
    }

    var values = customerRange.getValues();
    var len = values.length;
    for(var i = 0; i < len; i++) {
        var row = values[i]
        Logger.log(row[0]);
        if(email != "" && row[3] === email) {
            customer.name = row[1];
            customer.department = row[2];
            customerSheet.getRange(i+2, 1);
        }
    }
    return customer;
}

function upload_customer_info (customer){
    var first_empty_row = function (){
        var spr = customerSheet;
        var column = spr.getRange('A:A');
        var values = column.getValues(); // get all data in one call
        var ct = 0;
        while ( values[ct][0] != "" ) {
            ct++;
        }
            return (ct + 1);
        };
    values= [
                [customer.card_id,
                 customer.name,
                 customer.department,
                 customer.email]
            ];
    //throw first_empty_row;
    var request = customerSheet.getRange(first_empty_row(), 1, 1, 4).setValues(values);
}