var app = new PIXI.Application(700, 700);
document.body.appendChild(app.view);
var container = new PIXI.Container();
app.stage.addChild(container);

let count =0;


var Card_Back = PIXI.Texture.fromImage('images/Card_back.png');
var Card_Img = PIXI.Texture.fromImage('images/mon.png');
var Round = 1;
var Round_length= 36;
var Card_Img_Arr= new Array();
var Card_Arr=new Array();
var clickX, clickY;

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
    card.x = (i % 6) * 110;
    card.y = Math.floor(i / 6) * 110;    
    Card_Arr.push(card);
    container.addChild(card);
  }

  container.x = (app.screen.width - container.width) / 2;
  container.y = (app.screen.height - container.height) / 2;

  shuffle_Card();

  function shuffle_Card(){
    for(var input_Card=1; input_Card<19; input_Card++)
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

  for(var i=0; i<Round_length; i++)
  {
    let cc= i;
    Card_Arr[cc].on('pointerdown', function(event){
      clickX = event.data.getLocalPosition(container).x;
      clickY = event.data.getLocalPosition(container).y;      
      Card_Arr[cc].texture = Card_Img_Arr[cc];
    });
  }
}


/*for(var i =0; i<Round_length; i++)
{
  console.log(Card_Arr[i]);
  Card_Arr[i].texture = Card_Img_Arr[i];
}
*/

function Game(){
  init();
  //requestAnimationFrame(Game);
  
  console.log(clickX);
  console.log(clickY);
}
