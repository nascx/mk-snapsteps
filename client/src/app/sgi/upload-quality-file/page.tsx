'use client'

import React from 'react'
import Upload from '@/components/Upload'
import useUploadQA from '@/hooks/sgi/useUploadQA'
import Navbar from '@/components/Navbar'
import { linksSGI } from '@/links'

const UploadQA = () => {
  const { handleListChange, handleSubmit } = useUploadQA()
  return (
    <>
      <Navbar links={linksSGI}/>
      <Upload
        name="list"
        img="/QA.png"
        descriprion="Escolha abaixo a IT da Qualidade para fazer upload"
        handleChange={handleListChange}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default UploadQA