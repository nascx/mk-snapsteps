'use client'
import WorkStationCard from '@/components/WorkStationCard'
import React, { useState, useEffect } from 'react'
import { IT } from '@/components/ITCard'
import axios from 'axios'
import AsyncSelect from 'react-select'
import GenericInput from '@/components/GenericInput'

const Test = () => {

  // todos os dados lista de instrução
  const [itListData, setItListData] = useState<{[key: string]: IT[]}>({})

  // total de postos
  const [totalWorkStations, setTotalWorkStations] = useState<number>(0)

  // conteúdo dos posto atual
  const [data, setData] = useState<IT[]>([])

  // número do posto atual
  const [currentWorkStation, setCurrentWorkStation] = useState<number>(0)

  // modelo
  const [model, setModel] = useState<string>('')

  // produto
  const [product, setProduct] = useState<string>('')

  // linha
  const [line, setLine] = useState<string>('')

  // opções dos postos
  const [posts, setPosts] = useState<[]>([])

  // estado que controla se algum item vai ser editado
  const [needToEditAnItem, setNeedToEditAnItem] = useState<boolean>(false)

  // para fazer a requisição
  useEffect(() => {
    axios.get('http://127.0.0.1:4322/test').then((res) => {
      setItListData(res.data.postInfos)
      const workStationInfos = res.data.postInfos[currentWorkStation]
      setData(workStationInfos)
      setModel(res.data.model)
      setProduct(res.data.product)
      setLine(res.data.line)
      setTotalWorkStations(res.data.totalWorkStations)
      setPosts(res.data.posts)
    }).catch((err) => {
      console.log(err)
    })
  }, [WorkStationCard, currentWorkStation])


  return (
    <div className='h-screen w-full flex flex-col justify-center items-center '>
      <div className="flex gap-4 justify-between items-center mb-[30px] w-[700px]">
        <div className="flex">
          <h2 className='text-3xl font-bold  text-[#284b63]'>{model}_</h2>
          <h2 className='text-3xl font-bold  text-[#284b63]'>{product}_</h2>
          <h2 className='text-3xl font-bold  text-[#284b63] p-1  rounded-lg'>{line}</h2>
        </div>
        <div className="flex gap-2">
          <AsyncSelect options={posts} onChange={(e) => setCurrentWorkStation(Number(e.value))} />
          <button className='bg-[#284b63] p-1 rounded-md text-white'>Adicionar posto</button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button className="flex justify-center items-center bg-[#d9d9d9] text-white w-[50px] h-[50px] rounded-[100%]"
          onClick={() => {
            const newWorkStation = currentWorkStation + 1
            if (newWorkStation > 1) {
              setCurrentWorkStation(prev => prev - 1)
            }
          }
          }
        >
          {'<'}
        </button>
        <WorkStationCard data={data} workStation={currentWorkStation} setItListData={setItListData} setData={setData} itListData={itListData}/>
        <button className="flex justify-center items-center bg-[#d9d9d9] text-white w-[50px] h-[50px] rounded-[100%]"
          onClick={() => {
            const newWorkStation = currentWorkStation + 1
            if (newWorkStation < totalWorkStations) {
              setCurrentWorkStation(prev => prev + 1)
            }
          }
          }
        >
          {'>'}
        </button>
      </div>
      {
        needToEditAnItem && (
          <div className="absolute">
            <div className="bg-white border-2 border-[#284b63] w-[500px] h-[300px] rounded-lg flex flex-col justify-center items-center">
              <GenericInput label='IT'/>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Test