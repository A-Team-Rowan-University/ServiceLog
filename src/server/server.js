// Veiw live at
// https://script.google.com/a/students.rowan.edu/macros/s/AKfycby1jrdWg8-SYiR-T-CGLcPMsrrdOgafNUuQGe7Xs_3e/dev

Logger.log("Hello World");

var userSpreadsheetID = "1SDhT_8Oud8eTdrtuloioYj8j6pGUVcfp0ZldBCWq0RQ";

var userSpreadsheet = SpreadsheetApp.openById(userSpreadsheetID);

var employeeSheet = userSpreadsheet.getSheetByName("Employees");
var employeeRange = employeeSheet.getRange(2, 1, employeeSheet.getLastRow(), employeeSheet.getLastColumn());

var customerSheet = userSpreadsheet.getSheetByName("Customers");


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
            card_id: null,
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
    }
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