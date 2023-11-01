import { Link } from 'react-router-dom';
import styles from './header.module.css';
import logotipoImg from '../../assets/logo.svg';

export function Header() {
    return(
        <header className={styles.container}>
            <div>
                <Link to='/criptomoedas_deploy/'>
                    <img src={logotipoImg} alt="Logotipo Cripto"/>
                </Link>
            </div>
        </header>
    )
}
