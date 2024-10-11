import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';

export default function Box () {
    return (
        <div className="boxDiv">
            <FontAwesomeIcon icon={faBookOpenReader} style={{ fontSize: 45, color: '#14668c', marginBottom: '15px' }} />

            <h5 style={ { marginTop: '20px', marginBottom: '10px' } }>
                Sistema de Gestión Bibliotecaria
            </h5>

            <div style={ { height: '2px', width: '30%',
                           backgroundColor: 'grey', 
                           opacity: '0.5',
                           marginTop: '10px',
                           marginBottom: '8px'
                        }
                    }>
            </div>
        </div>
    );
}