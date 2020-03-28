import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.png'
import bannerImg from '../../assets/banner.jpg'

export default function Logon(){
    const [id, setId] = useState('')

    const history = useHistory()

    async function handleLogon(event){
        event.preventDefault()

        try{
            const response = await api.post('sessions', { id })
            localStorage.setItem('ngoId', id)
            localStorage.setItem('ngoName', response.data.name)
            history.push('/profile')
        }catch(err){
            alert('Logon mal sucedido, tente novamente.')
        }
    }

    return(
        <div className='logon-container'>
            <section className='form'>
                <h1><span className='uno'>i</span>Pet</h1>
                <form onSubmit={ handleLogon }>
                    <h1>Faça seu Logon</h1>
                    <input
                        placeholder='Seu ID'
                        value={ id }
                        onChange={ event => setId(event.target.value) }
                    />
                    <button
                        className='button'
                        type='submit'
                    >
                        Entrar
                    </button>
                    <Link className='back-link' to='/register'>
                        <FiLogIn size={ 16 } color='#e02041' />
                        Criar uma conta
                    </Link>
                </form>
            </section>
            <img src={ bannerImg } className='banner' alt='Pets' />
        </div>
    )
}
