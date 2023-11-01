/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import styles from './details.module.css';
import { useParams } from 'react-router-dom';
import { useNavigate }from 'react-router-dom';

interface CoinProps {
    name: string;
    symbol: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formated_price: string;
    formated_market: string;
    formated_low_24h: string;
    formated_high_24h: string;
    error?: string;
}

export function Details() {
    const [details, setDetails] = useState<CoinProps>()
    const [loading, setLoading] = useState(true);
    const { cripto } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=9436846c745689d5&symbol=${cripto}`)
                .then(response => response.json())
                .then((data: CoinProps) => {
                    const price = Intl.NumberFormat("pt-br", {
                        style: "currency",
                        currency: "BRL"
                    })

                    const resultData = {
                        ...data,
                        formated_price: price.format(Number(data.price)),
                        formated_market: price.format(Number(data.market_cap)),
                        formated_low_24h: price.format(Number(data.low_24h)),
                        formated_high_24h: price.format(Number(data.high_24h))
                    }
                    setDetails(resultData);
                    setLoading(false);
                })
                .catch(() => {
                    navigate('/criptomoedas_deploy/');
                }) 
        }

        getData();
        }, [])

    if (loading) {
        return(
            <div className={styles.container}>
                <h4 className={styles.info}>Carregando informações...</h4>
            </div>
        )
    }
    return(
        <div className={styles.container}>
            <h1 className={styles.info}>{details?.name}</h1>
            <p className={styles.info}>{details?.symbol}</p>
            <section className={styles.content}>
                <p><strong>Preço:</strong> {details?.formated_price}</p>
                <p><strong>Maior preço 24h:</strong> {details?.formated_high_24h}</p>
                <p><strong>Menor preço 24h:</strong> {details?.formated_low_24h}</p>
                <p><strong>Delta 24h:</strong> <span className={Number(details?.delta_24h) >= 0 ? styles.tdGained : styles.tdLoss}>
                    {details?.delta_24h}
                </span></p>
                <p><strong>Mercado:</strong> {details?.formated_market}</p>
            </section>
        </div>
    )
}