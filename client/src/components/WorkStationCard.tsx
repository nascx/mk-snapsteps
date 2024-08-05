import React, { SetStateAction } from 'react'
import ITCard from './ITCard'
import { IT } from './ITCard'

type WorkStationCardProps = {
    data: IT[],
    workStation: number,
    itListData: [][],
    setItListData: React.Dispatch<SetStateAction<any>>,
    setData: React.Dispatch<SetStateAction<IT[]>>
}
const WorkStationCard = ({ data, workStation, setItListData, setData, itListData }: WorkStationCardProps) => {
    return (
        <div className="flex flex-col border-2 rounded-lg p-2 max-h-[400px]">
            <div className="flex justify-between items-center mb-[30px]">
                <h2 className='text-2xl font-bold ml-2 text-[#06A77D]'>Posto {(workStation)}</h2>
                <button className='bg-[#284b63] p-1 rounded-md text-white'>Adicionar instrução</button>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center text-[#284b63]'>
                <div className='flex justify-center items-center'>
                    <div className='w-full text-center flex gap-1 justify-center items-center font-bold'>
                        <div className='w-[100px]'>IT</div>
                        <div className='w-[70px]'>PÁGINA</div>
                        <div className='w-[250px]'>ATIVIDADE</div>
                        <div className='w-[100px]'>SEQUÊNCIA</div>
                        <div className='w-[100px]'>OPERAÇÕES</div>
                        <div className="w-[20px]"></div>
                        <div className="w-[20px]"></div>
                        <div className="w-[20px]"></div>
                    </div>
                </div>
                <div className="flex flex-col max-h-[250px] gap-1 overflow-y-scroll">
                    {
                        data.map((its, i) => (
                            <ITCard
                                itListData={itListData}
                                id={its.id}
                                it={its.it}
                                operations={its.operations}
                                page={its.page}
                                activity={its.activity}
                                sequence={its.sequence}
                                setItListData={setItListData}
                                setData={setData}
                                data={data}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WorkStationCard