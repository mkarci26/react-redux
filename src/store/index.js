import configureStore from './configure-store'
import { createHashHistory } from "history"

export const history = createHashHistory();

export const store = configureStore();