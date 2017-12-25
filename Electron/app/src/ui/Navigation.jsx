import UILayer from './Layer.jsx'
import UIList from './List.jsx'
import UIItem from './Item.jsx'

export default class UINavigation {
    constructor() {
        this.Layers = [];
        this.ActiveLayer = 0;
        this.AllowInput = true;
        this.CurrentItem = new UIItem({});
        this.FollowInput = true;
        this.LayerCache = {NextID:0,Layers:[]};
    }

    NewCacheLayer(lists, title = "") {
        var NewLayer = new UILayer(lists, title);
        var LayerID = this.CacheLayer(NewLayer);
        return LayerID;
    }

    CacheLayer(layer) {
        this.LayerCache.Layers["layer" + this.LayerCache.NextID] = layer;
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
        this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers.splice(this.Layers.length - 1, 1);
        this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = true;
        this.DestroyLayer(CurrentLayerID);
    }

    NewLayer(layerID) {
        if(this.Layers.length > 0) {
            this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = false;
        }
        this.Layers.push(layerID);
        this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = true;
    }

    ChangeLayer(layerID) {
        this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = false;
        this.Layers[this.Layers.length - 1] = layerID;
        this.LayerCache.Layers["layer" + this.Layers[this.Layers.length - 1]].Active = true;
    }

    SetCurrentListItemIndex(ItemIndex) {
        this.LayerCache[this.Layers[this.ActiveLayer]].Lists[this.LayerCache[this.Layers[this.ActiveLayer]].ActiveList].ActiveItem = ItemIndex;
        
        this.RefreshCurrentItem();
    }

    SetCurrentListIndex(ListIndex, ItemIndex = 0) {
        this.LayerCache[this.Layers[this.ActiveLayer]].ActiveList = ListIndex;

        this.LayerCache[this.Layers[this.ActiveLayer]].Lists[this.LayerCache[this.Layers[this.ActiveLayer]].ActiveList].ActiveItem = ItemIndex;
        
        this.RefreshCurrentItem();
    }

    RefreshCurrentItem() {
        // Yes, I hate myself.
        this.CurrentItem = this.LayerCache[this.Layers[this.ActiveLayer]].Lists[this.LayerCache[this.Layers[this.ActiveLayer]].ActiveList].Items[this.LayerCache[this.Layers[this.ActiveLayer]].Lists[this.LayerCache[this.Layers[this.ActiveLayer]].ActiveList].ActiveItem];
    }

    MoveFocus(direction) {
        var CurrentLayer = this.LayerCache[this.Layers[this.ActiveLayer]];
        var CurrentList = CurrentLayer.Lists[CurrentLayer.ActiveList];
        var CurrentItem = CurrentList.Items[CurrentList.ActiveItem];

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