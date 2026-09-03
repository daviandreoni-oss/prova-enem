import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react"

export default function Prova() {
    
    const { id } = useParams()
    const [questao, setQuestao] = useState(null)
    const [questaoIndex, setQuestaoIndex] = useState(1)

    async function buscarQuestao() {
        const respostaQuestao = await fetch (
            `https://api.enem.dev/v1/exams/${id}/questions/${questaoIndex}`
        )
        const dadosQuestao = await respostaQuestao.json()
        setQuestao(dadosQuestao)
    }

    function avancar() {
        if (questaoIndex === 180) {
            alert('Não é possível avançar 😒')
        } else {
            setQuestaoIndex(questaoIndex + 1)
        }
    }

    function voltar() {
        if (questaoIndex === 1) {
            alert('Não é possível voltar 😒')
        } else {
            setQuestaoIndex(questaoIndex - 1)
        }
    }

    function verResposta(questao) {
        alert(`Resposta Correta: ${questao.correctAlternative}`)
    }

    useEffect(() => {
        buscarQuestao()
    }, [questaoIndex])

    return (
        questao ? 
            <main className="pagina pagina-prova">
                <header className="prova-topo">
                    <Link className="logo-link" to="/">ENEM<span>+</span></Link>
                    <div className="progresso"><span>Questão</span><strong>{questaoIndex}</strong><small>/ 180</small></div>
                </header>
                <div className="layout-prova">
                    <aside className="lateral-prova"><p className="eyebrow">Simulado</p><h1>Prova<br /><em>{id}</em></h1><div className="barra"><span style={{ width: `${questaoIndex / 180 * 100}%` }} /></div></aside>
                    <section className="questao">
                        <p className="questao-tag">Questão {questaoIndex}</p>
                        <h2>{questao.title}</h2>
                        <p>{questao.context}</p>
                        <p>
                    <b>
                        {questao.alternativesIntroduction}
                    </b>
                    </p>

                    <ul className="alternativas">
                    {questao.alternatives.map((alt, i) => {
                        return (
                            <li key={i}>
                                {alt.text}
                            </li>
                        )
                    })}
                        </ul>

                        <div className="acoes">
                            <button className="botao botao-secundario" onClick={voltar}>← Voltar</button>
                            <button className="botao botao-principal" onClick={() => verResposta(questao)}>Ver resposta</button>
                            <button className="botao botao-principal" onClick={avancar}>Avançar →</button>
                        </div>
                    </section>
                </div>
            </main>

        : null
    )
}