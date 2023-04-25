import {createHashRouter} from "react-router-dom";
import {
    Home, Root,
    MapRoute, mapLoader
} from "./components/routes";

export const router = createHashRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "map/:type",
                element: <MapRoute/>,
                loader: mapLoader
            }
        ]
    }
]);