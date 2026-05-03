
import { Members } from "../assets/bbdd";
import type { ServiceResponse } from "../types/api";
import { Member } from "../types/ttrpg";

export const loginRequest = async (username: string, password: string): Promise<ServiceResponse<boolean>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: true,
                error: null
            })
        }, 1000)
    })
}

export const getMember = (memberId: string): ServiceResponse<Member> => {
    const member = Members.find(
        ({ id }) => id === (memberId),
    ); if (member) {
        return {
            data: member,
            error: null
        }
    }
    return {
        data: null,
        error: "No member found"
    }
}
