const express=require('express');
const ejs=require('ejs');
const mongoose=require('mongoose');
require('dotenv').config()
const url=process.env.MONGODB_URL;
mongoose.connect(url,{useUnifiedTopology:1,useNewUrlParser:1});
const app=express();
const Http=require('http').createServer(app);
const Port = process.env.PORT || 4000 ;

Http.listen(Port);

const io=require('socket.io');
const bodyParser=require('body-parser');
const http = require("https");
var nodemailer = require('nodemailer');
const { triggerAsyncId } = require('async_hooks');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine','ejs');

const UsersSchema=new mongoose.Schema({
  FName:String,
  LName:String,
  Email:String,
  Password:String,
  PhoneNumber:String,
})
const User=mongoose.model('user',UsersSchema);

function CricketApicall1(){

  const options = {
    "method": "GET",
    "hostname": "cricket-live-data.p.rapidapi.com",
    "port": null,
    "path": "/match/2575561",
    "headers": {
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      "useQueryString": true
    }
  };

 return new Promise(function (resolve){
    const req = http.request(options, function (res) {
      const chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        const body = JSON.parse(chunks);
        resolve(body);
      });
    });
    req.end();
  })
  
};

function CricketApicall2(){

  const options = {
    "method": "GET",
    "hostname": "cricket-live-data.p.rapidapi.com",
    "port": null,
    "path": "/match/2432997",
    "headers": {
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      "useQueryString": true
    }
  };

 return new Promise(function (resolve){
    const req = http.request(options, function (res) {
      const chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        const body = JSON.parse(chunks);
        resolve(body);
      });
    });
    req.end();
  })
  
};

function CricketApicall3(){

  const options = {
    "method": "GET",
    "hostname": "cricket-live-data.p.rapidapi.com",
    "port": null,
    "path": "/match/2433001",
    "headers": {
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      "useQueryString": true
    }
  };

 return new Promise(function (resolve){
    const req = http.request(options, function (res) {
      const chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        const body = JSON.parse(chunks);
        resolve(body);
      });
    });
    req.end();
  })
  
};
function CricketApicall4(){

  const options = {
    "method": "GET",
    "hostname": "cricket-live-data.p.rapidapi.com",
    "port": null,
    "path": "/match/2433007",
    "headers": {
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
      "useQueryString": true
    }
  };

 return new Promise(function (resolve){
    const req = http.request(options, function (res) {
      const chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        const body = JSON.parse(chunks);
        resolve(body);
      });
    });
    req.end();
  })
  
};
async function DataObtained(){
  const body1=await CricketApicall1();
  const body2=await CricketApicall2();
  const body3=await CricketApicall3();
  const body4=await CricketApicall4();
 
var Body=[];
  var Checker=0;

/*fistbody*/
  var AwayCode1=body1.results.fixture.away.code;
  var HomeCode1=body1.results.fixture.home.code;
  if(AwayCode1.length===0){
    var str=body1.results.fixture.away.name;
    var Changes=str.match(/\b(\w)/g).join('');
    AwayCode1=Changes;
  }
  if(HomeCode1.length===0){
    var str=body1.results.fixture.home.name;
    var Changes=str.match(/\b(\w)/g).join('');
    HomeCode1=Changes;
  }


  if(body1.results.live_details.scorecard[0].current===true){
  var Body1=[];
  Checker=0;
  Body1.push(Checker);
    var BatsmensArray =body1.results.live_details.scorecard[0].batting;
    BatsmensArray.sort(function(a,b){
       return b.runs-a.runs;
    })
    Body1.push(BatsmensArray);
  var BowlingArray=body1.results.live_details.scorecard[0].bowling;
  BowlingArray.sort(function(a,b){
    return b.wickets-a.wickets;
 })
 Body1.push(BowlingArray);
 var CurrBatsmens=BatsmensArray;
 var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
 function playingBatsmen(currBatsmen){
   return currBatsmen.how_out==="not out";
 }
 Body1.push(PlayingBatsmenArray);
 var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
  if(Math.round(Bowler.overs)!==Bowler.overs){
    return Bowler;
  }
}
Body1.push(CurrentBowler);
var obj={
  HomeCode:HomeCode1,
  AwayCode:AwayCode1,
};
console.log(obj);
Body.push(Body1);
}
else if(body1.results.live_details.scorecard[1].current===true){
  var Body1=[];
  Checker=1;
  Body1.push(Checker);
  var BatsmensArray =body1.results.live_details.scorecard[1].batting;
  BatsmensArray.sort(function(a,b){
     return b.runs-a.runs;
  })
  Body1.push(BatsmensArray);
var BowlingArray=body1.results.live_details.scorecard[1].bowling;
BowlingArray.sort(function(a,b){
  return b.wickets-a.wickets;
})
Body1.push(BowlingArray);
var CurrBatsmens=BatsmensArray;
var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
function playingBatsmen(currBatsmen){
 return currBatsmen.how_out==="not out";
}
Body1.push(PlayingBatsmenArray);
var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
if(Math.round(Bowler.overs)!==Bowler.overs){
  return Bowler;
}
}
Body1.push(CurrentBowler);
var obj={
  HomeCode:HomeCode1,
  AwayCode:AwayCode1,
};
Body1.push(obj);
Body.push(Body1);
}

if(Body[0][3].length===1){
 
  if(body1.results.live_details.scorecard[Body[0][0]].still_to_bat.length!==0){
    Body[0][3].push(body1.results.live_details.scorecard[Body[0][0]].still_to_bat[0]);
  }
  else{
    Body[0][3].push(Body[0][1][Body[0][1].length-1]);
  }
}

if(Body[0][3][1].runs===undefined){
  Body[0][3][1].runs=0;
};
var Innings1T1N=undefined;
var Innings1T1R=undefined;
var Innings1T1W=undefined;
if(Body[0][0]===1){
Innings1T1N=body1.results.live_details.scorecard[0].title+"1";
Innings1T1R=body1.results.live_details.scorecard[0].runs;
Innings1T1W=body1.results.live_details.scorecard[0].wickets;
}


