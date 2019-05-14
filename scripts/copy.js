const fs = require('fs-extra')

try {
  fs.copySync('./dist', '../deployed/public')
  console.log('copy done !')
} catch (err) {
  console.error(err)
}