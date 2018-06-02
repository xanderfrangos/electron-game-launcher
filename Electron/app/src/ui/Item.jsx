export default class UIItem {
    constructor(primaryAction = () => {}, focusAction = () => {}, secondaryAction = () => {}) {
        this.Active = false;
        this.PrimaryAction = primaryAction;
        this.SecondaryAction = secondaryAction;
        this.FocusAction = focusAction;
        this.meta = {};
        this.ID = 0;
        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.Items[this.ID] = this;
        }
    }
    SecondaryAction() { return false; }
}