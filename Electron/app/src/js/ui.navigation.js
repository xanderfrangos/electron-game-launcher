global.UI = class {
    constructor() {
        this.Layers = [0];
        this.CurrentLayerID = 0;
        this.AllowInput = true;
        this.FollowInput = true;

        this.Active = {
            Layer: {},
            List: {},
            Item: {}
        }
        this.Active.List = new UIList([this.Active.Item]);
        this.Active.Layer = new UILayer([this.Active.List]);
        this.LayerCache = {
            NextID: 0,
            Layers: []
        };
        this.LayerCache.Layers[0] = this.Active.Layer;
    }

    NewCacheLayer(lists, title = "") {
        var NewLayer = new UILayer(lists, title);
        var LayerID = this.CacheLayer(NewLayer);
        return LayerID;
    }

    CacheLayer(layer) {
        this.LayerCache.Layers[this.LayerCache.NextID] = layer;
        var LayerID = this.LayerCache.NextID;
        layer.ID = LayerID;
        this.LayerCache.NextID++;
        return LayerID;
    }

    DestroyLayer(layerID) {
        // TODO: Write function Remove layer from cache;
    }

    PreviousLayer() {
        var CurrentLayerID = this.Layers[this.Layers.length - 1];
        this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = false;
        this
            .Layers
            .splice(this.Layers.length - 1, 1);
        this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = true;
        this.DestroyLayer(CurrentLayerID);
    }

    NewLayer(layerID) {
        if (this.Layers.length > 0) {
            this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = false;
        }
        this
            .Layers
            .push(layerID);
        this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = true;
        this.SetCurrentListIndex(0);
    }

    ChangeLayer(layerID) {
        this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers[this.Layers.length - 1] = layerID;
        this.LayerCache.Layers[this.Layers[this.Layers.length - 1]].Active = true;
    }

    SetCurrentListItemIndex(ItemIndex) {
        this.Active.List.ActiveItem = ItemIndex;

        this.UpdateActiveObject();
    }

    SetCurrentListIndex(ListIndex, ItemIndex = 0) {
        this.Active.Layer.ActiveList = ListIndex;
        this.Active.Layer.Lists[ListIndex].ActiveItem = ItemIndex;

        this.UpdateActiveObject();
    }

    UpdateActiveObject() {
        this.Active.Layer.Active = false;
        this.Active.List.Active = false;
        this.Active.Item.Active = false;

        this.Active.Layer = this.LayerCache.Layers[this.Layers[this.Layers.length - 1]];
        this.Active.List = this.Active.Layer.Lists[this.Active.Layer.ActiveList];
        this.Active.Item = this.Active.List.Items[this.Active.List.ActiveItem];

        this.Active.Layer.Active = true;
        this.Active.List.Active = true;
        this.Active.Item.Active = true;
        if (global.AppJS) {
            global
                .AppJS
                .setState({"lists": this.Active.Layer.Lists});
        }

    }

    MoveFocus(direction) {
        var CurrentLayer = this.Active.Layer;
        var CurrentList = this.Active.List;
        var CurrentItem = this.Active.Item;

        if (direction == "up") {
            // Determine if can go up. If not, try to go to previous one.
            var DesiredIndex = CurrentList.ActiveItem - CurrentList.Width;

            if (DesiredIndex < 0) {
                // Cannot go up. Find previous list, if available. Start with above list
                var ListIndex = CurrentLayer.ActiveList - 1;

                while (ListIndex > 0) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex--;
                    }

                }

                if (ListIndex < 0) {
                    // Cannot go up any further Abort!
                    return false;

                } else {
                    // Move to new list at new item Determine old column.
                    var OldCol = CurrentList.ActiveItem - (Math.floor(CurrentList.ActiveItem / CurrentList.Width) * CurrentList.Width);

                    // Match up with column in last row of above list.
                    var NewList = CurrentLayer.Lists[ListIndex];
                    var NewCol = (OldCol / CurrentList.Width) * NewList.Width;
                    var NewItemIndex = Math.round(NewList.Items.length - NewList.Width + NewCol);

                    console.log(NewCol, NewItemIndex, NewList.Width)

                    // If there there isn't an equal column position because the row isn't full
                    // enough, we get the last item instead
                    if (NewItemIndex > NewList.Items.length - 1) {
                        NewItemIndex = NewList.Items.length - 1;
                    }

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }

            } else {
                // Can go up. So we go up!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Up
        } else if (direction == "down") {
            // Determine if can go down. If not, try to go to next one.
            var DesiredIndex = CurrentList.ActiveItem + CurrentList.Width;

            if (DesiredIndex > CurrentList.Items.length - 1) {
                // Cannot go down. Find next list, if available. Start with next list
                var ListIndex = CurrentLayer.ActiveList + 1;

                while (ListIndex < CurrentLayer.Lists.length - 1) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex++;
                    }

                }

                if (ListIndex > CurrentLayer.Lists.length - 1) {
                    // Cannot go down any further Abort!
                    return false;

                } else {
                    // Move to new list at new item Determine old column.
                    var OldCol = CurrentList.ActiveItem - (Math.floor(CurrentList.ActiveItem / CurrentList.Width) * CurrentList.Width);

                    // Match up with column in first row of next list.
                    var NewList = CurrentLayer.Lists[ListIndex];
                    var NewCol = Math.round((OldCol / CurrentList.Width) * NewList.Width);
                    var NewItemIndex = NewCol;

                    // If there there isn't an equal column position because the row isn't full
                    // enough, we get the last item instead
                    if (NewItemIndex > NewList.Items.length - 1) {
                        NewItemIndex = NewList.Items.length - 1;
                    }

                    // Set new List/Item Index
                    this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }

            } else {
                // Can go up. So we go up!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Up
        } else if (direction == "left") {
            // Determine if can go left. If not, try to go to next.
            var DesiredIndex = CurrentList.ActiveItem - 1;
            console.log((CurrentList.ActiveItem + 1) % CurrentList.Width);

            if (DesiredIndex < 0) {
                // Cannot go right. Find next list, if available. Start with next list
                var ListIndex = CurrentLayer.ActiveList - 1;

                while (ListIndex >= 0) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex--;
                    }

                }

                if (ListIndex < 0) {
                    // Cannot go right any further Abort!
                    return false;

                } else {
                    // Move to new list at new item
                    var NewItemIndex = CurrentLayer.Lists[ListIndex].Items.length - 1;

                    // Set new List/Item Index
                    //this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }

            } else if ((CurrentList.ActiveItem + 1) % CurrentList.Width == 1) {
                // Right side is blocked Abort!
                return false;
            } else {
                // Can go right. So we go right!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Right
        } else if (direction == "right") {
            // Determine if can go right. If not, try to go to next.
            var DesiredIndex = CurrentList.ActiveItem + 1;
            console.log((CurrentList.ActiveItem + 1) % CurrentList.Width);

            if (DesiredIndex > CurrentList.Items.length - 1) {
                // Cannot go right. Find next list, if available. Start with next list
                var ListIndex = CurrentLayer.ActiveList + 1;

                while (ListIndex < CurrentLayer.Lists.length - 1) {
                    // Make sure this list has at least 1 item in it. Otherwise, skip.
                    if (CurrentLayer.Lists[ListIndex].Items.length > 0) {
                        break;
                    } else {
                        ListIndex++;
                    }

                }

                if (ListIndex > CurrentLayer.Lists.length - 1) {
                    // Cannot go right any further Abort!
                    return false;

                } else {
                    // Move to new list at new item
                    var NewItemIndex = 0;

                    // Set new List/Item Index
                    //this.SetCurrentListIndex(ListIndex, NewItemIndex);

                }

            } else if ((CurrentList.ActiveItem + 1) % CurrentList.Width == 0) {
                // Right side is blocked Abort!
                return false;
            } else {
                // Can go right. So we go right!
                this.SetCurrentListItemIndex(DesiredIndex);
            }

            // End Direction Right
        }


        if(global.UI.Active.ItemRef !== undefined) {
            const mv = document.getElementById("app")
            
            const tesNode = ReactDOM.findDOMNode(global.UI.Active.ItemRef)
            global.UI.Active.ItemRefDOM = tesNode;
            //mv.scrollTop = tesNode.offsetTop;
            TweenLite.to(mv, 0.25, {scrollTo:tesNode.offsetTop});
        }

    }

    ActivatePrimary() {
        this.RefreshCurrentItem();
        this
            .CurrentItem
            .PrimaryAction();
    }

    ActivateSecondary() {
        this.RefreshCurrentItem();
        this
            .CurrentItem
            .SecondaryAction();
    }

}