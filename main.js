const discord = require ('discord.js');
var client = new discord.Client();

const fs = require('fs');
const readline = require('readline');

var ATPERM = 'blaster brute tanker spider fortunata crab soldier scrapper stalker sentinel defender corruptor dominator controller peacebringer warshade mastermind';


client.on("ready", () => {

    console.log ("ready!");

    client.user.setActivity ('Finding Builds!', { type: 'PLAYING' });

});

const prefixReq = "tbrequest!";
const prefixHelp = "tbhelp!";
const prefixUpdate = "tbupdate!";
const prefixExp = "expsearch!";
const prefixTest = "heyKwof!";

client.on ("message", (message) => {

    var at,pri,sec;
    
    if (message.author.bot) return;


    if (message.content.startsWith(prefixHelp)){

      let support = require('./support.js');
      message.channel.send({embed: support}); 
    
    }

    if (message.content.startsWith(prefixUpdate)){
    
        let update = require('./update.js');
        return message.channel.send({embed: update}); 
  
    }
    
    if(message.content.startsWith(prefixReq+ ' worst.build.ever')){

      var aRet = message.author.username;
      return message.channel.send(aRet +`_build.mxd could not be found...`);
      
    }

    if(message.content.startsWith(prefixReq+ ' Oh, magic fanny pack! Show me the way!')){

      return message.channel.send({files: ["./builds/El_Cubano_-_Defender_-_Empathy_-_Energy_Blast_-_No_Heals.mxd"]});
      
    }


    if(message.content.startsWith(prefixReq+ ' best.build.ever')){

      return message.channel.send({files: ["./builds/El_Cubano_-_Defender_-_Empathy_-_Energy_Blast_-_No_Heals.mxd"]});
      
    }

    if(message.content.startsWith(prefixReq)){
    
        const args = message.content.slice(prefixReq.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}! Use tbhelp! for more info.`);
        }

        if (args.length == 1) {

            
            
            const args = message.content.slice(prefixExp.length).split(/ +/);
            const command = args.shift().toLowerCase();
            at = args[0].split('.').join(" ");

            if( at === null || at === "null" || at.length <= 3 ){
              return message.channel.send(`This search is invalid, ${message.author}! You must provide at least one argument that is longer than 3 letters. Use tbhelp! for more info.`);
            }

            
            message.channel.send(`${message.author}, you searched for (${at}) builds!`);
            return searchByAll(at, message);



          }

        if (args.length == 2) {
            
          
          if(ATPERM.includes(args[0].toLowerCase())){

            at = args[0];
            pri = args[1].split('.').join(" ");
            
            if((pri === null || pri === "null" || pri.length <= 3) || (at === null || at === "null" || at.length <= 3)){

              return message.channel.send(`This search is invalid, ${message.author}! You must provide 2 arguments which are longer than 3 letters. Use tbhelp! for more info.`);

            }

            else{

              message.channel.send(`${message.author}, you searched for (${at}) (${pri}) builds!`);
              return searchByAtPower(at, pri, message);

            }
 
        
          }

          else{

            pri = args[0].split('.').join(" ");
            sec = args[1].split('.').join(" ");

            if((pri === null || pri === "null" || pri.length <= 3) || (sec === null || sec === "null" || sec.length <= 3)){

              return message.channel.send(`This search is invalid, ${message.author}! You must provide 2 arguments which are longer than 3 letters. Use tbhelp! for more info.`);

            }

            else{

              message.channel.send(`${message.author}, you searched for (${pri}) (${sec}) builds!`);
              return searchByPriSec(pri,sec, message);

            }

          
          
          
          }



        
        }   

        if (args.length == 3) {
              
          
            at = args[0];
            pri = args[1].split('.').join(" ");
            sec = args [2].split('.').join(" ");

            if((pri === null || pri === "null" || pri.length <= 3) || (sec === null || sec === "null" || sec.length <= 3)|| (at === null || at === "null" || at.length <= 3)){

              return message.channel.send(`This search is invalid, ${message.author}! You must provide 2 arguments which are longer than 3 letters. Use tbhelp! for more info.`);

            }

            else{

              message.channel.send(`${message.author}, you searched for (${at}) (${pri}) (${sec}) builds!`);
              return searchByAtPriSec(at,pri,sec, message);

            }

       
          }

        else{

             return message.channel.send(`${message.author}, this bot needs 1-3 arguments to provide a build! Use tbhelp! for more info.`);
    
        }

    }



})

/* function sTest (term1, str){

    var n = str.search(new RegExp(term1, "i"));
    return n;

}


function atPriSearch(at,pri, message){

    var buildCount = 0;
    var plural = 'builds';
    const fs = require('fs');

    var files = fs.readdirSync('./builds/');
    
        
    //var slow = 0;
    files.forEach(function(file){
        //slow++;
        try {    
        const data = fs.readFileSync('./builds/'+file, 'utf8') 
        var priFixed = 'Primary Power Set: '+pri;
              


              if (sTest(at,data) >= 0 && sTest(priFixed,data) >= 0 ){
                    //slow--;
                    message.channel.send({files: ["./builds/"+file]});
                    buildCount++;
                    //console.log(data.indexOf(at));
                    //console.log(sTest(at,data));

            
                }

              }
              
          catch (error){

            console.log (error);
            return;

          }
              //console.log(data);
        });
            
    
    
    if(buildCount == 1){

        plural = 'build';

    }

    if (buildCount == 0){

      message.channel.send("That search failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");

    }

    else{
    
      message.channel.send(buildCount +" "+plural+" found!");

    }

}

function atPriSecSearch(at,pri,sec, message){

    var buildCount = 0;
    var plural = 'builds';
    const fs = require('fs');

    var files = fs.readdirSync('./builds/');
    
        

    files.forEach(function(file){

        try{    
        const data = fs.readFileSync('./builds/'+file, 'utf8') 
              
              var secFixed = 'Secondary Power Set: '+sec;
              var priFixed = 'Primary Power Set: '+pri;

              if (sTest(at,data) >= 0 && sTest(priFixed,data) >= 0 && sTest(secFixed,data) >= 0){

                    message.channel.send({files: ["./builds/"+file]});
                    buildCount++;


            
                }

              }
              
        catch (error){

          console.log (error);
          return;

        }

        });
            
    
    
    if(buildCount == 1){

        plural = 'build';

    }

    
    if (buildCount == 0){

      message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");

    }

    else{
    
      message.channel.send(buildCount +" "+plural+" found!");

    }

}

function priSecSearch(pri,sec, message){

  var buildCount = 0;
  var plural = 'builds';
  const fs = require('fs');

  var files = fs.readdirSync('./builds/');
  
      
  //var slow = 0;
  files.forEach(function(file){
      //slow++;
          
      const data = fs.readFileSync('./builds/'+file, 'utf8') 
          try{  
            var secFixed = 'Secondary Power Set: '+sec;
            var priFixed = 'Primary Power Set: '+pri;

            if (sTest(priFixed,data) >= 0 && sTest(secFixed,data) >= 0){
                  //slow--;
                  message.channel.send({files: ["./builds/"+file]});
                  buildCount++;
                  //console.log(data.indexOf(at));
                  //console.log(sTest(at,data));

          
              }

            }
            
            catch(error){

              console.log (error);
              return;

            }
            
            //console.log(data);
          });
          
  
  
  if(buildCount == 1){

      plural = 'build';

  }

  if (buildCount == 0){

    message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");

  }

  else{
  
    message.channel.send(buildCount +" "+plural+" found!");

  }

}

function expAtSearch(at, message){

  var fs=require('fs');
  plural = "builds";
  var buildsList = [];
  var files = fs.readdirSync('./builds/');
  
  

  buildsList = callFirstInArray(files, at, message);

  if (buildsList.length == 1){

    plural = "build";
  
  }
  
  if (buildsList.length == 0){

    message.channel.send(`${message.author}, your search for ${at} returned 0 builds! It's possible that your searched was formatted incorrectly, or that the dataset doesn't have that 
    particular build. Use "tbhelp!" for more info.`);
    return;

  }

  message.channel.send(buildsList.length +" "+plural+" found!");
  buildsList.forEach(element => message.channel.send({files: ["./builds/"+element]}));

}

function callFirstInArray(filesList, at, message) {
  
  var finalList = [];
  var plural = 'builds';

  number_processed = 0;
  for (var i = 0; i < filesList.length; i++){

    if(processLineByLine(filesList[i], at)){


      finalList.push(filesList[i]);

    };
    number_processed  = number_processed  + 1;

    if(number_processed === filesList.length){

      if(finalList.length==1){

        plural = "build"

      }

      return finalList;

    }

 }
     
  
};

function processLineByLine(file, at) {

  var result = false;

  var atMag= ('Magic '+ at).toLowerCase();
  var atNat= ('Natural '+ at).toLowerCase();
  var atSci= ('Science '+ at).toLowerCase();
  var atMut= ('Mutation '+ at).toLowerCase(); 
  var atTec= ('Technology '+ at).toLowerCase();
  var priM= ('Primary Power Set: ' + at).toLowerCase();



  LineReaderSync = require('line-reader-sync');
  lrs = new LineReaderSync('./builds/'+file);

  var lineCount = 0;
  while(lineCount <= 7){
    var line = lrs.readline();
    lineCount++;
    if(line === null){
      console.log("EOF");
      bar = false;
      }
    else if((((line.toLowerCase().includes(atMag))||(line.toLowerCase().includes(atMut))||(line.toLowerCase().includes(atSci))||(line.toLowerCase().includes(atNat))||(line.toLowerCase().includes(atTec))||(line.toLowerCase().includes(priM))) 
      && lineCount < 7 && lineCount > 2) ){
      console.log(lineCount);
      result = true;
    
    }
    
  }

  return result;
  
} */

async function searchByAtPriSec(at,pri,sec, message) {
  const fileStream = fs.createReadStream('list.txt');
  //const buildsFolder = './buildstest/';
  var buildsNo = "builds";
  //const fs = require('fs');
  var arr = [];

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  //const arr;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var Y = ";link;"
    var Z = line.slice(line.indexOf(Y) + Y.length);

    var atLower = "at: " + at.toLowerCase();
    var priLower = "primary power set: " + pri.toLowerCase();
    var secLower = "secondary power set: " + sec.toLowerCase();

    lineLower = line.toLowerCase();
    //console.log(`${Z}`);
    
    if (lineLower.includes(atLower) && lineLower.includes(priLower) && lineLower.includes(secLower)){
      arr.push(Z);
      //message.channel.send(`${Z}`);
    }
    
    //message.channel.send(`Line from file: ${Z}`);
    //if(arr !== undefined){
      
      //arr.forEach(element => message.channel.send({files: ["./buildstest/"+element]}));
     // console.log(arr.length);
    
    //}

  }

  if(arr.length == 1){

    buildsNo = "build";

  } 

  if(arr.length == 0){

    message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");
    return;
  
  } 
  
  message.channel.send("The bot found " + arr.length + " " + buildsNo + "!");
  
  arr.forEach(element => message.channel.send({files: ["./builds/"+element]}));
  
}

async function searchByPriSec(pri,sec, message) {
  const fileStream = fs.createReadStream('list.txt');
  var arr = [];
  var buildsNo = "builds";

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  //const arr;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var Y = ";link;"
    var Z = line.slice(line.indexOf(Y) + Y.length);

    var priLower = "primary power set: " + pri.toLowerCase();
    var secLower = "secondary power set: " + sec.toLowerCase();

    lineLower = line.toLowerCase();
    //console.log(`Line from file: ${Z}`);
    
    if (lineLower.includes(priLower) && lineLower.includes(secLower)){
      arr.push(Z);
      //message.channel.send(`Line from file: ${Z}`);
    }
    
    //message.channel.send(`Line from file: ${Z}`);
    //if(arr !== undefined){
    //console.log(arr.length);
    //}

  }

  if(arr.length == 1){

    buildsNo = "build";

  }
  
  if(arr.length == 0){

    message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");
    return;
  
  } 
  
  message.channel.send("The bot found " + arr.length + " " + buildsNo + "!");
  
  arr.forEach(element => message.channel.send({files: ["./builds/"+element]}));
  
}

async function searchByAtPower(at, pow, message) {
  const fileStream = fs.createReadStream('list.txt');
  var arr = [];
  var buildsNo = "builds";

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  //const arr;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var Y = ";link;"
    var Z = line.slice(line.indexOf(Y) + Y.length);

    var atLower = "at: " + at.toLowerCase();
    var priLower = "primary power set: " + pow.toLowerCase();
    var secLower = "secondary power set: " + pow.toLowerCase();

    lineLower = line.toLowerCase();
    //console.log(`Line from file: ${Z}`);
    
    if ((lineLower.includes(atLower) && lineLower.includes(secLower)) || (lineLower.includes(atLower) && lineLower.includes(priLower))){
      arr.push(Z);
      //message.channel.send(`Line from file: ${Z}`);
    }
    
    //message.channel.send(`Line from file: ${Z}`);
    //if(arr !== undefined){
    //console.log(arr.length);
    //}

  }

  if(arr.length == 1){

    buildsNo = "build";

  } 

  if(arr.length == 0){

    message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");
    return;
  
  } 
  
  message.channel.send("The bot found " + arr.length + " " + buildsNo + "!");
  
  arr.forEach(element => message.channel.send({files: ["./builds/"+element]}));
  
}

async function searchByAll(at, message) {
  const fileStream = fs.createReadStream('list.txt');
  var arr = [];
  var buildsNo = "builds";

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  //const arr;
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    var Y = ";link;"
    var Z = line.slice(line.indexOf(Y) + Y.length);

    var atLower = "at: " + at.toLowerCase();
    var priLower = "primary power set: " + at.toLowerCase();
    var secLower = "secondary power set: " + at.toLowerCase();

    lineLower = line.toLowerCase();
    //console.log(`Line from file: ${Z}`);
    
    if (lineLower.includes(atLower) || lineLower.includes(priLower) || lineLower.includes(secLower)){
      arr.push(Z);
      //message.channel.send(`Line from file: ${Z}`);
    }
    
    //message.channel.send(`Line from file: ${Z}`);
    //if(arr !== undefined){
    //console.log(arr.length);
    //}

  }
  
  if(arr.length == 1){

    buildsNo = "build";

  } 

  if(arr.length == 0){

    message.channel.send("That searched failed to find a build! Either the dataset doesn't have one, or the search was invalid. Use tbhelp! for more info.");
    return;
  
  }  
  
  message.channel.send("The bot found " + arr.length + " " + buildsNo + "!");
  
  arr.forEach(element => message.channel.send({files: ["./builds/"+element]}));
  
}

client.login(token);