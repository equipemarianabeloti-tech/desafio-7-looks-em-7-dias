/*
  GOOGLE APPS SCRIPT — DESAFIO 7 LOOKS EM 7 DIAS

  IMPORTANTE:
  1) Use uma PLANILHA GOOGLE, não um arquivo .xlsx.
  2) Cole o ID da planilha abaixo.
     Exemplo de URL:
     https://docs.google.com/spreadsheets/d/1enWnzMtBRWpl2A9D3vSlTCLqGsm2XSCWm2Z1QAqkzLQ/edit?gid=0#gid=0
*/

const SPREADSHEET_ID = "https://docs.google.com/spreadsheets/d/1enWnzMtBRWpl2A9D3vSlTCLqGsm2XSCWm2Z1QAqkzLQ/edit?gid=0#gid=0";
const SHEET_NAME = "Leads";

function doGet(e) {
  return ContentService
    .createTextOutput("OK - Web App ativo")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data Registro", "Nome", "Email", "WhatsApp", "Origem", "Data Envio"]);
    }

    let data = {};

    // Forma mais estável para landing pages: FormData
    if (e && e.parameter) {
      data = e.parameter;
    }

    // Fallback para JSON, caso algum envio antigo ainda use JSON
    if ((!data.nome && !data.email) && e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {}
    }

    sheet.appendRow([
      new Date(),
      data.nome || "",
      data.email || "",
      data.whatsapp || "",
      data.origem || "Landing Page - Desafio 7 Looks em 7 Dias",
      data.data_envio || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
