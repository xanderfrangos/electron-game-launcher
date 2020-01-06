import ReactDOM from 'react-dom'

export default class UIInput {
    // We will assume this is being assigned to global.Input for the sake of requestAnimationFrame

    constructor() {
        this.Timer = setTimeout(this.GamepadLoop, 300);
        this.Gamepads = {
            LastDirection: "none",
            LastEventTime: 0,
            LastLoopTime: 0,
            ActiveGamepad: 0,
            InputInterval: 8, // No need to poll more often, waste of CPU
            Down: {
                LastButtons: [],
                Buttons: [],
                DirectionDown: false,
                DirectionalTimeTotal: 0,
                DirectionalTimeBuffer: 0,
                DirectionalTimeLast: 0 ,
            },
            BackgroundInput: false, // Only should be true for testing
        }
        
    }


    GamepadLoop(timestamp) {
        let Input = global.Input; // I'm lazy

        if(timestamp - Input.Gamepads.LastEventTime > Input.Gamepads.InputInterval) {
            //console.log(timestamp - Input.Gamepads.LastEventTime)
            Input.Gamepads.LastEventTime = performance.now();
            
            if(document.hasFocus() || global.Input.Gamepads.BackgroundInput) {
                let gamepads = navigator.getGamepads();
                Input.Gamepads.Down.DirectionDown = false
                Input.Gamepads.Down.LastButtons = Input.Gamepads.Down.Buttons
                Input.Gamepads.Down.Buttons = []
                
                for(var i = 0; i < 4; i++) {
                    if(gamepads[i] != null) {
                        let isActive = Input.GamepadEvent(gamepads[i], i);
                        if(isActive) {
                            Input.Gamepads.ActiveGamepad = i;
                        }
                    }
                }

                if(Input.Gamepads.Down.DirectionDown === false) {
                    Input.ResetDirectionalTime()
                }
            }
        }

        global.Input.Gamepads.LastLoopTime = performance.now()
        requestAnimationFrame(global.Input.GamepadLoop);
        
    }

    ResetDirectionalTime() {
        let Down = Input.Gamepads.Down
        Down.DirectionalTimeBuffer = 0
        Down.DirectionalTimeLast = 0
        Down.DirectionalTimeTotal = 0
    }

    TryMoveFocus(direction) {
        let Input = global.Input; // I'm lazy
        let delta = performance.now() - Input.Gamepads.Down.DirectionalTimeLast
        let MovedFocus = -1
        
        if(Input.Gamepads.Down.DirectionalTimeLast === 0) {
            // First time
            Input.Gamepads.Down.DirectionalTimeBuffer = -325
            MovedFocus = global.UI.MoveFocus(direction)
        } else if(Input.Gamepads.Down.DirectionalTimeBuffer >= 55) {
            // Move in direction again, reset buffer
            Input.Gamepads.Down.DirectionalTimeBuffer = 0
            Input.Gamepads.Down.DirectionalTimeTotal += delta
            MovedFocus = global.UI.MoveFocus(direction)
        } else {
            // Fill buffer and wait
            Input.Gamepads.Down.DirectionalTimeBuffer += delta
            Input.Gamepads.Down.DirectionalTimeTotal += delta
        }

        Input.Gamepads.Down.DirectionalTimeLast = performance.now()

        if(MovedFocus === true) {
            global.Sounds.MovedFocus.play();
        } if(MovedFocus === false) {
            global.Sounds.EndOfList.play();
            Input.Gamepads.Down.DirectionalTimeBuffer = -2500
            
            // Play bounce animation
            let elem = global.UI.Refs[global.UI.Active.Item.ID]
            let cursors = elem.getElementsByTagName("cursor")
            let cursor = false;
            if(cursors.length > 0) {
                cursor = cursors[0]
            }

            let animElem = (cursor === false ? elem : cursor)
            var tl = new TimelineLite();
            let dirBase = window.innerWidth / 1000;
            let dir1 = 9 * dirBase;
            let dir2 = -4 * dirBase;
            let time1 = 0.04;
            let time2 = 0.07;
            let time3 = 0.06;

            if(direction == "up") {
                tl.to(animElem, time1, {top: dir1 * -1}).to(animElem, time2, {top: dir2 * -1}).to(animElem, time3, {top:0});
            } else if(direction == "down") {
                tl.to(animElem, time1, {top: dir1}).to(animElem, time2, {top: dir2}).to(animElem, time3, {top:0});
            } else if(direction == "left") {
                tl.to(animElem, time1, {left: dir1 * -1}).to(animElem, time2, {left: dir2 * -1}).to(animElem, time3, {left:0});
            } else if(direction == "right") {
                tl.to(animElem, time1, {left: dir1}).to(animElem, time2, {left: dir2}).to(animElem, time3, {left:0});
            }
            
        }
    }

