'use client'

import React from 'react'
import Upload from '@/components/Upload'
import useUploadIT from '@/hooks/sgi/useUploadIT'
import Navbar from '@/components/Navbar'
import { linksSGI } from '@/links'

const UploadIT = () => {
  const { handleListChange, handleSubmit } = useUploadIT()
  return (
    <>
      <Navbar links={linksSGI}/>
      <Upload
        name="list"
        img="/file-pdf-solid.svg"
        descriprion="Escolha abaixo a IT para fazer upload"
        handleChange={handleListChange}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default UploadIT