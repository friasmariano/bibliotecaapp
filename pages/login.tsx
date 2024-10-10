
import Box from "@/components/Box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Login() {
    return (
        <div className="pagesDiv">
            <Box />

            <div className="input-group mb-3" style={ { width: '50%' } }>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                        <FontAwesomeIcon icon={ faLock } style={ { fontSize: '1.5em'} } />
                    </span>
                </div>
                <input type="text" 
                       className="form-control" 
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
                <input type="text" 
                       className="form-control" 
                       placeholder="Contraseña" 
                       aria-label="Contraseña" 
                       aria-describedby="basic-addon1" />
            </div>

            <Link href="/login" 
                  className="btn btn-primary"
                  style={ {marginTop: '30px'} }>
                Entrar
            </Link>
        </div>
    );
};