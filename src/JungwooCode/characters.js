var hide_bunny = PIXI.Texture.fromImage('images/hide_mon.png');
var bunnytexture = PIXI.Texture.fromImage('images/ryan.png');    

var bunny;
PIXI.loader
    .add('bunny', 'images/ryan.png')
    .load(setup);

function setup(loader, resources) {
    bunny = new PIXI.Sprite(resources.bunny.texture);

    bunny.position.x = 1000;
    bunny.position.y = 1000;

    bunny.height = 50;
    bunny.width = 50;

    //bunny.anchor.x=0.5;
    //bunny.anchor.y=0.5;
    
    // Add the bunny to the scene we are building.
    container.addChild(bunny);
    bunny.interactive = true;
    // kick off the animation loop (defined below)
    animate();
    play();
};

function play(delta)
{
  requestAnimationFrame(play);
  for(var i=0; i<grassCnt; i++)
  {
    if(hitTestRectangle(bunny, grassArr[i]))
  	{
      //var thing = new PIXI.Graphics();
      grassArr[i].interactive=true;
      grassArr[i].texture = hide_grass;
      bunny.interactive = true;
      bunny.texture = hide_bunny;
      break;
  	}
  	else
  	{
      grassArr[i].mask =null;
      bunny.texture = bunnytexture;
      grassArr[i].texture = grasstexture;
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
      if (pkeys[38]) { //up key
        if(bunny.position.y > -10)
          bunny.position.y+=1;
      }
      if (pkeys[40]) { //down key
        if(bunny.position.y < 455)
         bunny.position.y-=1;
      }
      if (pkeys[39]) { //up key
        if(bunny.position.x < 455)
            bunny.position.x-=1;
      }
      if (pkeys[37]) { //down key
        if(bunny.position.x > -10)
            bunny.position.x+=1;
      }
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

function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
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