    GamepadEvent(gp, index) {
        let Input = global.Input; // I'm lazy
        let isActive = false;
        let DirectionDown = false;
        let ButtonsDown = [];
        gp.buttons.forEach((value, index) => {
            if(value.pressed == true) {
                //console.log(index)
                isActive = true;

                // Find appropriate action and defer execution to next frame
                // Not sure if I should try requestAnimationFrame or setTimeout to help with lag
                switch(index) {
                    case 12:
                        DirectionDown = true
                        Input.TryMoveFocus("up")
                        break;
                    case 13:
                        DirectionDown = true
                        Input.TryMoveFocus("down")
                        break;
                    case 14:
                        DirectionDown = true
                        Input.TryMoveFocus("left")
                        break;
                    case 15:
                        DirectionDown = true
                        Input.TryMoveFocus("right")
                        break;
                    case 0:
                        // A - Accept
                        Input.Gamepads.Down.Buttons.push(0) 
                        if(global.Input.Gamepads.Down.LastButtons.includes(0) === false) {
                            global.UI.Active.Item.PrimaryAction(global.UI.Active.Item)
                        }
                        break;
                    case 1:
                        // B - Back
                        Input.Gamepads.Down.Buttons.push(1) 
                        if(global.Input.Gamepads.Down.LastButtons.includes(1) === false) {
                            global.UI.Active.Item.BackAction(global.UI.Active.Item)
                        }
                        break;
                    case 3:
                        // Y - More
                        Input.Gamepads.Down.Buttons.push(3) 
                        if(global.Input.Gamepads.Down.LastButtons.includes(3) === false) {
                            global.UI.Active.Item.SecondaryAction(global.UI.Active.Item)
                        }
                        break;
                        
                }

            }
        });
        
        if(Math.abs(gp.axes[0]) > 0.75 || Math.abs(gp.axes[1]) > 0.75)
            isActive = true;
        
        if(gp.axes[0] < -0.75) {
            // RS X Left
            DirectionDown = true
            Input.TryMoveFocus("left")
        } else if(gp.axes[0] > 0.75) {
            // RS X Right
            DirectionDown = true
            Input.TryMoveFocus("right")
        } 
        
        if(gp.axes[1] < -0.75) {
            // RS Y Up
            DirectionDown = true
            Input.TryMoveFocus("up")
        } else if(gp.axes[1] > 0.75) {
            // RS Y Down
            DirectionDown = true
            Input.TryMoveFocus("down")
        }

        if(DirectionDown) {
            Input.Gamepads.Down.DirectionDown = true
        }        

        return isActive;
    }
    
    


    HandleKeyDown(e) {
        let Input = global.Input; // I'm lazy
        if(!document.hasFocus() && !Input.Gamepads.BackgroundInput)
            return false;

        console.log(e.key + "Down");
        if (e.key == "ArrowUp") {
            Input.Gamepads.Down.DirectionDown = true
            Input.TryMoveFocus("up");
            e.preventDefault();
          } else if (e.key == "ArrowDown") {
            Input.Gamepads.Down.DirectionDown = true
            Input.TryMoveFocus("down");
            e.preventDefault();
          } else if (e.key == "ArrowLeft") {
            Input.Gamepads.Down.DirectionDown = true
            Input.TryMoveFocus("left");
            e.preventDefault();
          } else if (e.key == "ArrowRight") {
            Input.Gamepads.Down.DirectionDown = true
            Input.TryMoveFocus("right");
            e.preventDefault();
          }
          
    }

    HandleKeyUp(e) {
        let Input = global.Input; // I'm lazy
        if(!document.hasFocus() && !global.Input.Gamepads.BackgroundInput)
        return false;

        console.log(e.key + "Up");
    if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
        Input.Gamepads.Down.DirectionDown = false
        global.Input.ResetDirectionalTime()
        e.preventDefault();
      } 

    }
    

    RunGame(game) {
        //let tst = exec('start steam://rungameid/' + game.meta.id);
        //console.log('start steam://rungameid/' + game.meta.id);
        global.AppJS.triggerLaunchScreen(game);
        //window.open("steam://rungameid/" + game.meta.id, 'sharer', 'toolbar=0,status=0,width=548,height=325');
    }



    
}