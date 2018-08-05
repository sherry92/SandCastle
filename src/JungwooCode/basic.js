document.write('<script type="text/javascript" src="Problem.js"></script>');
let Round=0;


var treasureansArr = new Array();


var app = new PIXI.Application(1500, 1500);
document.body.appendChild(app.view);
app.stage.interactive = true;

var container = new PIXI.Container();



app.stage.addChild(container);

var texture = PIXI.Texture.fromImage('images/ground.png');
var treasuretexture = PIXI.Texture.fromImage('images/treasurebox.png');
var open_treasuretexture = PIXI.Texture.fromImage('images/open_treasurebox.png');
var grasstexture = PIXI.Texture.fromImage('images/grass.png');
var hide_grass = PIXI.Texture.fromImage('images/hide_grass.png');
var stonetexture = PIXI.Texture.fromImage('images/stone.png');
var hide_bunny = PIXI.Texture.fromImage('images/hide_mon.png');
var bunnytexture = PIXI.Texture.fromImage('images/mon.png');
var hide_treasure_grasstexture = PIXI.Texture.fromImage('images/hide_treasure_grass.png');  





//var maps = new Array();
var grassArr = new Array();
var grassCnt = 0;

var treasureArr = new Array();
var treasureCnt = 0;

var stoneArr = new Array();
var stoneCnt = 0;

var hide_treasure_grassArr = new Array();
var hide_treasure_grassCnt =0;

var CheckArr = new Array();
var CheckArr_hide = new Array();
var map = new Array();
var map_count = 0;

var Problem_Arr= new Array();
var move_check = false;

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
window.WebFontConfig = {
    google: {
        families: ['Snippet', 'Arvo:700italic', 'Podkova:700']
    },

    active: function() {
        // do something
        init();
    }
};

function init()
{
  var countingText = new PIXI.Text(score(), {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 30,

        fontFamily: 'Arvo',
        fill: '#3e1707',
        align: 'center',
        stroke: '#a4410e',
        strokeThickness: 7
    });

    countingText.x = -20;
    countingText.y = -80;
    countingText.anchor.x = 0.5;
    container.addChild(countingText);
  }

function score(){

  var Score = "Player Score : 0";
  return Score;
}



var TreasureTotalCount = 0;
var GrassTotalCount =0;
var StoneTotalCount =0;

// Create a 5x5 grid of bunnies
for (var i = 0; i < 2500; i++) { 
  var random_val = Math.floor(Math.random() * i * 31);
	if(random_val%500<40 && GrassTotalCount<=800)
	{
    var grass = new PIXI.Sprite(grasstexture);
    grass.interactive=true;
    grass.height = 30;
		grass.width = 30;
		//grass.anchor.set(0.5,0.5);
		grass.x = (i % 50) * 30;
		grass.y = Math.floor(i / 50) * 30;
    grass.buttonMode = true;
    grass
      .on('pointerdown', move);
		container.addChild(grass);
    grassArr[grassCnt]=grass;
    grassCnt++;
    GrassTotalCount++;
	}
	else if(random_val%500<43 && TreasureTotalCount <=15)
  {
    var treasure = new PIXI.Sprite(treasuretexture);
    treasure.height = 30;
    treasure.width = 30;
    //treasure.anchor.set(0.5,0.5);
    treasure.x = (i % 50) * 30;
    treasure.y = Math.floor(i / 50) * 30;
    treasure.interactive=true;
    treasure.buttonMode=true;
    treasure
      .on('pointerdown', move);
    container.addChild(treasure);
    treasureArr[treasureCnt]=treasure;
    CheckArr[treasureCnt]=false;
    treasureCnt++;
    TreasureTotalCount++;
    
  }
  else if(random_val%500<73 && StoneTotalCount <= 800)
  {
    var stone = new PIXI.Sprite(stonetexture);
    stone.height = 30;
    stone.width = 30;
    //stone.anchor.set(0.5,0.5);
    stone.x = (i % 50) * 30;
    stone.y = Math.floor(i / 50) * 30;
    container.addChild(stone);
    stoneArr[stoneCnt]=stone;
    stoneCnt++;
    StoneTotalCount++;
    
  }
  else if(random_val%500<76 && TreasureTotalCount <=15)
  {
    var hide_treasure_grass = new PIXI.Sprite(hide_treasure_grasstexture);
    hide_treasure_grass.height = 30;
    hide_treasure_grass.width = 30;
    //hide_treasure_grass.anchor.set(0.5,0.5);
    hide_treasure_grass.x = (i % 50) * 30;
    hide_treasure_grass.y = Math.floor(i / 50) * 30;
    hide_treasure_grass.buttonMode= true;
    hide_treasure_grass.interactive=true;
    hide_treasure_grass
      .on('pointerdown', move);
    container.addChild(hide_treasure_grass);
    hide_treasure_grassArr[hide_treasure_grassCnt]=hide_treasure_grass;
    CheckArr_hide[hide_treasure_grassCnt]=false;
    hide_treasure_grassCnt++;
    TreasureTotalCount++;
  }
	else
	{
		var ground = new PIXI.Sprite(texture);
		ground.height = 30;
		ground.width = 30;
		//ground.anchor.set(0.5,0.5);
		ground.x = (i % 50) * 30;
		ground.y = Math.floor(i / 50) * 30;
    ground.interactive=true;
    ground.buttonMode= true;
    ground
      .on('pointerdown', move);
      //.on('pointerup', stopmove);
      //.on('pointermove', move);
       
		container.addChild(ground);
	}

}


