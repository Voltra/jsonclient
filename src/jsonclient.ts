import {Cache} from "./enums/Cache"
import {Credentials} from "./enums/Credentials"
import {Mode} from "./enums/Mode"
import {Redirect} from "./enums/Redirect"
import {Referrer} from "./enums/Referrer"
import * as fetchJSON from "fetch_json"


// cf. https://stackoverflow.com/a/34749873/7316365
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
}
//cf. https://stackoverflow.com/a/34749873/7316365


const $json = {
    enums: {Cache, Credentials, Mode, Redirect, Referrer},
    defaults: {
        GET: fetchJSON.defaults,
    },
    get(path: string, data = {}, options = {}): Promise<any>{
        return fetchJSON(path, data, options);
    },
    method(method: string, url: string, data: any, ...options: any[]): Promise<any>|null{
        const METHOD = method.toUpperCase();
        const $options = {
            headers: {
                "X-HTTP-Method-Override": METHOD,
                "X-HTTP-Method": METHOD,
                "X-Method-Override": METHOD,
            },
        };
        if(options.length === 0)
            return this.__method_options(METHOD, url, data, $options) as Promise<any>;

        if(options.length === 5){
            const cache = options[0] as Cache;
            const credentials = options[1] as Credentials;
            const mode = options[2] as Mode;
            const redirect = options[3] as Redirect;
            const referrer = options[4] as Referrer;

            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, {
                cache,
                credentials,
                mode,
                redirect,
                referrer,
            })) as Promise<any>;
        }

        if(options.length === 1){
            const optionsObj = options[0] as object;
            return this.__method_options(METHOD, url, data, mergeDeep({}, $options, optionsObj)) as Promise<any>;
        }

        return null;
    },
};
                                         
$json["__method_options"] = function(method: string, url: string, data: any, options: object): Promise<any>{
    delete options["body"];
    delete options["method"];

    const payload = {
        method: "POST",
        body: JSON.stringify(mergeDeep({}, this.defaults[method].data, data)),
        headers: this.defaults[method].headers
    };

    const finalPayload = mergeDeep({}, payload, options);

    const promise = new Promise((resolve, reject)=>{
        const f = fetch(url, finalPayload);
        f.then(response => {
            return response.json().then(resolve)
            .catch(()=>{
                const error = "Something went wrong during data inspection (data is not JSON)";
                reject(error);
                return Promise.reject(error);
            });
        });
        return f;
    });

    return promise as Promise<any>;
};
            
["post", "put", "delete", "patch"].forEach(method => {
    const METHOD = method.toUpperCase();
    
    $json.defaults[METHOD] = {
        data: {},
        options: {},
        headers: {
            "Content-Type": "application/json"
        }
    };
    
    if(method != "post")
        $json.method[method] = $json.method.bind($json, METHOD);
    
    $json[method] = function(url: string, data: any, ...options: any[]): Promise<any>|null{
        if(options.length === 0)
            return this[`__${method}_data`](url, data) as Promise<any>;

        if(options.length === 5){
            const cache = options[0] as Cache;
            const credentials = options[1] as Credentials;
            const mode = options[2] as Mode;
            const redirect = options[3] as Redirect;
            const referrer = options[4] as Referrer;

            return this[`__${method}_allArgs`](url, data, cache, credentials, mode, redirect, referrer) as Promise<any>;
        }

        if(options.length === 1){
            const optionsObj = options[0] as object;
            return this[`__${method}_options`](url, data, optionsObj) as Promise<any>;
        }

        return null;
    };
    
    Object.defineProperty($json, `__${method}_data`, {
        value: function(url: string, data: any): Promise<any>{
            return this[`__${method}_options`](url, data, this.defaults[METHOD].options) as Promise<any>;
        }
    });

    Object.defineProperty($json, `__${method}_allArgs`, {
        value: function(url: string, data: any, cache: Cache, credentials: Credentials, mode: Mode, redirect: Redirect, referrer: Referrer): Promise<any>{
            const payload = {
                cache,
                credentials,
                mode,
                redirect,
                referrer
            };

            return this[`__${method}_options`](url, data, payload) as Promise<any>;
        }
    });

    Object.defineProperty($json, `__${method}_options`, {
        value: function(url: string, data: any, options: object): Promise<any>{
            delete options["body"];
            delete options["method"];

            const payload = {
                method: METHOD,
                body: JSON.stringify(mergeDeep({}, this.defaults[METHOD].data, data)),
                headers: this.defaults[METHOD].headers
            };

            const finalPayload = mergeDeep({}, payload, options);

            const promise = new Promise((resolve, reject)=>{
                const f = fetch(url, finalPayload);
                f.then(response => {
                    return response.json().then(resolve)
                    .catch(()=>{
                        const error = "Something went wrong during data inspection (data is not JSON)";
                        reject(error);
                        return Promise.reject(error);
                    });
                });
                return f;
            });

            return promise as Promise<any>;
        }
    });
});

export /*default*/ {$json};