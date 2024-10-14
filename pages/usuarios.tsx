import Navbar from "@/components/Navbar"
import Box from "@/components/Box"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import apiService from "./api/apiService";

export default function Usuarios() {
    const router = useRouter()

    interface Usuario {
        id: number,
        nombre: string,
        email: string,
        rol: string
    }

    type UsuariosResponse= Usuario[]
    const [usersList, setUsersList] = useState<UsuariosResponse>([]);
    const [editRow, setEditRow] = useState(Number);

    const toogleEdit = (index: number) => {
        setEditRow(index)
    }
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
    
        if (!isAuthenticated) {
          router.push('/home');
        }

        async function getUsuarios(): Promise<UsuariosResponse> {
            try {
              const response = await fetch('http://localhost:5267/api/Account/GetAll');
          
              if (!response.ok) {
                console.log('No se pudieron cargar los usuarios.')
              }
          
              const data: UsuariosResponse = await response.json();
              
              setUsersList(data)

              return data;
            } catch (error) {
              console.error('Hubo un error en la búsqueda:', error);
              return [];
            }
        }

        getUsuarios();

      }, [router]);

    return (
        <div>
            <Navbar />

            <div className="homeDiv">
                <Box />

                <h4 style={ { marginTop: '20px' } }>Gestión de Usuarios</h4>
                
                <div className="" style={ { width: '80vw', marginTop: '30px' } }>
                    <table className="table table-striped">
                        <thead style={ { textAlign: 'center' } }>
                            <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Rol</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody style={ { textAlign: 'center' } }>
                            {usersList.map((usuario, index) => (
                                <tr key={usuario.id || index}>
                                    <td>
                                        { editRow === index ? (<input className="form-control" type="text" value={ usuario.nombre } style={ { textAlign: 'center' } } />) : usuario.nombre }
                                    </td>
                                    <td>
                                        { editRow === index ? (<input className="form-control" type="text" value={ usuario.email } style={ { textAlign: 'center' } }  />) : usuario.email }
                                    </td>
                                    <td>
                                        { editRow === index ? (<input className="form-control" type="text" value={ usuario.rol } style={ { textAlign: 'center' } }  />) : usuario.rol }
                                    </td>
                                    <td>
                                        { editRow == index ? (
                                            <div>
                                                <button type="button" className="btn customButton" style={ {backgroundColor: '#8a5d33', color: 'white', marginRight: '5px' } }>
                                                    <FontAwesomeIcon icon={ faTimesCircle } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '5px' }} />
                                                    Cancelar
                                                </button>
                                                <button type="button" className="btn customButton" style={ {backgroundColor: '#15bf70', color: 'white' } }>
                                                    <FontAwesomeIcon icon={ faCheckCircle } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '5px' }} />
                                                    Guardar
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-primary customButton" 
                                                    style={ { marginRight: '5px' } }
                                                    onClick={ () => {
                                                        toogleEdit(index)
                                                    } }>
                                                    <FontAwesomeIcon icon={ faEdit } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '5px' }} />
                                                    Editar
                                                </button>
                                                <button type="button" className="btn btn-danger customButton" style={ { marginRight: '5px' }}>
                                                    <FontAwesomeIcon icon={ faTrashAlt } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '5px' }} />
                                                    Eliminar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}