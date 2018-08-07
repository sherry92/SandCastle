var w = window.innerWidth;
var h = window.innerHeight;
var cardXpoint = new Array();
var cardYpoint = new Array();
var mar=(w/60);

var app = new PIXI.Application(w, h);
//app.width = window.innerWidth;
//app.height = window.innerHeight;

document.body.appendChild(app.view);
var background = PIXI.Sprite.fromImage('images/Back_ground4.png');
background.width = app.screen.width;
background.height = app.screen.height;

// add background to stage...
app.stage.addChild(background);

var container = new PIXI.Container();
// container.width = parseInt(w*0.4);
// container.height = parseInt(h*0.8);

app.stage.addChild(container);

let count =0;
let combo = 0;
let isClear = false;
let score = 0;
let totalScore = 0;
let touch_restriction;

var Card_Back = PIXI.Texture.fromImage('images/Card_back.png');
var next_Stage_Img = PIXI.Texture.fromImage('images/Next_Stage.png');
var replay_Img = PIXI.Texture.fromImage('images/Replay.png');
var boast_Img = PIXI.Texture.fromImage('images/Boast.png');

var Round = 1;
var Row_length_count;
var Col_length_count;
var Round_length;
var Card_Img_Arr= new Array();
var Card_Arr=new Array();
// total 
var uvgotCard = 0;
var Game_Status = 0;
var next_Stage = new PIXI.Sprite(next_Stage_Img);
var replay = new PIXI.Sprite(replay_Img);
var boast = new PIXI.Sprite(boast_Img);

var Card_Check_Arr= new Array();
var pivotX = container.x;
var pivotY = container.y;

const style1 = new PIXI.TextStyle({
    fill: [
        "#fd9302",
        "black"
    ],
    fillGradientStops: [
        0.6
    ],
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 55,
    fontVariant: "small-caps",
    fontWeight: "bold"
});

var style = new PIXI.TextStyle({
    fontFamily: 'Comic Sans MS',
    fontSize: 84,
    fontStyle: 'italic',
    fontVariant: 'small-caps',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
});

var comboText = new PIXI.Text(combo + 'Combo!', style);
comboText.visible = false;

var ReadyText = new PIXI.Text('Ready!', style);
ReadyText.visible = true;

var ExcelText = new PIXI.Text('Excellent!', style);
ExcelText.visible = false;

app.stage.addChild(ReadyText);
app.stage.addChild(comboText);  
app.stage.addChild(ExcelText);

var Time = 4;
var ReadyTime = 5;
var isReady = true;

var Clock = new PIXI.Sprite.fromImage('images/Alarm.png');
var Time_Text = new PIXI.Text(' : ', style1);

var Score_Text = new PIXI.Text('Score : ', style1);

var Round_Text = new PIXI.Text('Round : ' + Round, style1);

Game();

