const Discord = require('discord.js'); //Version discord.js@11.5.1
const client = new Discord.Client();

const fetch = require('node-fetch'); //Version node-fetch@2.6.0

const { token } = require('./token');

function nasapotd(message){

    //NASA Api Link
    let url = "https://api.nasa.gov/planetary/apod?api_key=79T5Ck3husu3YxYYVeMEqqCMFGp0b77f9Zru8NMw"

    //custom Date
    if(message.content.length >= 6){

        date = message.content.split(" ")[1]

        year = date.split(".")[2]
        month = date.split(".")[1]
        day = date.split(".")[0]

        url = url + "&date="+year+"-"+month+"-"+day

    }

    //Fetch NASA API JSON
    fetch(url)
        .then(response => {
            //converts to json
            return response.json()
        })
            .then(result => {

                //if api returns 400, send error message
                if(result.code === 400){
                    //replies to message with error code
                    message.reply("Error\nDatum überprüfen.\nBeispiel: 15.02.2021")
                    return
                }

                //cuts explanation to 1010 characters
                description = truncate(result.explanation, 1010)

                //Embed builder
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

                //sends embed message with NASA Api content
                message.channel.send({embed})
            })

}

//Cuts string to given value n
function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + " ..."  : str;
  };



//listens for new message
client.on('message', async message => {

    //return if message is from bot
    if (message.author.bot)return;

    //Call Nasa Funktion
    if (message.content.startsWith('/nasa')) {
        nasapotd(message)
    }

});


//when started, shows "/nasa <datum>" in bots "rich presence"
client.on('ready', () => {
    client.user.setActivity('/nasa <datum>', { type: 'LISTENING' });
  })

client.login(token);