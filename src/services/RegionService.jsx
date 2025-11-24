import axios from 'axios';

const API_URL = 'https://psetiendaapi.onrender.com/api/v1/regiones';

class regionService {

    async getAllRegiones(){
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener regiones:'.error);
            throw error;
        }
    }
}

export default new regionService();