import React, { useState } from "react"
import styles from "p-components/styles/customDialog.module.css"

type CustomDialogProps = {
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const CustomDialog = ({ message, onConfirm, onCancel }: CustomDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm()
  }

  const handleCancel = () => {
    setIsOpen(false)
    onCancel()
  }
  return (
    <div className={styles.custom_dialog}>
      <div
        className={styles.custom_dialog_overlay}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={styles.custom_dialog_content}>
        <p>{message}</p>
        <div className={styles.custom_dialog_buttons}>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default CustomDialog
