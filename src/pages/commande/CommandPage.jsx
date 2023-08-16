import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {ExportToCsv} from "export-to-csv";
import CommandsList from "../../components/commande/CommandsList";
import {
  getCommandsList,
  addNewCommand,
  updateCommand,
  deleteCommand,
  resetCommandStatus,
} from "../../redux/commandSlice";
import {getClientsList} from "../../redux/clientSlice";
import {getProductsList} from "../../redux/productSlice";
import CommandModal from "../../components/commande/CommandModal";
import DeleteModal from "../../components/baseComponents/DeleteModal";
import Button from "../../components/baseComponents/Button";

const style = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const CommandPage = () => {
  const dispatch = useDispatch();
  const { commands, newCommandStatus,updateCommandStatus,deleteCommandStatus } = useSelector((state) => state.commands);
  const { clients } = useSelector((state) => state.clients);
  const { products } = useSelector((state) => state.products);
  const [commandInfo, setCommandInfo] = useState({
    client: "",
    produits:[]
  });
  const [productsList, setProductsList] = useState([]);
  const [generatedId, setGenerateId] = useState(0);
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
    filename:"LISTE DES COMMANDES",
    title:"LISTE DES COMMANDES",
  };
 

  useEffect(() => {
    dispatch(getCommandsList());
    dispatch(getClientsList());
    dispatch(getProductsList())
  }, []);

  useEffect(() => {
    if (newCommandStatus) {
      if (newCommandStatus === "success") {
        setTimeout(() => {
          toast.success("Commande ajoutée avec succès", style);
        }, 200);
        dispatch(getCommandsList());
      } else if (newCommandStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de l'ajout de la commande",
            style
          );
        }, 200);
      }
    } 

    if (updateCommandStatus) {
      if (updateCommandStatus === "success") {
        setTimeout(() => {
          toast.success("Commande mis à ejour avec succès", style);
        }, 200);
        dispatch(getCommandsList());
      } else if (updateCommandStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la mise à jour de la commande",
            style
          );
        }, 200);
      }
    } 

    if(deleteCommandStatus){
      if (deleteCommandStatus === "success") {
        setTimeout(() => {
          toast.success("Commande suppriemé avec succès", style);
        }, 200);
        dispatch(getCommandsList());
      } else if (deleteCommandStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la suppression de la commande",
            style
          );
        }, 200);
      }
      
    } 
    handleClose();
    dispatch(resetCommandStatus());
  }, [newCommandStatus,updateCommandStatus,deleteCommandStatus]);

   
  const csvExporter = new ExportToCsv(csvOptions)

  const exportData =() => {
    csvExporter.generateCsv(commands)
  }

  const openDeleteModal=(data) => {
    setCommandInfo(data);
    setOpenDelete(true)
  }

  const openModifyModal = (data)=>{
    setModify({data:data,status:true});
    setOpen(true)
    setCommandInfo(data);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setGenerateId(0);
    setProductsList([])
    setModify({data:"",status:false})
    setCommandInfo({
      client: "",
      produits:[]
    });
  };

  
  const incrementId = () => {setGenerateId(prev => prev+1)}

  const addNewProduct = () => {
    let newProducts = [...commandInfo.produits];
    newProducts.push({id:generatedId, produit: "", quantite: 1 });
    setCommandInfo({...commandInfo,produits:newProducts});
    incrementId()
  };

  const handleProductChange = (e,id)=> {
   let newProducts = [...commandInfo.produits];
   let name= e.target.name;
   let value= e.target.value;
   const ind = newProducts.findIndex((elt) => elt.id === id)
   newProducts[ind] = {...newProducts[ind], [name]:value};
   setCommandInfo({...commandInfo,produits:newProducts})
  }

  const handleProductDelete = (id) =>{
    let newProducts = [...commandInfo.produits];
    newProducts = newProducts.filter(elt => elt.id !== id);
    setCommandInfo({...commandInfo,produits:newProducts})
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCommandInfo({ ...commandInfo, [name]: value });
  };

  const handleAdd = () => {
    let newProducts = [];
    for(let prod of commandInfo.produits){
      const elt = products.find(elt => elt.nom === prod.produit)
        newProducts.push({
          produitId:elt._id,
          quantite:parseInt(prod.quantite)
        })
    }
    const clientId = clients.find(elt => elt.nom === commandInfo.client)
    dispatch(addNewCommand({client:clientId, produits:newProducts}))
  };

  const handleUpdate = () => {
    dispatch(updateCommand(commandInfo));
  };

  const handleDelete = () => {
    console.log(commandInfo)
    dispatch(deleteCommand(commandInfo._id))
  }

  return (
    <section>
      <p className="text-center uppercase font-bold text-2xl md:text-3xl">
        Liste des commandes{" "}
      </p>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start flex-wrap">
        <div className="md:flex mt-2">
          <Button
            title="Nouvelle commande"
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
            placeholder="Rechercher le nom du client"
            value={search}
            className=" py-2 pl-8 rounded-md lg:min-w-[350px]  bg-[#F3F4F6] border border-[#F3F4F6]  focus:outline-none focus:bg-transparent focus:border focus:border-slate-400 "
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="absolute left-2.5 top-3 scale-[1.3] text-slate-500" />
        </div>
      </div>
      <div>
        <CommandsList data={commands.filter(elt=> elt.client.nom.toLowerCase().includes(search))} openModifyModal={openModifyModal} openDeleteModal={openDeleteModal} />
      </div>
      <CommandModal
        open={open}
        data={commandInfo}
        products={products}
        clients={clients}
        modify={modify}
        isLoading={newCommandStatus === "loading" ? true : false}
        addNewProduct={addNewProduct}
        handleProductChange={handleProductChange}
        handleProductDelete={handleProductDelete}
        handleChange={handleChange}
        handleClose={handleClose}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
      <DeleteModal
        open={openDelete}
        data={{...commandInfo,nom:commandInfo.client.nom}}
        title="Supprimer une commande"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </section>
  );
};

export default CommandPage;
