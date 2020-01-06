export default class UIItem {
    constructor(primaryAction = () => {}, focusAction = () => {}, secondaryAction = () => {}, backAction = () => {
        if(this.ParentList) {
            if(this.ParentList.ParentLayer) {
                this.ParentList.ParentLayer.defaultBackAction();
            }
        }
    }) {
        this.Active = false;
        this.PrimaryAction = primaryAction;
        this.SecondaryAction = secondaryAction;
        this.BackAction = backAction;
        this.FocusAction = focusAction;
        this.meta = {};
        this.ID = -1;
        this.LastUpdate = Date.now();
        this.ParentList = false;
        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.Items[this.ID] = this;
        }
    }
    SecondaryAction() { return false; }
}