const { createAboutWindow } = require("./about");
const { createMainWindow } = require("./main");

module.exports = {
    main: createMainWindow,
    about: createAboutWindow
}