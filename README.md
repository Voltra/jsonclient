<p align="center"><img src="logo.png" alt="logo" width="300"></p>

# JsonClient

JsonClient is a JavaScript HTTP client specialized for JSON communications, based upon the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Therefore it is completely Promise based and makes it easy to communicate JSON data across your application.

## How to ?

First you need to get this library, either by using [npm (w/ node)](https://nodejs.org/en/) and `npm i --save @voltra/json` or by downloading it from the [GitHub repository](https://github.com/Voltra/jsonclient).



Then you will need to use it in your application :

* \>= ES6 : `import { $json } from "@voltra/json"`
* Node (<ES6) : `const { $json } = require("@voltra/json")`
* In your HTML files : `<script src="your/path/to/dist/jsonclient.js"></script>` (exposes the variable `jsonclient` which contains the exports)



### Exposed variables

The global export of library now exposes :

```javascript
{
    $json, // default client
    JsonClient, // client class
    Middlewares, // class that stores middleware stacks for every hook
    MiddlewareStack, // class that stores middlewares
    middlewares, //TODO: export default middlewares
}
```



### GET requests

Therefore, the behavior of `$json.get` is very similar to the behavior of [`fetchJSON`]([fetchJSON](https://www.npmjs.com/package/fetch_json)).



`$json.get :: (url: string, data: object|undefined) -> Promise`

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
	cache: $json.enums.Cache,
	credentials: $json.enums.Credentials,
	mode: $json.enums.Mode,
	redirect: $json.enums.Redirect,
	referrer: $json.enums.Referrer
) -> Promise
```



### PUT/DELETE/PATCH requests

All of these follow the same syntax as `$json.post` (PUT is `$json.put`, etc.).



If you have any doubts, you could refer to [Mozilla's guide on how to provide options to `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options) or ask for advices on my [Discord server](https://discord.gg/JtWAjbw).

## Hooks and defaults

There are a few ways you can customize your JSON client (POST requests only) :

* Pass your custom settings as the third argument
* Change the default values
* Use middlewares



### Default values

Default values are located in the object `$json.defaults` and are classified per HTTP methods (only those supported).

For instance `$json.defaults.GET` are the default values for GET requests. There is also `$json.defaults.globals` that are applied for every method.

Note that the order of application is :

1. `defaults.globals`
2. `defaults[METHOD]`
3. your custom options



### Middlewares

This library now exposes a middleware system with several hooks :

1. `beforeRequest` which preprocesses data in order to process the request
2. `beforeResponse` which preprocesses raw response data
3. `afterResponse` which preprocesses (supposedly) preprocessed JSON data before passing it as the result of the Promise
4. `afterError` which preprocesses the error before it is rethrown

The middleware stacks are exposed under `$json.middlewares[METHOD]` (i.e. for GET requests, it is under `$json.middlewares.GET`). You can therefore `pipe` your custom middlewares :

```javascript
// For instance
$json.middlewares.GET.beforeRequest
    .pipe(doStuff)
    .pipe(thenDoSthg);
```

#### Default behavior (i.e. default middlewares)

By default, the `$json` is configured with enough middlewares so that

```javascript
$json.get("/api/book", {
    sort: "author",
    order: "asc",
    count: 69
}).then(console.log)
.catch(console.error);
```

Will emit a GET request to `/api/book?sort=author&order=asc&count=69` and log the resulting JSON whether it is the list of books or the error JSON.



```javascript
$json.post("/api/book", {
    author_id: 420,
    name: "Call of Cthulhu",
    description: "Some lovecraftian masterpiece"
}).then(console.log)
.catch(console.error);
```

Will emit a POST request to `/api/book` with a JSON body that contains the given data and log the resulting JSON whether it is the inserted book or the error JSON.



Note that if the response itself is not JSON, it will emit the following JSON as error :

```javascript
{
    error, // the raw error
    response, // the raw response
}
```



#### Default middlewares

You can find every single default middleware under the globally exported `middlewares` :

```javascript
const { middlewares } = window.jsonclient;
// OR
const { middlewares } = require("@voltra/json");
```

They are not really middlewares but rather functions that register the middleware on the `JsonClient` that you pass as parameter.

#### Middleware hooks

`beforeRequest` is a middleware stack of `JsonClientRequest` middlewares :

```javascript
const myMiddleware = ({ path, data, options }) => {
    // [...]
    return {
        path: myPath,
        data: myData,
        options: myOptions,
    };
    // the return value could be a promise
    /// Note that the last middleware may only return `path` and `options`
    /// Both being values such that `fetch(path, options)` is a valid call
};
```

`beforeResponse` is a middleware stack of `Response` (as in `GlobalFetch.Response`) :

```javascript
const myMiddleware = response => {
    // [...]
    return myResponse;
    // the return value could be a promise
};
```

`afterResponse` is a middleware stack of JSON data (or any javascript data) :

```javascript
const myMiddleware = parsedJson => {
    // [...]
    return someParsedJson;
    // the return value could be a promise
};
```

`afterError` is a middleware stack of JSON data (or any javascript data) or `Error` objects :

```javascript
const myMiddleware = error => {
    // [...]
    return myError;
    // the return value could be a promise (that resolves to an error)
};
```



#### Middleware stacks

A middleware stack (i.e. `MiddlewareStack` instance) has several handy methods :

* `pipe` which accepts a middleware (can be chained)
* `execute` which accept data as input and processes the middleware stack over the data and results in a Promise
* `at` which accepts an index and return the middleware at the given index (or `null` if there were none)
* `removeAt` which accepts an index and removes the middleware at the given index, this will mutate the internal data structure so indexes may change (can be chained)

You can create an empty `MiddlewareStack` by calling `MiddlewareStack.empty()`.

#### `Middlewares` the hub of middleware stacks

Of course you can access each individual `MiddlewareStack` by its name (e.g. `$json.middlewares.GET.beforeRequest`) but you can also use helper methods directly from the `Middlewares` instance :

```javascript
$json.middlewares.GET.beforeRequest.pipe(myMiddleware);
// is (almost) equivalent to
$json.middlewares.GET.pipeBeforeRequest(myMiddleware);


// You can chain helper calls
$json.middlewares.GET
	.pipeBeforeRequest(myBeforeRequest)
	.pipeBeforeResponse(myBeforeResponse)
	.pipeAfterResponse(myAfterResponse)
	.pipeAfterError(myAfterError)
	// [...]
```







## Dependencies

There is only one dependency :

* [fetchJSON](https://www.npmjs.com/package/fetch_json) : Used in developpement as the GET request provider (I'm the one that needs it, you don't have to put it in your dependencies)

* The Fetch API or `fetch` : As part of the Fetch API, `fetch` allows to emit HTTP requests. This library is heavily based around this function and therefore requires it, modern browsers implement it but there are also a lot of polyfills out there, here are two of them :

  * [fetch-ponyfill](https://www.npmjs.com/package/fetch-ponyfill) : Works for both browser and Node :

    ```javascript
    const {fetch, Request, Response, Headers} = require("fetch-ponyfill")();
    global.fetch = fetch; //For Node, this.fetch = fetch for browser
  
    ///OR
  
    import fetchPonyfill from "fetch-ponyfill"
    const { fetch, Request, Response, Headers } = fetchPonyfill();
    global.fetch = fetch
  ```
  
  
  
* [whatwg-fetch](https://www.npmjs.com/package/whatwg-fetch) : For old browsers
  
  * [node-fetch](https://www.npmjs.com/package/node-fetch) : For Node-based environments



## Changes

### v3.0.0

Dropping :

*  dependency on `fetchJSON`
* support for method overriding/spoofing (no more `$json.method`)



Globally exposed variable for the browser is now `jsonclient` (i.e. `window.$json` => `window.jsonclient.$json`).

Now exposing a middleware system under `$json.middlewares`.

### v2.1.0

Updated `fetchJSON` to use its latest version (v2.2.0)

### v2.0.0

Renamed `$json.postOptionsEnums` to `$json.enums`. 

Added support for `PUT`, `DELETE` and `PATCH` methods (`$json.put`, `$json.delete` and `$json.patch` have the same signature as `$json.post`).

Added support for method override via `$json.method`, it follows the same signature as `$json.post` but adds the first parameter `method` which designate the HTTP method to override. It exposes `X-HTTP-Method-Override`, `X-Method-Override` and `X-HTTP-Method` headers with the provided values. It also exposes default bound versions (`$json.method.put`, `$json.method.delete` and `$json.method.patch`) that have the same signature as `$json.post`. 

### v1.3.0

Updated `fetchJSON` dependency to use its version `2.1.0` and provide defaults and customization to `$json.get`.

Updated `$json.post` to expose defaults for the `data` argument.



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



**I cannot use a callback for `$json.get` anymore, what's going on ?**

> That's very simple. Since v1.2.0 I have updated `fetch_json` to its version 2.0.0 (or latest). The callback has been replaced by an object that will be transformed into the query string (optional).
>
> I thought that since you can `then` you way out of it, the callback was completely unnecessary and has therefore been removed.
>
> But no you can enjoy an easy query string.



**My server doesn't mark explicitely my data as JSON but it still lands properly, why ?**

> Again, since v1.2.0 I have updated `fetch_json` to its version 2.0.0 (or latest). It has loosen up the way it handles JSON conversion.



---

Join the [Discord server](https://discord.gg/JtWAjbw) to talk about my libraries and get help if you need any.