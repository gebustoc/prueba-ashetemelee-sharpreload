import axios from 'axios';

const API_URL = "https://psetiendaapi.onrender.com/api/v1/categorias";

class CategoriaService {
    async getAllCategorias() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erro al obtener comunas:', error);
            throw error;
        }
    }
    async createCategoria(categoriaData) {
        try {
            const response = await axios.post(API_URL, categoriaData, {
                headers: {
                    'Content-Type':'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear categoria:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateCategoria(categoriaId, categoriaData) {
        try {
            const response = await axios.put(`${API_URL}/${categoriaId}`, categoriaData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar categoria:', error.response?.data || error.message);
            throw error;
        }
    }

    async deleteCategoria(categoriaId) {
        try {
            await axios.delete(`${API_URL}/${categoriaId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar categoria:', error.response?.data || error.message);
            throw error;
        }
    }

}

export default new CategoriaService(); // ???