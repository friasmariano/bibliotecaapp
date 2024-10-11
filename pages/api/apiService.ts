
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

interface Categoria {
  id: number;
  nombre: string;
}

type CategoriasResponse = Categoria;

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
    try {
      const encodedTitulo = encodeURIComponent(titulo);
      const response: AxiosResponse<LibroResponse> = 
        await this.api.get(`Libros/GetByTitulo?titulo=${encodedTitulo}`);
      return response.data;
    } catch (error) {
      throw new Error('Hubo un error en la búsqueda.');
    }
  }

  async getLibroPorCategoria(categoria: string): Promise<LibroResponse> {
    try {
      const encodedCategoria = encodeURIComponent(categoria);
      const response: AxiosResponse<LibroResponse> = 
        await this.api.get(`Libros/GetByCategoria?categoria=${encodedCategoria}`);
      return response.data;
    } catch (error) {
      throw new Error('Hubo un error en la búsqueda.');
    }
  }

  async getCategorias(): Promise<CategoriasResponse> {
    try {
      const response: AxiosResponse<CategoriasResponse> = await this.api.get(`Categorias/GetAll`);
      
      // console.log('Full Axios Response:', response); 
  
      return response.data;
    } catch (error) {
      console.error('Hubo un error en la búsqueda:');
      throw new Error('Hubo un error en la búsqueda.');
    }
  }

}

const apiService = new ApiService('http://localhost:5267/api');

export default apiService;
