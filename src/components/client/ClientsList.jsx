import React from "react";
import { BsTrash, BsEye } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { Tooltip } from "@mui/material";
import NotFound from "../baseComponents/NotFound";

const ClientsList = ({ data, openModifyModal, openDeleteModal }) => {

 

  return (
    <div className="mt-8">
      {data.length === 0 ? (
        <NotFound />
      ) : (
        <table className="w-full overflow-scroll border-b border-slate-100 ">
          <tr className="[&>*]:pl-4 [&>*]:bg-[#F8FAFC] [&>*]:text-start [&>*]:text-sm [&>*]:font-medium [&>*]:py-3 [&>*]:text-slate-600">
            <th>Nom</th>
            <th>Prenom</th>
            <th>Adresse</th>
            <th>Telephone</th>
            <th>Actions</th>
          </tr>
          {data.map((elt, id) => {
            return (
              <tr
                key={id}
                className="text-start [&>*]:py-4 [&>*]:text-sm [&>*]:text-slate-600 [&>*]:font-medium hover:bg-red-50 [&>*]:pl-4 "
              >
                <td>{elt.nom}</td>
                <td>{elt.prenom} </td>

                <td>{elt.adresse} </td>
                <td>{elt.telephone} </td>
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

export default ClientsList;
