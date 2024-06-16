import { legacy_createStore } from "redux";
import rootReducer from "../rootReducer/reducers/rootReducer";

const store = legacy_createStore(rootReducer);

export default store;
