let oldGrid, drawGrid, cellWidth, cellHeight;
function setup(){

    drawGrid = (grid) => {
        grid.forEach((colVector, colIndex) => {
            colVector.forEach((cell, rowIndex) => {
                if(cell.isLive){
                    fill(255);
                } else {
                    fill(0);
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
                colVector.push({ isLive });
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
    oldGrid = makeNewGrid(20,20);
    frameRate(30);
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
            const newCell = {};
            //here i is index along horizontal (i.e. col index) and j is index along vertical (i.e. row index).
            const cell = grid[i][j];
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
            if(cell.isLive) {
                newCell.isLive = !(neighbourCount < 2 || neighbourCount > 3);
            } else {
                newCell.isLive = (neighbourCount === 3);
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