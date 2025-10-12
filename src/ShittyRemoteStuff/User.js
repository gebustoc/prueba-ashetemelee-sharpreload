export class User{
    constructor(userName, passHash){
        this._userName = userName;
        this._passHash = passHash;
        this._carrito = [];
    }

    getUserName(){return this._userName;}
    getPassHash(){return this._passHash;}
    getCarrito(){return this._carrito}

    setUserName(val){this._userName = val;}
    setPassHash(val){this._passHash = val;}
    setCarrito(val){
        if (val == undefined) return;
        if (!Array.isArray(val))return;
        this._carrito = val;
    }


}


export default User;