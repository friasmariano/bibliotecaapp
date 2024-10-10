
import Box from "@/components/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react'
import apiService from "./api/apiService";
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  const parseToken = () => {
    let token = localStorage.getItem('token') + ''

    const base64Url = token.split('.')[1];

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apiService.login(email, password);

      localStorage.setItem('token', 'Bearer ' + response.token);

      const claims = parseToken()

      localStorage.setItem('role', claims.role)

      router.push('/home');
    }
    catch(err) {
      alert('Login fallido. Verifique sus credenciales.');
    }
  }

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (isAuthenticated) {
      router.push('/home');
    }
  }, [router]);

    return (
        <div className="pagesDiv">
          <Box />

          <form onSubmit={ handleLogin }>
            <div className="input-group mb-3" style={ { width: '100%' } }>
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
            <div className="input-group mb-3" style={ { width: '100%' } }>
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
            <div style={ {display: 'flex', alignItems: 'center', justifyContent: 'center'} }>
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