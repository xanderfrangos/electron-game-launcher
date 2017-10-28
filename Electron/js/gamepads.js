var gamepads = [];

function gamepadHandler(event, connecting) {
    var gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]

    if (connecting) {
        gamepads[gamepad.index] = gamepad;
    } else {
        delete gamepads[gamepad.index];
    }
}

window.addEventListener("gamepadconnected", function(e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function(e) { gamepadHandler(e, false); }, false);



function buttonPressed(b) {
    if (typeof(b) == "object") {
        return b.pressed;
    }
    return b == 1.0;
}

var a = 0, b = 0;

function gameLoop() {
    if (gamepads.length < 1) {
        start = requestAnimationFrame(gameLoop);
        return false;
    }

    var gp = gamepads[0];
    if (buttonPressed(gp.buttons[0])) {
        b--;
    } else if (buttonPressed(gp.buttons[2])) {
        b++;
    }
    if (buttonPressed(gp.buttons[1])) {
        a++;
    } else if (buttonPressed(gp.buttons[3])) {
        a--;
    }
    
    console.log(a,b);

    start = requestAnimationFrame(gameLoop);
}

gameLoop();