
import type { ServiceResponse } from "../types/api";

export const login = async (username: string, password: string): Promise<ServiceResponse<boolean>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: true,
                error: null
            })
        }, 1000)
    })
}


