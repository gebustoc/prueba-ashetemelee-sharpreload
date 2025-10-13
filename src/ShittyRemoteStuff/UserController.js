import User from "./User.js";

// strip the stuff in the bottom
export class UserController{
    
    static ErrorCodes = {
        OK:0,
        USER_EXISTS:1,
        USER_NOT_FOUND:2,
        WRONG_PASSWORD:3,
        EMAIL_TOO_LONG:4

    }

    // creates empty user dict
    constructor(){
        if (localStorage.getItem("users") !== null) return;
        localStorage.setItem("users",JSON.stringify({}))
    }

    userExists(userName){
        if (userName == undefined) return false;
        let users = JSON.parse(localStorage.getItem("users"));
        return users[userName] != undefined;
    }

    getUser(userName){
        if (userName == undefined) return null;
        let users = JSON.parse(localStorage.getItem("users"));
        let user = users[userName];
        let retval = new User(user._userName,user._passHash);
        retval.setCarrito(user._carrito);
        return retval;
    }



    saveUser(user){
        if (this.userExists(user.getUserName())){
            console.error(`el usuario ${user.getUserName()} ya existe en el sistema`);
            return UserController.ErrorCodes.USER_EXISTS;
        }
        if (user.getUserName().length > 100){
            console.error("el correo es muy largo :/")
            return UserController.ErrorCodes.EMAIL_TOO_LONG;
        }

        let users = JSON.parse(localStorage.getItem("users")); 
        users[user.getUserName()] = user;
        localStorage.setItem("users",JSON.stringify(users));
        return UserController.ErrorCodes.OK;
    }
    updateUser(user){
        if (!this.userExists(user.getUserName())){
            console.error(`el usuario ${user.getUserName()} no existe en el sistema`);
            return UserController.ErrorCodes.USER_NOT_FOUND;    
        }
        if (user.getUserName().length > 100){
            console.error("el correo es muy largo :/");
            return UserController.ErrorCodes.EMAIL_TOO_LONG;
        }
        
        let users = JSON.parse(localStorage.getItem("users")); 
        users[user.getUserName()] = user;
        localStorage.setItem("users",JSON.stringify(users));
        return UserController.ErrorCodes.OK;
    }


    eraseUser(user){
        if (!this.userExists(user.getUserName())){
            console.error(`el usuario ${user.getUserName()} no existe en el sistema`);
            return UserController.ErrorCodes.USER_NOT_FOUND;    
        }
        let users = JSON.parse(localStorage.getItem("users"));
        delete users[user.getUserName()];
        localStorage.setItem("users",JSON.stringify(users));
        return UserController.ErrorCodes.OK;
    }
    
    loginUser(user){
        if (!this.userExists(user.getUserName())){
            console.error(`el usuario ${user.getUserName()} no existe en el sistema`);
            return UserController.ErrorCodes.USER_NOT_FOUND;    
        }
        let validUser = this.getUser(user.getUserName());

        if (validUser.getPassHash() !== user.getPassHash()){
            console.error(`contraseña incorrecta.`);            
            return UserController.ErrorCodes.WRONG_PASSWORD;
        }
        return UserController.ErrorCodes.OK;
    }  


}

export default UserController;