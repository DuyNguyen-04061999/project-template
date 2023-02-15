import store from "@/stores";
import { setCache } from "@/stores/cacheReducer";

export const localStorageCache = {
  set(name, data, expire) {
    const storeData = {
      data,
      expire: expire || undefined,
    };

    localStorage && localStorage.setItem(name, JSON.stringify(storeData));
  },

  get(queryKey) {
    const storeData =
      localStorage && JSON.parse(localStorage.getItem(queryKey));

    const now = Date.now();
    if (storeData) {
      if (storeData.expire && storeData.expire - now < 0) {
        return;
      }

      return storeData.data;
    }
  },

  remove(queryKey) {
    localStorage && localStorage.removeItem(queryKey);
  },
};

export const sessionStorageCache = {
  set(name, data, expire) {
    const storeData = {
      data,
      expire: expire || undefined,
    };

    sessionStorage && sessionStorage.setItem(name, JSON.stringify(storeData));
  },

  get(queryKey) {
    const storeData =
      sessionStorage && JSON.parse(sessionStorage.getItem(queryKey));

    const now = Date.now();
    if (storeData) {
      if (storeData.expire && storeData.expire - now < 0) {
        return;
      }

      return storeData.data;
    }
  },

  remove(queryKey) {
    sessionStorage && sessionStorage.removeItem(queryKey);
  },
};

export const reduxStorageCache = {
  set(name, data, expire) {
    const storeData = {
      data,
      expire: expire || undefined,
    };

    store.dispatch(setCache({ name, data: storeData }));
  },

  get(queryKey) {
    const storeData = getState().cache[queryKey];
    const now = Date.now();
    if (storeData) {
      if (storeData.expire && storeData.expire - now < 0) {
        return;
      }

      return storeData.data;
    }
  },

  remove(queryKey) {},
};
