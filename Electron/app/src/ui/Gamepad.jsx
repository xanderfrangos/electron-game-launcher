import ReactDOM from 'react-dom'

export default class UIGamepad {

    constructor() {
        this.gamepads = [];

        //window.addEventListener("gamepadconnected", function(e) { global.Gamepad.gamepadHandler(e, true); }, false);
        //window.addEventListener("gamepaddisconnected", function(e) { global.Gamepad.gamepadHandler(e, false); }, false);

        this.a = 0;
        this.b = 0;
        this.Timer = setTimeout(this.gamepadLoop, 16);
        //window.requestAnimationFrame(global.Gamepad.gamepadLoop);

    }

    gamepadHandler(event, connecting) {
        var gamepad = event.gamepad;
        // Note:
        // gamepad === navigator.getGamepads()[gamepad.index]
    
        if (connecting) {
            this.gamepads[gamepad.index] = gamepad;
            console.log("connecting");
        } else {
            delete this.gamepads[gamepad.index];
            console.log("disconnecting");
        }
    }
    


    buttonPressed(b) {
        if (typeof(b) == "object") {
            return b.pressed;
        }
        return b == 1.0;
    }

    gamepadLoop() {
        var gp = navigator.getGamepads();

        for(var i = 0; i < 4; i++) {

            if(gp[i] != null) {
                //console.log("MOO");
                global.Gamepad.gamepadEvent(gp[i]);
            }
        }
        requestAnimationFrame(global.Gamepad.gamepadLoop);
    }

    gamepadEvent(gp) {
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
    
    gameLoop() {
        if (this.gamepads.length < 1) {
            this.start = requestAnimationFrame(this.gameLoop);
            return false;
        }
    
        var gp = this.gamepads[0];
        if (this.buttonPressed(gp.buttons[0])) {
            this.b--;
        } else if (this.buttonPressed(gp.buttons[2])) {
            this.b++;
        }
        if (this.buttonPressed(gp.buttons[1])) {
            this.a++;
        } else if (this.buttonPressed(gp.buttons[3])) {
            this.a--;
        }
        
        console.log(this.a,this.b);
    
        this.start = requestAnimationFrame(this.gameLoop);
    }
    
    
}