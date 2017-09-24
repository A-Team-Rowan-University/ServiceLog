Logger.log("Hello World");

var userSpreadsheet = "1aWH1790Yxu2JNy3OCh-iakoaZQNOalPJmvZi8TuNQYQ";

function doGet(e) {
    return HtmlService.createTemplateFromFile('index.html').evaluate();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
}

function getUserInfo(user_id) {
    Logger.log(user_id);
    var spreadsheet = SpreadsheetApp.openById(userSpreadsheet);
    var range = spreadsheet.getRange("Users!A:C");
    var values = range.getValues();
    return values;
}