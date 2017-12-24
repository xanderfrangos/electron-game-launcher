var Navigation = class {
    constructor() {
        this.Layers = [];
        this.AllowInput = true;
        this.CurrentItem = new UIItem({});
        this.FollowInput = true;

        this.LayerCache = [];
    }

    PreviousLayer() {
        this.Layers.splice(this.Layers.length - 1, 1);
        this.Layers[this.Layers.length - 1].Active = true;
    }

    NewLayer(layer) {
        this.Layers[this.Layers.length - 1].Active = false;
        this.Layers.push(layer);
        this.Layers[this.Layers.length - 1].Active = true;
    }

    ChangeLayer(layer) {
        this.Layers[this.Layers.length - 1].Active = false;
        this.Layers[this.Layers.length - 1] = layer;
        this.Layers[this.Layers.length - 1].Active = true;
    }

    MoveFocus(direction) {

    }

    ActivatePrimary() {
        this.CurrentItem.PrimaryAction();
    }

    ActivateSecondary() {
        this.CurrentItem.SecondaryAction();
    }
    
}