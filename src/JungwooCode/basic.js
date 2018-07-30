var app = new PIXI.Application(800, 700);
document.body.appendChild(app.view);
app.stage.interactive = true;

var container = new PIXI.Container();
//container.width = 100;
//container.height = 100;
app.stage.addChild(container);

var texture = PIXI.Texture.fromImage('images/ground.png');
var grasstexture = PIXI.Texture.fromImage('images/grass.png');
var wintexture = PIXI.Texture.fromImage('images/win.png');


//var treetexture = PIXI.Texture.fromImage('images/tree.png');
//var tree = new PIXI.Sprite(treetexture);
//tree.anchor.set(0.5, 0.5);
//container.addChild(tree);
//app.stage.addChild(container);




var maps = new Array();

// Create a 5x5 grid of bunnies
for (var i = 0; i < 100; i++) {
	if(i%23==0)
	{
		var grass = new PIXI.Sprite(grasstexture);
		grass.height = 50;
		grass.width = 50;
		grass.anchor.set(0.5,0.5);
		grass.x = (i % 10) * 50;
		grass.y = Math.floor(i / 10) * 50;
		container.addChild(grass);
		maps[i]="grass";
	}
	else if( i%27==0)
	{
		var win = new PIXI.Sprite(wintexture);
		win.height = 50;
		win.width = 50;
		win.anchor.set(0.5,0.5);
		win.x = (i % 10) * 50;
		win.y = Math.floor(i / 10) * 50;
		container.addChild(win);
		maps[i]="win";
	}
	else
	{
		var ground = new PIXI.Sprite(texture);
		ground.height = 50;
		ground.width = 50;
		ground.anchor.set(0.5,0.5);
		ground.x = (i % 10) * 50;
		ground.y = Math.floor(i / 10) * 50;
		container.addChild(ground);
		maps[i]="ground";
	}
}

/*var thing = new PIXI.Graphics();
grass.mask = thing;
app.stage.on('pointerover', function() {
    if (!grass.mask) {
        grass.mask = thing;
    }
    else {
        grass.mask = null;
    }
});*/


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

    bunny.height = 50;
    bunny.width = 50;

    bunny.anchor.x=0.5;
    bunny.anchor.y=0.5;

    // Add the bunny to the scene we are building.
    container.addChild(bunny);

    // kick off the animation loop (defined below)
    animate();
});


/*
if(hitTestRectagle(bunny, grass)){
	var thing = new PIXI.Graphics();
	grass.mask = thing;
	if (!grass.mask) {
	    grass.mask = thing;
	}
	else {
	    grass.mask = null;
	}
}else
{

}
*/
/*function hitTestRectangle(r1, r2) {

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
*/
function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);

    //apply keys
    if (pkeys[38]) { //up key
      if(bunny.position.y > -10)
      	bunny.position.y-=1;
    }
    if (pkeys[40]) { //down key
    	if(bunny.position.y < 455)
     	 bunny.position.y+=1;
    }
    if (pkeys[39]) { //up key
    	if(bunny.position.x < 455)
      		bunny.position.x+=1;
    }
    if (pkeys[37]) { //down key
    	if(bunny.position.x > -10)
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

/*
var thing = new PIXI.Graphics();
container.mask = thing;

app.stage.on('pointerover', function() {
    if (!container.mask) {
        container.mask = thing;
    }
    else {
        container.mask = null;
    }
});


app.ticker.add(function() {
    thing.clear();
    thing.beginFill(0x8bc5ff, 0.4);

});


var app = new PIXI.Application(800, 600, { antialias: true });
document.body.appendChild(app.view);
app.stage.interactive = true;

var bg = PIXI.Sprite.fromImage('images/grass.png');
bg.anchor.set(0.5);
bg.x = app.screen.width/2;
bg.y = app.screen.height/2;
bg.width=600;
bg.height=600;
app.stage.addChild(bg);


var container = new PIXI.Container();
container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

// add a bunch of sprites
var panda =  PIXI.Sprite.fromImage('images/tree.png');
panda.anchor.set(0.5);
container.addChild(panda);
app.stage.addChild(container);

// let's create a moving shape
//var thing = new PIXI.Graphics();
//app.stage.addChild(thing);
//thing.x = app.screen.width / 2;
//thing.y = app.screen.height / 2;
//thing.lineStyle(1);
var thing = new PIXI.Graphics();
container.mask = thing;


app.stage.on('pointerover', function() {
    if (!container.mask) {
        container.mask = thing;
    }
    else {
        container.mask = null;
    }
});

/*
app.ticker.add(function() {

    thing.clear();

    thing.beginFill(0x8bc5ff, 0.4);

});*/
