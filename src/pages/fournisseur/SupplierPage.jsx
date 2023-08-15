import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {ExportToCsv} from "export-to-csv";
import SuppliersList from "../../components/fournisseur/SuppliersList";
import {
  getSuppliersList,
  addNewSupplier,
  updateSupplier,
  deleteSupplier,
  resetSupplierStatus,
} from "../../redux/supplierSlice";
import SupplierModal from "../../components/fournisseur/SupplierModal";
import DeleteModal from "../../components/baseComponents/DeleteModal";
import Button from "../../components/baseComponents/Button";

const style = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const SupplierPage = () => {
  const dispatch = useDispatch();
  const { suppliers, newSupplierStatus,updateSupplierStatus,deleteSupplierStatus } = useSelector((state) => state.suppliers);
  const [supplierInfo, setSupplierInfo] = useState({
    nom: "",
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
    filename:"LISTTE DES FOURNISSEURS",
    title:"LISTE DES FOURNISSEURS",
  };
 

  useEffect(() => {
    dispatch(getSuppliersList());
  }, []);

  useEffect(() => {
    if (newSupplierStatus) {
      if (newSupplierStatus === "success") {
        setTimeout(() => {
          toast.success("Fournisseur ajouté avec succès", style);
        }, 200);
        dispatch(getSuppliersList());
      } else if (newSupplierStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de l'ajout du fournisseur",
            style
          );
        }, 200);
      }
    } 

    if (updateSupplierStatus) {
      if (updateSupplierStatus === "success") {
        setTimeout(() => {
          toast.success("Fournisseur mis à jour avec succès", style);
        }, 200);
        dispatch(getSuppliersList());
      } else if (updateSupplierStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la mise à jour du fournisseur",
            style
          );
        }, 200);
      }
    } 

    if(deleteSupplierStatus){
      if (deleteSupplierStatus === "success") {
        setTimeout(() => {
          toast.success("Fournisseur supprimé avec succès", style);
        }, 200);
        dispatch(getSuppliersList());
      } else if (deleteSupplierStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la suppression du fournisseur",
            style
          );
        }, 200);
      }
      
    } 
    handleClose();
    dispatch(resetSupplierStatus());
  }, [newSupplierStatus,updateSupplierStatus,deleteSupplierStatus]);

   
  const csvExporter = new ExportToCsv(csvOptions)

  const exportData =() => {
    csvExporter.generateCsv(suppliers)
  }

  const openDeleteModal=(data) => {
    setSupplierInfo(data);
    setOpenDelete(true)
  }

  const openModifyModal = (data)=>{
    setModify({data:data,status:true});
    setOpen(true)
    setSupplierInfo(data);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setModify({data:"",status:false})
    setSupplierInfo({
      nom: "",
      adresse: "",
      telephone: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSupplierInfo({ ...supplierInfo, [name]: value });
  };

  const handleAdd = () => {
    dispatch(addNewSupplier(supplierInfo));
  };

  const handleUpdate = () => {
    dispatch(updateSupplier(supplierInfo));
  };

  const handleDelete = () => {
    dispatch(deleteSupplier(supplierInfo._id))
  }

  return (
    <section>
      <p className="text-center uppercase font-bold text-2xl md:text-3xl">
        Liste des fournisseurs{" "}
      </p>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start flex-wrap">
        <div className="md:flex mt-2">
          <Button
            title="Nouveau fournisseur"
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
        <SuppliersList data={suppliers.filter(elt=> elt.nom.toLowerCase().includes(search))} openModifyModal={openModifyModal} openDeleteModal={openDeleteModal} />
      </div>
      <SupplierModal
        open={open}
        data={supplierInfo}
        modify={modify}
        isLoading={newSupplierStatus === "loading" ? true : false}
        handleChange={handleChange}
        handleClose={handleClose}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
      <DeleteModal
        open={openDelete}
        data={supplierInfo}
        title="Supprimer un fournisseur"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </section>
  );
};

export default SupplierPage;
