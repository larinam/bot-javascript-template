// to acquire BOT_TOKEN visit https://core.telegram.org/bots#botfather
// to set BOT_TOKEN export BOT_TOKEN='<code>' 

const Telegraf = require('telegraf')
var request = require('request');
var Datastore = require('nedb');
var db = new Datastore({filename : 'db/users'});
db.loadDatabase();

const app = new Telegraf(process.env.BOT_TOKEN)
app.command('start', (ctx) => {
  console.log('start', ctx.from)
  ctx.reply('Welcome!')
  ctx.reply('What do you want?')
})

app.hears('hi', (ctx) => ctx.reply('Hey there!'))

app.hears('rest', (ctx) => {
  request('http://www.google.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
    
    ctx.reply(body.slice(0,2000));
  });

})

app.hears('db', (ctx) => {
  db.insert({name : "Boris the Blade", year: 1946});
  db.find({year: 1946}, function (err, docs) {
	console.log(docs);
        ctx.reply(docs);
	ctx.reply(docs && docs[0] && docs[0].name);
});
})

app.on('sticker', (ctx) => ctx.reply('👍'))

app.startPolling()
