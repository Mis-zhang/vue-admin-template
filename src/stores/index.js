import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export * from './modules/app';
export * from './modules/dict';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
