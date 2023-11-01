/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, FormEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { ImSearch } from 'react-icons/im';

interface CoinsProps {
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedDelta?: number;
}

interface DataProps {
    coins: CoinsProps[];
}


export function Home() {
    const [coins, setCoins] = useState<CoinsProps[]>([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=9436846c745689d5')
            .then(response => response.json())
            .then((data: DataProps) => {
                const coinsData = data.coins.slice(0, 12);

                const price = Intl.NumberFormat("pt-br", {
                    style: "currency",
                    currency: "BRL"
                })

                const resultFormatado = coinsData.map(item => {
                    const formatado = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap)),
                        formatedDelta: parseFloat(item.delta_24h.replace(',', '.'))

                    }
                    return formatado;
                })
                setCoins(resultFormatado);
                })
            }
            getData();
        }, [])

    function handleSearch(event: FormEvent) {
        event.preventDefault();
        if (inputValue === '') return;
        navigate(`/details/${inputValue}`);
    }


    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input type="text"
                    placeholder='Digite o símbolo da criptomoeda' 
                    value={inputValue}
                    onChange={event => setInputValue(event.target.value.toUpperCase())}
                />
                <button type='submit'>
                    <ImSearch size={44} color='#fff'/>
                </button>
            </form>
            <table className={styles.criptotable}>
                <thead className={styles.criptohead}>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.map(item => (
                        <tr className={styles.tr} key={item.name}>
                            <td className={styles.tdLabel} data-label='Moeda'>
                                <Link to={`/details/${item.symbol}`} className={styles.link}>
                                    <span>{item.name}</span> | {item.symbol}
                                </Link>
                            </td>
                            <td className={styles.tdLabel} data-label='Valor mercado'>
                                {item.formatedMarket}
                            </td>
                            <td className={styles.tdLabel} data-label='Preço'>
                                {item.formatedPrice}
                            </td>
                            <td className={item.formatedDelta && item.formatedDelta >= 0 ? styles.tdGained : styles.tdLoss} data-label='Volume'>
                                <span>{item.delta_24h}</span>
                            </td>
                        </tr>
                    ))}
                   
                </tbody>
            </table>
        </main>
    )
}