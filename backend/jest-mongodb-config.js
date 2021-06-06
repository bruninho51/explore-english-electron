module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '4.2.11',
      skipMD5: true
    },
    autostart: false
  }
}
