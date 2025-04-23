import logger from "@/lib/logger";
import { ActionResponse } from "@/types/global";
import handleError from "../error";
import { RequestError } from "@/lib/http-erros";

interface FetchOptions extends RequestInit {
    timeout?: number;
}

function isError(error: unknown): error is Error {
    return error instanceof Error;
}

export async function fetchHandler<T>(url: string, options: FetchOptions = {}): Promise<ActionResponse<T>>{
    const {timeout = 5000, headers: customHeaders = {}, ...restOptions} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders: HeadersInit = {
        "content-type": "application/json",
        Accept: "application/json",
    };

    const headers: HeadersInit = {...defaultHeaders, ...customHeaders};
    const config: RequestInit = {
        ...restOptions,
        headers,
        signal: controller.signal,
    };

    try {
        const response = await fetch(url, config);
        clearTimeout(id);

        if(!response.ok){
            throw new RequestError(response.status,`Error en la respuesta: ${response.status}`);
        }

        return await response.json();
    } catch (err) {
        const error = isError(err) ? err : new Error("Ócurrio un error desconocido");

        if(error.name === "AbortError"){
            logger.warn(`Petición a ${url} cancelada por timeout`);
        } else {
            logger.error(`Error en la petición a ${url}: ${error.message}`);
        }

        return handleError(error) as ActionResponse<T>;
    }
}