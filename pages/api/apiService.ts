
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface LibroResponse {
  id: number,
  titulo: string,
  descripcion: string,
  fecha: string,
  autor: string,
  categoria: string
}

interface Categoria {
  id: number;
  nombre: string;
}

type CategoriasResponse = Categoria[];

interface Usuario {
  Id: number,
  Nombre: string,
  Email: string,
  Rol: string
}

type UsuariosResponse= Usuario[]

///////////////////////////////////////
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

  async getLibroPorTitulo(titulo: string): Promise<LibroResponse[]> {
    try {
      const encodedTitulo = encodeURIComponent(titulo);
      const response: AxiosResponse<LibroResponse[]> = 
        await this.api.get(`Libros/GetByTitulo?titulo=${encodedTitulo}`);
      
      return response.data;
  
    } catch (error: any) {
      console.log('Error:', error);
      alert('Hubo un error en la búsqueda');
      return [];
    }
  }
  

  async getLibroPorCategoria(categoria: string): Promise<LibroResponse[]> {
    try {
      const encodedCategoria = encodeURIComponent(categoria);
      const response: AxiosResponse<LibroResponse[]> = 
        await this.api.get(`Libros/GetByCategoria?categoria=${encodedCategoria}`);
        
      return response.data;
    } catch (error) {
      alert('Hubo un error en la búsqueda')
      console.error('Error:', error);
      return [];
    }
  }

  async getLibrosPorFecha(fecha: string): Promise<LibroResponse[]> {
    const encodedFecha = encodeURIComponent(fecha);
    try {
      const response: AxiosResponse<LibroResponse[]> = 
        await this.api.get(`Libros/GetByFechaPublicacion?fecha=${encodedFecha}`);
      return response.data;
    } catch (error) {
      alert('Hubo un error en la búsqueda')
      console.error('Hubo un error en la búsqueda:', error);
      return [];
    }
  }

  async getCategorias(): Promise<CategoriasResponse[]> {
    try {
      const response: AxiosResponse<CategoriasResponse[]> = await this.api.get(`Categorias/GetAll`);
      return response.data;
    } catch (error) {
      console.error('Hubo un error en la búsqueda', error);
      return [];
    }
  }

  async getAllUsuarios(): Promise<UsuariosResponse[]> {
    try {
      const response: AxiosResponse<UsuariosResponse[]> = await this.api.get(`Account/GetAll`);
      return response.data;
    } catch (error) {
      console.error('Hubo un error al recuperar los usuarios', error);
      return [];
    }
  }

}

const apiService = new ApiService('http://localhost:5267/api');

export default apiService;
