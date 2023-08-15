import { createBrowserRouter } from "react-router-dom";
import SidebarMenu from "./layout/sidebar/SidebarMenu";
import ClientPage from "./pages/client/ClientPage";

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
        element: <p>Je suuis dans le produit </p>,
      },
      {
        path: "/fournisseurs",
        element: <p>Je suuis dans le fournisseur </p>,
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
