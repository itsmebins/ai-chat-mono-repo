import type { ApiPayload } from '@baserepo/utils';
import { ERRORS_ENUM } from '@baserepo/utils';

export const getApiUrl = () => {
  const { VITE_API_URL } = import.meta.env || '';
  return VITE_API_URL || `http://localhost:8080`;
};

interface FetchOptions<T> {
  method: string;
  headers?: Record<string, string>;
  body?: string;
  signal?: AbortSignal;
}

export async function apiCall<T, R>(route: string, options: FetchOptions<T>): Promise<ApiPayload<R | null>> {
  console.log('Api call');
  try {
    const { headers, signal } = options;

    const response = await fetch(`${getApiUrl()}/api${route}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
      signal: signal ? signal : AbortSignal.timeout(60000), // 1 Minute,
    });

    if (!response.ok) {
      throw response;
    }

    const responseData: ApiPayload<R> = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    if (error instanceof Response) {
      const errResponse: ApiPayload<R> = await error.json();
      return {
        success: false,
        errorMsg: errResponse.errorMsg || ERRORS_ENUM.GENERIC_ERROR,
        errorCode: errResponse.errorCode || ERRORS_ENUM.GENERIC_ERROR,
        errors: errResponse.errors,
        data: errResponse.data,
      };
    }
    return {
      success: false,
      errorMsg: ERRORS_ENUM.API_SERVER_DOWN,
      errorCode: ERRORS_ENUM.API_SERVER_DOWN,
      data: null,
    };
  }
}
