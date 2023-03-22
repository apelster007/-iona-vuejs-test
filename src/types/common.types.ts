import type { AxiosRequestConfig } from "axios";

export interface CustomRequestConfig extends AxiosRequestConfig {
    errorMessage?: string
  }
  