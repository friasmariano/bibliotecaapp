import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAmbulance, faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <div className="homeDiv">
        <FontAwesomeIcon icon={faBookOpenReader} style={{ fontSize: 45, color: '#14668c' }} />

        <div style={ { height: '2px', width: '60%',
                       backgroundColor: 'grey', 
                       opacity: '0.5',
                       marginTop: '30px',
                       marginBottom: '30px'
                      }
                    }></div>

        <h1>Sistema de Gestion Bibliotecaria</h1>
        <h2 style={ { color: 'grey'} }>Bienvenido(a)</h2>


        <button type="button" className="btn btn-primary" style={ {marginTop: '30px'} }>Entrar</button>
      </div>
    </>
  );
}
