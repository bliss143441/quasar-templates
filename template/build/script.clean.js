var
  shell = require('shelljs'),
  path = require('path')

shell.rm('-rf', path.resolve(__dirname, '../dist/*'))
shell.rm('-rf', path.resolve(__dirname, '../dist/.*'))
shell.rm('-rf', path.resolve(__dirname, '../tmp'))
console.log(' Cleaned build artifacts and tmp folder.\n')
