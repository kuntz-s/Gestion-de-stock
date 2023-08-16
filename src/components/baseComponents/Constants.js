export const getMonthName = (num) => {
    switch(num){
        case 0: return "Janvier"; break;
        case 1: return "Fevrier"; break;
        case 2: return "Mars"; break;
        case 3: return "Avril"; break;
        case 4: return "Mai"; break;
        case 5: return "Juin"; break;
        case 6: return "Juillet"; break;
        case 7: return "Août"; break;
        case 8: return "Septembre"; break;
        case 9: return "Octobre"; break;
        case 10: return "Novembre"; break;
        case 11: return "Decembre"; break;
        default:return "err"; break
    }
}


 
export const verifyDuplicate = ( commands)=>{
    let duplicate = false;
    let temp = [];
    for(let com of commands){
      const verif = temp.find(elt => elt.produit === com.produit);
      if(verif){
        duplicate = true;
        break;
      } 
      temp.push(com);
    }
    return duplicate;
}