// Center on the screen
container.x = (app.screen.width - container.width) / 2;
container.y = (app.screen.height - container.height) / 2;

//var renderer = new PIXI.WebGLRenderer(800, 600);

//document.body.appendChild(renderer.view);

//var stage = new PIXI.Container();
var bunny;
PIXI.loader.add('bunny', 'images/mon.png').load(function (loader, resources) {
     bunny = new PIXI.Sprite(resources.bunny.texture);



    bunny.position.x = 400;
    bunny.position.y = 300;

    bunny.height = 30;
    bunny.width = 30;

    //bunny.anchor.x=0.5;
    //bunny.anchor.y=0.5;
    

    // Add the bunny to the scene we are building.
    container.addChild(bunny);
    bunny.interactive = true;
    
    // kick off the animation loop (defined below)
    animate();
    play();
});

//     문제에 대한 답
for(var count=0; count<treasureCnt; count++)
{
  let c_count= count;
  //alert(count);
  treasureArr[c_count].on('pointerdown', function(e){
    if(CheckArr[c_count]==true)
    {
      alert(treasureansArr[c_count].ans);
      if(treasureansArr[c_count].ans == Problem_Arr[Round].ans)
      {
        alert("Congratulations! Get 1 Point");
        Round++;
        Next_Round();
      }
      else
      {
        alert(Problem_Arr[Round].ans);
      }
    }
  });
}

for(var count=0; count<hide_treasure_grassCnt; count++)
{
  let cc_count=count;
  //alert(count+treasureCnt);
  hide_treasure_grassArr[cc_count].on('pointerdown', function(e){
    if(CheckArr_hide[cc_count]==true)
    {
      alert(treasureansArr[treasureCnt+cc_count].ans);
      if(treasureansArr[treasureCnt+cc_count].ans == Problem_Arr[Round].ans)
      {
        alert("Congratulations! Get 1 Point");
        Round++;
        Next_Round();

      }
      else
      {
        alert(Problem_Arr[Round].ans);
      }
    }
  });
}

function onmove(delta){
  move_check = true;
}





