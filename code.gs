/**
 * main
 * スプレッドシートの変更を検知する
 */
function postChange(e) {
  var value = getValue(e)
  if (value) notification(value)
}

/**
 * スプレッドシートの変更を通知する
 */
function notification(value) {
  var parameters = {
    to: 'hoge@gmail.com',
    subject: value.title,
    body: value.body
  }
  MailApp.sendEmail(parameters)
}

/**
 * 変更された値を取得する
 */
function getValue() {
  // シートを取得
  var sheet = SpreadsheetApp.getActiveSheet()
  // アクティブなセルを取得
  var cell = sheet.getActiveCell()

  var title = 'A' + cell.getRow()
  var value = {
    title: '「' + sheet.getName() + '」シートに変更があります。',
    body: sheet.getRange(title).getValue() + 'が' + cell.getValue() + 'に変更されました。'
  }

  return value
}