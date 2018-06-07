export default class UIItem {
    constructor(primaryAction = () => {}, focusAction = () => {}, secondaryAction = () => {}, backAction= () => {}) {
        this.Active = false;
        this.PrimaryAction = primaryAction;
        this.SecondaryAction = secondaryAction;
        this.BackAction = backAction;
        this.FocusAction = focusAction;
        this.meta = {};
        this.ID = 0;
        this.LastUpdate = Date.now();
        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.Items[this.ID] = this;
        }
    }
    SecondaryAction() { return false; }
}