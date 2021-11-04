
const { WAConnection } = require("@adiwajshing/baileys")

const chalk = require('chalk')

const fs = require("fs")

const exec = require('child_process')

const gomez = new WAConnection()

exports.gomez = gomez

exports.connect = async() => {

    gomez.version = [2, 2143, 3]

    console.log(chalk.keyword("blue")('◦ Conectando ◦'))

    let auth = './Chui.json'

    gomez.logger.level = 'warn'

    gomez.on("qr", () => {

       console.log(chalk.keyword("red")('Escanea el codigo de mas arriba'))

    })

    fs.existsSync(auth) && gomez.loadAuthInfo(auth)

    gomez.on('connecting', () => {

        console.log(chalk.whiteBright("⌛"), chalk.keyword("red")(" "), chalk.keyword("aqua")("Escanea el codigo a continuacion"))

    })

    await gomez.connect({ timeoutMs: 30 * 1000 })

    return gomez

}
