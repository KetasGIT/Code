//npm install discord.js@11.5.1
//npm isntall node-fetch@2.6.0

const { token } = require('./token');


const Discord = require('discord.js'); //Version 11.5.1
const client = new Discord.Client();

const fetch = require('node-fetch'); //Version 2.6.0

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
url = "https://api.nasa.gov/planetary/apod?api_key=79T5Ck3husu3YxYYVeMEqqCMFGp0b77f9Zru8NMw"

function nasapotd(message){

    fetch(url)
    .then(response => {
        return response.json()
    }).then(result => {
        message.channel.send("**Nasa Picture of the Day**\n"+result.title+"\n"+result.url)
    })

}


client.on('message', async message => {

    //return if bot
    if (message.author.bot)return;

    if (message.content.startsWith('/nasa')) {
        nasapotd(message)
    }


});



client.on('ready', () => {
    client.user.setActivity('Nightcore', { type: 'LISTENING' });
  })

client.login(token);