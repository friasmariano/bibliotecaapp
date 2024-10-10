
import Box from "@/components/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react'
import apiService from "./api/apiService";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apiService.login(email, password);
      console.log('Login exitoso:', response);

      localStorage.setItem('token', 'Bearer ' + response.token);
    }
    catch(err) {
      console.log('Login failed. Check your credentials.');
    }
  }

    return (
        <div className="pagesDiv">
            <Box />

          <form onSubmit={ handleLogin }>
            <div className="input-group mb-3" style={ { width: '50%' } }>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={ faLock } style={ { fontSize: '1.5em'} } />
                    </span>
                </div>
                <input type="text" 
                       className="form-control" 
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Email" 
                       aria-label="Username" 
                       aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3" style={ { width: '50%' } }>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={ faKey } style={ { fontSize: '1.5em'} } />
                    </span>
                </div>
                <input type="password" 
                       className="form-control" 
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Contraseña" 
                       aria-label="Contraseña" 
                       aria-describedby="basic-addon1" />
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Entrar
              </button>
            </div>
          </form>
            
            {/* <Link href="/login" 
                  className="btn btn-primary"
                  style={ {marginTop: '30px'} }>
                Entrar
            </Link> */}
        </div>
    );
};