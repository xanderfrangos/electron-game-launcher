export default class UIItem {
    constructor(primaryAction) {
        this.Active = false;
        this.PrimaryAction = primaryAction;
        this.meta = {};
    }
    SecondaryAction() { return false; }
}