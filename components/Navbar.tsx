
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import Link from "next/link"

export default function Navbar () {
    const router = useRouter()

    const logout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('token')

        router.push('/');
    }

    const [showUsuariosButton, setShowUsuariosButton] = useState(false);
    const [showLibrosButton, setShowLibrosButton] = useState(false);

    useEffect(() => {
        const role = localStorage.getItem('role')

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
        <nav className="nav">
            <ul>
                <li>
                    <Link href="/home">
                        <span className={ router.pathname === '/home' ? 'activePage': 'inactivePage'}>
                            Home
                        </span>
                    </Link>
                </li>
                {
                    showUsuariosButton ? (
                        <li>
                            <Link href="/usuarios">
                                <span className={ router.pathname === '/usuarios' ? 'activePage': 'inactivePage'}>
                                    Usuarios
                                </span>
                            </Link>
                        </li>
                    ) : ''
                }

                {
                    showLibrosButton ? (
                        <li>
                            <Link href="/libros">
                                <span className={ router.pathname === '/libros' ? 'activePage': 'inactivePage'}>
                                    Libros
                                </span>
                            </Link>
                         </li>
                    ): ''
                }
                <li>
                    <Link href="/libros" onClick={ logout }>
                        <span className={ router.pathname === '/libros' ? 'activePage': 'inactivePage'}>
                            Logout
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}