export default class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.ID = -1;
        this.Title = title;
        this.Lists = lists;
        this.LastUpdate = Date.now();
        this.defaultBackAction = () => {}
        this.UpdateTS = () => {
            this.LastUpdate = Date.now();
        }

        // If only a single list object is provided instead of array, conver to array
        if(!Array.isArray(lists))
            this.Lists = [lists];

        this.ActiveIndex = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal

        if(global.UI) {
            this.ID = global.UI.Counters.Refs;
            global.UI.Counters.Refs++;
            global.UI.LayerIDs[this.ID] = this;
            global.UI.LayerCache[this.ID] = this;
        }

        for(var i = 0; i < this.Lists.length; i++) {
            this.Lists[i].ParentLayer = this
        }
    }

    
}