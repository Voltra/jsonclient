import Cache from "@ts/enums/Cache"
import Credentials from "@ts/enums/Cache"
import Mode from "@ts/enums/Cache"
import Redirect from "@ts/enums/Cache"
import Referrer from "@ts/enums/Cache"
import fetchJSON from "fetch_json"


export namespace $json {
    export const Cache = Cache;
    export const Credentials = Credentials;
    export const Mode = Mode;
    export const Redirect = Redirect;
    export const Referrer = Referrer;
    
    export const get = fetchJSON;
    
    
    export function post(url: string, data: any, cache: Cache, credentials: Credentials, mode: Mode, redirect: Redirect, referrer: Referrer){
        const payload = {
            cache,
            credentials,
            mode,
            redirect,
            referrer
        };
        
        return $json.post(url, data, payload);
    }
    
    export function post(url: string, data: any){
        return $json.post(
            url,
            data,
            Cache.DEFAULT,
            Credentials.OMIT,
            Mode.SAMEORIGIN,
            Redirect.MANUAL,
            Referrer.CLIENT
        );
    }
    
    export function post(url: string, data: any, options: object){
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
        
        return new Promise((resolve, reject)=>{
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
    }
    
}

this.$json = $json