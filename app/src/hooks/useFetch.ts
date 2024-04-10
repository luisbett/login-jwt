import { FetchProps } from "../types/fetch"

export default async function useFetch({url, method, body, token}: FetchProps) {

    let headerContent = {}

    if(token) {
        headerContent = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        }
    } else {
        headerContent = {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    if(body) {
        var res = await fetch(url, {
            method: method,
            headers: headerContent,
            body: JSON.stringify(body),
            credentials: 'include'
        })
    } else {
        var res = await fetch(url, {
            method: method,
            headers: headerContent,
            credentials: 'include'
        })
    }

    if(res.status !== 204) {
        var data = await res.json()
    }

    return { ok: res.ok,
            status: res.status,
            data }
}