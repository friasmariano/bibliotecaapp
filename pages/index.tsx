import Box from "@/components/Box"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import { faSearch, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import apiService from "./api/apiService";
import Modal from "@/components/Modal";
import { format, getYear, getMonth, getDate } from 'date-fns'

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
  const [tituloSearch, setTituloSearch] = useState<string>('');
  const [categoria, setCategoria] = useState<string>('');

  interface Categoria {
    id: number;
    nombre: string;
  }

  interface LibroContent {
    id: number,
    titulo: string,
    descripcion: string,
    fecha: string,
    autor: string,
    categoria: string
  }
  
  type CategoriasResponse = Categoria[];
  
  const [categoriasList, setCategoriasList] = useState<CategoriasResponse>([]);  

  const [searchCriteria, setSearchCriteria] = useState<string>('')

  const [titulo, setTitulo] = useState<string>('')
  const [descripcion, setDescripcion] = useState<string>('')
  const [libroContent, setLibroContent] = useState<LibroContent[]>([]);


  const search = async (event: React.FormEvent) => {
    event.preventDefault();

    if (searchCriteria === 'titulo') {
      try {
        const response = await apiService.getLibroPorTitulo(tituloSearch);

        let newResponse: LibroContent[] = [];

        if (response.length > 0) {
          response.forEach(e => {
            const libro = {
              id: e.id,
              titulo: e.titulo,
              descripcion: e.descripcion,
              fecha: format(e.fecha, "dd/MM/yyyy"),
              autor: e.autor,
              categoria: e.categoria
          }

            newResponse.push(libro)
          })

          setLibroContent(newResponse);

          openModal();
        } else {
          alert('La búsqueda no produjo ningún resultado.')
        }
      }
      catch(err) {
        alert('Hubo un error al efectuar la búsqueda.');

        console.log(err)
      }
    } else if (searchCriteria === 'categoria') {
        try {
          const response = await apiService.getLibroPorCategoria(categoria);

          let newResponse: LibroContent[] = [];

          if (response.length > 0) {
            response.forEach(e => {
              const libro = {
                id: e.id,
                titulo: e.titulo,
                descripcion: e.descripcion,
                fecha: format(e.fecha, "dd/MM/yyyy"),
                autor: e.autor,
                categoria: e.categoria
            }

              newResponse.push(libro)
            })

            setLibroContent(newResponse);

            openModal();
          } else {
            alert('La búsqueda no produjo ningún resultado.')
          }
          
        }
        catch(err) {
          alert('Hubo un error al efectuar la búsqueda.');

          console.log(err)
        }
    }
    else if (searchCriteria === 'fecha') {
      try {
        const response = await apiService.getLibrosPorFecha(fecha);

        let newResponse: LibroContent[] = [];

        if (response.length > 0) {
          response.forEach(e => {
            const libro = {
              id: e.id,
              titulo: e.titulo,
              descripcion: e.descripcion,
              fecha: format(e.fecha, "dd/MM/yyyy"),
              autor: e.autor,
              categoria: e.categoria
          }

            newResponse.push(libro)
          })

          setLibroContent(newResponse);

          openModal();
        } else {
          alert('La búsqueda no produjo ningún resultado.')
        }
      }
      catch(err) {
        alert('Hubo un error al efectuar la búsqueda.');

        console.log(err)
      }
    }
  }

  useEffect(() => {
    async function getCategorias(): Promise<CategoriasResponse> {
      try {
        const response = await fetch('http://localhost:5267/api/Categorias/GetAll');
    
        if (!response.ok) {
          console.log('No se pudieron cargar las categorías.')
        }
    
        const data: CategoriasResponse = await response.json();
        
        setCategoriasList(data)

        return data;
      } catch (error) {
        console.error('Hubo un error en la búsqueda:', error);
        return [];
      }
    }
    
    getCategorias()
  }, [])

    return (
        <div>
            <Modal isOpen={isModalOpen} onClose={closeModal} libro={libroContent} />

            <div className="searchDiv">
                <Box />

                <h5 style={ { color: 'grey', marginTop: '20px', marginBottom: '30px' } }>Buscar libro por:</h5>

                <form onSubmit={ search }>
                  <div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'} }>

                    {/* Radios */}
                    <div style={ { display: 'flex', flexDirection: 'column' } }>
                      <div className="form-check">
                        <input 
                              className="form-check-input" 
                              type="radio" 
                              name="criterio" 
                              id="criterio" 
                              value="fecha"
                              onChange={(e) => {
                                  const newValue = e.target.value
                                  setSearchCriteria(newValue)
                                }
                              }
                              />
                        <label className="form-check-label">
                          Fecha de Publicación:
                        </label>
                      </div>

                      {/* Date */}
                      <input type="date"
                             className="customInputDate"
                             value={fecha}
                             onChange={(e) => setFecha(e.target.value)} />
                    </div>

                    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="form-check">
                        <input 
                              className="form-check-input" 
                              type="radio" 
                              name="criterio" 
                              id="criterio" 
                              value="titulo"
                              onChange={(e) => {
                                  const newValue = e.target.value
                                  setSearchCriteria(newValue)
                                } 
                              }/>
                        <label className="form-check-label">
                          Nombre del Libro:
                        </label>
                      </div>
                      {/* Texfield */}
                      <input type="text" 
                            className="form-control" 
                            placeholder=""
                            value={tituloSearch}
                            onChange={(e) => setTituloSearch(e.target.value)}/>
                    </div>

                    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div className="form-check">
                        <input 
                              className="form-check-input" 
                              type="radio" 
                              name="criterio" 
                              id="criterio" 
                              value="categoria"
                              onChange={(e) => {
                                const newValue = e.target.value
                                setSearchCriteria(newValue)
                              }}/>
                        <label className="form-check-label">
                          Categoría:
                        </label>
                      </div>
                      <select className="customDropdown" name="categoria" id="categoria"
                              value={categoria} 
                              onChange={(e) => setCategoria(e.target.value)}>
                        <option value="">Elija una opción:</option>
                        {categoriasList.map(item => (
                          <option key={item.id} value={item.nombre}>
                            {item.nombre}
                          </option>
                        ))}
                    </select>
                    </div>

                    <button type="submit" className="btn btn-success" style={ {marginTop: '25px' } }>
                      <FontAwesomeIcon icon={ faSearch } style={{ fontSize: '1rem', color: 'whitesmoke' }} />
                    </button>
                  </div>
                </form>

                <Link href="/login" className="btn btn-primary" style={ { marginTop: '80px', width: '150px', borderRadius: '10px' } }>
                  <FontAwesomeIcon icon={ faRightToBracket } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '10px' }} />
                  Iniciar sesión
                </Link>
            </div>
        </div>
    )
}