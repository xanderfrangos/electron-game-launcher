import ReactDOM from 'react-dom'

export default class UIInput {
    // We will assume this is being assigned to global.Input for the sake of requestAnimationFrame

    constructor() {
        this.Timer = setTimeout(this.GamepadLoop, 16);
        this.Gamepads = {
            LastButtons: {},
            LastDirection: "none",
            LastEventTime: 0,
            LastLoopTime: 0,
            ActiveGamepad: 0,
        }
    }


    GamepadLoop() {
        if(document.hasFocus()) {
            let gamepads = navigator.getGamepads();
            let Input = global.Input; // I'm lazy
            for(var i = 0; i < 4; i++) {
                if(gamepads[i] != null) {
                    let isActive = Input.GamepadEvent(gamepads[i]);
                    if(isActive) {
                        Input.Gamepads.ActiveGamepad = i;
                    }
                }
            }
        }

        global.Input.Gamepads.LastLoopTime = requestAnimationFrame(global.Input.GamepadLoop);
    }

    GamepadEvent(gp) {
        let isActive = false;
        gp.buttons.forEach((value, index) => {
            if(value.pressed == true) {
                console.log(index)
                isActive = true;

                switch(index) {
                    case 12:
                        global.UI.MoveFocus("up");
                        break;
                    case 13:
                        global.UI.MoveFocus("down");
                        break;
                    case 14:
                        global.UI.MoveFocus("left");
                        break;
                    case 15:
                        global.UI.MoveFocus("right");
                        break;
                    case 0:
                        global.UI.Active.Item.PrimaryAction(global.UI.Active.Item);
                        break;
                }

            }
        });
        
        if(Math.abs(gp.axes[0]) > 0.5 || Math.abs(gp.axes[1]) > 0.5)
            isActive = true;
        
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

        return isActive;
    }
    
    


    HandleKeyDown(e) {
        if(!document.hasFocus())
            return false;

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
    

    RunGame(game) {
        console.log(game);
        const { exec } = require('child_process');
        let tst = exec('start steam://rungameid/' + game.meta.id);
        console.log(tst);
        //window.open("steam://rungameid/" + game.meta.id, 'sharer', 'toolbar=0,status=0,width=548,height=325');
    }



    
}