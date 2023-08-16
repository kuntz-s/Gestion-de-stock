import { createBrowserRouter } from "react-router-dom";
import SidebarMenu from "./layout/sidebar/SidebarMenu";
import ProductPage from "./pages/produit/ProductPage";
import ClientPage from "./pages/client/ClientPage";
import SupplierPage from "./pages/fournisseur/SupplierPage";
import CommandPage from "./pages/commande/CommandPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarMenu />,
    errorElement: <div>Il y'a une ereurs</div>,
    children: [
      {
        path: "/",
        element: <DashboardPage/>,
      },
      {
        path: "/produits",
        element: <ProductPage/>,
      },
      {
        path: "/fournisseurs",
        element: <SupplierPage/>,
      },
      {
        path: "/clients",
        element: <ClientPage/>,
      },
      {
        path: "/commandes",
        element: <CommandPage/>,
      }
    ],
  },
]);

export default Router;
