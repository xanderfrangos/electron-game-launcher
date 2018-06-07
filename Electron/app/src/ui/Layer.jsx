export default class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.ID = -1;
        this.Title = title;
        this.Lists = lists;
        this.LastUpdate = Date.now();
        this.UpdateTS = () => {
            console.log("TS Before", this.LastUpdate)
            this.LastUpdate = Date.now();
            console.log("TS After", this.LastUpdate)
        }

        // If only a single list object is provided instead of array, conver to array
        if(!Array.isArray(lists))
            this.Lists = [lists];

        this.ActiveIndex = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
    }

    
}