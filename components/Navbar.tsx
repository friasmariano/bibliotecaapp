
import { useRouter } from "next/router"
import Link from "next/link"

export default function Navbar () {
    const router = useRouter()

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
                <li>
                    <Link href="/usuarios">
                        <span className={ router.pathname === '/usuarios' ? 'activePage': 'inactivePage'}>
                            Usuarios
                        </span>
                    </Link>
                </li>
                <li>
                    <Link href="/libros">
                        <span className={ router.pathname === '/libros' ? 'activePage': 'inactivePage'}>
                            Libros
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}