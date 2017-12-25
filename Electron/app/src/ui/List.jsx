export default class UIList {
    constructor(items, title = "", width = 1) {
        this.Active = false;
        this.Title = title;
        this.Items = items;
        this.ActiveItem = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
        this.Width = width; // Number of rows/columns perpendicular to the list.
    }
}