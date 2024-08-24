import { create, ApiResponse, ApiErrorResponse, ApiOkResponse } from "apisauce";
import cache from "../utility/cache";
import AuthStorage from '../auth/Storage'
import settings from "../config/settings";


const apiClient = create({
  baseURL: settings.apiUrl,
});


apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await AuthStorage.getToken();
  if (authToken) {
    if (!request.headers) {
      request.headers = {};
    }
    request.headers["x-auth-token"] = authToken;
  }
});

const originalGet = apiClient.get;


apiClient.get = async <T, U = T>(
  url: string,
  params?: object,
  axiosConfig?: object
): Promise<ApiResponse<T, U>> => {
  const response = await originalGet<T, U>(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }


  const cachedData = await cache.get(url);
  if (cachedData) {
    return {
      ok: true,
      data: cachedData,
      problem: null,
      originalError: null,
    } as ApiOkResponse<T>;
  }

  return response as ApiErrorResponse<U>;
};

export default apiClient;
