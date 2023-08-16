import React,{useState} from "react";
import { BsTrash } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import NotFound from "../baseComponents/NotFound";
import { getMonthName } from "../baseComponents/Constants";
import CommandDetails from "./CommandDetails";

const CommandsList = ({ data, openModifyModal, openDeleteModal }) => {

  const [open,setOpen ] = useState(false);
  const [command,setCommand] = useState({});

  return (
    <div className="mt-8">
      {data.length === 0 ? (
        <NotFound />
      ) : (
        <table className="w-full overflow-scroll border-b border-slate-100 ">
          <tr className="[&>*]:pl-4 [&>*]:bg-[#F8FAFC] [&>*]:text-start [&>*]:text-sm [&>*]:font-medium [&>*]:py-3 [&>*]:text-slate-600">
            <th>Nom du client</th>
            <th>Date</th>
            <th>Produits</th>
            <th>Prix total</th>
            <th>Actions</th>
          </tr>
          {data.map((elt, id) => {
            const d = new Date(elt.date)
            const monthName = getMonthName(parseInt(d.getMonth()))
            return (
              <tr
                key={id}
                className="text-start [&>*]:py-4 [&>*]:text-sm text-slate-600  [&>*]:font-medium hover:bg-red-50 [&>*]:pl-4 hover:cursor-default"
                
              >
                <td>{elt.client.nom} {elt.client.prenom}</td>
                <td>{d.getDate()+" "+monthName+" "+  d.getFullYear() + " à "+d.getHours()+"h"+d.getMinutes().toString().padStart(2,"0")}</td>
                <td className="text-teal-400 hover:underline hover:underline-offset-2 hover:cursor-pointer" onClick={() => {setOpen(true); setCommand(elt)}}>{elt.produits.length} produit(s)</td>
                <td>{elt.prixTotal}</td>
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
      <CommandDetails open={open}  handleClose={ () => {setOpen(false); setCommand({})}} data={command}/>
    </div>
  
  );
};

export default CommandsList;
