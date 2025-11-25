import axios from "axios";

const API_URL = "https://psetiendaapi.onrender.com/api/v1/clientes";

class UserService {
  async getAllUsuarios() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  async getClienteById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener cliente:", error);
      throw error;
    }
  }

  async register(clienteData) {
    try {
      const response = await axios.post(API_URL, clienteData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data && clienteData.contrasena) {
        await this.login(clienteData.email, clienteData.contrasena);
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error al registrar usuario:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateCliente(id, clienteData) {
    try {

      console.log(JSON.stringify(clienteData,null,"\t"))
      console.log(id)

      const response = await axios.put(`${API_URL}/${id}`, clienteData, {
        headers: {"Content-Type": "application/json",},
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al actualizar cliente:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async deleteUsuario(userId) {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      return true;
    } catch (error) {
      console.error(
        "Error al eliminar usuario:",
        error.response?.data || error.message
      );
      throw error;
      a;
    }
  }

  async login(email, contrasena) {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        {
          email,
          contrasena,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("cur_user", email);
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("cur_user");
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  isAuthenticated() {
    return this.getCurrentUser() !== null;
  }

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.rol && user.rol.nombre === "ADMIN";
  }
}

export default new UserService();
