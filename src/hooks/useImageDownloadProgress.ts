import {useEffect, useState} from "react";
import axios from "axios";

export const useImageDownloadProgress = (url: string) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    const img = new Image;
    img.src = url;
    axios.get(url, {
      onDownloadProgress: ({progress = 0}) => setProgress(progress * 100)
    })
      .then(() => setProgress(100));
  }, []);

  return progress
}