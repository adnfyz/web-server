const express= require('express');
const fs=require('fs');
var app = express();
const port=process.env.PORT || 3000;
const hbs=require('hbs');

hbs.registerPartials(__dirname+'/views/partials');
app.set('view_engine','hbs');

app.use((request,response,next)=>{
	var now = new Date().toString();
	console.log(now +':'+request.method,request.url);    //other methods for information for middleware
	var log=now + request.method+request.url + '\n';
	fs.appendFile('server.log',log,(err)=>{
		if(err){
			console.log('Unable to append server.log file');
		}
	});
	next();
})

// app.get('/',(req,res)=>{
// 	res.render('maintainence.hbs');
	 	
// });

app.use(express.static(__dirname+'/public'));

app.get('/',(request,response)=>{

	response.render('home.hbs',{
		Logo:'Welcome dear',
		data:{
		name:'Adnan',
		likes:['Gymming',
				'Cycling'
				]}
	});
});

hbs.registerHelper('currentTime',()=>{
	return new Date().toString();
});
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});
hbs.registerHelper('ScreamIt',(text)=>{
	return text.toUpperCase();
});
app.get('/about',(request,response)=>{
	response.render('about.hbs',{
		pagetitle:'About page'
	});
});

app.get('/projects',(request,response)=>{
	response.render('projects.hbs',{
		pagetitle:'Projects done!'
	});
});
app.get('/about/bad',(request,response)=>{
	response.send('bad parameter send!');
});

app.listen(port,()=>{
	console.log('Server is up on port: '+port);
});
