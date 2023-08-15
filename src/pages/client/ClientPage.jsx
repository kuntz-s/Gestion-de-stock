import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {ExportToCsv} from "export-to-csv";
import ClientsList from "../../components/client/ClientsList";
import {
  getClientsList,
  addNewClient,
  updateClient,
  deleteClient,
  resetClientStatus,
} from "../../redux/clientSlice";
import ClientModal from "../../components/client/ClientModal";
import DeleteModal from "../../components/baseComponents/DeleteModal";
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
  const { clients, newClientStatus,updateClientStatus,deleteClientStatus } = useSelector((state) => state.clients);
  const [clientInfo, setClientInfo] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
  });
  const [modify, setModify ] = useState({data:"",status:false});
  const [search,setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    showTitle:true,
    filename:"LISTTE DES CLIENTS",
    title:"LISTE DES CLIENTS",
  };
 

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
      } else if (newClientStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de l'ajout du client",
            style
          );
        }, 200);
      }
    } 

    if (updateClientStatus) {
      if (updateClientStatus === "success") {
        setTimeout(() => {
          toast.success("Client mis à jour avec succès", style);
        }, 200);
        dispatch(getClientsList());
      } else if (updateClientStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la mise à jour du client",
            style
          );
        }, 200);
      }
    } 

    if(deleteClientStatus){
      if (deleteClientStatus === "success") {
        setTimeout(() => {
          toast.success("Client supprimé avec succès", style);
        }, 200);
        dispatch(getClientsList());
      } else if (deleteClientStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la suppression du client",
            style
          );
        }, 200);
      }
      
    } 
    handleClose();
    dispatch(resetClientStatus());
  }, [newClientStatus,updateClientStatus,deleteClientStatus]);

   
  const csvExporter = new ExportToCsv(csvOptions)

  const exportData =() => {
    csvExporter.generateCsv(clients)
  }

  const openDeleteModal=(data) => {
    setClientInfo(data);
    setOpenDelete(true)
  }

  const openModifyModal = (data)=>{
    setModify({data:data,status:true});
    setOpen(true)
    setClientInfo(data);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setModify({data:"",status:false})
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

  const handleUpdate = () => {
    dispatch(updateClient(clientInfo));
  };

  const handleDelete = () => {
    dispatch(deleteClient(clientInfo._id))
  }

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
            handleClick={exportData}
            filled={true}
            className="mt-2 md:mt-0 md:ml-3 bg-slate-900  border-slate-900 hover:text-slate-900"
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
        <ClientsList data={clients.filter(elt=> elt.nom.toLowerCase().includes(search))} openModifyModal={openModifyModal} openDeleteModal={openDeleteModal} />
      </div>
      <ClientModal
        open={open}
        data={clientInfo}
        modify={modify}
        isLoading={newClientStatus === "loading" ? true : false}
        handleChange={handleChange}
        handleClose={handleClose}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
      <DeleteModal
        open={openDelete}
        data={clientInfo}
        title="Supprimer un client"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </section>
  );
};

export default ClientPage;
