
var gamepads
start = () => {
    gamepads = [];

    var Timer = setTimeout(gamepadLoop, 16);

}


var lastGamepadTime = 0;

gamepadLoop = () => {
    if(document.hasFocus()) {
        var gp = navigator.getGamepads();

        for(var i = 0; i < 4; i++) {

            if(gp[i] != null) {
                //console.log("MOO");
                gamepadEvent(gp[i]);
            }
        }
    }
    lastGamepadTime = requestAnimationFrame(gamepadLoop);
}

gamepadEvent = (gp) => {
    gp.buttons.forEach((value, index) => {
        if(value.pressed == true) {
            console.log(index)
            if(index == 12) {
                global.UI.MoveFocus("up");
            } else if(index == 13) {
                global.UI.MoveFocus("down");
            } else if(index == 14) {
                global.UI.MoveFocus("left");
            } else if(index == 15) {
                global.UI.MoveFocus("right");
            } 
            if(index == 0) {
                global.UI.Active.Item.PrimaryAction(global.UI.Active.Item);
            }

            
        }
    });
    
    
    if(gp.axes[0] < -0.5) {
        // RS X Left
        global.UI.MoveFocus("left");
    } else if(gp.axes[0] > 0.5) {
        // RS X Right
        global.UI.MoveFocus("right");
    } 
    
    if(gp.axes[1] < -0.5) {
        // RS Y Up
        global.UI.MoveFocus("up");
    } else if(gp.axes[1] > 0.5) {
        // RS Y Down
        global.UI.MoveFocus("down");
    }
}


gamepadLoop();







HandleKeyDown = (e) => {
    //e.persist();
    console.log(e);
    if (e.key == "ArrowUp") {
        global.UI.MoveFocus("up");
        e.preventDefault();
      } else if (e.key == "ArrowDown") {
        global.UI.MoveFocus("down");
        e.preventDefault();
      } else if (e.key == "ArrowLeft") {
        global.UI.MoveFocus("left");
        e.preventDefault();
      } else if (e.key == "ArrowRight") {
        global.UI.MoveFocus("right");
        e.preventDefault();
      }
      
}

const runGame = (game) => {
    console.log(game);
    const { exec } = require('child_process');
    let tst = exec('start steam://rungameid/' + game.meta.id);
    console.log(tst);
    //window.open("steam://rungameid/" + game.meta.id, 'sharer', 'toolbar=0,status=0,width=548,height=325');
}