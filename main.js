const { WAConnection, 
       MessageType, 
       Mimetype, 
      } = require('@adiwajshing/baileys');
const fs = require('fs');
const prefix = '.'
const conn = require("./lib/index")
conn.connect()
const client = conn.client
client.on('chat-update', async (gomez) => {
try {	  
if (!gomez.hasNewMessage) return
if (!gomez.messages) return
if (gomez.key && gomez.key.remoteJid == 'status@broadcast') return

gomez = gomez.messages.all()[0]
if (!gomez.message) return
global.blocked
gomez.message = (Object.keys(gomez.message)[0] === 'ephemeralMessage') ? gomez.message.ephemeralMessage.message : gomez.message
const from = gomez.key.remoteJid
const type = Object.keys(gomez.message)[0]        
const quoted = type == 'extendedTextMessage' && gomez.message.extendedTextMessage.contextInfo != null ? gomez.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const typeQuoted = Object.keys(quoted)[0]
const content = JSON.stringify(gomez.message)
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const body = gomez.message.conversation || gomez.message[type].caption || gomez.message[type].text || ""
chats = (type === 'conversation') ? gomez.message.conversation : (type === 'extendedTextMessage') ? gomez.message.extendedTextMessage.text : ''
budy = (type === 'conversation' && gomez.message.conversation.startsWith(prefix)) ? gomez.message.conversation : (type == 'imageMessage') && gomez.message.imageMessage.caption.startsWith(prefix) ? gomez.message.imageMessage.caption : (type == 'videoMessage') && gomez.message.videoMessage.caption.startsWith(prefix) ? gomez.message.videoMessage.caption : (type == 'extendedTextMessage') && gomez.message.extendedTextMessage.text.startsWith(prefix) ? gomez.message.extendedTextMessage.text : ''

if (prefix != "") {
if (!body.startsWith(prefix)) {
cmd = false
comm = ""
} else {
cmd = true
comm = body.slice(1).trim().split(" ").shift().toLowerCase()
}
} else {
cmd = false
comm = body.trim().split(" ").shift().toLowerCase()
}
        
const command = comm

const arg = chats.slice(command.length + 2, chats.length)
const args = budy.trim().split(/ +/).slice(1)
const isCmd = budy.startsWith(prefix)
const q = args.join(' ')
const soyYo = client.user.jid
const botNumber = client.user.jid.split("@")[0]
const ownerNumber = ['@s.whatsapp.net']
const isGroup = from.endsWith('@g.us')
const sender = gomez.key.fromMe ? client.user.jid : isGroup ? gomez.participant : gomez.key.remoteJid
const senderNumber = sender.split("@")[0]
const isMe = senderNumber == botNumber
const conts = gomez.key.fromMe ? client.user.jid : client.contacts[sender] || { notify: jid.replace(/@.+/, '') }
const pushname = gomez.key.fromMe ? client.user.name : conts.notify || conts.vname || conts.name || '-'

//AUTO RESPUESTA VERIFICADA
if(body.includes('bot')) {
client.sendMessage(from, 'Hola!', MessageType.text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": ">👾𝑻𝒀𝑹𝑶𝑵𝑬👾<", 'jpegThumbnail': fs.readFileSync('./media/logo.png')}}
}})
}

//AUTO RESPUESTA SIN VERIFICACION
if(body == ('hola')) {
client.sendMessage(from, 'como estas!', MessageType.text, {quoted: gomez})
}
  
if(body == ('Hola')) {
client.sendMessage(from, 'Hola? Te haz podido comunicar.', MessageType.text, {quoted: gomez})
}

//ZONA DE COMANDOS	
switch (command) {
case 'bot':
client.sendMessage(from, 'Hola, felicidades, has logrado enviar un mensaje mediante un servidor externo😚', text, {quoted: { key: {
fromMe: false,
participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
},
message: {
"documentMessage": { "title": "𝑻𝒀𝑹𝑶𝑵𝑬", 'jpegThumbnail': fs.readFileSync('./media/logo.jpg')}}
}})
break		
case 'foto':
const imagen = fs.readFileSync('./media/foto.jpg')                
client.sendMessage(from, imagen, MessageType.image, {quoted: gomez, caption: `*Aqui tienes la foto del trio fundado*`})
break
                
case 'video':
const video = fs.readFileSync('./media/video.mp4')
client.sendMessage(from, video, MessageType.video, {quoted: gomez, mimetype: 'video/mp4', caption: 'JAJAJA', duration: 999999999})
break
                
case 'audio':
const audio = fs.readFileSync('./media/audio.mp3')
client.sendMessage(from, audio, MessageType.audio, {quoted: gomez, mimetype: 'audio/mp3', duration: -9999999, ptt: true})
client.sendMessage(from, audio, MessageType.audio, {quoted: gomez, mimetype: 'audio/mp3', duration: -9999999})                
break
                
}

} catch (e) {
        
console.log(e)}
        
})      
