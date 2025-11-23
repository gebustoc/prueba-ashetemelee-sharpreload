import axios from 'axios';

const API_URL = 'https://psetiendaapi.onrender.com/api/v1/clientes'

class UserService {
    
    async getAllUsuarios() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuarios:',error)
            throw error;
        }
    }

    async createUsuario(userData) {
        try {
            const response = await axios.post(API_URL, userData, {
                headers: {
                    'Content-Type':'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear usuario;',error.response?.data || error.message);
            throw error;
        }
    }

    async deleteUsuario(userId) {
        try {
            await axios.delete(`${API_URL}/${userId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar usuario:',error.response?.data || error.message);
            throw error;a
        }
    }
}

export default new UserService();