global.UINavigation = class {
    constructor() {
        this.Layers = [];
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
        this.LayerCache = [{NextID:0,Layers:[ this.Active.Layer ]}];
        this.Layers = [this.Active.Layer]
    }

    NewCacheLayer(lists, title = "") {
        var NewLayer = new UILayer(lists, title);
        var LayerID = CacheLayer(NewLayer);
        return LayerID;
    }

    CacheLayer(layer) {
        this.LayerCache.Layers["layer"+this.LayerCache.NextID].push(layer);
        var LayerID = this.LayerCache.NextID;
        this.LayerCache.NextID++;
        return LayerID;
    }

    DestroyLayer(layerID) {
        // TODO: Write function
        // Remove layer from cache;
    }

    PreviousLayer() {
        var CurrentLayerID = this.Layers[this.Layers.length - 1];
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers.splice(this.Layers.length - 1, 1);
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
        this.DestroyLayer(CurrentLayerID);
    }

    NewLayer(layerID) {
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers.push(layerID);
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
    }

    ChangeLayer(layerID) {
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers[this.Layers.length - 1] = layerID;
        this.LayerCache[this.Layers[this.Layers.length - 1]].Active = true;
    }

    SetCurrentListItemIndex(ItemIndex) {
        this.Active.Item.Active = false;
        this.LayerCache[this.Layers[this.CurrentLayerID]].Lists[this.LayerCache[this.Layers[this.CurrentLayerID]].ActiveList].ActiveItem = ItemIndex;
        
        this.RefreshCurrentItem();
        this.Active.Item.Active = true;
    }

    SetCurrentListIndex(ListIndex, ItemIndex = 0) {
        this.Active.List.Active = false;
        this.LayerCache[this.Layers[this.CurrentLayerID]].ActiveList = ListIndex;

        this.LayerCache[this.Layers[this.CurrentLayerID]].Lists[this.LayerCache[this.Layers[this.CurrentLayerID]].ActiveList].ActiveItem = ItemIndex;
        
        this.RefreshCurrentItem();
        this.Active.List.Active = true;
    }

    RefreshCurrentItem() {
        // Yes, I hate myself.
        this.CurrentItem = this.LayerCache[this.Layers[this.CurrentLayerID]].Lists[this.LayerCache[this.Layers[this.CurrentLayerID]].ActiveList].Items[this.LayerCache[this.Layers[this.CurrentLayerID]].Lists[this.LayerCache[this.Layers[this.CurrentLayerID]].ActiveList].ActiveItem];
    }

    UpdateActiveObject() {
        this.Active.Layer = this.LayerCache[this.Layers[this.CurrentLayerID]];
        this.Active.List = CurrentLayer.Lists[CurrentLayer.ActiveList];
        this.Active.Item = CurrentList.Items[CurrentList.ActiveItem];
    }

    MoveFocus(direction) {
        UpdateActiveObject();

        var CurrentLayer = this.Active.Layer;
        var CurrentList = this.Active.List;
        var CurrentItem = this.Active.Item;

        if(direction == "up") {
            if(CurrentList.IsHorizontal) {
                // Determine if should navigate up/down rows, or go to previous list.
                
                // TODO: Everything

            } else {
                // Determine if can go up. If not, try to go to previous one.
                var DesiredIndex = CurrentList.ActiveItem - CurrentList.Width;

                if(DesiredIndex < 0) {
                    // Cannot go up.
                    // Find previous list, if available.

                    // Start with above list
                    var ListIndex = CurrentLayer.ActiveList - 1;

                    while(ListIndex > 0) {
                        // Make sure this list has at least 1 item in it. Otherwise, skip.
                        if(CurrentLayer.Lists[ListIndex].Items.length > 0) {
                            break;
                        } else {
                            ListIndex--;
                        }
                        
                    } 

                    if(ListIndex < 0) {
                        // Cannot go up any further
                        // Abort!
                        return false;

                    } else {
                        // Move to new list at new item
                        
                        // Determine old column.
                        var OldCol = CurrentList.ActiveItem - (Math.floor(CurrentList.ActiveItem / CurrentList.Width) * CurrentList.Width);

                        // Match up with column in last row of above list.
                        var NewList = CurrentLayer.Lists[ListIndex];
                        var NewCol = Math.round((OldCol / CurrentList.Width) * NewList.Width);
                        var NewItemIndex = Math.ceil(NewList.Items.length - NewList.Width / NewList.Width) + NewCol;

                        // If there there isn't an equal column position because the row isn't full enough, we get the last item instead
                        if(NewItemIndex > NewList.Items.length - 1) {
                            NewItemIndex = NewList.Items.length - 1;
                        }

                        // Set new List/Item Index
                        this.SetCurrentListIndex(ListIndex, NewItemIndex);

                    }

                } else {
                    // Can go up. 
                    // So we go up!
                    this.SetCurrentListItemIndex(DesiredIndex);
                }

                // End Direction Up

            }
        } else if(direction == "down") {
            if(CurrentList.IsHorizontal) {
                // Determine if should navigate up/down rows, or go to previous list.
                
                // TODO: Everything

            } else {
                // Determine if can go down. If not, try to go to next one.
                var DesiredIndex = CurrentList.ActiveItem + CurrentList.Width;

                if(DesiredIndex > CurrentList.Items.length - 1) {
                    // Cannot go down.
                    // Find next list, if available.

                    // Start with next list
                    var ListIndex = CurrentLayer.ActiveList + 1;

                    while(ListIndex < CurrentLayer.Lists.length - 1) {
                        // Make sure this list has at least 1 item in it. Otherwise, skip.
                        if(CurrentLayer.Lists[ListIndex].Items.length > 0) {
                            break;
                        } else {
                            ListIndex++;
                        }
                        
                    } 

                    if(ListIndex > CurrentLayer.Lists.length - 1) {
                        // Cannot go down any further
                        // Abort!
                        return false;

                    } else {
                        // Move to new list at new item
                        
                        // Determine old column.
                        var OldCol = CurrentList.ActiveItem - (Math.floor(CurrentList.ActiveItem / CurrentList.Width) * CurrentList.Width);

                        // Match up with column in first row of next list.
                        var NewList = CurrentLayer.Lists[ListIndex];
                        var NewCol = Math.round((OldCol / CurrentList.Width) * NewList.Width);
                        var NewItemIndex = NewCol;

                        // If there there isn't an equal column position because the row isn't full enough, we get the last item instead
                        if(NewItemIndex > NewList.Items.length - 1) {
                            NewItemIndex = NewList.Items.length - 1;
                        }

                        // Set new List/Item Index
                        this.SetCurrentListIndex(ListIndex, NewItemIndex);

                    }

                } else {
                    // Can go up. 
                    // So we go up!
                    this.SetCurrentListItemIndex(DesiredIndex);
                }

                // End Direction Up
            }
        } else if(direction == "left") {

        } else if(direction == "right") {

        }
    }

    ActivatePrimary() {
        this.RefreshCurrentItem();
        this.CurrentItem.PrimaryAction();
    }

    ActivateSecondary() {
        this.RefreshCurrentItem();
        this.CurrentItem.SecondaryAction();
    }
    
}