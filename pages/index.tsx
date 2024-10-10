import Box from "@/components/Box"
import Link from "next/link"

export default function Home () {
    return (
        <div>
            <div className="homeDiv">
                <Box />

                El  buscador va aqui

                <Link href="/login" className="btn btn-primary" style={ { marginTop: '30px' } }>
                  Iniciar sesión
                </Link>
            </div>
        </div>
    )
}