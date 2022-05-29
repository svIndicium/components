import { AxiosResponse } from "axios"
import {
    AuthenticationState,
    Parameters,
    Request,
    RequestHeader,
    RequestMethod,
    RequestOptions
} from "../../api/request/index"
import Gateway from "../../api/request/Gateway"
import { eventBus } from "../../api/index"

export class AuthorizedAxiosGateway implements Gateway {
    constructor(private gateway: Gateway,
                private storage: Storage) {
    }

    static readonly ACCESS_TOKEN_STORAGE_KEY = "access_token"

    request(method: RequestMethod, resource: string, data?: Parameters, options?: RequestOptions): Request {
        const optionOverride: RequestOptions = options
            ? {
                ...options,
                headers: {
                    ...options.headers,
                    [RequestHeader.AUTHORIZATION]: `Bearer ${this.getToken()}`
                }
            }
            : {
                headers: {
                    [RequestHeader.AUTHORIZATION]: `Bearer ${this.getToken()}`
                }
            }
        const request = this.gateway.request(method, resource, data, optionOverride)
        return {
            ...request,
            response: request.response.then((response: AxiosResponse) => {
                switch (response.status) {
                    case 401:
                        eventBus.$emit(AuthenticationState.AUTHORIZATION_FAILED)
                        break
                    case 403:
                        eventBus.$emit(AuthenticationState.ACCESS_DENIED)
                        break
                }
                response.data = response.data.data
                return response
            })
        }
    }

    private getToken() {
        return this.storage.getItem(AuthorizedAxiosGateway.ACCESS_TOKEN_STORAGE_KEY)
    }
}
