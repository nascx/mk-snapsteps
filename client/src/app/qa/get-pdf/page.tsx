'use client'

import React, { useState, useEffect } from 'react'
import AsyncSelect from 'react-select'
import axios from 'axios'
import { urlAPi } from '@/urlApi'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from '../../../components/Navbar'
import { linksProd, linksQA, linksSGI } from '@/links'

const GetPDF = () => {

    const [modelOptions, setModelOptions] = useState()
    const [productOptions, setProductOptions] = useState()

    const [model, setModel] = useState<any>()
    const handleModelChange = (e: string) => {
        setModel(e)
    }

    const [product, setProduct] = useState<any>()
    const handleProductChange = (e: string) => {
        setProduct(e)
    }

    const [lineOptions, setLineOptions] = useState()
    const [line, setLine] = useState<any>()
    const handleLineChange = (e: string) => {
        setLine(e)
    }
    useEffect(() => {
        axios.get(`${urlAPi}/get-model-and-product-options`).then((res) => {
            const models = res.data.models
            const products = res.data.products
            setModelOptions(models)
            setProductOptions(products)
        })
        axios.get(`${urlAPi}/production/get-options-to-pdf`).then((res) => {
            const lines = res.data.lines
            setLineOptions(lines)
        })
    }, [modelOptions, productOptions, lineOptions])

    const viewIT = async () => {
        try {
            const response = await axios.get(`${urlAPi}/pdf`, {
                responseType: 'arraybuffer',
                params: {
                    model: model.value,
                    product: product.value,
                    line: line.value
                } // Importante para obter a resposta como ArrayBuffer
            });

            // Cria um Blob a partir da resposta
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

            // Cria uma URL temporária para o Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Abre o PDF em uma nova aba
            window.open(pdfUrl);

        } catch (err) {
            console.log("Erro: ", err)
            toast.error('Erro ao obter a lista, verifique se os parâmetros estão corretos ou se a IT usada já está no banco de dados!')
        }
    }
    return (
        <div className='h-screen w-full flex items-center flex-col'>
             <Navbar links={linksQA}/>
            <h1 className='text-[#284B63] text-2xl mt-[120px]'>
                Olá, selecione as opções para que seja exibida as sua instrução de trabalho
            </h1>
            <div className="flex mt-[80px] gap-4">
                <AsyncSelect
                    options={modelOptions}
                    className='rounded-md min-w-[200px] text-[#284b63]'
                    value={model}
                    onChange={handleModelChange}
                    placeholder='Selecione o modelo'
                />
                <AsyncSelect
                    options={productOptions}
                    className='rounded-md min-w-[200px] text-[#284b63]'
                    value={product}
                    onChange={handleProductChange}
                    placeholder='Selecione o processo'
                />
                <AsyncSelect
                    options={lineOptions}
                    className='rounded-md min-w-[200px] text-[#284b63]'
                    value={line}
                    onChange={handleLineChange}
                    placeholder='Selecione o número da linha'
                />
            </div>
            <button
                className='bg-[#06A77D] text-white rounded-md h-[30px] w-[80px] mt-[100px] ml-[400px] focus:bg-current/80'
                onClick={viewIT}
            >
                Visualizar IT
            </button>
            <ToastContainer></ToastContainer>
        </div>
    )
}

export default GetPDF