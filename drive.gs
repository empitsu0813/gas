var ROOT_FOLDER_ID = 'id'
var INTERVAL = 10 * 60 * 1000 // 10分

/**
 * メイン
 * 指定したフォルダ配下に変更があったときにメールを送信
 */
function postChange(e) {
  var files = getAllFiles(ROOT_FOLDER_ID)
  var newlyFiles = extractCreatedNewly(files)
  if (newlyFiles.length) notification(newlyFiles)
}

/**
 * 再帰
 * ルートフォルダ配下のファイルをすべて取得
 */
function getAllFiles(folderId) {
  var files = DriveApp.getFolderById(folderId).getFiles()
  var folders = DriveApp.getFolderById(folderId).getFolders()

  var allFiles = []

  while(files.hasNext()) {
    file = files.next()
    allFiles.push(file)
  }

  while(folders.hasNext()) {
    folder = folders.next()
    allFiles = allFiles.concat(getAllFiles(folder.getId()))
  }

  return allFiles
}

/**
 * 新規作成されたファイルを取得
 */
function extractCreatedNewly(files) {
  var newlyFiles = []
  files.forEach(function(file) {
    if (new Date() - file.getDateCreated() < INTERVAL) {
      newlyFiles.push(file)
    }
  })

  return newlyFiles
}

/**
 *
 */
function notification(files) {
  var rootFolderName = DriveApp.getFolderById(ROOT_FOLDER_ID).getName()
  var body = '以下のファイルが追加されました\n'
  files.forEach(function(file) {
    var name = file.getName()
    var url = file.getUrl()
    var tmp = name + ': ' + url + '\n'
    body += tmp
  })

  var parameters = {
    to: 'gmail ',
    subject: '「' + rootFolderName + '」フォルダにファイルが追加されました',
    body: body
  }
  MailApp.sendEmail(parameters)
}
