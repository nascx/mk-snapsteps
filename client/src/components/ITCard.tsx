'use client'

import React, { ChangeEvent, SetStateAction, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faCopy, faShare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

export type IT = {
    id: number,
    it: string,
    page: string,
    activity: string
    sequence: number,
    operations: number | string,
    itListData: [][],
    setItListData: React.Dispatch<SetStateAction<{ [key: string]: IT[] }>>,
    data: IT[]
    setData: React.Dispatch<SetStateAction<IT[]>>
}

const ITCard = ({ id, it, page, activity, sequence, operations, setItListData, data, setData, itListData }: IT) => {
    const tranforming = (id: number, newValue: string) => {
        const newData = data.map((item) => {
            if (item.id !== id) {
                return item
            } else {
                console.log(item.it)
                return { ...item, it: newValue }
            }
        })
        setData(newData)
        tranformingB(0, newValue)
        axios.put()
    }

    const tranformingB = (id: number, newValue: string) => {
        const newData = itListData.map((arr, i) => {
            if (i === 0) {
                return data
            } else {
                return arr
            }
        })
        setItListData(newData)
        console.log(itListData)
    }

    // criação de estados para poder editar depois
    const [itValue, setITValue] = useState<string>(it)

    const teste = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.tabIndex)
        setITValue(e.target.value)
        tranforming(e.target.tabIndex , itValue)
        tranformingB(0, e.target.value)
    }

    return (
        <div className='flex flex-col items-end w-[700px] text-[#284b63] font-regular'>
            <div className='border-2 w-full text-center flex justify-center items-center gap-1 rounded-md min-h-[50px] max-h-[80px] cursor-pointer'>
                <input tabIndex={id} className='w-[100px] focus:outline-none text-center' value={itValue} onChange={teste} />
                <input className='w-[70px] focus:outline-none text-center' value={page} />
                <input className='w-[250px] focus:outline-none text-center' value={activity} />
                <input className='w-[100px] focus:outline-none text-center' value={sequence} />
                <input className='w-[100px] focus:outline-none text-center' value={operations} />
                <FontAwesomeIcon icon={faTrashCan} className='w-[20px] h-[20px] cursor-pointer text-[#e73e3e]' />
                <FontAwesomeIcon icon={faCopy} className='w-[20px] h-[20px] cursor-pointer text-[#06A77D]' />
                <FontAwesomeIcon icon={faShare} className='w-[20px] h-[20px] cursor-pointer text-[#284b63]' />
            </div>
        </div>
    )
}

export default ITCard