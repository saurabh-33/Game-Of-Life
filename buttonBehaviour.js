function start () {
    loop();
    isLooping = true;
}
    
function pause() {
    noLoop();
    isLooping = false;
}
    
function reset() {
    console.log("entering reset func")
    //changes the oldGrid so that on executing draw newGrid calculated accordingly when start pressed.
    oldGrid = makeNewGrid(gridRows, gridCols)

    if(isLooping) {
        noLoop();
    } else {
        redraw();
    }
    
}

const buttonsIds = ["start", "pause", "reset"];

const buttonRefs = buttonsIds.map(id => document.getElementById(id));
buttonRefs[0].addEventListener("click", start);
buttonRefs[1].addEventListener("click", pause);
buttonRefs[2].addEventListener("click", reset);