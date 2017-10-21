// Veiw live at
// https://script.google.com/a/students.rowan.edu/macros/s/AKfycby1jrdWg8-SYiR-T-CGLcPMsrrdOgafNUuQGe7Xs_3e/dev

Logger.log("Hello World");

var userSpreadsheetID = "1SDhT_8Oud8eTdrtuloioYj8j6pGUVcfp0ZldBCWq0RQ";

var userSpreadsheet = SpreadsheetApp.openById(userSpreadsheetID);

var employeeSheet = userSpreadsheet.getSheetByName("Employees");
var employeeRange = employeeSheet.getRange(2, 1, employeeSheet.getLastRow(), employeeSheet.getLastColumn());

var customerSheet = userSpreadsheet.getSheetByName("Customers");
var customerRange = customerSheet.getRange(2, 1, customerSheet.getLastRow(), customerSheet.getLastColumn());


var logSpreadsheetID = "1gcjidaI-xNvL27dDWgDwCN-mhH7NCweGUrxGK7wsemI";

var logSpreadsheet = SpreadsheetApp.openById(logSpreadsheetID);
var logSheet = logSpreadsheet.getSheetByName("Log");

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

function getUserInfo(user_id, type) {
    Logger.log(user_id);
    Logger.log(type);

    if(type === "employee") {
        Logger.log("Employee");

        var employee = {
            card_id: user_id,
            name: null,
            depeartment: null,
            email: null,
            type: "employee",
            search: "card"
        }

        var values = employeeRange.getValues();
        var len = values.length;
        for(var i = 0; i < len; i++) {
            var row = values[i]
            Logger.log(row[0]);
            if(user_id != "" && row[0] === user_id) {
                employee.name = row[1];
                employee.department = row[2];
                employee.email = row[3];
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
            search: "card"
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
        seach: "email",
    }

    var values = customerRange.getValues();
    var len = values.length;
    for(var i = 0; i < len; i++) {
        var row = values[i]
        Logger.log(row[0]);
        if(email != "" && row[3] === email) {
            customer.name = row[1];
            customer.department = row[2];
            customerSheet.getRange(i+2, 1).setValue(card_id);
        }
    }
    return customer;
}

function parts_request(employee_id, customer_id, description) {
    logSheet.appendRow([employee_id, customer_id, "Parts Request", description]);
}

function equipment_loan(employee_id, customer_id, equipment_id) {
   logSheet.appendRow([employee_id, customer_id, equipment_id]);
    // TODO
    // Send request to equipement log
}
