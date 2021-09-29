import React, { useState, useEffect } from 'react'

import { Modal } from '@mui/material'
import Loader from "react-loader-spinner"

import './Loader.scss'

export default function LoaderComponent({show}) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (show === null || show === undefined) {
      setTimeout(() => setOpen(false), 500)
    } else {
      setOpen(show)
    }
  }, [show])

  return (
    <>
      <Modal
        className="loader-modal"
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          visible={open}
        />
      </Modal>
    </>
  )
}
