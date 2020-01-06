export default class UISounds {
    constructor() {
        require("../../src/js/howler.min.js")

        // Play sounds using .play()
        // More info at https://github.com/goldfire/howler.js

        const path = 'src/sounds/'

        this.Startup = new Howl({
            src: [path + 'Startup - Audio On.wav']
          })
          this.UIReady = new Howl({
            src: [path + 'Startup - UI Ready.wav']
          })
          this.Select = new Howl({
            src: [path + 'Select.wav']
          })
          this.Cancel = new Howl({
            src: [path + 'Reject Changes.wav']
          })
          this.MovedFocus = new Howl({
            src: [path + 'View Change.wav']
          })
          this.ViewChange = new Howl({
            src: [path + 'View Change.wav']
          })
          this.AcceptChanges = new Howl({
            src: [path + 'Accept Changes.wav']
          })
          this.NoChanges = new Howl({
            src: [path + 'No Changes.wav']
          })
          this.EndOfList = new Howl({
            src: [path + 'No Changes.wav']
          })

          Howler.volume(0.25)
    }

    Mute(mute = true) {
        Howler.mute(mute)
    }

    Unmute() {
        Howler.mute(false)
    }

    SetVolume(volume) {
        Howler.volume(volume)
    }
}