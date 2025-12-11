import api from "./api.js";

class UserService {
  async getAllUsuarios() {
    const response = await api.get("/clientes"); 
    return response.data;
  }

  async getClienteById(id) {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  }

  async register(clienteData) {
    if (clienteData.carrito === undefined) clienteData.carrito = "[]";
    
    const response = await api.post("/clientes", clienteData);
    
    if (response.data && clienteData.contrasena) {
      await this.login(clienteData.email, clienteData.contrasena);
    }
    return response.data;
  }

  async updateCliente(id, clienteData) {
    if (clienteData.carrito === undefined) clienteData.carrito = "[]";
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data;
  }

  async deleteUsuario(userId) {
    await api.delete(`/clientes/${userId}`);
    return true;
  }

  async login(email, contrasena) {
    const response = await api.post(`/clientes/login`, { email, contrasena });
    
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.cliente));
        localStorage.setItem("cur_user", email);
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    localStorage.removeItem("cur_user");
    window.location.href = "/login";
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.rol && user.rol.id === 3;
  }
}

export default new UserService();
