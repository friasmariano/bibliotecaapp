
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface LoginResponse {
  id: number;
  name: string;
  email: string;
  token: string;
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
}

const apiService = new ApiService('https://localhost:7191/api');

export default apiService;
