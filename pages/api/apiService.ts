
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface LibroResponse {
  titulo: string,
  descripcion: string,
  fechaPublicacion: string
}

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
    });
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response: AxiosResponse<LoginResponse> = await this.api.post('/Account/Login', {
      email,
      password
    });
    return response.data;
  }

  async getLibroPorTitulo(titulo: string): Promise<LibroResponse> {
    const response: AxiosResponse<LibroResponse> = 
                    await this.api.get(`Libros/GetByTitulo?titulo=${titulo}`);
    return response.data;
  }

}

const apiService = new ApiService('https://localhost:7191/api');

export default apiService;
