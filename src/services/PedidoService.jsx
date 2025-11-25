import axios from 'axios';

const API_URL = "https://psetiendaapi.onrender.com/api/v1/pedidos";

class PedidoService {

    async createPedido(categoriaData) {
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


}

export default new PedidoService(); // ???