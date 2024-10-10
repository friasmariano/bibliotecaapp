import Box from "@/components/Box"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Home () {
    return (
        <div>
            <div className="searchDiv">
                <Box />

                <h5 style={ { color: 'grey', marginTop: '20px', marginBottom: '30px' } }>Buscar libro por:</h5>

                <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'} }>

                  <div style={ { display: 'flex', flexDirection: 'column' } }>
                    <h6 style={ { color: 'grey' } }>Fecha de Publicación:</h6>
                    <input type="date" className="form-control" />
                  </div>

                  <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h6 style={ { color: 'grey' } }>Nombre del Libro:</h6>
                    <input type="text" className="form-control" placeholder=""/>
                  </div>

                  <div className="dropdown" style={ { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '25px' } }>

                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Categoría
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </div>

                  <button className="btn btn-success" style={ {marginTop: '25px' } }>
                    <FontAwesomeIcon icon={ faSearch } style={{ fontSize: '1rem', color: 'whitesmoke' }} />
                  </button>
                </div>
                

                <Link href="/login" className="btn btn-primary" style={ { marginTop: '30px' } }>
                  Iniciar sesión
                </Link>
            </div>
        </div>
    )
}