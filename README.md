# JsonClient
JsonClient is a JavaScript HTTP client specialized for JSON communications, based upon the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

Therefore it is completely Promise based and makes it easy to communicate JSON data across your application.

## How to ?

First you need to get this library, either by using [npm (w/ node)](https://nodejs.org/en/) and `npm i --save jsonclient` or by downloading it from the [GitHub repository](https://github.com/Voltra/jsonclient).



Then you will need to use it in your application :

* \>= ES6 : `import $json from "jsonclient"`
* Node (<ES6) : `const $json = require("jsonclient")`
* In your HTML files : `<script src="your/path/to/jsonclient.js"></script>`



### GET requests

This library uses my other library, [fetchJSON](https://www.npmjs.com/package/fetch_json),  as its GET request handler.

Therefore, the behavior of `$json.get` is identical to the behavior of `fetchJSON`.



`$json.get :: (url: string, functor: function|undefined) -> Promise`

The Promise returned by `$json.get` resolves to the JSON data requested.



### POST requests

If you have made any POST request via the Fetch API, you probably notice that it is very redundant.

Therefore, this library enables you to ease your job at emitting POST requests.



`$json.post :: (url: string, data: any) -> Promise`

`$json.post :: (url: string, data: any, options: object) -> Promise`

```
$json.post :: (
	url: stirng,
	data: any,
	cache: $json.postOptions.Cache,
	credentials: $json.postOptions.Credentials,
	mode: $json.postOptions.Mode,
	redirect: $json.postOptions.Redirect,
	referrer: $json.postOptions.Redirect
) -> Promise
```



If you have any doubts, you could refer to [Mozilla's guide on how to provide options to `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options)



---

Join the [Discord server](https://discord.gg/JtWAjbw) to talk about my libraries and get help if you need any.