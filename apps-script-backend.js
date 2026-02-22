// ============================================================
// Nash Painting Translation Review — Google Apps Script Backend
// ============================================================
// SETUP (Bill — 2 minutes):
// 1. Go to https://script.google.com → New Project
// 2. Delete the default code, paste this entire file
// 3. Click Deploy → New deployment → Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    - Click Deploy → Copy the URL
// 4. Send Patcher the URL — I'll update the review page
// ============================================================

const SHEET_NAME = 'Translation Reviews';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();
    
    // Build a row: timestamp, reviewer name, stats, then each term's status + correction
    const row = [
      new Date().toISOString(),
      data.reviewer || 'Anonymous',
      data.stats?.reviewed || 0,
      data.stats?.correct || 0,
      data.stats?.fixes || 0,
      data.stats?.total || 0,
    ];
    
    // Add each term result
    if (data.terms) {
      data.terms.forEach(t => {
        row.push(t.status || 'pending');
        row.push(t.fix || '');
      });
    }
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Review saved! Gracias! 🎉'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Allow reading all submissions (for Patcher to pull results)
  try {
    const sheet = getOrCreateSheet();
    const data = sheet.getDataRange().getValues();
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      headers: data[0] || [],
      rows: data.slice(1)
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet() 
    || SpreadsheetApp.create('Nash Translation Reviews');
  
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Build headers
    const headers = ['Timestamp', 'Reviewer', 'Reviewed', 'Correct', 'Fixes', 'Total'];
    // We'll add term headers dynamically on first read
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}