/*second Body*/
var AwayCode2=body2.results.fixture.away.code;
var HomeCode2=body2.results.fixture.home.code;
if(AwayCode2.length===0){
  var str=body1.results.fixture.away.name;
  var Changes=str.match(/\b(\w)/g).join('');
  AwayCode2=Changes;
}
if(HomeCode2.length===0){
  var str=body2.results.fixture.home.name;
  var Changes=str.match(/\b(\w)/g).join('');
  HomeCode2=Changes;
}

if(body2.results.live_details.scorecard[0].current===true){
  var Body2=[];
  Checker=0;
  Body2.push(Checker);
    var BatsmensArray =body2.results.live_details.scorecard[0].batting;
    BatsmensArray.sort(function(a,b){
       return b.runs-a.runs;
    })
    Body2.push(BatsmensArray);
  var BowlingArray=body2.results.live_details.scorecard[0].bowling;
  BowlingArray.sort(function(a,b){
    return b.wickets-a.wickets;
 })
 Body2.push(BowlingArray);
 var CurrBatsmens=BatsmensArray;
 var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
 function playingBatsmen(currBatsmen){
   return currBatsmen.how_out==="not out";
 }
 Body2.push(PlayingBatsmenArray);
 var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
  if(Math.round(Bowler.overs)!==Bowler.overs){
    return Bowler;
  }
}
Body2.push(CurrentBowler);
var obj={
  HomeCode:HomeCode2,
  AwayCode:AwayCode2,
};
Body2.push(obj);
Body.push(Body2);
}
else if(body2.results.live_details.scorecard[1].current===true){
  var Body2=[];
  Checker=1;
  Body2.push(Checker);
  var BatsmensArray =body2.results.live_details.scorecard[1].batting;
  BatsmensArray.sort(function(a,b){
     return b.runs-a.runs;
  })
  Body2.push(BatsmensArray);
var BowlingArray=body2.results.live_details.scorecard[1].bowling;
BowlingArray.sort(function(a,b){
  return b.wickets-a.wickets;
})
Body2.push(BowlingArray);
var CurrBatsmens=BatsmensArray;
var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
function playingBatsmen(currBatsmen){
 return currBatsmen.how_out==="not out";
}
Body2.push(PlayingBatsmenArray);
var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
if(Math.round(Bowler.overs)!==Bowler.overs){
  return Bowler;
}
}
Body2.push(CurrentBowler);
var obj={
  HomeCode:HomeCode2,
  AwayCode:AwayCode2,
};
Body2.push(obj);
Body.push(Body2);
}

if(Body[1][3].length===1){
 
  if(body1.results.live_details.scorecard[Body[1][0]].still_to_bat.length!==0){
    Body[1][3].push(body1.results.live_details.scorecard[Body[1][0]].still_to_bat[0]);
  }
  else{
    Body[1][3].push(Body[1][1][Body[1][1].length-1]);
  }
}
if(Body[1][3][1].runs===undefined){
  Body[1][3][1].runs=0;
};
var Innings1T2N=undefined;
var Innings1T2R=undefined;
var Innings1T2W=undefined;
if(Body[1][0]===1){
Innings1T2N=body2.results.live_details.scorecard[0].title+"1";
Innings1T2R=body2.results.live_details.scorecard[0].runs;
Innings1T2W=body2.results.live_details.scorecard[0].wickets;
}

/*third body*/
var AwayCode3=body3.results.fixture.away.code;
var HomeCode3=body3.results.fixture.home.code;
if(AwayCode3.length===0){
  var str=body3.results.fixture.away.name;
  var Changes=str.match(/\b(\w)/g).join('');
  AwayCode3=Changes;
}
if(HomeCode3.length===0){
  var str=body3.results.fixture.home.name;
  var Changes=str.match(/\b(\w)/g).join('');
  HomeCode3=Changes;
}

if(body3.results.live_details.scorecard[0].current===true){
  var Body3=[];
  Checker=0;
  Body3.push(Checker);
    var BatsmensArray =body3.results.live_details.scorecard[0].batting;
    BatsmensArray.sort(function(a,b){
       return b.runs-a.runs;
    })
    Body3.push(BatsmensArray);
  var BowlingArray=body3.results.live_details.scorecard[0].bowling;
  BowlingArray.sort(function(a,b){
    return b.wickets-a.wickets;
 })
 Body3.push(BowlingArray);
 var CurrBatsmens=BatsmensArray;
 var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
 function playingBatsmen(currBatsmen){
   return currBatsmen.how_out==="not out";
 }
 Body3.push(PlayingBatsmenArray);
 var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
  if(Math.round(Bowler.overs)!==Bowler.overs){
    return Bowler;
  }
}
Body3.push(CurrentBowler);
var obj={
  HomeCode:HomeCode3,
  AwayCode:AwayCode3,
};
Body3.push(obj);
Body.push(Body3);
}
else if(body3.results.live_details.scorecard[1].current===true){
  var Body3=[];
  Checker=1;
  Body3.push(Checker);
  var BatsmensArray =body3.results.live_details.scorecard[1].batting;
  BatsmensArray.sort(function(a,b){
     return b.runs-a.runs;
  })
  Body3.push(BatsmensArray);
var BowlingArray=body3.results.live_details.scorecard[1].bowling;
BowlingArray.sort(function(a,b){
  return b.wickets-a.wickets;
})
Body3.push(BowlingArray);
var CurrBatsmens=BatsmensArray;
var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
function playingBatsmen(currBatsmen){
 return currBatsmen.how_out==="not out";
}
Body3.push(PlayingBatsmenArray);
var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
if(Math.round(Bowler.overs)!==Bowler.overs){
  return Bowler;
}
}
Body3.push(CurrentBowler);
var obj={
  HomeCode:HomeCode3,
  AwayCode:AwayCode3,
};
Body3.push(obj);
Body.push(Body3);
}

