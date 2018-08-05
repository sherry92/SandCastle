const log = console.log;
const app = new PIXI.Application();
document.body.appendChild(app.view);
const button = PIXI.Sprite.fromImage("images/tube.png");
button.interactive = true;
button.buttonMode = true;
button.anchor.set(0.5);
button.x = 100;
button.y = 100;
app.stage.addChild(button);

button.on('pointerdown', ()=> {
    log("YOooo");
});

const onDragStart = event => {
    button.data = event.data;
    button.dragging = true;
};
const onDragEnd = event => {
    delete button.data;
    button.dragging = false;
};
const onDragMove = event => {
    if(button.dragging === true) {
        const newPosition = button.data.getLocalPosition(button.parent);
        button.x = newPosition.x;
        button.y = newPosiotio.y;
    }
}
button.on('pointerdown', onDragStart)
.on('pointerup', onDragEnd)
.on('pointerdown', onDragEnd)
.on('pointermove', onDragMove);

app.ticker.add((delta) => {
    if(button.dragging === true) {
        button.rotation += 0.1 * delta;
    }
})