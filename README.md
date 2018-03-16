<p align="center"><img src="logo.png" alt="logo" width="300"></p>



# JsonClient

JsonClient is a JavaScript HTTP client specialized for JSON communications, based upon the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Therefore it is completely Promise based and makes it easy to communicate JSON data across your application.

## How to ?

First you need to get this library, either by using [npm (w/ node)](https://nodejs.org/en/) and `npm i --save @voltra/json` or by downloading it from the [GitHub repository](https://github.com/Voltra/jsonclient).



Then you will need to use it in your application :

* \>= ES6 : `import {$json} from "@voltra/json"`
* Node (<ES6) : `const {$json} = require("@voltra/json")`
* In your HTML files : `<script src="your/path/to/dist/jsonclient.js"></script>` (exposes the variable `$json`)



### GET requests

This library uses my other library, [fetchJSON](https://www.npmjs.com/package/fetch_json),  as its GET request handler.

Therefore, the behavior of `$json.get` is identical to the behavior of `fetchJSON`.



`$json.get :: (url: string, functor: function|undefined) -> Promise`

The Promise returned by `$json.get` resolves to the JSON data requested.



### POST requests

If you have made any POST request via the Fetch API, you probably noticed that it is very redundant.

Therefore, this library enables you to ease your job at emitting POST requests.



`$json.post :: (url: string, data: any) -> Promise`

`$json.post :: (url: string, data: any, options: object) -> Promise`

```
$json.post :: (
	url: string,
	data: any,
	cache: $json.postOptionsEnums.Cache,
	credentials: $json.postOptionsEnums.Credentials,
	mode: $json.postOptionsEnums.Mode,
	redirect: $json.postOptionsEnums.Redirect,
	referrer: $json.postOptionsEnums.Referrer
) -> Promise
```



If you have any doubts, you could refer to [Mozilla's guide on how to provide options to `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options) or ask for advices on my [Discord server](https://discord.gg/JtWAjbw).

## Hooks and defaults

There are a few ways you can customize your JSON client (POST requests only) :

* Pass your custom settings as the third argument
* Change the default values



Default values are located in the object `$json.defaults` and are classified per HTTP methods (only those supported).



## Dependencies

There are only two dependencies :

* [fetchJSON](https://www.npmjs.com/package/fetch_json) : Used in developpement as the GET request provider (I'm the on that needs it)

* The Fetch API or `fetch` : As part of the Fetch API, `fetch` allows to emit HTTP requests. This library is heavily based around this function and therefore requires it, modern browsers implement it but there are also a lot of polyfills out there, here are two of them :

  * [fetch-ponyfill](https://www.npmjs.com/package/fetch-ponyfill) : Works for both browser and Node :

    ```javascript
    const {fetch, Request, Response, Headers} = require("fetch-ponyfill")();
    global.fetch = fetch; //For Node, this.fetch = fetch for browser

    ///OR

    import fetchPonyfill from "fetch-ponyfill"
    const {fetch, Request, Response, Headers} = fetchPonyfill();
    ```

    ​

  * [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) : For old browsers

  * [node-fetch](https://www.npmjs.com/package/node-fetch) : For Node-based environments



## Troubleshooting

If you don't find an answer to your problem, feel free to ask for help on my [Discord server](https://discord.gg/JtWAjbw).



**I can't use this library except by including it directly in the HTML**

> Until v1.1.0, there was an issue were the build process would simplify a conditional occuring in the UMD which would break the code for usage outside of the browser.
>
> This has been fixed in v1.1.0 by simply declaring the transpiled `build-babel/jsonclient.esm.js` file as the entry point of the application, thus making it available to use everywhere. As a sidenote, I'd like to point out that direct usage in the browser is done by including `dist/jsonclient.js` (which is not the entry point anymore).
>
> 
>
> Make sure that the version of the library you have is at least 1.1.0 (check the `package.json` file), if not update it for the latest version.
>
> If you're still having this problem post v1.1.0, feel free to [open an issue on GitHub](https://github.com/Voltra/jsonclient/issues).



**I cannot find `$json.postOptions`, where are they ?**

> Since v1.1.0, `$json.postOptions` has been renamed `$json.postOptionsEnums` in order to avoid any kind of confusion.



**I am unable to get the requested data, there is an error in the console : `"Something went wrong during data inspection (data is not JSON or couldn't reach file)"`**

> This can mean two things (as said in the error message) :
>
> - The data is not **explicitely** marked as json (needs the`content-type` to be `application/json`, which is the standard way of identifying JSON)
> - The client was unable to reach the requested data (typo, wrong URL/URI, etc...)



---

Join the [Discord server](https://discord.gg/JtWAjbw) to talk about my libraries and get help if you need any.