if(Body[2][3].length===1){
 
  if(body1.results.live_details.scorecard[Body[2][0]].still_to_bat.length!==0){
    Body[2][3].push(body1.results.live_details.scorecard[Body[2][0]].still_to_bat[0]);
  }
  else{
    Body[2][3].push(Body[2][1][Body[2][1].length-1]);
  }
}
if(Body[2][3][1].runs===undefined){
  Body[2][3][1].runs=0;
};
var Innings1T3N=undefined;
var Innings1T3R=undefined;
var Innings1T3W=undefined;
if(Body[2][0]===1){
Innings1T3N=body3.results.live_details.scorecard[0].title+"1";
Innings1T3R=body3.results.live_details.scorecard[0].runs;
Innings1T3W=body3.results.live_details.scorecard[0].wickets;
}

/*forth data*/
var AwayCode4=body4.results.fixture.away.code;
var HomeCode4=body4.results.fixture.home.code;
if(AwayCode4.length===0){
  var str=body4.results.fixture.away.name;
  var Changes=str.match(/\b(\w)/g).join('');
  AwayCode4=Changes;
}
if(HomeCode4.length===0){
  var str=body4.results.fixture.home.name;
  var Changes=str.match(/\b(\w)/g).join('');
  HomeCode4=Changes;
}

if(body4.results.live_details.scorecard[0].current===true){
  var Body4=[];
  Checker=0;
  Body4.push(Checker);
    var BatsmensArray =body4.results.live_details.scorecard[0].batting;
    BatsmensArray.sort(function(a,b){
       return b.runs-a.runs;
    })
    Body4.push(BatsmensArray);
  var BowlingArray=body4.results.live_details.scorecard[0].bowling;
  BowlingArray.sort(function(a,b){
    return b.wickets-a.wickets;
 })
 Body4.push(BowlingArray);
 var CurrBatsmens=BatsmensArray;
 var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
 function playingBatsmen(currBatsmen){
   return currBatsmen.how_out==="not out";
 }
 Body4.push(PlayingBatsmenArray);
 var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
  if(Math.round(Bowler.overs)!==Bowler.overs){
    return Bowler;
  }
}
Body4.push(CurrentBowler);
var obj={
  HomeCode:HomeCode4,
  AwayCode:AwayCode4,
};
Body4.push(obj);
Body.push(Body4);
}
else if(body4.results.live_details.scorecard[1].current===true){
  var Body4=[];
  Checker=1;
  Body4.push(Checker);
  var BatsmensArray =body4.results.live_details.scorecard[1].batting;
  BatsmensArray.sort(function(a,b){
     return b.runs-a.runs;
  })
  Body4.push(BatsmensArray);
var BowlingArray=body4.results.live_details.scorecard[1].bowling;
BowlingArray.sort(function(a,b){
  return b.wickets-a.wickets;
})
Body4.push(BowlingArray);
var CurrBatsmens=BatsmensArray;
var PlayingBatsmenArray=CurrBatsmens.filter(playingBatsmen);
function playingBatsmen(currBatsmen){
 return currBatsmen.how_out==="not out";
}
Body4.push(PlayingBatsmenArray);
var CurrentBowler=BowlingArray.find(CurrBowler)
function CurrBowler(Bowler){
if(Math.round(Bowler.overs)!==Bowler.overs){
  return Bowler;
}
}
Body4.push(CurrentBowler);
var obj={
  HomeCode:HomeCode4,
  AwayCode:AwayCode4,
};
Body4.push(obj);
Body.push(Body4);
}

if(Body[3][3].length===1){
 
  if(body1.results.live_details.scorecard[Body[3][0]].still_to_bat.length!==0){
    Body[3][3].push(body1.results.live_details.scorecard[Body[3][0]].still_to_bat[0]);
  }
  else{
    Body[3][3].push(Body[3][1][Body[3][1].length-1]);
  }
}
if(Body[3][3][1].runs===undefined){
  Body[3][3][1].runs=0;
};
var Innings1T4N=undefined;
var Innings1T4R=undefined;
var Innings1T4W=undefined;
if(Body[3][0]===1){
Innings1T4N=body4.results.live_details.scorecard[0].title+" 1";
Innings1T4R=body4.results.live_details.scorecard[0].runs;
Innings1T4W=body4.results.live_details.scorecard[0].wickets;
}

