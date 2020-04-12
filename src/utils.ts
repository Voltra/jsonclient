import { asSequence } from "sequency"

// cf. https://stackoverflow.com/a/34749873/7316365
/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export function isObject(item) {
	return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param {object} target
 * @param {object...} ...sources
 * @returns {object}
 */
export function mergeDeep(target, ...sources) {
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

export const check = function(elem){
	const innerCheck = function(elem){
		if(!(typeof elem == "string" || typeof elem == "number"))
			throw new TypeError("Invalid data object (elements are not all arrays of strings/numbers or strings or numbers)");
	}

	if(elem instanceof Array){
		elem.forEach(innerCheck);
		return;
	}

	innerCheck(elem);
};

export const primitiveToQstring = function(e){
	return encodeURIComponent(e.key) + "=" + encodeURIComponent(e.value);
}

export const objToQueryString = function(path, data){
	const qstring = asSequence(Object.entries(data))
	.map(([key, value]) => ({key, value}))
	.map(({ key, value }) => {
		if(value instanceof Array){
			return asSequence(value)
			.map(function(val){
				return {key, value: val};
			}).map(primitiveToQstring)
			.joinToString({
				separator: "&"
			});//join("&")
		}

		return primitiveToQstring({ key, value });
	}).joinToString({
		separator: "&"
	}); //join("&")

	if(qstring !== ""){
		if(!/\?/.test(path))//has a '?'
			return "?"+qstring;
		else if(!/\?$/.test(path))//doesn't end by '?'
			return /&$/.test(path) ? qstring : "&"+qstring;
	}

	return qstring;
}