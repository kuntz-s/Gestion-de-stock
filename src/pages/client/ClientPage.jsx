import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ClientsList from "../../components/client/ClientsList";
import {
  getClientsList,
  addNewClient,
  resetNewClientStatus,
} from "../../redux/clientSlice";
import ClientModal from "../../components/client/ClientModal";
import Button from "../../components/baseComponents/Button";

const style = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const ClientPage = () => {
  const dispatch = useDispatch();
  const { clients, newClientStatus } = useSelector((state) => state.clients);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
  });
  const [search,setSearch] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getClientsList());
  }, []);

  useEffect(() => {
    if (newClientStatus) {
      if (newClientStatus === "success") {
        setTimeout(() => {
          toast.success("Client ajouté avec succès", style);
        }, 200);
        dispatch(getClientsList());
      } else if (newClientStatus === "error") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de l'ajout du client",
            style
          );
        }, 200);
      }
      handleClose();
      dispatch(resetNewClientStatus());
    }
  }, [newClientStatus]);

  const handleClose = () => {
    setOpen(false);
    setClientInfo({
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setClientInfo({ ...clientInfo, [name]: value });
  };

  const handleAdd = () => {
    dispatch(addNewClient(clientInfo));
  };

  return (
    <section>
      <p className="text-center uppercase font-bold text-2xl md:text-3xl">
        Liste des clients{" "}
      </p>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start flex-wrap">
        <div className="md:flex mt-2">
          <Button
            title="Nouveau client"
            icon={<BiPlusCircle className="scale-[1.4] mr-2" />}
            loading={false}
            handleClick={() => setOpen(true)}
            filled={true}
          />
          <Button
            title="Télécharger la liste"
            icon={<HiOutlineDownload className="scale-[1.4] mr-2" />}
            loading={false}
            handleClick={() => alert("yes")}
            filled={true}
            className="mt-2 md:mt-0 md:ml-3 bg-black  border-black hover:text-black"
          />
        </div>
        <div className="relative mt-2">
          <input
            type="search"
            placeholder="Rechercher le nom"
            value={search}
            className=" py-2 pl-8 rounded-md lg:min-w-[350px]  bg-[#F3F4F6] border border-[#F3F4F6]  focus:outline-none focus:bg-transparent focus:border focus:border-slate-400 "
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="absolute left-2.5 top-3 scale-[1.3] text-slate-500" />
        </div>
      </div>
      <div>
        <ClientsList data={clients.filter(elt=> elt.nom.toLowerCase().includes(search))} />
      </div>
      <ClientModal
        open={open}
        data={clientInfo}
        isLoading={newClientStatus === "loading" ? true : false}
        handleChange={handleChange}
        handleClose={handleClose}
        handleAdd={handleAdd}
      />
      <ToastContainer />
    </section>
  );
};

export default ClientPage;
