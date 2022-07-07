import React from "react";
import Modal from "react-modal";
import EditAlertForm from "./edit_alert_form.js"

export default function EditModal(props) {
  return (
    <Modal
      className="session-modal"
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      closeTimeoutMS={50}
      ariaHideApp={false}
    >
      <EditAlertForm 
        alert={props.alert}
        closeModal={props.closeModal}
      />
    </Modal>
  )
}
