import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { BsPlusCircle, BsTrash } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import ModalWrapper from "../baseComponents/ModalWrapper";
import Input from "../baseComponents/Input";
import { AutoComplete } from "../baseComponents/Autocomplete";
import { verifyDuplicate } from "../baseComponents/Constants";
import Button from "../baseComponents/Button";
import product from "../../assets/product.jpg";

const CommandModal = ({
  data,
  clients,
  products,
  open,
  modify,
  isLoading,
  addNewProduct, 
  handleProductChange, 
  handleProductDelete,
  handleChange,
  handleClose,
  handleAdd,
  handleUpdate,
}) => {
  const status = modify.status;
  const modifData = modify.data;



  const handleClick = () => {
     if (!data.client || data.produits.length < 1) {
      toast.error("veuillez remplir tous les champs");
    } else {
      if (status) {
        if (modifData.client === data.client ) {toast.error("Aucun champ n'a été modifié");} 
        else { handleUpdate();}
      } 
      else {
        if(verifyDuplicate(data.produits)){
          toast.error("Un ou plusieurs produits redondants");
          return;
        }
        for(let pro of data.produits){
          if(!pro.produit){
            toast.error("Veuillez renseigner tous les produits")
            return;
          } 
          if(pro.quantite < 1){
            toast.error("La quantité minimale dois ètre de 1");
            return;
          }
          const verifyProduit = products.find(elt => elt.nom === pro.produit);
          if(!verifyProduit){
            toast.error("produit "+pro.produit+ "iconnu");
            return;
          }
          if(verifyProduit.qteStock < pro.quantite){
            toast.error("La quantité de "+pro.produit+ "doit être "+verifyProduit.qteStock+ " au maximum");
            return;
          }
        }
        handleAdd()
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
          title={!status ? "Ajouter une commande" : "Modifier une commande"}
        />
<div className="mb-4">
<p className="text-center">Nom du client</p>

                        <AutoComplete
                          dataList={clients.map((elt) => elt.nom)}
                          value={data.client}
                          handleChange={(e) => handleChange({target:{name:"client",value:e}})}
                          placeholder="Nom du client"
                          title="Nom du client"
                          style={{ height: "50px", marginTop: "2px" }}
                        />
                      </div>
        <div className="">
          
          {data.produits.length === 0 ? (
            <div>
              <img
                src={product}
                alt="product illustration"
                width={120}
                height={120}
                className="mx-auto"
              />
              <p className="text-center">Aucun produit ajouté</p>
              <p
                className="text-primary w-fit mx-auto flex justify-center items-center hover:underline hover:underline-offset-1 hover:cursor-pointer mt-2 text-lg"
                onClick={addNewProduct}
              >
                <BsPlusCircle className="mr-2" /> <span>Nouveau produit</span>
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center">Liste des produits</p>
              <p
                className="text-primary w-fit flex justify-end items-center hover:underline hover:underline-offset-1 hover:cursor-pointer mt-2 text-md"
                onClick={addNewProduct}
              >
                <BsPlusCircle className="mr-2" /> <span>Nouveau produit</span>
              </p>
              
              <div>
                {data.produits.map((product) => {
                  return (
                    <div key={product.id} className="grid grid-cols-8 gap-6">
                      <div className="col-span-5 ">
                        <AutoComplete
                          dataList={products.map((elt) => elt.nom)}
                          value={product.produit}
                          handleChange={(e) => handleProductChange({target:{name:"produit",value:e}},product.id)}
                          placeholder="Nom produit"
                          title="Nom produit"
                          style={{ height: "50px", marginTop: "8px" }}
                        />
                      </div>
                      <div className="col-span-2">
                        <Input
                          title="Quantité"
                          name="quantite"
                          type="number"
                          value={product.quantite}
                          handleChange={(e) => handleProductChange(e,product.id)}
                        />
                      </div>
                      <div className=" flex justify-center items-center text-pink-400 text-xl hover:cursor-pointer hover:text-primary">
                        <BsTrash onClick={() => handleProductDelete(product.id)} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={`w-full mt-4 ${data.produits.length === 0 && "hidden"}`}>
          <Button
            title={!status ? "Ajouter commande" : "Modifier commande"}
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

export default CommandModal;
