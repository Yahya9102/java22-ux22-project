import React, { useState } from "react"
import "./CustomDialog.css"

type CustomDialogProps = {
  message: string
  onConfirm: () => void
}

const CustomDialog = ({ message, onConfirm }: CustomDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm()
  }

  return (
    <div className={`custom-dialog ${isOpen ? "open" : ""}`}>
      <div
        className="custom-dialog-overlay"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="custom-dialog-content">
        <p>{message}</p>
        <div className="custom-dialog-buttons">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default CustomDialog
