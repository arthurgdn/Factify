import React,{useState} from 'react'
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL = process.env.DEV_URL

export default ()=>{
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState('')

    const onSubmit= (e)=>{
        e.preventDefault()
        axios.post('/posts',{title,content:content.replace(/\n\r?/g, '<br />')})
            .then((res)=>{
                setTitle('')
                setContent('')
            }).catch((e)=>setError('Impossible de publier le fun fact'))
    }
    const disabled=title.length===0 || content.length===0
    return (
        <div className="content-container">
            <h3 className="form__title">Nouveau fun fact</h3>
            <p className="form__info-text">
                Fun fact : un fait amusant qui peut être à propos de n'importe quoi tant qu'il est original, drôle, véridique, hors du commun. <br/>
                Pour un maximum de visibilité et de votes, privilégiez des anecdotes simples et claires, et pouvant être vérifiées. Choisissez un titre évocateur et attractif.
            </p>
            <form onSubmit={onSubmit} className="form__container">
                <input
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    placeholder="Titre"
                    required
                    className="form__input"
                />
                <textarea
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                    placeholder="Expliquez ici en quoi consiste votre fun fact"
                    required
                    className="form__textarea"
                >
                
                
                </textarea>

                <button className="form__button" disabled={disabled}>Publier</button>
            </form>
            {error && (<p className="form__error">{error}</p>)}
        </div>
    )
}