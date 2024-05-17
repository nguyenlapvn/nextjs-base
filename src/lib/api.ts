import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL!

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

let token: string

export function setToken(value: string) {
  token = value
}

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.VERCEL_ENV === 'development' ||
    process.env.VERCEL_ENV === 'preview'
  ) {
    console.log(message)
  }
}

// Request Interceptor
const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method, url } = config
  // Set Headers Here
  // Check Authentication Here
  // Set Loading Start Here
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

  if (method === 'get') {
    config.timeout = 15000
  }
  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config
  const { status } = response
  // Set Loading End Here
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)

  return response
}

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error
    const { method, url } = error.config as AxiosRequestConfig
    const { statusText, status } = (error.response as AxiosResponse) ?? {}

    logOnDev(
      `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`
    )

    switch (status) {
      case 401: {
        // "Login required"
        break
      }
      case 403: {
        // "Permission denied"
        break
      }
      case 404: {
        // "Invalid request"
        break
      }
      case 500: {
        // "Server error"
        break
      }
      default: {
        // "Unknown error occurred"
        break
      }
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`)
  }

  return Promise.reject(error)
}

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse)
  instance.interceptors.response.use(onResponse, onErrorResponse)

  return instance
}

setupInterceptors(api)
