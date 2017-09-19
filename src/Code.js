
var userSpreadsheet = "1aWH1790Yxu2JNy3OCh-iakoaZQNOalPJmvZi8TuNQYQ";

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function getUserInfo(user_id) {
  var spreadsheet = SpreadsheetApp.openById(userSpreadsheet);
  var range = spreadsheet.getRange("Users!A:C");
  var values = range.getValues();
  Logger.log(user_id);
  Logger.log(values);
  Logger.log(range);
  return values;
}