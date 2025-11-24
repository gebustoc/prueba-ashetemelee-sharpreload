import axios from 'axios';

const API_URL = "https://psetiendaapi.onrender.com/api/v1/comunas";

class comunaService {
    async getAllComunas() {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erro al obtener comunas:', error);
            throw error;
        }
    }
}

export default new comunaService();