const mineflayer = require('mineflayer')

require('dotenv').config({ debug: false })

if(typeof process.env.MC_USERNAME != 'string') {
  console.log("You have to set MC_USERNAME in your .env file")
  process.exit(1)
}

console.log(`Using minecraft account '${process.env.MC_USERNAME}'`)

const bot = mineflayer.createBot({
  host: process.env.SERVER_HOST || '2b2t.org',
  username: process.env.MC_USERNAME,
  auth: 'microsoft',
  version: '1.21.4'
})

bot.on('chat', (username, message) => {
  console.log(`[chat] ${username}: ${message}`)
})

bot.on('kicked', console.log)
bot.on('error', console.log)

const getQueuePos = () => {
  const messages = bot.tablist.header.extra
  if(messages && messages.length >= 3) {
    const msg = messages[2]
    if(msg && msg.extra && msg.extra.length >= 1) {
      const posMsg = msg.extra[0]
      if(!posMsg.text) {
        return null
      }
      return parseInt(posMsg.text, 10)
    }
  }
  return null
}

let queuePos = null

const printQueuePos = () => {
  const pos = getQueuePos()
  console.log(`position in queue: ${pos}`)
  queuePos = pos
}

setInterval(printQueuePos, 1000)

const http = require("http")

const webContent = () => {
  const now = new Date()
  const lastUpdate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`
  const lines = [
    `last updated: ${lastUpdate}`,
    `position in queue: ${queuePos}`
  ]
  return lines.join('\n')
}

const server = http.createServer((req, res) => {
  res.write(webContent())
  res.end()
})

const webPort = process.env.WEB_PORT ? parseInt(process.env.WEB_PORT, 10) : 8888
server.listen((webPort), () => {
  console.log(`web server running at http://localhost:${webPort}`)
})
