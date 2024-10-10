import Navbar from "@/components/Navbar"
import Box from "@/components/Box"
import { useRouter } from 'next/router';
import { useEffect } from "react";

export default function Libros() {
    const router = useRouter()

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token');
    
        if (!isAuthenticated) {
          router.push('/');
        }
      }, [router]);

    return (
        <div>
            <Navbar />
            
            <div className="homeDiv">
                <Box />
                Libros
            </div>
        </div>
    )
}