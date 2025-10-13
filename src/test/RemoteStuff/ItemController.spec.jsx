import Item from "../../ShittyRemoteStuff/Item.js";
import ItemController from "../../ShittyRemoteStuff/ItemController.js";

describe('Item (aka Product) Controller', () => {



     it('comprueba si se agregan los items', () => {
          const testItem = new Item("UNIT_ITEM","UNIT_ITEM",0,32,1,"");//("teto","5B 6A jc j.C j.D jc j.C j.D 214C 214D")
          new ItemController().saveItem(testItem);
          expect(new ItemController().getItem(testItem.getId())).toEqual(testItem);
          expect(parseInt(localStorage.getItem("newestItem"))).toBe(11)
     });



});
