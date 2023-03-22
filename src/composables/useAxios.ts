import api from "@/services/axios"
import type { CustomRequestConfig } from "@/types/common.types";
import { getCurrentInstance } from "vue";
import { toast } from 'vue3-toastify';

const useAxios = (url: string) => {
    const get = (url:string, config?: CustomRequestConfig) => {
        return api
          .get(url, config)
          .then((response) => Promise.resolve(response))
          .catch((err) => {
            const errorMessage =
              config?.errorMessage ||
              err?.response?.data?.message ||
              'Something went wrong !'
            toast(errorMessage, {
              autoClose: 2000,
              type: 'error',
              position: 'top-right',
            }) // ToastOptions
            Promise.reject(err)
          })
    }
    return {
      get,
    }
}

export default useAxios