function findPoint(){
  w = window.innerWidth;
  h = window.innerHeight;
  app.width = w;
  app.height = h;
  container.width = w * 0.8;
  container.height = h * 0.8;
  container.x = w * 0.05;
  container.y = h * 0.05;
  cardXpoint=[];
  cardYpoint=[];
  
  if(Round == 1){
    Row_length_count = 2;
    Col_length_count = 2;
    Time = 10;
  } else if(Round == 2){
    Row_length_count = 2;
    Col_length_count = 4;
    Time = 10;
  } else if(Round == 3){
    Row_length_count = 3;
    Col_length_count = 4;
    Time = 15;
  } else if(Round == 4){
    Row_length_count = 4;
    Col_length_count = 4;
    Time = 20;
  } else if(Round == 5){
    Row_length_count = 4;
    Col_length_count = 5;
    Time = 25;
  } else if(Round == 6){
    Row_length_count = 6;
    Col_length_count = 4;
    Time = 30;
  } else if(Round == 7){
    Row_length_count = 6;
    Col_length_count = 5;
    Time = 30;
  } else if(Round == 8){
    Row_length_count = 6;
    Col_length_count = 5;
    Time = 30;
  } else if(Round == 9){
    Row_length_count = 6;
    Col_length_count = 5;
    Time = 30;
  } else {
    Time = 30;
    Row_length_count = 6;
    Col_length_count = 5;
    Time = Time - 5 *(Round / 10);
  }

  Round_length = Row_length_count * Col_length_count;
  console.log(Round_length);

  container.removeChildren();
  for(var i=container.x; i<container.x+(w*0.8); i+=(w*0.8)/Row_length_count)
  {
    cardXpoint.push(i);
  }
 
  for(var j=container.y + (h*0.05); j<container.y+(h*0.85); j+=(h*0.8)/Col_length_count)
  {
    cardYpoint.push(j);
  }

    for(var i =0;i<Col_length_count;i++)
    {
      for(var j=0;j<Row_length_count;j++)
      {
        var card = new PIXI.Sprite(Card_Back);
        // card.interactive = true;
        // card.buttonMode= true;
        card.width = (w*0.8/Row_length_count)-mar;
        card.height = (h*0.8/Col_length_count)-mar;
        card.x = cardXpoint[j];
        card.y = cardYpoint[i];    
        Card_Arr.push(card);
        container.addChild(card);
      }
    }

  Clock.x = (w/40);
  Clock.y = h/18;
  Clock.width = w/8;
  Clock.height = h/15;
  Time_Text.x = (w/40) * 5;
  Time_Text.y = h/18;
  Time_Text.width = w/8;
  Time_Text.height = h/15;
  Score_Text.x = (w/30) * 20;
  Score_Text.y = (h/18);
  Score_Text.width = w/4;
  Score_Text.height = h/15;
  comboText.x = w/4;
  comboText.y = (h/5);
  comboText.width = w/2;
  comboText.height = (h/7)*3; 
  ReadyText.x = w/3;
  ReadyText.y = (h/5);
  ReadyText.width = w/3;
  ReadyText.height = (h/7)*3;
  ExcelText.x = w/4;
  ExcelText.y = (h/5);
  ExcelText.width = w/2;
  ExcelText.height = (h/7)*3;
  Round_Text.x = (w/20) * 8;
  Round_Text.y = h/80;
  Round_Text.width = w/6;
  Round_Text.height = h/8;   
   
  app.render(container);
  // container.x = (app.screen.width - container.width) / 2;
  // container.y = (app.screen.height - container.height) / 2;
}

function init(){
  isClear = false;
  ReadyText.visible = true;
  ReadyText.visible = true;   
  shuffle_Card();

  next_Stage.interactive = true;
  next_Stage.buttonMode= true;
  next_Stage.height = h/5;
  next_Stage.width = w/2;
  next_Stage.x = (w/9)*2;
  next_Stage.y = (h/5)*2;
  next_Stage.visible = false;

  replay.interactive = true;
  replay.buttonMode = true;
  replay.x = (w/9)*1;
  replay.y = (h/5)*2;
  replay.width = w/4;
  replay.height = h/5;
  replay.visible = false;

  boast.interactive = true;
  boast.buttonMode = true;
  boast.x = (w/9)*5;
  boast.y = (h/5)*2;
  boast.width = w/4;
  boast.height = h/5;
  boast.visible = false;

  container.addChild(next_Stage);
  container.addChild(replay);
  container.addChild(boast);

  next_Stage.on('pointerdown', function(){   
    Card_Arr = [];
    Card_Img_Arr = [];
    Card_Check_Arr = [];
    cardXpoint = [];
    cardYpoint = [];    
    Game_Status = 0;    
    combo = 0;
    ReadyTime = 5;
    isReady = true;
    isClear = true;       
    Round_Text.text = 'Round ' + Round; 
  });

  replay.on('pointerdown', function(){   
    Card_Arr = [];
    Card_Img_Arr = [];
    Card_Check_Arr = [];
    cardXpoint = [];
    cardYpoint = [];    
    Game_Status = 0; 
    ReadyTime = 5;
    isReady = true;
    container.removeChildren(); 
    isClear = true;    
    Round_Text.text = 'Round ' + Round;        
  });

  function shuffle_Card(){
    uvgotCard = Round_length;
    for(var input_Card=1; input_Card<(Round_length/2)+1; input_Card++)
    {
      var Card_Front = PIXI.Texture.fromImage('images/Card'+input_Card+'.png');
      Card_Img_Arr.push(Card_Front);
      Card_Img_Arr.push(Card_Front);
    }
    var j, x, i;
    for (i = Card_Img_Arr.length; i; i -= 1) 
    {    
        j = Math.floor(Math.random() * i);    
        x = Card_Img_Arr[i - 1];           
        Card_Img_Arr[i - 1] = Card_Img_Arr[j];
        Card_Img_Arr[j] = x;
    }
  }

  for(var i=0; i<Card_Arr.length; i++)
  {
    Card_Check_Arr.push(0);
  }
  for(var i=0; i<Round_length; i++)
  {
    let cc= i;
    
      Card_Arr[cc].on('pointerdown', function(event){
      if(Card_Check_Arr[cc]==0 && count < 2)
      {

        Card_Arr[cc].texture = Card_Img_Arr[cc];
        Card_Check_Arr[cc]=1;  
        count++;
      }
    }); 
  }
  return;
}

