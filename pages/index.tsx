import Box from "@/components/Box"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import apiService from "./api/apiService";
import Modal from "@/components/Modal";

export default function Home () {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [resumen, setResumen] = useState('');
  const [responseData, setResponseData] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    setResumen(responseData);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [fecha, setFecha] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');

  const [libro, setLibro] = useState<string>()

  const search = async (event: React.FormEvent) => {
    event.preventDefault();

    let responseInfo = '';

    try {
      const response = await apiService.getLibroPorTitulo(titulo);

      console.log(response.info);

      openModal();
    }
    catch(err) {
      alert('Hubo un error al efectuar la búsqueda.');
    }
  }

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal} texto={resumen} />

            <div className="searchDiv">
                <Box />

                <h5 style={ { color: 'grey', marginTop: '20px', marginBottom: '30px' } }>Buscar libro por:</h5>

                <form onSubmit={ search }>
                  <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'} }>

                    <div style={ { display: 'flex', flexDirection: 'column' } }>
                      <h6 style={ { color: 'grey' } }>Fecha de Publicación:</h6>
                      <input type="date" 
                            className="form-control" 
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)} />
                    </div>

                    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <h6 style={ { color: 'grey' } }>Nombre del Libro:</h6>
                      <input type="text" 
                            className="form-control" 
                            placeholder=""
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}/>
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

                    <button type="submit" className="btn btn-success" style={ {marginTop: '25px' } }>
                      <FontAwesomeIcon icon={ faSearch } style={{ fontSize: '1rem', color: 'whitesmoke' }} />
                    </button>
                  </div>
                </form>

                <Link href="/login" className="btn btn-primary" style={ { marginTop: '30px' } }>
                  Iniciar sesión
                </Link>
            </div>
        </div>
    )
}