import api from "./api";

class PedidoService {

    async createPedido(pedidoData) {
        try {
            const response = await api.post("/pedidos", pedidoData);
            return response.data;
        } catch (error) {
            console.error('Error al crear pedido:', error.response?.data || error.message);
            throw error;
        }
    }
}

export default new PedidoService();