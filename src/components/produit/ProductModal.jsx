import React from "react";
import Modal from "@mui/material/Modal";
import { toast, ToastContainer } from "react-toastify";
import ModalWrapper from "../baseComponents/ModalWrapper";
import Input from "../baseComponents/Input";
import Button from "../baseComponents/Button";
import { AutoComplete } from "../baseComponents/Autocomplete";

const ProductModal = ({
  data,
  open,
  modify,
  suppliers,
  isLoading,
  handleChange,
  handleClose,
  handleAdd,
  handleUpdate,
}) => {
  const status = modify.status;
  const modifData = modify.data;

  const handleClick = () => {
    console.log("data ",data)
    if (
      !data.nom ||
      !data.qteStock ||
      !data.prix ||
      !data.prixGros ||
      !data.fournisseur 
    ) {
      toast.error("veuillez remplir tous les champs");
    } else if (data.qteStock < 1 || data.prix < 1 || data.prixGros<1){
      toast.error("la quantité en stock et les prix dois être au minimum 1")
    } else {
      if (status) {
        if (
          modifData.nom === data.nom &&
          modifData.qteStock === data.qteStock &&
          modifData.prix === data.prix &&
          modifData.prixGros === data.prixGros &&
          modifData.fournisseur === data.fournisseur
        ) {
          toast.error("Aucun champ n'a été modifié");
        } else {
          const verify = suppliers.find(elt=> elt.nom === data.fournisseur);
          if(!verify){
            toast.error("nom du founrisseur inconnu")
          } else {
            handleUpdate()
          }
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
            title="Nom du produit"
            name="nom"
            value={data.nom}
            handleChange={handleChange}
          />
          <AutoComplete
            dataList={suppliers.map((elt) => elt.nom)}
            value={data.fournisseur}
            handleChange={(e) =>
              handleChange({ target: { name: "fournisseur", value: e } })
            }
            placeholder="Fournisseur"
            title="Fournisseur"
            style={{ height: "50px", marginTop: "8px" }}
          />
          <Input
            title="Quantité en stock"
            name="qteStock"
            type="number"
            value={data.qteStock}
            handleChange={handleChange}
          />
          <Input
            title="Prix du produit"
            name="prix"
            type="number"
            value={data.prix}
            handleChange={handleChange}
          />
          <Input
            title="Prix en gros"
            name="prixGros"
            type="number"
            value={data.prixGros}
            handleChange={handleChange}
          />
        </div>

        <div className="w-full mt-4">
          <Button
            title={!status ? "Ajouter produit" : "Modifier produit"}
            handleClick={handleClick}
            filled={true}
            loading={isLoading}
            className="mx-auto rounded-md px-6 hover:bg-slate-900 hover:border-slate-900 hover:text-slate-900"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
