class UIList {
    constructor(items, title = "", width = 1) {
        this.Active = false;
        this.Title = title;
        this.Items = items;
        this.ActiveItem = 0;
        this.Horizontal = 0; // Vertical
        this.Width = width;
    }
}

class UIItem {
    constructor(primaryAction) {
        this.Active = false;
        this.PrimaryAction() = primaryAction;
    }
    SecondaryAction() { return false; }
}

class UILayer {
    constructor(lists, title = "") {
        this.Active = false;
        this.Title = title;
        this.Lists = lists;
    }
}

class UIPopup {
    // UI Layer with 2 lists
    constructor(options, actions = false, title = "") {
        this.Active = false;
        this.Title = title;
        this.Lists = [options, actions]
    }
}

class UICheckbox {
    constructor(title, value) {
        this.Active = false;
        this.Title = title;
        this.Value = value;
    }
}

class UIDropdown {
    constructor(title, options, value) {
        this.Active = false;
        this.Title = title;
        this.Options = Option;
        this.Value = value;
    }
}

class UITextbox {
    constructor(title, value) {
        this.Active = false;
        this.Title = title;
        this.Value = value;
    }
}
