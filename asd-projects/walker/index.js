/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
 
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 // Constant Variables
  const FRAME_RATE = 60;
  const KEY_INTERVAL = 1000 / FRAME_RATE;
  
  // Keyboard mapping
  const KEY = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
  };

  // Game Item Objects (State Variables)
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
    width: $("#walker").width(),
    height: $("#walker").height()
  };

  // Board boundaries
  var board = {
    width: $("#board").width(),
    height: $("#board").height()
  };

  // One-time Setup
  var interval = setInterval(newFrame, KEY_INTERVAL);   // Execute newFrame every 16.67ms
  $(document).on('keydown', handleKeyDown);             // Listen for keys being pressed
  $(document).on('keyup', handleKeyUp);                 // Listen for keys being released

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    handleWallCollisions();
    redrawGameItem();
  }
  
  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, you should rename this function to 'handleClick', then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
   function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
      walker.speedX = -5;
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5;
    } else if (event.which === KEY.UP) {
      walker.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      walker.speedY = 5;
    }
  }

  // Triggered when a key is released
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0;
    }
    if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0;
    }
  }
  

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
 function repositionGameItem() {
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  // Keeps the walker contained within the #board container
  function handleWallCollisions() {
    // Horizontal left wall
    if (walker.positionX < 0) {
      walker.positionX = 0;
    }
    // Horizontal right wall
    else if (walker.positionX > board.width - walker.width) {
      walker.positionX = board.width - walker.width;
    }
    
    // Vertical top wall
    if (walker.positionY < 0) {
      walker.positionY = 0;
    }
    // Vertical bottom wall
    else if (walker.positionY > board.height - walker.height) {
      walker.positionY = board.height - walker.height;
    }
  }

  // Redraws the walker element on the DOM using CSS absolute values
  function redrawGameItem() {
    $("#walker").css("left", walker.positionX);
    $("#walker").css("top", walker.positionY);
  }

  // Safely shuts down the execution cycle
  function endGame() {
    clearInterval(interval);
    $(document).off();
  }
}

