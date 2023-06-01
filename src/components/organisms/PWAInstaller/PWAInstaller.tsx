import {usePwa} from "@dotmind/react-use-pwa";
import {useEffect} from "react";

export const PWAInstaller = () => {
    const {
        installPrompt,
        isInstalled,
        isStandalone,
        isOffline,
        canInstall,
    } = usePwa();

    useEffect(() => {
        if (!canInstall || isInstalled) {
            return;
        }
        installPrompt();
    }, [isInstalled, canInstall, installPrompt]);

    return <></>
}