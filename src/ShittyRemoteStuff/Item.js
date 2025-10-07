export class Item{
    constructor(name, description, price,stock,pricemod = 1.0, imgsrc){
        this._name = name;
        this._description = description;
        this._price = price;
        this._stock = 0;
        this.pricemod = 1.0;
        this._id = -1;
        this._imgsrc = imgsrc;

        
        this.setPriceMod(pricemod);
        this.setStock(stock);
    }
    setId(id){
        if (this._id != -1) return;
        this._id = id;
    }
    setName(name){this._name = name;}
    setDescription(description){ this._description = description;}
    setPrice(price){this._price = price;}
    setStock(stock){
        if (stock < 0){
            console.error("el stock debe ser igual o mayor que 0")
            this._stock = 0;
            return;
        }
        
        this._stock = stock
    
    }
    setPriceMod(pricemod){
        if (pricemod > 1.0){
            console.error("el multiplicador de descuento debe ser igual o menor que 1.0")
            return ;
        }
        this._pricemod = pricemod;
    }
    setImgSrc(imgsrc){ this._imgsrc = imgsrc;}
    
    getId(){return this._id;}
    getName(){return this._name;}
    getDescription(){return this._description;}
    getPrice(){return this._price;}
    getStock(){return this._stock}
    getPriceMod(){return this._pricemod; }
    getImgSrc(){return this._imgsrc;}


}

