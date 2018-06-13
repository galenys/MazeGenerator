var cols, rows;
var w = 20; // Number of separations
var grid = [];

var current;
var goal;

var stack = [];

var mazeIsDone = false;

var upDownDirection = 0;
var leftRightDirection = 0;

function setup() {
  createCanvas(600, 600);
  cols = floor(width/w);
  rows = floor(height/w);
  // frameRate(5);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  goal = grid[grid.length-1]

}

function draw() {
  background(0, 154, 187);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  
  // Highlight the goal cell
  var goalX = goal.i * w;
  var goalY = goal.j * w;
  noStroke();
  fill(159, 0, 86);
  rect(goalX,goalY, w,w)
  
  // Highlight the current cell
  var currentX = current.i * w;
  var currentY = current.j * w;
  noStroke();
  fill(244, 161, 0);
  rect(currentX,currentY, w,w)

  current.visited = true;
  var next = current.checkNeighbors();
  
  if (next) {
    stack.push(current);
    
    removeWalls(current, next);
    current = next;
  } else if(stack.length > 0) {
    current = stack.pop();
  } else {
    mazeIsDone = true;
  }
  
  if (mazeIsDone) {
    if (upDownDirection === -1) { //Top
      next = grid[index(current.i, current.j-1)]
      if (next && !current.walls[0]) {
        current = next;
      }
    }
    if (leftRightDirection === 1) { //Right
      next = grid[index(current.i+1, current.j)]
      if (next && !current.walls[1]) {
        current = next;
      }
    }
    if (upDownDirection === 1) { //Bottom
      next = grid[index(current.i, current.j+1)]
      if (next && !current.walls[2]) {
        current = next;
      }
    }
    if (leftRightDirection === -1) { //Left
      next = grid[index(current.i-1, current.j)]
      if (next && !current.walls[3]) {
        current = next;
      }
    }
    
    
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    upDownDirection = -1;
  } else if (keyCode === DOWN_ARROW) {
    upDownDirection = 1;
  } else if (keyCode === LEFT_ARROW) {
    leftRightDirection = -1;
  } else if (keyCode === RIGHT_ARROW) {
    leftRightDirection = 1;
  }
}
function keyReleased() {
  upDownDirection = 0;
  leftRightDirection = 0;
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows - 1) {
    return -1;
  }

  return i + j * cols;
}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}