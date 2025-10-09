import { Item } from "./Item.js";

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

class ItemController{
    
    static ErrorCodes = {
        OK:0,
        ITEM_EXISTS:1,
        ITEM_NOT_FOUND:2,
    }

    constructor(){

        if (localStorage.getItem("items") === null){
            localStorage.setItem("items",JSON.stringify({}));
            localStorage.setItem("newestItem",-1);
            let priceMult = 1.0;
            new ItemController().saveItem(
                new Item("Taza", "Taza de cerámica blanca", 2990, 50, 1.0, "./img/Inodoro-Pronto-Manilla-cromada-1.webp")
            );
            
            
            new ItemController().saveItem(
                new Item("Gráfica RTX 5080", "Tarjeta Grafica de ultima generacion", 800000, 5, 1.0, "./img/pny-geforce-rtx-5080-16gb-argb-overclocked-triple-fan.webp")
            );
            new ItemController().saveItem(
                new Item("tula", "la bebida de todos los chilenos", 800000, 5, 1.0, "./img/por-fin-tula-coquette-v0-500u942oxjjd1.webp")
            );

            for (let i = 0; i < 8; i++) {
                let stock = getRandomInt(4,20);
                this.saveItem(new Item(`test-${i}`,"nose",Math.random()*99999999,stock,priceMult,"./img/tetodance.webp"));   
            }




        }
        
        

    }
    getItems(limit = Infinity){
        let items = JSON.parse(localStorage.getItem("items"));
        let itemRet = [];

        for (const id in items) {
            //if (itemRet.length >= limit) break;

            itemRet.push(this.getItem(id));
        }
        return itemRet;
    }



    itemExists(id){
        if (id == -1) return false;
        if (id == undefined) return false;
        let items = JSON.parse(localStorage.getItem("items"));
        return items[id] != undefined;
    }
    itemNameExists(name){
        let items = JSON.parse(localStorage.getItem("items"));
        for (const i in items) {
            const element = items[i];
            if (element._name == name) return true;            
        }
        
        return false;
    }

    getNewestId(){
        return Number.parseInt(localStorage.getItem("newestItem"))+1;
    }


    getItem(id){
        if (id == undefined) return null;
        if (id == null) return null;
        let items = JSON.parse(localStorage.getItem("items"));
        let item = items[id];
        if (!item) return null;
        let truitem = new Item(item._name,item._description,item._price,item._stock,item._pricemod,item._imgsrc);
        truitem.setId(item._id);
        return truitem;
    }

    saveItem(item){
        if (this.itemExists(item.getId()) || this.itemNameExists(item.getName())){
            console.error("el item", item, "ya existe en el sistema");
            return ItemController.ErrorCodes.ITEM_EXISTS;    
        }

        let items = JSON.parse(localStorage.getItem("items")); 

        item.setId(this.getNewestId());
        localStorage.setItem("newestItem",item.getId());
        items[item.getId()] = item;
        localStorage.setItem("items",JSON.stringify(items));
        return ItemController.ErrorCodes.OK;
    }

    updateItem(item){
        if (!this.itemExists(item.getId())){
            console.error("el item", item, "no existe en el sistema");
            return ItemController.ErrorCodes.ITEM_NOT_FOUND;    
        }
        
        let items = JSON.parse(localStorage.getItem("items")); 
        items[item.getId()] = item;
        localStorage.setItem("items",JSON.stringify(items));
        return ItemController.ErrorCodes.OK;
    }


    eraseItem(item){
        if (!this.itemExists(item.getId())){
            console.error("el item", item, "no existe en el sistema");
            return ItemController.ErrorCodes.ITEM_NOT_FOUND;    
        }
        let items = JSON.parse(localStorage.getItem("items"));
        delete items[user.getId()];
        localStorage.setItem("items",JSON.stringify(items));
        return ItemController.ErrorCodes.OK;
    }
    

}




export default ItemController;