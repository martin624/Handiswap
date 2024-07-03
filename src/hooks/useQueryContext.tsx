import { useParams } from "react-router-dom";
import { EndpointTypes } from "../models/types";

export default function useQueryContext(){
    const query = new URLSearchParams(window.location.search);

    const { cluster } = useParams<{ cluster?: string }>();

    const endpoint = cluster?(cluster as EndpointTypes): "mainnet";
    const hasClusterOpton = endpoint !== "mainnet";

    const fmtUrlWithCluster = (url)=>{
        if(hasClusterOpton){
            const mark = url.includes("?") ? "&" : "?";
            return decodeURIComponent(`${url}${mark}cluster=${endpoint}`);
        }
        return url;
    };

    return {
        fmtUrlWithCluster,
    };
}