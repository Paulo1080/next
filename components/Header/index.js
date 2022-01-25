import { useEffect } from 'react';
import Link from 'next/link';

import styles from '../../styles/components/Header.module.css';
import Image from 'next/image';


function Header() {

    async function handleAuthenticated(){
        let token = await localStorage.getItem("over_token");

        if(!token){
            window.location = "/signin";
        }
    }

    useEffect(() => {
        handleAuthenticated()
    }, [])

    return(
        <div className={styles.header}>
            <div className={styles.imgLogo}>
                <Link href="/">
                    <a>
                        <Image 
                            src="/images/logo.png"
                            width={220}
                            height={40}
                        />
                    </a>                   
                </Link>               
            </div>
            <div className={styles.containerLinks}>
                <Link href="">Sobre</Link>
                <Link href="">Sair</Link>
            </div>
            
        </div>
    )
}

export default Header;