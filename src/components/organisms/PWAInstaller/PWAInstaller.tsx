import {usePwa} from "@dotmind/react-use-pwa";
import {useCallback, useEffect} from "react";

import S from './PWAInstaller.module.scss';
import icon from '../../../../public/images/install_mobile.svg';
import {GameControl} from "../../molecules/GameControl/GameControl";

export const PWAInstaller = () => {
    const {
        installPrompt,
        isInstalled,
        isStandalone,
        isOffline,
        canInstall,
    } = usePwa();

    const onClick = useCallback(() => {
        console.log({
            isStandalone,
            isOffline,
            canInstall,
            isInstalled
        })
        if (!canInstall || isInstalled) {
            return;
        }

        installPrompt();
    }, [isInstalled, canInstall, installPrompt]);

    return (
        <div className={S.container}>
            <GameControl
                icon={icon}
                className={S.icon}
                onClick={onClick}
                name={'Install'}
            />
        </div>
    )
}