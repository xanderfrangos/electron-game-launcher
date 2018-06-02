export default class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.ID = -1;
        this.Title = title;
        this.Lists = lists;

        // If only a single list object is provided instead of array, conver to array
        if(!Array.isArray(lists))
            this.Lists = [lists];

        this.ActiveList = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
    }
}