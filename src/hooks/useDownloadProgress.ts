import {useEffect, useState} from "react";
import axios from "axios";

export const useDownloadProgress = (url: string) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        axios.get(url, {
            onDownloadProgress: ({ progress= 0 }) => setProgress(progress * 100)
        })
            .then(() => setProgress(100));
    }, []);

    return progress
}