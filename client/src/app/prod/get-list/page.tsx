'use client'

import { urlAPi } from '@/urlApi'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AsyncSelect from 'react-select'
import saveAs from 'file-saver'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from '@/components/Navbar'
import { linksProd } from '@/links'

const GetList = () => {

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

    const lineOptions = [
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '10', value: '10'},
        {label: '11', value: '11'},
        {label: '12', value: '12'},
        {label: '13', value: '13'},
        {label: '14', value: '14'},
        {label: '15', value: '15'},
        {label: '16', value: '16'}
    ]
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
    }, [modelOptions, productOptions])

    const downloadList = async () => {
        try {
            const response = await axios.get(`${urlAPi}/prod/download-list`, {
                responseType: 'blob',
                params: {
                    model: model.value,
                    product: product.value,
                    line: line.value
                }
            })

            const blob = new Blob([response.data]);
            saveAs(blob, 'prod_list.xlsx');

        } catch (err) {
            toast.error('Erro ao selecionar lista com esses parâmetros')
            console.log("Erro: ", err)
        }
    }

    return (
        <div className='h-screen w-full flex flex-col items-center'>
            <Navbar links={linksProd}/>
            <h2 className='text-2xl text-[#284B63] font-bold mt-[120px]'>
                Escolha as informações da lista que deseja editar
            </h2>
            <div className="flex mt-[100px] gap-4">
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
                onClick={downloadList}
            >
                Baixar lista
            </button>
            <ToastContainer />
        </div>
    )
}

export default GetList