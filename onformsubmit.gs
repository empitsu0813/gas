/**
 * googleフォームから送信された内容をメールで送信
 */
function onFormSubmit(e) {
  var keys = Object.keys(e.namedValues)
  // 複数の宛先を設定したい場合は、カンマで区切ってください。
  // 例: to: 'hoge@gmail.com,piyo@gmail.com
  var value = {
    to: 'takahashiry.0813@gmail.com',
    subject: '「' + SpreadsheetApp.getActiveSheet().getName() + '」にお問い合わせがあります。',
    body: '以下の内容でお問い合わせがありました。\n\n'
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    value.body += '【' + key + '】\n' + e.namedValues[key] + '\n\n'
  }

  MailApp.sendEmail(value);
}