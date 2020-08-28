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
        axios.post('/posts',{title,content})
            .then((res)=>{
                setTitle('')
                setContent('')
            }).catch((e)=>setError('Impossible de publier le fun fact'))
    }
    const disabled=title.length===0 || content.length===0
    return (
        <div>
            <h3>Publier un fun fact</h3>
            <form onSubmit={onSubmit}>
                <input
                    value={title}
                    onChange={(e)=>{setTitle(e.target.value)}}
                    placeholder="Titre"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e)=>{setContent(e.target.value)}}
                    placeholder="Décrivez ici un fun fact original"
                    required
                >
                
                
                </textarea>

                <button disabled={disabled}>Publier</button>
            </form>
            {error && (<p>{error}</p>)}
        </div>
    )
}