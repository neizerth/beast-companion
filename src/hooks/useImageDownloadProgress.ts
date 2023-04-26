import {useEffect, useState} from "react";
import axios from "axios";

export const useImageDownloadProgress = (url: string) => {
    const [currentProgress, setProgress] = useState(0);

    useEffect(() => {
        axios.get(url, {
            onDownloadProgress: ({ progress= 0 }) => currentProgress < 100 && setProgress(progress * 99)
        });
        const img = new Image;
        img.onload = () => setProgress(100);
        img.src = url;
    }, []);

    return currentProgress
}