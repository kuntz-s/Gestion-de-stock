import { createBrowserRouter } from "react-router-dom";
import SidebarMenu from "./layout/sidebar/SidebarMenu";
import ProductPage from "./pages/produit/ProductPage";
import ClientPage from "./pages/client/ClientPage";
import SupplierPage from "./pages/fournisseur/SupplierPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarMenu />,
    errorElement: <div>Il y'a une ereurs</div>,
    children: [
      {
        path: "/",
        element: <p>Je m'appelle nchouwet mfouapon kuntz stephane</p>,
      },
      {
        path: "/dashboard",
        element: <p>Je suuis dans le  dashboard </p>,
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
        element: <p>Je suuis dans le commande </p>,
      }
    ],
  },
]);

export default Router;
