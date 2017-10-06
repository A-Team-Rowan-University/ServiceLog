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
            name: null,
            email: null,
            type: "employee",
        }

        var values = employeeRange.getValues();
        var len = values.length;
        for(var i = 0; i < len; i++) {
            var row = values[i]
            Logger.log(row[0]);
            if(row[0] === user_id) {
                employee.name = row[1];
                employee.email = row[2];
            }
        }

        return employee;
    }
}

function upload_customer_info (customer){
    // TODO: Append customer information to google sheets
}