export default class UIList {
    constructor(items, title = "", width = items.length) {
        this.Active = false;
        this.Title = title;
        this.Items = items;
        this.ID = -1;
        this.ActiveIndex = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
        this.Width = width; // Number of rows/columns perpendicular to the list.
        this.LastUpdate = Date.now();
        this.ParentLayer = false;

        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.Lists[this.ID] = this;
        }

        if(this.ActiveIndex < 0) {
            this.ActiveIndex = 0
        } else if(this.ActiveIndex > this.Items.length) {
            this.ActiveIndex = this.Items.length
        }

        for(var i = 0; i < this.Items.length; i++) {
            this.Items[i].ParentList = this
        }

    }
}