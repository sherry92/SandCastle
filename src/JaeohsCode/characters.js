//Aliases
let Application = PIXI.Application,
    Contanier = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new PIXI.Application({
    width: 1024, 
    height: 1024,
    antialias: true,
    transparent: false,
    resolution: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the 'setup' function when it's done
PIXI.loader
    .add("images/tube.png")
    .load(setup);

let tube, state;
//This 'setup' function will run when the image has loaded
function setup() {
    //Create the sprite
    tube = new Sprite(resources["images/tube.png"].texture);

    tube.y = 96;
    tube.vx = 0;
    tube.vy = 0;

    //Add the tube to the stage
    app.stage.addChild(tube);

    //Capture the keyboard arrow keys
    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Left arrow key 'press' method
    left.press = () => {
        //Change the tube's velocity when the key is pressed
        tube.vx = -5;
        tube.vy = 0;
    };

    //Left arrow key 'release' method
    left.release = () => {
        //If the arrow has been released, and the right arrow isn't down,
        //and the tube isn't moving vertically:
        //Stop the tube
        if(!right.isDown && tube.vy === 0) {
            tube.vx = 0;
        }
    };

    //Up
    up.press = () => {
        tube.vx = 0;
        tube.vy = -5;
    };
    up.release = () => {
        if(!down.isDown && tube.vx === 0) {
            tube.vy = 0;
        }
    };

    //Right
    right.press = () => {
        tube.vx = 5;
        tube.vy = 0;
    };
    right.release = () => {
        if(!left.isDown && tube.vy === 0) {
            tube.vx = 0;
        }
    };

    //Down
    down.press = () => {
        tube.vx = 0;
        tube.vy = 5;
    };
    down.release = () => {
        if(!up.isDown && tube.vx === 0) {
            tube.vy = 0;
        }
    };

    //Set the game state
    state = play;

    //start the game loop
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    //Update the current game state
    state(delta);
}

function play(delta) {
    //Move the tube 1 pixel to the right each frame
    tube.x += tube.vx;
    tube.y += tube.vy;
}

function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The 'downHandler'
    key.downHandler = event => {
        if(event.keyCode === key.code) {
            if(key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The 'upHandler'
    key.upHandler = event => {
        if(event.keyCode === key.code) {
            if(key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}