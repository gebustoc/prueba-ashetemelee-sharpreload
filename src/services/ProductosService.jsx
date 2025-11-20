import axios from 'axios';

const API_URL = 'https://psetiendaapi.onrender.com/api/v1/productos';

class ProductosService {

    async getAllProductos() {
        try {
            const reponse = await axios.get(API_URL);
            return reponse.data; 
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    }

    async createProducto(productoData) {
        try {
            const response = await axios.post(API_URL, productoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear producto:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateProducto(productoId, productoData) {
        try {
            const response = await axios.patch(`${API_URL}/${productoId}`, productoData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar producto:', error.response?.data || error.message);
            throw error;
        }
    }

    async deleteProducto(productoId) {
        try {
            await axios.delete(`${API_URL}/${productoId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar producto:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new ProductosService();