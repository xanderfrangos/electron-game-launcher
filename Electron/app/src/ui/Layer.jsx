export default class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.ID = -1;
        this.Title = title;
        this.Lists = lists;
        this.ActiveList = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
    }
}