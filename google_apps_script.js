function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.nome || "",
      data.email || "",
      data.whatsapp || "",
      data.origem || "",
      data.data_envio || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({status:"success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status:"error",message:error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}