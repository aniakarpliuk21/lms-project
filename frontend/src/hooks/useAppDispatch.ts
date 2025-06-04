import {useDispatch} from "react-redux";
import {store} from "@/redux/store";

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();