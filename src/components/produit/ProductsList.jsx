import React from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import NotFound from "../baseComponents/NotFound";
import { getMonthName } from "../baseComponents/Constants";

const ProductsList = ({ data, openModifyModal, openDeleteModal }) => {

 

  return (
    <div className="mt-8">
      {data.length === 0 ? (
        <NotFound />
      ) : (
        <table className="w-full overflow-scroll border-b border-slate-100 ">
          <tr className="[&>*]:pl-4 [&>*]:bg-[#F8FAFC] [&>*]:text-start [&>*]:text-sm [&>*]:font-medium [&>*]:py-3 [&>*]:text-slate-600">
            <th>Nom</th>
            <th>Fournisseur</th>
            <th>Quantité </th>
            <th>Prix</th>
            <th>Prix en gros</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          {data.map((elt, id) => {
            const d = new Date(elt.date)
            const monthName = getMonthName(parseInt(d.getMonth()))
            return (
              <tr
                key={id}
                className="text-start [&>*]:py-4 [&>*]:text-sm [&>*]:text-slate-600 [&>*]:font-medium hover:bg-red-50 [&>*]:pl-4 "
              >
                <td>{elt.nom}</td>
                <td>{elt.fournisseur.nom} </td>
                <td>{elt.qteStock} </td>
                <td>{elt.prix} Fcfa </td>
                <td>{elt.prixGros} Fcfa </td>
                <td>{d.getDate()+" "+monthName+" "+  d.getFullYear() + " à "+d.getHours()+"h"+d.getMinutes().toString().padStart(2,"0")}</td>
                <td className="">
                  <p className="flex items-center justify-start [&>*]:hover:cursor-pointer hover:underline">
                    <FiEdit3
                      className="scale-[1.2] text-teal-400 mr-6 "
                      onClick={() => {
                        openModifyModal(elt);
                      }}
                    />
                    <BsTrash
                      className="scale-[1.2] text-red-500 "
                      onClick={() => {
                        openDeleteModal(elt);
                      }}
                    />
                  </p>
                </td>
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default ProductsList;
