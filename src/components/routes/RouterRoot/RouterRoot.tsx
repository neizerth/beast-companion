import S from "./RouterRoot.module.scss";
import {Outlet} from "react-router-dom";

export const RouterRoot = () => {
    return (
        <>
            <div className={S.app}>
                <Outlet />
            </div>
        </>
    )
}