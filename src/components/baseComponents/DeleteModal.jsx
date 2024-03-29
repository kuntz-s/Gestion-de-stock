import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import ModalWrapper from "./ModalWrapper";

const DeleteModal = ({ open, data, title, handleClose, handleDelete}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={title}
        />
        <div>
          <p className="text-center my-2 font-medium text-md">Voulez vous vraiment supprimer <span className="font-bold text-primary">{data && data.nom}</span>?</p>
          <div className=" flex justify-center mt-4">
            <button
              className="border border-slate-900/90 py-2 px-6 rounded-md bg-white text-slate-900/90 mr-4 hover:bg-slate-900/90 hover:text-white "
              onClick={handleClose}
            >
              Annuler
            </button>
            <button className="border border-red-500 py-2 px-6 rounded-md bg-red-500 text-white  ml-4 hover:bg-primary hover:border-primary" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
