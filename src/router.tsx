import {createHashRouter} from "react-router-dom";

import {HomeRoute, mapLoader, MapRoute, RouterRoot} from "@/components/routes";

export const router = createHashRouter([
  {
    path: "/",
    element: <RouterRoot/>,
    children: [
      {
        index: true,
        element: <HomeRoute/>
      },
      {
        path: "map/:type",
        element: <MapRoute/>,
        loader: mapLoader
      }
    ]
  }
]);