import Navbar from "@/components/Navbar"
import Box from "@/components/Box"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrashAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { useForm, SubmitHandler } from 'react-hook-form'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import apiService from "./api/apiService";
import { UsuarioPost } from "@/interfaces/UsuarioPost";

export default function Usuarios() {
    const router = useRouter()

    interface Usuario {
        id: number,
        nombre: string,
        email: string,
        rolId: number,
        contrasena: string
    }

    interface IFormInput {
        email: string,
        nombre: string,
        rol: string,
        contrasena: string
    }

    interface Rol {
        id: number,
        nombre: string
    }

    type UsuariosResponse= Usuario[];
    type RolesResponse = Rol[];
    type UsuariosPostResponse = UsuarioPost[];
    
    const [usersList, setUsersList] = useState<UsuariosResponse>([]);
    const [rolesList, setRolesList] = useState<RolesResponse>([]);

    const [editRow, setEditRow] = useState(-1);

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState(-1);
    // const [rolName, setRolName] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
    
        // Middleware
        if (!isAuthenticated) {
          router.push('/home');
        }

        async function getUsuarios(): Promise<UsuariosResponse> {
            try {
              const response = await fetch('https://localhost:7191/api/Account/GetAll');
          
              if (!response.ok) {
                console.log('No se pudieron cargar los usuarios.')
              }
          
              const data: UsuariosResponse = await response.json();
              
              setUsersList(data);
              
              return data;
            } catch (error) {
              console.error('Hubo un error en la búsqueda:', error);
              return [];
            }
        }
        getUsuarios();

        async function getRoles(): Promise<RolesResponse> {
            try {
                const response = await fetch('https://localhost:7191/api/Roles/GetAll');

                if (!response.ok) {
                    console.log('No se pudieron cargar los roles.')
                }

                const data: RolesResponse = await response.json()

                setRolesList(data);

                for (let r: number = 0; r < data.length; r++) {

                }

                return data;
            }
            catch(error) {
                console.error('Hubo un error al recuperar los roles', error);
                return [];
            }
        }
        getRoles();

      }, [router]);
      
    const handleEdit = (usuario: Usuario, index: number) => {
        setEditRow(index);
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setRol(usuario.rolId);
        setPassword(usuario.contrasena);
    };

    const resetRow = (usuario: Usuario) => {
        setEditRow(-1);
        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setRol(usuario.rolId);
        setPassword(usuario.contrasena);
    }

    // Validation object
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const user: UsuarioPost = {
                nombre: data.nombre,
                email: data.email,
                password: data.password,
                roldId: data.roldId
            }

            // const response = await apiService.saveUsuario(user);

            const response = await fetch('https://localhost:7191/api/Account/CrearUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(user),
            });

            if (response.status !== 200) {
                alert('No se pudo guardar el usuario.');
                return;
            }

            const responseData: UsuariosPostResponse = await response.json()

            setRolesList(data);

            alert('El usuario ha sido guardado.')

            return responseData;

        }
        catch(error) {
            console.log(error)
        }

    }

    // const handleRoleUpdate = (usuarioId: number, roldId: number) => {
       
    // } 

    // const guardarUsuario = (usuarioId: number) => {
    //     for (let r: number = 0; r < usersList.length; r++) {
    //         let newUsers: UsuariosResponse = [];
    //         newUsers = usersList;

    //         if (newUsers[r].id === usuarioId) {
    //             newUsers[r].rolId = rol;
    //         }

    //         setUsersList(newUsers);

    //         alert('El usuario ha sido guardado')
    //     }
    // }

    return (
        <div>
            <Navbar />

            <div className="homeDiv">
                <Box />

                <h4 style={ { marginTop: '20px' } }>Gestión de Usuarios</h4>
                
                <div className="" style={ { width: '80vw', marginTop: '30px' } }>
                    <form onSubmit={ handleSubmit(onSubmit) }>

                        <table className="table table-striped">
                            <thead style={ { textAlign: 'center' } }>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Contraseña</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody style={ { textAlign: 'center' } }>
                                {usersList.map((usuario, index) => (
                                    <tr key={ usuario.id }>
                                        <td>
                                            { editRow === index ? (
                                                <div>
                                                    <input className="form-control" 
                                                        type="text" 
                                                        value={ nombre } 
                                                        style={ { textAlign: 'center' } }
                                                        placeholder={ usuario.nombre }
                                                        {...register('nombre', {
                                                            required: "El campo 'nombre' es requerido",
                                                            minLength: {
                                                                value: 3,
                                                                message: 'El nombre debe tener un mínimo de 3 caracteres.'
                                                            },
                                                        })}
                                                        onChange={ (e) => { setNombre(e.target.value) } } />

                                                    <div className="errors">
                                                        { errors.nombre && <p>{ errors.nombre.message }</p> }
                                                    </div>
                                                </div>
                                                
                                                ) : usuario.nombre 
                                            }
                                        </td>
                                        <td>
                                            { editRow === index ? (
                                                <div>
                                                    <input className="form-control" 
                                                        type="text" 
                                                        value={ email } 
                                                        style={ { textAlign: 'center' } }  
                                                        placeholder={ usuario.email }
                                                        {...register('email',  {
                                                                required: "El campo 'email' es obligatorio",
                                                                pattern: {
                                                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                                                    message: "El formato del 'email' es inválido."
                                                                },
                                                            })
                                                        }

                                                        onChange={ (e) => { setEmail(e.target.value) } } />

                                                    <div className="errors">
                                                        { errors.email && <p>{ errors.email.message }</p>}
                                                    </div>
                                                </div>
                                                
                                                ) : usuario.email
                                            }
                                        </td>
                                        <td>
                                            { editRow === index ? (
                                                <select 
                                                        className="customDropdown" 
                                                        name="rol" 
                                                        id={`rol-${usuario.id}`}
                                                        value={rol}
                                                        {...register('rol')}
                                                        onChange={(e) => { setRol(Number(e.target.value)) }}>

                                                        {rolesList.filter(item => item.id === rol)  
                                                                  .map(item => (

                                                            // Selected
                                                            <option key={item.id} value={item.id}>
                                                                {item.nombre}
                                                            </option>
                                                        ))}
                                                        {rolesList.filter(item => item.id !== rol)  
                                                                  .map(item => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.nombre}
                                                            </option>
                                                        ))}
                                                </select>

                                                ) :

                                                <select 
                                                        className="customDropdown" 
                                                        name="rol" 
                                                        id={`rol-${usuario.id}`}
                                                        value={usuario.rolId} 
                                                        onChange={(e) => { handleRoleUpdate(usuario.id, Number(e.target.value)) }}
                                                        disabled>

                                                        {rolesList.map(item => (
                                                            <option key={item.id} value={item.id}>
                                                                {item.nombre}
                                                            </option>
                                                        ))}
                                                </select>
                                            }
                                        </td>
                                        <td>
                                            { editRow === index ? (
                                                <div>
                                                    <input className="form-control" 
                                                        type="password" 
                                                        value={ password } 
                                                        style={ { textAlign: 'center' } }  
                                                        {...register('contrasena', {
                                                            required: "El campo 'contraseña' es requerido",
                                                            minLength: {
                                                                value: 8,
                                                                message: 'La contraseña debe tener un mínimo de 8 caracteres.'
                                                            },
                                                            pattern: {
                                                                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
                                                                message: 'La contraseña debe tener una letra mayúscula, una minúscula, un número y caracter especial.'
                                                            }
                                                        })}
                                                        onChange={ (e) => { setPassword(e.target.value) }} />

                                                    <div className="errors">
                                                        { errors.contrasena && <p>{ errors.contrasena.message }</p>}
                                                    </div>
                                                </div>
                                                
                                                ) : <p>
                                                        { usuario.contrasena } ******** 
                                                    </p>
                                            }
                                        </td>
                                        <td>
                                            { editRow == index ? (
                                                <div>
                                                    <button type="button" 
                                                            className="btn customButton" 
                                                            style={ {backgroundColor: '#8a5d33', color: 'white', marginRight: '5px' } }
                                                            onClick={() => resetRow(usuario)}>
                                                        <FontAwesomeIcon icon={ faTimesCircle } style={{ fontSize: '1rem', color: 'whitesmoke', marginRight: '5px' }} />
                                                        Cancelar
                                                    </button>

                                                    {/* Submit */}
                                                    <button type="submit" 
                                                            className="btn customButton" 
                                                            style={ {backgroundColor: '#15bf70', 
                                                            color: 'white' } } >
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
                                                        onClick={() => handleEdit(usuario, index)}>
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
                    </form>
                </div>
            </div>
        </div>
    )
}