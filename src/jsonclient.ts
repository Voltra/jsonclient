import {Cache} from "./enums/Cache"
import {Credentials} from "./enums/Credentials"
import {Mode} from "./enums/Mode"
import {Redirect} from "./enums/Redirect"
import {Referrer} from "./enums/Referrer"
import * as fetchJSON from "fetch_json"


// export default class $json {
export default class $json {
    // static enums = {Cache, Credentials, Mode, Redirect, Referrer};
    static postOptions = {Cache, Credentials, Mode, Redirect, Referrer};

    static get(path: string, functor: Function|undefined){
        return fetchJSON(path, functor);
    }
    

    protected static __post_options(url: string, data: any, options: object): Promise<any>;
    protected static __post_options(url: string, data: any, options: object): Promise<any>{
        delete options["body"];
        delete options["headers"];
        delete options["method"];
        
        const payload = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        };
        
        const finalPayload = Object.assign({}, payload, options);
        
        const promise = new Promise((resolve, reject)=>{
            const f = fetch(url, finalPayload);
            f.then(response => {
                var contentType= response.headers.get("content-type");

                if(contentType && contentType.includes("application/json"))
                    return response.json().then(resolve);
                else{
                    //throw new Error("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                    reject("Something went wrong during data inspection (data is not JSON or couldn't reach file)");
                    return null;
                }
            });
            return f;
        });

        return promise as Promise<any>;
    }
    
    protected static __post_allArgs(url: string, data: any, cache: Cache, credentials: Credentials, mode: Mode, redirect: Redirect, referrer: Referrer): Promise<any>;
    protected static __post_allArgs(url: string, data: any, cache: Cache, credentials: Credentials, mode: Mode, redirect: Redirect, referrer: Referrer): Promise<any>{
        const payload = {
            cache,
            credentials,
            mode,
            redirect,
            referrer
        };
        
        return $json.__post_options(url, data, payload) as Promise<any>;
    }
    
    protected static __post_data(url: string, data: any): Promise<any>;
    protected static __post_data(url: string, data: any): Promise<any>{
        // return $json.__post_allArgs(
        //     url,
        //     data,
        //     Cache.DEFAULT,
        //     Credentials.OMIT,
        //     Mode.SAMEORIGIN,
        //     Redirect.MANUAL,
        //     Referrer.CLIENT
        // ) as Promise<any>;
        return $json.__post_options(url, data, {});
    }

    static post(url: string, data: any, ...options: any[]): Promise<any>|null;
    static post(url: string, data: any, ...options: any[]): Promise<any>|null{
        if(options.length === 0)
            return $json.__post_data(url, data) as Promise<any>;

        if(options.length === 5){
            const cache = options[0] as Cache;
            const credentials = options[1] as Credentials;
            const mode = options[2] as Mode;
            const redirect = options[3] as Redirect;
            const referrer = options[4] as Referrer;

            return $json.__post_allArgs(url, data, cache, credentials, mode, redirect, referrer) as Promise<any>;
        }

        if(options.length === 1){
            const optionsObj = options[0] as object;
            return $json.__post_options(url, data, optionsObj) as Promise<any>;
        }

        return null;
    }
};