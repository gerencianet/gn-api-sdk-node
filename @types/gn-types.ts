import constants from "./gn-constants";

type GnConstants = typeof constants;
type GnEndpoints = keyof GnConstants["ENDPOINTS"]
type GnEndpointsMethods = { [K in GnEndpoints]: keyof GnConstants["ENDPOINTS"][K] }
type GnMethods = GnEndpointsMethods[keyof GnEndpointsMethods];

type GnRouteParams = { [param: string]: string | number }
export type GnSdk = Record<GnMethods, <T=any>(params: GnRouteParams, body?: any)=>Promise<T>>
    
export interface GnOptions {
    sandbox: boolean
    client_id: string
    client_secret: string
    pix_cert?: string
    validateMtls?: boolean
    partner_token?: string
}