app.get('/',function(req,res){
  res.render('mainPage',{M1Toss:body1.results.live_details.match_summary.toss,M1Team1:Body[0][5].AwayCode,M1Team2:Body[0][5].HomeCode,
    M1Innings:body1.results.live_details.scorecard[Body[0][0]].innings_number,M1Runs:body1.results.live_details.scorecard[Body[0][0]].runs,
    M1Wickets:body1.results.live_details.scorecard[Body[0][0]].wickets,M1Overs:body1.results.live_details.scorecard[Body[0][0]].overs,
    M1Batsmen1:Body[0][1][0].player_name,M1BatsMen1Runs:Body[0][1][0].runs,M1Batsmen2:Body[0][1][1].player_name,M1BatsMen2Runs:Body[0][1][1].runs,
    M1Batsmen3:Body[0][1][2].player_name,M1BatsMen3Runs:Body[0][1][2].runs,M1Batsmen4:Body[0][1][3].player_name,M1BatsMen4Runs:Body[0][1][3].runs,
    M1Bowler1Name:Body[0][2][0].player_name,M1Bowler1GivenRuns:Body[0][2][0].runs_conceded,M1Bowler1Wickets:Body[0][2][0].wickets,
    M1Bowler2Name:Body[0][2][1].player_name,M1Bowler2GivenRuns:Body[0][2][1].runs_conceded,M1Bowler2Wickets:Body[0][2][1].wickets,
    M1Bowler3Name:Body[0][2][2].player_name,M1Bowler3GivenRuns:Body[0][2][2].runs_conceded,M1Bowler3Wickets:Body[0][2][2].wickets,
    M1Bowler4Name:Body[0][2][3].player_name,M1Bowler4GivenRuns:Body[0][2][3].runs_conceded,M1Bowler4Wickets:Body[0][2][3].wickets,
    M1PlayingBatsmen1Name:Body[0][3][0].player_name, M1PlayingBatsmen1Runs:Body[0][3][0].runs,
    M1PlayingBatsmen2Name:Body[0][3][1].player_name, M1PlayingBatsmen2Runs:Body[0][3][1].runs,
    M1CurrentBowlerName:Body[0][4].player_name,M1CurrentBowlerGivenRuns:Body[0][4].runs_conceded,M1CurrentBowlerWickets:Body[0][4].wickets,
    M1CurrentBowlerOvers:Body[0][4].overs,Innings1T1Name:Innings1T1N,Innings1T1Runs:Innings1T1R,Innings1T1Wickets:Innings1T1W,
    M2Toss:body2.results.live_details.match_summary.toss,M2Team1:Body[1][5].AwayCode,M2Team2:Body[1][5].HomeCode,
    M2Innings:body2.results.live_details.scorecard[Body[1][0]].innings_number,M2Runs:body2.results.live_details.scorecard[Body[1][0]].runs,
    M2Wickets:body2.results.live_details.scorecard[Body[1][0]].wickets,M2Overs:body2.results.live_details.scorecard[Body[1][0]].overs,
    M2Batsmen1:Body[1][1][0].player_name,M2BatsMen1Runs:Body[1][1][0].runs,M2Batsmen2:Body[1][1][1].player_name,M2BatsMen2Runs:Body[1][1][1].runs,
    M2Batsmen3:Body[1][1][2].player_name,M2BatsMen3Runs:Body[1][1][2].runs,M2Batsmen4:Body[1][1][3].player_name,M2BatsMen4Runs:Body[1][1][3].runs,
    M2Bowler1Name:Body[1][2][0].player_name,M2Bowler1GivenRuns:Body[1][2][0].runs_conceded,M2Bowler1Wickets:Body[1][2][0].wickets,
    M2Bowler2Name:Body[1][2][1].player_name,M2Bowler2GivenRuns:Body[1][2][1].runs_conceded,M2Bowler2Wickets:Body[1][2][1].wickets,
    M2Bowler3Name:Body[1][2][2].player_name,M2Bowler3GivenRuns:Body[1][2][2].runs_conceded,M2Bowler3Wickets:Body[1][2][2].wickets,
    M2Bowler4Name:Body[1][2][3].player_name,M2Bowler4GivenRuns:Body[1][2][3].runs_conceded,M2Bowler4Wickets:Body[1][2][3].wickets,
    M2PlayingBatsmen1Name:Body[1][3][0].player_name, M2PlayingBatsmen1Runs:Body[1][3][0].runs,
    M2PlayingBatsmen2Name:Body[1][3][1].player_name, M2PlayingBatsmen2Runs:Body[1][3][1].runs,
    M2CurrentBowlerName:Body[1][4].player_name,M2CurrentBowlerGivenRuns:Body[1][4].runs_conceded,M2CurrentBowlerWickets:Body[1][4].wickets,
    M2CurrentBowlerOvers:Body[1][4].overs,Innings1T2Name:Innings1T2N,Innings1T2Runs:Innings1T2R,Innings1T2Wickets:Innings1T2W,
    M3Toss:body3.results.live_details.match_summary.toss,M3Team1:Body[2][5].AwayCode,M3Team2:Body[2][5].HomeCode,
    M3Innings:body3.results.live_details.scorecard[Body[2][0]].innings_number,M3Runs:body3.results.live_details.scorecard[Body[2][0]].runs,
    M3Wickets:body3.results.live_details.scorecard[Body[2][0]].wickets,M3Overs:body3.results.live_details.scorecard[Body[2][0]].overs,
    M3Batsmen1:Body[2][1][0].player_name,M3BatsMen1Runs:Body[2][1][0].runs,M3Batsmen2:Body[2][1][1].player_name,M3BatsMen2Runs:Body[2][1][1].runs,
    M3Batsmen3:Body[2][1][2].player_name,M3BatsMen3Runs:Body[2][1][2].runs,M3Batsmen4:Body[2][1][3].player_name,M3BatsMen4Runs:Body[2][1][3].runs,
    M3Bowler1Name:Body[2][2][0].player_name,M3Bowler1GivenRuns:Body[2][2][0].runs_conceded,M3Bowler1Wickets:Body[2][2][0].wickets,
    M3Bowler2Name:Body[2][2][1].player_name,M3Bowler2GivenRuns:Body[2][2][1].runs_conceded,M3Bowler2Wickets:Body[2][2][1].wickets,
    M3Bowler3Name:Body[2][2][2].player_name,M3Bowler3GivenRuns:Body[2][2][2].runs_conceded,M3Bowler3Wickets:Body[2][2][2].wickets,
    M3Bowler4Name:Body[2][2][3].player_name,M3Bowler4GivenRuns:Body[2][2][3].runs_conceded,M3Bowler4Wickets:Body[2][2][3].wickets,
    M3PlayingBatsmen1Name:Body[2][3][0].player_name, M3PlayingBatsmen1Runs:Body[2][3][0].runs,
    M3PlayingBatsmen2Name:Body[2][3][1].player_name, M3PlayingBatsmen2Runs:Body[2][3][1].runs,
    M3CurrentBowlerName:Body[2][4].player_name,M3CurrentBowlerGivenRuns:Body[2][4].runs_conceded,M3CurrentBowlerWickets:Body[2][4].wickets,
    M3CurrentBowlerOvers:Body[2][4].overs,Innings1T3Name:Innings1T3N,Innings1T3Runs:Innings1T3R,Innings1T3Wickets:Innings1T3W,
    M4Toss:body4.results.live_details.match_summary.toss,M4Team1:Body[3][5].AwayCode,M4Team2:Body[3][5].HomeCode,
    M4Innings:body4.results.live_details.scorecard[Body[3][0]].innings_number,M4Runs:body4.results.live_details.scorecard[Body[3][0]].runs,
    M4Wickets:body4.results.live_details.scorecard[Body[3][0]].wickets,M4Overs:body4.results.live_details.scorecard[Body[3][0]].overs,
    M4Batsmen1:Body[3][1][0].player_name,M4BatsMen1Runs:Body[3][1][0].runs,M4Batsmen2:Body[3][1][1].player_name,M4BatsMen2Runs:Body[3][1][1].runs,
    M4Batsmen3:Body[3][1][2].player_name,M4BatsMen3Runs:Body[3][1][2].runs,M4Batsmen4:Body[3][1][3].player_name,M4BatsMen4Runs:Body[3][1][3].runs,
    M4Bowler1Name:Body[3][2][0].player_name,M4Bowler1GivenRuns:Body[3][2][0].runs_conceded,M4Bowler1Wickets:Body[3][2][0].wickets,
    M4Bowler2Name:Body[3][2][1].player_name,M4Bowler2GivenRuns:Body[3][2][1].runs_conceded,M4Bowler2Wickets:Body[3][2][1].wickets,
    M4Bowler3Name:Body[3][2][2].player_name,M4Bowler3GivenRuns:Body[3][2][2].runs_conceded,M4Bowler3Wickets:Body[3][2][2].wickets,
    M4Bowler4Name:Body[3][2][3].player_name,M4Bowler4GivenRuns:Body[3][2][3].runs_conceded,M4Bowler4Wickets:Body[3][2][3].wickets,
    M4PlayingBatsmen1Name:Body[3][3][0].player_name, M4PlayingBatsmen1Runs:Body[3][3][0].runs,
    M4PlayingBatsmen2Name:Body[3][3][1].player_name, M4PlayingBatsmen2Runs:Body[3][3][1].runs,
    M4CurrentBowlerName:Body[3][4].player_name,M4CurrentBowlerGivenRuns:Body[3][4].runs_conceded,M4CurrentBowlerWickets:Body[3][4].wickets,
    M4CurrentBowlerOvers:Body[3][4].overs,Innings1T4Name:Innings1T4N,Innings1T4Runs:Innings1T4R,Innings1T4Wickets:Innings1T4W,});
})
app.get('/livescore',function(req,res){
  res.render('livescore',{M1Toss:body1.results.live_details.match_summary.toss,M1Team1:Body[0][5].AwayCode,M1Team2:Body[0][5].HomeCode,
    M1Innings:body1.results.live_details.scorecard[Body[0][0]].innings_number,M1Runs:body1.results.live_details.scorecard[Body[0][0]].runs,
    M1Wickets:body1.results.live_details.scorecard[Body[0][0]].wickets,M1Overs:body1.results.live_details.scorecard[Body[0][0]].overs,
    M1Batsmen1:Body[0][1][0].player_name,M1BatsMen1Runs:Body[0][1][0].runs,M1Batsmen2:Body[0][1][1].player_name,M1BatsMen2Runs:Body[0][1][1].runs,
    M1Batsmen3:Body[0][1][2].player_name,M1BatsMen3Runs:Body[0][1][2].runs,M1Batsmen4:Body[0][1][3].player_name,M1BatsMen4Runs:Body[0][1][3].runs,
    M1Bowler1Name:Body[0][2][0].player_name,M1Bowler1GivenRuns:Body[0][2][0].runs_conceded,M1Bowler1Wickets:Body[0][2][0].wickets,
    M1Bowler2Name:Body[0][2][1].player_name,M1Bowler2GivenRuns:Body[0][2][1].runs_conceded,M1Bowler2Wickets:Body[0][2][1].wickets,
    M1Bowler3Name:Body[0][2][2].player_name,M1Bowler3GivenRuns:Body[0][2][2].runs_conceded,M1Bowler3Wickets:Body[0][2][2].wickets,
    M1Bowler4Name:Body[0][2][3].player_name,M1Bowler4GivenRuns:Body[0][2][3].runs_conceded,M1Bowler4Wickets:Body[0][2][3].wickets,
    M1PlayingBatsmen1Name:Body[0][3][0].player_name, M1PlayingBatsmen1Runs:Body[0][3][0].runs,
    M1PlayingBatsmen2Name:Body[0][3][1].player_name, M1PlayingBatsmen2Runs:Body[0][3][1].runs,
    M1CurrentBowlerName:Body[0][4].player_name,M1CurrentBowlerGivenRuns:Body[0][4].runs_conceded,M1CurrentBowlerWickets:Body[0][4].wickets,
    M1CurrentBowlerOvers:Body[0][4].overs,Innings1T1Name:Innings1T1N,Innings1T1Runs:Innings1T1R,Innings1T1Wickets:Innings1T1W,
    M2Toss:body2.results.live_details.match_summary.toss,M2Team1:Body[1][5].AwayCode,M2Team2:Body[1][5].HomeCode,
    M2Innings:body2.results.live_details.scorecard[Body[1][0]].innings_number,M2Runs:body2.results.live_details.scorecard[Body[1][0]].runs,
    M2Wickets:body2.results.live_details.scorecard[Body[1][0]].wickets,M2Overs:body2.results.live_details.scorecard[Body[1][0]].overs,
    M2Batsmen1:Body[1][1][0].player_name,M2BatsMen1Runs:Body[1][1][0].runs,M2Batsmen2:Body[1][1][1].player_name,M2BatsMen2Runs:Body[1][1][1].runs,
    M2Batsmen3:Body[1][1][2].player_name,M2BatsMen3Runs:Body[1][1][2].runs,M2Batsmen4:Body[1][1][3].player_name,M2BatsMen4Runs:Body[1][1][3].runs,
    M2Bowler1Name:Body[1][2][0].player_name,M2Bowler1GivenRuns:Body[1][2][0].runs_conceded,M2Bowler1Wickets:Body[1][2][0].wickets,
    M2Bowler2Name:Body[1][2][1].player_name,M2Bowler2GivenRuns:Body[1][2][1].runs_conceded,M2Bowler2Wickets:Body[1][2][1].wickets,
    M2Bowler3Name:Body[1][2][2].player_name,M2Bowler3GivenRuns:Body[1][2][2].runs_conceded,M2Bowler3Wickets:Body[1][2][2].wickets,
    M2Bowler4Name:Body[1][2][3].player_name,M2Bowler4GivenRuns:Body[1][2][3].runs_conceded,M2Bowler4Wickets:Body[1][2][3].wickets,
    M2PlayingBatsmen1Name:Body[1][3][0].player_name, M2PlayingBatsmen1Runs:Body[1][3][0].runs,
    M2PlayingBatsmen2Name:Body[1][3][1].player_name, M2PlayingBatsmen2Runs:Body[1][3][1].runs,
    M2CurrentBowlerName:Body[1][4].player_name,M2CurrentBowlerGivenRuns:Body[1][4].runs_conceded,M2CurrentBowlerWickets:Body[1][4].wickets,
    M2CurrentBowlerOvers:Body[1][4].overs,Innings1T2Name:Innings1T2N,Innings1T2Runs:Innings1T2R,Innings1T2Wickets:Innings1T2W,
    M3Toss:body3.results.live_details.match_summary.toss,M3Team1:Body[2][5].AwayCode,M3Team2:Body[2][5].HomeCode,
    M3Innings:body3.results.live_details.scorecard[Body[2][0]].innings_number,M3Runs:body3.results.live_details.scorecard[Body[2][0]].runs,
    M3Wickets:body3.results.live_details.scorecard[Body[2][0]].wickets,M3Overs:body3.results.live_details.scorecard[Body[2][0]].overs,
    M3Batsmen1:Body[2][1][0].player_name,M3BatsMen1Runs:Body[2][1][0].runs,M3Batsmen2:Body[2][1][1].player_name,M3BatsMen2Runs:Body[2][1][1].runs,
    M3Batsmen3:Body[2][1][2].player_name,M3BatsMen3Runs:Body[2][1][2].runs,M3Batsmen4:Body[2][1][3].player_name,M3BatsMen4Runs:Body[2][1][3].runs,
    M3Bowler1Name:Body[2][2][0].player_name,M3Bowler1GivenRuns:Body[2][2][0].runs_conceded,M3Bowler1Wickets:Body[2][2][0].wickets,
    M3Bowler2Name:Body[2][2][1].player_name,M3Bowler2GivenRuns:Body[2][2][1].runs_conceded,M3Bowler2Wickets:Body[2][2][1].wickets,
    M3Bowler3Name:Body[2][2][2].player_name,M3Bowler3GivenRuns:Body[2][2][2].runs_conceded,M3Bowler3Wickets:Body[2][2][2].wickets,
    M3Bowler4Name:Body[2][2][3].player_name,M3Bowler4GivenRuns:Body[2][2][3].runs_conceded,M3Bowler4Wickets:Body[2][2][3].wickets,
    M3PlayingBatsmen1Name:Body[2][3][0].player_name, M3PlayingBatsmen1Runs:Body[2][3][0].runs,
    M3PlayingBatsmen2Name:Body[2][3][1].player_name, M3PlayingBatsmen2Runs:Body[2][3][1].runs,
    M3CurrentBowlerName:Body[2][4].player_name,M3CurrentBowlerGivenRuns:Body[2][4].runs_conceded,M3CurrentBowlerWickets:Body[2][4].wickets,
    M3CurrentBowlerOvers:Body[2][4].overs,Innings1T3Name:Innings1T3N,Innings1T3Runs:Innings1T3R,Innings1T3Wickets:Innings1T3W,
    M4Toss:body4.results.live_details.match_summary.toss,M4Team1:Body[3][5].AwayCode,M4Team2:Body[3][5].HomeCode,
    M4Innings:body4.results.live_details.scorecard[Body[3][0]].innings_number,M4Runs:body4.results.live_details.scorecard[Body[3][0]].runs,
    M4Wickets:body4.results.live_details.scorecard[Body[3][0]].wickets,M4Overs:body4.results.live_details.scorecard[Body[3][0]].overs,
    M4Batsmen1:Body[3][1][0].player_name,M4BatsMen1Runs:Body[3][1][0].runs,M4Batsmen2:Body[3][1][1].player_name,M4BatsMen2Runs:Body[3][1][1].runs,
    M4Batsmen3:Body[3][1][2].player_name,M4BatsMen3Runs:Body[3][1][2].runs,M4Batsmen4:Body[3][1][3].player_name,M4BatsMen4Runs:Body[3][1][3].runs,
    M4Bowler1Name:Body[3][2][0].player_name,M4Bowler1GivenRuns:Body[3][2][0].runs_conceded,M4Bowler1Wickets:Body[3][2][0].wickets,
    M4Bowler2Name:Body[3][2][1].player_name,M4Bowler2GivenRuns:Body[3][2][1].runs_conceded,M4Bowler2Wickets:Body[3][2][1].wickets,
    M4Bowler3Name:Body[3][2][2].player_name,M4Bowler3GivenRuns:Body[3][2][2].runs_conceded,M4Bowler3Wickets:Body[3][2][2].wickets,
    M4Bowler4Name:Body[3][2][3].player_name,M4Bowler4GivenRuns:Body[3][2][3].runs_conceded,M4Bowler4Wickets:Body[3][2][3].wickets,
    M4PlayingBatsmen1Name:Body[3][3][0].player_name, M4PlayingBatsmen1Runs:Body[3][3][0].runs,
    M4PlayingBatsmen2Name:Body[3][3][1].player_name, M4PlayingBatsmen2Runs:Body[3][3][1].runs,
    M4CurrentBowlerName:Body[3][4].player_name,M4CurrentBowlerGivenRuns:Body[3][4].runs_conceded,M4CurrentBowlerWickets:Body[3][4].wickets,
    M4CurrentBowlerOvers:Body[3][4].overs,Innings1T4Name:Innings1T4N,Innings1T4Runs:Innings1T4R,Innings1T4Wickets:Innings1T4W,});
})

