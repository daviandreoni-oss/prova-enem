import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function App() {

    const [provas, setProvas] = useState([])

    async function buscarProvas() {
        const respostaProvas = await fetch (
            'https://api.enem.dev/v1/exams'
        )
        const dadosProvas = await respostaProvas.json()
        setProvas(dadosProvas)
    }

    useEffect(() => {
        buscarProvas()
    }, [])

    return (
        <main className="pagina pagina-inicial">
            <section className="hero">
                <div className="marca">ENEM<span>+</span></div>
                <p className="eyebrow">Seu ritmo. Sua aprovação.</p>
                <h1>Prepare-se para<br /><em>ir além.</em></h1>
                <p className="hero-texto">Escolha uma prova anterior e pratique com questões reais do ENEM.</p>
            </section>

            <section className="conteudo-lista">
                <div className="cabecalho-lista">
                    <div>
                        <p className="eyebrow">Banco de provas oficiais</p>
                        <h2>Escolha um ano</h2>
                    </div>
                    <span className="contador">{provas.length} disponíveis</span>
                </div>
                <div className="provas-grid">
                    {provas.map((prova, i) => (
                        <Link className="prova-card" to={`/prova/${prova.year}`} key={`${prova.year}-${i}`}>
                            <span className="ano">{prova.year}</span>
                            <span className="prova-info"><strong>{prova.title}</strong><small>Prova real · Acessar →</small></span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}