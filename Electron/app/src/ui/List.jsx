export default class UIList {
    constructor(items, title = "", width = 1) {
        this.Active = false;
        this.Title = title;
        this.Items = items;
        this.ID = -1;
        this.ActiveIndex = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
        this.Width = width; // Number of rows/columns perpendicular to the list.
        this.LastUpdate = Date.now();

        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.Lists[this.ID] = this;
        }

    }
}