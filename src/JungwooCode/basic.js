/*function resizeGame() {
    var gameArea = document.getElementById('gameArea');
    var widthToHeight = 4 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = document.getElementById('gameCanvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}

window.addEventListener('resize', resizeGame, false);
window.addEventListener('orientationchange', resizeGame, false);*/

//var ratio = window.devicePixelRatio || 1;
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;

var app = new PIXI.Application(w, h);
//app.width = window.innerWidth;
//app.height = window.innerHeight;

document.body.appendChild(app.view);
var container = new PIXI.Container();
container.width = Window.width;
container.height = Window.height;
app.stage.addChild(container);

let count =0;


var Card_Back = PIXI.Texture.fromImage('images/Card_back.png');
var Card_Img = PIXI.Texture.fromImage('images/mon.png');
var Round = 1;
var Rount_length_count= 5;
var Round_length = Rount_length_count * Rount_length_count;
var Card_Img_Arr= new Array();
var Card_Arr=new Array();
var clickX, clickY;

var Card_Check_Arr= new Array();

    


Game();

function init(){
  for(var i =0; i<Round_length; i++)
  {
    var card = new PIXI.Sprite(Card_Back);
    card.interactive = true;
    card.buttonMode= true;
    //Card.filters = [new PIXI.filters.GlowFilter(15, 2, 1, 0xFF0000, 0.5)];
    card.height = 100;
    card.width = 100;
    card.x = (i % Rount_length_count) * 110;
    card.y = Math.floor(i / Rount_length_count) * 110;    
    Card_Arr.push(card);
    container.addChild(card);
  }

  container.x = (app.screen.width - container.width) / 2;
  container.y = (app.screen.height - container.height) / 2;

  shuffle_Card();

  function shuffle_Card(){
    for(var input_Card=1; input_Card<(Round_length/2)+1; input_Card++)
    {
      var Card_Front = PIXI.Texture.fromImage('images/Card'+input_Card+'.png');
      Card_Img_Arr.push(Card_Front);
      Card_Img_Arr.push(Card_Front);
    }
    var j, x, i;
    for (i = Card_Img_Arr.length; i; i -= 1) 
    {    //i는 proArr의 길이
        j = Math.floor(Math.random() * i);    //j는 0부터 29까지 수를 random으로 뽑는다.
        x = Card_Img_Arr[i - 1];            //x는 proArr[i-1]의 값
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
        //clickX = event.data.getLocalPosition(container).x;
        //clickY = event.data.getLocalPosition(container).y;
      if(Card_Check_Arr[cc]==0 && count < 2)
      {

        Card_Arr[cc].texture = Card_Img_Arr[cc];
        Card_Check_Arr[cc]=1;  
        count++;
      }
    }); 
  }
}


  


function Game(){
  init();
  Start();
}


function Start(){
  setTimeout(Start,500);
  var check_i=-1;
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
          Card_Arr[check_i].visible = false;
          Card_Arr[i].visible = false;
          Card_Check_Arr[check_i]=2;
          Card_Check_Arr[i] = 2;
          count = 0;
          sleep(300); 
          break;
        }
        else
        {
          console.log("come here4");
          Card_Arr[check_i].texture = Card_Back;
          Card_Arr[i].texture = Card_Back;
          Card_Check_Arr[check_i]=0;
          Card_Check_Arr[i] = 0;
          count = 0;
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


var Time_Bar_IMG = new PIXI.Texture.fromImage('images/Timer.png');
var Time_Back_IMG = new PIXI.Texture.fromImage('images/Timer_Back.png');
var Time_Bar = new PIXI.Sprite(Time_Bar_IMG);
var Time_Back = new PIXI.Sprite(Time_Back_IMG);
var Score_Text = new PIXI.Text('Score : ', {
  fontWeight: 'bold',
  fontStyle: 'italic',
  fontSize: 60,
  fontFamily: 'Arvo',
  fill: '#3e1707',
  align: 'center',
  stroke: '#a4410e',
  strokeThickness: 7
});

Score_Text.x = 600;
Score_Text.y = 50;
Time_Bar.x = 0;
Time_Bar.y = -220;
Time_Back.x = 0;
Time_Back.y = -220;

app.stage.addChild(Time_Bar);
app.stage.addChild(Time_Back);
app.stage.addChild(Score_Text);

  app.ticker.add(function() {
      
});