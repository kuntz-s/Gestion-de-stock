import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BiPlusCircle, BiSearch } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ExportToCsv } from "export-to-csv";
import ProductsList from "../../components/produit/ProductsList";
import {
  getProductsList,
  addNewProduct,
  updateProduct,
  deleteProduct,
  resetProductStatus,
} from "../../redux/productSlice";
import { getSuppliersList } from "../../redux/supplierSlice";
import ProductModal from "../../components/produit/ProductModal";
import DeleteModal from "../../components/baseComponents/DeleteModal";
import Button from "../../components/baseComponents/Button";

const style = {
  position: "top-right",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const ProductPage = () => {
  const dispatch = useDispatch();
  const {
    products,
    newProductStatus,
    updateProductStatus,
    deleteProductStatus,
  } = useSelector((state) => state.products);
  const { suppliers } = useSelector((state) => state.suppliers);
  const [productInfo, setProductInfo] = useState({
    nom: "",
    qteStock: "",
    prix: "",
    prixGros: "",
    fournisseur: "",
  });
  const [modify, setModify] = useState({ data: "", status: false });
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: true,
    showTitle: true,
    filename: "LISTTE DES PRODUITS",
    title: "LISTE DES PRODUITS",
  };

  useEffect(() => {
    dispatch(getProductsList());
    dispatch(getSuppliersList());
  }, []);

  useEffect(() => {
    if (newProductStatus) {
      if (newProductStatus === "success") {
        setTimeout(() => {
          toast.success("Produit ajouté avec succès", style);
        }, 200);
        dispatch(getProductsList());
      } else if (newProductStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de l'ajout du produit",
            style
          );
        }, 200);
      }
    }

    if (updateProductStatus) {
      if (updateProductStatus === "success") {
        setTimeout(() => {
          toast.success("Produit mis à jour avec succès", style);
        }, 200);
        dispatch(getProductsList());
      } else if (updateProductStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la mise à jour du produit",
            style
          );
        }, 200);
      }
    }

    if (deleteProductStatus) {
      if (deleteProductStatus === "success") {
        setTimeout(() => {
          toast.success("Produit supprimé avec succès", style);
        }, 200);
        dispatch(getProductsList());
      } else if (deleteProductStatus === "failed") {
        setTimeout(() => {
          toast.error(
            "une erreur est survenue lors de la suppression du produit",
            style
          );
        }, 200);
      }
    }
    handleClose();
    dispatch(resetProductStatus());
  }, [newProductStatus, updateProductStatus, deleteProductStatus]);

  const csvExporter = new ExportToCsv(csvOptions);

  const exportData = () => {
    csvExporter.generateCsv(products);
  };

  const openDeleteModal = (data) => {
    setProductInfo(data);
    setOpenDelete(true);
  };

  const openModifyModal = (data) => {
    const newData = {...data, fournisseur:data.fournisseur.nom}
    setModify({ data: newData, status: true });
    setOpen(true);
    setProductInfo(newData);
  };

  const handleOpen = () => {
    if (suppliers.length > 0) {
      setOpen(true);
    } else {
      toast.error("veuillez ajouter au moins un fournisseur");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setModify({ data: "", status: false });
    setProductInfo({
      nom: "",
      qteStock: "",
      prix: "",
      prixGros: "",
      fournisseur: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductInfo({ ...productInfo, [name]: value });
  };

  const handleAdd = () => {
    const supplierId = suppliers.find(
      (elt) => elt.nom === productInfo.fournisseur
    );
    dispatch(addNewProduct({ ...productInfo, fournisseur: supplierId._id }));
  };

  const handleUpdate = () => {
    const supplierId = suppliers.find(
      (elt) => elt.nom === productInfo.fournisseur
    );
    dispatch(updateProduct({ ...productInfo, fournisseur: supplierId._id }));
  };

  const handleDelete = () => {
    dispatch(deleteProduct(productInfo._id));
  };

  return (
    <section>
      <p className="text-center uppercase font-bold text-2xl md:text-3xl">
        Liste des produits{" "}
      </p>
      <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-start md:justify-between items-center md:items-start flex-wrap">
        <div className="md:flex mt-2">
          <Button
            title="Nouveau produit"
            icon={<BiPlusCircle className="scale-[1.4] mr-2" />}
            loading={false}
            handleClick={handleOpen}
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
            placeholder="Rechercher le nom du produit"
            value={search}
            className=" py-2 pl-8 rounded-md lg:min-w-[350px]  bg-[#F3F4F6] border border-[#F3F4F6]  focus:outline-none focus:bg-transparent focus:border focus:border-slate-400 "
            onChange={(e) => setSearch(e.target.value)}
          />
          <BiSearch className="absolute left-2.5 top-3 scale-[1.3] text-slate-500" />
        </div>
      </div>
      <div>
        <ProductsList
          data={products.filter((elt) =>
            elt.nom.toLowerCase().includes(search)
          )}
          openModifyModal={openModifyModal}
          openDeleteModal={openDeleteModal}
        />
      </div>
      <ProductModal
        open={open}
        data={productInfo}
        modify={modify}
        suppliers={suppliers}
        isLoading={newProductStatus === "loading" ? true : false}
        handleChange={handleChange}
        handleClose={handleClose}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
      />
      <DeleteModal
        open={openDelete}
        data={productInfo}
        title="Supprimer un produit"
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </section>
  );
};

export default ProductPage;
