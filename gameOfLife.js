let oldGrid, drawGrid, cellWidth, cellHeight;
function setup(){
    colorMode(HSB, 360, 100, 100, 1);
    drawGrid = (grid) => {
        grid.forEach((colVector, colIndex) => {
            colVector.forEach((cell, rowIndex) => {
                const { age } = cell;
                if(cell.isLive){
                    // adding color of cell according to the age:
                    // age = 0 --> black    
                    // 0 < age <= 2 --> white
                    // 0 < age <= 5 --> gray
                    // 0 < age <= 10 --> light blue
                    // 10 < age <= 50 --> light green
                    // 50 < age <= 100 --> light yellow
                    // age > 100 --> light red
                    if(age<=2){
                        fill(360, 0, 100);
                    } else if(age<=5) {
                        fill(360, 0, 80);
                    } else if(age<=10) {
                        fill(190, 80, 100);                        
                    } else if(age<=50) {
                        fill(120, 80, 100);
                    } else if(age<=100) {
                        fill(60, 80, 100);
                    } else {
                        fill(0, 80, 100);
                    }
                } else {
                    fill(0, 0, 0, 1);
                }
                rect(colIndex * cellWidth, rowIndex * cellHeight, cellWidth, cellHeight);
            });
        });
        
    }

    // Makes a new grid (2d array) for the first time.
    // args passed dictates the no. of cells needed in vertically and horizontally respectively.
    // All cells' width and height auto adjusts to fit the dimentions of the canvas.
    function makeNewGrid(rows, cols) {
        cellWidth = (width/cols);
        cellHeight = (height/rows);
        const initGrid = [];
    
        for(let i=0; i<cols; i++){
            const colVector = [];
            for(let j=0; j<rows; j++){
                //gives live or dead status for cell.
                const isLive = floor(random(2)) ? true : false;
                const age = isLive ? 1 : 0;
                const cell = {
                    isLive,
                    age
                };
                colVector.push(cell);
            }
            initGrid.push(colVector);
        }
        drawGrid(initGrid);
        return initGrid;
    }

    //Assigns one of the least dimentions of window as the canvas's side.
    const canvasSide = innerWidth <= innerHeight ? innerWidth : innerHeight; 
    createCanvas(canvasSide,canvasSide);
    background(0);
    oldGrid = makeNewGrid(25,25);
    frameRate(10);
}

//returns new grid (2d Array) based on the old grid provided as parameter by following the rules mentioned.
function newGenerationOf(grid) {
    // rules for game of Life: 
    // 1. Any cell with fewer than 2 live neighbours dies. (isolation)
    // 2. Any live cell with 2 or 3 live neighbours lives on to next gen. (reproduction)
    // 3. any live cell with more than 3 live neighbours dies (overpopulation)
    // 4. any dead cell with exactly 3 live neighbours becomes a live cell. (reproduction)
    
    const newGrid = [];
    let numOfCols = grid.length, numOfRows;

    for(let i=0; i<numOfCols; i++){
        const colVector = [];
        numOfRows = grid[i].length;
        for(let j=0; j<numOfRows; j++){
            let neighbourCount = 0;
            const newCell = {
                age: 0
            };
            //here i is index along horizontal (i.e. col index) and j is index along vertical (i.e. row index).
            const oldCell = grid[i][j];
            for(let k=-1; k<2; k++){
                for(let l=-1; l<2; l++){
                    if(!(k===0 && l===0)) {
                        // here % operators used to provide the loop around world.
                        const neighbourCell = grid[(numOfCols + i + k) % numOfCols][(numOfRows + j + l) % numOfRows];
                        if(neighbourCell.isLive) {
                            neighbourCount ++;
                        }    
                    } 
                }    
            }
            //applying above mentioned rules.
            if(oldCell.isLive) {
                newCell.isLive = !(neighbourCount < 2 || neighbourCount > 3);

                // when both new generation cell and old generation cell are alive,
                // it means the old cell has continued living, hence age increments of old cell.
                if(newCell.isLive) {
                    newCell.age = oldCell.age + 1;
                } else{
                    //as new cell is not live although old one was live means reset the age.
                    newCell.age = 0;
                }
            } else {
                newCell.isLive = (neighbourCount === 3);
                if(newCell.isLive){
                    //dead cell comes to life! so age set to 1.
                    newCell.age = 1;
                }
                // for dead cell remaining dead age remains 0.
            }

            colVector.push(newCell);
        }
        newGrid.push(colVector);
    }
    return newGrid;
}

function draw() {
    
    //creates new gen based on passed grid following rules.
    clear();
    let newGrid = newGenerationOf(oldGrid);
    drawGrid(newGrid)
    oldGrid = newGrid;
}