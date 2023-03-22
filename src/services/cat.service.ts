import useAxios from "@/composables/useAxios"
import type { CustomRequestConfig } from "@/types/common.types";
import { toast } from 'vue3-toastify';

const useCatService = () => {
    const {get} = useAxios('');

    const getBreeds = () => get('/breeds')

    const search = (config: CustomRequestConfig = {}) =>
      get('/images/search', {
        ...config,
        errorMessage:
          'Apologies but we could not load new cats for you at this time! Miau!',
      })

    return {
      getBreeds,
      search,
    }
}
export default useCatService;