function Ready_Img(){
  for(var i = 0; i < Round_length; i++){
    let cc = i;
    Card_Arr[cc].texture = Card_Img_Arr[cc];
  }
}

function Game(){
  findPoint();
  init();  
  InGame();
}

function InGame(){
  setTimeout(InGame,500);
  var check_i=-1;
//  console.log("here");
  if(isClear){
    container.removeChildren();
    findPoint();
    init();
  }

  if(count == 0){
    sleep(200);
    comboText.visible = false; 
    ExcelText.visible = false;
  }

  if(isReady){
    Ready_Img();
    if(Math.floor(ReadyTime) > 3){      
      ReadyText.text = "Ready!";     
    } else if(Math.floor(ReadyTime) <= 0){          
      ReadyText.x = w/2;      
      ReadyText.text = Math.floor(ReadyTime) + '!';
      for(var i = 0; i < Round_length; i++){
        let cc = i;
        Card_Arr[cc].texture = Card_Back;
        Card_Arr[cc].interactive = true;
        Card_Arr[cc].buttonMode= true;
      }     
      ReadyText.visible = false; 
      isReady = false;      
    }else{           
      ReadyText.text = Math.floor(ReadyTime) + '!';
    }
  }


  if(uvgotCard == 0 && Time > 0){
    uvgotCard = 256;
    Game_Status = 1;
    next_Stage.visible = true;
    score = (Math.floor(Time) * 10) * (Round * Round);
    console.log(score);
    if(combo == 1) score += 20;
    else if(combo >= 2 && combo <= 3) score += 20 * 2;
    else if(combo >= 4 && combo <= 6) score += 20 * 4;
    else if(combo >= 7 && combo <= 8) score += 20 * 8;
    else score += score += 20 * combo;    
    totalScore += score;
    Round++;    
    Score_Text.text = 'Score:' + totalScore;
  } 
  else if(Time <= 0){
    Game_Status = 2;
    score = 0;
    totalScore = 0;
    time = 60;
    Round = 1;
    combo = 0;
    count = 0;
    for(var i = 0; i < Round_length; i++){
      let cc = i;
      Card_Arr[cc].interactive = false;
      Card_Arr[cc].buttonMode= false;      
    }
    replay.visible = true;
    boast.visible = true;
  }

  if(count % 2 == 0 && count > 0)
  {
    for(var i = 0; i<Card_Arr.length; i++)
    {
      if(Card_Check_Arr[i]==1 && check_i == -1)
      {
        console.log("come here1");
        check_i = i;
      }
      else if(Card_Check_Arr[i]==1)
      {
        console.log("come here2");
        if(Card_Img_Arr[check_i] == Card_Img_Arr[i])
        {
          console.log("come here3");
          combo++;
          if(combo > 1){
            if(ExcelText.visible == true) ExcelText.visible = false;
            comboText.text = combo + 'Combo!';
            comboText.visible = true;          
          } else{
            if(comboText.visible == true) comboText.visible = false;
            ExcelText.visible = true;
          }
          Card_Arr[check_i].visible = false;
          Card_Arr[i].visible = false;
          Card_Check_Arr[check_i]=2;
          Card_Check_Arr[i] = 2;
          uvgotCard -= 2;
          count = 0;
          sleep(300); 
          break;
        }

        else
        {
          if(combo == 1) score += 20;
          else if(combo >= 2 && combo <= 3) score += 20 * 2;
          else if(combo >= 4 && combo <= 6) score += 20 * 4;
          else if(combo >= 7 && combo <= 8) score += 20 * 8;
          else score += score += 20 * combo;
          console.log("come here4");
          Card_Arr[check_i].texture = Card_Back;
          Card_Arr[i].texture = Card_Back;
          Card_Check_Arr[check_i]=0;
          Card_Check_Arr[i] = 0;
          count = 0;
          combo = 0;
          sleep(300);
          break;
        }
      }
    }
  }       
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

app.stage.addChild(Clock);
app.stage.addChild(Time_Text);
app.stage.addChild(Score_Text);
app.stage.addChild(Round_Text);

//window.onload.function(){
  app.ticker.add(function() {
    if(isReady){
      ReadyTime -= 0.01666;
      if(ReadyTime <= 0){
        ReadyTime = 0;
      }
    } else{
      if(Game_Status == 0){
        Time -= 0.01666;
        if(Time <= 0)
          Time = 0;
      }
      Time_Text.text = ' : ' + Math.floor(Time);        
    }
  });