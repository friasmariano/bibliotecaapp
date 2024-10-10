import Navbar from "@/components/Navbar"
import Box from "@/components/Box"
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default function Home () {
    const router = useRouter()

    const [showUsuariosButton, setShowUsuariosButton] = useState(false);
    const [showLibrosButton, setShowLibrosButton] = useState(false);

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
        const role = localStorage.getItem('role')
    
        if (!isAuthenticated) {
          router.push('/');
        }

        if (role === "Administrador") {
            setShowUsuariosButton(true);
        } else {
            setShowUsuariosButton(false);
        }

        if (role === "Bibliotecario") {
            setShowLibrosButton(true);
        } else {
            setShowLibrosButton(false);
        }

      }, [router]);

    return (
        <div>
            <Navbar />

            <div className="homeDiv">
                <Box />

                <div className="buttonBox">
                    {
                        showLibrosButton ? (
                            <button className="btn btn-primary homeButton">
                                <Link href="/libros">
                                    <FontAwesomeIcon icon={ faBookOpen } style={{ fontSize: '1rem', color: 'whitesmoke' }} />
                                    <span className="link" style={ { marginLeft: '5px' } }>Gestionar Libros</span>
                                </Link>
                            </button>
                        ) : ''
                    }
                    {
                        showUsuariosButton ? (
                                <button className="btn btn-primary homeButton">
                                    <Link href='/usuarios'>
                                        <FontAwesomeIcon icon={ faUserAlt } style={{ fontSize: '1rem', color: 'whitesmoke' }} />
                                        <span className="link" style={ { marginLeft: '5px' } }>Gestionar Usuarios</span>
                                    </Link>
                                </button>
                            ) : ''
                    }
                    
                </div>
            </div>
        </div>
    )
}