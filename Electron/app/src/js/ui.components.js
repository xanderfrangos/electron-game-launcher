// UILayer -> UIList Array -> UIItem Array

export class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.Title = title;
        this.Lists = lists;
        this.ActiveList = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
    }
}

export class UIList {
    constructor(items, title = "", width = 1) {
        this.Active = false;
        this.Title = title;
        this.Items = items;
        this.ActiveItem = 0;
        this.IsHorizontal = false; // false = Vertical, true = Horizontal
        this.Width = width; // Number of rows/columns perpendicular to the list.
    }
}

export class UIItem {
    constructor(primaryAction) {
        this.Active = false;
        this.PrimaryAction = primaryAction;
    }
    SecondaryAction() { return false; }
}

export class UIPopup {
    // UI Layer with 2 lists
    constructor(options, actions = false, title = "") {
        this.Active = false;
        this.Title = title;
        this.Lists = [options, actions]
    }
}

export class UICheckbox {
    constructor(title, value) {
        this.Active = false;
        this.Title = title;
        this.Value = value;
    }
}

export class UIDropdown {
    constructor(title, options, value) {
        this.Active = false;
        this.Title = title;
        this.Options = Option;
        this.Value = value;
    }
}

export class UITextbox {
    constructor(title, value) {
        this.Active = false;
        this.Title = title;
        this.Value = value;
    }
}
