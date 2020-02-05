/**
 * main
 * スプレッドシートの変更を検知する
 * A列に追加があったときに、追加された内容をメールする
 */
function postChange(e) {
  var value = getValue(e)
  if (value) notification(value)
}

/**
 * スプレッドシートの変更を通知する
 */
function notification(value) {
  var to = 'hoge@gmail.com'
  var parameters = {
    to: to,
    subject: value.subject,
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
  // 本文
  var body = ''

  if (cell.getColumn() !== 1) return null

  // スプレッドシートの形式によって変更する必要あり
  var heading = sheet.getRange('A1:L1').getValues()
  var content = sheet.getRange('A' + cell.getRow() + ':L' + cell.getRow()).getValues()

  for(var i = 0; heading[0].length > i; i++) {
    var tmp = content[0][i] ? content[0][i] : '未記入'
    body += '【' + heading[0][i] + '】' + '\n' + tmp + '\n\n'
  }

  return {
    subject: '「' + sheet.getName() + '」に追加があります',
    body: body
  }
}
