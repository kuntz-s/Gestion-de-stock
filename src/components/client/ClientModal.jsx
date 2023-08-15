import React from "react";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import ModalWrapper from "../baseComponents/ModalWrapper";
import Input from "../baseComponents/Input";
import Button from "../baseComponents/Button";

const ClientModal = ({
  data,
  open,
  modify,
  isLoading,
  handleChange,
  handleClose,
  handleAdd,
  handleUpdate,
}) => {
  const status = modify.status;
  const modifData = modify.data;

  const handleClick = () => {
    if (!data.nom || !data.prenom || !data.adresse || !data.telephone) {
      toast.error("veuillez remplir tous les champs");
    } else {
      if (status) {
        if (
          modifData.nom === data.nom &&
          modifData.prenom === data.prenom &&
          modifData.adresse === data.adresse &&
          modifData.telephone === data.telephone
        ) {
          toast.error("Aucun champ n'a été modifié");
        } else {
          handleUpdate();
        }
      } else {
        handleAdd();
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={!status ? "Ajouter un client" : "Modifier un client"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            title="Nom du client"
            name="nom"
            value={data.nom}
            handleChange={handleChange}
          />
          <Input
            title="Prenom du client"
            name="prenom"
            value={data.prenom}
            handleChange={handleChange}
          />
          <Input
            title="Adresse du client"
            name="adresse"
            value={data.adresse}
            handleChange={handleChange}
          />
          <Input
            title="Numéro de telephone"
            name="telephone"
            type="number"
            value={data.telephone}
            handleChange={handleChange}
          />
        </div>

        <div className="w-full mt-4">
          <Button
            title={!status ? "Ajouter client" : "Modifier client"}
            handleClick={handleClick}
            filled={true}
            loading={isLoading}
            className="mx-auto rounded-md px-6 hover:bg-black hover:border-black hover:text-white"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
