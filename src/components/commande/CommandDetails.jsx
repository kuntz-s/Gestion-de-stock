import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import ModalWrapper from "../baseComponents/ModalWrapper";

const CommandDetails = ({ open, data, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="outline-none absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white py-4 px-6 rounded-md w-[90vw] md:w-[75vw] lg:w-[50vw]">
        <ModalWrapper
          title={`LISTE DES PRODUITS DE  ${
            data &&
            data.client &&
            data.client.nom.toUpperCase() +
              " " +
              data.client.prenom.toUpperCase()
          } `}
        />
        <div>
          <table className="w-full overflow-scroll border-b border-slate-100 ">
            <tr className="[&>*]:pl-4 [&>*]:bg-[#F8FAFC] [&>*]:text-center [&>*]:text-sm [&>*]:font-medium [&>*]:py-3 [&>*]:text-slate-600">
              <th>Nom du produit</th>
              <th>Quantité</th>
            </tr>
            {data &&
              data.produits && data.produits.map((pro,id) => {
                return (
                  <tr
                    key={id}
                    className="text-center [&>*]:py-4 [&>*]:text-sm text-slate-600  [&>*]:font-medium hover:bg-red-50 [&>*]:pl-4 hover:cursor-default"
                  >
                    <td>{pro.produit.nom}</td>
                    <td>{pro.quantite}</td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default CommandDetails;
