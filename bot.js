const Discord = require('discord.js'); //Version discord.js@11.5.1
const client = new Discord.Client();

const fetch = require('node-fetch'); //Version node-fetch@2.6.0

const { token } = require('./token');


function nasapotd(message){

    let url = "https://api.nasa.gov/planetary/apod?api_key=79T5Ck3husu3YxYYVeMEqqCMFGp0b77f9Zru8NMw"

    if(message.content.length >= 6){

    date = message.content.split(" ")[1]

    year = date.split(".")[2]
    month = date.split(".")[1]
    day = date.split(".")[0]

    url = url + "&date="+year+"-"+month+"-"+day

    }

    console.log(url)

    fetch(url)
    .then(response => {
        return response.json()
    }).then(result => {
        embed = {
            title: result.title,
            color: 14191372,
            author: {
                name: "Nasa Bild vom Tag",
                icon: message.author.avatarURL               
            },
            image: {
                url: result.url
                },
            fields:[
                { name: 'Explanation', value: result.explanation},
                { name: 'Link', value: result.url}
            ]  
        };
        message.channel.send({embed})
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
    client.user.setActivity('/help', { type: 'LISTENING' });
  })

client.login(token);