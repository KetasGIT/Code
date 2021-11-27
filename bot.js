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

    fetch(url)
        .then(response => {
            return response.json()
        })
            .then(result => {

                if(result.code === 400){
                    message.reply("Error\nDatum überprüfen.\nBeispiel: 15.02.2021")
                    return
                }

                description = truncate(result.explanation, 1010)

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
                        { name: 'Explanation', value: description},
                        { name: 'Link', value: result.url}
                    ]  
                };
                message.channel.send({embed})
            })

}

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + " ..."  : str;
  };

client.on('message', async message => {

    //return if bot
    if (message.author.bot)return;

    //Aufruf Nasa Funktion
    if (message.content.startsWith('/nasa')) {
        nasapotd(message)
    }

});



client.on('ready', () => {
    client.user.setActivity('/nasa <datum>', { type: 'LISTENING' });
  })

client.login(token);