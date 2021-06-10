import { useContext } from "react";
import { APIContext } from "../../App";

export const useAPI = () => useContext(APIContext)