function play(delta)
{
  requestAnimationFrame(play);
  for(var i=0; i<grassCnt; i++)
  {
    if(hitTestRectangle(bunny, grassArr[i]))
  	{
      //var thing = new PIXI.Graphics();
      bunny.interactive = true;
      bunny.texture = hide_bunny;
      grassArr[i].interactive=true;
      grassArr[i].texture = hide_grass;
      
  	}
  	else
  	{
      grassArr[i].mask =null;
      bunny.texture = bunnytexture;
      grassArr[i].texture = grasstexture;
  	}
  }
  for(var i=0; i<hide_treasure_grassCnt; i++)
  {
    if(hitTestRectangle(bunny, hide_treasure_grassArr[i]))
    {
      bunny.interactive = true;
      bunny.texture = hide_bunny;
      hide_treasure_grassArr[i].interactive=true;
      hide_treasure_grassArr[i].texture = hide_treasure_grasstexture;
      CheckArr_hide[i] = true;
    }
    else
    {
      hide_treasure_grassArr[i].mask =null;
      bunny.texture = bunnytexture;
      hide_treasure_grassArr[i].texture = grasstexture;
      CheckArr_hide[i] = false;
    }
  }

  for(var i=0; i<treasureCnt; i++)
  {
    if(hitTestRectangle(bunny, treasureArr[i]))
    {
      //console.log("here"+i);
      //var thing = new PIXI.Graphics();
      treasureArr[i].interactive = true;
      treasureArr[i].texture = open_treasuretexture;
      CheckArr[i]= true;
    }
    else
    {
      //console.log("herett"+i);
      treasureArr[i].mask =null;
      treasureArr[i].texture = treasuretexture;
      CheckArr[i]= false;
    }
  }

  for(var i=0; i<stoneCnt; i++)
  {
    if(hitTestRectangle(bunny, stoneArr[i]))
    {
      /*if(point_x == bunny.x)
      {
        check_left=false;
        check_right= false;
      }
      if(point_y == bunny.y)
      {
        check_up=false;
        check_down= false;
      }*/
      if(check_up)
        bunny.position.y-=1;
      if(check_down)
        bunny.position.y+=1;
      if(check_left)
        bunny.position.x+=1;
      if(check_right)
        bunny.position.x-=1;
        }
  }
}


function hitTestRectangle(r1, r2) {
	//Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

var check_up= false;
var check_down= false;
var check_right= false;
var check_left= false;
var point_x;
var point_y;


function animate() {
   requestAnimationFrame(animate);
  if(point_x == bunny.x)
  {
    check_left=false;
    check_right= false;
  }
  if(point_y == bunny.y)
  {
    check_up=false;
    check_down= false;
  }
  if(check_up)
    bunny.position.y+=1;
  if(check_down)
    bunny.position.y-=1;
  if(check_left)
    bunny.position.x-=1;
  if(check_right)
    bunny.position.x+=1;

    // start the timer for the next animation loop
    //apply keys
    if (pkeys[38]) { //up key
      //if(bunny.position.y > -10)
      	bunny.position.y-=1;
    }
    if (pkeys[40]) { //down key
      //if(bunny.position.y < 455)
     	 bunny.position.y+=1;
    }
    if (pkeys[39]) { //up key
      //if(bunny.position.x < 455)
      		bunny.position.x+=1;
    }
    if (pkeys[37]) { //down key
      //if(bunny.position.x > -10)
      		bunny.position.x-=1;
    }
    // this is the main render call that makes pixi draw your container and its children.
    app.render(container);
}



var pkeys=[];
window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    pkeys[code]=true;

}
window.onkeyup = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  pkeys[code]=false;
};


window.onload=function(){
  let select = shuffle();
  for(var i=0; i<treasureCnt; i++)
  {
      treasureansArr[i]=select[i];
  }
  for(var i=treasureCnt; i<hide_treasure_grassCnt+treasureCnt; i++)
  {
      treasureansArr[i]=select[treasureCnt+i];
  }


  var check_pro= new Array;
  for(var i=0; i<hide_treasure_grassCnt+treasureCnt; i++)
  {
      check_pro[i] = select[i];
  }

  var j, x, i;
    for (i = check_pro.length; i; i -= 1) {    //i는 proArr의 길이
        j = Math.floor(Math.random() * i);
            //j는 0부터 29까지 수를 random으로 뽑는다.
        x = check_pro[i - 1];            //x는 proArr[i-1]의 값
        check_pro[i - 1] = check_pro[j];
        check_pro[j] = x;
        //console.log(check_pro[i]);
    }

  for(var k=0; k<5;k++)
  {
    Problem_Arr[k]=check_pro[k];
  }
    alert(Problem_Arr[Round].pro);
};
 

function Next_Round(){
  if(Round!=0)
  {
    alert("Next Round!");
    alert(Problem_Arr[Round].pro);
  }
}

function move(){ 
    if(this.x <= bunny.x)
        check_left=true;
    else
        check_left=false;
    if(this.x > bunny.x)
        check_right=true;
    else
        check_right=false;
    if(this.y <= bunny.y)
        check_down = true;
    else
        check_down=false;
    if(this.y > bunny.y)
        check_up=true;
    else
        check_up=false;
    point_x = this.x;
    point_y = this.y;
}