app.post('/userEntry',function(req,res){
  var FNAME=req.body.fName;
  var LNAME=req.body.lName;
  var EMAIL=req.body.email;
  var PASSWORD=req.body.password;
  if(EMAIL!==undefined){
      var EMAILL=EMAIL.toLowerCase();
      var UserInfo=User({
          FName:FNAME,
          LName:LNAME,
          Email:EMAILL,
          Password:PASSWORD,
      });
      var A=false;
      globalThis.userinfo=UserInfo;
      User.find(function(err,users){
          users.forEach(function(user){
              if(user.Email===EMAILL){
                A=true;
              }
          });
          });
          if(A===true){
            res.render('signup',{Register:"This Email Already Exists"});
          }
          else if(A===false){
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'cricw808@gmail.com',
                pass: process.env.MAIL_PASS
              }
            });
          
            var mailOptions = {
              from: 'cricw808@gmail.com',
              to: UserInfo.Email,
              subject: UserInfo.FName +"  "+'  Please Verify Your Email.',
              html: "<h3>Click the Below Link To Confirm Your Email.</h3> <a href='https://obscure-gorge-49695.herokuapp.com/Confirmation'>Login</a>"
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              }
              else{
                res.render('Emailcheck');
              }
             });
          app.post("/login",function(req,res){
            UserInfo=userinfo;
            UserInfo.save();
            res.render('login',{EnterPass:undefined});
          })
        /*  app.get('/profile',function(req,res){
            res.render('profile',{Fname:.FName,Lname:userdata.LName,email:userdata.Email});
        });
        app.post('/profile',function(req,res){
            User.updateOne({Email:userdata.Email},{PhoneNumber:req.body.PhoneNumber},function(err){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('profile',{Fname:userdata.FName,Lname:userdata.LName,email:userdata.Email});
                }
            })
        })*/
        }


  }
  else{
      var LEmail=req.body.Email;
       var LEMAIL;
       if(LEmail!==undefined){
           LEMAIL=LEmail.toLowerCase();
       }
      var LPassword=req.body.Password;
      User.find(function(err,users){
          var X=false;
         users.forEach(function(user){
            if(user.Email===LEMAIL){
                   X=true;
                if(user.Password===LPassword){
                  res.render('userEntry',{M1Toss:body1.results.live_details.match_summary.toss,M1Team1:Body[0][5].AwayCode,M1Team2:Body[0][5].HomeCode,
                    M1Innings:body1.results.live_details.scorecard[Body[0][0]].innings_number,M1Runs:body1.results.live_details.scorecard[Body[0][0]].runs,
                    M1Wickets:body1.results.live_details.scorecard[Body[0][0]].wickets,M1Overs:body1.results.live_details.scorecard[Body[0][0]].overs,
                    M1Batsmen1:Body[0][1][0].player_name,M1BatsMen1Runs:Body[0][1][0].runs,M1Batsmen2:Body[0][1][1].player_name,M1BatsMen2Runs:Body[0][1][1].runs,
                    M1Batsmen3:Body[0][1][2].player_name,M1BatsMen3Runs:Body[0][1][2].runs,M1Batsmen4:Body[0][1][3].player_name,M1BatsMen4Runs:Body[0][1][3].runs,
                    M1Bowler1Name:Body[0][2][0].player_name,M1Bowler1GivenRuns:Body[0][2][0].runs_conceded,M1Bowler1Wickets:Body[0][2][0].wickets,
                    M1Bowler2Name:Body[0][2][1].player_name,M1Bowler2GivenRuns:Body[0][2][1].runs_conceded,M1Bowler2Wickets:Body[0][2][1].wickets,
                    M1Bowler3Name:Body[0][2][2].player_name,M1Bowler3GivenRuns:Body[0][2][2].runs_conceded,M1Bowler3Wickets:Body[0][2][2].wickets,
                    M1Bowler4Name:Body[0][2][3].player_name,M1Bowler4GivenRuns:Body[0][2][3].runs_conceded,M1Bowler4Wickets:Body[0][2][3].wickets,
                    M1PlayingBatsmen1Name:Body[0][3][0].player_name, M1PlayingBatsmen1Runs:Body[0][3][0].runs,
                    M1PlayingBatsmen2Name:Body[0][3][1].player_name, M1PlayingBatsmen2Runs:Body[0][3][1].runs,
                    M1CurrentBowlerName:Body[0][4].player_name,M1CurrentBowlerGivenRuns:Body[0][4].runs_conceded,M1CurrentBowlerWickets:Body[0][4].wickets,
                    M1CurrentBowlerOvers:Body[0][4].overs,Innings1T1Name:Innings1T1N,Innings1T1Runs:Innings1T1R,Innings1T1Wickets:Innings1T1W,
                    M2Toss:body2.results.live_details.match_summary.toss,M2Team1:Body[1][5].AwayCode,M2Team2:Body[1][5].HomeCode,
                    M2Innings:body2.results.live_details.scorecard[Body[1][0]].innings_number,M2Runs:body2.results.live_details.scorecard[Body[1][0]].runs,
                    M2Wickets:body2.results.live_details.scorecard[Body[1][0]].wickets,M2Overs:body2.results.live_details.scorecard[Body[1][0]].overs,
                    M2Batsmen1:Body[1][1][0].player_name,M2BatsMen1Runs:Body[1][1][0].runs,M2Batsmen2:Body[1][1][1].player_name,M2BatsMen2Runs:Body[1][1][1].runs,
                    M2Batsmen3:Body[1][1][2].player_name,M2BatsMen3Runs:Body[1][1][2].runs,M2Batsmen4:Body[1][1][3].player_name,M2BatsMen4Runs:Body[1][1][3].runs,
                    M2Bowler1Name:Body[1][2][0].player_name,M2Bowler1GivenRuns:Body[1][2][0].runs_conceded,M2Bowler1Wickets:Body[1][2][0].wickets,
                    M2Bowler2Name:Body[1][2][1].player_name,M2Bowler2GivenRuns:Body[1][2][1].runs_conceded,M2Bowler2Wickets:Body[1][2][1].wickets,
                    M2Bowler3Name:Body[1][2][2].player_name,M2Bowler3GivenRuns:Body[1][2][2].runs_conceded,M2Bowler3Wickets:Body[1][2][2].wickets,
                    M2Bowler4Name:Body[1][2][3].player_name,M2Bowler4GivenRuns:Body[1][2][3].runs_conceded,M2Bowler4Wickets:Body[1][2][3].wickets,
                    M2PlayingBatsmen1Name:Body[1][3][0].player_name, M2PlayingBatsmen1Runs:Body[1][3][0].runs,
                    M2PlayingBatsmen2Name:Body[1][3][1].player_name, M2PlayingBatsmen2Runs:Body[1][3][1].runs,
                    M2CurrentBowlerName:Body[1][4].player_name,M2CurrentBowlerGivenRuns:Body[1][4].runs_conceded,M2CurrentBowlerWickets:Body[1][4].wickets,
                    M2CurrentBowlerOvers:Body[1][4].overs,Innings1T2Name:Innings1T2N,Innings1T2Runs:Innings1T2R,Innings1T2Wickets:Innings1T2W,
                    M3Toss:body3.results.live_details.match_summary.toss,M3Team1:Body[2][5].AwayCode,M3Team2:Body[2][5].HomeCode,
                    M3Innings:body3.results.live_details.scorecard[Body[2][0]].innings_number,M3Runs:body3.results.live_details.scorecard[Body[2][0]].runs,
                    M3Wickets:body3.results.live_details.scorecard[Body[2][0]].wickets,M3Overs:body3.results.live_details.scorecard[Body[2][0]].overs,
                    M3Batsmen1:Body[2][1][0].player_name,M3BatsMen1Runs:Body[2][1][0].runs,M3Batsmen2:Body[2][1][1].player_name,M3BatsMen2Runs:Body[2][1][1].runs,
                    M3Batsmen3:Body[2][1][2].player_name,M3BatsMen3Runs:Body[2][1][2].runs,M3Batsmen4:Body[2][1][3].player_name,M3BatsMen4Runs:Body[2][1][3].runs,
                    M3Bowler1Name:Body[2][2][0].player_name,M3Bowler1GivenRuns:Body[2][2][0].runs_conceded,M3Bowler1Wickets:Body[2][2][0].wickets,
                    M3Bowler2Name:Body[2][2][1].player_name,M3Bowler2GivenRuns:Body[2][2][1].runs_conceded,M3Bowler2Wickets:Body[2][2][1].wickets,
                    M3Bowler3Name:Body[2][2][2].player_name,M3Bowler3GivenRuns:Body[2][2][2].runs_conceded,M3Bowler3Wickets:Body[2][2][2].wickets,
                    M3Bowler4Name:Body[2][2][3].player_name,M3Bowler4GivenRuns:Body[2][2][3].runs_conceded,M3Bowler4Wickets:Body[2][2][3].wickets,
                    M3PlayingBatsmen1Name:Body[2][3][0].player_name, M3PlayingBatsmen1Runs:Body[2][3][0].runs,
                    M3PlayingBatsmen2Name:Body[2][3][1].player_name, M3PlayingBatsmen2Runs:Body[2][3][1].runs,
                    M3CurrentBowlerName:Body[2][4].player_name,M3CurrentBowlerGivenRuns:Body[2][4].runs_conceded,M3CurrentBowlerWickets:Body[2][4].wickets,
                    M3CurrentBowlerOvers:Body[2][4].overs,Innings1T3Name:Innings1T3N,Innings1T3Runs:Innings1T3R,Innings1T3Wickets:Innings1T3W,
                    M4Toss:body4.results.live_details.match_summary.toss,M4Team1:Body[3][5].AwayCode,M4Team2:Body[3][5].HomeCode,
                    M4Innings:body4.results.live_details.scorecard[Body[3][0]].innings_number,M4Runs:body4.results.live_details.scorecard[Body[3][0]].runs,
                    M4Wickets:body4.results.live_details.scorecard[Body[3][0]].wickets,M4Overs:body4.results.live_details.scorecard[Body[3][0]].overs,
                    M4Batsmen1:Body[3][1][0].player_name,M4BatsMen1Runs:Body[3][1][0].runs,M4Batsmen2:Body[3][1][1].player_name,M4BatsMen2Runs:Body[3][1][1].runs,
                    M4Batsmen3:Body[3][1][2].player_name,M4BatsMen3Runs:Body[3][1][2].runs,M4Batsmen4:Body[3][1][3].player_name,M4BatsMen4Runs:Body[3][1][3].runs,
                    M4Bowler1Name:Body[3][2][0].player_name,M4Bowler1GivenRuns:Body[3][2][0].runs_conceded,M4Bowler1Wickets:Body[3][2][0].wickets,
                    M4Bowler2Name:Body[3][2][1].player_name,M4Bowler2GivenRuns:Body[3][2][1].runs_conceded,M4Bowler2Wickets:Body[3][2][1].wickets,
                    M4Bowler3Name:Body[3][2][2].player_name,M4Bowler3GivenRuns:Body[3][2][2].runs_conceded,M4Bowler3Wickets:Body[3][2][2].wickets,
                    M4Bowler4Name:Body[3][2][3].player_name,M4Bowler4GivenRuns:Body[3][2][3].runs_conceded,M4Bowler4Wickets:Body[3][2][3].wickets,
                    M4PlayingBatsmen1Name:Body[3][3][0].player_name, M4PlayingBatsmen1Runs:Body[3][3][0].runs,
                    M4PlayingBatsmen2Name:Body[3][3][1].player_name, M4PlayingBatsmen2Runs:Body[3][3][1].runs,
                    M4CurrentBowlerName:Body[3][4].player_name,M4CurrentBowlerGivenRuns:Body[3][4].runs_conceded,M4CurrentBowlerWickets:Body[3][4].wickets,
                    M4CurrentBowlerOvers:Body[3][4].overs,Innings1T4Name:Innings1T4N,Innings1T4Runs:Innings1T4R,Innings1T4Wickets:Innings1T4W,});
                    globalThis.userdata=user;
                  app.get('/profile',function(req,res){
                      res.render('profile',{Fname:userdata.FName,Lname:userdata.LName,email:userdata.Email,Updated:undefined});
                  });
                  app.post('/profile',function(req,res){
                      User.updateOne({Email:userdata.Email},{PhoneNumber:req.body.PhoneNumber},function(err){
                          if(err){
                              console.log(err);
                          }
                          else{
                              res.render('profile',{Fname:userdata.FName,Lname:userdata.LName,email:userdata.Email,Updated:"Successfully Updated"});
                          }
                      })
                  })
                }
                else{
                    
                    res.render('login',{EnterPass:"Incorrect Password"});
                }
            }
         });
       if(X===false){
           res.render('signup',{Register:"This Email Is Not Registered Please Signup"});
       }
      });
  }

})


}
DataObtained();

app.get('/login',function(req,res){
    res.render('login',{EnterPass:undefined});
})
app.get('/signup',function(req,res){
 res.render('signup',{Register:undefined});
})
app.get('/Confirmation',function(req,res){
  res.render('Confirmation');
})

