import S from "./style.module.scss";
import {Outlet} from "react-router-dom";

export const Root = () => {
    return (
        <>
            <div className={S.app}>
                <Outlet />
            </div>
        </>
    )
}