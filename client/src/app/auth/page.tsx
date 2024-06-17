'use client'
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { host, urlAPi } from '@/urlApi'
import { ToastContainer, toast } from 'react-toastify'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

const Auth = () => {
    const router = useRouter()
    const [sector, setSector] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const credentialsCheck = () => {

        axios.get(`${urlAPi}/auth`, {
            params: {
                password: password,
                sector: sector
            }
        }).then((res) => {
            if (sector === 'QA' || sector === 'qa') {
                Cookie.set('key', 'qa')
                router.push(`/qa`)
            } else if (sector === 'SGI' || sector === 'sgi') {
                Cookie.set('key', 'sgi')
                router.push(`${host}/sgi/upload-it`)
            } else if (sector === 'ENG' || sector ===  'eng') {
                Cookie.set('key', 'eng')
                router.push(`/eng/list-upload`)
            } else if (sector === 'PROD' || sector === 'prod') {
                Cookie.set('key', 'prod')
                router.push(`${host}/prod/get-pdf`)
            }
        }).catch((err) => {
            toast.error(err.response.data.message)
        })
    }
    return (
        <div className='h-screen w-full flex flex-col justify-center items-center'>
            <ToastContainer />
            <div className="flex flex-col justify-center items-center gap-2  p-8 rounded-lg -m-3 w-[400px] border-2">
                <h1 className='text-3xl font-bold text-[#284B63]'>Bem-vindo ao SnapSteps</h1>
                <Image src={'/s.png'} width={140} height={200} alt='branch' />
                <p className='text-[#284b63] -mt-4'>Insira suas credenciais para avançar</p>
                <div className="flex mt-8 gap-4">
                    <div className="flex flex-col justify-center items-center">
                        <label className='text-[#284b63] font-bold'>SETOR</label>
                        <input
                            type="text"
                            value={sector}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSector(e.target.value)}
                            className='border-2 rounded-md focus:outline-none h-[35px] w-[150px] text-[#284b63] pl-2'
                            placeholder='Digite seu setor aqui'
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label className='text-[#284b63] font-bold'>SENHA</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            className='border-2 rounded-md focus:outline-none h-[35px] w-[150px] text-[#284b63] pl-2'
                            placeholder='Digite sua senha aqui'
                        />
                    </div>
                </div>
                <button
                    onClick={credentialsCheck}
                    className='bg-[#06A77D] text-white p-1 rounded-md ml-[200px] mt-4'
                >
                    Entrar
                </button>
            </div>
        </div>
    )
}

export default Auth