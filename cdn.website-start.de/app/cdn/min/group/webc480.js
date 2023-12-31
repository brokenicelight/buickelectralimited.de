/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */
(function (global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document
			? factory(global, true)
			: function (w) {
					if (!w.document) {
						throw new Error("jQuery requires a window with a document");
					}
					return factory(w);
			  };
	} else {
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
	var deletedIds = [];
	var slice = deletedIds.slice;
	var concat = deletedIds.concat;
	var push = deletedIds.push;
	var indexOf = deletedIds.indexOf;
	var class2type = {};
	var toString = class2type.toString;
	var hasOwn = class2type.hasOwnProperty;
	var trim = "".trim;
	var support = {};
	var version = "1.11.0",
		jQuery = function (selector, context) {
			return new jQuery.fn.init(selector, context);
		},
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
		fcamelCase = function (all, letter) {
			return letter.toUpperCase();
		};
	jQuery.fn = jQuery.prototype = {
		jquery: version,
		constructor: jQuery,
		selector: "",
		length: 0,
		toArray: function () {
			return slice.call(this);
		},
		get: function (num) {
			return num != null
				? num < 0
					? this[num + this.length]
					: this[num]
				: slice.call(this);
		},
		pushStack: function (elems) {
			var ret = jQuery.merge(this.constructor(), elems);
			ret.prevObject = this;
			ret.context = this.context;
			return ret;
		},
		each: function (callback, args) {
			return jQuery.each(this, callback, args);
		},
		map: function (callback) {
			return this.pushStack(
				jQuery.map(this, function (elem, i) {
					return callback.call(elem, i, elem);
				})
			);
		},
		slice: function () {
			return this.pushStack(slice.apply(this, arguments));
		},
		first: function () {
			return this.eq(0);
		},
		last: function () {
			return this.eq(-1);
		},
		eq: function (i) {
			var len = this.length,
				j = +i + (i < 0 ? len : 0);
			return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
		},
		end: function () {
			return this.prevObject || this.constructor(null);
		},
		push: push,
		sort: deletedIds.sort,
		splice: deletedIds.splice,
	};
	jQuery.extend = jQuery.fn.extend = function () {
		var src,
			copyIsArray,
			copy,
			name,
			options,
			clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
		if (typeof target === "boolean") {
			deep = target;
			target = arguments[i] || {};
			i++;
		}
		if (typeof target !== "object" && !jQuery.isFunction(target)) {
			target = {};
		}
		if (i === length) {
			target = this;
			i--;
		}
		for (; i < length; i++) {
			if ((options = arguments[i]) != null) {
				for (name in options) {
					src = target[name];
					copy = options[name];
					if (target === copy) {
						continue;
					}
					if (
						deep &&
						copy &&
						(jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))
					) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
						target[name] = jQuery.extend(deep, clone, copy);
					} else if (copy !== undefined) {
						target[name] = copy;
					}
				}
			}
		}
		return target;
	};
	jQuery.extend({
		expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
		isReady: true,
		error: function (msg) {
			throw new Error(msg);
		},
		noop: function () {},
		isFunction: function (obj) {
			return jQuery.type(obj) === "function";
		},
		isArray:
			Array.isArray ||
			function (obj) {
				return jQuery.type(obj) === "array";
			},
		isWindow: function (obj) {
			return obj != null && obj == obj.window;
		},
		isNumeric: function (obj) {
			return obj - parseFloat(obj) >= 0;
		},
		isEmptyObject: function (obj) {
			var name;
			for (name in obj) {
				return false;
			}
			return true;
		},
		isPlainObject: function (obj) {
			var key;
			if (
				!obj ||
				jQuery.type(obj) !== "object" ||
				obj.nodeType ||
				jQuery.isWindow(obj)
			) {
				return false;
			}
			try {
				if (
					obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf")
				) {
					return false;
				}
			} catch (e) {
				return false;
			}
			if (support.ownLast) {
				for (key in obj) {
					return hasOwn.call(obj, key);
				}
			}
			for (key in obj) {
			}
			return key === undefined || hasOwn.call(obj, key);
		},
		type: function (obj) {
			if (obj == null) {
				return obj + "";
			}
			return typeof obj === "object" || typeof obj === "function"
				? class2type[toString.call(obj)] || "object"
				: typeof obj;
		},
		globalEval: function (data) {
			if (data && jQuery.trim(data)) {
				(
					window.execScript ||
					function (data) {
						window["eval"].call(window, data);
					}
				)(data);
			}
		},
		camelCase: function (string) {
			return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
		},
		nodeName: function (elem, name) {
			return (
				elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase()
			);
		},
		each: function (obj, callback, args) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike(obj);
			if (args) {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.apply(obj[i], args);
						if (value === false) {
							break;
						}
					}
				}
			} else {
				if (isArray) {
					for (; i < length; i++) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				} else {
					for (i in obj) {
						value = callback.call(obj[i], i, obj[i]);
						if (value === false) {
							break;
						}
					}
				}
			}
			return obj;
		},
		trim:
			trim && !trim.call("\uFEFF\xA0")
				? function (text) {
						return text == null ? "" : trim.call(text);
				  }
				: function (text) {
						return text == null ? "" : (text + "").replace(rtrim, "");
				  },
		makeArray: function (arr, results) {
			var ret = results || [];
			if (arr != null) {
				if (isArraylike(Object(arr))) {
					jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
				} else {
					push.call(ret, arr);
				}
			}
			return ret;
		},
		inArray: function (elem, arr, i) {
			var len;
			if (arr) {
				if (indexOf) {
					return indexOf.call(arr, elem, i);
				}
				len = arr.length;
				i = i ? (i < 0 ? Math.max(0, len + i) : i) : 0;
				for (; i < len; i++) {
					if (i in arr && arr[i] === elem) {
						return i;
					}
				}
			}
			return -1;
		},
		merge: function (first, second) {
			var len = +second.length,
				j = 0,
				i = first.length;
			while (j < len) {
				first[i++] = second[j++];
			}
			if (len !== len) {
				while (second[j] !== undefined) {
					first[i++] = second[j++];
				}
			}
			first.length = i;
			return first;
		},
		grep: function (elems, callback, invert) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
			for (; i < length; i++) {
				callbackInverse = !callback(elems[i], i);
				if (callbackInverse !== callbackExpect) {
					matches.push(elems[i]);
				}
			}
			return matches;
		},
		map: function (elems, callback, arg) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike(elems),
				ret = [];
			if (isArray) {
				for (; i < length; i++) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			} else {
				for (i in elems) {
					value = callback(elems[i], i, arg);
					if (value != null) {
						ret.push(value);
					}
				}
			}
			return concat.apply([], ret);
		},
		guid: 1,
		proxy: function (fn, context) {
			var args, proxy, tmp;
			if (typeof context === "string") {
				tmp = fn[context];
				context = fn;
				fn = tmp;
			}
			if (!jQuery.isFunction(fn)) {
				return undefined;
			}
			args = slice.call(arguments, 2);
			proxy = function () {
				return fn.apply(context || this, args.concat(slice.call(arguments)));
			};
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
			return proxy;
		},
		now: function () {
			return +new Date();
		},
		support: support,
	});
	jQuery.each(
		"Boolean Number String Function Array Date RegExp Object Error".split(" "),
		function (i, name) {
			class2type["[object " + name + "]"] = name.toLowerCase();
		}
	);
	function isArraylike(obj) {
		var length = obj.length,
			type = jQuery.type(obj);
		if (type === "function" || jQuery.isWindow(obj)) {
			return false;
		}
		if (obj.nodeType === 1 && length) {
			return true;
		}
		return (
			type === "array" ||
			length === 0 ||
			(typeof length === "number" && length > 0 && length - 1 in obj)
		);
	}
	var Sizzle =
		/*!
		 * Sizzle CSS Selector Engine v1.10.16
		 * http://sizzlejs.com/
		 *
		 * Copyright 2013 jQuery Foundation, Inc. and other contributors
		 * Released under the MIT license
		 * http://jquery.org/license
		 *
		 * Date: 2014-01-13
		 */
		(function (window) {
			var i,
				support,
				Expr,
				getText,
				isXML,
				compile,
				outermostContext,
				sortInput,
				hasDuplicate,
				setDocument,
				document,
				docElem,
				documentIsHTML,
				rbuggyQSA,
				rbuggyMatches,
				matches,
				contains,
				expando = "sizzle" + -new Date(),
				preferredDoc = window.document,
				dirruns = 0,
				done = 0,
				classCache = createCache(),
				tokenCache = createCache(),
				compilerCache = createCache(),
				sortOrder = function (a, b) {
					if (a === b) {
						hasDuplicate = true;
					}
					return 0;
				},
				strundefined = typeof undefined,
				MAX_NEGATIVE = 1 << 31,
				hasOwn = {}.hasOwnProperty,
				arr = [],
				pop = arr.pop,
				push_native = arr.push,
				push = arr.push,
				slice = arr.slice,
				indexOf =
					arr.indexOf ||
					function (elem) {
						var i = 0,
							len = this.length;
						for (; i < len; i++) {
							if (this[i] === elem) {
								return i;
							}
						}
						return -1;
					},
				booleans =
					"checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
				whitespace = "[\\x20\\t\\r\\n\\f]",
				characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
				identifier = characterEncoding.replace("w", "w#"),
				attributes =
					"\\[" +
					whitespace +
					"*(" +
					characterEncoding +
					")" +
					whitespace +
					"*(?:([*^$|!~]?=)" +
					whitespace +
					"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" +
					identifier +
					")|)|)" +
					whitespace +
					"*\\]",
				pseudos =
					":(" +
					characterEncoding +
					")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" +
					attributes.replace(3, 8) +
					")*)|.*)\\)|)",
				rtrim = new RegExp(
					"^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
					"g"
				),
				rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
				rcombinators = new RegExp(
					"^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"
				),
				rattributeQuotes = new RegExp(
					"=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]",
					"g"
				),
				rpseudo = new RegExp(pseudos),
				ridentifier = new RegExp("^" + identifier + "$"),
				matchExpr = {
					ID: new RegExp("^#(" + characterEncoding + ")"),
					CLASS: new RegExp("^\\.(" + characterEncoding + ")"),
					TAG: new RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
					ATTR: new RegExp("^" + attributes),
					PSEUDO: new RegExp("^" + pseudos),
					CHILD: new RegExp(
						"^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
							whitespace +
							"*(even|odd|(([+-]|)(\\d*)n|)" +
							whitespace +
							"*(?:([+-]|)" +
							whitespace +
							"*(\\d+)|))" +
							whitespace +
							"*\\)|)",
						"i"
					),
					bool: new RegExp("^(?:" + booleans + ")$", "i"),
					needsContext: new RegExp(
						"^" +
							whitespace +
							"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
							whitespace +
							"*((?:-\\d)?\\d*)" +
							whitespace +
							"*\\)|)(?=[^-]|$)",
						"i"
					),
				},
				rinputs = /^(?:input|select|textarea|button)$/i,
				rheader = /^h\d$/i,
				rnative = /^[^{]+\{\s*\[native \w/,
				rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
				rsibling = /[+~]/,
				rescape = /'|\\/g,
				runescape = new RegExp(
					"\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)",
					"ig"
				),
				funescape = function (_, escaped, escapedWhitespace) {
					var high = "0x" + escaped - 0x10000;
					return high !== high || escapedWhitespace
						? escaped
						: high < 0
						? String.fromCharCode(high + 0x10000)
						: String.fromCharCode(
								(high >> 10) | 0xd800,
								(high & 0x3ff) | 0xdc00
						  );
				};
			try {
				push.apply(
					(arr = slice.call(preferredDoc.childNodes)),
					preferredDoc.childNodes
				);
				arr[preferredDoc.childNodes.length].nodeType;
			} catch (e) {
				push = {
					apply: arr.length
						? function (target, els) {
								push_native.apply(target, slice.call(els));
						  }
						: function (target, els) {
								var j = target.length,
									i = 0;
								while ((target[j++] = els[i++])) {}
								target.length = j - 1;
						  },
				};
			}
			function Sizzle(selector, context, results, seed) {
				var match,
					elem,
					m,
					nodeType,
					i,
					groups,
					old,
					nid,
					newContext,
					newSelector;
				if (
					(context ? context.ownerDocument || context : preferredDoc) !==
					document
				) {
					setDocument(context);
				}
				context = context || document;
				results = results || [];
				if (!selector || typeof selector !== "string") {
					return results;
				}
				if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
					return [];
				}
				if (documentIsHTML && !seed) {
					if ((match = rquickExpr.exec(selector))) {
						if ((m = match[1])) {
							if (nodeType === 9) {
								elem = context.getElementById(m);
								if (elem && elem.parentNode) {
									if (elem.id === m) {
										results.push(elem);
										return results;
									}
								} else {
									return results;
								}
							} else {
								if (
									context.ownerDocument &&
									(elem = context.ownerDocument.getElementById(m)) &&
									contains(context, elem) &&
									elem.id === m
								) {
									results.push(elem);
									return results;
								}
							}
						} else if (match[2]) {
							push.apply(results, context.getElementsByTagName(selector));
							return results;
						} else if (
							(m = match[3]) &&
							support.getElementsByClassName &&
							context.getElementsByClassName
						) {
							push.apply(results, context.getElementsByClassName(m));
							return results;
						}
					}
					if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
						nid = old = expando;
						newContext = context;
						newSelector = nodeType === 9 && selector;
						if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
							groups = tokenize(selector);
							if ((old = context.getAttribute("id"))) {
								nid = old.replace(rescape, "\\$&");
							} else {
								context.setAttribute("id", nid);
							}
							nid = "[id='" + nid + "'] ";
							i = groups.length;
							while (i--) {
								groups[i] = nid + toSelector(groups[i]);
							}
							newContext =
								(rsibling.test(selector) && testContext(context.parentNode)) ||
								context;
							newSelector = groups.join(",");
						}
						if (newSelector) {
							try {
								push.apply(results, newContext.querySelectorAll(newSelector));
								return results;
							} catch (qsaError) {
							} finally {
								if (!old) {
									context.removeAttribute("id");
								}
							}
						}
					}
				}
				return select(selector.replace(rtrim, "$1"), context, results, seed);
			}
			function createCache() {
				var keys = [];
				function cache(key, value) {
					if (keys.push(key + " ") > Expr.cacheLength) {
						delete cache[keys.shift()];
					}
					return (cache[key + " "] = value);
				}
				return cache;
			}
			function markFunction(fn) {
				fn[expando] = true;
				return fn;
			}
			function assert(fn) {
				var div = document.createElement("div");
				try {
					return !!fn(div);
				} catch (e) {
					return false;
				} finally {
					if (div.parentNode) {
						div.parentNode.removeChild(div);
					}
					div = null;
				}
			}
			function addHandle(attrs, handler) {
				var arr = attrs.split("|"),
					i = attrs.length;
				while (i--) {
					Expr.attrHandle[arr[i]] = handler;
				}
			}
			function siblingCheck(a, b) {
				var cur = b && a,
					diff =
						cur &&
						a.nodeType === 1 &&
						b.nodeType === 1 &&
						(~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
				if (diff) {
					return diff;
				}
				if (cur) {
					while ((cur = cur.nextSibling)) {
						if (cur === b) {
							return -1;
						}
					}
				}
				return a ? 1 : -1;
			}
			function createInputPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === type;
				};
			}
			function createButtonPseudo(type) {
				return function (elem) {
					var name = elem.nodeName.toLowerCase();
					return (name === "input" || name === "button") && elem.type === type;
				};
			}
			function createPositionalPseudo(fn) {
				return markFunction(function (argument) {
					argument = +argument;
					return markFunction(function (seed, matches) {
						var j,
							matchIndexes = fn([], seed.length, argument),
							i = matchIndexes.length;
						while (i--) {
							if (seed[(j = matchIndexes[i])]) {
								seed[j] = !(matches[j] = seed[j]);
							}
						}
					});
				});
			}
			function testContext(context) {
				return (
					context &&
					typeof context.getElementsByTagName !== strundefined &&
					context
				);
			}
			support = Sizzle.support = {};
			isXML = Sizzle.isXML = function (elem) {
				var documentElement =
					elem && (elem.ownerDocument || elem).documentElement;
				return documentElement ? documentElement.nodeName !== "HTML" : false;
			};
			setDocument = Sizzle.setDocument = function (node) {
				var hasCompare,
					doc = node ? node.ownerDocument || node : preferredDoc,
					parent = doc.defaultView;
				if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
					return document;
				}
				document = doc;
				docElem = doc.documentElement;
				documentIsHTML = !isXML(doc);
				if (parent && parent !== parent.top) {
					if (parent.addEventListener) {
						parent.addEventListener(
							"unload",
							function () {
								setDocument();
							},
							false
						);
					} else if (parent.attachEvent) {
						parent.attachEvent("onunload", function () {
							setDocument();
						});
					}
				}
				support.attributes = assert(function (div) {
					div.className = "i";
					return !div.getAttribute("className");
				});
				support.getElementsByTagName = assert(function (div) {
					div.appendChild(doc.createComment(""));
					return !div.getElementsByTagName("*").length;
				});
				support.getElementsByClassName =
					rnative.test(doc.getElementsByClassName) &&
					assert(function (div) {
						div.innerHTML = "<div class='a'></div><div class='a i'></div>";
						div.firstChild.className = "i";
						return div.getElementsByClassName("i").length === 2;
					});
				support.getById = assert(function (div) {
					docElem.appendChild(div).id = expando;
					return (
						!doc.getElementsByName || !doc.getElementsByName(expando).length
					);
				});
				if (support.getById) {
					Expr.find["ID"] = function (id, context) {
						if (
							typeof context.getElementById !== strundefined &&
							documentIsHTML
						) {
							var m = context.getElementById(id);
							return m && m.parentNode ? [m] : [];
						}
					};
					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							return elem.getAttribute("id") === attrId;
						};
					};
				} else {
					delete Expr.find["ID"];
					Expr.filter["ID"] = function (id) {
						var attrId = id.replace(runescape, funescape);
						return function (elem) {
							var node =
								typeof elem.getAttributeNode !== strundefined &&
								elem.getAttributeNode("id");
							return node && node.value === attrId;
						};
					};
				}
				Expr.find["TAG"] = support.getElementsByTagName
					? function (tag, context) {
							if (typeof context.getElementsByTagName !== strundefined) {
								return context.getElementsByTagName(tag);
							}
					  }
					: function (tag, context) {
							var elem,
								tmp = [],
								i = 0,
								results = context.getElementsByTagName(tag);
							if (tag === "*") {
								while ((elem = results[i++])) {
									if (elem.nodeType === 1) {
										tmp.push(elem);
									}
								}
								return tmp;
							}
							return results;
					  };
				Expr.find["CLASS"] =
					support.getElementsByClassName &&
					function (className, context) {
						if (
							typeof context.getElementsByClassName !== strundefined &&
							documentIsHTML
						) {
							return context.getElementsByClassName(className);
						}
					};
				rbuggyMatches = [];
				rbuggyQSA = [];
				if ((support.qsa = rnative.test(doc.querySelectorAll))) {
					assert(function (div) {
						div.innerHTML =
							"<select t=''><option selected=''></option></select>";
						if (div.querySelectorAll("[t^='']").length) {
							rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
						}
						if (!div.querySelectorAll("[selected]").length) {
							rbuggyQSA.push(
								"\\[" + whitespace + "*(?:value|" + booleans + ")"
							);
						}
						if (!div.querySelectorAll(":checked").length) {
							rbuggyQSA.push(":checked");
						}
					});
					assert(function (div) {
						var input = doc.createElement("input");
						input.setAttribute("type", "hidden");
						div.appendChild(input).setAttribute("name", "D");
						if (div.querySelectorAll("[name=d]").length) {
							rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
						}
						if (!div.querySelectorAll(":enabled").length) {
							rbuggyQSA.push(":enabled", ":disabled");
						}
						div.querySelectorAll("*,:x");
						rbuggyQSA.push(",.*:");
					});
				}
				if (
					(support.matchesSelector = rnative.test(
						(matches =
							docElem.webkitMatchesSelector ||
							docElem.mozMatchesSelector ||
							docElem.oMatchesSelector ||
							docElem.msMatchesSelector)
					))
				) {
					assert(function (div) {
						support.disconnectedMatch = matches.call(div, "div");
						matches.call(div, "[s!='']:x");
						rbuggyMatches.push("!=", pseudos);
					});
				}
				rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
				rbuggyMatches =
					rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
				hasCompare = rnative.test(docElem.compareDocumentPosition);
				contains =
					hasCompare || rnative.test(docElem.contains)
						? function (a, b) {
								var adown = a.nodeType === 9 ? a.documentElement : a,
									bup = b && b.parentNode;
								return (
									a === bup ||
									!!(
										bup &&
										bup.nodeType === 1 &&
										(adown.contains
											? adown.contains(bup)
											: a.compareDocumentPosition &&
											  a.compareDocumentPosition(bup) & 16)
									)
								);
						  }
						: function (a, b) {
								if (b) {
									while ((b = b.parentNode)) {
										if (b === a) {
											return true;
										}
									}
								}
								return false;
						  };
				sortOrder = hasCompare
					? function (a, b) {
							if (a === b) {
								hasDuplicate = true;
								return 0;
							}
							var compare =
								!a.compareDocumentPosition - !b.compareDocumentPosition;
							if (compare) {
								return compare;
							}
							compare =
								(a.ownerDocument || a) === (b.ownerDocument || b)
									? a.compareDocumentPosition(b)
									: 1;
							if (
								compare & 1 ||
								(!support.sortDetached &&
									b.compareDocumentPosition(a) === compare)
							) {
								if (
									a === doc ||
									(a.ownerDocument === preferredDoc &&
										contains(preferredDoc, a))
								) {
									return -1;
								}
								if (
									b === doc ||
									(b.ownerDocument === preferredDoc &&
										contains(preferredDoc, b))
								) {
									return 1;
								}
								return sortInput
									? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
									: 0;
							}
							return compare & 4 ? -1 : 1;
					  }
					: function (a, b) {
							if (a === b) {
								hasDuplicate = true;
								return 0;
							}
							var cur,
								i = 0,
								aup = a.parentNode,
								bup = b.parentNode,
								ap = [a],
								bp = [b];
							if (!aup || !bup) {
								return a === doc
									? -1
									: b === doc
									? 1
									: aup
									? -1
									: bup
									? 1
									: sortInput
									? indexOf.call(sortInput, a) - indexOf.call(sortInput, b)
									: 0;
							} else if (aup === bup) {
								return siblingCheck(a, b);
							}
							cur = a;
							while ((cur = cur.parentNode)) {
								ap.unshift(cur);
							}
							cur = b;
							while ((cur = cur.parentNode)) {
								bp.unshift(cur);
							}
							while (ap[i] === bp[i]) {
								i++;
							}
							return i
								? siblingCheck(ap[i], bp[i])
								: ap[i] === preferredDoc
								? -1
								: bp[i] === preferredDoc
								? 1
								: 0;
					  };
				return doc;
			};
			Sizzle.matches = function (expr, elements) {
				return Sizzle(expr, null, null, elements);
			};
			Sizzle.matchesSelector = function (elem, expr) {
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}
				expr = expr.replace(rattributeQuotes, "='$1']");
				if (
					support.matchesSelector &&
					documentIsHTML &&
					(!rbuggyMatches || !rbuggyMatches.test(expr)) &&
					(!rbuggyQSA || !rbuggyQSA.test(expr))
				) {
					try {
						var ret = matches.call(elem, expr);
						if (
							ret ||
							support.disconnectedMatch ||
							(elem.document && elem.document.nodeType !== 11)
						) {
							return ret;
						}
					} catch (e) {}
				}
				return Sizzle(expr, document, null, [elem]).length > 0;
			};
			Sizzle.contains = function (context, elem) {
				if ((context.ownerDocument || context) !== document) {
					setDocument(context);
				}
				return contains(context, elem);
			};
			Sizzle.attr = function (elem, name) {
				if ((elem.ownerDocument || elem) !== document) {
					setDocument(elem);
				}
				var fn = Expr.attrHandle[name.toLowerCase()],
					val =
						fn && hasOwn.call(Expr.attrHandle, name.toLowerCase())
							? fn(elem, name, !documentIsHTML)
							: undefined;
				return val !== undefined
					? val
					: support.attributes || !documentIsHTML
					? elem.getAttribute(name)
					: (val = elem.getAttributeNode(name)) && val.specified
					? val.value
					: null;
			};
			Sizzle.error = function (msg) {
				throw new Error("Syntax error, unrecognized expression: " + msg);
			};
			Sizzle.uniqueSort = function (results) {
				var elem,
					duplicates = [],
					j = 0,
					i = 0;
				hasDuplicate = !support.detectDuplicates;
				sortInput = !support.sortStable && results.slice(0);
				results.sort(sortOrder);
				if (hasDuplicate) {
					while ((elem = results[i++])) {
						if (elem === results[i]) {
							j = duplicates.push(i);
						}
					}
					while (j--) {
						results.splice(duplicates[j], 1);
					}
				}
				sortInput = null;
				return results;
			};
			getText = Sizzle.getText = function (elem) {
				var node,
					ret = "",
					i = 0,
					nodeType = elem.nodeType;
				if (!nodeType) {
					while ((node = elem[i++])) {
						ret += getText(node);
					}
				} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
					if (typeof elem.textContent === "string") {
						return elem.textContent;
					} else {
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							ret += getText(elem);
						}
					}
				} else if (nodeType === 3 || nodeType === 4) {
					return elem.nodeValue;
				}
				return ret;
			};
			Expr = Sizzle.selectors = {
				cacheLength: 50,
				createPseudo: markFunction,
				match: matchExpr,
				attrHandle: {},
				find: {},
				relative: {
					">": {dir: "parentNode", first: true},
					" ": {dir: "parentNode"},
					"+": {dir: "previousSibling", first: true},
					"~": {dir: "previousSibling"},
				},
				preFilter: {
					ATTR: function (match) {
						match[1] = match[1].replace(runescape, funescape);
						match[3] = (match[4] || match[5] || "").replace(
							runescape,
							funescape
						);
						if (match[2] === "~=") {
							match[3] = " " + match[3] + " ";
						}
						return match.slice(0, 4);
					},
					CHILD: function (match) {
						match[1] = match[1].toLowerCase();
						if (match[1].slice(0, 3) === "nth") {
							if (!match[3]) {
								Sizzle.error(match[0]);
							}
							match[4] = +(match[4]
								? match[5] + (match[6] || 1)
								: 2 * (match[3] === "even" || match[3] === "odd"));
							match[5] = +(match[7] + match[8] || match[3] === "odd");
						} else if (match[3]) {
							Sizzle.error(match[0]);
						}
						return match;
					},
					PSEUDO: function (match) {
						var excess,
							unquoted = !match[5] && match[2];
						if (matchExpr["CHILD"].test(match[0])) {
							return null;
						}
						if (match[3] && match[4] !== undefined) {
							match[2] = match[4];
						} else if (
							unquoted &&
							rpseudo.test(unquoted) &&
							(excess = tokenize(unquoted, true)) &&
							(excess =
								unquoted.indexOf(")", unquoted.length - excess) -
								unquoted.length)
						) {
							match[0] = match[0].slice(0, excess);
							match[2] = unquoted.slice(0, excess);
						}
						return match.slice(0, 3);
					},
				},
				filter: {
					TAG: function (nodeNameSelector) {
						var nodeName = nodeNameSelector
							.replace(runescape, funescape)
							.toLowerCase();
						return nodeNameSelector === "*"
							? function () {
									return true;
							  }
							: function (elem) {
									return (
										elem.nodeName && elem.nodeName.toLowerCase() === nodeName
									);
							  };
					},
					CLASS: function (className) {
						var pattern = classCache[className + " "];
						return (
							pattern ||
							((pattern = new RegExp(
								"(^|" + whitespace + ")" + className + "(" + whitespace + "|$)"
							)) &&
								classCache(className, function (elem) {
									return pattern.test(
										(typeof elem.className === "string" && elem.className) ||
											(typeof elem.getAttribute !== strundefined &&
												elem.getAttribute("class")) ||
											""
									);
								}))
						);
					},
					ATTR: function (name, operator, check) {
						return function (elem) {
							var result = Sizzle.attr(elem, name);
							if (result == null) {
								return operator === "!=";
							}
							if (!operator) {
								return true;
							}
							result += "";
							return operator === "="
								? result === check
								: operator === "!="
								? result !== check
								: operator === "^="
								? check && result.indexOf(check) === 0
								: operator === "*="
								? check && result.indexOf(check) > -1
								: operator === "$="
								? check && result.slice(-check.length) === check
								: operator === "~="
								? (" " + result + " ").indexOf(check) > -1
								: operator === "|="
								? result === check ||
								  result.slice(0, check.length + 1) === check + "-"
								: false;
						};
					},
					CHILD: function (type, what, argument, first, last) {
						var simple = type.slice(0, 3) !== "nth",
							forward = type.slice(-4) !== "last",
							ofType = what === "of-type";
						return first === 1 && last === 0
							? function (elem) {
									return !!elem.parentNode;
							  }
							: function (elem, context, xml) {
									var cache,
										outerCache,
										node,
										diff,
										nodeIndex,
										start,
										dir =
											simple !== forward ? "nextSibling" : "previousSibling",
										parent = elem.parentNode,
										name = ofType && elem.nodeName.toLowerCase(),
										useCache = !xml && !ofType;
									if (parent) {
										if (simple) {
											while (dir) {
												node = elem;
												while ((node = node[dir])) {
													if (
														ofType
															? node.nodeName.toLowerCase() === name
															: node.nodeType === 1
													) {
														return false;
													}
												}
												start = dir =
													type === "only" && !start && "nextSibling";
											}
											return true;
										}
										start = [forward ? parent.firstChild : parent.lastChild];
										if (forward && useCache) {
											outerCache = parent[expando] || (parent[expando] = {});
											cache = outerCache[type] || [];
											nodeIndex = cache[0] === dirruns && cache[1];
											diff = cache[0] === dirruns && cache[2];
											node = nodeIndex && parent.childNodes[nodeIndex];
											while (
												(node =
													(++nodeIndex && node && node[dir]) ||
													(diff = nodeIndex = 0) ||
													start.pop())
											) {
												if (node.nodeType === 1 && ++diff && node === elem) {
													outerCache[type] = [dirruns, nodeIndex, diff];
													break;
												}
											}
										} else if (
											useCache &&
											(cache = (elem[expando] || (elem[expando] = {}))[type]) &&
											cache[0] === dirruns
										) {
											diff = cache[1];
										} else {
											while (
												(node =
													(++nodeIndex && node && node[dir]) ||
													(diff = nodeIndex = 0) ||
													start.pop())
											) {
												if (
													(ofType
														? node.nodeName.toLowerCase() === name
														: node.nodeType === 1) &&
													++diff
												) {
													if (useCache) {
														(node[expando] || (node[expando] = {}))[type] = [
															dirruns,
															diff,
														];
													}
													if (node === elem) {
														break;
													}
												}
											}
										}
										diff -= last;
										return (
											diff === first ||
											(diff % first === 0 && diff / first >= 0)
										);
									}
							  };
					},
					PSEUDO: function (pseudo, argument) {
						var args,
							fn =
								Expr.pseudos[pseudo] ||
								Expr.setFilters[pseudo.toLowerCase()] ||
								Sizzle.error("unsupported pseudo: " + pseudo);
						if (fn[expando]) {
							return fn(argument);
						}
						if (fn.length > 1) {
							args = [pseudo, pseudo, "", argument];
							return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())
								? markFunction(function (seed, matches) {
										var idx,
											matched = fn(seed, argument),
											i = matched.length;
										while (i--) {
											idx = indexOf.call(seed, matched[i]);
											seed[idx] = !(matches[idx] = matched[i]);
										}
								  })
								: function (elem) {
										return fn(elem, 0, args);
								  };
						}
						return fn;
					},
				},
				pseudos: {
					not: markFunction(function (selector) {
						var input = [],
							results = [],
							matcher = compile(selector.replace(rtrim, "$1"));
						return matcher[expando]
							? markFunction(function (seed, matches, context, xml) {
									var elem,
										unmatched = matcher(seed, null, xml, []),
										i = seed.length;
									while (i--) {
										if ((elem = unmatched[i])) {
											seed[i] = !(matches[i] = elem);
										}
									}
							  })
							: function (elem, context, xml) {
									input[0] = elem;
									matcher(input, null, xml, results);
									return !results.pop();
							  };
					}),
					has: markFunction(function (selector) {
						return function (elem) {
							return Sizzle(selector, elem).length > 0;
						};
					}),
					contains: markFunction(function (text) {
						return function (elem) {
							return (
								(elem.textContent || elem.innerText || getText(elem)).indexOf(
									text
								) > -1
							);
						};
					}),
					lang: markFunction(function (lang) {
						if (!ridentifier.test(lang || "")) {
							Sizzle.error("unsupported lang: " + lang);
						}
						lang = lang.replace(runescape, funescape).toLowerCase();
						return function (elem) {
							var elemLang;
							do {
								if (
									(elemLang = documentIsHTML
										? elem.lang
										: elem.getAttribute("xml:lang") ||
										  elem.getAttribute("lang"))
								) {
									elemLang = elemLang.toLowerCase();
									return (
										elemLang === lang || elemLang.indexOf(lang + "-") === 0
									);
								}
							} while ((elem = elem.parentNode) && elem.nodeType === 1);
							return false;
						};
					}),
					target: function (elem) {
						var hash = window.location && window.location.hash;
						return hash && hash.slice(1) === elem.id;
					},
					root: function (elem) {
						return elem === docElem;
					},
					focus: function (elem) {
						return (
							elem === document.activeElement &&
							(!document.hasFocus || document.hasFocus()) &&
							!!(elem.type || elem.href || ~elem.tabIndex)
						);
					},
					enabled: function (elem) {
						return elem.disabled === false;
					},
					disabled: function (elem) {
						return elem.disabled === true;
					},
					checked: function (elem) {
						var nodeName = elem.nodeName.toLowerCase();
						return (
							(nodeName === "input" && !!elem.checked) ||
							(nodeName === "option" && !!elem.selected)
						);
					},
					selected: function (elem) {
						if (elem.parentNode) {
							elem.parentNode.selectedIndex;
						}
						return elem.selected === true;
					},
					empty: function (elem) {
						for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
							if (elem.nodeType < 6) {
								return false;
							}
						}
						return true;
					},
					parent: function (elem) {
						return !Expr.pseudos["empty"](elem);
					},
					header: function (elem) {
						return rheader.test(elem.nodeName);
					},
					input: function (elem) {
						return rinputs.test(elem.nodeName);
					},
					button: function (elem) {
						var name = elem.nodeName.toLowerCase();
						return (
							(name === "input" && elem.type === "button") || name === "button"
						);
					},
					text: function (elem) {
						var attr;
						return (
							elem.nodeName.toLowerCase() === "input" &&
							elem.type === "text" &&
							((attr = elem.getAttribute("type")) == null ||
								attr.toLowerCase() === "text")
						);
					},
					first: createPositionalPseudo(function () {
						return [0];
					}),
					last: createPositionalPseudo(function (matchIndexes, length) {
						return [length - 1];
					}),
					eq: createPositionalPseudo(function (matchIndexes, length, argument) {
						return [argument < 0 ? argument + length : argument];
					}),
					even: createPositionalPseudo(function (matchIndexes, length) {
						var i = 0;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					odd: createPositionalPseudo(function (matchIndexes, length) {
						var i = 1;
						for (; i < length; i += 2) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					lt: createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; --i >= 0; ) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
					gt: createPositionalPseudo(function (matchIndexes, length, argument) {
						var i = argument < 0 ? argument + length : argument;
						for (; ++i < length; ) {
							matchIndexes.push(i);
						}
						return matchIndexes;
					}),
				},
			};
			Expr.pseudos["nth"] = Expr.pseudos["eq"];
			for (i in {
				radio: true,
				checkbox: true,
				file: true,
				password: true,
				image: true,
			}) {
				Expr.pseudos[i] = createInputPseudo(i);
			}
			for (i in {submit: true, reset: true}) {
				Expr.pseudos[i] = createButtonPseudo(i);
			}
			function setFilters() {}
			setFilters.prototype = Expr.filters = Expr.pseudos;
			Expr.setFilters = new setFilters();
			function tokenize(selector, parseOnly) {
				var matched,
					match,
					tokens,
					type,
					soFar,
					groups,
					preFilters,
					cached = tokenCache[selector + " "];
				if (cached) {
					return parseOnly ? 0 : cached.slice(0);
				}
				soFar = selector;
				groups = [];
				preFilters = Expr.preFilter;
				while (soFar) {
					if (!matched || (match = rcomma.exec(soFar))) {
						if (match) {
							soFar = soFar.slice(match[0].length) || soFar;
						}
						groups.push((tokens = []));
					}
					matched = false;
					if ((match = rcombinators.exec(soFar))) {
						matched = match.shift();
						tokens.push({value: matched, type: match[0].replace(rtrim, " ")});
						soFar = soFar.slice(matched.length);
					}
					for (type in Expr.filter) {
						if (
							(match = matchExpr[type].exec(soFar)) &&
							(!preFilters[type] || (match = preFilters[type](match)))
						) {
							matched = match.shift();
							tokens.push({value: matched, type: type, matches: match});
							soFar = soFar.slice(matched.length);
						}
					}
					if (!matched) {
						break;
					}
				}
				return parseOnly
					? soFar.length
					: soFar
					? Sizzle.error(selector)
					: tokenCache(selector, groups).slice(0);
			}
			function toSelector(tokens) {
				var i = 0,
					len = tokens.length,
					selector = "";
				for (; i < len; i++) {
					selector += tokens[i].value;
				}
				return selector;
			}
			function addCombinator(matcher, combinator, base) {
				var dir = combinator.dir,
					checkNonElements = base && dir === "parentNode",
					doneName = done++;
				return combinator.first
					? function (elem, context, xml) {
							while ((elem = elem[dir])) {
								if (elem.nodeType === 1 || checkNonElements) {
									return matcher(elem, context, xml);
								}
							}
					  }
					: function (elem, context, xml) {
							var oldCache,
								outerCache,
								newCache = [dirruns, doneName];
							if (xml) {
								while ((elem = elem[dir])) {
									if (elem.nodeType === 1 || checkNonElements) {
										if (matcher(elem, context, xml)) {
											return true;
										}
									}
								}
							} else {
								while ((elem = elem[dir])) {
									if (elem.nodeType === 1 || checkNonElements) {
										outerCache = elem[expando] || (elem[expando] = {});
										if (
											(oldCache = outerCache[dir]) &&
											oldCache[0] === dirruns &&
											oldCache[1] === doneName
										) {
											return (newCache[2] = oldCache[2]);
										} else {
											outerCache[dir] = newCache;
											if ((newCache[2] = matcher(elem, context, xml))) {
												return true;
											}
										}
									}
								}
							}
					  };
			}
			function elementMatcher(matchers) {
				return matchers.length > 1
					? function (elem, context, xml) {
							var i = matchers.length;
							while (i--) {
								if (!matchers[i](elem, context, xml)) {
									return false;
								}
							}
							return true;
					  }
					: matchers[0];
			}
			function condense(unmatched, map, filter, context, xml) {
				var elem,
					newUnmatched = [],
					i = 0,
					len = unmatched.length,
					mapped = map != null;
				for (; i < len; i++) {
					if ((elem = unmatched[i])) {
						if (!filter || filter(elem, context, xml)) {
							newUnmatched.push(elem);
							if (mapped) {
								map.push(i);
							}
						}
					}
				}
				return newUnmatched;
			}
			function setMatcher(
				preFilter,
				selector,
				matcher,
				postFilter,
				postFinder,
				postSelector
			) {
				if (postFilter && !postFilter[expando]) {
					postFilter = setMatcher(postFilter);
				}
				if (postFinder && !postFinder[expando]) {
					postFinder = setMatcher(postFinder, postSelector);
				}
				return markFunction(function (seed, results, context, xml) {
					var temp,
						i,
						elem,
						preMap = [],
						postMap = [],
						preexisting = results.length,
						elems =
							seed ||
							multipleContexts(
								selector || "*",
								context.nodeType ? [context] : context,
								[]
							),
						matcherIn =
							preFilter && (seed || !selector)
								? condense(elems, preMap, preFilter, context, xml)
								: elems,
						matcherOut = matcher
							? postFinder || (seed ? preFilter : preexisting || postFilter)
								? []
								: results
							: matcherIn;
					if (matcher) {
						matcher(matcherIn, matcherOut, context, xml);
					}
					if (postFilter) {
						temp = condense(matcherOut, postMap);
						postFilter(temp, [], context, xml);
						i = temp.length;
						while (i--) {
							if ((elem = temp[i])) {
								matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
							}
						}
					}
					if (seed) {
						if (postFinder || preFilter) {
							if (postFinder) {
								temp = [];
								i = matcherOut.length;
								while (i--) {
									if ((elem = matcherOut[i])) {
										temp.push((matcherIn[i] = elem));
									}
								}
								postFinder(null, (matcherOut = []), temp, xml);
							}
							i = matcherOut.length;
							while (i--) {
								if (
									(elem = matcherOut[i]) &&
									(temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) >
										-1
								) {
									seed[temp] = !(results[temp] = elem);
								}
							}
						}
					} else {
						matcherOut = condense(
							matcherOut === results
								? matcherOut.splice(preexisting, matcherOut.length)
								: matcherOut
						);
						if (postFinder) {
							postFinder(null, results, matcherOut, xml);
						} else {
							push.apply(results, matcherOut);
						}
					}
				});
			}
			function matcherFromTokens(tokens) {
				var checkContext,
					matcher,
					j,
					len = tokens.length,
					leadingRelative = Expr.relative[tokens[0].type],
					implicitRelative = leadingRelative || Expr.relative[" "],
					i = leadingRelative ? 1 : 0,
					matchContext = addCombinator(
						function (elem) {
							return elem === checkContext;
						},
						implicitRelative,
						true
					),
					matchAnyContext = addCombinator(
						function (elem) {
							return indexOf.call(checkContext, elem) > -1;
						},
						implicitRelative,
						true
					),
					matchers = [
						function (elem, context, xml) {
							return (
								(!leadingRelative && (xml || context !== outermostContext)) ||
								((checkContext = context).nodeType
									? matchContext(elem, context, xml)
									: matchAnyContext(elem, context, xml))
							);
						},
					];
				for (; i < len; i++) {
					if ((matcher = Expr.relative[tokens[i].type])) {
						matchers = [addCombinator(elementMatcher(matchers), matcher)];
					} else {
						matcher = Expr.filter[tokens[i].type].apply(
							null,
							tokens[i].matches
						);
						if (matcher[expando]) {
							j = ++i;
							for (; j < len; j++) {
								if (Expr.relative[tokens[j].type]) {
									break;
								}
							}
							return setMatcher(
								i > 1 && elementMatcher(matchers),
								i > 1 &&
									toSelector(
										tokens
											.slice(0, i - 1)
											.concat({value: tokens[i - 2].type === " " ? "*" : ""})
									).replace(rtrim, "$1"),
								matcher,
								i < j && matcherFromTokens(tokens.slice(i, j)),
								j < len && matcherFromTokens((tokens = tokens.slice(j))),
								j < len && toSelector(tokens)
							);
						}
						matchers.push(matcher);
					}
				}
				return elementMatcher(matchers);
			}
			function matcherFromGroupMatchers(elementMatchers, setMatchers) {
				var bySet = setMatchers.length > 0,
					byElement = elementMatchers.length > 0,
					superMatcher = function (seed, context, xml, results, outermost) {
						var elem,
							j,
							matcher,
							matchedCount = 0,
							i = "0",
							unmatched = seed && [],
							setMatched = [],
							contextBackup = outermostContext,
							elems = seed || (byElement && Expr.find["TAG"]("*", outermost)),
							dirrunsUnique = (dirruns +=
								contextBackup == null ? 1 : Math.random() || 0.1),
							len = elems.length;
						if (outermost) {
							outermostContext = context !== document && context;
						}
						for (; i !== len && (elem = elems[i]) != null; i++) {
							if (byElement && elem) {
								j = 0;
								while ((matcher = elementMatchers[j++])) {
									if (matcher(elem, context, xml)) {
										results.push(elem);
										break;
									}
								}
								if (outermost) {
									dirruns = dirrunsUnique;
								}
							}
							if (bySet) {
								if ((elem = !matcher && elem)) {
									matchedCount--;
								}
								if (seed) {
									unmatched.push(elem);
								}
							}
						}
						matchedCount += i;
						if (bySet && i !== matchedCount) {
							j = 0;
							while ((matcher = setMatchers[j++])) {
								matcher(unmatched, setMatched, context, xml);
							}
							if (seed) {
								if (matchedCount > 0) {
									while (i--) {
										if (!(unmatched[i] || setMatched[i])) {
											setMatched[i] = pop.call(results);
										}
									}
								}
								setMatched = condense(setMatched);
							}
							push.apply(results, setMatched);
							if (
								outermost &&
								!seed &&
								setMatched.length > 0 &&
								matchedCount + setMatchers.length > 1
							) {
								Sizzle.uniqueSort(results);
							}
						}
						if (outermost) {
							dirruns = dirrunsUnique;
							outermostContext = contextBackup;
						}
						return unmatched;
					};
				return bySet ? markFunction(superMatcher) : superMatcher;
			}
			compile = Sizzle.compile = function (selector, group) {
				var i,
					setMatchers = [],
					elementMatchers = [],
					cached = compilerCache[selector + " "];
				if (!cached) {
					if (!group) {
						group = tokenize(selector);
					}
					i = group.length;
					while (i--) {
						cached = matcherFromTokens(group[i]);
						if (cached[expando]) {
							setMatchers.push(cached);
						} else {
							elementMatchers.push(cached);
						}
					}
					cached = compilerCache(
						selector,
						matcherFromGroupMatchers(elementMatchers, setMatchers)
					);
				}
				return cached;
			};
			function multipleContexts(selector, contexts, results) {
				var i = 0,
					len = contexts.length;
				for (; i < len; i++) {
					Sizzle(selector, contexts[i], results);
				}
				return results;
			}
			function select(selector, context, results, seed) {
				var i,
					tokens,
					token,
					type,
					find,
					match = tokenize(selector);
				if (!seed) {
					if (match.length === 1) {
						tokens = match[0] = match[0].slice(0);
						if (
							tokens.length > 2 &&
							(token = tokens[0]).type === "ID" &&
							support.getById &&
							context.nodeType === 9 &&
							documentIsHTML &&
							Expr.relative[tokens[1].type]
						) {
							context = (Expr.find["ID"](
								token.matches[0].replace(runescape, funescape),
								context
							) || [])[0];
							if (!context) {
								return results;
							}
							selector = selector.slice(tokens.shift().value.length);
						}
						i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
						while (i--) {
							token = tokens[i];
							if (Expr.relative[(type = token.type)]) {
								break;
							}
							if ((find = Expr.find[type])) {
								if (
									(seed = find(
										token.matches[0].replace(runescape, funescape),
										(rsibling.test(tokens[0].type) &&
											testContext(context.parentNode)) ||
											context
									))
								) {
									tokens.splice(i, 1);
									selector = seed.length && toSelector(tokens);
									if (!selector) {
										push.apply(results, seed);
										return results;
									}
									break;
								}
							}
						}
					}
				}
				compile(selector, match)(
					seed,
					context,
					!documentIsHTML,
					results,
					(rsibling.test(selector) && testContext(context.parentNode)) ||
						context
				);
				return results;
			}
			support.sortStable =
				expando.split("").sort(sortOrder).join("") === expando;
			support.detectDuplicates = !!hasDuplicate;
			setDocument();
			support.sortDetached = assert(function (div1) {
				return div1.compareDocumentPosition(document.createElement("div")) & 1;
			});
			if (
				!assert(function (div) {
					div.innerHTML = "<a href='#'></a>";
					return div.firstChild.getAttribute("href") === "#";
				})
			) {
				addHandle("type|href|height|width", function (elem, name, isXML) {
					if (!isXML) {
						return elem.getAttribute(
							name,
							name.toLowerCase() === "type" ? 1 : 2
						);
					}
				});
			}
			if (
				!support.attributes ||
				!assert(function (div) {
					div.innerHTML = "<input/>";
					div.firstChild.setAttribute("value", "");
					return div.firstChild.getAttribute("value") === "";
				})
			) {
				addHandle("value", function (elem, name, isXML) {
					if (!isXML && elem.nodeName.toLowerCase() === "input") {
						return elem.defaultValue;
					}
				});
			}
			if (
				!assert(function (div) {
					return div.getAttribute("disabled") == null;
				})
			) {
				addHandle(booleans, function (elem, name, isXML) {
					var val;
					if (!isXML) {
						return elem[name] === true
							? name.toLowerCase()
							: (val = elem.getAttributeNode(name)) && val.specified
							? val.value
							: null;
					}
				});
			}
			return Sizzle;
		})(window);
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	var rneedsContext = jQuery.expr.match.needsContext;
	var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
	var risSimple = /^.[^:#\[\.,]*$/;
	function winnow(elements, qualifier, not) {
		if (jQuery.isFunction(qualifier)) {
			return jQuery.grep(elements, function (elem, i) {
				return !!qualifier.call(elem, i, elem) !== not;
			});
		}
		if (qualifier.nodeType) {
			return jQuery.grep(elements, function (elem) {
				return (elem === qualifier) !== not;
			});
		}
		if (typeof qualifier === "string") {
			if (risSimple.test(qualifier)) {
				return jQuery.filter(qualifier, elements, not);
			}
			qualifier = jQuery.filter(qualifier, elements);
		}
		return jQuery.grep(elements, function (elem) {
			return jQuery.inArray(elem, qualifier) >= 0 !== not;
		});
	}
	jQuery.filter = function (expr, elems, not) {
		var elem = elems[0];
		if (not) {
			expr = ":not(" + expr + ")";
		}
		return elems.length === 1 && elem.nodeType === 1
			? jQuery.find.matchesSelector(elem, expr)
				? [elem]
				: []
			: jQuery.find.matches(
					expr,
					jQuery.grep(elems, function (elem) {
						return elem.nodeType === 1;
					})
			  );
	};
	jQuery.fn.extend({
		find: function (selector) {
			var i,
				ret = [],
				self = this,
				len = self.length;
			if (typeof selector !== "string") {
				return this.pushStack(
					jQuery(selector).filter(function () {
						for (i = 0; i < len; i++) {
							if (jQuery.contains(self[i], this)) {
								return true;
							}
						}
					})
				);
			}
			for (i = 0; i < len; i++) {
				jQuery.find(selector, self[i], ret);
			}
			ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function (selector) {
			return this.pushStack(winnow(this, selector || [], false));
		},
		not: function (selector) {
			return this.pushStack(winnow(this, selector || [], true));
		},
		is: function (selector) {
			return !!winnow(
				this,
				typeof selector === "string" && rneedsContext.test(selector)
					? jQuery(selector)
					: selector || [],
				false
			).length;
		},
	});
	var rootjQuery,
		document = window.document,
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
		init = (jQuery.fn.init = function (selector, context) {
			var match, elem;
			if (!selector) {
				return this;
			}
			if (typeof selector === "string") {
				if (
					selector.charAt(0) === "<" &&
					selector.charAt(selector.length - 1) === ">" &&
					selector.length >= 3
				) {
					match = [null, selector, null];
				} else {
					match = rquickExpr.exec(selector);
				}
				if (match && (match[1] || !context)) {
					if (match[1]) {
						context = context instanceof jQuery ? context[0] : context;
						jQuery.merge(
							this,
							jQuery.parseHTML(
								match[1],
								context && context.nodeType
									? context.ownerDocument || context
									: document,
								true
							)
						);
						if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
							for (match in context) {
								if (jQuery.isFunction(this[match])) {
									this[match](context[match]);
								} else {
									this.attr(match, context[match]);
								}
							}
						}
						return this;
					} else {
						elem = document.getElementById(match[2]);
						if (elem && elem.parentNode) {
							if (elem.id !== match[2]) {
								return rootjQuery.find(selector);
							}
							this.length = 1;
							this[0] = elem;
						}
						this.context = document;
						this.selector = selector;
						return this;
					}
				} else if (!context || context.jquery) {
					return (context || rootjQuery).find(selector);
				} else {
					return this.constructor(context).find(selector);
				}
			} else if (selector.nodeType) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			} else if (jQuery.isFunction(selector)) {
				return typeof rootjQuery.ready !== "undefined"
					? rootjQuery.ready(selector)
					: selector(jQuery);
			}
			if (selector.selector !== undefined) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
			return jQuery.makeArray(selector, this);
		});
	init.prototype = jQuery.fn;
	rootjQuery = jQuery(document);
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		guaranteedUnique = {children: true, contents: true, next: true, prev: true};
	jQuery.extend({
		dir: function (elem, dir, until) {
			var matched = [],
				cur = elem[dir];
			while (
				cur &&
				cur.nodeType !== 9 &&
				(until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))
			) {
				if (cur.nodeType === 1) {
					matched.push(cur);
				}
				cur = cur[dir];
			}
			return matched;
		},
		sibling: function (n, elem) {
			var r = [];
			for (; n; n = n.nextSibling) {
				if (n.nodeType === 1 && n !== elem) {
					r.push(n);
				}
			}
			return r;
		},
	});
	jQuery.fn.extend({
		has: function (target) {
			var i,
				targets = jQuery(target, this),
				len = targets.length;
			return this.filter(function () {
				for (i = 0; i < len; i++) {
					if (jQuery.contains(this, targets[i])) {
						return true;
					}
				}
			});
		},
		closest: function (selectors, context) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos =
					rneedsContext.test(selectors) || typeof selectors !== "string"
						? jQuery(selectors, context || this.context)
						: 0;
			for (; i < l; i++) {
				for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
					if (
						cur.nodeType < 11 &&
						(pos
							? pos.index(cur) > -1
							: cur.nodeType === 1 &&
							  jQuery.find.matchesSelector(cur, selectors))
					) {
						matched.push(cur);
						break;
					}
				}
			}
			return this.pushStack(
				matched.length > 1 ? jQuery.unique(matched) : matched
			);
		},
		index: function (elem) {
			if (!elem) {
				return this[0] && this[0].parentNode
					? this.first().prevAll().length
					: -1;
			}
			if (typeof elem === "string") {
				return jQuery.inArray(this[0], jQuery(elem));
			}
			return jQuery.inArray(elem.jquery ? elem[0] : elem, this);
		},
		add: function (selector, context) {
			return this.pushStack(
				jQuery.unique(jQuery.merge(this.get(), jQuery(selector, context)))
			);
		},
		addBack: function (selector) {
			return this.add(
				selector == null ? this.prevObject : this.prevObject.filter(selector)
			);
		},
	});
	function sibling(cur, dir) {
		do {
			cur = cur[dir];
		} while (cur && cur.nodeType !== 1);
		return cur;
	}
	jQuery.each(
		{
			parent: function (elem) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function (elem) {
				return jQuery.dir(elem, "parentNode");
			},
			parentsUntil: function (elem, i, until) {
				return jQuery.dir(elem, "parentNode", until);
			},
			next: function (elem) {
				return sibling(elem, "nextSibling");
			},
			prev: function (elem) {
				return sibling(elem, "previousSibling");
			},
			nextAll: function (elem) {
				return jQuery.dir(elem, "nextSibling");
			},
			prevAll: function (elem) {
				return jQuery.dir(elem, "previousSibling");
			},
			nextUntil: function (elem, i, until) {
				return jQuery.dir(elem, "nextSibling", until);
			},
			prevUntil: function (elem, i, until) {
				return jQuery.dir(elem, "previousSibling", until);
			},
			siblings: function (elem) {
				return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
			},
			children: function (elem) {
				return jQuery.sibling(elem.firstChild);
			},
			contents: function (elem) {
				return jQuery.nodeName(elem, "iframe")
					? elem.contentDocument || elem.contentWindow.document
					: jQuery.merge([], elem.childNodes);
			},
		},
		function (name, fn) {
			jQuery.fn[name] = function (until, selector) {
				var ret = jQuery.map(this, fn, until);
				if (name.slice(-5) !== "Until") {
					selector = until;
				}
				if (selector && typeof selector === "string") {
					ret = jQuery.filter(selector, ret);
				}
				if (this.length > 1) {
					if (!guaranteedUnique[name]) {
						ret = jQuery.unique(ret);
					}
					if (rparentsprev.test(name)) {
						ret = ret.reverse();
					}
				}
				return this.pushStack(ret);
			};
		}
	);
	var rnotwhite = /\S+/g;
	var optionsCache = {};
	function createOptions(options) {
		var object = (optionsCache[options] = {});
		jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
			object[flag] = true;
		});
		return object;
	}
	jQuery.Callbacks = function (options) {
		options =
			typeof options === "string"
				? optionsCache[options] || createOptions(options)
				: jQuery.extend({}, options);
		var firing,
			memory,
			fired,
			firingLength,
			firingIndex,
			firingStart,
			list = [],
			stack = !options.once && [],
			fire = function (data) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for (; list && firingIndex < firingLength; firingIndex++) {
					if (
						list[firingIndex].apply(data[0], data[1]) === false &&
						options.stopOnFalse
					) {
						memory = false;
						break;
					}
				}
				firing = false;
				if (list) {
					if (stack) {
						if (stack.length) {
							fire(stack.shift());
						}
					} else if (memory) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			self = {
				add: function () {
					if (list) {
						var start = list.length;
						(function add(args) {
							jQuery.each(args, function (_, arg) {
								var type = jQuery.type(arg);
								if (type === "function") {
									if (!options.unique || !self.has(arg)) {
										list.push(arg);
									}
								} else if (arg && arg.length && type !== "string") {
									add(arg);
								}
							});
						})(arguments);
						if (firing) {
							firingLength = list.length;
						} else if (memory) {
							firingStart = start;
							fire(memory);
						}
					}
					return this;
				},
				remove: function () {
					if (list) {
						jQuery.each(arguments, function (_, arg) {
							var index;
							while ((index = jQuery.inArray(arg, list, index)) > -1) {
								list.splice(index, 1);
								if (firing) {
									if (index <= firingLength) {
										firingLength--;
									}
									if (index <= firingIndex) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				has: function (fn) {
					return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
				},
				empty: function () {
					list = [];
					firingLength = 0;
					return this;
				},
				disable: function () {
					list = stack = memory = undefined;
					return this;
				},
				disabled: function () {
					return !list;
				},
				lock: function () {
					stack = undefined;
					if (!memory) {
						self.disable();
					}
					return this;
				},
				locked: function () {
					return !stack;
				},
				fireWith: function (context, args) {
					if (list && (!fired || stack)) {
						args = args || [];
						args = [context, args.slice ? args.slice() : args];
						if (firing) {
							stack.push(args);
						} else {
							fire(args);
						}
					}
					return this;
				},
				fire: function () {
					self.fireWith(this, arguments);
					return this;
				},
				fired: function () {
					return !!fired;
				},
			};
		return self;
	};
	jQuery.extend({
		Deferred: function (func) {
			var tuples = [
					["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
					["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
					["notify", "progress", jQuery.Callbacks("memory")],
				],
				state = "pending",
				promise = {
					state: function () {
						return state;
					},
					always: function () {
						deferred.done(arguments).fail(arguments);
						return this;
					},
					then: function () {
						var fns = arguments;
						return jQuery
							.Deferred(function (newDefer) {
								jQuery.each(tuples, function (i, tuple) {
									var fn = jQuery.isFunction(fns[i]) && fns[i];
									deferred[tuple[1]](function () {
										var returned = fn && fn.apply(this, arguments);
										if (returned && jQuery.isFunction(returned.promise)) {
											returned
												.promise()
												.done(newDefer.resolve)
												.fail(newDefer.reject)
												.progress(newDefer.notify);
										} else {
											newDefer[tuple[0] + "With"](
												this === promise ? newDefer.promise() : this,
												fn ? [returned] : arguments
											);
										}
									});
								});
								fns = null;
							})
							.promise();
					},
					promise: function (obj) {
						return obj != null ? jQuery.extend(obj, promise) : promise;
					},
				},
				deferred = {};
			promise.pipe = promise.then;
			jQuery.each(tuples, function (i, tuple) {
				var list = tuple[2],
					stateString = tuple[3];
				promise[tuple[1]] = list.add;
				if (stateString) {
					list.add(
						function () {
							state = stateString;
						},
						tuples[i ^ 1][2].disable,
						tuples[2][2].lock
					);
				}
				deferred[tuple[0]] = function () {
					deferred[tuple[0] + "With"](
						this === deferred ? promise : this,
						arguments
					);
					return this;
				};
				deferred[tuple[0] + "With"] = list.fireWith;
			});
			promise.promise(deferred);
			if (func) {
				func.call(deferred, deferred);
			}
			return deferred;
		},
		when: function (subordinate) {
			var i = 0,
				resolveValues = slice.call(arguments),
				length = resolveValues.length,
				remaining =
					length !== 1 ||
					(subordinate && jQuery.isFunction(subordinate.promise))
						? length
						: 0,
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
				updateFunc = function (i, contexts, values) {
					return function (value) {
						contexts[i] = this;
						values[i] = arguments.length > 1 ? slice.call(arguments) : value;
						if (values === progressValues) {
							deferred.notifyWith(contexts, values);
						} else if (!--remaining) {
							deferred.resolveWith(contexts, values);
						}
					};
				},
				progressValues,
				progressContexts,
				resolveContexts;
			if (length > 1) {
				progressValues = new Array(length);
				progressContexts = new Array(length);
				resolveContexts = new Array(length);
				for (; i < length; i++) {
					if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
						resolveValues[i]
							.promise()
							.done(updateFunc(i, resolveContexts, resolveValues))
							.fail(deferred.reject)
							.progress(updateFunc(i, progressContexts, progressValues));
					} else {
						--remaining;
					}
				}
			}
			if (!remaining) {
				deferred.resolveWith(resolveContexts, resolveValues);
			}
			return deferred.promise();
		},
	});
	var readyList;
	jQuery.fn.ready = function (fn) {
		jQuery.ready.promise().done(fn);
		return this;
	};
	jQuery.extend({
		isReady: false,
		readyWait: 1,
		holdReady: function (hold) {
			if (hold) {
				jQuery.readyWait++;
			} else {
				jQuery.ready(true);
			}
		},
		ready: function (wait) {
			if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
				return;
			}
			if (!document.body) {
				return setTimeout(jQuery.ready);
			}
			jQuery.isReady = true;
			if (wait !== true && --jQuery.readyWait > 0) {
				return;
			}
			readyList.resolveWith(document, [jQuery]);
			if (jQuery.fn.trigger) {
				jQuery(document).trigger("ready").off("ready");
			}
		},
	});
	function detach() {
		if (document.addEventListener) {
			document.removeEventListener("DOMContentLoaded", completed, false);
			window.removeEventListener("load", completed, false);
		} else {
			document.detachEvent("onreadystatechange", completed);
			window.detachEvent("onload", completed);
		}
	}
	function completed() {
		if (
			document.addEventListener ||
			event.type === "load" ||
			document.readyState === "complete"
		) {
			detach();
			jQuery.ready();
		}
	}
	jQuery.ready.promise = function (obj) {
		if (!readyList) {
			readyList = jQuery.Deferred();
			if (document.readyState === "complete") {
				setTimeout(jQuery.ready);
			} else if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", completed, false);
				window.addEventListener("load", completed, false);
			} else {
				document.attachEvent("onreadystatechange", completed);
				window.attachEvent("onload", completed);
				var top = false;
				try {
					top = window.frameElement == null && document.documentElement;
				} catch (e) {}
				if (top && top.doScroll) {
					(function doScrollCheck() {
						if (!jQuery.isReady) {
							try {
								top.doScroll("left");
							} catch (e) {
								return setTimeout(doScrollCheck, 50);
							}
							detach();
							jQuery.ready();
						}
					})();
				}
			}
		}
		return readyList.promise(obj);
	};
	var strundefined = typeof undefined;
	var i;
	for (i in jQuery(support)) {
		break;
	}
	support.ownLast = i !== "0";
	support.inlineBlockNeedsLayout = false;
	jQuery(function () {
		var container,
			div,
			body = document.getElementsByTagName("body")[0];
		if (!body) {
			return;
		}
		container = document.createElement("div");
		container.style.cssText =
			"border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
		div = document.createElement("div");
		body.appendChild(container).appendChild(div);
		if (typeof div.style.zoom !== strundefined) {
			div.style.cssText =
				"border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";
			if ((support.inlineBlockNeedsLayout = div.offsetWidth === 3)) {
				body.style.zoom = 1;
			}
		}
		body.removeChild(container);
		container = div = null;
	});
	(function () {
		var div = document.createElement("div");
		if (support.deleteExpando == null) {
			support.deleteExpando = true;
			try {
				delete div.test;
			} catch (e) {
				support.deleteExpando = false;
			}
		}
		div = null;
	})();
	jQuery.acceptData = function (elem) {
		var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
			nodeType = +elem.nodeType || 1;
		return nodeType !== 1 && nodeType !== 9
			? false
			: !noData || (noData !== true && elem.getAttribute("classid") === noData);
	};
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	function dataAttr(elem, key, data) {
		if (data === undefined && elem.nodeType === 1) {
			var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();
			data = elem.getAttribute(name);
			if (typeof data === "string") {
				try {
					data =
						data === "true"
							? true
							: data === "false"
							? false
							: data === "null"
							? null
							: +data + "" === data
							? +data
							: rbrace.test(data)
							? jQuery.parseJSON(data)
							: data;
				} catch (e) {}
				jQuery.data(elem, key, data);
			} else {
				data = undefined;
			}
		}
		return data;
	}
	function isEmptyDataObject(obj) {
		var name;
		for (name in obj) {
			if (name === "data" && jQuery.isEmptyObject(obj[name])) {
				continue;
			}
			if (name !== "toJSON") {
				return false;
			}
		}
		return true;
	}
	function internalData(elem, name, data, pvt) {
		if (!jQuery.acceptData(elem)) {
			return;
		}
		var ret,
			thisCache,
			internalKey = jQuery.expando,
			isNode = elem.nodeType,
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
		if (
			(!id || !cache[id] || (!pvt && !cache[id].data)) &&
			data === undefined &&
			typeof name === "string"
		) {
			return;
		}
		if (!id) {
			if (isNode) {
				id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
			} else {
				id = internalKey;
			}
		}
		if (!cache[id]) {
			cache[id] = isNode ? {} : {toJSON: jQuery.noop};
		}
		if (typeof name === "object" || typeof name === "function") {
			if (pvt) {
				cache[id] = jQuery.extend(cache[id], name);
			} else {
				cache[id].data = jQuery.extend(cache[id].data, name);
			}
		}
		thisCache = cache[id];
		if (!pvt) {
			if (!thisCache.data) {
				thisCache.data = {};
			}
			thisCache = thisCache.data;
		}
		if (data !== undefined) {
			thisCache[jQuery.camelCase(name)] = data;
		}
		if (typeof name === "string") {
			ret = thisCache[name];
			if (ret == null) {
				ret = thisCache[jQuery.camelCase(name)];
			}
		} else {
			ret = thisCache;
		}
		return ret;
	}
	function internalRemoveData(elem, name, pvt) {
		if (!jQuery.acceptData(elem)) {
			return;
		}
		var thisCache,
			i,
			isNode = elem.nodeType,
			cache = isNode ? jQuery.cache : elem,
			id = isNode ? elem[jQuery.expando] : jQuery.expando;
		if (!cache[id]) {
			return;
		}
		if (name) {
			thisCache = pvt ? cache[id] : cache[id].data;
			if (thisCache) {
				if (!jQuery.isArray(name)) {
					if (name in thisCache) {
						name = [name];
					} else {
						name = jQuery.camelCase(name);
						if (name in thisCache) {
							name = [name];
						} else {
							name = name.split(" ");
						}
					}
				} else {
					name = name.concat(jQuery.map(name, jQuery.camelCase));
				}
				i = name.length;
				while (i--) {
					delete thisCache[name[i]];
				}
				if (
					pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)
				) {
					return;
				}
			}
		}
		if (!pvt) {
			delete cache[id].data;
			if (!isEmptyDataObject(cache[id])) {
				return;
			}
		}
		if (isNode) {
			jQuery.cleanData([elem], true);
		} else if (support.deleteExpando || cache != cache.window) {
			delete cache[id];
		} else {
			cache[id] = null;
		}
	}
	jQuery.extend({
		cache: {},
		noData: {
			"applet ": true,
			"embed ": true,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
		},
		hasData: function (elem) {
			elem = elem.nodeType
				? jQuery.cache[elem[jQuery.expando]]
				: elem[jQuery.expando];
			return !!elem && !isEmptyDataObject(elem);
		},
		data: function (elem, name, data) {
			return internalData(elem, name, data);
		},
		removeData: function (elem, name) {
			return internalRemoveData(elem, name);
		},
		_data: function (elem, name, data) {
			return internalData(elem, name, data, true);
		},
		_removeData: function (elem, name) {
			return internalRemoveData(elem, name, true);
		},
	});
	jQuery.fn.extend({
		data: function (key, value) {
			var i,
				name,
				data,
				elem = this[0],
				attrs = elem && elem.attributes;
			if (key === undefined) {
				if (this.length) {
					data = jQuery.data(elem);
					if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
						i = attrs.length;
						while (i--) {
							name = attrs[i].name;
							if (name.indexOf("data-") === 0) {
								name = jQuery.camelCase(name.slice(5));
								dataAttr(elem, name, data[name]);
							}
						}
						jQuery._data(elem, "parsedAttrs", true);
					}
				}
				return data;
			}
			if (typeof key === "object") {
				return this.each(function () {
					jQuery.data(this, key);
				});
			}
			return arguments.length > 1
				? this.each(function () {
						jQuery.data(this, key, value);
				  })
				: elem
				? dataAttr(elem, key, jQuery.data(elem, key))
				: undefined;
		},
		removeData: function (key) {
			return this.each(function () {
				jQuery.removeData(this, key);
			});
		},
	});
	jQuery.extend({
		queue: function (elem, type, data) {
			var queue;
			if (elem) {
				type = (type || "fx") + "queue";
				queue = jQuery._data(elem, type);
				if (data) {
					if (!queue || jQuery.isArray(data)) {
						queue = jQuery._data(elem, type, jQuery.makeArray(data));
					} else {
						queue.push(data);
					}
				}
				return queue || [];
			}
		},
		dequeue: function (elem, type) {
			type = type || "fx";
			var queue = jQuery.queue(elem, type),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks(elem, type),
				next = function () {
					jQuery.dequeue(elem, type);
				};
			if (fn === "inprogress") {
				fn = queue.shift();
				startLength--;
			}
			if (fn) {
				if (type === "fx") {
					queue.unshift("inprogress");
				}
				delete hooks.stop;
				fn.call(elem, next, hooks);
			}
			if (!startLength && hooks) {
				hooks.empty.fire();
			}
		},
		_queueHooks: function (elem, type) {
			var key = type + "queueHooks";
			return (
				jQuery._data(elem, key) ||
				jQuery._data(elem, key, {
					empty: jQuery.Callbacks("once memory").add(function () {
						jQuery._removeData(elem, type + "queue");
						jQuery._removeData(elem, key);
					}),
				})
			);
		},
	});
	jQuery.fn.extend({
		queue: function (type, data) {
			var setter = 2;
			if (typeof type !== "string") {
				data = type;
				type = "fx";
				setter--;
			}
			if (arguments.length < setter) {
				return jQuery.queue(this[0], type);
			}
			return data === undefined
				? this
				: this.each(function () {
						var queue = jQuery.queue(this, type, data);
						jQuery._queueHooks(this, type);
						if (type === "fx" && queue[0] !== "inprogress") {
							jQuery.dequeue(this, type);
						}
				  });
		},
		dequeue: function (type) {
			return this.each(function () {
				jQuery.dequeue(this, type);
			});
		},
		clearQueue: function (type) {
			return this.queue(type || "fx", []);
		},
		promise: function (type, obj) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function () {
					if (!--count) {
						defer.resolveWith(elements, [elements]);
					}
				};
			if (typeof type !== "string") {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
			while (i--) {
				tmp = jQuery._data(elements[i], type + "queueHooks");
				if (tmp && tmp.empty) {
					count++;
					tmp.empty.add(resolve);
				}
			}
			resolve();
			return defer.promise(obj);
		},
	});
	var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
	var cssExpand = ["Top", "Right", "Bottom", "Left"];
	var isHidden = function (elem, el) {
		elem = el || elem;
		return (
			jQuery.css(elem, "display") === "none" ||
			!jQuery.contains(elem.ownerDocument, elem)
		);
	};
	var access = (jQuery.access = function (
		elems,
		fn,
		key,
		value,
		chainable,
		emptyGet,
		raw
	) {
		var i = 0,
			length = elems.length,
			bulk = key == null;
		if (jQuery.type(key) === "object") {
			chainable = true;
			for (i in key) {
				jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
			}
		} else if (value !== undefined) {
			chainable = true;
			if (!jQuery.isFunction(value)) {
				raw = true;
			}
			if (bulk) {
				if (raw) {
					fn.call(elems, value);
					fn = null;
				} else {
					bulk = fn;
					fn = function (elem, key, value) {
						return bulk.call(jQuery(elem), value);
					};
				}
			}
			if (fn) {
				for (; i < length; i++) {
					fn(
						elems[i],
						key,
						raw ? value : value.call(elems[i], i, fn(elems[i], key))
					);
				}
			}
		}
		return chainable
			? elems
			: bulk
			? fn.call(elems)
			: length
			? fn(elems[0], key)
			: emptyGet;
	});
	var rcheckableType = /^(?:checkbox|radio)$/i;
	(function () {
		var fragment = document.createDocumentFragment(),
			div = document.createElement("div"),
			input = document.createElement("input");
		div.setAttribute("className", "t");
		div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";
		support.leadingWhitespace = div.firstChild.nodeType === 3;
		support.tbody = !div.getElementsByTagName("tbody").length;
		support.htmlSerialize = !!div.getElementsByTagName("link").length;
		support.html5Clone =
			document.createElement("nav").cloneNode(true).outerHTML !==
			"<:nav></:nav>";
		input.type = "checkbox";
		input.checked = true;
		fragment.appendChild(input);
		support.appendChecked = input.checked;
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
		fragment.appendChild(div);
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
		support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
		support.noCloneEvent = true;
		if (div.attachEvent) {
			div.attachEvent("onclick", function () {
				support.noCloneEvent = false;
			});
			div.cloneNode(true).click();
		}
		if (support.deleteExpando == null) {
			support.deleteExpando = true;
			try {
				delete div.test;
			} catch (e) {
				support.deleteExpando = false;
			}
		}
		fragment = div = input = null;
	})();
	(function () {
		var i,
			eventName,
			div = document.createElement("div");
		for (i in {submit: true, change: true, focusin: true}) {
			eventName = "on" + i;
			if (!(support[i + "Bubbles"] = eventName in window)) {
				div.setAttribute(eventName, "t");
				support[i + "Bubbles"] = div.attributes[eventName].expando === false;
			}
		}
		div = null;
	})();
	var rformElems = /^(?:input|select|textarea)$/i,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	function returnTrue() {
		return true;
	}
	function returnFalse() {
		return false;
	}
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch (err) {}
	}
	jQuery.event = {
		global: {},
		add: function (elem, types, handler, data, selector) {
			var tmp,
				events,
				t,
				handleObjIn,
				special,
				eventHandle,
				handleObj,
				handlers,
				type,
				namespaces,
				origType,
				elemData = jQuery._data(elem);
			if (!elemData) {
				return;
			}
			if (handler.handler) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
			if (!handler.guid) {
				handler.guid = jQuery.guid++;
			}
			if (!(events = elemData.events)) {
				events = elemData.events = {};
			}
			if (!(eventHandle = elemData.handle)) {
				eventHandle = elemData.handle = function (e) {
					return typeof jQuery !== strundefined &&
						(!e || jQuery.event.triggered !== e.type)
						? jQuery.event.dispatch.apply(eventHandle.elem, arguments)
						: undefined;
				};
				eventHandle.elem = elem;
			}
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					continue;
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				special = jQuery.event.special[type] || {};
				handleObj = jQuery.extend(
					{
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext:
							selector && jQuery.expr.match.needsContext.test(selector),
						namespace: namespaces.join("."),
					},
					handleObjIn
				);
				if (!(handlers = events[type])) {
					handlers = events[type] = [];
					handlers.delegateCount = 0;
					if (
						!special.setup ||
						special.setup.call(elem, data, namespaces, eventHandle) === false
					) {
						if (elem.addEventListener) {
							elem.addEventListener(type, eventHandle, false);
						} else if (elem.attachEvent) {
							elem.attachEvent("on" + type, eventHandle);
						}
					}
				}
				if (special.add) {
					special.add.call(elem, handleObj);
					if (!handleObj.handler.guid) {
						handleObj.handler.guid = handler.guid;
					}
				}
				if (selector) {
					handlers.splice(handlers.delegateCount++, 0, handleObj);
				} else {
					handlers.push(handleObj);
				}
				jQuery.event.global[type] = true;
			}
			elem = null;
		},
		remove: function (elem, types, handler, selector, mappedTypes) {
			var j,
				handleObj,
				tmp,
				origCount,
				t,
				events,
				special,
				handlers,
				type,
				namespaces,
				origType,
				elemData = jQuery.hasData(elem) && jQuery._data(elem);
			if (!elemData || !(events = elemData.events)) {
				return;
			}
			types = (types || "").match(rnotwhite) || [""];
			t = types.length;
			while (t--) {
				tmp = rtypenamespace.exec(types[t]) || [];
				type = origType = tmp[1];
				namespaces = (tmp[2] || "").split(".").sort();
				if (!type) {
					for (type in events) {
						jQuery.event.remove(elem, type + types[t], handler, selector, true);
					}
					continue;
				}
				special = jQuery.event.special[type] || {};
				type = (selector ? special.delegateType : special.bindType) || type;
				handlers = events[type] || [];
				tmp =
					tmp[2] &&
					new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
				origCount = j = handlers.length;
				while (j--) {
					handleObj = handlers[j];
					if (
						(mappedTypes || origType === handleObj.origType) &&
						(!handler || handler.guid === handleObj.guid) &&
						(!tmp || tmp.test(handleObj.namespace)) &&
						(!selector ||
							selector === handleObj.selector ||
							(selector === "**" && handleObj.selector))
					) {
						handlers.splice(j, 1);
						if (handleObj.selector) {
							handlers.delegateCount--;
						}
						if (special.remove) {
							special.remove.call(elem, handleObj);
						}
					}
				}
				if (origCount && !handlers.length) {
					if (
						!special.teardown ||
						special.teardown.call(elem, namespaces, elemData.handle) === false
					) {
						jQuery.removeEvent(elem, type, elemData.handle);
					}
					delete events[type];
				}
			}
			if (jQuery.isEmptyObject(events)) {
				delete elemData.handle;
				jQuery._removeData(elem, "events");
			}
		},
		trigger: function (event, data, elem, onlyHandlers) {
			var handle,
				ontype,
				cur,
				bubbleType,
				special,
				tmp,
				i,
				eventPath = [elem || document],
				type = hasOwn.call(event, "type") ? event.type : event,
				namespaces = hasOwn.call(event, "namespace")
					? event.namespace.split(".")
					: [];
			cur = tmp = elem = elem || document;
			if (elem.nodeType === 3 || elem.nodeType === 8) {
				return;
			}
			if (rfocusMorph.test(type + jQuery.event.triggered)) {
				return;
			}
			if (type.indexOf(".") >= 0) {
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
			event = event[jQuery.expando]
				? event
				: new jQuery.Event(type, typeof event === "object" && event);
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace
				? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)")
				: null;
			event.result = undefined;
			if (!event.target) {
				event.target = elem;
			}
			data = data == null ? [event] : jQuery.makeArray(data, [event]);
			special = jQuery.event.special[type] || {};
			if (
				!onlyHandlers &&
				special.trigger &&
				special.trigger.apply(elem, data) === false
			) {
				return;
			}
			if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
				bubbleType = special.delegateType || type;
				if (!rfocusMorph.test(bubbleType + type)) {
					cur = cur.parentNode;
				}
				for (; cur; cur = cur.parentNode) {
					eventPath.push(cur);
					tmp = cur;
				}
				if (tmp === (elem.ownerDocument || document)) {
					eventPath.push(tmp.defaultView || tmp.parentWindow || window);
				}
			}
			i = 0;
			while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
				event.type = i > 1 ? bubbleType : special.bindType || type;
				handle =
					(jQuery._data(cur, "events") || {})[event.type] &&
					jQuery._data(cur, "handle");
				if (handle) {
					handle.apply(cur, data);
				}
				handle = ontype && cur[ontype];
				if (handle && handle.apply && jQuery.acceptData(cur)) {
					event.result = handle.apply(cur, data);
					if (event.result === false) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
			if (!onlyHandlers && !event.isDefaultPrevented()) {
				if (
					(!special._default ||
						special._default.apply(eventPath.pop(), data) === false) &&
					jQuery.acceptData(elem)
				) {
					if (ontype && elem[type] && !jQuery.isWindow(elem)) {
						tmp = elem[ontype];
						if (tmp) {
							elem[ontype] = null;
						}
						jQuery.event.triggered = type;
						try {
							elem[type]();
						} catch (e) {}
						jQuery.event.triggered = undefined;
						if (tmp) {
							elem[ontype] = tmp;
						}
					}
				}
			}
			return event.result;
		},
		dispatch: function (event) {
			event = jQuery.event.fix(event);
			var i,
				ret,
				handleObj,
				matched,
				j,
				handlerQueue = [],
				args = slice.call(arguments),
				handlers = (jQuery._data(this, "events") || {})[event.type] || [],
				special = jQuery.event.special[event.type] || {};
			args[0] = event;
			event.delegateTarget = this;
			if (
				special.preDispatch &&
				special.preDispatch.call(this, event) === false
			) {
				return;
			}
			handlerQueue = jQuery.event.handlers.call(this, event, handlers);
			i = 0;
			while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
				event.currentTarget = matched.elem;
				j = 0;
				while (
					(handleObj = matched.handlers[j++]) &&
					!event.isImmediatePropagationStopped()
				) {
					if (
						!event.namespace_re ||
						event.namespace_re.test(handleObj.namespace)
					) {
						event.handleObj = handleObj;
						event.data = handleObj.data;
						ret = (
							(jQuery.event.special[handleObj.origType] || {}).handle ||
							handleObj.handler
						).apply(matched.elem, args);
						if (ret !== undefined) {
							if ((event.result = ret) === false) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
			if (special.postDispatch) {
				special.postDispatch.call(this, event);
			}
			return event.result;
		},
		handlers: function (event, handlers) {
			var sel,
				handleObj,
				matches,
				i,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
			if (
				delegateCount &&
				cur.nodeType &&
				(!event.button || event.type !== "click")
			) {
				for (; cur != this; cur = cur.parentNode || this) {
					if (
						cur.nodeType === 1 &&
						(cur.disabled !== true || event.type !== "click")
					) {
						matches = [];
						for (i = 0; i < delegateCount; i++) {
							handleObj = handlers[i];
							sel = handleObj.selector + " ";
							if (matches[sel] === undefined) {
								matches[sel] = handleObj.needsContext
									? jQuery(sel, this).index(cur) >= 0
									: jQuery.find(sel, this, null, [cur]).length;
							}
							if (matches[sel]) {
								matches.push(handleObj);
							}
						}
						if (matches.length) {
							handlerQueue.push({elem: cur, handlers: matches});
						}
					}
				}
			}
			if (delegateCount < handlers.length) {
				handlerQueue.push({
					elem: this,
					handlers: handlers.slice(delegateCount),
				});
			}
			return handlerQueue;
		},
		fix: function (event) {
			if (event[jQuery.expando]) {
				return event;
			}
			var i,
				prop,
				copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[type];
			if (!fixHook) {
				this.fixHooks[type] = fixHook = rmouseEvent.test(type)
					? this.mouseHooks
					: rkeyEvent.test(type)
					? this.keyHooks
					: {};
			}
			copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
			event = new jQuery.Event(originalEvent);
			i = copy.length;
			while (i--) {
				prop = copy[i];
				event[prop] = originalEvent[prop];
			}
			if (!event.target) {
				event.target = originalEvent.srcElement || document;
			}
			if (event.target.nodeType === 3) {
				event.target = event.target.parentNode;
			}
			event.metaKey = !!event.metaKey;
			return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
		},
		props:
			"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
				" "
			),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (event, original) {
				if (event.which == null) {
					event.which =
						original.charCode != null ? original.charCode : original.keyCode;
				}
				return event;
			},
		},
		mouseHooks: {
			props:
				"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
					" "
				),
			filter: function (event, original) {
				var body,
					eventDoc,
					doc,
					button = original.button,
					fromElement = original.fromElement;
				if (event.pageX == null && original.clientX != null) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
					event.pageX =
						original.clientX +
						((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
						((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
					event.pageY =
						original.clientY +
						((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
						((doc && doc.clientTop) || (body && body.clientTop) || 0);
				}
				if (!event.relatedTarget && fromElement) {
					event.relatedTarget =
						fromElement === event.target ? original.toElement : fromElement;
				}
				if (!event.which && button !== undefined) {
					event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
				}
				return event;
			},
		},
		special: {
			load: {noBubble: true},
			focus: {
				trigger: function () {
					if (this !== safeActiveElement() && this.focus) {
						try {
							this.focus();
							return false;
						} catch (e) {}
					}
				},
				delegateType: "focusin",
			},
			blur: {
				trigger: function () {
					if (this === safeActiveElement() && this.blur) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout",
			},
			click: {
				trigger: function () {
					if (
						jQuery.nodeName(this, "input") &&
						this.type === "checkbox" &&
						this.click
					) {
						this.click();
						return false;
					}
				},
				_default: function (event) {
					return jQuery.nodeName(event.target, "a");
				},
			},
			beforeunload: {
				postDispatch: function (event) {
					if (event.result !== undefined) {
						event.originalEvent.returnValue = event.result;
					}
				},
			},
		},
		simulate: function (type, elem, event, bubble) {
			var e = jQuery.extend(new jQuery.Event(), event, {
				type: type,
				isSimulated: true,
				originalEvent: {},
			});
			if (bubble) {
				jQuery.event.trigger(e, null, elem);
			} else {
				jQuery.event.dispatch.call(elem, e);
			}
			if (e.isDefaultPrevented()) {
				event.preventDefault();
			}
		},
	};
	jQuery.removeEvent = document.removeEventListener
		? function (elem, type, handle) {
				if (elem.removeEventListener) {
					elem.removeEventListener(type, handle, false);
				}
		  }
		: function (elem, type, handle) {
				var name = "on" + type;
				if (elem.detachEvent) {
					if (typeof elem[name] === strundefined) {
						elem[name] = null;
					}
					elem.detachEvent(name, handle);
				}
		  };
	jQuery.Event = function (src, props) {
		if (!(this instanceof jQuery.Event)) {
			return new jQuery.Event(src, props);
		}
		if (src && src.type) {
			this.originalEvent = src;
			this.type = src.type;
			this.isDefaultPrevented =
				src.defaultPrevented ||
				(src.defaultPrevented === undefined &&
					(src.returnValue === false ||
						(src.getPreventDefault && src.getPreventDefault())))
					? returnTrue
					: returnFalse;
		} else {
			this.type = src;
		}
		if (props) {
			jQuery.extend(this, props);
		}
		this.timeStamp = (src && src.timeStamp) || jQuery.now();
		this[jQuery.expando] = true;
	};
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		preventDefault: function () {
			var e = this.originalEvent;
			this.isDefaultPrevented = returnTrue;
			if (!e) {
				return;
			}
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation: function () {
			var e = this.originalEvent;
			this.isPropagationStopped = returnTrue;
			if (!e) {
				return;
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			e.cancelBubble = true;
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		},
	};
	jQuery.each(
		{mouseenter: "mouseover", mouseleave: "mouseout"},
		function (orig, fix) {
			jQuery.event.special[orig] = {
				delegateType: fix,
				bindType: fix,
				handle: function (event) {
					var ret,
						target = this,
						related = event.relatedTarget,
						handleObj = event.handleObj;
					if (
						!related ||
						(related !== target && !jQuery.contains(target, related))
					) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply(this, arguments);
						event.type = fix;
					}
					return ret;
				},
			};
		}
	);
	if (!support.submitBubbles) {
		jQuery.event.special.submit = {
			setup: function () {
				if (jQuery.nodeName(this, "form")) {
					return false;
				}
				jQuery.event.add(this, "click._submit keypress._submit", function (e) {
					var elem = e.target,
						form =
							jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button")
								? elem.form
								: undefined;
					if (form && !jQuery._data(form, "submitBubbles")) {
						jQuery.event.add(form, "submit._submit", function (event) {
							event._submit_bubble = true;
						});
						jQuery._data(form, "submitBubbles", true);
					}
				});
			},
			postDispatch: function (event) {
				if (event._submit_bubble) {
					delete event._submit_bubble;
					if (this.parentNode && !event.isTrigger) {
						jQuery.event.simulate("submit", this.parentNode, event, true);
					}
				}
			},
			teardown: function () {
				if (jQuery.nodeName(this, "form")) {
					return false;
				}
				jQuery.event.remove(this, "._submit");
			},
		};
	}
	if (!support.changeBubbles) {
		jQuery.event.special.change = {
			setup: function () {
				if (rformElems.test(this.nodeName)) {
					if (this.type === "checkbox" || this.type === "radio") {
						jQuery.event.add(this, "propertychange._change", function (event) {
							if (event.originalEvent.propertyName === "checked") {
								this._just_changed = true;
							}
						});
						jQuery.event.add(this, "click._change", function (event) {
							if (this._just_changed && !event.isTrigger) {
								this._just_changed = false;
							}
							jQuery.event.simulate("change", this, event, true);
						});
					}
					return false;
				}
				jQuery.event.add(this, "beforeactivate._change", function (e) {
					var elem = e.target;
					if (
						rformElems.test(elem.nodeName) &&
						!jQuery._data(elem, "changeBubbles")
					) {
						jQuery.event.add(elem, "change._change", function (event) {
							if (this.parentNode && !event.isSimulated && !event.isTrigger) {
								jQuery.event.simulate("change", this.parentNode, event, true);
							}
						});
						jQuery._data(elem, "changeBubbles", true);
					}
				});
			},
			handle: function (event) {
				var elem = event.target;
				if (
					this !== elem ||
					event.isSimulated ||
					event.isTrigger ||
					(elem.type !== "radio" && elem.type !== "checkbox")
				) {
					return event.handleObj.handler.apply(this, arguments);
				}
			},
			teardown: function () {
				jQuery.event.remove(this, "._change");
				return !rformElems.test(this.nodeName);
			},
		};
	}
	if (!support.focusinBubbles) {
		jQuery.each({focus: "focusin", blur: "focusout"}, function (orig, fix) {
			var handler = function (event) {
				jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
			};
			jQuery.event.special[fix] = {
				setup: function () {
					var doc = this.ownerDocument || this,
						attaches = jQuery._data(doc, fix);
					if (!attaches) {
						doc.addEventListener(orig, handler, true);
					}
					jQuery._data(doc, fix, (attaches || 0) + 1);
				},
				teardown: function () {
					var doc = this.ownerDocument || this,
						attaches = jQuery._data(doc, fix) - 1;
					if (!attaches) {
						doc.removeEventListener(orig, handler, true);
						jQuery._removeData(doc, fix);
					} else {
						jQuery._data(doc, fix, attaches);
					}
				},
			};
		});
	}
	jQuery.fn.extend({
		on: function (types, selector, data, fn, one) {
			var type, origFn;
			if (typeof types === "object") {
				if (typeof selector !== "string") {
					data = data || selector;
					selector = undefined;
				}
				for (type in types) {
					this.on(type, selector, data, types[type], one);
				}
				return this;
			}
			if (data == null && fn == null) {
				fn = selector;
				data = selector = undefined;
			} else if (fn == null) {
				if (typeof selector === "string") {
					fn = data;
					data = undefined;
				} else {
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if (fn === false) {
				fn = returnFalse;
			} else if (!fn) {
				return this;
			}
			if (one === 1) {
				origFn = fn;
				fn = function (event) {
					jQuery().off(event);
					return origFn.apply(this, arguments);
				};
				fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
			}
			return this.each(function () {
				jQuery.event.add(this, types, fn, data, selector);
			});
		},
		one: function (types, selector, data, fn) {
			return this.on(types, selector, data, fn, 1);
		},
		off: function (types, selector, fn) {
			var handleObj, type;
			if (types && types.preventDefault && types.handleObj) {
				handleObj = types.handleObj;
				jQuery(types.delegateTarget).off(
					handleObj.namespace
						? handleObj.origType + "." + handleObj.namespace
						: handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if (typeof types === "object") {
				for (type in types) {
					this.off(type, selector, types[type]);
				}
				return this;
			}
			if (selector === false || typeof selector === "function") {
				fn = selector;
				selector = undefined;
			}
			if (fn === false) {
				fn = returnFalse;
			}
			return this.each(function () {
				jQuery.event.remove(this, types, fn, selector);
			});
		},
		trigger: function (type, data) {
			return this.each(function () {
				jQuery.event.trigger(type, data, this);
			});
		},
		triggerHandler: function (type, data) {
			var elem = this[0];
			if (elem) {
				return jQuery.event.trigger(type, data, elem, true);
			}
		},
	});
	function createSafeFragment(document) {
		var list = nodeNames.split("|"),
			safeFrag = document.createDocumentFragment();
		if (safeFrag.createElement) {
			while (list.length) {
				safeFrag.createElement(list.pop());
			}
		}
		return safeFrag;
	}
	var nodeNames =
			"abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		rleadingWhitespace = /^\s+/,
		rxhtmlTag =
			/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
		wrapMap = {
			option: [1, "<select multiple='multiple'>", "</select>"],
			legend: [1, "<fieldset>", "</fieldset>"],
			area: [1, "<map>", "</map>"],
			param: [1, "<object>", "</object>"],
			thead: [1, "<table>", "</table>"],
			tr: [2, "<table><tbody>", "</tbody></table>"],
			col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
			td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
			_default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
		},
		safeFragment = createSafeFragment(document),
		fragmentDiv = safeFragment.appendChild(document.createElement("div"));
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody =
		wrapMap.tfoot =
		wrapMap.colgroup =
		wrapMap.caption =
			wrapMap.thead;
	wrapMap.th = wrapMap.td;
	function getAll(context, tag) {
		var elems,
			elem,
			i = 0,
			found =
				typeof context.getElementsByTagName !== strundefined
					? context.getElementsByTagName(tag || "*")
					: typeof context.querySelectorAll !== strundefined
					? context.querySelectorAll(tag || "*")
					: undefined;
		if (!found) {
			for (
				found = [], elems = context.childNodes || context;
				(elem = elems[i]) != null;
				i++
			) {
				if (!tag || jQuery.nodeName(elem, tag)) {
					found.push(elem);
				} else {
					jQuery.merge(found, getAll(elem, tag));
				}
			}
		}
		return tag === undefined || (tag && jQuery.nodeName(context, tag))
			? jQuery.merge([context], found)
			: found;
	}
	function fixDefaultChecked(elem) {
		if (rcheckableType.test(elem.type)) {
			elem.defaultChecked = elem.checked;
		}
	}
	function manipulationTarget(elem, content) {
		return jQuery.nodeName(elem, "table") &&
			jQuery.nodeName(
				content.nodeType !== 11 ? content : content.firstChild,
				"tr"
			)
			? elem.getElementsByTagName("tbody")[0] ||
					elem.appendChild(elem.ownerDocument.createElement("tbody"))
			: elem;
	}
	function disableScript(elem) {
		elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript(elem) {
		var match = rscriptTypeMasked.exec(elem.type);
		if (match) {
			elem.type = match[1];
		} else {
			elem.removeAttribute("type");
		}
		return elem;
	}
	function setGlobalEval(elems, refElements) {
		var elem,
			i = 0;
		for (; (elem = elems[i]) != null; i++) {
			jQuery._data(
				elem,
				"globalEval",
				!refElements || jQuery._data(refElements[i], "globalEval")
			);
		}
	}
	function cloneCopyEvent(src, dest) {
		if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
			return;
		}
		var type,
			i,
			l,
			oldData = jQuery._data(src),
			curData = jQuery._data(dest, oldData),
			events = oldData.events;
		if (events) {
			delete curData.handle;
			curData.events = {};
			for (type in events) {
				for (i = 0, l = events[type].length; i < l; i++) {
					jQuery.event.add(dest, type, events[type][i]);
				}
			}
		}
		if (curData.data) {
			curData.data = jQuery.extend({}, curData.data);
		}
	}
	function fixCloneNodeIssues(src, dest) {
		var nodeName, e, data;
		if (dest.nodeType !== 1) {
			return;
		}
		nodeName = dest.nodeName.toLowerCase();
		if (!support.noCloneEvent && dest[jQuery.expando]) {
			data = jQuery._data(dest);
			for (e in data.events) {
				jQuery.removeEvent(dest, e, data.handle);
			}
			dest.removeAttribute(jQuery.expando);
		}
		if (nodeName === "script" && dest.text !== src.text) {
			disableScript(dest).text = src.text;
			restoreScript(dest);
		} else if (nodeName === "object") {
			if (dest.parentNode) {
				dest.outerHTML = src.outerHTML;
			}
			if (support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
				dest.innerHTML = src.innerHTML;
			}
		} else if (nodeName === "input" && rcheckableType.test(src.type)) {
			dest.defaultChecked = dest.checked = src.checked;
			if (dest.value !== src.value) {
				dest.value = src.value;
			}
		} else if (nodeName === "option") {
			dest.defaultSelected = dest.selected = src.defaultSelected;
		} else if (nodeName === "input" || nodeName === "textarea") {
			dest.defaultValue = src.defaultValue;
		}
	}
	jQuery.extend({
		clone: function (elem, dataAndEvents, deepDataAndEvents) {
			var destElements,
				node,
				clone,
				i,
				srcElements,
				inPage = jQuery.contains(elem.ownerDocument, elem);
			if (
				support.html5Clone ||
				jQuery.isXMLDoc(elem) ||
				!rnoshimcache.test("<" + elem.nodeName + ">")
			) {
				clone = elem.cloneNode(true);
			} else {
				fragmentDiv.innerHTML = elem.outerHTML;
				fragmentDiv.removeChild((clone = fragmentDiv.firstChild));
			}
			if (
				(!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) &&
				!jQuery.isXMLDoc(elem)
			) {
				destElements = getAll(clone);
				srcElements = getAll(elem);
				for (i = 0; (node = srcElements[i]) != null; ++i) {
					if (destElements[i]) {
						fixCloneNodeIssues(node, destElements[i]);
					}
				}
			}
			if (dataAndEvents) {
				if (deepDataAndEvents) {
					srcElements = srcElements || getAll(elem);
					destElements = destElements || getAll(clone);
					for (i = 0; (node = srcElements[i]) != null; i++) {
						cloneCopyEvent(node, destElements[i]);
					}
				} else {
					cloneCopyEvent(elem, clone);
				}
			}
			destElements = getAll(clone, "script");
			if (destElements.length > 0) {
				setGlobalEval(destElements, !inPage && getAll(elem, "script"));
			}
			destElements = srcElements = node = null;
			return clone;
		},
		buildFragment: function (elems, context, scripts, selection) {
			var j,
				elem,
				contains,
				tmp,
				tag,
				tbody,
				wrap,
				l = elems.length,
				safe = createSafeFragment(context),
				nodes = [],
				i = 0;
			for (; i < l; i++) {
				elem = elems[i];
				if (elem || elem === 0) {
					if (jQuery.type(elem) === "object") {
						jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
					} else if (!rhtml.test(elem)) {
						nodes.push(context.createTextNode(elem));
					} else {
						tmp = tmp || safe.appendChild(context.createElement("div"));
						tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
						wrap = wrapMap[tag] || wrapMap._default;
						tmp.innerHTML =
							wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
						j = wrap[0];
						while (j--) {
							tmp = tmp.lastChild;
						}
						if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
							nodes.push(
								context.createTextNode(rleadingWhitespace.exec(elem)[0])
							);
						}
						if (!support.tbody) {
							elem =
								tag === "table" && !rtbody.test(elem)
									? tmp.firstChild
									: wrap[1] === "<table>" && !rtbody.test(elem)
									? tmp
									: 0;
							j = elem && elem.childNodes.length;
							while (j--) {
								if (
									jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") &&
									!tbody.childNodes.length
								) {
									elem.removeChild(tbody);
								}
							}
						}
						jQuery.merge(nodes, tmp.childNodes);
						tmp.textContent = "";
						while (tmp.firstChild) {
							tmp.removeChild(tmp.firstChild);
						}
						tmp = safe.lastChild;
					}
				}
			}
			if (tmp) {
				safe.removeChild(tmp);
			}
			if (!support.appendChecked) {
				jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
			}
			i = 0;
			while ((elem = nodes[i++])) {
				if (selection && jQuery.inArray(elem, selection) !== -1) {
					continue;
				}
				contains = jQuery.contains(elem.ownerDocument, elem);
				tmp = getAll(safe.appendChild(elem), "script");
				if (contains) {
					setGlobalEval(tmp);
				}
				if (scripts) {
					j = 0;
					while ((elem = tmp[j++])) {
						if (rscriptType.test(elem.type || "")) {
							scripts.push(elem);
						}
					}
				}
			}
			tmp = null;
			return safe;
		},
		cleanData: function (elems, acceptData) {
			var elem,
				type,
				id,
				data,
				i = 0,
				internalKey = jQuery.expando,
				cache = jQuery.cache,
				deleteExpando = support.deleteExpando,
				special = jQuery.event.special;
			for (; (elem = elems[i]) != null; i++) {
				if (acceptData || jQuery.acceptData(elem)) {
					id = elem[internalKey];
					data = id && cache[id];
					if (data) {
						if (data.events) {
							for (type in data.events) {
								if (special[type]) {
									jQuery.event.remove(elem, type);
								} else {
									jQuery.removeEvent(elem, type, data.handle);
								}
							}
						}
						if (cache[id]) {
							delete cache[id];
							if (deleteExpando) {
								delete elem[internalKey];
							} else if (typeof elem.removeAttribute !== strundefined) {
								elem.removeAttribute(internalKey);
							} else {
								elem[internalKey] = null;
							}
							deletedIds.push(id);
						}
					}
				}
			}
		},
	});
	jQuery.fn.extend({
		text: function (value) {
			return access(
				this,
				function (value) {
					return value === undefined
						? jQuery.text(this)
						: this.empty().append(
								((this[0] && this[0].ownerDocument) || document).createTextNode(
									value
								)
						  );
				},
				null,
				value,
				arguments.length
			);
		},
		append: function () {
			return this.domManip(arguments, function (elem) {
				if (
					this.nodeType === 1 ||
					this.nodeType === 11 ||
					this.nodeType === 9
				) {
					var target = manipulationTarget(this, elem);
					target.appendChild(elem);
				}
			});
		},
		prepend: function () {
			return this.domManip(arguments, function (elem) {
				if (
					this.nodeType === 1 ||
					this.nodeType === 11 ||
					this.nodeType === 9
				) {
					var target = manipulationTarget(this, elem);
					target.insertBefore(elem, target.firstChild);
				}
			});
		},
		before: function () {
			return this.domManip(arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this);
				}
			});
		},
		after: function () {
			return this.domManip(arguments, function (elem) {
				if (this.parentNode) {
					this.parentNode.insertBefore(elem, this.nextSibling);
				}
			});
		},
		remove: function (selector, keepData) {
			var elem,
				elems = selector ? jQuery.filter(selector, this) : this,
				i = 0;
			for (; (elem = elems[i]) != null; i++) {
				if (!keepData && elem.nodeType === 1) {
					jQuery.cleanData(getAll(elem));
				}
				if (elem.parentNode) {
					if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
						setGlobalEval(getAll(elem, "script"));
					}
					elem.parentNode.removeChild(elem);
				}
			}
			return this;
		},
		empty: function () {
			var elem,
				i = 0;
			for (; (elem = this[i]) != null; i++) {
				if (elem.nodeType === 1) {
					jQuery.cleanData(getAll(elem, false));
				}
				while (elem.firstChild) {
					elem.removeChild(elem.firstChild);
				}
				if (elem.options && jQuery.nodeName(elem, "select")) {
					elem.options.length = 0;
				}
			}
			return this;
		},
		clone: function (dataAndEvents, deepDataAndEvents) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents =
				deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
			return this.map(function () {
				return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
			});
		},
		html: function (value) {
			return access(
				this,
				function (value) {
					var elem = this[0] || {},
						i = 0,
						l = this.length;
					if (value === undefined) {
						return elem.nodeType === 1
							? elem.innerHTML.replace(rinlinejQuery, "")
							: undefined;
					}
					if (
						typeof value === "string" &&
						!rnoInnerhtml.test(value) &&
						(support.htmlSerialize || !rnoshimcache.test(value)) &&
						(support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
						!wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]
					) {
						value = value.replace(rxhtmlTag, "<$1></$2>");
						try {
							for (; i < l; i++) {
								elem = this[i] || {};
								if (elem.nodeType === 1) {
									jQuery.cleanData(getAll(elem, false));
									elem.innerHTML = value;
								}
							}
							elem = 0;
						} catch (e) {}
					}
					if (elem) {
						this.empty().append(value);
					}
				},
				null,
				value,
				arguments.length
			);
		},
		replaceWith: function () {
			var arg = arguments[0];
			this.domManip(arguments, function (elem) {
				arg = this.parentNode;
				jQuery.cleanData(getAll(this));
				if (arg) {
					arg.replaceChild(elem, this);
				}
			});
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},
		detach: function (selector) {
			return this.remove(selector, true);
		},
		domManip: function (args, callback) {
			args = concat.apply([], args);
			var first,
				node,
				hasScripts,
				scripts,
				doc,
				fragment,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[0],
				isFunction = jQuery.isFunction(value);
			if (
				isFunction ||
				(l > 1 &&
					typeof value === "string" &&
					!support.checkClone &&
					rchecked.test(value))
			) {
				return this.each(function (index) {
					var self = set.eq(index);
					if (isFunction) {
						args[0] = value.call(this, index, self.html());
					}
					self.domManip(args, callback);
				});
			}
			if (l) {
				fragment = jQuery.buildFragment(
					args,
					this[0].ownerDocument,
					false,
					this
				);
				first = fragment.firstChild;
				if (fragment.childNodes.length === 1) {
					fragment = first;
				}
				if (first) {
					scripts = jQuery.map(getAll(fragment, "script"), disableScript);
					hasScripts = scripts.length;
					for (; i < l; i++) {
						node = fragment;
						if (i !== iNoClone) {
							node = jQuery.clone(node, true, true);
							if (hasScripts) {
								jQuery.merge(scripts, getAll(node, "script"));
							}
						}
						callback.call(this[i], node, i);
					}
					if (hasScripts) {
						doc = scripts[scripts.length - 1].ownerDocument;
						jQuery.map(scripts, restoreScript);
						for (i = 0; i < hasScripts; i++) {
							node = scripts[i];
							if (
								rscriptType.test(node.type || "") &&
								!jQuery._data(node, "globalEval") &&
								jQuery.contains(doc, node)
							) {
								if (node.src) {
									if (jQuery._evalUrl) {
										jQuery._evalUrl(node.src);
									}
								} else {
									jQuery.globalEval(
										(
											node.text ||
											node.textContent ||
											node.innerHTML ||
											""
										).replace(rcleanScript, "")
									);
								}
							}
						}
					}
					fragment = first = null;
				}
			}
			return this;
		},
	});
	jQuery.each(
		{
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith",
		},
		function (name, original) {
			jQuery.fn[name] = function (selector) {
				var elems,
					i = 0,
					ret = [],
					insert = jQuery(selector),
					last = insert.length - 1;
				for (; i <= last; i++) {
					elems = i === last ? this : this.clone(true);
					jQuery(insert[i])[original](elems);
					push.apply(ret, elems.get());
				}
				return this.pushStack(ret);
			};
		}
	);
	var iframe,
		elemdisplay = {};
	function actualDisplay(name, doc) {
		var elem = jQuery(doc.createElement(name)).appendTo(doc.body),
			display = window.getDefaultComputedStyle
				? window.getDefaultComputedStyle(elem[0]).display
				: jQuery.css(elem[0], "display");
		elem.detach();
		return display;
	}
	function defaultDisplay(nodeName) {
		var doc = document,
			display = elemdisplay[nodeName];
		if (!display) {
			display = actualDisplay(nodeName, doc);
			if (display === "none" || !display) {
				iframe = (
					iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>")
				).appendTo(doc.documentElement);
				doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
				doc.write();
				doc.close();
				display = actualDisplay(nodeName, doc);
				iframe.detach();
			}
			elemdisplay[nodeName] = display;
		}
		return display;
	}
	(function () {
		var a,
			shrinkWrapBlocksVal,
			div = document.createElement("div"),
			divReset =
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;padding:0;margin:0;border:0";
		div.innerHTML =
			"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		a.style.cssText = "float:left;opacity:.5";
		support.opacity = /^0.5/.test(a.style.opacity);
		support.cssFloat = !!a.style.cssFloat;
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		a = div = null;
		support.shrinkWrapBlocks = function () {
			var body, container, div, containerStyles;
			if (shrinkWrapBlocksVal == null) {
				body = document.getElementsByTagName("body")[0];
				if (!body) {
					return;
				}
				containerStyles =
					"border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
				container = document.createElement("div");
				div = document.createElement("div");
				body.appendChild(container).appendChild(div);
				shrinkWrapBlocksVal = false;
				if (typeof div.style.zoom !== strundefined) {
					div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
					div.innerHTML = "<div></div>";
					div.firstChild.style.width = "5px";
					shrinkWrapBlocksVal = div.offsetWidth !== 3;
				}
				body.removeChild(container);
				body = container = div = null;
			}
			return shrinkWrapBlocksVal;
		};
	})();
	var rmargin = /^margin/;
	var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
	var getStyles,
		curCSS,
		rposition = /^(top|right|bottom|left)$/;
	if (window.getComputedStyle) {
		getStyles = function (elem) {
			return elem.ownerDocument.defaultView.getComputedStyle(elem, null);
		};
		curCSS = function (elem, name, computed) {
			var width,
				minWidth,
				maxWidth,
				ret,
				style = elem.style;
			computed = computed || getStyles(elem);
			ret = computed
				? computed.getPropertyValue(name) || computed[name]
				: undefined;
			if (computed) {
				if (ret === "" && !jQuery.contains(elem.ownerDocument, elem)) {
					ret = jQuery.style(elem, name);
				}
				if (rnumnonpx.test(ret) && rmargin.test(name)) {
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}
			return ret === undefined ? ret : ret + "";
		};
	} else if (document.documentElement.currentStyle) {
		getStyles = function (elem) {
			return elem.currentStyle;
		};
		curCSS = function (elem, name, computed) {
			var left,
				rs,
				rsLeft,
				ret,
				style = elem.style;
			computed = computed || getStyles(elem);
			ret = computed ? computed[name] : undefined;
			if (ret == null && style && style[name]) {
				ret = style[name];
			}
			if (rnumnonpx.test(ret) && !rposition.test(name)) {
				left = style.left;
				rs = elem.runtimeStyle;
				rsLeft = rs && rs.left;
				if (rsLeft) {
					rs.left = elem.currentStyle.left;
				}
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";
				style.left = left;
				if (rsLeft) {
					rs.left = rsLeft;
				}
			}
			return ret === undefined ? ret : ret + "" || "auto";
		};
	}
	function addGetHookIf(conditionFn, hookFn) {
		return {
			get: function () {
				var condition = conditionFn();
				if (condition == null) {
					return;
				}
				if (condition) {
					delete this.get;
					return;
				}
				return (this.get = hookFn).apply(this, arguments);
			},
		};
	}
	(function () {
		var a,
			reliableHiddenOffsetsVal,
			boxSizingVal,
			boxSizingReliableVal,
			pixelPositionVal,
			reliableMarginRightVal,
			div = document.createElement("div"),
			containerStyles =
				"border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
			divReset =
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
				"display:block;padding:0;margin:0;border:0";
		div.innerHTML =
			"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		a.style.cssText = "float:left;opacity:.5";
		support.opacity = /^0.5/.test(a.style.opacity);
		support.cssFloat = !!a.style.cssFloat;
		div.style.backgroundClip = "content-box";
		div.cloneNode(true).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
		a = div = null;
		jQuery.extend(support, {
			reliableHiddenOffsets: function () {
				if (reliableHiddenOffsetsVal != null) {
					return reliableHiddenOffsetsVal;
				}
				var container,
					tds,
					isSupported,
					div = document.createElement("div"),
					body = document.getElementsByTagName("body")[0];
				if (!body) {
					return;
				}
				div.setAttribute("className", "t");
				div.innerHTML =
					"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
				container = document.createElement("div");
				container.style.cssText = containerStyles;
				body.appendChild(container).appendChild(div);
				div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
				tds = div.getElementsByTagName("td");
				tds[0].style.cssText = "padding:0;margin:0;border:0;display:none";
				isSupported = tds[0].offsetHeight === 0;
				tds[0].style.display = "";
				tds[1].style.display = "none";
				reliableHiddenOffsetsVal = isSupported && tds[0].offsetHeight === 0;
				body.removeChild(container);
				div = body = null;
				return reliableHiddenOffsetsVal;
			},
			boxSizing: function () {
				if (boxSizingVal == null) {
					computeStyleTests();
				}
				return boxSizingVal;
			},
			boxSizingReliable: function () {
				if (boxSizingReliableVal == null) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelPosition: function () {
				if (pixelPositionVal == null) {
					computeStyleTests();
				}
				return pixelPositionVal;
			},
			reliableMarginRight: function () {
				var body, container, div, marginDiv;
				if (reliableMarginRightVal == null && window.getComputedStyle) {
					body = document.getElementsByTagName("body")[0];
					if (!body) {
						return;
					}
					container = document.createElement("div");
					div = document.createElement("div");
					container.style.cssText = containerStyles;
					body.appendChild(container).appendChild(div);
					marginDiv = div.appendChild(document.createElement("div"));
					marginDiv.style.cssText = div.style.cssText = divReset;
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					reliableMarginRightVal = !parseFloat(
						(window.getComputedStyle(marginDiv, null) || {}).marginRight
					);
					body.removeChild(container);
				}
				return reliableMarginRightVal;
			},
		});
		function computeStyleTests() {
			var container,
				div,
				body = document.getElementsByTagName("body")[0];
			if (!body) {
				return;
			}
			container = document.createElement("div");
			div = document.createElement("div");
			container.style.cssText = containerStyles;
			body.appendChild(container).appendChild(div);
			div.style.cssText =
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";
			jQuery.swap(body, body.style.zoom != null ? {zoom: 1} : {}, function () {
				boxSizingVal = div.offsetWidth === 4;
			});
			boxSizingReliableVal = true;
			pixelPositionVal = false;
			reliableMarginRightVal = true;
			if (window.getComputedStyle) {
				pixelPositionVal =
					(window.getComputedStyle(div, null) || {}).top !== "1%";
				boxSizingReliableVal =
					(window.getComputedStyle(div, null) || {width: "4px"}).width ===
					"4px";
			}
			body.removeChild(container);
			div = body = null;
		}
	})();
	jQuery.swap = function (elem, options, callback, args) {
		var ret,
			name,
			old = {};
		for (name in options) {
			old[name] = elem.style[name];
			elem.style[name] = options[name];
		}
		ret = callback.apply(elem, args || []);
		for (name in options) {
			elem.style[name] = old[name];
		}
		return ret;
	};
	var ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity\s*=\s*([^)]*)/,
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),
		rrelNum = new RegExp("^([+-])=(" + pnum + ")", "i"),
		cssShow = {position: "absolute", visibility: "hidden", display: "block"},
		cssNormalTransform = {letterSpacing: 0, fontWeight: 400},
		cssPrefixes = ["Webkit", "O", "Moz", "ms"];
	function vendorPropName(style, name) {
		if (name in style) {
			return name;
		}
		var capName = name.charAt(0).toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
		while (i--) {
			name = cssPrefixes[i] + capName;
			if (name in style) {
				return name;
			}
		}
		return origName;
	}
	function showHide(elements, show) {
		var display,
			elem,
			hidden,
			values = [],
			index = 0,
			length = elements.length;
		for (; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			values[index] = jQuery._data(elem, "olddisplay");
			display = elem.style.display;
			if (show) {
				if (!values[index] && display === "none") {
					elem.style.display = "";
				}
				if (elem.style.display === "" && isHidden(elem)) {
					values[index] = jQuery._data(
						elem,
						"olddisplay",
						defaultDisplay(elem.nodeName)
					);
				}
			} else {
				if (!values[index]) {
					hidden = isHidden(elem);
					if ((display && display !== "none") || !hidden) {
						jQuery._data(
							elem,
							"olddisplay",
							hidden ? display : jQuery.css(elem, "display")
						);
					}
				}
			}
		}
		for (index = 0; index < length; index++) {
			elem = elements[index];
			if (!elem.style) {
				continue;
			}
			if (!show || elem.style.display === "none" || elem.style.display === "") {
				elem.style.display = show ? values[index] || "" : "none";
			}
		}
		return elements;
	}
	function setPositiveNumber(elem, value, subtract) {
		var matches = rnumsplit.exec(value);
		return matches
			? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px")
			: value;
	}
	function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
		var i =
				extra === (isBorderBox ? "border" : "content")
					? 4
					: name === "width"
					? 1
					: 0,
			val = 0;
		for (; i < 4; i += 2) {
			if (extra === "margin") {
				val += jQuery.css(elem, extra + cssExpand[i], true, styles);
			}
			if (isBorderBox) {
				if (extra === "content") {
					val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				}
				if (extra !== "margin") {
					val -= jQuery.css(
						elem,
						"border" + cssExpand[i] + "Width",
						true,
						styles
					);
				}
			} else {
				val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
				if (extra !== "padding") {
					val += jQuery.css(
						elem,
						"border" + cssExpand[i] + "Width",
						true,
						styles
					);
				}
			}
		}
		return val;
	}
	function getWidthOrHeight(elem, name, extra) {
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles(elem),
			isBorderBox =
				support.boxSizing() &&
				jQuery.css(elem, "boxSizing", false, styles) === "border-box";
		if (val <= 0 || val == null) {
			val = curCSS(elem, name, styles);
			if (val < 0 || val == null) {
				val = elem.style[name];
			}
			if (rnumnonpx.test(val)) {
				return val;
			}
			valueIsBorderBox =
				isBorderBox &&
				(support.boxSizingReliable() || val === elem.style[name]);
			val = parseFloat(val) || 0;
		}
		return (
			val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || (isBorderBox ? "border" : "content"),
				valueIsBorderBox,
				styles
			) +
			"px"
		);
	}
	jQuery.extend({
		cssHooks: {
			opacity: {
				get: function (elem, computed) {
					if (computed) {
						var ret = curCSS(elem, "opacity");
						return ret === "" ? "1" : ret;
					}
				},
			},
		},
		cssNumber: {
			columnCount: true,
			fillOpacity: true,
			fontWeight: true,
			lineHeight: true,
			opacity: true,
			order: true,
			orphans: true,
			widows: true,
			zIndex: true,
			zoom: true,
		},
		cssProps: {float: support.cssFloat ? "cssFloat" : "styleFloat"},
		style: function (elem, name, value, extra) {
			if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
				return;
			}
			var ret,
				type,
				hooks,
				origName = jQuery.camelCase(name),
				style = elem.style;
			name =
				jQuery.cssProps[origName] ||
				(jQuery.cssProps[origName] = vendorPropName(style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (value !== undefined) {
				type = typeof value;
				if (type === "string" && (ret = rrelNum.exec(value))) {
					value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
					type = "number";
				}
				if (value == null || value !== value) {
					return;
				}
				if (type === "number" && !jQuery.cssNumber[origName]) {
					value += "px";
				}
				if (
					!support.clearCloneStyle &&
					value === "" &&
					name.indexOf("background") === 0
				) {
					style[name] = "inherit";
				}
				if (
					!hooks ||
					!("set" in hooks) ||
					(value = hooks.set(elem, value, extra)) !== undefined
				) {
					try {
						style[name] = "";
						style[name] = value;
					} catch (e) {}
				}
			} else {
				if (
					hooks &&
					"get" in hooks &&
					(ret = hooks.get(elem, false, extra)) !== undefined
				) {
					return ret;
				}
				return style[name];
			}
		},
		css: function (elem, name, extra, styles) {
			var num,
				val,
				hooks,
				origName = jQuery.camelCase(name);
			name =
				jQuery.cssProps[origName] ||
				(jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
			hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
			if (hooks && "get" in hooks) {
				val = hooks.get(elem, true, extra);
			}
			if (val === undefined) {
				val = curCSS(elem, name, styles);
			}
			if (val === "normal" && name in cssNormalTransform) {
				val = cssNormalTransform[name];
			}
			if (extra === "" || extra) {
				num = parseFloat(val);
				return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
			}
			return val;
		},
	});
	jQuery.each(["height", "width"], function (i, name) {
		jQuery.cssHooks[name] = {
			get: function (elem, computed, extra) {
				if (computed) {
					return elem.offsetWidth === 0 &&
						rdisplayswap.test(jQuery.css(elem, "display"))
						? jQuery.swap(elem, cssShow, function () {
								return getWidthOrHeight(elem, name, extra);
						  })
						: getWidthOrHeight(elem, name, extra);
				}
			},
			set: function (elem, value, extra) {
				var styles = extra && getStyles(elem);
				return setPositiveNumber(
					elem,
					value,
					extra
						? augmentWidthOrHeight(
								elem,
								name,
								extra,
								support.boxSizing() &&
									jQuery.css(elem, "boxSizing", false, styles) === "border-box",
								styles
						  )
						: 0
				);
			},
		};
	});
	if (!support.opacity) {
		jQuery.cssHooks.opacity = {
			get: function (elem, computed) {
				return ropacity.test(
					(computed && elem.currentStyle
						? elem.currentStyle.filter
						: elem.style.filter) || ""
				)
					? 0.01 * parseFloat(RegExp.$1) + ""
					: computed
					? "1"
					: "";
			},
			set: function (elem, value) {
				var style = elem.style,
					currentStyle = elem.currentStyle,
					opacity = jQuery.isNumeric(value)
						? "alpha(opacity=" + value * 100 + ")"
						: "",
					filter = (currentStyle && currentStyle.filter) || style.filter || "";
				style.zoom = 1;
				if (
					(value >= 1 || value === "") &&
					jQuery.trim(filter.replace(ralpha, "")) === "" &&
					style.removeAttribute
				) {
					style.removeAttribute("filter");
					if (value === "" || (currentStyle && !currentStyle.filter)) {
						return;
					}
				}
				style.filter = ralpha.test(filter)
					? filter.replace(ralpha, opacity)
					: filter + " " + opacity;
			},
		};
	}
	jQuery.cssHooks.marginRight = addGetHookIf(
		support.reliableMarginRight,
		function (elem, computed) {
			if (computed) {
				return jQuery.swap(elem, {display: "inline-block"}, curCSS, [
					elem,
					"marginRight",
				]);
			}
		}
	);
	jQuery.each(
		{margin: "", padding: "", border: "Width"},
		function (prefix, suffix) {
			jQuery.cssHooks[prefix + suffix] = {
				expand: function (value) {
					var i = 0,
						expanded = {},
						parts = typeof value === "string" ? value.split(" ") : [value];
					for (; i < 4; i++) {
						expanded[prefix + cssExpand[i] + suffix] =
							parts[i] || parts[i - 2] || parts[0];
					}
					return expanded;
				},
			};
			if (!rmargin.test(prefix)) {
				jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
			}
		}
	);
	jQuery.fn.extend({
		css: function (name, value) {
			return access(
				this,
				function (elem, name, value) {
					var styles,
						len,
						map = {},
						i = 0;
					if (jQuery.isArray(name)) {
						styles = getStyles(elem);
						len = name.length;
						for (; i < len; i++) {
							map[name[i]] = jQuery.css(elem, name[i], false, styles);
						}
						return map;
					}
					return value !== undefined
						? jQuery.style(elem, name, value)
						: jQuery.css(elem, name);
				},
				name,
				value,
				arguments.length > 1
			);
		},
		show: function () {
			return showHide(this, true);
		},
		hide: function () {
			return showHide(this);
		},
		toggle: function (state) {
			if (typeof state === "boolean") {
				return state ? this.show() : this.hide();
			}
			return this.each(function () {
				if (isHidden(this)) {
					jQuery(this).show();
				} else {
					jQuery(this).hide();
				}
			});
		},
	});
	function Tween(elem, options, prop, end, easing) {
		return new Tween.prototype.init(elem, options, prop, end, easing);
	}
	jQuery.Tween = Tween;
	Tween.prototype = {
		constructor: Tween,
		init: function (elem, options, prop, end, easing, unit) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
		},
		cur: function () {
			var hooks = Tween.propHooks[this.prop];
			return hooks && hooks.get
				? hooks.get(this)
				: Tween.propHooks._default.get(this);
		},
		run: function (percent) {
			var eased,
				hooks = Tween.propHooks[this.prop];
			if (this.options.duration) {
				this.pos = eased = jQuery.easing[this.easing](
					percent,
					this.options.duration * percent,
					0,
					1,
					this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = (this.end - this.start) * eased + this.start;
			if (this.options.step) {
				this.options.step.call(this.elem, this.now, this);
			}
			if (hooks && hooks.set) {
				hooks.set(this);
			} else {
				Tween.propHooks._default.set(this);
			}
			return this;
		},
	};
	Tween.prototype.init.prototype = Tween.prototype;
	Tween.propHooks = {
		_default: {
			get: function (tween) {
				var result;
				if (
					tween.elem[tween.prop] != null &&
					(!tween.elem.style || tween.elem.style[tween.prop] == null)
				) {
					return tween.elem[tween.prop];
				}
				result = jQuery.css(tween.elem, tween.prop, "");
				return !result || result === "auto" ? 0 : result;
			},
			set: function (tween) {
				if (jQuery.fx.step[tween.prop]) {
					jQuery.fx.step[tween.prop](tween);
				} else if (
					tween.elem.style &&
					(tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
						jQuery.cssHooks[tween.prop])
				) {
					jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
				} else {
					tween.elem[tween.prop] = tween.now;
				}
			},
		},
	};
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function (tween) {
			if (tween.elem.nodeType && tween.elem.parentNode) {
				tween.elem[tween.prop] = tween.now;
			}
		},
	};
	jQuery.easing = {
		linear: function (p) {
			return p;
		},
		swing: function (p) {
			return 0.5 - Math.cos(p * Math.PI) / 2;
		},
	};
	jQuery.fx = Tween.prototype.init;
	jQuery.fx.step = {};
	var fxNow,
		timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i"),
		rrun = /queueHooks$/,
		animationPrefilters = [defaultPrefilter],
		tweeners = {
			"*": [
				function (prop, value) {
					var tween = this.createTween(prop, value),
						target = tween.cur(),
						parts = rfxnum.exec(value),
						unit = (parts && parts[3]) || (jQuery.cssNumber[prop] ? "" : "px"),
						start =
							(jQuery.cssNumber[prop] || (unit !== "px" && +target)) &&
							rfxnum.exec(jQuery.css(tween.elem, prop)),
						scale = 1,
						maxIterations = 20;
					if (start && start[3] !== unit) {
						unit = unit || start[3];
						parts = parts || [];
						start = +target || 1;
						do {
							scale = scale || ".5";
							start = start / scale;
							jQuery.style(tween.elem, prop, start + unit);
						} while (
							scale !== (scale = tween.cur() / target) &&
							scale !== 1 &&
							--maxIterations
						);
					}
					if (parts) {
						start = tween.start = +start || +target || 0;
						tween.unit = unit;
						tween.end = parts[1]
							? start + (parts[1] + 1) * parts[2]
							: +parts[2];
					}
					return tween;
				},
			],
		};
	function createFxNow() {
		setTimeout(function () {
			fxNow = undefined;
		});
		return (fxNow = jQuery.now());
	}
	function genFx(type, includeWidth) {
		var which,
			attrs = {height: type},
			i = 0;
		includeWidth = includeWidth ? 1 : 0;
		for (; i < 4; i += 2 - includeWidth) {
			which = cssExpand[i];
			attrs["margin" + which] = attrs["padding" + which] = type;
		}
		if (includeWidth) {
			attrs.opacity = attrs.width = type;
		}
		return attrs;
	}
	function createTween(value, prop, animation) {
		var tween,
			collection = (tweeners[prop] || []).concat(tweeners["*"]),
			index = 0,
			length = collection.length;
		for (; index < length; index++) {
			if ((tween = collection[index].call(animation, prop, value))) {
				return tween;
			}
		}
	}
	function defaultPrefilter(elem, props, opts) {
		var prop,
			value,
			toggle,
			tween,
			hooks,
			oldfire,
			display,
			dDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden(elem),
			dataShow = jQuery._data(elem, "fxshow");
		if (!opts.queue) {
			hooks = jQuery._queueHooks(elem, "fx");
			if (hooks.unqueued == null) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function () {
					if (!hooks.unqueued) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
			anim.always(function () {
				anim.always(function () {
					hooks.unqueued--;
					if (!jQuery.queue(elem, "fx").length) {
						hooks.empty.fire();
					}
				});
			});
		}
		if (elem.nodeType === 1 && ("height" in props || "width" in props)) {
			opts.overflow = [style.overflow, style.overflowX, style.overflowY];
			display = jQuery.css(elem, "display");
			dDisplay = defaultDisplay(elem.nodeName);
			if (display === "none") {
				display = dDisplay;
			}
			if (display === "inline" && jQuery.css(elem, "float") === "none") {
				if (!support.inlineBlockNeedsLayout || dDisplay === "inline") {
					style.display = "inline-block";
				} else {
					style.zoom = 1;
				}
			}
		}
		if (opts.overflow) {
			style.overflow = "hidden";
			if (!support.shrinkWrapBlocks()) {
				anim.always(function () {
					style.overflow = opts.overflow[0];
					style.overflowX = opts.overflow[1];
					style.overflowY = opts.overflow[2];
				});
			}
		}
		for (prop in props) {
			value = props[prop];
			if (rfxtypes.exec(value)) {
				delete props[prop];
				toggle = toggle || value === "toggle";
				if (value === (hidden ? "hide" : "show")) {
					if (value === "show" && dataShow && dataShow[prop] !== undefined) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[prop] = (dataShow && dataShow[prop]) || jQuery.style(elem, prop);
			}
		}
		if (!jQuery.isEmptyObject(orig)) {
			if (dataShow) {
				if ("hidden" in dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = jQuery._data(elem, "fxshow", {});
			}
			if (toggle) {
				dataShow.hidden = !hidden;
			}
			if (hidden) {
				jQuery(elem).show();
			} else {
				anim.done(function () {
					jQuery(elem).hide();
				});
			}
			anim.done(function () {
				var prop;
				jQuery._removeData(elem, "fxshow");
				for (prop in orig) {
					jQuery.style(elem, prop, orig[prop]);
				}
			});
			for (prop in orig) {
				tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
				if (!(prop in dataShow)) {
					dataShow[prop] = tween.start;
					if (hidden) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
		}
	}
	function propFilter(props, specialEasing) {
		var index, name, easing, value, hooks;
		for (index in props) {
			name = jQuery.camelCase(index);
			easing = specialEasing[name];
			value = props[index];
			if (jQuery.isArray(value)) {
				easing = value[1];
				value = props[index] = value[0];
			}
			if (index !== name) {
				props[name] = value;
				delete props[index];
			}
			hooks = jQuery.cssHooks[name];
			if (hooks && "expand" in hooks) {
				value = hooks.expand(value);
				delete props[name];
				for (index in value) {
					if (!(index in props)) {
						props[index] = value[index];
						specialEasing[index] = easing;
					}
				}
			} else {
				specialEasing[name] = easing;
			}
		}
	}
	function Animation(elem, properties, options) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always(function () {
				delete tick.elem;
			}),
			tick = function () {
				if (stopped) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max(
						0,
						animation.startTime + animation.duration - currentTime
					),
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
				for (; index < length; index++) {
					animation.tweens[index].run(percent);
				}
				deferred.notifyWith(elem, [animation, percent, remaining]);
				if (percent < 1 && length) {
					return remaining;
				} else {
					deferred.resolveWith(elem, [animation]);
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend({}, properties),
				opts: jQuery.extend(true, {specialEasing: {}}, options),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function (prop, end) {
					var tween = jQuery.Tween(
						elem,
						animation.opts,
						prop,
						end,
						animation.opts.specialEasing[prop] || animation.opts.easing
					);
					animation.tweens.push(tween);
					return tween;
				},
				stop: function (gotoEnd) {
					var index = 0,
						length = gotoEnd ? animation.tweens.length : 0;
					if (stopped) {
						return this;
					}
					stopped = true;
					for (; index < length; index++) {
						animation.tweens[index].run(1);
					}
					if (gotoEnd) {
						deferred.resolveWith(elem, [animation, gotoEnd]);
					} else {
						deferred.rejectWith(elem, [animation, gotoEnd]);
					}
					return this;
				},
			}),
			props = animation.props;
		propFilter(props, animation.opts.specialEasing);
		for (; index < length; index++) {
			result = animationPrefilters[index].call(
				animation,
				elem,
				props,
				animation.opts
			);
			if (result) {
				return result;
			}
		}
		jQuery.map(props, createTween, animation);
		if (jQuery.isFunction(animation.opts.start)) {
			animation.opts.start.call(elem, animation);
		}
		jQuery.fx.timer(
			jQuery.extend(tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue,
			})
		);
		return animation
			.progress(animation.opts.progress)
			.done(animation.opts.done, animation.opts.complete)
			.fail(animation.opts.fail)
			.always(animation.opts.always);
	}
	jQuery.Animation = jQuery.extend(Animation, {
		tweener: function (props, callback) {
			if (jQuery.isFunction(props)) {
				callback = props;
				props = ["*"];
			} else {
				props = props.split(" ");
			}
			var prop,
				index = 0,
				length = props.length;
			for (; index < length; index++) {
				prop = props[index];
				tweeners[prop] = tweeners[prop] || [];
				tweeners[prop].unshift(callback);
			}
		},
		prefilter: function (callback, prepend) {
			if (prepend) {
				animationPrefilters.unshift(callback);
			} else {
				animationPrefilters.push(callback);
			}
		},
	});
	jQuery.speed = function (speed, easing, fn) {
		var opt =
			speed && typeof speed === "object"
				? jQuery.extend({}, speed)
				: {
						complete:
							fn || (!fn && easing) || (jQuery.isFunction(speed) && speed),
						duration: speed,
						easing:
							(fn && easing) ||
							(easing && !jQuery.isFunction(easing) && easing),
				  };
		opt.duration = jQuery.fx.off
			? 0
			: typeof opt.duration === "number"
			? opt.duration
			: opt.duration in jQuery.fx.speeds
			? jQuery.fx.speeds[opt.duration]
			: jQuery.fx.speeds._default;
		if (opt.queue == null || opt.queue === true) {
			opt.queue = "fx";
		}
		opt.old = opt.complete;
		opt.complete = function () {
			if (jQuery.isFunction(opt.old)) {
				opt.old.call(this);
			}
			if (opt.queue) {
				jQuery.dequeue(this, opt.queue);
			}
		};
		return opt;
	};
	jQuery.fn.extend({
		fadeTo: function (speed, to, easing, callback) {
			return this.filter(isHidden)
				.css("opacity", 0)
				.show()
				.end()
				.animate({opacity: to}, speed, easing, callback);
		},
		animate: function (prop, speed, easing, callback) {
			var empty = jQuery.isEmptyObject(prop),
				optall = jQuery.speed(speed, easing, callback),
				doAnimation = function () {
					var anim = Animation(this, jQuery.extend({}, prop), optall);
					if (empty || jQuery._data(this, "finish")) {
						anim.stop(true);
					}
				};
			doAnimation.finish = doAnimation;
			return empty || optall.queue === false
				? this.each(doAnimation)
				: this.queue(optall.queue, doAnimation);
		},
		stop: function (type, clearQueue, gotoEnd) {
			var stopQueue = function (hooks) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop(gotoEnd);
			};
			if (typeof type !== "string") {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if (clearQueue && type !== false) {
				this.queue(type || "fx", []);
			}
			return this.each(function () {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = jQuery._data(this);
				if (index) {
					if (data[index] && data[index].stop) {
						stopQueue(data[index]);
					}
				} else {
					for (index in data) {
						if (data[index] && data[index].stop && rrun.test(index)) {
							stopQueue(data[index]);
						}
					}
				}
				for (index = timers.length; index--; ) {
					if (
						timers[index].elem === this &&
						(type == null || timers[index].queue === type)
					) {
						timers[index].anim.stop(gotoEnd);
						dequeue = false;
						timers.splice(index, 1);
					}
				}
				if (dequeue || !gotoEnd) {
					jQuery.dequeue(this, type);
				}
			});
		},
		finish: function (type) {
			if (type !== false) {
				type = type || "fx";
			}
			return this.each(function () {
				var index,
					data = jQuery._data(this),
					queue = data[type + "queue"],
					hooks = data[type + "queueHooks"],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
				data.finish = true;
				jQuery.queue(this, type, []);
				if (hooks && hooks.stop) {
					hooks.stop.call(this, true);
				}
				for (index = timers.length; index--; ) {
					if (timers[index].elem === this && timers[index].queue === type) {
						timers[index].anim.stop(true);
						timers.splice(index, 1);
					}
				}
				for (index = 0; index < length; index++) {
					if (queue[index] && queue[index].finish) {
						queue[index].finish.call(this);
					}
				}
				delete data.finish;
			});
		},
	});
	jQuery.each(["toggle", "show", "hide"], function (i, name) {
		var cssFn = jQuery.fn[name];
		jQuery.fn[name] = function (speed, easing, callback) {
			return speed == null || typeof speed === "boolean"
				? cssFn.apply(this, arguments)
				: this.animate(genFx(name, true), speed, easing, callback);
		};
	});
	jQuery.each(
		{
			slideDown: genFx("show"),
			slideUp: genFx("hide"),
			slideToggle: genFx("toggle"),
			fadeIn: {opacity: "show"},
			fadeOut: {opacity: "hide"},
			fadeToggle: {opacity: "toggle"},
		},
		function (name, props) {
			jQuery.fn[name] = function (speed, easing, callback) {
				return this.animate(props, speed, easing, callback);
			};
		}
	);
	jQuery.timers = [];
	jQuery.fx.tick = function () {
		var timer,
			timers = jQuery.timers,
			i = 0;
		fxNow = jQuery.now();
		for (; i < timers.length; i++) {
			timer = timers[i];
			if (!timer() && timers[i] === timer) {
				timers.splice(i--, 1);
			}
		}
		if (!timers.length) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	jQuery.fx.timer = function (timer) {
		jQuery.timers.push(timer);
		if (timer()) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	jQuery.fx.interval = 13;
	jQuery.fx.start = function () {
		if (!timerId) {
			timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
		}
	};
	jQuery.fx.stop = function () {
		clearInterval(timerId);
		timerId = null;
	};
	jQuery.fx.speeds = {slow: 600, fast: 200, _default: 400};
	jQuery.fn.delay = function (time, type) {
		time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
		type = type || "fx";
		return this.queue(type, function (next, hooks) {
			var timeout = setTimeout(next, time);
			hooks.stop = function () {
				clearTimeout(timeout);
			};
		});
	};
	(function () {
		var a,
			input,
			select,
			opt,
			div = document.createElement("div");
		div.setAttribute("className", "t");
		div.innerHTML =
			"  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
		a = div.getElementsByTagName("a")[0];
		select = document.createElement("select");
		opt = select.appendChild(document.createElement("option"));
		input = div.getElementsByTagName("input")[0];
		a.style.cssText = "top:1px";
		support.getSetAttribute = div.className !== "t";
		support.style = /top/.test(a.getAttribute("style"));
		support.hrefNormalized = a.getAttribute("href") === "/a";
		support.checkOn = !!input.value;
		support.optSelected = opt.selected;
		support.enctype = !!document.createElement("form").enctype;
		select.disabled = true;
		support.optDisabled = !opt.disabled;
		input = document.createElement("input");
		input.setAttribute("value", "");
		support.input = input.getAttribute("value") === "";
		input.value = "t";
		input.setAttribute("type", "radio");
		support.radioValue = input.value === "t";
		a = input = select = opt = div = null;
	})();
	var rreturn = /\r/g;
	jQuery.fn.extend({
		val: function (value) {
			var hooks,
				ret,
				isFunction,
				elem = this[0];
			if (!arguments.length) {
				if (elem) {
					hooks =
						jQuery.valHooks[elem.type] ||
						jQuery.valHooks[elem.nodeName.toLowerCase()];
					if (
						hooks &&
						"get" in hooks &&
						(ret = hooks.get(elem, "value")) !== undefined
					) {
						return ret;
					}
					ret = elem.value;
					return typeof ret === "string"
						? ret.replace(rreturn, "")
						: ret == null
						? ""
						: ret;
				}
				return;
			}
			isFunction = jQuery.isFunction(value);
			return this.each(function (i) {
				var val;
				if (this.nodeType !== 1) {
					return;
				}
				if (isFunction) {
					val = value.call(this, i, jQuery(this).val());
				} else {
					val = value;
				}
				if (val == null) {
					val = "";
				} else if (typeof val === "number") {
					val += "";
				} else if (jQuery.isArray(val)) {
					val = jQuery.map(val, function (value) {
						return value == null ? "" : value + "";
					});
				}
				hooks =
					jQuery.valHooks[this.type] ||
					jQuery.valHooks[this.nodeName.toLowerCase()];
				if (
					!hooks ||
					!("set" in hooks) ||
					hooks.set(this, val, "value") === undefined
				) {
					this.value = val;
				}
			});
		},
	});
	jQuery.extend({
		valHooks: {
			option: {
				get: function (elem) {
					var val = jQuery.find.attr(elem, "value");
					return val != null ? val : jQuery.text(elem);
				},
			},
			select: {
				get: function (elem) {
					var value,
						option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ? max : one ? index : 0;
					for (; i < max; i++) {
						option = options[i];
						if (
							(option.selected || i === index) &&
							(support.optDisabled
								? !option.disabled
								: option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled ||
								!jQuery.nodeName(option.parentNode, "optgroup"))
						) {
							value = jQuery(option).val();
							if (one) {
								return value;
							}
							values.push(value);
						}
					}
					return values;
				},
				set: function (elem, value) {
					var optionSet,
						option,
						options = elem.options,
						values = jQuery.makeArray(value),
						i = options.length;
					while (i--) {
						option = options[i];
						if (
							jQuery.inArray(jQuery.valHooks.option.get(option), values) >= 0
						) {
							try {
								option.selected = optionSet = true;
							} catch (_) {
								option.scrollHeight;
							}
						} else {
							option.selected = false;
						}
					}
					if (!optionSet) {
						elem.selectedIndex = -1;
					}
					return options;
				},
			},
		},
	});
	jQuery.each(["radio", "checkbox"], function () {
		jQuery.valHooks[this] = {
			set: function (elem, value) {
				if (jQuery.isArray(value)) {
					return (elem.checked =
						jQuery.inArray(jQuery(elem).val(), value) >= 0);
				}
			},
		};
		if (!support.checkOn) {
			jQuery.valHooks[this].get = function (elem) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});
	var nodeHook,
		boolHook,
		attrHandle = jQuery.expr.attrHandle,
		ruseDefault = /^(?:checked|selected)$/i,
		getSetAttribute = support.getSetAttribute,
		getSetInput = support.input;
	jQuery.fn.extend({
		attr: function (name, value) {
			return access(this, jQuery.attr, name, value, arguments.length > 1);
		},
		removeAttr: function (name) {
			return this.each(function () {
				jQuery.removeAttr(this, name);
			});
		},
	});
	jQuery.extend({
		attr: function (elem, name, value) {
			var hooks,
				ret,
				nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return;
			}
			if (typeof elem.getAttribute === strundefined) {
				return jQuery.prop(elem, name, value);
			}
			if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
				name = name.toLowerCase();
				hooks =
					jQuery.attrHooks[name] ||
					(jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
			}
			if (value !== undefined) {
				if (value === null) {
					jQuery.removeAttr(elem, name);
				} else if (
					hooks &&
					"set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined
				) {
					return ret;
				} else {
					elem.setAttribute(name, value + "");
					return value;
				}
			} else if (
				hooks &&
				"get" in hooks &&
				(ret = hooks.get(elem, name)) !== null
			) {
				return ret;
			} else {
				ret = jQuery.find.attr(elem, name);
				return ret == null ? undefined : ret;
			}
		},
		removeAttr: function (elem, value) {
			var name,
				propName,
				i = 0,
				attrNames = value && value.match(rnotwhite);
			if (attrNames && elem.nodeType === 1) {
				while ((name = attrNames[i++])) {
					propName = jQuery.propFix[name] || name;
					if (jQuery.expr.match.bool.test(name)) {
						if ((getSetInput && getSetAttribute) || !ruseDefault.test(name)) {
							elem[propName] = false;
						} else {
							elem[jQuery.camelCase("default-" + name)] = elem[
								propName
							] = false;
						}
					} else {
						jQuery.attr(elem, name, "");
					}
					elem.removeAttribute(getSetAttribute ? name : propName);
				}
			}
		},
		attrHooks: {
			type: {
				set: function (elem, value) {
					if (
						!support.radioValue &&
						value === "radio" &&
						jQuery.nodeName(elem, "input")
					) {
						var val = elem.value;
						elem.setAttribute("type", value);
						if (val) {
							elem.value = val;
						}
						return value;
					}
				},
			},
		},
	});
	boolHook = {
		set: function (elem, value, name) {
			if (value === false) {
				jQuery.removeAttr(elem, name);
			} else if ((getSetInput && getSetAttribute) || !ruseDefault.test(name)) {
				elem.setAttribute(
					(!getSetAttribute && jQuery.propFix[name]) || name,
					name
				);
			} else {
				elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
			}
			return name;
		},
	};
	jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
		var getter = attrHandle[name] || jQuery.find.attr;
		attrHandle[name] =
			(getSetInput && getSetAttribute) || !ruseDefault.test(name)
				? function (elem, name, isXML) {
						var ret, handle;
						if (!isXML) {
							handle = attrHandle[name];
							attrHandle[name] = ret;
							ret =
								getter(elem, name, isXML) != null ? name.toLowerCase() : null;
							attrHandle[name] = handle;
						}
						return ret;
				  }
				: function (elem, name, isXML) {
						if (!isXML) {
							return elem[jQuery.camelCase("default-" + name)]
								? name.toLowerCase()
								: null;
						}
				  };
	});
	if (!getSetInput || !getSetAttribute) {
		jQuery.attrHooks.value = {
			set: function (elem, value, name) {
				if (jQuery.nodeName(elem, "input")) {
					elem.defaultValue = value;
				} else {
					return nodeHook && nodeHook.set(elem, value, name);
				}
			},
		};
	}
	if (!getSetAttribute) {
		nodeHook = {
			set: function (elem, value, name) {
				var ret = elem.getAttributeNode(name);
				if (!ret) {
					elem.setAttributeNode(
						(ret = elem.ownerDocument.createAttribute(name))
					);
				}
				ret.value = value += "";
				if (name === "value" || value === elem.getAttribute(name)) {
					return value;
				}
			},
		};
		attrHandle.id =
			attrHandle.name =
			attrHandle.coords =
				function (elem, name, isXML) {
					var ret;
					if (!isXML) {
						return (ret = elem.getAttributeNode(name)) && ret.value !== ""
							? ret.value
							: null;
					}
				};
		jQuery.valHooks.button = {
			get: function (elem, name) {
				var ret = elem.getAttributeNode(name);
				if (ret && ret.specified) {
					return ret.value;
				}
			},
			set: nodeHook.set,
		};
		jQuery.attrHooks.contenteditable = {
			set: function (elem, value, name) {
				nodeHook.set(elem, value === "" ? false : value, name);
			},
		};
		jQuery.each(["width", "height"], function (i, name) {
			jQuery.attrHooks[name] = {
				set: function (elem, value) {
					if (value === "") {
						elem.setAttribute(name, "auto");
						return value;
					}
				},
			};
		});
	}
	if (!support.style) {
		jQuery.attrHooks.style = {
			get: function (elem) {
				return elem.style.cssText || undefined;
			},
			set: function (elem, value) {
				return (elem.style.cssText = value + "");
			},
		};
	}
	var rfocusable = /^(?:input|select|textarea|button|object)$/i,
		rclickable = /^(?:a|area)$/i;
	jQuery.fn.extend({
		prop: function (name, value) {
			return access(this, jQuery.prop, name, value, arguments.length > 1);
		},
		removeProp: function (name) {
			name = jQuery.propFix[name] || name;
			return this.each(function () {
				try {
					this[name] = undefined;
					delete this[name];
				} catch (e) {}
			});
		},
	});
	jQuery.extend({
		propFix: {for: "htmlFor", class: "className"},
		prop: function (elem, name, value) {
			var ret,
				hooks,
				notxml,
				nType = elem.nodeType;
			if (!elem || nType === 3 || nType === 8 || nType === 2) {
				return;
			}
			notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
			if (notxml) {
				name = jQuery.propFix[name] || name;
				hooks = jQuery.propHooks[name];
			}
			if (value !== undefined) {
				return hooks &&
					"set" in hooks &&
					(ret = hooks.set(elem, value, name)) !== undefined
					? ret
					: (elem[name] = value);
			} else {
				return hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null
					? ret
					: elem[name];
			}
		},
		propHooks: {
			tabIndex: {
				get: function (elem) {
					var tabindex = jQuery.find.attr(elem, "tabindex");
					return tabindex
						? parseInt(tabindex, 10)
						: rfocusable.test(elem.nodeName) ||
						  (rclickable.test(elem.nodeName) && elem.href)
						? 0
						: -1;
				},
			},
		},
	});
	if (!support.hrefNormalized) {
		jQuery.each(["href", "src"], function (i, name) {
			jQuery.propHooks[name] = {
				get: function (elem) {
					return elem.getAttribute(name, 4);
				},
			};
		});
	}
	if (!support.optSelected) {
		jQuery.propHooks.selected = {
			get: function (elem) {
				var parent = elem.parentNode;
				if (parent) {
					parent.selectedIndex;
					if (parent.parentNode) {
						parent.parentNode.selectedIndex;
					}
				}
				return null;
			},
		};
	}
	jQuery.each(
		[
			"tabIndex",
			"readOnly",
			"maxLength",
			"cellSpacing",
			"cellPadding",
			"rowSpan",
			"colSpan",
			"useMap",
			"frameBorder",
			"contentEditable",
		],
		function () {
			jQuery.propFix[this.toLowerCase()] = this;
		}
	);
	if (!support.enctype) {
		jQuery.propFix.enctype = "encoding";
	}
	var rclass = /[\t\r\n\f]/g;
	jQuery.fn.extend({
		addClass: function (value) {
			var classes,
				elem,
				cur,
				clazz,
				j,
				finalValue,
				i = 0,
				len = this.length,
				proceed = typeof value === "string" && value;
			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).addClass(value.call(this, j, this.className));
				});
			}
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur =
						elem.nodeType === 1 &&
						(elem.className
							? (" " + elem.className + " ").replace(rclass, " ")
							: " ");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							if (cur.indexOf(" " + clazz + " ") < 0) {
								cur += clazz + " ";
							}
						}
						finalValue = jQuery.trim(cur);
						if (elem.className !== finalValue) {
							elem.className = finalValue;
						}
					}
				}
			}
			return this;
		},
		removeClass: function (value) {
			var classes,
				elem,
				cur,
				clazz,
				j,
				finalValue,
				i = 0,
				len = this.length,
				proceed =
					arguments.length === 0 || (typeof value === "string" && value);
			if (jQuery.isFunction(value)) {
				return this.each(function (j) {
					jQuery(this).removeClass(value.call(this, j, this.className));
				});
			}
			if (proceed) {
				classes = (value || "").match(rnotwhite) || [];
				for (; i < len; i++) {
					elem = this[i];
					cur =
						elem.nodeType === 1 &&
						(elem.className
							? (" " + elem.className + " ").replace(rclass, " ")
							: "");
					if (cur) {
						j = 0;
						while ((clazz = classes[j++])) {
							while (cur.indexOf(" " + clazz + " ") >= 0) {
								cur = cur.replace(" " + clazz + " ", " ");
							}
						}
						finalValue = value ? jQuery.trim(cur) : "";
						if (elem.className !== finalValue) {
							elem.className = finalValue;
						}
					}
				}
			}
			return this;
		},
		toggleClass: function (value, stateVal) {
			var type = typeof value;
			if (typeof stateVal === "boolean" && type === "string") {
				return stateVal ? this.addClass(value) : this.removeClass(value);
			}
			if (jQuery.isFunction(value)) {
				return this.each(function (i) {
					jQuery(this).toggleClass(
						value.call(this, i, this.className, stateVal),
						stateVal
					);
				});
			}
			return this.each(function () {
				if (type === "string") {
					var className,
						i = 0,
						self = jQuery(this),
						classNames = value.match(rnotwhite) || [];
					while ((className = classNames[i++])) {
						if (self.hasClass(className)) {
							self.removeClass(className);
						} else {
							self.addClass(className);
						}
					}
				} else if (type === strundefined || type === "boolean") {
					if (this.className) {
						jQuery._data(this, "__className__", this.className);
					}
					this.className =
						this.className || value === false
							? ""
							: jQuery._data(this, "__className__") || "";
				}
			});
		},
		hasClass: function (selector) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for (; i < l; i++) {
				if (
					this[i].nodeType === 1 &&
					(" " + this[i].className + " ")
						.replace(rclass, " ")
						.indexOf(className) >= 0
				) {
					return true;
				}
			}
			return false;
		},
	});
	jQuery.each(
		(
			"blur focus focusin focusout load resize scroll unload click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup error contextmenu"
		).split(" "),
		function (i, name) {
			jQuery.fn[name] = function (data, fn) {
				return arguments.length > 0
					? this.on(name, null, data, fn)
					: this.trigger(name);
			};
		}
	);
	jQuery.fn.extend({
		hover: function (fnOver, fnOut) {
			return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
		},
		bind: function (types, data, fn) {
			return this.on(types, null, data, fn);
		},
		unbind: function (types, fn) {
			return this.off(types, null, fn);
		},
		delegate: function (selector, types, data, fn) {
			return this.on(types, selector, data, fn);
		},
		undelegate: function (selector, types, fn) {
			return arguments.length === 1
				? this.off(selector, "**")
				: this.off(types, selector || "**", fn);
		},
	});
	var nonce = jQuery.now();
	var rquery = /\?/;
	var rvalidtokens =
		/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	jQuery.parseJSON = function (data) {
		if (window.JSON && window.JSON.parse) {
			return window.JSON.parse(data + "");
		}
		var requireNonComma,
			depth = null,
			str = jQuery.trim(data + "");
		return str &&
			!jQuery.trim(
				str.replace(rvalidtokens, function (token, comma, open, close) {
					if (requireNonComma && comma) {
						depth = 0;
					}
					if (depth === 0) {
						return token;
					}
					requireNonComma = open || comma;
					depth += !close - !open;
					return "";
				})
			)
			? Function("return " + str)()
			: jQuery.error("Invalid JSON: " + data);
	};
	jQuery.parseXML = function (data) {
		var xml, tmp;
		if (!data || typeof data !== "string") {
			return null;
		}
		try {
			if (window.DOMParser) {
				tmp = new DOMParser();
				xml = tmp.parseFromString(data, "text/xml");
			} else {
				xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = "false";
				xml.loadXML(data);
			}
		} catch (e) {
			xml = undefined;
		}
		if (
			!xml ||
			!xml.documentElement ||
			xml.getElementsByTagName("parsererror").length
		) {
			jQuery.error("Invalid XML: " + data);
		}
		return xml;
	};
	var ajaxLocParts,
		ajaxLocation,
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
		rlocalProtocol =
			/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
		prefilters = {},
		transports = {},
		allTypes = "*/".concat("*");
	try {
		ajaxLocation = location.href;
	} catch (e) {
		ajaxLocation = document.createElement("a");
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
	function addToPrefiltersOrTransports(structure) {
		return function (dataTypeExpression, func) {
			if (typeof dataTypeExpression !== "string") {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
			if (jQuery.isFunction(func)) {
				while ((dataType = dataTypes[i++])) {
					if (dataType.charAt(0) === "+") {
						dataType = dataType.slice(1) || "*";
						(structure[dataType] = structure[dataType] || []).unshift(func);
					} else {
						(structure[dataType] = structure[dataType] || []).push(func);
					}
				}
			}
		};
	}
	function inspectPrefiltersOrTransports(
		structure,
		options,
		originalOptions,
		jqXHR
	) {
		var inspected = {},
			seekingTransport = structure === transports;
		function inspect(dataType) {
			var selected;
			inspected[dataType] = true;
			jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
				var dataTypeOrTransport = prefilterOrFactory(
					options,
					originalOptions,
					jqXHR
				);
				if (
					typeof dataTypeOrTransport === "string" &&
					!seekingTransport &&
					!inspected[dataTypeOrTransport]
				) {
					options.dataTypes.unshift(dataTypeOrTransport);
					inspect(dataTypeOrTransport);
					return false;
				} else if (seekingTransport) {
					return !(selected = dataTypeOrTransport);
				}
			});
			return selected;
		}
		return inspect(options.dataTypes[0]) || (!inspected["*"] && inspect("*"));
	}
	function ajaxExtend(target, src) {
		var deep,
			key,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for (key in src) {
			if (src[key] !== undefined) {
				(flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
			}
		}
		if (deep) {
			jQuery.extend(true, target, deep);
		}
		return target;
	}
	function ajaxHandleResponses(s, jqXHR, responses) {
		var firstDataType,
			ct,
			finalDataType,
			type,
			contents = s.contents,
			dataTypes = s.dataTypes;
		while (dataTypes[0] === "*") {
			dataTypes.shift();
			if (ct === undefined) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
		if (ct) {
			for (type in contents) {
				if (contents[type] && contents[type].test(ct)) {
					dataTypes.unshift(type);
					break;
				}
			}
		}
		if (dataTypes[0] in responses) {
			finalDataType = dataTypes[0];
		} else {
			for (type in responses) {
				if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
					finalDataType = type;
					break;
				}
				if (!firstDataType) {
					firstDataType = type;
				}
			}
			finalDataType = finalDataType || firstDataType;
		}
		if (finalDataType) {
			if (finalDataType !== dataTypes[0]) {
				dataTypes.unshift(finalDataType);
			}
			return responses[finalDataType];
		}
	}
	function ajaxConvert(s, response, jqXHR, isSuccess) {
		var conv2,
			current,
			conv,
			tmp,
			prev,
			converters = {},
			dataTypes = s.dataTypes.slice();
		if (dataTypes[1]) {
			for (conv in s.converters) {
				converters[conv.toLowerCase()] = s.converters[conv];
			}
		}
		current = dataTypes.shift();
		while (current) {
			if (s.responseFields[current]) {
				jqXHR[s.responseFields[current]] = response;
			}
			if (!prev && isSuccess && s.dataFilter) {
				response = s.dataFilter(response, s.dataType);
			}
			prev = current;
			current = dataTypes.shift();
			if (current) {
				if (current === "*") {
					current = prev;
				} else if (prev !== "*" && prev !== current) {
					conv = converters[prev + " " + current] || converters["* " + current];
					if (!conv) {
						for (conv2 in converters) {
							tmp = conv2.split(" ");
							if (tmp[1] === current) {
								conv =
									converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
								if (conv) {
									if (conv === true) {
										conv = converters[conv2];
									} else if (converters[conv2] !== true) {
										current = tmp[0];
										dataTypes.unshift(tmp[1]);
									}
									break;
								}
							}
						}
					}
					if (conv !== true) {
						if (conv && s["throws"]) {
							response = conv(response);
						} else {
							try {
								response = conv(response);
							} catch (e) {
								return {
									state: "parsererror",
									error: conv
										? e
										: "No conversion from " + prev + " to " + current,
								};
							}
						}
					}
				}
			}
		}
		return {state: "success", data: response};
	}
	jQuery.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test(ajaxLocParts[1]),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript",
			},
			contents: {xml: /xml/, html: /html/, json: /json/},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON",
			},
			converters: {
				"* text": String,
				"text html": true,
				"text json": jQuery.parseJSON,
				"text xml": jQuery.parseXML,
			},
			flatOptions: {url: true, context: true},
		},
		ajaxSetup: function (target, settings) {
			return settings
				? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
				: ajaxExtend(jQuery.ajaxSettings, target);
		},
		ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
		ajaxTransport: addToPrefiltersOrTransports(transports),
		ajax: function (url, options) {
			if (typeof url === "object") {
				options = url;
				url = undefined;
			}
			options = options || {};
			var parts,
				i,
				cacheURL,
				responseHeadersString,
				timeoutTimer,
				fireGlobals,
				transport,
				responseHeaders,
				s = jQuery.ajaxSetup({}, options),
				callbackContext = s.context || s,
				globalEventContext =
					s.context && (callbackContext.nodeType || callbackContext.jquery)
						? jQuery(callbackContext)
						: jQuery.event,
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				statusCode = s.statusCode || {},
				requestHeaders = {},
				requestHeadersNames = {},
				state = 0,
				strAbort = "canceled",
				jqXHR = {
					readyState: 0,
					getResponseHeader: function (key) {
						var match;
						if (state === 2) {
							if (!responseHeaders) {
								responseHeaders = {};
								while ((match = rheaders.exec(responseHeadersString))) {
									responseHeaders[match[1].toLowerCase()] = match[2];
								}
							}
							match = responseHeaders[key.toLowerCase()];
						}
						return match == null ? null : match;
					},
					getAllResponseHeaders: function () {
						return state === 2 ? responseHeadersString : null;
					},
					setRequestHeader: function (name, value) {
						var lname = name.toLowerCase();
						if (!state) {
							name = requestHeadersNames[lname] =
								requestHeadersNames[lname] || name;
							requestHeaders[name] = value;
						}
						return this;
					},
					overrideMimeType: function (type) {
						if (!state) {
							s.mimeType = type;
						}
						return this;
					},
					statusCode: function (map) {
						var code;
						if (map) {
							if (state < 2) {
								for (code in map) {
									statusCode[code] = [statusCode[code], map[code]];
								}
							} else {
								jqXHR.always(map[jqXHR.status]);
							}
						}
						return this;
					},
					abort: function (statusText) {
						var finalText = statusText || strAbort;
						if (transport) {
							transport.abort(finalText);
						}
						done(0, finalText);
						return this;
					},
				};
			deferred.promise(jqXHR).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			s.url = ((url || s.url || ajaxLocation) + "")
				.replace(rhash, "")
				.replace(rprotocol, ajaxLocParts[1] + "//");
			s.type = options.method || options.type || s.method || s.type;
			s.dataTypes = jQuery
				.trim(s.dataType || "*")
				.toLowerCase()
				.match(rnotwhite) || [""];
			if (s.crossDomain == null) {
				parts = rurl.exec(s.url.toLowerCase());
				s.crossDomain = !!(
					parts &&
					(parts[1] !== ajaxLocParts[1] ||
						parts[2] !== ajaxLocParts[2] ||
						(parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
							(ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
				);
			}
			if (s.data && s.processData && typeof s.data !== "string") {
				s.data = jQuery.param(s.data, s.traditional);
			}
			inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
			if (state === 2) {
				return jqXHR;
			}
			fireGlobals = s.global;
			if (fireGlobals && jQuery.active++ === 0) {
				jQuery.event.trigger("ajaxStart");
			}
			s.type = s.type.toUpperCase();
			s.hasContent = !rnoContent.test(s.type);
			cacheURL = s.url;
			if (!s.hasContent) {
				if (s.data) {
					cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
					delete s.data;
				}
				if (s.cache === false) {
					s.url = rts.test(cacheURL)
						? cacheURL.replace(rts, "$1_=" + nonce++)
						: cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
				}
			}
			if (s.ifModified) {
				if (jQuery.lastModified[cacheURL]) {
					jqXHR.setRequestHeader(
						"If-Modified-Since",
						jQuery.lastModified[cacheURL]
					);
				}
				if (jQuery.etag[cacheURL]) {
					jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
				}
			}
			if (
				(s.data && s.hasContent && s.contentType !== false) ||
				options.contentType
			) {
				jqXHR.setRequestHeader("Content-Type", s.contentType);
			}
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[0] && s.accepts[s.dataTypes[0]]
					? s.accepts[s.dataTypes[0]] +
							(s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "")
					: s.accepts["*"]
			);
			for (i in s.headers) {
				jqXHR.setRequestHeader(i, s.headers[i]);
			}
			if (
				s.beforeSend &&
				(s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)
			) {
				return jqXHR.abort();
			}
			strAbort = "abort";
			for (i in {success: 1, error: 1, complete: 1}) {
				jqXHR[i](s[i]);
			}
			transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
			if (!transport) {
				done(-1, "No Transport");
			} else {
				jqXHR.readyState = 1;
				if (fireGlobals) {
					globalEventContext.trigger("ajaxSend", [jqXHR, s]);
				}
				if (s.async && s.timeout > 0) {
					timeoutTimer = setTimeout(function () {
						jqXHR.abort("timeout");
					}, s.timeout);
				}
				try {
					state = 1;
					transport.send(requestHeaders, done);
				} catch (e) {
					if (state < 2) {
						done(-1, e);
					} else {
						throw e;
					}
				}
			}
			function done(status, nativeStatusText, responses, headers) {
				var isSuccess,
					success,
					error,
					response,
					modified,
					statusText = nativeStatusText;
				if (state === 2) {
					return;
				}
				state = 2;
				if (timeoutTimer) {
					clearTimeout(timeoutTimer);
				}
				transport = undefined;
				responseHeadersString = headers || "";
				jqXHR.readyState = status > 0 ? 4 : 0;
				isSuccess = (status >= 200 && status < 300) || status === 304;
				if (responses) {
					response = ajaxHandleResponses(s, jqXHR, responses);
				}
				response = ajaxConvert(s, response, jqXHR, isSuccess);
				if (isSuccess) {
					if (s.ifModified) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if (modified) {
							jQuery.lastModified[cacheURL] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if (modified) {
							jQuery.etag[cacheURL] = modified;
						}
					}
					if (status === 204 || s.type === "HEAD") {
						statusText = "nocontent";
					} else if (status === 304) {
						statusText = "notmodified";
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					error = statusText;
					if (status || !statusText) {
						statusText = "error";
						if (status < 0) {
							status = 0;
						}
					}
				}
				jqXHR.status = status;
				jqXHR.statusText = (nativeStatusText || statusText) + "";
				if (isSuccess) {
					deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
				} else {
					deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
				}
				jqXHR.statusCode(statusCode);
				statusCode = undefined;
				if (fireGlobals) {
					globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [
						jqXHR,
						s,
						isSuccess ? success : error,
					]);
				}
				completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
				if (fireGlobals) {
					globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
					if (!--jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
			return jqXHR;
		},
		getJSON: function (url, data, callback) {
			return jQuery.get(url, data, callback, "json");
		},
		getScript: function (url, callback) {
			return jQuery.get(url, undefined, callback, "script");
		},
	});
	jQuery.each(["get", "post"], function (i, method) {
		jQuery[method] = function (url, data, callback, type) {
			if (jQuery.isFunction(data)) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback,
			});
		};
	});
	jQuery.each(
		[
			"ajaxStart",
			"ajaxStop",
			"ajaxComplete",
			"ajaxError",
			"ajaxSuccess",
			"ajaxSend",
		],
		function (i, type) {
			jQuery.fn[type] = function (fn) {
				return this.on(type, fn);
			};
		}
	);
	jQuery._evalUrl = function (url) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			throws: true,
		});
	};
	jQuery.fn.extend({
		wrapAll: function (html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapAll(html.call(this, i));
				});
			}
			if (this[0]) {
				var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
				if (this[0].parentNode) {
					wrap.insertBefore(this[0]);
				}
				wrap
					.map(function () {
						var elem = this;
						while (elem.firstChild && elem.firstChild.nodeType === 1) {
							elem = elem.firstChild;
						}
						return elem;
					})
					.append(this);
			}
			return this;
		},
		wrapInner: function (html) {
			if (jQuery.isFunction(html)) {
				return this.each(function (i) {
					jQuery(this).wrapInner(html.call(this, i));
				});
			}
			return this.each(function () {
				var self = jQuery(this),
					contents = self.contents();
				if (contents.length) {
					contents.wrapAll(html);
				} else {
					self.append(html);
				}
			});
		},
		wrap: function (html) {
			var isFunction = jQuery.isFunction(html);
			return this.each(function (i) {
				jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
			});
		},
		unwrap: function () {
			return this.parent()
				.each(function () {
					if (!jQuery.nodeName(this, "body")) {
						jQuery(this).replaceWith(this.childNodes);
					}
				})
				.end();
		},
	});
	jQuery.expr.filters.hidden = function (elem) {
		return (
			(elem.offsetWidth <= 0 && elem.offsetHeight <= 0) ||
			(!support.reliableHiddenOffsets() &&
				((elem.style && elem.style.display) || jQuery.css(elem, "display")) ===
					"none")
		);
	};
	jQuery.expr.filters.visible = function (elem) {
		return !jQuery.expr.filters.hidden(elem);
	};
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	function buildParams(prefix, obj, traditional, add) {
		var name;
		if (jQuery.isArray(obj)) {
			jQuery.each(obj, function (i, v) {
				if (traditional || rbracket.test(prefix)) {
					add(prefix, v);
				} else {
					buildParams(
						prefix + "[" + (typeof v === "object" ? i : "") + "]",
						v,
						traditional,
						add
					);
				}
			});
		} else if (!traditional && jQuery.type(obj) === "object") {
			for (name in obj) {
				buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
			}
		} else {
			add(prefix, obj);
		}
	}
	jQuery.param = function (a, traditional) {
		var prefix,
			s = [],
			add = function (key, value) {
				value = jQuery.isFunction(value) ? value() : value == null ? "" : value;
				s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
			};
		if (traditional === undefined) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
		if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {
			jQuery.each(a, function () {
				add(this.name, this.value);
			});
		} else {
			for (prefix in a) {
				buildParams(prefix, a[prefix], traditional, add);
			}
		}
		return s.join("&").replace(r20, "+");
	};
	jQuery.fn.extend({
		serialize: function () {
			return jQuery.param(this.serializeArray());
		},
		serializeArray: function () {
			return this.map(function () {
				var elements = jQuery.prop(this, "elements");
				return elements ? jQuery.makeArray(elements) : this;
			})
				.filter(function () {
					var type = this.type;
					return (
						this.name &&
						!jQuery(this).is(":disabled") &&
						rsubmittable.test(this.nodeName) &&
						!rsubmitterTypes.test(type) &&
						(this.checked || !rcheckableType.test(type))
					);
				})
				.map(function (i, elem) {
					var val = jQuery(this).val();
					return val == null
						? null
						: jQuery.isArray(val)
						? jQuery.map(val, function (val) {
								return {name: elem.name, value: val.replace(rCRLF, "\r\n")};
						  })
						: {name: elem.name, value: val.replace(rCRLF, "\r\n")};
				})
				.get();
		},
	});
	jQuery.ajaxSettings.xhr =
		window.ActiveXObject !== undefined
			? function () {
					return (
						(!this.isLocal &&
							/^(get|post|head|put|delete|options)$/i.test(this.type) &&
							createStandardXHR()) ||
						createActiveXHR()
					);
			  }
			: createStandardXHR;
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSupported = jQuery.ajaxSettings.xhr();
	if (window.ActiveXObject) {
		jQuery(window).on("unload", function () {
			for (var key in xhrCallbacks) {
				xhrCallbacks[key](undefined, true);
			}
		});
	}
	support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
	xhrSupported = support.ajax = !!xhrSupported;
	if (xhrSupported) {
		jQuery.ajaxTransport(function (options) {
			if (!options.crossDomain || support.cors) {
				var callback;
				return {
					send: function (headers, complete) {
						var i,
							xhr = options.xhr(),
							id = ++xhrId;
						xhr.open(
							options.type,
							options.url,
							options.async,
							options.username,
							options.password
						);
						if (options.xhrFields) {
							for (i in options.xhrFields) {
								xhr[i] = options.xhrFields[i];
							}
						}
						if (options.mimeType && xhr.overrideMimeType) {
							xhr.overrideMimeType(options.mimeType);
						}
						if (!options.crossDomain && !headers["X-Requested-With"]) {
							headers["X-Requested-With"] = "XMLHttpRequest";
						}
						for (i in headers) {
							if (headers[i] !== undefined) {
								xhr.setRequestHeader(i, headers[i] + "");
							}
						}
						xhr.send((options.hasContent && options.data) || null);
						callback = function (_, isAbort) {
							var status, statusText, responses;
							if (callback && (isAbort || xhr.readyState === 4)) {
								delete xhrCallbacks[id];
								callback = undefined;
								xhr.onreadystatechange = jQuery.noop;
								if (isAbort) {
									if (xhr.readyState !== 4) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									if (typeof xhr.responseText === "string") {
										responses.text = xhr.responseText;
									}
									try {
										statusText = xhr.statusText;
									} catch (e) {
										statusText = "";
									}
									if (!status && options.isLocal && !options.crossDomain) {
										status = responses.text ? 200 : 404;
									} else if (status === 1223) {
										status = 204;
									}
								}
							}
							if (responses) {
								complete(
									status,
									statusText,
									responses,
									xhr.getAllResponseHeaders()
								);
							}
						};
						if (!options.async) {
							callback();
						} else if (xhr.readyState === 4) {
							setTimeout(callback);
						} else {
							xhr.onreadystatechange = xhrCallbacks[id] = callback;
						}
					},
					abort: function () {
						if (callback) {
							callback(undefined, true);
						}
					},
				};
			}
		});
	}
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch (e) {}
	}
	function createActiveXHR() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {}
	}
	jQuery.ajaxSetup({
		accepts: {
			script:
				"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
		},
		contents: {script: /(?:java|ecma)script/},
		converters: {
			"text script": function (text) {
				jQuery.globalEval(text);
				return text;
			},
		},
	});
	jQuery.ajaxPrefilter("script", function (s) {
		if (s.cache === undefined) {
			s.cache = false;
		}
		if (s.crossDomain) {
			s.type = "GET";
			s.global = false;
		}
	});
	jQuery.ajaxTransport("script", function (s) {
		if (s.crossDomain) {
			var script,
				head = document.head || jQuery("head")[0] || document.documentElement;
			return {
				send: function (_, callback) {
					script = document.createElement("script");
					script.async = true;
					if (s.scriptCharset) {
						script.charset = s.scriptCharset;
					}
					script.src = s.url;
					script.onload = script.onreadystatechange = function (_, isAbort) {
						if (
							isAbort ||
							!script.readyState ||
							/loaded|complete/.test(script.readyState)
						) {
							script.onload = script.onreadystatechange = null;
							if (script.parentNode) {
								script.parentNode.removeChild(script);
							}
							script = null;
							if (!isAbort) {
								callback(200, "success");
							}
						}
					};
					head.insertBefore(script, head.firstChild);
				},
				abort: function () {
					if (script) {
						script.onload(undefined, true);
					}
				},
			};
		}
	});
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce++;
			this[callback] = true;
			return callback;
		},
	});
	jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
		var callbackName,
			overwritten,
			responseContainer,
			jsonProp =
				s.jsonp !== false &&
				(rjsonp.test(s.url)
					? "url"
					: typeof s.data === "string" &&
					  !(s.contentType || "").indexOf(
							"application/x-www-form-urlencoded"
					  ) &&
					  rjsonp.test(s.data) &&
					  "data");
		if (jsonProp || s.dataTypes[0] === "jsonp") {
			callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback)
				? s.jsonpCallback()
				: s.jsonpCallback;
			if (jsonProp) {
				s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
			} else if (s.jsonp !== false) {
				s.url +=
					(rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
			}
			s.converters["script json"] = function () {
				if (!responseContainer) {
					jQuery.error(callbackName + " was not called");
				}
				return responseContainer[0];
			};
			s.dataTypes[0] = "json";
			overwritten = window[callbackName];
			window[callbackName] = function () {
				responseContainer = arguments;
			};
			jqXHR.always(function () {
				window[callbackName] = overwritten;
				if (s[callbackName]) {
					s.jsonpCallback = originalSettings.jsonpCallback;
					oldCallbacks.push(callbackName);
				}
				if (responseContainer && jQuery.isFunction(overwritten)) {
					overwritten(responseContainer[0]);
				}
				responseContainer = overwritten = undefined;
			});
			return "script";
		}
	});
	jQuery.parseHTML = function (data, context, keepScripts) {
		if (!data || typeof data !== "string") {
			return null;
		}
		if (typeof context === "boolean") {
			keepScripts = context;
			context = false;
		}
		context = context || document;
		var parsed = rsingleTag.exec(data),
			scripts = !keepScripts && [];
		if (parsed) {
			return [context.createElement(parsed[1])];
		}
		parsed = jQuery.buildFragment([data], context, scripts);
		if (scripts && scripts.length) {
			jQuery(scripts).remove();
		}
		return jQuery.merge([], parsed.childNodes);
	};
	var _load = jQuery.fn.load;
	jQuery.fn.load = function (url, params, callback) {
		if (typeof url !== "string" && _load) {
			return _load.apply(this, arguments);
		}
		var selector,
			response,
			type,
			self = this,
			off = url.indexOf(" ");
		if (off >= 0) {
			selector = url.slice(off, url.length);
			url = url.slice(0, off);
		}
		if (jQuery.isFunction(params)) {
			callback = params;
			params = undefined;
		} else if (params && typeof params === "object") {
			type = "POST";
		}
		if (self.length > 0) {
			jQuery
				.ajax({url: url, type: type, dataType: "html", data: params})
				.done(function (responseText) {
					response = arguments;
					self.html(
						selector
							? jQuery("<div>")
									.append(jQuery.parseHTML(responseText))
									.find(selector)
							: responseText
					);
				})
				.complete(
					callback &&
						function (jqXHR, status) {
							self.each(
								callback,
								response || [jqXHR.responseText, status, jqXHR]
							);
						}
				);
		}
		return this;
	};
	jQuery.expr.filters.animated = function (elem) {
		return jQuery.grep(jQuery.timers, function (fn) {
			return elem === fn.elem;
		}).length;
	};
	var docElem = window.document.documentElement;
	function getWindow(elem) {
		return jQuery.isWindow(elem)
			? elem
			: elem.nodeType === 9
			? elem.defaultView || elem.parentWindow
			: false;
	}
	jQuery.offset = {
		setOffset: function (elem, options, i) {
			var curPosition,
				curLeft,
				curCSSTop,
				curTop,
				curOffset,
				curCSSLeft,
				calculatePosition,
				position = jQuery.css(elem, "position"),
				curElem = jQuery(elem),
				props = {};
			if (position === "static") {
				elem.style.position = "relative";
			}
			curOffset = curElem.offset();
			curCSSTop = jQuery.css(elem, "top");
			curCSSLeft = jQuery.css(elem, "left");
			calculatePosition =
				(position === "absolute" || position === "fixed") &&
				jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
			if (calculatePosition) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat(curCSSTop) || 0;
				curLeft = parseFloat(curCSSLeft) || 0;
			}
			if (jQuery.isFunction(options)) {
				options = options.call(elem, i, curOffset);
			}
			if (options.top != null) {
				props.top = options.top - curOffset.top + curTop;
			}
			if (options.left != null) {
				props.left = options.left - curOffset.left + curLeft;
			}
			if ("using" in options) {
				options.using.call(elem, props);
			} else {
				curElem.css(props);
			}
		},
	};
	jQuery.fn.extend({
		offset: function (options) {
			if (arguments.length) {
				return options === undefined
					? this
					: this.each(function (i) {
							jQuery.offset.setOffset(this, options, i);
					  });
			}
			var docElem,
				win,
				box = {top: 0, left: 0},
				elem = this[0],
				doc = elem && elem.ownerDocument;
			if (!doc) {
				return;
			}
			docElem = doc.documentElement;
			if (!jQuery.contains(docElem, elem)) {
				return box;
			}
			if (typeof elem.getBoundingClientRect !== strundefined) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow(doc);
			return {
				top:
					box.top +
					(win.pageYOffset || docElem.scrollTop) -
					(docElem.clientTop || 0),
				left:
					box.left +
					(win.pageXOffset || docElem.scrollLeft) -
					(docElem.clientLeft || 0),
			};
		},
		position: function () {
			if (!this[0]) {
				return;
			}
			var offsetParent,
				offset,
				parentOffset = {top: 0, left: 0},
				elem = this[0];
			if (jQuery.css(elem, "position") === "fixed") {
				offset = elem.getBoundingClientRect();
			} else {
				offsetParent = this.offsetParent();
				offset = this.offset();
				if (!jQuery.nodeName(offsetParent[0], "html")) {
					parentOffset = offsetParent.offset();
				}
				parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
				parentOffset.left += jQuery.css(
					offsetParent[0],
					"borderLeftWidth",
					true
				);
			}
			return {
				top:
					offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
				left:
					offset.left -
					parentOffset.left -
					jQuery.css(elem, "marginLeft", true),
			};
		},
		offsetParent: function () {
			return this.map(function () {
				var offsetParent = this.offsetParent || docElem;
				while (
					offsetParent &&
					!jQuery.nodeName(offsetParent, "html") &&
					jQuery.css(offsetParent, "position") === "static"
				) {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent || docElem;
			});
		},
	});
	jQuery.each(
		{scrollLeft: "pageXOffset", scrollTop: "pageYOffset"},
		function (method, prop) {
			var top = /Y/.test(prop);
			jQuery.fn[method] = function (val) {
				return access(
					this,
					function (elem, method, val) {
						var win = getWindow(elem);
						if (val === undefined) {
							return win
								? prop in win
									? win[prop]
									: win.document.documentElement[method]
								: elem[method];
						}
						if (win) {
							win.scrollTo(
								!top ? val : jQuery(win).scrollLeft(),
								top ? val : jQuery(win).scrollTop()
							);
						} else {
							elem[method] = val;
						}
					},
					method,
					val,
					arguments.length,
					null
				);
			};
		}
	);
	jQuery.each(["top", "left"], function (i, prop) {
		jQuery.cssHooks[prop] = addGetHookIf(
			support.pixelPosition,
			function (elem, computed) {
				if (computed) {
					computed = curCSS(elem, prop);
					return rnumnonpx.test(computed)
						? jQuery(elem).position()[prop] + "px"
						: computed;
				}
			}
		);
	});
	jQuery.each({Height: "height", Width: "width"}, function (name, type) {
		jQuery.each(
			{padding: "inner" + name, content: type, "": "outer" + name},
			function (defaultExtra, funcName) {
				jQuery.fn[funcName] = function (margin, value) {
					var chainable =
							arguments.length && (defaultExtra || typeof margin !== "boolean"),
						extra =
							defaultExtra ||
							(margin === true || value === true ? "margin" : "border");
					return access(
						this,
						function (elem, type, value) {
							var doc;
							if (jQuery.isWindow(elem)) {
								return elem.document.documentElement["client" + name];
							}
							if (elem.nodeType === 9) {
								doc = elem.documentElement;
								return Math.max(
									elem.body["scroll" + name],
									doc["scroll" + name],
									elem.body["offset" + name],
									doc["offset" + name],
									doc["client" + name]
								);
							}
							return value === undefined
								? jQuery.css(elem, type, extra)
								: jQuery.style(elem, type, value, extra);
						},
						type,
						chainable ? margin : undefined,
						chainable,
						null
					);
				};
			}
		);
	});
	jQuery.fn.size = function () {
		return this.length;
	};
	jQuery.fn.andSelf = jQuery.fn.addBack;
	if (typeof define === "function" && define.amd) {
		define("jquery", [], function () {
			return jQuery;
		});
	}
	var _jQuery = window.jQuery,
		_$ = window.$;
	jQuery.noConflict = function (deep) {
		if (window.$ === jQuery) {
			window.$ = _$;
		}
		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}
		return jQuery;
	};
	if (typeof noGlobal === strundefined) {
		window.jQuery = window.$ = jQuery;
	}
	return jQuery;
});
(function ($, undefined) {
	var matched, browser, uaMatch;
	uaMatch = function (ua) {
		ua = ua.toLowerCase();
		var match =
			/(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			/(trident).*rv[ :]*([1-9][0-9])/.exec(ua) ||
			(ua.indexOf("compatible") < 0 &&
				/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
			[];
		return {browser: match[1] || "", version: match[2] || "0"};
	};
	if (!$.browser) {
		matched = uaMatch(navigator.userAgent);
		browser = {};
		if (matched.browser) {
			browser[matched.browser] = true;
			browser.version = matched.version;
		}
		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}
		if (browser.trident) {
			browser.msie = true;
		}
		$.browser = browser;
	}
})(jQuery);
(function ($) {
	if ($.browser.msie && parseInt($.browser.version, 10) === 8) {
		var html5Tags = [
			"section",
			"nav",
			"article",
			"aside",
			"header",
			"footer",
			"main",
			"figure",
			"figcaption",
			"data",
			"time",
			"mark",
			"ruby",
			"rt",
			"rp",
			"bdi",
			"wbr",
			"video",
			"audio",
			"source",
			"track",
			"canvas",
			"svg",
			"math",
			"datalist",
			"keygen",
			"output",
			"progress",
			"meter",
			"details",
			"summary",
			"menuitem",
			"menu",
		];
		for (var i = 0; i < html5Tags.length; i++) {
			document.createElement(html5Tags[i]);
		}
	}
})(jQuery);
window.diy = window.diy || {};
window.diy.cms = window.diy.cms || {};
window.diy.ux = window.diy.ux || {};
window.diy.api = window.diy.api || {};
(function ($) {
	if (!window.diy) {
		window.diy = {};
	}
	if (!window.diy.core) {
		window.diy.core = {};
	}
	window.diy.core = {
		dataObjectProperty: "diy-object",
		namespace: function (ns) {
			var pieces = ns.split(".");
			var base = window;
			while (pieces.length > 0) {
				var piece = pieces.shift();
				if (!base[piece]) {
					base[piece] = {};
				}
				base = base[piece];
			}
			return base;
		},
		namespaceExists: function (ns) {
			var pieces = ns.split(".");
			var base = window;
			while (pieces.length > 0) {
				var piece = pieces.shift();
				if (!base[piece]) {
					return false;
				}
				base = base[piece];
			}
			return true;
		},
		createObject: function (ns, el) {
			var clazz;
			if (typeof ns === "string") {
				if (!this.namespaceExists(ns)) {
					throw new Error("namespace " + ns + " doesn't exist");
				}
				clazz = this.namespace(ns);
			} else {
				clazz = ns;
			}
			if (!$.isFunction(clazz)) {
				throw new Error(ns + " is not a JavaScript class (function)");
			}
			var $el = $(el),
				options = $.extend($.parseJSON($el.attr("data-jsoptions") || "null"), {
					element: $el,
				});
			var obj = new clazz(options);
			this.setObject(el, obj);
			return obj;
		},
		getObject: function (el) {
			return $(el).data(this.dataObjectProperty);
		},
		setObject: function (el, obj) {
			$(el).data(this.dataObjectProperty, obj);
		},
	};
})(jQuery);
(function () {
	var initializing = false;
	var fnTest = /xyz/.test(function () {
		xyz;
	})
		? /\b_super\b/
		: /.*/;
	this.Klazz = function () {};
	Klazz.extend = function (Ctor, prop) {
		if (typeof prop === "undefined") {
			prop = Ctor;
			Ctor = Klazz;
		}
		return extendClass(Ctor, prop);
	};
	function extendClass(Ctor, prop) {
		var _super = Ctor.prototype;
		var prototype = Object.create(_super);
		for (var name in prop) {
			prototype[name] =
				typeof prop[name] == "function" &&
				((typeof _super[name] == "function" && fnTest.test(prop[name])) ||
					name === "initialize")
					? (function (name, fn) {
							return function () {
								var tmp = this._super;
								this._super = _super[name] || function () {};
								var ret = fn.apply(this, arguments);
								this._super = tmp;
								return ret;
							};
					  })(name, prop[name])
					: prop[name];
		}
		function Klazz() {
			Ctor.apply(this, arguments);
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}
		}
		Klazz.prototype = prototype;
		Klazz.constructor = Klazz;
		Klazz.extend = function (prop) {
			return extendClass(Klazz, prop);
		};
		return Klazz;
	}
	if (!Function.prototype.bind) {
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				throw new TypeError(
					"Function.prototype.bind - what is trying to be bound is not callable"
				);
			}
			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function () {},
				fBound = function () {
					return fToBind.apply(
						this instanceof fNOP && oThis ? this : oThis,
						aArgs.concat(Array.prototype.slice.call(arguments))
					);
				};
			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();
			return fBound;
		};
	}
	Function.prototype.curry = function () {
		if (!arguments.length) {
			return this;
		}
		var __method = this;
		var args = Array.prototype.slice.apply(arguments);
		return function () {
			return __method.apply(
				null,
				args.concat(Array.prototype.slice.apply(arguments))
			);
		};
	};
	Hashmap = Klazz.extend({
		initialize: function () {
			this._object = {};
		},
		_each: function (iterator) {
			for (var key in this._object) {
				if (this._object.hasOwnProperty(key)) {
					var value = this._object[key],
						pair = [key, value];
					pair.key = key;
					pair.value = value;
					iterator(pair);
				}
			}
		},
		set: function (key, value) {
			this._object[key] = value;
			return this._object[key];
		},
		get: function (key) {
			return this._object[key];
		},
		unset: function (key) {
			var value = this._object[key];
			delete this._object[key];
			return value;
		},
		collect: function () {
			iterator = this._object;
			var results = [];
			for (var key in this._object) {
				if (this._object.hasOwnProperty(key)) {
					var value = this._object[key];
					if (
						typeof key !== "undefined" &&
						typeof value !== "undefined" &&
						typeof value.url !== "undefined"
					) {
						results.push(value.url);
					}
				}
			}
			return results;
		},
		setHashmapObject: function (entryObject) {
			this._object = entryObject;
		},
	});
})();
jQuery.fn.generateObject = function (domObject) {
	var check = false;
	var domObject = jQuery(this);
	if (domObject || jQuery(domObject) || null) {
		domObject.each(function () {
			var t = jQuery(this);
			if (!jQuery.data(t.get(0), "object")) {
				var className = t.attr("data-jsclass") || null;
				var options = t.attr("data-jsoptions") || "";
				if (className) {
					var obj = null;
					eval("obj = new " + className + "({" + options + "});");
					if (obj) {
						if (jQuery.isFunction(obj.draw)) {
							obj.draw(t.parent(), false, t);
						}
						check = true;
					}
				}
			}
		});
	}
	return check;
};
jQuery.fn.cleanupGeneratedObject = function (domObject) {
	var check = false;
	var domObject = jQuery(this);
	if (domObject || jQuery(domObject) || null) {
		domObject.each(function () {
			var generatedObject = jQuery.data(jQuery(this).get(0), "object");
			if (generatedObject && jQuery.isFunction(generatedObject.destroy)) {
				generatedObject.destroy();
			}
			generatedObject = null;
		});
	}
	return check;
};
(function ($) {
	$.noConflict();
})(jQuery);
/*!
 * jQuery UI Core 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
(function ($, undefined) {
	var uuid = 0,
		runiqueId = /^ui-id-\d+$/;
	$.ui = $.ui || {};
	$.extend($.ui, {
		version: "1.10.4",
		keyCode: {
			BACKSPACE: 8,
			COMMA: 188,
			DELETE: 46,
			DOWN: 40,
			END: 35,
			ENTER: 13,
			ESCAPE: 27,
			HOME: 36,
			LEFT: 37,
			NUMPAD_ADD: 107,
			NUMPAD_DECIMAL: 110,
			NUMPAD_DIVIDE: 111,
			NUMPAD_ENTER: 108,
			NUMPAD_MULTIPLY: 106,
			NUMPAD_SUBTRACT: 109,
			PAGE_DOWN: 34,
			PAGE_UP: 33,
			PERIOD: 190,
			RIGHT: 39,
			SPACE: 32,
			TAB: 9,
			UP: 38,
		},
	});
	$.fn.extend({
		focus: (function (orig) {
			return function (delay, fn) {
				return typeof delay === "number"
					? this.each(function () {
							var elem = this;
							setTimeout(function () {
								$(elem).focus();
								if (fn) {
									fn.call(elem);
								}
							}, delay);
					  })
					: orig.apply(this, arguments);
			};
		})($.fn.focus),
		scrollParent: function () {
			var scrollParent;
			if (
				($.ui.ie && /(static|relative)/.test(this.css("position"))) ||
				/absolute/.test(this.css("position"))
			) {
				scrollParent = this.parents()
					.filter(function () {
						return (
							/(relative|absolute|fixed)/.test($.css(this, "position")) &&
							/(auto|scroll)/.test(
								$.css(this, "overflow") +
									$.css(this, "overflow-y") +
									$.css(this, "overflow-x")
							)
						);
					})
					.eq(0);
			} else {
				scrollParent = this.parents()
					.filter(function () {
						return /(auto|scroll)/.test(
							$.css(this, "overflow") +
								$.css(this, "overflow-y") +
								$.css(this, "overflow-x")
						);
					})
					.eq(0);
			}
			return /fixed/.test(this.css("position")) || !scrollParent.length
				? $(document)
				: scrollParent;
		},
		zIndex: function (zIndex) {
			if (zIndex !== undefined) {
				return this.css("zIndex", zIndex);
			}
			if (this.length) {
				var elem = $(this[0]),
					position,
					value;
				while (elem.length && elem[0] !== document) {
					position = elem.css("position");
					if (
						position === "absolute" ||
						position === "relative" ||
						position === "fixed"
					) {
						value = parseInt(elem.css("zIndex"), 10);
						if (!isNaN(value) && value !== 0) {
							return value;
						}
					}
					elem = elem.parent();
				}
			}
			return 0;
		},
		uniqueId: function () {
			return this.each(function () {
				if (!this.id) {
					this.id = "ui-id-" + ++uuid;
				}
			});
		},
		removeUniqueId: function () {
			return this.each(function () {
				if (runiqueId.test(this.id)) {
					$(this).removeAttr("id");
				}
			});
		},
	});
	function focusable(element, isTabIndexNotNaN) {
		var map,
			mapName,
			img,
			nodeName = element.nodeName.toLowerCase();
		if ("area" === nodeName) {
			map = element.parentNode;
			mapName = map.name;
			if (!element.href || !mapName || map.nodeName.toLowerCase() !== "map") {
				return false;
			}
			img = $("img[usemap=#" + mapName + "]")[0];
			return !!img && visible(img);
		}
		return (
			(/input|select|textarea|button|object/.test(nodeName)
				? !element.disabled
				: "a" === nodeName
				? element.href || isTabIndexNotNaN
				: isTabIndexNotNaN) && visible(element)
		);
	}
	function visible(element) {
		return (
			$.expr.filters.visible(element) &&
			!$(element)
				.parents()
				.addBack()
				.filter(function () {
					return $.css(this, "visibility") === "hidden";
				}).length
		);
	}
	$.extend($.expr[":"], {
		data: $.expr.createPseudo
			? $.expr.createPseudo(function (dataName) {
					return function (elem) {
						return !!$.data(elem, dataName);
					};
			  })
			: function (elem, i, match) {
					return !!$.data(elem, match[3]);
			  },
		focusable: function (element) {
			return focusable(element, !isNaN($.attr(element, "tabindex")));
		},
		tabbable: function (element) {
			var tabIndex = $.attr(element, "tabindex"),
				isTabIndexNaN = isNaN(tabIndex);
			return (
				(isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
			);
		},
	});
	if (!$("<a>").outerWidth(1).jquery) {
		$.each(["Width", "Height"], function (i, name) {
			var side = name === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
				type = name.toLowerCase(),
				orig = {
					innerWidth: $.fn.innerWidth,
					innerHeight: $.fn.innerHeight,
					outerWidth: $.fn.outerWidth,
					outerHeight: $.fn.outerHeight,
				};
			function reduce(elem, size, border, margin) {
				$.each(side, function () {
					size -= parseFloat($.css(elem, "padding" + this)) || 0;
					if (border) {
						size -= parseFloat($.css(elem, "border" + this + "Width")) || 0;
					}
					if (margin) {
						size -= parseFloat($.css(elem, "margin" + this)) || 0;
					}
				});
				return size;
			}
			$.fn["inner" + name] = function (size) {
				if (size === undefined) {
					return orig["inner" + name].call(this);
				}
				return this.each(function () {
					$(this).css(type, reduce(this, size) + "px");
				});
			};
			$.fn["outer" + name] = function (size, margin) {
				if (typeof size !== "number") {
					return orig["outer" + name].call(this, size);
				}
				return this.each(function () {
					$(this).css(type, reduce(this, size, true, margin) + "px");
				});
			};
		});
	}
	if (!$.fn.addBack) {
		$.fn.addBack = function (selector) {
			return this.add(
				selector == null ? this.prevObject : this.prevObject.filter(selector)
			);
		};
	}
	if ($("<a>").data("a-b", "a").removeData("a-b").data("a-b")) {
		$.fn.removeData = (function (removeData) {
			return function (key) {
				if (arguments.length) {
					return removeData.call(this, $.camelCase(key));
				} else {
					return removeData.call(this);
				}
			};
		})($.fn.removeData);
	}
	$.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
	$.support.selectstart = "onselectstart" in document.createElement("div");
	$.fn.extend({
		disableSelection: function () {
			return this.bind(
				($.support.selectstart ? "selectstart" : "mousedown") +
					".ui-disableSelection",
				function (event) {
					event.preventDefault();
				}
			);
		},
		enableSelection: function () {
			return this.unbind(".ui-disableSelection");
		},
	});
	$.extend($.ui, {
		plugin: {
			add: function (module, option, set) {
				var i,
					proto = $.ui[module].prototype;
				for (i in set) {
					proto.plugins[i] = proto.plugins[i] || [];
					proto.plugins[i].push([option, set[i]]);
				}
			},
			call: function (instance, name, args) {
				var i,
					set = instance.plugins[name];
				if (
					!set ||
					!instance.element[0].parentNode ||
					instance.element[0].parentNode.nodeType === 11
				) {
					return;
				}
				for (i = 0; i < set.length; i++) {
					if (instance.options[set[i][0]]) {
						set[i][1].apply(instance.element, args);
					}
				}
			},
		},
		hasScroll: function (el, a) {
			if ($(el).css("overflow") === "hidden") {
				return false;
			}
			var scroll = a && a === "left" ? "scrollLeft" : "scrollTop",
				has = false;
			if (el[scroll] > 0) {
				return true;
			}
			el[scroll] = 1;
			has = el[scroll] > 0;
			el[scroll] = 0;
			return has;
		},
	});
})(jQuery);
/*!
 * jQuery UI Widget 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */
(function ($, undefined) {
	var uuid = 0,
		slice = Array.prototype.slice,
		_cleanData = $.cleanData;
	$.cleanData = function (elems) {
		for (var i = 0, elem; (elem = elems[i]) != null; i++) {
			try {
				$(elem).triggerHandler("remove");
			} catch (e) {}
		}
		_cleanData(elems);
	};
	$.widget = function (name, base, prototype) {
		var fullName,
			existingConstructor,
			constructor,
			basePrototype,
			proxiedPrototype = {},
			namespace = name.split(".")[0];
		name = name.split(".")[1];
		fullName = namespace + "-" + name;
		if (!prototype) {
			prototype = base;
			base = $.Widget;
		}
		$.expr[":"][fullName.toLowerCase()] = function (elem) {
			return !!$.data(elem, fullName);
		};
		$[namespace] = $[namespace] || {};
		existingConstructor = $[namespace][name];
		constructor = $[namespace][name] = function (options, element) {
			if (!this._createWidget) {
				return new constructor(options, element);
			}
			if (arguments.length) {
				this._createWidget(options, element);
			}
		};
		$.extend(constructor, existingConstructor, {
			version: prototype.version,
			_proto: $.extend({}, prototype),
			_childConstructors: [],
		});
		basePrototype = new base();
		basePrototype.options = $.widget.extend({}, basePrototype.options);
		$.each(prototype, function (prop, value) {
			if (!$.isFunction(value)) {
				proxiedPrototype[prop] = value;
				return;
			}
			proxiedPrototype[prop] = (function () {
				var _super = function () {
						return base.prototype[prop].apply(this, arguments);
					},
					_superApply = function (args) {
						return base.prototype[prop].apply(this, args);
					};
				return function () {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;
					this._super = _super;
					this._superApply = _superApply;
					returnValue = value.apply(this, arguments);
					this._super = __super;
					this._superApply = __superApply;
					return returnValue;
				};
			})();
		});
		constructor.prototype = $.widget.extend(
			basePrototype,
			{
				widgetEventPrefix: existingConstructor
					? basePrototype.widgetEventPrefix || name
					: name,
			},
			proxiedPrototype,
			{
				constructor: constructor,
				namespace: namespace,
				widgetName: name,
				widgetFullName: fullName,
			}
		);
		if (existingConstructor) {
			$.each(existingConstructor._childConstructors, function (i, child) {
				var childPrototype = child.prototype;
				$.widget(
					childPrototype.namespace + "." + childPrototype.widgetName,
					constructor,
					child._proto
				);
			});
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push(constructor);
		}
		$.widget.bridge(name, constructor);
	};
	$.widget.extend = function (target) {
		var input = slice.call(arguments, 1),
			inputIndex = 0,
			inputLength = input.length,
			key,
			value;
		for (; inputIndex < inputLength; inputIndex++) {
			for (key in input[inputIndex]) {
				value = input[inputIndex][key];
				if (input[inputIndex].hasOwnProperty(key) && value !== undefined) {
					if ($.isPlainObject(value)) {
						target[key] = $.isPlainObject(target[key])
							? $.widget.extend({}, target[key], value)
							: $.widget.extend({}, value);
					} else {
						target[key] = value;
					}
				}
			}
		}
		return target;
	};
	$.widget.bridge = function (name, object) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[name] = function (options) {
			var isMethodCall = typeof options === "string",
				args = slice.call(arguments, 1),
				returnValue = this;
			options =
				!isMethodCall && args.length
					? $.widget.extend.apply(null, [options].concat(args))
					: options;
			if (isMethodCall) {
				this.each(function () {
					var methodValue,
						instance = $.data(this, fullName);
					if (!instance) {
						return $.error(
							"cannot call methods on " +
								name +
								" prior to initialization; " +
								"attempted to call method '" +
								options +
								"'"
						);
					}
					if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
						return $.error(
							"no such method '" +
								options +
								"' for " +
								name +
								" widget instance"
						);
					}
					methodValue = instance[options].apply(instance, args);
					if (methodValue !== instance && methodValue !== undefined) {
						returnValue =
							methodValue && methodValue.jquery
								? returnValue.pushStack(methodValue.get())
								: methodValue;
						return false;
					}
				});
			} else {
				this.each(function () {
					var instance = $.data(this, fullName);
					if (instance) {
						instance.option(options || {})._init();
					} else {
						$.data(this, fullName, new object(options, this));
					}
				});
			}
			return returnValue;
		};
	};
	$.Widget = function () {};
	$.Widget._childConstructors = [];
	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {disabled: false, create: null},
		_createWidget: function (options, element) {
			element = $(element || this.defaultElement || this)[0];
			this.element = $(element);
			this.uuid = uuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = $.widget.extend(
				{},
				this.options,
				this._getCreateOptions(),
				options
			);
			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();
			if (element !== this) {
				$.data(element, this.widgetFullName, this);
				this._on(true, this.element, {
					remove: function (event) {
						if (event.target === element) {
							this.destroy();
						}
					},
				});
				this.document = $(
					element.style ? element.ownerDocument : element.document || element
				);
				this.window = $(
					this.document[0].defaultView || this.document[0].parentWindow
				);
			}
			this._create();
			this._trigger("create", null, this._getCreateEventData());
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,
		destroy: function () {
			this._destroy();
			this.element
				.unbind(this.eventNamespace)
				.removeData(this.widgetName)
				.removeData(this.widgetFullName)
				.removeData($.camelCase(this.widgetFullName));
			this.widget()
				.unbind(this.eventNamespace)
				.removeAttr("aria-disabled")
				.removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled");
			this.bindings.unbind(this.eventNamespace);
			this.hoverable.removeClass("ui-state-hover");
			this.focusable.removeClass("ui-state-focus");
		},
		_destroy: $.noop,
		widget: function () {
			return this.element;
		},
		option: function (key, value) {
			var options = key,
				parts,
				curOption,
				i;
			if (arguments.length === 0) {
				return $.widget.extend({}, this.options);
			}
			if (typeof key === "string") {
				options = {};
				parts = key.split(".");
				key = parts.shift();
				if (parts.length) {
					curOption = options[key] = $.widget.extend({}, this.options[key]);
					for (i = 0; i < parts.length - 1; i++) {
						curOption[parts[i]] = curOption[parts[i]] || {};
						curOption = curOption[parts[i]];
					}
					key = parts.pop();
					if (arguments.length === 1) {
						return curOption[key] === undefined ? null : curOption[key];
					}
					curOption[key] = value;
				} else {
					if (arguments.length === 1) {
						return this.options[key] === undefined ? null : this.options[key];
					}
					options[key] = value;
				}
			}
			this._setOptions(options);
			return this;
		},
		_setOptions: function (options) {
			var key;
			for (key in options) {
				this._setOption(key, options[key]);
			}
			return this;
		},
		_setOption: function (key, value) {
			this.options[key] = value;
			if (key === "disabled") {
				this.widget()
					.toggleClass(
						this.widgetFullName + "-disabled ui-state-disabled",
						!!value
					)
					.attr("aria-disabled", value);
				this.hoverable.removeClass("ui-state-hover");
				this.focusable.removeClass("ui-state-focus");
			}
			return this;
		},
		enable: function () {
			return this._setOption("disabled", false);
		},
		disable: function () {
			return this._setOption("disabled", true);
		},
		_on: function (suppressDisabledCheck, element, handlers) {
			var delegateElement,
				instance = this;
			if (typeof suppressDisabledCheck !== "boolean") {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}
			if (!handlers) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				element = delegateElement = $(element);
				this.bindings = this.bindings.add(element);
			}
			$.each(handlers, function (event, handler) {
				function handlerProxy() {
					if (
						!suppressDisabledCheck &&
						(instance.options.disabled === true ||
							$(this).hasClass("ui-state-disabled"))
					) {
						return;
					}
					return (
						typeof handler === "string" ? instance[handler] : handler
					).apply(instance, arguments);
				}
				if (typeof handler !== "string") {
					handlerProxy.guid = handler.guid =
						handler.guid || handlerProxy.guid || $.guid++;
				}
				var match = event.match(/^(\w+)\s*(.*)$/),
					eventName = match[1] + instance.eventNamespace,
					selector = match[2];
				if (selector) {
					delegateElement.delegate(selector, eventName, handlerProxy);
				} else {
					element.bind(eventName, handlerProxy);
				}
			});
		},
		_off: function (element, eventName) {
			eventName =
				(eventName || "").split(" ").join(this.eventNamespace + " ") +
				this.eventNamespace;
			element.unbind(eventName).undelegate(eventName);
		},
		_delay: function (handler, delay) {
			function handlerProxy() {
				return (
					typeof handler === "string" ? instance[handler] : handler
				).apply(instance, arguments);
			}
			var instance = this;
			return setTimeout(handlerProxy, delay || 0);
		},
		_hoverable: function (element) {
			this.hoverable = this.hoverable.add(element);
			this._on(element, {
				mouseenter: function (event) {
					$(event.currentTarget).addClass("ui-state-hover");
				},
				mouseleave: function (event) {
					$(event.currentTarget).removeClass("ui-state-hover");
				},
			});
		},
		_focusable: function (element) {
			this.focusable = this.focusable.add(element);
			this._on(element, {
				focusin: function (event) {
					$(event.currentTarget).addClass("ui-state-focus");
				},
				focusout: function (event) {
					$(event.currentTarget).removeClass("ui-state-focus");
				},
			});
		},
		_trigger: function (type, event, data) {
			var prop,
				orig,
				callback = this.options[type];
			data = data || {};
			event = $.Event(event);
			event.type = (
				type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type
			).toLowerCase();
			event.target = this.element[0];
			orig = event.originalEvent;
			if (orig) {
				for (prop in orig) {
					if (!(prop in event)) {
						event[prop] = orig[prop];
					}
				}
			}
			this.element.trigger(event, data);
			return !(
				($.isFunction(callback) &&
					callback.apply(this.element[0], [event].concat(data)) === false) ||
				event.isDefaultPrevented()
			);
		},
	};
	$.each({show: "fadeIn", hide: "fadeOut"}, function (method, defaultEffect) {
		$.Widget.prototype["_" + method] = function (element, options, callback) {
			if (typeof options === "string") {
				options = {effect: options};
			}
			var hasOptions,
				effectName = !options
					? method
					: options === true || typeof options === "number"
					? defaultEffect
					: options.effect || defaultEffect;
			options = options || {};
			if (typeof options === "number") {
				options = {duration: options};
			}
			hasOptions = !$.isEmptyObject(options);
			options.complete = callback;
			if (options.delay) {
				element.delay(options.delay);
			}
			if (hasOptions && $.effects && $.effects.effect[effectName]) {
				element[method](options);
			} else if (effectName !== method && element[effectName]) {
				element[effectName](options.duration, options.easing, callback);
			} else {
				element.queue(function (next) {
					$(this)[method]();
					if (callback) {
						callback.call(element[0]);
					}
					next();
				});
			}
		};
	});
})(jQuery);
/*!
 * jQuery UI Effects 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/effects-core/
 */
(function ($, undefined) {
	var dataSpace = "ui-effects-";
	$.effects = {effect: {}};
	/*!
	 * jQuery Color Animations v2.1.2
	 * https://github.com/jquery/jquery-color
	 *
	 * Copyright 2013 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * Date: Wed Jan 16 08:47:09 2013 -0600
	 */
	(function (jQuery, undefined) {
		var stepHooks =
				"backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
			rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
			stringParsers = [
				{
					re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function (execResult) {
						return [execResult[1], execResult[2], execResult[3], execResult[4]];
					},
				},
				{
					re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function (execResult) {
						return [
							execResult[1] * 2.55,
							execResult[2] * 2.55,
							execResult[3] * 2.55,
							execResult[4],
						];
					},
				},
				{
					re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
					parse: function (execResult) {
						return [
							parseInt(execResult[1], 16),
							parseInt(execResult[2], 16),
							parseInt(execResult[3], 16),
						];
					},
				},
				{
					re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
					parse: function (execResult) {
						return [
							parseInt(execResult[1] + execResult[1], 16),
							parseInt(execResult[2] + execResult[2], 16),
							parseInt(execResult[3] + execResult[3], 16),
						];
					},
				},
				{
					re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					space: "hsla",
					parse: function (execResult) {
						return [
							execResult[1],
							execResult[2] / 100,
							execResult[3] / 100,
							execResult[4],
						];
					},
				},
			],
			color = (jQuery.Color = function (color, green, blue, alpha) {
				return new jQuery.Color.fn.parse(color, green, blue, alpha);
			}),
			spaces = {
				rgba: {
					props: {
						red: {idx: 0, type: "byte"},
						green: {idx: 1, type: "byte"},
						blue: {idx: 2, type: "byte"},
					},
				},
				hsla: {
					props: {
						hue: {idx: 0, type: "degrees"},
						saturation: {idx: 1, type: "percent"},
						lightness: {idx: 2, type: "percent"},
					},
				},
			},
			propTypes = {
				byte: {floor: true, max: 255},
				percent: {max: 1},
				degrees: {mod: 360, floor: true},
			},
			support = (color.support = {}),
			supportElem = jQuery("<p>")[0],
			colors,
			each = jQuery.each;
		supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
		support.rgba = supportElem.style.backgroundColor.indexOf("rgba") > -1;
		each(spaces, function (spaceName, space) {
			space.cache = "_" + spaceName;
			space.props.alpha = {idx: 3, type: "percent", def: 1};
		});
		function clamp(value, prop, allowEmpty) {
			var type = propTypes[prop.type] || {};
			if (value == null) {
				return allowEmpty || !prop.def ? null : prop.def;
			}
			value = type.floor ? ~~value : parseFloat(value);
			if (isNaN(value)) {
				return prop.def;
			}
			if (type.mod) {
				return (value + type.mod) % type.mod;
			}
			return 0 > value ? 0 : type.max < value ? type.max : value;
		}
		function stringParse(string) {
			var inst = color(),
				rgba = (inst._rgba = []);
			string = string.toLowerCase();
			each(stringParsers, function (i, parser) {
				var parsed,
					match = parser.re.exec(string),
					values = match && parser.parse(match),
					spaceName = parser.space || "rgba";
				if (values) {
					parsed = inst[spaceName](values);
					inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache];
					rgba = inst._rgba = parsed._rgba;
					return false;
				}
			});
			if (rgba.length) {
				if (rgba.join() === "0,0,0,0") {
					jQuery.extend(rgba, colors.transparent);
				}
				return inst;
			}
			return colors[string];
		}
		color.fn = jQuery.extend(color.prototype, {
			parse: function (red, green, blue, alpha) {
				if (red === undefined) {
					this._rgba = [null, null, null, null];
					return this;
				}
				if (red.jquery || red.nodeType) {
					red = jQuery(red).css(green);
					green = undefined;
				}
				var inst = this,
					type = jQuery.type(red),
					rgba = (this._rgba = []);
				if (green !== undefined) {
					red = [red, green, blue, alpha];
					type = "array";
				}
				if (type === "string") {
					return this.parse(stringParse(red) || colors._default);
				}
				if (type === "array") {
					each(spaces.rgba.props, function (key, prop) {
						rgba[prop.idx] = clamp(red[prop.idx], prop);
					});
					return this;
				}
				if (type === "object") {
					if (red instanceof color) {
						each(spaces, function (spaceName, space) {
							if (red[space.cache]) {
								inst[space.cache] = red[space.cache].slice();
							}
						});
					} else {
						each(spaces, function (spaceName, space) {
							var cache = space.cache;
							each(space.props, function (key, prop) {
								if (!inst[cache] && space.to) {
									if (key === "alpha" || red[key] == null) {
										return;
									}
									inst[cache] = space.to(inst._rgba);
								}
								inst[cache][prop.idx] = clamp(red[key], prop, true);
							});
							if (
								inst[cache] &&
								jQuery.inArray(null, inst[cache].slice(0, 3)) < 0
							) {
								inst[cache][3] = 1;
								if (space.from) {
									inst._rgba = space.from(inst[cache]);
								}
							}
						});
					}
					return this;
				}
			},
			is: function (compare) {
				var is = color(compare),
					same = true,
					inst = this;
				each(spaces, function (_, space) {
					var localCache,
						isCache = is[space.cache];
					if (isCache) {
						localCache =
							inst[space.cache] || (space.to && space.to(inst._rgba)) || [];
						each(space.props, function (_, prop) {
							if (isCache[prop.idx] != null) {
								same = isCache[prop.idx] === localCache[prop.idx];
								return same;
							}
						});
					}
					return same;
				});
				return same;
			},
			_space: function () {
				var used = [],
					inst = this;
				each(spaces, function (spaceName, space) {
					if (inst[space.cache]) {
						used.push(spaceName);
					}
				});
				return used.pop();
			},
			transition: function (other, distance) {
				var end = color(other),
					spaceName = end._space(),
					space = spaces[spaceName],
					startColor = this.alpha() === 0 ? color("transparent") : this,
					start = startColor[space.cache] || space.to(startColor._rgba),
					result = start.slice();
				end = end[space.cache];
				each(space.props, function (key, prop) {
					var index = prop.idx,
						startValue = start[index],
						endValue = end[index],
						type = propTypes[prop.type] || {};
					if (endValue === null) {
						return;
					}
					if (startValue === null) {
						result[index] = endValue;
					} else {
						if (type.mod) {
							if (endValue - startValue > type.mod / 2) {
								startValue += type.mod;
							} else if (startValue - endValue > type.mod / 2) {
								startValue -= type.mod;
							}
						}
						result[index] = clamp(
							(endValue - startValue) * distance + startValue,
							prop
						);
					}
				});
				return this[spaceName](result);
			},
			blend: function (opaque) {
				if (this._rgba[3] === 1) {
					return this;
				}
				var rgb = this._rgba.slice(),
					a = rgb.pop(),
					blend = color(opaque)._rgba;
				return color(
					jQuery.map(rgb, function (v, i) {
						return (1 - a) * blend[i] + a * v;
					})
				);
			},
			toRgbaString: function () {
				var prefix = "rgba(",
					rgba = jQuery.map(this._rgba, function (v, i) {
						return v == null ? (i > 2 ? 1 : 0) : v;
					});
				if (rgba[3] === 1) {
					rgba.pop();
					prefix = "rgb(";
				}
				return prefix + rgba.join() + ")";
			},
			toHslaString: function () {
				var prefix = "hsla(",
					hsla = jQuery.map(this.hsla(), function (v, i) {
						if (v == null) {
							v = i > 2 ? 1 : 0;
						}
						if (i && i < 3) {
							v = Math.round(v * 100) + "%";
						}
						return v;
					});
				if (hsla[3] === 1) {
					hsla.pop();
					prefix = "hsl(";
				}
				return prefix + hsla.join() + ")";
			},
			toHexString: function (includeAlpha) {
				var rgba = this._rgba.slice(),
					alpha = rgba.pop();
				if (includeAlpha) {
					rgba.push(~~(alpha * 255));
				}
				return (
					"#" +
					jQuery
						.map(rgba, function (v) {
							v = (v || 0).toString(16);
							return v.length === 1 ? "0" + v : v;
						})
						.join("")
				);
			},
			toString: function () {
				return this._rgba[3] === 0 ? "transparent" : this.toRgbaString();
			},
		});
		color.fn.parse.prototype = color.fn;
		function hue2rgb(p, q, h) {
			h = (h + 1) % 1;
			if (h * 6 < 1) {
				return p + (q - p) * h * 6;
			}
			if (h * 2 < 1) {
				return q;
			}
			if (h * 3 < 2) {
				return p + (q - p) * (2 / 3 - h) * 6;
			}
			return p;
		}
		spaces.hsla.to = function (rgba) {
			if (rgba[0] == null || rgba[1] == null || rgba[2] == null) {
				return [null, null, null, rgba[3]];
			}
			var r = rgba[0] / 255,
				g = rgba[1] / 255,
				b = rgba[2] / 255,
				a = rgba[3],
				max = Math.max(r, g, b),
				min = Math.min(r, g, b),
				diff = max - min,
				add = max + min,
				l = add * 0.5,
				h,
				s;
			if (min === max) {
				h = 0;
			} else if (r === max) {
				h = (60 * (g - b)) / diff + 360;
			} else if (g === max) {
				h = (60 * (b - r)) / diff + 120;
			} else {
				h = (60 * (r - g)) / diff + 240;
			}
			if (diff === 0) {
				s = 0;
			} else if (l <= 0.5) {
				s = diff / add;
			} else {
				s = diff / (2 - add);
			}
			return [Math.round(h) % 360, s, l, a == null ? 1 : a];
		};
		spaces.hsla.from = function (hsla) {
			if (hsla[0] == null || hsla[1] == null || hsla[2] == null) {
				return [null, null, null, hsla[3]];
			}
			var h = hsla[0] / 360,
				s = hsla[1],
				l = hsla[2],
				a = hsla[3],
				q = l <= 0.5 ? l * (1 + s) : l + s - l * s,
				p = 2 * l - q;
			return [
				Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
				Math.round(hue2rgb(p, q, h) * 255),
				Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
				a,
			];
		};
		each(spaces, function (spaceName, space) {
			var props = space.props,
				cache = space.cache,
				to = space.to,
				from = space.from;
			color.fn[spaceName] = function (value) {
				if (to && !this[cache]) {
					this[cache] = to(this._rgba);
				}
				if (value === undefined) {
					return this[cache].slice();
				}
				var ret,
					type = jQuery.type(value),
					arr = type === "array" || type === "object" ? value : arguments,
					local = this[cache].slice();
				each(props, function (key, prop) {
					var val = arr[type === "object" ? key : prop.idx];
					if (val == null) {
						val = local[prop.idx];
					}
					local[prop.idx] = clamp(val, prop);
				});
				if (from) {
					ret = color(from(local));
					ret[cache] = local;
					return ret;
				} else {
					return color(local);
				}
			};
			each(props, function (key, prop) {
				if (color.fn[key]) {
					return;
				}
				color.fn[key] = function (value) {
					var vtype = jQuery.type(value),
						fn = key === "alpha" ? (this._hsla ? "hsla" : "rgba") : spaceName,
						local = this[fn](),
						cur = local[prop.idx],
						match;
					if (vtype === "undefined") {
						return cur;
					}
					if (vtype === "function") {
						value = value.call(this, cur);
						vtype = jQuery.type(value);
					}
					if (value == null && prop.empty) {
						return this;
					}
					if (vtype === "string") {
						match = rplusequals.exec(value);
						if (match) {
							value = cur + parseFloat(match[2]) * (match[1] === "+" ? 1 : -1);
						}
					}
					local[prop.idx] = value;
					return this[fn](local);
				};
			});
		});
		color.hook = function (hook) {
			var hooks = hook.split(" ");
			each(hooks, function (i, hook) {
				jQuery.cssHooks[hook] = {
					set: function (elem, value) {
						var parsed,
							curElem,
							backgroundColor = "";
						if (
							value !== "transparent" &&
							(jQuery.type(value) !== "string" || (parsed = stringParse(value)))
						) {
							value = color(parsed || value);
							if (!support.rgba && value._rgba[3] !== 1) {
								curElem = hook === "backgroundColor" ? elem.parentNode : elem;
								while (
									(backgroundColor === "" ||
										backgroundColor === "transparent") &&
									curElem &&
									curElem.style
								) {
									try {
										backgroundColor = jQuery.css(curElem, "backgroundColor");
										curElem = curElem.parentNode;
									} catch (e) {}
								}
								value = value.blend(
									backgroundColor && backgroundColor !== "transparent"
										? backgroundColor
										: "_default"
								);
							}
							value = value.toRgbaString();
						}
						try {
							elem.style[hook] = value;
						} catch (e) {}
					},
				};
				jQuery.fx.step[hook] = function (fx) {
					if (!fx.colorInit) {
						fx.start = color(fx.elem, hook);
						fx.end = color(fx.end);
						fx.colorInit = true;
					}
					jQuery.cssHooks[hook].set(
						fx.elem,
						fx.start.transition(fx.end, fx.pos)
					);
				};
			});
		};
		color.hook(stepHooks);
		jQuery.cssHooks.borderColor = {
			expand: function (value) {
				var expanded = {};
				each(["Top", "Right", "Bottom", "Left"], function (i, part) {
					expanded["border" + part + "Color"] = value;
				});
				return expanded;
			},
		};
		colors = jQuery.Color.names = {
			aqua: "#00ffff",
			black: "#000000",
			blue: "#0000ff",
			fuchsia: "#ff00ff",
			gray: "#808080",
			green: "#008000",
			lime: "#00ff00",
			maroon: "#800000",
			navy: "#000080",
			olive: "#808000",
			purple: "#800080",
			red: "#ff0000",
			silver: "#c0c0c0",
			teal: "#008080",
			white: "#ffffff",
			yellow: "#ffff00",
			transparent: [null, null, null, 0],
			_default: "#ffffff",
		};
	})(jQuery);
	(function () {
		var classAnimationActions = ["add", "remove", "toggle"],
			shorthandStyles = {
				border: 1,
				borderBottom: 1,
				borderColor: 1,
				borderLeft: 1,
				borderRight: 1,
				borderTop: 1,
				borderWidth: 1,
				margin: 1,
				padding: 1,
			};
		$.each(
			[
				"borderLeftStyle",
				"borderRightStyle",
				"borderBottomStyle",
				"borderTopStyle",
			],
			function (_, prop) {
				$.fx.step[prop] = function (fx) {
					if (
						(fx.end !== "none" && !fx.setAttr) ||
						(fx.pos === 1 && !fx.setAttr)
					) {
						jQuery.style(fx.elem, prop, fx.end);
						fx.setAttr = true;
					}
				};
			}
		);
		function getElementStyles(elem) {
			var key,
				len,
				style = elem.ownerDocument.defaultView
					? elem.ownerDocument.defaultView.getComputedStyle(elem, null)
					: elem.currentStyle,
				styles = {};
			if (style && style.length && style[0] && style[style[0]]) {
				len = style.length;
				while (len--) {
					key = style[len];
					if (typeof style[key] === "string") {
						styles[$.camelCase(key)] = style[key];
					}
				}
			} else {
				for (key in style) {
					if (typeof style[key] === "string") {
						styles[key] = style[key];
					}
				}
			}
			return styles;
		}
		function styleDifference(oldStyle, newStyle) {
			var diff = {},
				name,
				value;
			for (name in newStyle) {
				value = newStyle[name];
				if (oldStyle[name] !== value) {
					if (!shorthandStyles[name]) {
						if ($.fx.step[name] || !isNaN(parseFloat(value))) {
							diff[name] = value;
						}
					}
				}
			}
			return diff;
		}
		if (!$.fn.addBack) {
			$.fn.addBack = function (selector) {
				return this.add(
					selector == null ? this.prevObject : this.prevObject.filter(selector)
				);
			};
		}
		$.effects.animateClass = function (value, duration, easing, callback) {
			var o = $.speed(duration, easing, callback);
			return this.queue(function () {
				var animated = $(this),
					baseClass = animated.attr("class") || "",
					applyClassChange,
					allAnimations = o.children ? animated.find("*").addBack() : animated;
				allAnimations = allAnimations.map(function () {
					var el = $(this);
					return {el: el, start: getElementStyles(this)};
				});
				applyClassChange = function () {
					$.each(classAnimationActions, function (i, action) {
						if (value[action]) {
							animated[action + "Class"](value[action]);
						}
					});
				};
				applyClassChange();
				allAnimations = allAnimations.map(function () {
					this.end = getElementStyles(this.el[0]);
					this.diff = styleDifference(this.start, this.end);
					return this;
				});
				animated.attr("class", baseClass);
				allAnimations = allAnimations.map(function () {
					var styleInfo = this,
						dfd = $.Deferred(),
						opts = $.extend({}, o, {
							queue: false,
							complete: function () {
								dfd.resolve(styleInfo);
							},
						});
					this.el.animate(this.diff, opts);
					return dfd.promise();
				});
				$.when.apply($, allAnimations.get()).done(function () {
					applyClassChange();
					$.each(arguments, function () {
						var el = this.el;
						$.each(this.diff, function (key) {
							el.css(key, "");
						});
					});
					o.complete.call(animated[0]);
				});
			});
		};
		$.fn.extend({
			addClass: (function (orig) {
				return function (classNames, speed, easing, callback) {
					return speed
						? $.effects.animateClass.call(
								this,
								{add: classNames},
								speed,
								easing,
								callback
						  )
						: orig.apply(this, arguments);
				};
			})($.fn.addClass),
			removeClass: (function (orig) {
				return function (classNames, speed, easing, callback) {
					return arguments.length > 1
						? $.effects.animateClass.call(
								this,
								{remove: classNames},
								speed,
								easing,
								callback
						  )
						: orig.apply(this, arguments);
				};
			})($.fn.removeClass),
			toggleClass: (function (orig) {
				return function (classNames, force, speed, easing, callback) {
					if (typeof force === "boolean" || force === undefined) {
						if (!speed) {
							return orig.apply(this, arguments);
						} else {
							return $.effects.animateClass.call(
								this,
								force ? {add: classNames} : {remove: classNames},
								speed,
								easing,
								callback
							);
						}
					} else {
						return $.effects.animateClass.call(
							this,
							{toggle: classNames},
							force,
							speed,
							easing
						);
					}
				};
			})($.fn.toggleClass),
			switchClass: function (remove, add, speed, easing, callback) {
				return $.effects.animateClass.call(
					this,
					{add: add, remove: remove},
					speed,
					easing,
					callback
				);
			},
		});
	})();
	(function () {
		$.extend($.effects, {
			version: "1.10.4",
			save: function (element, set) {
				for (var i = 0; i < set.length; i++) {
					if (set[i] !== null) {
						element.data(dataSpace + set[i], element[0].style[set[i]]);
					}
				}
			},
			restore: function (element, set) {
				var val, i;
				for (i = 0; i < set.length; i++) {
					if (set[i] !== null) {
						val = element.data(dataSpace + set[i]);
						if (val === undefined) {
							val = "";
						}
						element.css(set[i], val);
					}
				}
			},
			setMode: function (el, mode) {
				if (mode === "toggle") {
					mode = el.is(":hidden") ? "show" : "hide";
				}
				return mode;
			},
			getBaseline: function (origin, original) {
				var y, x;
				switch (origin[0]) {
					case "top":
						y = 0;
						break;
					case "middle":
						y = 0.5;
						break;
					case "bottom":
						y = 1;
						break;
					default:
						y = origin[0] / original.height;
				}
				switch (origin[1]) {
					case "left":
						x = 0;
						break;
					case "center":
						x = 0.5;
						break;
					case "right":
						x = 1;
						break;
					default:
						x = origin[1] / original.width;
				}
				return {x: x, y: y};
			},
			createWrapper: function (element) {
				if (element.parent().is(".ui-effects-wrapper")) {
					return element.parent();
				}
				var props = {
						width: element.outerWidth(true),
						height: element.outerHeight(true),
						float: element.css("float"),
					},
					wrapper = $("<div></div>")
						.addClass("ui-effects-wrapper")
						.css({
							fontSize: "100%",
							background: "transparent",
							border: "none",
							margin: 0,
							padding: 0,
						}),
					size = {width: element.width(), height: element.height()},
					active = document.activeElement;
				try {
					active.id;
				} catch (e) {
					active = document.body;
				}
				element.wrap(wrapper);
				if (element[0] === active || $.contains(element[0], active)) {
					$(active).focus();
				}
				wrapper = element.parent();
				if (element.css("position") === "static") {
					wrapper.css({position: "relative"});
					element.css({position: "relative"});
				} else {
					$.extend(props, {
						position: element.css("position"),
						zIndex: element.css("z-index"),
					});
					$.each(["top", "left", "bottom", "right"], function (i, pos) {
						props[pos] = element.css(pos);
						if (isNaN(parseInt(props[pos], 10))) {
							props[pos] = "auto";
						}
					});
					element.css({
						position: "relative",
						top: 0,
						left: 0,
						right: "auto",
						bottom: "auto",
					});
				}
				element.css(size);
				return wrapper.css(props).show();
			},
			removeWrapper: function (element) {
				var active = document.activeElement;
				if (element.parent().is(".ui-effects-wrapper")) {
					element.parent().replaceWith(element);
					if (element[0] === active || $.contains(element[0], active)) {
						$(active).focus();
					}
				}
				return element;
			},
			setTransition: function (element, list, factor, value) {
				value = value || {};
				$.each(list, function (i, x) {
					var unit = element.cssUnit(x);
					if (unit[0] > 0) {
						value[x] = unit[0] * factor + unit[1];
					}
				});
				return value;
			},
		});
		function _normalizeArguments(effect, options, speed, callback) {
			if ($.isPlainObject(effect)) {
				options = effect;
				effect = effect.effect;
			}
			effect = {effect: effect};
			if (options == null) {
				options = {};
			}
			if ($.isFunction(options)) {
				callback = options;
				speed = null;
				options = {};
			}
			if (typeof options === "number" || $.fx.speeds[options]) {
				callback = speed;
				speed = options;
				options = {};
			}
			if ($.isFunction(speed)) {
				callback = speed;
				speed = null;
			}
			if (options) {
				$.extend(effect, options);
			}
			speed = speed || options.duration;
			effect.duration = $.fx.off
				? 0
				: typeof speed === "number"
				? speed
				: speed in $.fx.speeds
				? $.fx.speeds[speed]
				: $.fx.speeds._default;
			effect.complete = callback || options.complete;
			return effect;
		}
		function standardAnimationOption(option) {
			if (!option || typeof option === "number" || $.fx.speeds[option]) {
				return true;
			}
			if (typeof option === "string" && !$.effects.effect[option]) {
				return true;
			}
			if ($.isFunction(option)) {
				return true;
			}
			if (typeof option === "object" && !option.effect) {
				return true;
			}
			return false;
		}
		$.fn.extend({
			effect: function () {
				var args = _normalizeArguments.apply(this, arguments),
					mode = args.mode,
					queue = args.queue,
					effectMethod = $.effects.effect[args.effect];
				if ($.fx.off || !effectMethod) {
					if (mode) {
						return this[mode](args.duration, args.complete);
					} else {
						return this.each(function () {
							if (args.complete) {
								args.complete.call(this);
							}
						});
					}
				}
				function run(next) {
					var elem = $(this),
						complete = args.complete,
						mode = args.mode;
					function done() {
						if ($.isFunction(complete)) {
							complete.call(elem[0]);
						}
						if ($.isFunction(next)) {
							next();
						}
					}
					if (elem.is(":hidden") ? mode === "hide" : mode === "show") {
						elem[mode]();
						done();
					} else {
						effectMethod.call(elem[0], args, done);
					}
				}
				return queue === false
					? this.each(run)
					: this.queue(queue || "fx", run);
			},
			show: (function (orig) {
				return function (option) {
					if (standardAnimationOption(option)) {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "show";
						return this.effect.call(this, args);
					}
				};
			})($.fn.show),
			hide: (function (orig) {
				return function (option) {
					if (standardAnimationOption(option)) {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "hide";
						return this.effect.call(this, args);
					}
				};
			})($.fn.hide),
			toggle: (function (orig) {
				return function (option) {
					if (standardAnimationOption(option) || typeof option === "boolean") {
						return orig.apply(this, arguments);
					} else {
						var args = _normalizeArguments.apply(this, arguments);
						args.mode = "toggle";
						return this.effect.call(this, args);
					}
				};
			})($.fn.toggle),
			cssUnit: function (key) {
				var style = this.css(key),
					val = [];
				$.each(["em", "px", "%", "pt"], function (i, unit) {
					if (style.indexOf(unit) > 0) {
						val = [parseFloat(style), unit];
					}
				});
				return val;
			},
		});
	})();
	(function () {
		var baseEasings = {};
		$.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (i, name) {
			baseEasings[name] = function (p) {
				return Math.pow(p, i + 2);
			};
		});
		$.extend(baseEasings, {
			Sine: function (p) {
				return 1 - Math.cos((p * Math.PI) / 2);
			},
			Circ: function (p) {
				return 1 - Math.sqrt(1 - p * p);
			},
			Elastic: function (p) {
				return p === 0 || p === 1
					? p
					: -Math.pow(2, 8 * (p - 1)) *
							Math.sin((((p - 1) * 80 - 7.5) * Math.PI) / 15);
			},
			Back: function (p) {
				return p * p * (3 * p - 2);
			},
			Bounce: function (p) {
				var pow2,
					bounce = 4;
				while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
				return (
					1 / Math.pow(4, 3 - bounce) -
					7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2)
				);
			},
		});
		$.each(baseEasings, function (name, easeIn) {
			$.easing["easeIn" + name] = easeIn;
			$.easing["easeOut" + name] = function (p) {
				return 1 - easeIn(1 - p);
			};
			$.easing["easeInOut" + name] = function (p) {
				return p < 0.5 ? easeIn(p * 2) / 2 : 1 - easeIn(p * -2 + 2) / 2;
			};
		});
	})();
})(jQuery);
/*!
 * jQuery UI Effects Blind 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/blind-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	var rvertical = /up|down|vertical/,
		rpositivemotion = /up|left|vertical|horizontal/;
	$.effects.effect.blind = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			direction = o.direction || "up",
			vertical = rvertical.test(direction),
			ref = vertical ? "height" : "width",
			ref2 = vertical ? "top" : "left",
			motion = rpositivemotion.test(direction),
			animation = {},
			show = mode === "show",
			wrapper,
			distance,
			margin;
		if (el.parent().is(".ui-effects-wrapper")) {
			$.effects.save(el.parent(), props);
		} else {
			$.effects.save(el, props);
		}
		el.show();
		wrapper = $.effects.createWrapper(el).css({overflow: "hidden"});
		distance = wrapper[ref]();
		margin = parseFloat(wrapper.css(ref2)) || 0;
		animation[ref] = show ? distance : 0;
		if (!motion) {
			el.css(vertical ? "bottom" : "right", 0)
				.css(vertical ? "top" : "left", "auto")
				.css({position: "absolute"});
			animation[ref2] = show ? margin : distance + margin;
		}
		if (show) {
			wrapper.css(ref, 0);
			if (!motion) {
				wrapper.css(ref2, margin + distance);
			}
		}
		wrapper.animate(animation, {
			duration: o.duration,
			easing: o.easing,
			queue: false,
			complete: function () {
				if (mode === "hide") {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			},
		});
	};
})(jQuery);
/*!
 * jQuery UI Effects Bounce 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/bounce-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.bounce = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "effect"),
			hide = mode === "hide",
			show = mode === "show",
			direction = o.direction || "up",
			distance = o.distance,
			times = o.times || 5,
			anims = times * 2 + (show || hide ? 1 : 0),
			speed = o.duration / anims,
			easing = o.easing,
			ref = direction === "up" || direction === "down" ? "top" : "left",
			motion = direction === "up" || direction === "left",
			i,
			upAnim,
			downAnim,
			queue = el.queue(),
			queuelen = queue.length;
		if (show || hide) {
			props.push("opacity");
		}
		$.effects.save(el, props);
		el.show();
		$.effects.createWrapper(el);
		if (!distance) {
			distance = el[ref === "top" ? "outerHeight" : "outerWidth"]() / 3;
		}
		if (show) {
			downAnim = {opacity: 1};
			downAnim[ref] = 0;
			el.css("opacity", 0)
				.css(ref, motion ? -distance * 2 : distance * 2)
				.animate(downAnim, speed, easing);
		}
		if (hide) {
			distance = distance / Math.pow(2, times - 1);
		}
		downAnim = {};
		downAnim[ref] = 0;
		for (i = 0; i < times; i++) {
			upAnim = {};
			upAnim[ref] = (motion ? "-=" : "+=") + distance;
			el.animate(upAnim, speed, easing).animate(downAnim, speed, easing);
			distance = hide ? distance * 2 : distance / 2;
		}
		if (hide) {
			upAnim = {opacity: 0};
			upAnim[ref] = (motion ? "-=" : "+=") + distance;
			el.animate(upAnim, speed, easing);
		}
		el.queue(function () {
			if (hide) {
				el.hide();
			}
			$.effects.restore(el, props);
			$.effects.removeWrapper(el);
			done();
		});
		if (queuelen > 1) {
			queue.splice.apply(
				queue,
				[1, 0].concat(queue.splice(queuelen, anims + 1))
			);
		}
		el.dequeue();
	};
})(jQuery);
/*!
 * jQuery UI Effects Clip 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/clip-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.clip = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = mode === "show",
			direction = o.direction || "vertical",
			vert = direction === "vertical",
			size = vert ? "height" : "width",
			position = vert ? "top" : "left",
			animation = {},
			wrapper,
			animate,
			distance;
		$.effects.save(el, props);
		el.show();
		wrapper = $.effects.createWrapper(el).css({overflow: "hidden"});
		animate = el[0].tagName === "IMG" ? wrapper : el;
		distance = animate[size]();
		if (show) {
			animate.css(size, 0);
			animate.css(position, distance / 2);
		}
		animation[size] = show ? distance : 0;
		animation[position] = show ? 0 : distance / 2;
		animate.animate(animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function () {
				if (!show) {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			},
		});
	};
})(jQuery);
/*!
 * jQuery UI Effects Drop 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/drop-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.drop = function (o, done) {
		var el = $(this),
			props = [
				"position",
				"top",
				"bottom",
				"left",
				"right",
				"opacity",
				"height",
				"width",
			],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = mode === "show",
			direction = o.direction || "left",
			ref = direction === "up" || direction === "down" ? "top" : "left",
			motion = direction === "up" || direction === "left" ? "pos" : "neg",
			animation = {opacity: show ? 1 : 0},
			distance;
		$.effects.save(el, props);
		el.show();
		$.effects.createWrapper(el);
		distance =
			o.distance || el[ref === "top" ? "outerHeight" : "outerWidth"](true) / 2;
		if (show) {
			el.css("opacity", 0).css(ref, motion === "pos" ? -distance : distance);
		}
		animation[ref] =
			(show
				? motion === "pos"
					? "+="
					: "-="
				: motion === "pos"
				? "-="
				: "+=") + distance;
		el.animate(animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function () {
				if (mode === "hide") {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			},
		});
	};
})(jQuery);
/*!
 * jQuery UI Effects Explode 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/explode-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.explode = function (o, done) {
		var rows = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3,
			cells = rows,
			el = $(this),
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = mode === "show",
			offset = el.show().css("visibility", "hidden").offset(),
			width = Math.ceil(el.outerWidth() / cells),
			height = Math.ceil(el.outerHeight() / rows),
			pieces = [],
			i,
			j,
			left,
			top,
			mx,
			my;
		function childComplete() {
			pieces.push(this);
			if (pieces.length === rows * cells) {
				animComplete();
			}
		}
		for (i = 0; i < rows; i++) {
			top = offset.top + i * height;
			my = i - (rows - 1) / 2;
			for (j = 0; j < cells; j++) {
				left = offset.left + j * width;
				mx = j - (cells - 1) / 2;
				el.clone()
					.appendTo("body")
					.wrap("<div></div>")
					.css({
						position: "absolute",
						visibility: "visible",
						left: -j * width,
						top: -i * height,
					})
					.parent()
					.addClass("ui-effects-explode")
					.css({
						position: "absolute",
						overflow: "hidden",
						width: width,
						height: height,
						left: left + (show ? mx * width : 0),
						top: top + (show ? my * height : 0),
						opacity: show ? 0 : 1,
					})
					.animate(
						{
							left: left + (show ? 0 : mx * width),
							top: top + (show ? 0 : my * height),
							opacity: show ? 1 : 0,
						},
						o.duration || 500,
						o.easing,
						childComplete
					);
			}
		}
		function animComplete() {
			el.css({visibility: "visible"});
			$(pieces).remove();
			if (!show) {
				el.hide();
			}
			done();
		}
	};
})(jQuery);
/*!
 * jQuery UI Effects Fade 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fade-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.fade = function (o, done) {
		var el = $(this),
			mode = $.effects.setMode(el, o.mode || "toggle");
		el.animate(
			{opacity: mode},
			{queue: false, duration: o.duration, easing: o.easing, complete: done}
		);
	};
})(jQuery);
/*!
 * jQuery UI Effects Fold 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/fold-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.fold = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "hide"),
			show = mode === "show",
			hide = mode === "hide",
			size = o.size || 15,
			percent = /([0-9]+)%/.exec(size),
			horizFirst = !!o.horizFirst,
			widthFirst = show !== horizFirst,
			ref = widthFirst ? ["width", "height"] : ["height", "width"],
			duration = o.duration / 2,
			wrapper,
			distance,
			animation1 = {},
			animation2 = {};
		$.effects.save(el, props);
		el.show();
		wrapper = $.effects.createWrapper(el).css({overflow: "hidden"});
		distance = widthFirst
			? [wrapper.width(), wrapper.height()]
			: [wrapper.height(), wrapper.width()];
		if (percent) {
			size = (parseInt(percent[1], 10) / 100) * distance[hide ? 0 : 1];
		}
		if (show) {
			wrapper.css(
				horizFirst ? {height: 0, width: size} : {height: size, width: 0}
			);
		}
		animation1[ref[0]] = show ? distance[0] : size;
		animation2[ref[1]] = show ? distance[1] : 0;
		wrapper
			.animate(animation1, duration, o.easing)
			.animate(animation2, duration, o.easing, function () {
				if (hide) {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			});
	};
})(jQuery);
/*!
 * jQuery UI Effects Highlight 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/highlight-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.highlight = function (o, done) {
		var elem = $(this),
			props = ["backgroundImage", "backgroundColor", "opacity"],
			mode = $.effects.setMode(elem, o.mode || "show"),
			animation = {backgroundColor: elem.css("backgroundColor")};
		if (mode === "hide") {
			animation.opacity = 0;
		}
		$.effects.save(elem, props);
		elem
			.show()
			.css({backgroundImage: "none", backgroundColor: o.color || "#ffff99"})
			.animate(animation, {
				queue: false,
				duration: o.duration,
				easing: o.easing,
				complete: function () {
					if (mode === "hide") {
						elem.hide();
					}
					$.effects.restore(elem, props);
					done();
				},
			});
	};
})(jQuery);
/*!
 * jQuery UI Effects Pulsate 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/pulsate-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.pulsate = function (o, done) {
		var elem = $(this),
			mode = $.effects.setMode(elem, o.mode || "show"),
			show = mode === "show",
			hide = mode === "hide",
			showhide = show || mode === "hide",
			anims = (o.times || 5) * 2 + (showhide ? 1 : 0),
			duration = o.duration / anims,
			animateTo = 0,
			queue = elem.queue(),
			queuelen = queue.length,
			i;
		if (show || !elem.is(":visible")) {
			elem.css("opacity", 0).show();
			animateTo = 1;
		}
		for (i = 1; i < anims; i++) {
			elem.animate({opacity: animateTo}, duration, o.easing);
			animateTo = 1 - animateTo;
		}
		elem.animate({opacity: animateTo}, duration, o.easing);
		elem.queue(function () {
			if (hide) {
				elem.hide();
			}
			done();
		});
		if (queuelen > 1) {
			queue.splice.apply(
				queue,
				[1, 0].concat(queue.splice(queuelen, anims + 1))
			);
		}
		elem.dequeue();
	};
})(jQuery);
/*!
 * jQuery UI Effects Scale 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/scale-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.puff = function (o, done) {
		var elem = $(this),
			mode = $.effects.setMode(elem, o.mode || "hide"),
			hide = mode === "hide",
			percent = parseInt(o.percent, 10) || 150,
			factor = percent / 100,
			original = {
				height: elem.height(),
				width: elem.width(),
				outerHeight: elem.outerHeight(),
				outerWidth: elem.outerWidth(),
			};
		$.extend(o, {
			effect: "scale",
			queue: false,
			fade: true,
			mode: mode,
			complete: done,
			percent: hide ? percent : 100,
			from: hide
				? original
				: {
						height: original.height * factor,
						width: original.width * factor,
						outerHeight: original.outerHeight * factor,
						outerWidth: original.outerWidth * factor,
				  },
		});
		elem.effect(o);
	};
	$.effects.effect.scale = function (o, done) {
		var el = $(this),
			options = $.extend(true, {}, o),
			mode = $.effects.setMode(el, o.mode || "effect"),
			percent =
				parseInt(o.percent, 10) ||
				(parseInt(o.percent, 10) === 0 ? 0 : mode === "hide" ? 0 : 100),
			direction = o.direction || "both",
			origin = o.origin,
			original = {
				height: el.height(),
				width: el.width(),
				outerHeight: el.outerHeight(),
				outerWidth: el.outerWidth(),
			},
			factor = {
				y: direction !== "horizontal" ? percent / 100 : 1,
				x: direction !== "vertical" ? percent / 100 : 1,
			};
		options.effect = "size";
		options.queue = false;
		options.complete = done;
		if (mode !== "effect") {
			options.origin = origin || ["middle", "center"];
			options.restore = true;
		}
		options.from =
			o.from ||
			(mode === "show"
				? {height: 0, width: 0, outerHeight: 0, outerWidth: 0}
				: original);
		options.to = {
			height: original.height * factor.y,
			width: original.width * factor.x,
			outerHeight: original.outerHeight * factor.y,
			outerWidth: original.outerWidth * factor.x,
		};
		if (options.fade) {
			if (mode === "show") {
				options.from.opacity = 0;
				options.to.opacity = 1;
			}
			if (mode === "hide") {
				options.from.opacity = 1;
				options.to.opacity = 0;
			}
		}
		el.effect(options);
	};
	$.effects.effect.size = function (o, done) {
		var original,
			baseline,
			factor,
			el = $(this),
			props0 = [
				"position",
				"top",
				"bottom",
				"left",
				"right",
				"width",
				"height",
				"overflow",
				"opacity",
			],
			props1 = [
				"position",
				"top",
				"bottom",
				"left",
				"right",
				"overflow",
				"opacity",
			],
			props2 = ["width", "height", "overflow"],
			cProps = ["fontSize"],
			vProps = [
				"borderTopWidth",
				"borderBottomWidth",
				"paddingTop",
				"paddingBottom",
			],
			hProps = [
				"borderLeftWidth",
				"borderRightWidth",
				"paddingLeft",
				"paddingRight",
			],
			mode = $.effects.setMode(el, o.mode || "effect"),
			restore = o.restore || mode !== "effect",
			scale = o.scale || "both",
			origin = o.origin || ["middle", "center"],
			position = el.css("position"),
			props = restore ? props0 : props1,
			zero = {height: 0, width: 0, outerHeight: 0, outerWidth: 0};
		if (mode === "show") {
			el.show();
		}
		original = {
			height: el.height(),
			width: el.width(),
			outerHeight: el.outerHeight(),
			outerWidth: el.outerWidth(),
		};
		if (o.mode === "toggle" && mode === "show") {
			el.from = o.to || zero;
			el.to = o.from || original;
		} else {
			el.from = o.from || (mode === "show" ? zero : original);
			el.to = o.to || (mode === "hide" ? zero : original);
		}
		factor = {
			from: {
				y: el.from.height / original.height,
				x: el.from.width / original.width,
			},
			to: {y: el.to.height / original.height, x: el.to.width / original.width},
		};
		if (scale === "box" || scale === "both") {
			if (factor.from.y !== factor.to.y) {
				props = props.concat(vProps);
				el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to);
			}
			if (factor.from.x !== factor.to.x) {
				props = props.concat(hProps);
				el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from);
				el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to);
			}
		}
		if (scale === "content" || scale === "both") {
			if (factor.from.y !== factor.to.y) {
				props = props.concat(cProps).concat(props2);
				el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from);
				el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to);
			}
		}
		$.effects.save(el, props);
		el.show();
		$.effects.createWrapper(el);
		el.css("overflow", "hidden").css(el.from);
		if (origin) {
			baseline = $.effects.getBaseline(origin, original);
			el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y;
			el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x;
			el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y;
			el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x;
		}
		el.css(el.from);
		if (scale === "content" || scale === "both") {
			vProps = vProps.concat(["marginTop", "marginBottom"]).concat(cProps);
			hProps = hProps.concat(["marginLeft", "marginRight"]);
			props2 = props0.concat(vProps).concat(hProps);
			el.find("*[width]").each(function () {
				var child = $(this),
					c_original = {
						height: child.height(),
						width: child.width(),
						outerHeight: child.outerHeight(),
						outerWidth: child.outerWidth(),
					};
				if (restore) {
					$.effects.save(child, props2);
				}
				child.from = {
					height: c_original.height * factor.from.y,
					width: c_original.width * factor.from.x,
					outerHeight: c_original.outerHeight * factor.from.y,
					outerWidth: c_original.outerWidth * factor.from.x,
				};
				child.to = {
					height: c_original.height * factor.to.y,
					width: c_original.width * factor.to.x,
					outerHeight: c_original.height * factor.to.y,
					outerWidth: c_original.width * factor.to.x,
				};
				if (factor.from.y !== factor.to.y) {
					child.from = $.effects.setTransition(
						child,
						vProps,
						factor.from.y,
						child.from
					);
					child.to = $.effects.setTransition(
						child,
						vProps,
						factor.to.y,
						child.to
					);
				}
				if (factor.from.x !== factor.to.x) {
					child.from = $.effects.setTransition(
						child,
						hProps,
						factor.from.x,
						child.from
					);
					child.to = $.effects.setTransition(
						child,
						hProps,
						factor.to.x,
						child.to
					);
				}
				child.css(child.from);
				child.animate(child.to, o.duration, o.easing, function () {
					if (restore) {
						$.effects.restore(child, props2);
					}
				});
			});
		}
		el.animate(el.to, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function () {
				if (el.to.opacity === 0) {
					el.css("opacity", el.from.opacity);
				}
				if (mode === "hide") {
					el.hide();
				}
				$.effects.restore(el, props);
				if (!restore) {
					if (position === "static") {
						el.css({position: "relative", top: el.to.top, left: el.to.left});
					} else {
						$.each(["top", "left"], function (idx, pos) {
							el.css(pos, function (_, str) {
								var val = parseInt(str, 10),
									toRef = idx ? el.to.left : el.to.top;
								if (str === "auto") {
									return toRef + "px";
								}
								return val + toRef + "px";
							});
						});
					}
				}
				$.effects.removeWrapper(el);
				done();
			},
		});
	};
})(jQuery);
/*!
 * jQuery UI Effects Shake 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/shake-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.shake = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "height", "width"],
			mode = $.effects.setMode(el, o.mode || "effect"),
			direction = o.direction || "left",
			distance = o.distance || 20,
			times = o.times || 3,
			anims = times * 2 + 1,
			speed = Math.round(o.duration / anims),
			ref = direction === "up" || direction === "down" ? "top" : "left",
			positiveMotion = direction === "up" || direction === "left",
			animation = {},
			animation1 = {},
			animation2 = {},
			i,
			queue = el.queue(),
			queuelen = queue.length;
		$.effects.save(el, props);
		el.show();
		$.effects.createWrapper(el);
		animation[ref] = (positiveMotion ? "-=" : "+=") + distance;
		animation1[ref] = (positiveMotion ? "+=" : "-=") + distance * 2;
		animation2[ref] = (positiveMotion ? "-=" : "+=") + distance * 2;
		el.animate(animation, speed, o.easing);
		for (i = 1; i < times; i++) {
			el.animate(animation1, speed, o.easing).animate(
				animation2,
				speed,
				o.easing
			);
		}
		el.animate(animation1, speed, o.easing)
			.animate(animation, speed / 2, o.easing)
			.queue(function () {
				if (mode === "hide") {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			});
		if (queuelen > 1) {
			queue.splice.apply(
				queue,
				[1, 0].concat(queue.splice(queuelen, anims + 1))
			);
		}
		el.dequeue();
	};
})(jQuery);
/*!
 * jQuery UI Effects Slide 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/slide-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.slide = function (o, done) {
		var el = $(this),
			props = ["position", "top", "bottom", "left", "right", "width", "height"],
			mode = $.effects.setMode(el, o.mode || "show"),
			show = mode === "show",
			direction = o.direction || "left",
			ref = direction === "up" || direction === "down" ? "top" : "left",
			positiveMotion = direction === "up" || direction === "left",
			distance,
			animation = {};
		$.effects.save(el, props);
		el.show();
		distance =
			o.distance || el[ref === "top" ? "outerHeight" : "outerWidth"](true);
		$.effects.createWrapper(el).css({overflow: "hidden"});
		if (show) {
			el.css(
				ref,
				positiveMotion
					? isNaN(distance)
						? "-" + distance
						: -distance
					: distance
			);
		}
		animation[ref] =
			(show ? (positiveMotion ? "+=" : "-=") : positiveMotion ? "-=" : "+=") +
			distance;
		el.animate(animation, {
			queue: false,
			duration: o.duration,
			easing: o.easing,
			complete: function () {
				if (mode === "hide") {
					el.hide();
				}
				$.effects.restore(el, props);
				$.effects.removeWrapper(el);
				done();
			},
		});
	};
})(jQuery);
/*!
 * jQuery UI Effects Transfer 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/transfer-effect/
 *
 * Depends:
 * jquery.ui.effect.js
 */
(function ($, undefined) {
	$.effects.effect.transfer = function (o, done) {
		var elem = $(this),
			target = $(o.to),
			targetFixed = target.css("position") === "fixed",
			body = $("body"),
			fixTop = targetFixed ? body.scrollTop() : 0,
			fixLeft = targetFixed ? body.scrollLeft() : 0,
			endPosition = target.offset(),
			animation = {
				top: endPosition.top - fixTop,
				left: endPosition.left - fixLeft,
				height: target.innerHeight(),
				width: target.innerWidth(),
			},
			startPosition = elem.offset(),
			transfer = $("<div class='ui-effects-transfer'></div>")
				.appendTo(document.body)
				.addClass(o.className)
				.css({
					top: startPosition.top - fixTop,
					left: startPosition.left - fixLeft,
					height: elem.innerHeight(),
					width: elem.innerWidth(),
					position: targetFixed ? "fixed" : "absolute",
				})
				.animate(animation, o.duration, o.easing, function () {
					transfer.remove();
					done();
				});
	};
})(jQuery);
/*!
 * jQuery UI Position 1.10.4
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
(function ($, undefined) {
	$.ui = $.ui || {};
	var cachedScrollbarWidth,
		max = Math.max,
		abs = Math.abs,
		round = Math.round,
		rhorizontal = /left|center|right/,
		rvertical = /top|center|bottom/,
		roffset = /[\+\-]\d+(\.[\d]+)?%?/,
		rposition = /^\w+/,
		rpercent = /%$/,
		_position = $.fn.position;
	function getOffsets(offsets, width, height) {
		return [
			parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1),
			parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1),
		];
	}
	function parseCss(element, property) {
		return parseInt($.css(element, property), 10) || 0;
	}
	function getDimensions(elem) {
		var raw = elem[0];
		if (raw.nodeType === 9) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: {top: 0, left: 0},
			};
		}
		if ($.isWindow(raw)) {
			return {
				width: elem.width(),
				height: elem.height(),
				offset: {top: elem.scrollTop(), left: elem.scrollLeft()},
			};
		}
		if (raw.preventDefault) {
			return {width: 0, height: 0, offset: {top: raw.pageY, left: raw.pageX}};
		}
		return {
			width: elem.outerWidth(),
			height: elem.outerHeight(),
			offset: elem.offset(),
		};
	}
	$.position = {
		scrollbarWidth: function () {
			if (cachedScrollbarWidth !== undefined) {
				return cachedScrollbarWidth;
			}
			var w1,
				w2,
				div = $(
					"<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
				),
				innerDiv = div.children()[0];
			$("body").append(div);
			w1 = innerDiv.offsetWidth;
			div.css("overflow", "scroll");
			w2 = innerDiv.offsetWidth;
			if (w1 === w2) {
				w2 = div[0].clientWidth;
			}
			div.remove();
			return (cachedScrollbarWidth = w1 - w2);
		},
		getScrollInfo: function (within) {
			var overflowX =
					within.isWindow || within.isDocument
						? ""
						: within.element.css("overflow-x"),
				overflowY =
					within.isWindow || within.isDocument
						? ""
						: within.element.css("overflow-y"),
				hasOverflowX =
					overflowX === "scroll" ||
					(overflowX === "auto" &&
						within.width < within.element[0].scrollWidth),
				hasOverflowY =
					overflowY === "scroll" ||
					(overflowY === "auto" &&
						within.height < within.element[0].scrollHeight);
			return {
				width: hasOverflowY ? $.position.scrollbarWidth() : 0,
				height: hasOverflowX ? $.position.scrollbarWidth() : 0,
			};
		},
		getWithinInfo: function (element) {
			var withinElement = $(element || window),
				isWindow = $.isWindow(withinElement[0]),
				isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
			return {
				element: withinElement,
				isWindow: isWindow,
				isDocument: isDocument,
				offset: withinElement.offset() || {left: 0, top: 0},
				scrollLeft: withinElement.scrollLeft(),
				scrollTop: withinElement.scrollTop(),
				width: isWindow ? withinElement.width() : withinElement.outerWidth(),
				height: isWindow ? withinElement.height() : withinElement.outerHeight(),
			};
		},
	};
	$.fn.position = function (options) {
		if (!options || !options.of) {
			return _position.apply(this, arguments);
		}
		options = $.extend({}, options);
		var atOffset,
			targetWidth,
			targetHeight,
			targetOffset,
			basePosition,
			dimensions,
			target = $(options.of),
			within = $.position.getWithinInfo(options.within),
			scrollInfo = $.position.getScrollInfo(within),
			collision = (options.collision || "flip").split(" "),
			offsets = {};
		dimensions = getDimensions(target);
		if (target[0].preventDefault) {
			options.at = "left top";
		}
		targetWidth = dimensions.width;
		targetHeight = dimensions.height;
		targetOffset = dimensions.offset;
		basePosition = $.extend({}, targetOffset);
		$.each(["my", "at"], function () {
			var pos = (options[this] || "").split(" "),
				horizontalOffset,
				verticalOffset;
			if (pos.length === 1) {
				pos = rhorizontal.test(pos[0])
					? pos.concat(["center"])
					: rvertical.test(pos[0])
					? ["center"].concat(pos)
					: ["center", "center"];
			}
			pos[0] = rhorizontal.test(pos[0]) ? pos[0] : "center";
			pos[1] = rvertical.test(pos[1]) ? pos[1] : "center";
			horizontalOffset = roffset.exec(pos[0]);
			verticalOffset = roffset.exec(pos[1]);
			offsets[this] = [
				horizontalOffset ? horizontalOffset[0] : 0,
				verticalOffset ? verticalOffset[0] : 0,
			];
			options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]];
		});
		if (collision.length === 1) {
			collision[1] = collision[0];
		}
		if (options.at[0] === "right") {
			basePosition.left += targetWidth;
		} else if (options.at[0] === "center") {
			basePosition.left += targetWidth / 2;
		}
		if (options.at[1] === "bottom") {
			basePosition.top += targetHeight;
		} else if (options.at[1] === "center") {
			basePosition.top += targetHeight / 2;
		}
		atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
		basePosition.left += atOffset[0];
		basePosition.top += atOffset[1];
		return this.each(function () {
			var collisionPosition,
				using,
				elem = $(this),
				elemWidth = elem.outerWidth(),
				elemHeight = elem.outerHeight(),
				marginLeft = parseCss(this, "marginLeft"),
				marginTop = parseCss(this, "marginTop"),
				collisionWidth =
					elemWidth +
					marginLeft +
					parseCss(this, "marginRight") +
					scrollInfo.width,
				collisionHeight =
					elemHeight +
					marginTop +
					parseCss(this, "marginBottom") +
					scrollInfo.height,
				position = $.extend({}, basePosition),
				myOffset = getOffsets(
					offsets.my,
					elem.outerWidth(),
					elem.outerHeight()
				);
			if (options.my[0] === "right") {
				position.left -= elemWidth;
			} else if (options.my[0] === "center") {
				position.left -= elemWidth / 2;
			}
			if (options.my[1] === "bottom") {
				position.top -= elemHeight;
			} else if (options.my[1] === "center") {
				position.top -= elemHeight / 2;
			}
			position.left += myOffset[0];
			position.top += myOffset[1];
			if (!$.support.offsetFractions) {
				position.left = round(position.left);
				position.top = round(position.top);
			}
			collisionPosition = {marginLeft: marginLeft, marginTop: marginTop};
			$.each(["left", "top"], function (i, dir) {
				if ($.ui.position[collision[i]]) {
					$.ui.position[collision[i]][dir](position, {
						targetWidth: targetWidth,
						targetHeight: targetHeight,
						elemWidth: elemWidth,
						elemHeight: elemHeight,
						collisionPosition: collisionPosition,
						collisionWidth: collisionWidth,
						collisionHeight: collisionHeight,
						offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
						my: options.my,
						at: options.at,
						within: within,
						elem: elem,
					});
				}
			});
			if (options.using) {
				using = function (props) {
					var left = targetOffset.left - position.left,
						right = left + targetWidth - elemWidth,
						top = targetOffset.top - position.top,
						bottom = top + targetHeight - elemHeight,
						feedback = {
							target: {
								element: target,
								left: targetOffset.left,
								top: targetOffset.top,
								width: targetWidth,
								height: targetHeight,
							},
							element: {
								element: elem,
								left: position.left,
								top: position.top,
								width: elemWidth,
								height: elemHeight,
							},
							horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
							vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle",
						};
					if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
						feedback.horizontal = "center";
					}
					if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
						feedback.vertical = "middle";
					}
					if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
						feedback.important = "horizontal";
					} else {
						feedback.important = "vertical";
					}
					options.using.call(this, props, feedback);
				};
			}
			elem.offset($.extend(position, {using: using}));
		});
	};
	$.ui.position = {
		fit: {
			left: function (position, data) {
				var within = data.within,
					withinOffset = within.isWindow
						? within.scrollLeft
						: within.offset.left,
					outerWidth = within.width,
					collisionPosLeft = position.left - data.collisionPosition.marginLeft,
					overLeft = withinOffset - collisionPosLeft,
					overRight =
						collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
					newOverRight;
				if (data.collisionWidth > outerWidth) {
					if (overLeft > 0 && overRight <= 0) {
						newOverRight =
							position.left +
							overLeft +
							data.collisionWidth -
							outerWidth -
							withinOffset;
						position.left += overLeft - newOverRight;
					} else if (overRight > 0 && overLeft <= 0) {
						position.left = withinOffset;
					} else {
						if (overLeft > overRight) {
							position.left = withinOffset + outerWidth - data.collisionWidth;
						} else {
							position.left = withinOffset;
						}
					}
				} else if (overLeft > 0) {
					position.left += overLeft;
				} else if (overRight > 0) {
					position.left -= overRight;
				} else {
					position.left = max(position.left - collisionPosLeft, position.left);
				}
			},
			top: function (position, data) {
				var within = data.within,
					withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
					outerHeight = data.within.height,
					collisionPosTop = position.top - data.collisionPosition.marginTop,
					overTop = withinOffset - collisionPosTop,
					overBottom =
						collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
					newOverBottom;
				if (data.collisionHeight > outerHeight) {
					if (overTop > 0 && overBottom <= 0) {
						newOverBottom =
							position.top +
							overTop +
							data.collisionHeight -
							outerHeight -
							withinOffset;
						position.top += overTop - newOverBottom;
					} else if (overBottom > 0 && overTop <= 0) {
						position.top = withinOffset;
					} else {
						if (overTop > overBottom) {
							position.top = withinOffset + outerHeight - data.collisionHeight;
						} else {
							position.top = withinOffset;
						}
					}
				} else if (overTop > 0) {
					position.top += overTop;
				} else if (overBottom > 0) {
					position.top -= overBottom;
				} else {
					position.top = max(position.top - collisionPosTop, position.top);
				}
			},
		},
		flip: {
			left: function (position, data) {
				var within = data.within,
					withinOffset = within.offset.left + within.scrollLeft,
					outerWidth = within.width,
					offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
					collisionPosLeft = position.left - data.collisionPosition.marginLeft,
					overLeft = collisionPosLeft - offsetLeft,
					overRight =
						collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
					myOffset =
						data.my[0] === "left"
							? -data.elemWidth
							: data.my[0] === "right"
							? data.elemWidth
							: 0,
					atOffset =
						data.at[0] === "left"
							? data.targetWidth
							: data.at[0] === "right"
							? -data.targetWidth
							: 0,
					offset = -2 * data.offset[0],
					newOverRight,
					newOverLeft;
				if (overLeft < 0) {
					newOverRight =
						position.left +
						myOffset +
						atOffset +
						offset +
						data.collisionWidth -
						outerWidth -
						withinOffset;
					if (newOverRight < 0 || newOverRight < abs(overLeft)) {
						position.left += myOffset + atOffset + offset;
					}
				} else if (overRight > 0) {
					newOverLeft =
						position.left -
						data.collisionPosition.marginLeft +
						myOffset +
						atOffset +
						offset -
						offsetLeft;
					if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
						position.left += myOffset + atOffset + offset;
					}
				}
			},
			top: function (position, data) {
				var within = data.within,
					withinOffset = within.offset.top + within.scrollTop,
					outerHeight = within.height,
					offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
					collisionPosTop = position.top - data.collisionPosition.marginTop,
					overTop = collisionPosTop - offsetTop,
					overBottom =
						collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
					top = data.my[1] === "top",
					myOffset = top
						? -data.elemHeight
						: data.my[1] === "bottom"
						? data.elemHeight
						: 0,
					atOffset =
						data.at[1] === "top"
							? data.targetHeight
							: data.at[1] === "bottom"
							? -data.targetHeight
							: 0,
					offset = -2 * data.offset[1],
					newOverTop,
					newOverBottom;
				if (overTop < 0) {
					newOverBottom =
						position.top +
						myOffset +
						atOffset +
						offset +
						data.collisionHeight -
						outerHeight -
						withinOffset;
					if (
						position.top + myOffset + atOffset + offset > overTop &&
						(newOverBottom < 0 || newOverBottom < abs(overTop))
					) {
						position.top += myOffset + atOffset + offset;
					}
				} else if (overBottom > 0) {
					newOverTop =
						position.top -
						data.collisionPosition.marginTop +
						myOffset +
						atOffset +
						offset -
						offsetTop;
					if (
						position.top + myOffset + atOffset + offset > overBottom &&
						(newOverTop > 0 || abs(newOverTop) < overBottom)
					) {
						position.top += myOffset + atOffset + offset;
					}
				}
			},
		},
		flipfit: {
			left: function () {
				$.ui.position.flip.left.apply(this, arguments);
				$.ui.position.fit.left.apply(this, arguments);
			},
			top: function () {
				$.ui.position.flip.top.apply(this, arguments);
				$.ui.position.fit.top.apply(this, arguments);
			},
		},
	};
	(function () {
		var testElement,
			testElementParent,
			testElementStyle,
			offsetLeft,
			i,
			body = document.getElementsByTagName("body")[0],
			div = document.createElement("div");
		testElement = document.createElement(body ? "div" : "body");
		testElementStyle = {
			visibility: "hidden",
			width: 0,
			height: 0,
			border: 0,
			margin: 0,
			background: "none",
		};
		if (body) {
			$.extend(testElementStyle, {
				position: "absolute",
				left: "-1000px",
				top: "-1000px",
			});
		}
		for (i in testElementStyle) {
			testElement.style[i] = testElementStyle[i];
		}
		testElement.appendChild(div);
		testElementParent = body || document.documentElement;
		testElementParent.insertBefore(testElement, testElementParent.firstChild);
		div.style.cssText = "position: absolute; left: 10.7432222px;";
		offsetLeft = $(div).offset().left;
		$.support.offsetFractions = offsetLeft > 10 && offsetLeft < 11;
		testElement.innerHTML = "";
		testElementParent.removeChild(testElement);
	})();
})(jQuery);
window.Modernizr = (function (window, document, undefined) {
	var version = "2.8.3",
		Modernizr = {},
		enableClasses = true,
		docElement = document.documentElement,
		mod = "modernizr",
		modElem = document.createElement(mod),
		mStyle = modElem.style,
		inputElem,
		toString = {}.toString,
		prefixes = " -webkit- -moz- -o- -ms- ".split(" "),
		omPrefixes = "Webkit Moz O ms",
		cssomPrefixes = omPrefixes.split(" "),
		domPrefixes = omPrefixes.toLowerCase().split(" "),
		tests = {},
		inputs = {},
		attrs = {},
		classes = [],
		slice = classes.slice,
		featureName,
		injectElementWithStyles = function (rule, callback, nodes, testnames) {
			var style,
				ret,
				node,
				docOverflow,
				div = document.createElement("div"),
				body = document.body,
				fakeBody = body || document.createElement("body");
			if (parseInt(nodes, 10)) {
				while (nodes--) {
					node = document.createElement("div");
					node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
					div.appendChild(node);
				}
			}
			style = ["&#173;", '<style id="s', mod, '">', rule, "</style>"].join("");
			div.id = mod;
			(body ? div : fakeBody).innerHTML += style;
			fakeBody.appendChild(div);
			if (!body) {
				fakeBody.style.background = "";
				fakeBody.style.overflow = "hidden";
				docOverflow = docElement.style.overflow;
				docElement.style.overflow = "hidden";
				docElement.appendChild(fakeBody);
			}
			ret = callback(div, rule);
			if (!body) {
				fakeBody.parentNode.removeChild(fakeBody);
				docElement.style.overflow = docOverflow;
			} else {
				div.parentNode.removeChild(div);
			}
			return !!ret;
		},
		_hasOwnProperty = {}.hasOwnProperty,
		hasOwnProp;
	if (
		!is(_hasOwnProperty, "undefined") &&
		!is(_hasOwnProperty.call, "undefined")
	) {
		hasOwnProp = function (object, property) {
			return _hasOwnProperty.call(object, property);
		};
	} else {
		hasOwnProp = function (object, property) {
			return (
				property in object &&
				is(object.constructor.prototype[property], "undefined")
			);
		};
	}
	if (!Function.prototype.bind) {
		Function.prototype.bind = function bind(that) {
			var target = this;
			if (typeof target != "function") {
				throw new TypeError();
			}
			var args = slice.call(arguments, 1),
				bound = function () {
					if (this instanceof bound) {
						var F = function () {};
						F.prototype = target.prototype;
						var self = new F();
						var result = target.apply(self, args.concat(slice.call(arguments)));
						if (Object(result) === result) {
							return result;
						}
						return self;
					} else {
						return target.apply(that, args.concat(slice.call(arguments)));
					}
				};
			return bound;
		};
	}
	function setCss(str) {
		mStyle.cssText = str;
	}
	function setCssAll(str1, str2) {
		return setCss(prefixes.join(str1 + ";") + (str2 || ""));
	}
	function is(obj, type) {
		return typeof obj === type;
	}
	function contains(str, substr) {
		return !!~("" + str).indexOf(substr);
	}
	function testProps(props, prefixed) {
		for (var i in props) {
			var prop = props[i];
			if (!contains(prop, "-") && mStyle[prop] !== undefined) {
				return prefixed == "pfx" ? prop : true;
			}
		}
		return false;
	}
	function testDOMProps(props, obj, elem) {
		for (var i in props) {
			var item = obj[props[i]];
			if (item !== undefined) {
				if (elem === false) return props[i];
				if (is(item, "function")) {
					return item.bind(elem || obj);
				}
				return item;
			}
		}
		return false;
	}
	function testPropsAll(prop, prefixed, elem) {
		var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
			props = (prop + " " + cssomPrefixes.join(ucProp + " ") + ucProp).split(
				" "
			);
		if (is(prefixed, "string") || is(prefixed, "undefined")) {
			return testProps(props, prefixed);
		} else {
			props = (prop + " " + domPrefixes.join(ucProp + " ") + ucProp).split(" ");
			return testDOMProps(props, prefixed, elem);
		}
	}
	tests["touch"] = function () {
		var bool;
		if (
			"ontouchstart" in window ||
			(window.DocumentTouch && document instanceof DocumentTouch)
		) {
			bool = true;
		} else {
			injectElementWithStyles(
				[
					"@media (",
					prefixes.join("touch-enabled),("),
					mod,
					")",
					"{#modernizr{top:9px;position:absolute}}",
				].join(""),
				function (node) {
					bool = node.offsetTop === 9;
				}
			);
		}
		return bool;
	};
	tests["csstransforms"] = function () {
		return !!testPropsAll("transform");
	};
	tests["csstransforms3d"] = function () {
		var ret = !!testPropsAll("perspective");
		if (ret && "webkitPerspective" in docElement.style) {
			injectElementWithStyles(
				"@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
				function (node, rule) {
					ret = node.offsetLeft === 9 && node.offsetHeight === 3;
				}
			);
		}
		return ret;
	};
	tests["csstransitions"] = function () {
		return testPropsAll("transition");
	};
	tests["localstorage"] = function () {
		try {
			localStorage.setItem(mod, mod);
			localStorage.removeItem(mod);
			return true;
		} catch (e) {
			return false;
		}
	};
	for (var feature in tests) {
		if (hasOwnProp(tests, feature)) {
			featureName = feature.toLowerCase();
			Modernizr[featureName] = tests[feature]();
			classes.push((Modernizr[featureName] ? "" : "no-") + featureName);
		}
	}
	Modernizr.addTest = function (feature, test) {
		if (typeof feature == "object") {
			for (var key in feature) {
				if (hasOwnProp(feature, key)) {
					Modernizr.addTest(key, feature[key]);
				}
			}
		} else {
			feature = feature.toLowerCase();
			if (Modernizr[feature] !== undefined) {
				return Modernizr;
			}
			test = typeof test == "function" ? test() : test;
			if (typeof enableClasses !== "undefined" && enableClasses) {
				docElement.className += " diy-" + (test ? "" : "no-") + feature;
			}
			Modernizr[feature] = test;
		}
		return Modernizr;
	};
	setCss("");
	modElem = inputElem = null;
	Modernizr._version = version;
	Modernizr._prefixes = prefixes;
	Modernizr._domPrefixes = domPrefixes;
	Modernizr._cssomPrefixes = cssomPrefixes;
	Modernizr.testProp = function (prop) {
		return testProps([prop]);
	};
	Modernizr.testAllProps = testPropsAll;
	Modernizr.testStyles = injectElementWithStyles;
	docElement.className =
		docElement.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
		(enableClasses ? " diy-js diy-" + classes.join(" diy-") : "");
	return Modernizr;
})(this, this.document);
window.diy.ux.Captcha = {
	locales: {
		generateNewCode: "Generate new code",
		enterCode: "Please enter the code",
	},
	getUrl: function (captchaId) {
		var prefix = "";
		if (
			!(typeof proxyName == "undefined" || typeof webServerName == "undefined")
		) {
			prefix = "//" + proxyName + webServerName;
		}
		return (
			prefix +
			"/app/common/captcha/index/captchaId/" +
			captchaId +
			"/t/" +
			new Date().getTime() +
			"?" +
			this.getSessionNamespace() +
			"=" +
			this.getSessionCookieValue()
		);
	},
	getSessionNamespace: function () {
		if (typeof sessionNamespace == "undefined") {
			return "DIY_SB";
		}
		return sessionNamespace;
	},
	getSessionCookieValue: function () {
		if (typeof document.cookie != "undefined") {
			var m = document.cookie.match(
				RegExp(this.getSessionNamespace() + "=([^;]+)[;]{0,1}")
			);
			if (m.length == 2) {
				return m[1];
			}
		}
		return "";
	},
	create: function (container, captchaId) {
		container = jQuery(container);
		var html = "";
		html += '<div class="captcha">';
		html += '<span class="character">';
		html +=
			'<img src="' +
			this.getUrl(captchaId) +
			'" id="captchaImage' +
			captchaId +
			'" />';
		html += "</span>";
		html += '<a class="refresh" href="#" ';
		html += 'title="' + this.locales["generateNewCode"] + '" ';
		html +=
			"onclick=\"jQuery('#captchaImage" +
			captchaId +
			"').attr('src', window.diy.ux.Captcha.getUrl('" +
			captchaId +
			"')); return false;\"></a> ";
		html += '<div class="captcha-bottom">';
		html +=
			"<span>" +
			this.locales["enterCode"] +
			'<input class="single" type="text" name="captcha" />';
		html += "</span>";
		html += "</div>";
		html += "</div>";
		container.empty().append(html);
	},
};
window.diy.ux.Cap2 = {
	locales: {
		generateNewCode: "Generate new code",
		enterCode: "Please enter the code",
	},
	getUrl: function (capId) {
		var prefix = "";
		if (
			!(typeof proxyName == "undefined" || typeof webServerName == "undefined")
		) {
			prefix = "//" + proxyName + webServerName;
		}
		return (
			prefix +
			"/app/common/cap2/index/capId/" +
			capId +
			"/t/" +
			new Date().getTime() +
			"?" +
			this.getSessionNamespace() +
			"=" +
			this.getSessionCookieValue()
		);
	},
	getSessionNamespace: function () {
		if (typeof sessionNamespace == "undefined") {
			return "DIY_SB";
		}
		return sessionNamespace;
	},
	getSessionCookieValue: function () {
		if (typeof document.cookie != "undefined") {
			var m = document.cookie.match(
				RegExp(this.getSessionNamespace() + "=([^;]+)[;]{0,1}")
			);
			if (m.length == 2) {
				return m[1];
			}
		}
		return "";
	},
	refreshCap: function (capId) {
		jQuery("#capImg" + capId).attr("src", this.getUrl(capId));
		return false;
	},
	create: function (container, capId) {
		container = jQuery(container);
		if (
			window.diy &&
			window.diy.ux &&
			window.diy.ux.Captcha &&
			window.diy.ux.Captcha.locales
		) {
			window.diy.ux.Cap2.locales = window.diy.ux.Captcha.locales;
		}
		var html = [
			'<div class="diys-cap2">',
			'<span class="character">',
			'<img src="' + this.getUrl(capId) + '" id="capImg' + capId + '" />',
			"</span>",
			'<div class="cap-bottom"><span>' + this.locales["enterCode"],
			'<a class="refresh" href="javascript:" title="' +
				this.locales["generateNewCode"] +
				'" onclick="jQuery(\'#capImg' +
				capId +
				"').attr('src', diy.ux.Cap2.getUrl('" +
				capId +
				"')); return false;\">&#8634;</a> ",
			'<input class="single" type="text" name="cap" /> </span></div>',
			"</div>",
		];
		container.empty().append(html.join("\n"));
	},
};
function isInfinity(x) {
	return Number.POSITIVE_INFINITY === x || Number.NEGATIVE_INFINITY === x;
}
Math.isInfinity = isInfinity;
Math.roundTo = function (value, decimals) {
	value = Number(value);
	if (isNaN(value)) {
		return NaN;
	}
	if (undefined === decimals) {
		return Math.round(value);
	}
	decimals = parseInt(decimals, 10);
	if (isNaN(decimals) || decimals < 0) {
		return NaN;
	}
	if (0 === decimals) {
		return Math.round(value);
	}
	var factor = Math.pow(10, decimals);
	if (isInfinity(factor)) {
		return NaN;
	}
	var partial = value * factor;
	if (isInfinity(partial)) {
		return NaN;
	}
	return Math.round(partial) / factor;
};
jQuery.isBrowser = {
	ie6: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) < 7,
	ie7: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) === 7,
	ie8: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) === 8,
	ie9: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) === 9,
	ie10: jQuery.browser.msie && parseInt(jQuery.browser.version, 10) === 10,
};
(function ($) {
	$.fn.jimdoForm = function (scrollElem, callback) {
		return $(this)
			.add($("form", this))
			.filter("form:not(.no-x-web-forms):not(.x-web-forms)")
			.each(function () {
				bindForm($(this), $(scrollElem || "html"), callback);
			});
	};
	function bindForm($form, $scrollElem, callback) {
		var usingLegacyMessage = true;
		if ($.fn.diy_form) {
			usingLegacyMessage = false;
			$form.diy_form();
		}
		$form.xWebForms({
			submit: function (e, xWebForms) {
				if (!usingLegacyMessage) {
					$form.diy_form("clearErrors");
				}
				var sendingText = $.trim($(xWebForms.submitElem).attr("data-sending"));
				if (sendingText) {
					xWebForms.buttonOriginText = $(xWebForms.submitElem).html();
					$(xWebForms.submitElem).html(sendingText);
				}
				var $button = $("button:last", $form);
				if ($(xWebForms.submitElem).attr("data-loading")) {
					xWebForms.loadingAnim = $button.parent().loadingBox();
					xWebForms.loadingAnim.show();
				} else {
					xWebForms.loadingAnim = $('<span class="x-web-forms-sending-img"/>')
						.insertAfter($button)
						.css({
							marginTop: $button.css("marginTop"),
							height: $button.height(),
							float: $button.css("float"),
						});
				}
			},
			complete: function (xhr, opts, xWebForms) {
				xWebForms.loadingAnim.remove();
				$(xWebForms.submitElem).html(xWebForms.buttonOriginText);
			},
			success: function (data, msg, xWebForms) {
				if (typeof data == "undefined" || data == null) {
					return;
				}
				if (data.payload) {
					$.payload(data.payload);
					$.error(
						"jimdoForm: payload no longer supported. Please replace with client-side logic"
					);
				}
				if (data.status == "success") {
					if (data.callback) {
						data.onClose = function () {
							$.payload(data.callback);
						};
						$.error(
							"jimdoForm: payload callback no longer supported. Please replace with client-side logic"
						);
					}
					if (data.message) {
						if (typeof data.message == "string") {
							if (usingLegacyMessage) {
								data.autoTarget = false;
								$form.message(data);
							} else {
								$form.diy_form("showMessage", data.message, "success");
							}
						} else {
							$.error(
								"jimdoForm: success messages on individual fields are not supported"
							);
						}
						if (data.values) {
							$.each(data.values, function (name, value) {
								$('[name="' + name + '"]', $form).val(value);
							});
						}
					}
					$form.trigger("uploadSuccess", [data, msg, xWebForms]);
					$form.trigger("formSuccess", [data, msg, xWebForms]);
				} else if (data.status == "error") {
					$form.trigger("uploadError", [data, msg, xWebForms]);
					$form.trigger("formError", [data, msg, xWebForms]);
					$.each(data.errors, function (name, message) {
						var $elem = $('[name="' + name + '"]', $form);
						data.message = message;
						if (usingLegacyMessage) {
							$elem.message(data);
						} else {
							var $formField = $elem.closest(":diy-formField");
							$form.diy_form("addError", message, $formField);
						}
					});
				}
				if (typeof callback == "function") {
					callback(data);
				}
			},
			error: function (xhr, status, e) {
				if (e == "timeout") {
					if (usingLegacyMessage) {
						$form.message({
							autoTarget: false,
							message: jimdoData.messages.timeout,
							status: status,
						});
					} else {
						$form.diy_form("addError", jimdoData.messages.timeout);
					}
				}
			},
		});
		jimdoData &&
			jimdoData.cstok &&
			$form.prepend(
				'<input type="hidden" name="cstok" value="' + jimdoData.cstok + '"/>'
			);
	}
	$.payload = function (payload) {
		if (!payload) return false;
		if (typeof payload != "object")
			throw "payload should contain json data object";
		$.each(payload, function (selector, data) {
			selector = selector == "window" ? window : selector;
			var $query = $(selector);
			if (typeof data == "string") {
				$query[data]();
				return;
			}
			$.each(data, function (method, params) {
				$.isArray(params)
					? $query[method](params[0], params[1], params[2])
					: $query[method](params);
			});
		});
	};
})(jQuery);
(function ($) {
	$.fn.tinyLightbox = function (options) {
		return this.each(function () {
			!$.data(this, "tinyLightbox") &&
				$.data(this, "tinyLightbox", new tinyLightbox(this, options)).init();
		});
	};
	$.fn.tinyLightbox.defaults = {
		item: "a",
		slideshowSpeed: 5000,
		slideshowAutostart: false,
		pathAttr: "href",
		descrAttr: "title",
		speed: 250,
		repositionSpeed: 50,
		labelImage:
			jimdoData.messages &&
			jimdoData.messages.lightBox &&
			jimdoData.messages.lightBox.image
				? jimdoData.messages.lightBox.image
				: "Image",
		labelOf:
			jimdoData.messages &&
			jimdoData.messages.lightBox &&
			jimdoData.messages.lightBox.of
				? jimdoData.messages.lightBox.of
				: "of",
		animations: "original",
		keyNavigation: true,
		cycle: false,
		minWidth: 200,
		minHeight: 100,
		overlayOpacity: 0.7,
		bgiframe: true,
		hideNavigation: false,
	};
	var tinyLightbox = function (container, options) {
		var d = (this.d = $.extend({}, $.fn.tinyLightbox.defaults, options));
		var template =
			'\
            <div class="tiny-lightbox tiny-lightbox-animating tiny-lightbox-loading">\
                <div class="tiny-lightbox-overlay" data-action="close"></div>\
                <div class="tiny-lightbox-box" >\
                    <div class="tiny-lightbox-image"></div>\
                    <a class="tiny-lightbox-prev" data-action="showPrev" hidefocus="hidefocus" href="#">\
                        <span data-action="showPrev"></span>\
                    </a>\
                    <a class="tiny-lightbox-next" data-action="showNext" hidefocus="hidefocus" href="#">\
                        <span data-action="showNext"></span>\
                    </a>\
                </div>\
                <div class="tiny-lightbox-bar">\
                    <div class="tiny-lightbox-description"></div>\
                    <span class="tiny-lightbox-stats"></span>\
                    <a class="tiny-lightbox-close" title="Close" alt="Close" data-action="close" href="#"></a>\
                    <a class="tiny-lightbox-slideshow" title="Slideshow" alt="Slideshow" data-action="slideshow" href="#"/>\
                </div>\
            </div>\
        ';
		var self = this,
			$container = $(container),
			$elems,
			$stats,
			$descr,
			$prevNext,
			$slideshow,
			animations = new $.fn.tinyLightbox[d.animations](self),
			images = [],
			descr = [],
			activeImageId,
			running,
			cycle = d.cycle;
		this.init = function () {
			$elems = $(d.item + "[" + d.pathAttr + "]", $container).click(
				function () {
					if (self.$tl) return false;
					$elems.each(function (i, elem) {
						images[i] = $(elem).attr(d.pathAttr);
						descr[i] = $.trim($(elem).attr(d.descrAttr)) || "";
					});
					self.$tl = $(template).appendTo(document.body);
					self.$overlay = $(".tiny-lightbox-overlay", self.$tl).css(
						"opacity",
						d.overlayOpacity
					);
					resizeOverlay();
					self.$box = $(".tiny-lightbox-box", self.$tl);
					self.$image = $(".tiny-lightbox-image", self.$box);
					self.boxData = {
						width: self.$box.width(),
						height: self.$box.height(),
						top: parseInt(self.$box.css("top")),
						borderWidth:
							(self.$box.outerWidth() - self.$box.innerWidth()) / 2 || 0,
					};
					self.path = $(this).attr(d.pathAttr);
					activeImageId = $.inArray(self.path, images);
					self.$bar = $(".tiny-lightbox-bar", self.$tl);
					$descr = $(".tiny-lightbox-description", self.$bar);
					$stats = $(".tiny-lightbox-stats", self.$bar);
					$slideshow = $(".tiny-lightbox-slideshow", self.$bar);
					updateBar();
					self.$tl.click(function (e) {
						var act = $(e.target).attr("data-action");
						if (!act) return;
						self[act]();
						return false;
					});
					$prevNext = $(
						".tiny-lightbox-next, .tiny-lightbox-prev",
						self.$box
					).hover(
						function () {
							$("span", this).addClass("tiny-lightbox-hover");
						},
						function () {
							$("span", this).removeClass("tiny-lightbox-hover");
						}
					);
					if (d.hideNavigation) {
						$stats.hide();
						$prevNext.hide();
						$slideshow.hide();
					}
					d.keyNavigation && $(document).keydown(keyNavigation);
					d.bgiframe && $.fn.bgiframe && self.$tl.bgiframe();
					getLeft();
					getTop();
					if (self.isInFacebook()) {
						FB.Canvas.setAutoGrow(false);
						FB.Canvas.getPageInfo(function (info) {
							var scrollTop = info.scrollTop;
							self.docData = {
								width: $(window).width(),
								height: $(window).height(),
								scrollTop: scrollTop,
							};
							self.$tl.css({
								height: self.docData.height,
								width: self.docData.width,
							});
							self.boxData = {
								width: self.$box.width(),
								height: self.$box.height(),
								top: parseInt(self.$box.css("top")),
								borderWidth:
									(self.$box.outerWidth() - self.$box.innerWidth()) / 2 || 0,
							};
							animations.init(function () {
								preload(self.path, function () {
									animations.animate(function () {
										FB.Canvas.getPageInfo(function (info) {
											var scrollTop = info.scrollTop;
											resizeOverlay(scrollTop);
											self.$tl.removeClass("tiny-lightbox-animating");
											if (d.slideshowAutostart) {
												running = setTimeout(self.slideshow, d.slideshowSpeed);
												self.$bar.addClass("tiny-lightbox-slideshow-running");
											}
										});
									});
								});
							});
						});
						return false;
					}
					var animationSet = function (path, callback) {
						preload(path, function () {
							animations.animate(function () {
								resizeOverlay();
								self.$tl.removeClass("tiny-lightbox-animating");
								if (d.slideshowAutostart) {
									running = setTimeout(self.slideshow, d.slideshowSpeed);
									self.$bar.addClass("tiny-lightbox-slideshow-running");
								}
								if (callback && callback.call) {
									callback.call();
								}
							});
						});
					};
					animations.init(function () {
						animationSet(self.path);
					});
					$(window).resize(resizeAdjust);
					return false;
				}
			);
		};
		this.isInFacebook = function () {
			return (
				jQuery(document.body).hasClass("facebookTab") &&
				typeof FB != "undefined" &&
				typeof FB.Canvas != "undefined" &&
				typeof FB.Canvas.getPageInfo == "function"
			);
		};
		this.showNext = function () {
			change(activeImageId + 1);
		};
		this.showPrev = function () {
			change(activeImageId - 1);
		};
		this.slideshow = function (sw) {
			if (running && !sw) {
				clearTimeout(running);
				cycle = d.cycle;
				self.$bar.removeClass("tiny-lightbox-slideshow-running");
				running = false;
			} else {
				cycle = true;
				self.$bar.addClass("tiny-lightbox-slideshow-running");
				change(activeImageId + 1, function () {
					running = setTimeout(function () {
						self.slideshow(true);
					}, d.slideshowSpeed);
				});
			}
		};
		this.close = function () {
			clearTimeout(running);
			$(window).unbind("resize", resizeAdjust);
			$(document).unbind("keydown", keyNavigation);
			$prevNext.unbind("hover");
			animations.close(function () {
				if (!self.$tl) return;
				self.$tl.unbind("click").remove();
				delete self.$tl;
			});
		};
		function resizeAdjust() {
			resizeOverlay();
			preload(self.path, function () {
				animations.reposition();
			});
		}
		function resizeOverlay(scrollTop) {
			self.docData = {
				width: $(window).width(),
				height: $(window).height(),
				scrollTop: scrollTop ? scrollTop : $(window).scrollTop(),
			};
			self.$tl
				.add(self.$overlay)
				.css({height: self.docData.height, width: self.docData.width});
			if (scrollTop === undefined && self.isInFacebook()) {
				FB.Canvas.getPageInfo(function (info) {
					var scrollTop = info.scrollTop - info.offsetTop;
					self.docData.scrollTop = scrollTop;
				});
			}
		}
		function keyNavigation(e) {
			e.keyCode == 39
				? self.showNext()
				: e.keyCode == 37
				? self.showPrev()
				: e.keyCode == 27 && self.close();
		}
		function preload(url, callback) {
			self.$tl.addClass("tiny-lightbox-loading");
			var img = new Image();
			img.onload = function () {
				self.$tl.removeClass("tiny-lightbox-loading");
				var aspectRatio = img.width / img.height,
					maxWidth = self.docData.width - self.boxData.borderWidth * 2 - 10,
					maxHeight =
						self.docData.height -
						self.boxData.borderWidth * 2 -
						10 -
						self.$bar.height(),
					finalWidth = img.width,
					finalHeight = img.height;
				if (img.width > maxWidth || img.width < d.minWidth) {
					finalWidth = img.width > maxWidth ? maxWidth : d.minWidth;
					finalHeight = img.height * (finalWidth / img.width);
				}
				if (finalHeight > maxHeight && finalWidth > d.minWidth) {
					finalHeight = maxHeight;
					finalWidth = img.width * (finalHeight / img.height);
				}
				$.extend(self.boxData, {width: finalWidth, height: finalHeight});
				getLeft();
				getTop();
				callback();
			};
			img.src = self.path = url;
		}
		function getLeft() {
			return (self.boxData.left =
				(self.docData.width -
					(self.boxData.width + self.boxData.borderWidth * 2)) /
				2);
		}
		function getTop() {
			self.$bar.addClass("tiny-lightbox-hidden-accessible");
			self.$bar.css({width: self.boxData.width});
			self.boxData.top =
				(self.docData.height -
					(self.boxData.height +
						self.boxData.borderWidth * 2 +
						self.$bar.height())) /
				2;
			self.$bar.removeClass("tiny-lightbox-hidden-accessible");
			return self.boxData.top;
		}
		function updateBar() {
			$stats.text(
				d.labelImage +
					" " +
					(activeImageId + 1) +
					" " +
					d.labelOf +
					" " +
					$elems.length
			);
			$descr
				.html(descr[activeImageId])
				[descr[activeImageId] ? "show" : "hide"]();
		}
		function change(id, callback) {
			if (self.$tl.hasClass("tiny-lightbox-animating")) return;
			if (id > images.length - 1 || id < 0) {
				if (cycle) change(id < 0 ? images.length - 1 : 0, callback);
				else {
					self.$tl.addClass("tiny-lightbox-animating");
					animations.limit(function () {
						self.$tl.removeClass("tiny-lightbox-animating");
					});
				}
				return;
			}
			activeImageId = id;
			self.$tl.addClass("tiny-lightbox-animating");
			animations.prepare(function () {
				updateBar();
				preload(images[activeImageId], function () {
					animations.animate(function () {
						self.$tl.removeClass("tiny-lightbox-animating");
						resizeOverlay();
						$(callback);
					});
				});
			});
		}
	};
})(jQuery);
(function ($) {
	$.fn.tinyLightbox.original = function (tl) {
		var self = this;
		this.init = function (callback) {
			tl.$overlay.animate({opacity: "show"}, tl.d.speed, function () {
				tl.$box.css({
					visibility: "visible",
					left: tl.boxData.left,
					top: tl.boxData.top,
				});
				callback();
			});
		};
		this.animate = function (callback) {
			tl.$box.animate(
				{height: tl.boxData.height, top: tl.boxData.top},
				tl.d.speed,
				function () {
					$(this).animate(
						{width: tl.boxData.width, left: tl.boxData.left},
						tl.d.speed,
						function () {
							tl.$image
								.css("background-image", "url(" + tl.path + ")")
								.fadeIn(tl.d.speed, function () {
									tl.$bar
										.css({
											top:
												tl.boxData.top +
												tl.boxData.height +
												tl.boxData.borderWidth * 2,
											left: tl.boxData.left,
											width: tl.boxData.width,
										})
										.slideDown(tl.d.speed, callback);
								});
						}
					);
				}
			);
		};
		this.reposition = function (callback) {
			tl.$box.css({
				height: tl.boxData.height,
				width: tl.boxData.width,
				left: tl.boxData.left,
				top: tl.boxData.top,
			});
			tl.$bar.css({
				top: tl.boxData.top + tl.boxData.height + tl.boxData.borderWidth * 2,
				left: tl.boxData.left,
				width: tl.boxData.width,
			});
			if (callback && callback.call) {
				callback.call();
			}
		};
		this.prepare = function (callback) {
			tl.$bar.slideUp(tl.d.speed, function () {
				tl.$image.fadeOut(tl.d.speed, callback);
			});
		};
		this.close = function (callback) {
			self.prepare(function () {
				tl.$box.fadeOut(tl.d.speed, function () {
					tl.$overlay.fadeOut(tl.d.speed, callback);
				});
			});
		};
		this.limit = function (callback) {
			shake(4, tl.d.speed / 2, 40, "+", 0);
			function shake(times, speed, distance, dir, timesNow) {
				timesNow++;
				dir = dir == "+" ? "-" : "+";
				tl.$bar.hide();
				tl.$box.animate({left: dir + "=" + distance}, speed, function () {
					timesNow < times
						? shake(times, speed, distance, dir, timesNow)
						: tl.$bar.show() && callback();
				});
			}
		};
	};
})(jQuery);
(function ($) {
	$.fn.extend({
		flash: function (params, attr, opts) {
			if (params && params.version && !$.flash.detectVersion(params.version))
				return this;
			var args = Array.prototype.slice.call(arguments, 1);
			return this.each(function () {
				var method = typeof options == "string" ? options : "init",
					flash =
						$.data(this, "flash") ||
						$.data(this, "flash", new $.flash(this, params, attr, opts));
				flash[method].apply(flash, args);
			});
		},
	});
	$.flash = function (elem, parameters, attributes, options) {
		var params = {
			allowfullscreen: true,
			allowscriptaccess: "always",
			quality: "best",
			wmode: "transparent",
			bgcolor: null,
			flashvars: {},
			menu: false,
			version: null,
		};
		$.extend(params, parameters);
		var attr = {
			width: "100%",
			height: "100%",
			type: "application/x-shockwave-flash",
			src: null,
		};
		$.extend(attr, attributes);
		var opts = {autoadjustratio: false, maxwidth: false, maxheight: false};
		$.extend(opts, options);
		var pluginspage = "http://www.adobe.com/go/getflashplayer",
			version = params.version,
			$elem = $(elem),
			$flash;
		this.init = function () {
			if ($.browser.msie) params.movie = attr.src;
			params.version = null;
			if (opts.autoadjustratio && opts.autoadjustratio > 0) {
				var width = $elem.width();
				var height = "100%";
				if (opts.maxwidth && opts.maxwidth > 0 && width > opts.maxwidth) {
					width = opts.maxwidth;
				}
				height = width * opts.autoadjustratio;
				if (opts.maxheight && opts.maxheight > 0 && height > opts.maxheight) {
					height = opts.maxheight;
					width = height / opts.autoadjustratio;
				}
				attr.width = width;
				attr.height = height;
			}
			if (typeof params.flashvars == "object")
				params.flashvars = $.param(params.flashvars);
			var str = "";
			var objectId = $elem.attr("id") + "_flashobject";
			if ($.browser.msie) {
				$.each(params, function (name, val) {
					if (val) str += '<param name="' + name + '" value="' + val + '"/>';
				});
				$flash = $('<object id="' + objectId + '">' + str + "</object>");
			} else {
				$.each(params, function (name, val) {
					if (val) str += name + '="' + val + '" ';
				});
				$flash = $("<embed " + str + "/>");
			}
			$elem.html($flash.attr(attr).clone());
			$flash = $elem = null;
		};
	};
	$.flash.detectVersion = function (v) {
		var descr,
			pv,
			maxVersion = 10;
		if (typeof navigator.plugins["Shockwave Flash"] == "object") {
			descr = navigator.plugins["Shockwave Flash"].description;
			descr = descr.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
			pv = [
				descr.replace(/^(.*)\..*$/, "$1"),
				descr.replace(/^.*\.(.*)\s.*$/, "$1"),
				/r/.test(descr) ? descr.replace(/^.*r(.*)$/, "$1") : 0,
			];
		} else if (typeof ActiveXObject == "function") {
			var ao;
			for (var i = maxVersion; i >= 2; i--) {
				try {
					ao = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
					if (typeof ao == "object") {
						descr = ao.GetVariable("$version");
						break;
					}
				} catch (e) {}
			}
			if (descr) pv = descr.split(" ")[1].split(",");
			else return false;
		}
		if (!pv && v) return false;
		function toInt(arr) {
			return $.map(arr, function (n, i) {
				return parseInt(n, 10);
			});
		}
		v = toInt(v.split("."));
		pv = toInt(pv);
		return pv[0] > v[0] ||
			(pv[0] == v[0] && pv[1] > v[1]) ||
			(pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])
			? true
			: false;
	};
})(jQuery);
(function ($) {
	$.fn.actionController = function (controller, options) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function () {
			var ac =
				$.data(this, "actionController") ||
				$.data(
					this,
					"actionController",
					new actionController(this, controller, options)
				);
			ac[typeof controller == "string" ? controller : "init"].apply(ac, args);
		});
	};
	$.fn.actionController.defaults = {
		actionAttr: "data-action",
		paramsAttr: "data-params",
		historyAttr: "data-history",
		events: "click",
		history: false,
	};
	function actionController(elem, controller, options) {
		if (typeof options == "string") options = {events: options};
		var s = $.extend({}, $.fn.actionController.defaults, options),
			$elem = $(elem),
			enabled = true,
			ieUnsupported = "change select focus blur mouseenter mouseleave",
			boundEvents;
		this.init = function () {
			boundEvents = s.events;
			if ($.browser.msie && !/mousedown|click/.test(s.events))
				boundEvents += " mousedown";
			$elem.bind(boundEvents, eventHandler);
			if ($.browser.msie && /submit/.test(s.events))
				$("form", elem)
					.add(elem.nodeName == "FORM" ? elem : null)
					.submit(eventHandler);
			if (!$.fn.historyManager) s.history = false;
			s.history && $elem.historyManager();
		};
		this.destroy = function () {
			$elem
				.unbind(boundEvents + " " + ieUnsupported, eventHandler)
				.removeData("actionController");
			s.history && $elem.history("unbind");
		};
		this.disable = function () {
			enabled = false;
		};
		this.enable = function () {
			enabled = true;
		};
		function eventHandler(e) {
			if (!enabled) return;
			var $elem = $(e.target).closest("[" + s.actionAttr + "]");
			if ($elem.length) {
				if ($.browser.msie && /mousedown/.test(e.type)) {
					var boundUnsupported = "";
					$.each(ieUnsupported.split(" "), function (i, e) {
						if (s.events.indexOf(e) != -1) boundUnsupported += e + " ";
					});
					$elem.unbind(boundUnsupported).bind(boundUnsupported, eventHandler);
					if (
						/change/.test(s.events) &&
						$elem.attr("type") &&
						/checkbox|radio/.test($elem.attr("type").toLowerCase())
					) {
						eventHandler($.extend({}, e, {type: "change"}));
						if (!/mousedown/.test(s.events)) return;
					}
				}
				var postfix = e.type.substr(0, 1).toUpperCase() + e.type.substr(1),
					actionName = $.trim($elem.attr(s.actionAttr)) + postfix,
					mainAction = controller["action" + postfix],
					action = controller[actionName];
				if ($.isFunction(mainAction) || $.isFunction(action)) {
					var params = $elem.attr(s.paramsAttr);
					if (params)
						params = $.map(params.split(","), function (param, i) {
							return $.trim(param);
						});
					var args = Array.prototype.slice
						.call(arguments, 0)
						.concat(params || []);
					if ($.isFunction(mainAction)) {
						var ret = mainAction.apply($elem[0], args);
						if (ret === false) return ret;
					}
					if ($.isFunction(action)) {
						var hist = $elem.attr(s.historyAttr);
						if (s.history && !e.historyHandled && hist) {
							var beforeActionName =
								"before" +
								actionName.charAt(0).toUpperCase() +
								actionName.substr(1);
							var allowAction = true;
							if (
								controller.hasOwnProperty(beforeActionName) &&
								$.isFunction(controller[beforeActionName])
							) {
								beforeAction = controller[beforeActionName];
								allowAction = beforeAction.apply($elem[0], args);
							}
							if (allowAction) {
								$elem.historyManager(hist, function () {
									action.apply($elem[0], args);
								});
							}
							return false;
						}
						return action.apply($elem[0], args);
					}
				}
			}
		}
	}
})(jQuery);
(function (plugin) {
	if (typeof define === "function" && define.amd) {
		define(["jquery"], plugin);
	} else {
		plugin(jQuery);
	}
})(function ($) {
	var $scrollTo = ($.scrollTo = function (target, duration, settings) {
		return $(window).scrollTo(target, duration, settings);
	});
	$scrollTo.defaults = {
		axis: "xy",
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit: true,
	};
	$scrollTo.window = function (scope) {
		return $(window)._scrollable();
	};
	$.fn._scrollable = function () {
		return this.map(function () {
			var elem = this,
				isWin =
					!elem.nodeName ||
					$.inArray(elem.nodeName.toLowerCase(), [
						"iframe",
						"#document",
						"html",
						"body",
					]) != -1;
			if (!isWin) return elem;
			var doc =
				(elem.contentWindow || elem).document || elem.ownerDocument || elem;
			return /webkit/i.test(navigator.userAgent) ||
				doc.compatMode == "BackCompat"
				? doc.body
				: doc.documentElement;
		});
	};
	$.fn.scrollTo = function (target, duration, settings) {
		if (typeof duration == "object") {
			settings = duration;
			duration = 0;
		}
		if (typeof settings == "function") settings = {onAfter: settings};
		if (target == "max") target = 9e9;
		settings = $.extend({}, $scrollTo.defaults, settings);
		duration = duration || settings.duration;
		settings.queue = settings.queue && settings.axis.length > 1;
		if (settings.queue) duration /= 2;
		settings.offset = both(settings.offset);
		settings.over = both(settings.over);
		return this._scrollable()
			.each(function () {
				if (target == null) return;
				var elem = this,
					$elem = $(elem),
					targ = target,
					toff,
					attr = {},
					win = $elem.is("html,body");
				switch (typeof targ) {
					case "number":
					case "string":
						if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							break;
						}
						targ = $(targ, this);
						if (!targ.length) return;
					case "object":
						if (targ.is || targ.style) toff = (targ = $(targ)).offset();
				}
				var offset =
					($.isFunction(settings.offset) && settings.offset(elem, targ)) ||
					settings.offset;
				$.each(settings.axis.split(""), function (i, axis) {
					var Pos = axis == "x" ? "Left" : "Top",
						pos = Pos.toLowerCase(),
						key = "scroll" + Pos,
						old = elem[key],
						max = $scrollTo.max(elem, axis);
					if (toff) {
						attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
						if (settings.margin) {
							attr[key] -= parseInt(targ.css("margin" + Pos)) || 0;
							attr[key] -= parseInt(targ.css("border" + Pos + "Width")) || 0;
						}
						attr[key] += offset[pos] || 0;
						if (settings.over[pos])
							attr[key] +=
								targ[axis == "x" ? "width" : "height"]() * settings.over[pos];
					} else {
						var val = targ[pos];
						attr[key] =
							val.slice && val.slice(-1) == "%"
								? (parseFloat(val) / 100) * max
								: val;
					}
					if (settings.limit && /^\d+$/.test(attr[key]))
						attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					if (!i && settings.queue) {
						if (old != attr[key]) animate(settings.onAfterFirst);
						delete attr[key];
					}
				});
				animate(settings.onAfter);
				function animate(callback) {
					$elem.animate(
						attr,
						duration,
						settings.easing,
						callback &&
							function () {
								callback.call(this, targ, settings);
							}
					);
				}
			})
			.end();
	};
	$scrollTo.max = function (elem, axis) {
		var Dim = axis == "x" ? "Width" : "Height",
			scroll = "scroll" + Dim;
		if (!$(elem).is("html,body"))
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		var size = "client" + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;
		return (
			Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size])
		);
	};
	function both(val) {
		return $.isFunction(val) || typeof val == "object"
			? val
			: {top: val, left: val};
	}
	return $scrollTo;
});
(function ($) {
	$.fn.xWebForms = function (options) {
		var args = Array.prototype.slice.call(arguments, 1),
			ret = this;
		this.each(function () {
			var xWebForms =
				$.data(this, "xWebForms") ||
				$.data(this, "xWebForms", new $.xWebForms(this, options));
			ret =
				xWebForms[typeof options == "string" ? options : "init"].apply(
					xWebForms,
					args
				) || ret;
		});
		return ret;
	};
	$.fn.xWebForms.defaults = {
		classPrefix: "",
		addClasses: true,
		autoFocus: true,
		disableOnSend: true,
		validate: false,
		ajax: true,
		type: "POST",
		url: null,
		dataType: "json",
		cache: false,
		timeout: 60000,
		patterns: {
			datetime: "",
			"datetime-local": "",
			date: "",
			month: "",
			week: "",
			time: "",
			number: /^[0-9_]+$/,
			range: "",
			email: /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
			url: /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i,
			alpha: /^[a-zA-Z_]+$/,
			alphanum: /^[a-zA-Z0-9_]+$/,
		},
		errorMessages: {
			valueMissing: "Missing value",
			typeMismatch: "Type mismatch",
			tooLong: "Value is too long",
			customError: "Please, type the correct value",
		},
		submit: function () {},
		oninvalid: function () {},
		beforeSend: function () {},
		success: function () {},
		error: function () {},
		complete: function () {},
	};
	$.xWebForms = function (form, options) {
		var s = $.extend({}, $.fn.xWebForms.defaults, options);
		var self = this,
			$form = $(form),
			$fields,
			formData,
			errors,
			valide,
			target,
			method,
			hasFiles,
			ajax,
			$disabledElems,
			$uploadFields,
			ajaxOptions = {};
		this.init = function () {
			$form.addClass("x-web-forms").submit(function (e) {
				if (s.submit.apply(form, [e, self]) === false) {
					s.complete.apply(form, [null, "error", self]);
					return ret;
				}
				$fields = getFields();
				formData = $fields.serializeArray();
				hasFiles = $fields.filter('[type="file"]').length;
				ajax = form.target == "XMLHttpRequest" || s.ajax;
				valide = s.validate ? self.checkValidity() : true;
				if (ajax && valide) {
					$form.addClass("x-web-forms-sending");
					s.disableOnSend && setTimeout(self.disable, 10);
					$.extend(ajaxOptions, $.ajaxSettings, {
						beforeSend: function (xhr, e) {
							s.beforeSend.apply(form, [xhr, e, self]) === false &&
								setTimeout(function () {
									ajaxOptions.complete.apply(form, [xhr, "error", self]);
								}, 15);
						},
						data: formData,
						success: function (data, message) {
							$form.trigger("success", [self, data, message]);
							return s.success.apply(form, [data, message, self]);
						},
						error: function (xhr, message, errorThrown) {
							return s.error.apply(form, [xhr, message, errorThrown, self]);
						},
						complete: function (xhr, message) {
							$form.removeClass("x-web-forms-sending");
							s.disableOnSend && setTimeout(self.enable, 10);
							return s.complete.apply(form, [xhr, message, self]);
						},
						type: form.method || s.method,
						url: jQuery(form).attr("action") || s.url,
						dataType: s.dataType,
						cache: s.cache,
						timeout: s.timeout,
					});
					hasFiles ? iframeUpload() : $.ajax(ajaxOptions);
				}
				return (!ajax || hasFiles) && valide ? true : false;
			});
			$fields = getFields();
			$fields.eq(0).focus();
			s.addClasses && self.addClasses();
		};
		this.addClasses = function () {
			$("input", form).each(function (i, elem) {
				var required = $(elem).attr("required") ? " required" : "";
				$(elem).addClass(s.classPrefix + elem.type + required);
			});
		};
		this.checkValidity = function () {
			errors = [];
			$fields.each(function (i, elem) {
				var error = validateElement($(elem));
				error && errors.push(error);
			});
			$.each(errors, function (i, error) {
				if (typeof error.oninvalid == "string") {
					eval("error.oninvalid = function(){" + error.oninvalid + "};");
					if (error.oninvalis.apply(error.element, [error.message]) === false) {
						s.complete(form, "error", self);
						return ret;
					}
				}
			});
			errors.length > 0 && s.oninvalis.apply(form, [self, errors]);
			return !errors.length;
		};
		this.clear = function () {
			getFields().val("").prop("checked", false);
		};
		this.reset = function () {
			$form[0].reset();
		};
		this.enable = function () {
			$disabledElems.prop("disabled", false);
			$uploadFields.find('input[type="file"]').prop("disabled", false);
		};
		this.disable = function () {
			$disabledElems = getFields().prop("disabled", true);
			$uploadFields = $disabledElems
				.filter("input[type='file']")
				.closest(":diy-uploadField");
		};
		this.option = function (opt) {
			$.extend(s, opt);
		};
		function validateElement($elem) {
			var val = $.trim($elem.val() + "");
			if (val || $elem.attr("required")) {
				var nodeName = $elem[0].nodeName,
					typeAttr = $elem[0].getAttributeNode("type"),
					type = typeAttr ? typeAttr.nodeValue : null,
					name = $elem.attr("name"),
					maxLength = parseInt($elem.attr("maxlength")),
					pattern = $elem.attr("pattern") || s.patterns[type],
					error = {
						element: $elem[0],
						type: null,
						message: s.errorMessages["valueMissing"],
						oninvalid: $elem.attr("oninvalid") || s.oninvalid,
						name: name,
						value: val,
					};
				if (type == "radio") {
					var ret = false,
						dublicate;
					if (!$elem[0].checked) {
						$.each(errors, function (i, n) {
							if (n.name == name) {
								dublicate = true;
								return false;
							}
						});
						if (dublicate) {
							return ret;
						}
						ret = error;
						$fields
							.filter('[type="radio"][name="' + name + '"]')
							.each(function () {
								if (this.checked) {
									ret = false;
									return;
								}
							});
					}
					return ret;
				} else if (
					type == "text" ||
					type == "checkbox" ||
					nodeName == "SELECT" ||
					nodeName == "TEXTAREA"
				) {
					if (!val) {
						error.type = "valueMissing";
					} else if (maxLength > 0 && maxLength < val.length) {
						error.type = "tooLong";
					}
					if (error.type) {
						error.message = s.errorMessages[error.type];
					}
					return error.type ? error : false;
				} else if (pattern) {
					var ret = pattern.test(val);
					if (!ret) {
						error.message = s.errorMessages["typeMismatch"];
					}
					return ret ? false : error;
				}
			}
		}
		function iframeUpload() {
			var oAttr = {
					target: form.target,
					method: form.method,
					enctype: form.enctype,
				},
				cbInvoked = 0,
				timeout,
				$iframe,
				opts = ajaxOptions,
				g = ajaxOptions.global;
			var xhr = {
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: "n/a",
				getAllResponseHeaders: function () {},
				getResponseHeader: function () {},
				setRequestHeader: function () {},
			};
			if (opts.beforeSend.apply(form, [xhr, opts, self]) === false) {
				opts.complete.apply(form, [xhr, "error", opts, self]);
				return;
			}
			$form.attr({
				target: "x-web-forms-" + new Date().getTime(),
				enctype: "multipart/form-data",
				method: "POST",
			});
			$iframe = $(
				'<iframe name="' + form.target + '" style="display: none;"/>'
			).insertAfter(form);
			if (g && !$.active++) {
				$.event.trigger("ajaxStart");
			}
			g && $.event.trigger("ajaxSend", [xhr, opts]);
			opts.timeout &&
				setTimeout(function () {
					timeout = true;
					cb();
				}, opts.timeout);
			$iframe[0].attachEvent
				? $iframe[0].attachEvent("onload", cb)
				: $iframe[0].addEventListener("load", cb, false);
			function handleError(s, xhr, status, e) {
				if (window.console) console.log(e);
				if (s.error) {
					s.error.call(s.context || window, xhr, status, e);
				}
				if (s.global) {
					(s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [
						xhr,
						s,
						e,
					]);
				}
			}
			function httpData(xhr, type, s) {
				var ct = xhr.getResponseHeader("content-type") || "",
					xml = type === "xml" || (!type && ct.indexOf("xml") >= 0),
					data = xml ? xhr.responseXML : xhr.responseText;
				if (xml && data.documentElement.nodeName === "parsererror") {
					jQuery.error("parsererror");
				}
				if (s && s.dataFilter) {
					data = s.dataFilter(data, type);
				}
				if (typeof data === "string") {
					if (type === "json" || (!type && ct.indexOf("json") >= 0)) {
						data = jQuery.parseJSON(data);
					} else if (
						type === "script" ||
						(!type && ct.indexOf("javascript") >= 0)
					) {
						jQuery.globalEval(data);
					}
				}
				return data;
			}
			function cb() {
				if (cbInvoked++) {
					return;
				}
				$iframe[0].detachEvent
					? $iframe[0].detachEvent("onload", cb)
					: $iframe[0].removeEventListener("load", cb, false);
				var operaHack = 0;
				var ok = true;
				try {
					if (timeout) {
						throw "timeout";
					}
					var data, doc;
					doc = $iframe[0].contentWindow
						? $iframe[0].contentWindow.document
						: $iframe[0].contentDocument
						? $iframe[0].contentDocument
						: $iframe[0].document;
					if (doc.body == null && !operaHack && $.browser.opera) {
						operaHack = 1;
						cbInvoked--;
						setTimeout(cb, 100);
						return;
					}
					xhr.responseText = doc.body
						? opts.dataType === "json"
							? doc.body.textContent
								? doc.body.textContent
								: doc.body.innerText
							: doc.body.innerHTML
						: null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					xhr.getResponseHeader = function (header) {
						var headers = {"content-type": opts.dataType};
						return headers[header];
					};
					if (opts.dataType == "json" || opts.dataType == "script") {
						var ta = doc.getElementsByTagName("textarea")[0];
						xhr.responseText = ta ? ta.value : xhr.responseText;
					} else if (
						opts.dataType == "xml" &&
						!xhr.responseXML &&
						xhr.responseText != null
					) {
						xhr.responseXML = toXml(xhr.responseText);
					}
					data = httpData(xhr, opts.dataType);
				} catch (e) {
					ok = false;
					handleError(opts, xhr, "error", e);
				}
				if (ok) {
					opts.success && opts.success.apply(form, [data, "success", self]);
					g && $.event.trigger("ajaxSuccess", [xhr, opts, self]);
				}
				g && $.event.trigger("ajaxComplete", [xhr, opts, self]);
				if (g && !--$.active) $.event.trigger("ajaxStop");
				opts.complete &&
					opts.complete(xhr, ok ? "success" : "error", opts, self);
				setTimeout(function () {
					$iframe.remove();
					xhr.responseXML = null;
					$form.attr(oAttr);
				}, 100);
			}
			function toXml(s, doc) {
				if (window.ActiveXObject) {
					doc = new ActiveXObject("Microsoft.XMLDOM");
					doc.async = "false";
					doc.loadXML(s);
				} else doc = new DOMParser().parseFromString(s, "text/xml");
				return doc &&
					doc.documentElement &&
					doc.documentElement.tagName != "parsererror"
					? doc
					: null;
			}
		}
		function getFields() {
			return $form
				.find("input, select, textarea, button")
				.not("[disabled]")
				.filter(function () {
					if ($(this).is(":checkbox") || $(this).is(":radio")) {
						if (!$(this).is(":checked")) {
							return false;
						}
					}
					return true;
				});
		}
	};
})(jQuery);
(function ($) {
	$.fn.message = function (msg, options) {
		return this.each(function () {
			if ($.data(this, "message")) return;
			$.data(this, "message", new message(this, msg, options)).init();
		});
	};
	$.fn.message.defaults = {
		message: null,
		closable: true,
		status: "success",
		autoHide: 5000,
		addClass: "",
		template:
			'<div><span class="x-message-close x-message-action">x</span><p class="x-message-content">#message#</p>#buttons#</div>',
		speed: 300,
		width: "auto",
		maxHeight: 150,
		top: null,
		left: null,
		mainContainer: null,
		onClose: function () {},
		target: false,
		append: false,
		autoTarget: true,
	};
	var message = function (target, message, options) {
		if (typeof message == "object") {
			options = message;
			message = null;
		}
		var s = $.extend({}, $.fn.message.defaults, options);
		var self = this,
			$m,
			$target = $(options.target || target),
			height,
			width,
			left,
			position,
			buttons = "",
			timeout;
		this.init = function () {
			message = message || s.message;
			if (!message) return this;
			$.event.trigger("messageshow");
			if (s.autoTarget) {
				$target =
					$target[0].nodeName == "FORM"
						? $('[type="submit"]', $target)
						: $target;
			}
			if (s.status == "confirm") {
				buttons +=
					'<button type="button" class="x-message-button-ok x-message-action" selected="selected">Ok</button>\
                        <button type="button" class="x-message-button-abort x-message-action">Abort</button>';
				s.autoHide = null;
			}
			$m = $(
				s.template
					.replace("#message#", message || s.message)
					.replace("#buttons#", buttons)
			).addClass("x-message message-" + s.status + " " + s.addClass);
			if (s.append) {
				$m.appendTo($target);
			} else {
				$m.insertBefore($target);
			}
			s.closable && $m.addClass("x-message-closable");
			position = $target.position();
			height = $m.height();
			width = $m.outerWidth();
			if (height > s.maxHeight) {
				height = s.maxHeight;
				$m.css("height", height)
					.find(".x-message-content")
					.css("display", "block");
			}
			left = s.left || position.left;
			var wWidth = $(window).width();
			if (left + width > wWidth) {
				left = left - (left + width - wWidth);
			}
			if (s.mainContainer) {
				var containerWidth = $(s.mainContainer).width();
				if (left + s.width > containerWidth) {
					left = containerWidth - (s.width + 30);
				}
			}
			$m.css({
				display: "none",
				visibility: "visible",
				top: s.top || position.top - 2 * height,
				left: left,
				width: s.width,
			})
				.animate({top: "+=" + height, opacity: "show"}, s.speed, function () {
					if (s.autoHide) timeout = setTimeout(remove, s.autoHide);
				})
				.click(remove);
		};
		this.destroy = function () {
			$m.remove();
			$.removeData(target, "message");
			$.event.trigger("messageclose");
		};
		function remove(e) {
			if (s.status == "confirm" && !$(e.target).hasClass("x-message-action"))
				return false;
			clearTimeout(timeout);
			var status =
				e && e.target && /ok/.test(e.target.className) ? "ok" : "abort";
			if (s.onClose.apply($m[0], [e, status, self]) === false) return false;
			self.destroy();
			return false;
		}
	};
})(jQuery);
(function ($) {
	$.fn.loadingBox = function (params) {
		var target = this;
		var loadingBoxWrapper;
		var loadingBox;
		var loadingBoxOverlay;
		var loadingBoxText;
		var loadingBoxLoader;
		var loadingBoxLabel;
		var loadingBoxCancelBtn;
		if ($(target).children(".loadingBox-wrapper").length > 0) {
			loadingBoxWrapper = $(target).children(".loadingBox-wrapper");
			loadingBox = loadingBoxWrapper.find(".loadingBox");
		} else {
			loadingBoxWrapper = $('<div class="loadingBox-wrapper"></div>').appendTo(
				$(target)
			);
			loadingBox = $('<div class="loadingBox"></div>').appendTo(
				$(loadingBoxWrapper)
			);
		}
		params = params || loadingBox.data("params") || {};
		loadingBox.data("params", params);
		if (params.loadingText) {
			loadingBoxText = $(loadingBox).find(".loadingBox-text");
			if (loadingBoxText.length === 0) {
				loadingBoxText = $('<div class="loadingBox-text"></div>').prependTo(
					loadingBox
				);
			}
			loadingBoxText.text(params.loadingText);
		} else {
			$(loadingBox).find(".loadingBox-text").remove();
		}
		if (params.hideLoader !== true) {
			if (params.showProgress) {
				loadingBoxLoader = $(loadingBox).find(".loadingBox-progress-loader");
				if (loadingBoxLoader.length === 0) {
					loadingBoxLoader = $(
						'<div class="loadingBox-progress-loader">' +
							'<div class="loadingBox-progress-bar">' +
							'<div class="loadingBox-progress-indicator" style="width:0%"></div>' +
							"</div>" +
							"</div>"
					).appendTo(loadingBox);
				}
				if (params.showProgressLabel) {
					loadingBoxLabel = $(loadingBox).find(".loadingBox-progress-label");
					if (loadingBoxLabel.length === 0) {
						loadingBoxLabel = $(
							'<div class="loadingBox-progress-label">&nbsp;</div>'
						).appendTo(loadingBox);
					}
				}
				if (params.showProgressCancel) {
					if (0 === $(loadingBox).find(".button-cancel").length) {
						var btnMarkup = '<div class="loadingBox-cancel">';
						btnMarkup +=
							'    <button class="button-cancel ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" title="Close" role="button" aria-disabled="false">';
						btnMarkup +=
							'        <span class="ui-button-text">' +
							jimdoData.messages.cancel +
							"</span>";
						btnMarkup += "    </button>";
						btnMarkup += "</div>";
						loadingBoxCancelBtn = $(btnMarkup);
						loadingBoxCancelBtn.appendTo(loadingBox);
						loadingBoxCancelBtn.bind("click", function () {
							$(document).trigger("diy-editor-cancel-progress", [
								params.type,
								params.data,
							]);
							return false;
						});
					}
				}
			} else {
				loadingBoxLoader = $(loadingBox).find(".loadingBox-loader");
				if (loadingBoxLoader.length === 0) {
					loadingBoxLoader = $(
						'<div class="loadingBox-loader"></div>'
					).appendTo(loadingBox);
				}
			}
		} else {
			$(loadingBox).find(".loadingBox-progress-loader").remove();
			$(loadingBox).find(".loadingBox-loader").remove();
		}
		if (params.useOverlay) {
			loadingBoxOverlay = $(target).children(".loadingBox-overlay");
			if (loadingBoxOverlay.length === 0) {
				loadingBoxOverlay = $("<div></div>");
				loadingBoxOverlay.appendTo($(target));
			}
			loadingBoxOverlay.removeClass();
			loadingBoxOverlay.addClass("loadingBox-overlay");
			if (params.overlayClass) {
				loadingBoxOverlay.addClass(params.overlayClass);
			}
		} else {
			$(target).children(".loadingBox-overlay").remove();
		}
		var currentPosition = $(target).css("position");
		if (currentPosition != "absolute" && currentPosition != "relative") {
			$(target).attr("data-oldPosition", currentPosition);
			$(target).css("position", "relative");
		}
		if (typeof params.zIndex != "undefined") {
			loadingBoxWrapper.css("zIndex", params.zIndex + 1);
			if (params.useOverlay) {
				loadingBoxOverlay.css("zIndex", params.zIndex);
			}
		} else {
			try {
				loadingBoxWrapper.css("zIndex", null);
				if (params.useOverlay) {
					loadingBoxOverlay.css("zIndex", null);
				}
			} catch (e) {
				loadingBoxWrapper.css("zIndex", undefined);
				if (params.useOverlay) {
					loadingBoxOverlay.css("zIndex", undefined);
				}
			}
		}
		if ($(target).is("body")) {
			loadingBoxWrapper.css({position: "fixed"});
			if (loadingBoxOverlay) {
				loadingBoxOverlay.css("position", "fixed");
			}
		}
		var dataParams = loadingBox.data("params");
		if (dataParams && dataParams.loadingBoxId) {
			loadingBox.attr("id", dataParams.loadingBoxId);
		}
		var onshow = dataParams ? dataParams.onshow : null,
			onhide = dataParams ? dataParams.onhide : null,
			onposition = dataParams ? dataParams.onposition : null;
		return {
			show: function () {
				if (typeof onshow === "function") {
					onshow.call(target);
				}
				if (typeof onposition === "function") {
					onposition.call(target);
				} else {
					loadingBoxWrapper.show();
					var lWidth = loadingBox.width(),
						lHeight = loadingBox.height(),
						lLeft = -lWidth / 2,
						lTop = -lHeight / 2;
					if (!params.showProgress) {
						var offset = loadingBox.offset(),
							horCenter = offset.left + lWidth / 2,
							horAdjustment = Math.round(horCenter) - horCenter,
							vertCenter = offset.top + lHeight / 2,
							vertAdjustment = Math.round(vertCenter) - vertCenter;
						lLeft = lLeft + horAdjustment;
						lTop = lTop + vertAdjustment;
					}
					loadingBox.css({left: lLeft + "px", top: lTop + "px"});
				}
				if (loadingBox.data("params") && loadingBox.data("params").useOverlay) {
					$(target).children(".loadingBox-overlay").show();
				}
				loadingBoxWrapper.show();
				if (params.showProgressCancel) {
					loadingBoxCancelBtn.width(
						$(".button-cancel", loadingBox).outerWidth()
					);
				}
			},
			hide: function () {
				if (typeof onhide === "function") {
					onhide.call(target);
				}
				if (loadingBox.data("params")) {
					if (loadingBox.data("params").useOverlay) {
						$(target).children(".loadingBox-overlay").hide();
					}
				}
				if ($(target).attr("data-oldPosition")) {
					$(target).css("position", $(target).attr("data-oldPosition"));
				}
				loadingBoxWrapper.hide();
			},
			remove: function () {
				if (loadingBoxWrapper.is(":visible")) {
					loadingBoxWrapper.hide();
				}
				if (loadingBox.data("params") && loadingBox.data("params").useOverlay) {
					$(target).children(".loadingBox-overlay").remove();
				}
				if ($(target).attr("data-oldPosition")) {
					$(target).css("position", $(target).attr("data-oldPosition"));
				}
				loadingBoxWrapper.remove();
			},
			update: function (progress, progressTxt) {
				var params = loadingBox.data("params");
				if (params && params.showProgress) {
					loadingBoxLoader
						.find(".loadingBox-progress-indicator")
						.width(progress + "%");
					if (params.showProgressLabel) {
						progressTxt = progressTxt || Math.round(progress) + "%";
						loadingBoxLabel.text(progressTxt);
					}
				}
			},
		};
	};
})(jQuery);
(function ($) {
	$.fn.hoverIntent = function (f, g) {
		var cfg = {sensitivity: 7, interval: 100, timeout: 0};
		cfg = $.extend(cfg, g ? {over: f, out: g} : f);
		if (!cfg["over"] || !cfg["out"]) {
			throw new Error("hoverIntent config missing required over/out entries.");
		}
		var cX, cY, pX, pY;
		var track = function (ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};
		var compare = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			if (Math.abs(pX - cX) + Math.abs(pY - cY) < cfg.sensitivity) {
				$(ob).unbind("mousemove", track);
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob, [ev]);
			} else {
				pX = cX;
				pY = cY;
				ob.hoverIntent_t = setTimeout(function () {
					compare(ev, ob);
				}, cfg.interval);
			}
		};
		var delay = function (ev, ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob, [ev]);
		};
		var handleHover = function (e) {
			var ev = jQuery.extend({}, e);
			var ob = this;
			if (ob.hoverIntent_t) {
				ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			}
			if (e.type == "mouseenter") {
				pX = ev.pageX;
				pY = ev.pageY;
				$(ob).bind("mousemove", track);
				if (ob.hoverIntent_s != 1) {
					ob.hoverIntent_t = setTimeout(function () {
						compare(ev, ob);
					}, cfg.interval);
				}
			} else {
				$(ob).unbind("mousemove", track);
				if (ob.hoverIntent_s == 1) {
					ob.hoverIntent_t = setTimeout(function () {
						delay(ev, ob);
					}, cfg.timeout);
				}
			}
		};
		return this.bind("mouseenter", handleHover).bind("mouseleave", handleHover);
	};
})(jQuery);
(function ($) {
	function AnchorPosition($elem) {
		this.$elem = $elem;
		this.$container = $elem.parent();
		this.sizeOverride = {height: null, width: null};
	}
	AnchorPosition.prototype.getBoxMeasurements = function () {
		var elemHidden = this.$elem.css("display") == "none";
		if (elemHidden) {
			this.$elem.show();
		}
		var position = this.$elem.position();
		var cssTop = Math.max(position.top, 0);
		var cssLeft = Math.max(position.left, 0);
		var cssWidth = this.$elem.outerWidth();
		var cssHeight = this.$elem.outerHeight();
		if (elemHidden) {
			this.$elem.hide();
		}
		return {left: cssLeft, top: cssTop, width: cssWidth, height: cssHeight};
	};
	AnchorPosition.prototype.setContainerSize = function (width, height) {
		this.sizeOverride.width = width;
		this.sizeOverride.height = height;
	};
	AnchorPosition.prototype.getContainerSize = function () {
		var size = {width: null, height: null};
		if (this.sizeOverride.width && this.sizeOverride.height) {
			size = this.sizeOverride;
		} else {
			size = {
				height: this.$container.innerHeight(),
				width: this.$container.innerWidth(),
			};
		}
		return size;
	};
	AnchorPosition.prototype.getAnchorPosition = function () {
		var measurements = this.getBoxMeasurements();
		return this.toAnchorPosition(
			measurements,
			measurements,
			this.getContainerSize()
		);
	};
	AnchorPosition.prototype.getPercentPosition = function () {
		var measurements = this.getBoxMeasurements();
		return this.toPercentPosition(measurements, this.getContainerSize());
	};
	AnchorPosition.prototype.fromAnchorPosition = function (
		anchorPos,
		elemSize,
		containerSize
	) {
		if (!elemSize) {
			elemSize = this.getBoxMeasurements();
		}
		if (!containerSize) {
			containerSize = this.getContainerSize();
		}
		return {
			top: this.fromAnchorValue(
				anchorPos.top,
				elemSize.height,
				containerSize.height
			),
			left: this.fromAnchorValue(
				anchorPos.left,
				elemSize.width,
				containerSize.width
			),
		};
	};
	AnchorPosition.prototype.fromAnchorValue = function (
		value,
		elemSize,
		containerSize
	) {
		var max = containerSize - elemSize;
		if (max <= 0) {
			return 0;
		}
		return Math.round((max * value) / 100);
	};
	AnchorPosition.prototype.toAnchorPosition = function (
		cssPos,
		elemSize,
		containerSize
	) {
		if (!elemSize) {
			elemSize = this.getBoxMeasurements();
		}
		if (!containerSize) {
			containerSize = this.getContainerSize();
		}
		return {
			top: this.toAnchorValue(
				cssPos.top,
				elemSize.height,
				containerSize.height
			),
			left: this.toAnchorValue(
				cssPos.left,
				elemSize.width,
				containerSize.width
			),
		};
	};
	AnchorPosition.prototype.toAnchorValue = function (
		value,
		elemSize,
		containerSize
	) {
		var max = containerSize - elemSize;
		if (max <= 0) {
			return 0;
		}
		return Math.min(100, Math.roundTo((value / max) * 100, 2));
	};
	AnchorPosition.prototype.toPercentPosition = function (
		cssPos,
		containerSize
	) {
		if (!containerSize) {
			containerSize = this.getContainerSize();
		}
		return {
			left: Math.roundTo((100 * cssPos.left) / containerSize.width, 2),
			top: Math.roundTo((100 * cssPos.top) / containerSize.height, 2),
		};
	};
	var pluginName = "anchorPosition";
	$.fn[pluginName] = function (method) {
		var data = this.data("plugin_" + pluginName);
		if (!data) {
			data = new AnchorPosition(this);
			this.data("plugin_" + pluginName, data);
		}
		if (!method) {
			return data;
		} else if (data[method]) {
			return data[method].apply(data, Array.prototype.slice.call(arguments, 1));
		} else {
			$.error("Method " + method + " does not exist on jQuery." + pluginName);
		}
	};
})(jQuery);
(function ($) {
	$.construct = function (namespace, fn, opts) {
		opts = opts || $.construct.defaults;
		if (typeof construct == "function") construct = new construct();
		return typeof fn == "string"
			? construct[fn](namespace, opts)
			: construct.init(namespace, fn, opts);
	};
	$.construct.defaults = {lazy: false, inherit: false};
	function construct() {
		var self = this,
			cache = {};
		this.init = function (namespace, fn, opts) {
			if (typeof namespace == "string" && typeof fn == "function") {
				fn.settings = opts;
				cache[namespace] = fn;
			}
			if (opts.lazy) return fn;
			return self.create(namespace, opts);
		};
		this.create = function (namespace, opts) {
			var ret = cache;
			if (namespace == "*") {
				for (namespace in cache) {
					create(
						namespace,
						cache[namespace],
						cache[namespace].settings || opts
					);
				}
			} else
				ret = create(
					namespace,
					cache[namespace],
					opts || cache[namespace].settings
				);
			return ret;
		};
		this.get = function (namespace) {
			return namespace != "*" ? cache[namespace] : cache;
		};
		this.destroy = function (namespace) {
			if (namespace == "*") {
				var c = {},
					namespaces = [];
				$.each(cache, function (key, val) {
					namespaces.push(key);
				});
				namespaces.reverse();
				$.each(namespaces, function (i, name) {
					c[name] = cache[name];
				});
				$.each(c, self.destroy);
				return cache;
			}
			var d = getData(namespace);
			if (typeof d._super[d.name] !== "undefined") {
				typeof d._super[d.name].destroy == "function" &&
					d._super[d.name].destroy();
				delete d._super[d.name];
			}
			return cache;
		};
		function create(namespace, fn, opts) {
			var d = getData(namespace);
			if (!d._super[d.name]) {
				if (typeof opts.inherit == "string") {
					if (opts.inherit == "super") fn.prototype = d._super;
				} else if (typeof opts.inherit == "object") fn.prototype = opts.inherit;
				fn.prototype._super = d._super;
				d._super[d.name] = new fn(d._super);
				typeof d._super[d.name].init == "function" && d._super[d.name].init();
			}
			return d._super[d.name];
		}
		function getData(path) {
			var path = path.split("."),
				name = path[path.length - 1];
			path.pop();
			var _super = eval(path.join(".")) || window;
			return {_super: _super, name: name};
		}
	}
})(typeof jQuery != "undefined" ? jQuery : window);
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
(function (window, undefined) {
	"use strict";
	var Hammer = function (element, options) {
		return new Hammer.Instance(element, options || {});
	};
	Hammer.defaults = {
		stop_browser_behavior: {
			userSelect: "none",
			touchAction: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)",
		},
	};
	Hammer.HAS_POINTEREVENTS =
		navigator.pointerEnabled || navigator.msPointerEnabled;
	Hammer.HAS_TOUCHEVENTS = "ontouchstart" in window;
	Hammer.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
	Hammer.NO_MOUSEEVENTS =
		Hammer.HAS_TOUCHEVENTS && navigator.userAgent.match(Hammer.MOBILE_REGEX);
	Hammer.EVENT_TYPES = {};
	Hammer.DIRECTION_DOWN = "down";
	Hammer.DIRECTION_LEFT = "left";
	Hammer.DIRECTION_UP = "up";
	Hammer.DIRECTION_RIGHT = "right";
	Hammer.POINTER_MOUSE = "mouse";
	Hammer.POINTER_TOUCH = "touch";
	Hammer.POINTER_PEN = "pen";
	Hammer.EVENT_START = "start";
	Hammer.EVENT_MOVE = "move";
	Hammer.EVENT_END = "end";
	Hammer.DOCUMENT = document;
	Hammer.plugins = {};
	Hammer.READY = false;
	function setup() {
		if (Hammer.READY) {
			return;
		}
		Hammer.event.determineEventTypes();
		for (var name in Hammer.gestures) {
			if (Hammer.gestures.hasOwnProperty(name)) {
				Hammer.detection.register(Hammer.gestures[name]);
			}
		}
		Hammer.event.onTouch(
			Hammer.DOCUMENT,
			Hammer.EVENT_MOVE,
			Hammer.detection.detect
		);
		Hammer.event.onTouch(
			Hammer.DOCUMENT,
			Hammer.EVENT_END,
			Hammer.detection.detect
		);
		Hammer.READY = true;
	}
	Hammer.Instance = function (element, options) {
		var self = this;
		setup();
		this.element = element;
		this.enabled = true;
		this.options = Hammer.utils.extend(
			Hammer.utils.extend({}, Hammer.defaults),
			options || {}
		);
		if (this.options.stop_browser_behavior) {
			Hammer.utils.stopDefaultBrowserBehavior(
				this.element,
				this.options.stop_browser_behavior
			);
		}
		Hammer.event.onTouch(element, Hammer.EVENT_START, function (ev) {
			if (self.enabled) {
				Hammer.detection.startDetect(self, ev);
			}
		});
		return this;
	};
	Hammer.Instance.prototype = {
		on: function onEvent(gesture, handler) {
			var gestures = gesture.split(" ");
			for (var t = 0; t < gestures.length; t++) {
				this.element.addEventListener(gestures[t], handler, false);
			}
			return this;
		},
		off: function offEvent(gesture, handler) {
			var gestures = gesture.split(" ");
			for (var t = 0; t < gestures.length; t++) {
				this.element.removeEventListener(gestures[t], handler, false);
			}
			return this;
		},
		trigger: function triggerEvent(gesture, eventData) {
			var event = Hammer.DOCUMENT.createEvent("Event");
			event.initEvent(gesture, true, true);
			event.gesture = eventData;
			var element = this.element;
			if (Hammer.utils.hasParent(eventData.target, element)) {
				element = eventData.target;
			}
			element.dispatchEvent(event);
			return this;
		},
		enable: function enable(state) {
			this.enabled = state;
			return this;
		},
	};
	var last_move_event = null;
	var enable_detect = false;
	var touch_triggered = false;
	Hammer.event = {
		bindDom: function (element, type, handler) {
			var types = type.split(" ");
			for (var t = 0; t < types.length; t++) {
				element.addEventListener(types[t], handler, false);
			}
		},
		onTouch: function onTouch(element, eventType, handler) {
			var self = this;
			this.bindDom(
				element,
				Hammer.EVENT_TYPES[eventType],
				function bindDomOnTouch(ev) {
					var sourceEventType = ev.type.toLowerCase();
					if (sourceEventType.match(/mouse/) && touch_triggered) {
						return;
					} else if (
						sourceEventType.match(/touch/) ||
						sourceEventType.match(/pointerdown/) ||
						(sourceEventType.match(/mouse/) && ev.which === 1)
					) {
						enable_detect = true;
					}
					if (sourceEventType.match(/touch|pointer/)) {
						touch_triggered = true;
					}
					var count_touches = 0;
					if (enable_detect) {
						if (Hammer.HAS_POINTEREVENTS && eventType != Hammer.EVENT_END) {
							count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
						} else if (sourceEventType.match(/touch/)) {
							count_touches = ev.touches.length;
						} else if (!touch_triggered) {
							count_touches = sourceEventType.match(/up/) ? 0 : 1;
						}
						if (count_touches > 0 && eventType == Hammer.EVENT_END) {
							eventType = Hammer.EVENT_MOVE;
						} else if (!count_touches) {
							eventType = Hammer.EVENT_END;
						}
						if (!count_touches && last_move_event !== null) {
							ev = last_move_event;
						} else {
							last_move_event = ev;
						}
						handler.call(
							Hammer.detection,
							self.collectEventData(element, eventType, ev)
						);
						if (Hammer.HAS_POINTEREVENTS && eventType == Hammer.EVENT_END) {
							count_touches = Hammer.PointerEvent.updatePointer(eventType, ev);
						}
					}
					if (!count_touches) {
						last_move_event = null;
						enable_detect = false;
						touch_triggered = false;
						Hammer.PointerEvent.reset();
					}
				}
			);
		},
		determineEventTypes: function determineEventTypes() {
			var types;
			if (Hammer.HAS_POINTEREVENTS) {
				types = Hammer.PointerEvent.getEvents();
			} else if (Hammer.NO_MOUSEEVENTS) {
				types = ["touchstart", "touchmove", "touchend touchcancel"];
			} else {
				types = [
					"touchstart mousedown",
					"touchmove mousemove",
					"touchend touchcancel mouseup",
				];
			}
			Hammer.EVENT_TYPES[Hammer.EVENT_START] = types[0];
			Hammer.EVENT_TYPES[Hammer.EVENT_MOVE] = types[1];
			Hammer.EVENT_TYPES[Hammer.EVENT_END] = types[2];
		},
		getTouchList: function getTouchList(ev) {
			if (Hammer.HAS_POINTEREVENTS) {
				return Hammer.PointerEvent.getTouchList();
			} else if (ev.touches) {
				return ev.touches;
			} else {
				return [
					{identifier: 1, pageX: ev.pageX, pageY: ev.pageY, target: ev.target},
				];
			}
		},
		collectEventData: function collectEventData(element, eventType, ev) {
			var touches = this.getTouchList(ev, eventType);
			var pointerType = Hammer.POINTER_TOUCH;
			if (
				ev.type.match(/mouse/) ||
				Hammer.PointerEvent.matchType(Hammer.POINTER_MOUSE, ev)
			) {
				pointerType = Hammer.POINTER_MOUSE;
			}
			return {
				center: Hammer.utils.getCenter(touches),
				timeStamp: new Date().getTime(),
				target: ev.target,
				touches: touches,
				eventType: eventType,
				pointerType: pointerType,
				srcEvent: ev,
				preventDefault: function () {
					if (this.srcEvent.preventManipulation) {
						this.srcEvent.preventManipulation();
					}
					if (this.srcEvent.preventDefault) {
						this.srcEvent.preventDefault();
					}
				},
				stopPropagation: function () {
					this.srcEvent.stopPropagation();
				},
				stopDetect: function () {
					return Hammer.detection.stopDetect();
				},
			};
		},
	};
	Hammer.PointerEvent = {
		pointers: {},
		getTouchList: function () {
			var self = this;
			var touchlist = [];
			Object.keys(self.pointers)
				.sort()
				.forEach(function (id) {
					touchlist.push(self.pointers[id]);
				});
			return touchlist;
		},
		updatePointer: function (type, pointerEvent) {
			if (type == Hammer.EVENT_END) {
				this.pointers = {};
			} else {
				pointerEvent.identifier = pointerEvent.pointerId;
				this.pointers[pointerEvent.pointerId] = pointerEvent;
			}
			return Object.keys(this.pointers).length;
		},
		matchType: function (pointerType, ev) {
			if (!ev.pointerType) {
				return false;
			}
			var types = {};
			types[Hammer.POINTER_MOUSE] =
				ev.pointerType == ev.MSPOINTER_TYPE_MOUSE ||
				ev.pointerType == Hammer.POINTER_MOUSE;
			types[Hammer.POINTER_TOUCH] =
				ev.pointerType == ev.MSPOINTER_TYPE_TOUCH ||
				ev.pointerType == Hammer.POINTER_TOUCH;
			types[Hammer.POINTER_PEN] =
				ev.pointerType == ev.MSPOINTER_TYPE_PEN ||
				ev.pointerType == Hammer.POINTER_PEN;
			return types[pointerType];
		},
		getEvents: function () {
			return [
				"pointerdown MSPointerDown",
				"pointermove MSPointerMove",
				"pointerup pointercancel MSPointerUp MSPointerCancel",
			];
		},
		reset: function () {
			this.pointers = {};
		},
	};
	Hammer.utils = {
		extend: function extend(dest, src, merge) {
			for (var key in src) {
				if (dest[key] !== undefined && merge) {
					continue;
				}
				dest[key] = src[key];
			}
			return dest;
		},
		hasParent: function (node, parent) {
			while (node) {
				if (node == parent) {
					return true;
				}
				node = node.parentNode;
			}
			return false;
		},
		getCenter: function getCenter(touches) {
			var valuesX = [],
				valuesY = [];
			for (var t = 0, len = touches.length; t < len; t++) {
				valuesX.push(touches[t].pageX);
				valuesY.push(touches[t].pageY);
			}
			return {
				pageX:
					(Math.min.apply(Math, valuesX) + Math.max.apply(Math, valuesX)) / 2,
				pageY:
					(Math.min.apply(Math, valuesY) + Math.max.apply(Math, valuesY)) / 2,
			};
		},
		getVelocity: function getVelocity(delta_time, delta_x, delta_y) {
			return {
				x: Math.abs(delta_x / delta_time) || 0,
				y: Math.abs(delta_y / delta_time) || 0,
			};
		},
		getAngle: function getAngle(touch1, touch2) {
			var y = touch2.pageY - touch1.pageY,
				x = touch2.pageX - touch1.pageX;
			return (Math.atan2(y, x) * 180) / Math.PI;
		},
		getDirection: function getDirection(touch1, touch2) {
			var x = Math.abs(touch1.pageX - touch2.pageX),
				y = Math.abs(touch1.pageY - touch2.pageY);
			if (x >= y) {
				return touch1.pageX - touch2.pageX > 0
					? Hammer.DIRECTION_LEFT
					: Hammer.DIRECTION_RIGHT;
			} else {
				return touch1.pageY - touch2.pageY > 0
					? Hammer.DIRECTION_UP
					: Hammer.DIRECTION_DOWN;
			}
		},
		getDistance: function getDistance(touch1, touch2) {
			var x = touch2.pageX - touch1.pageX,
				y = touch2.pageY - touch1.pageY;
			return Math.sqrt(x * x + y * y);
		},
		getScale: function getScale(start, end) {
			if (start.length >= 2 && end.length >= 2) {
				return (
					this.getDistance(end[0], end[1]) /
					this.getDistance(start[0], start[1])
				);
			}
			return 1;
		},
		getRotation: function getRotation(start, end) {
			if (start.length >= 2 && end.length >= 2) {
				return (
					this.getAngle(end[1], end[0]) - this.getAngle(start[1], start[0])
				);
			}
			return 0;
		},
		isVertical: function isVertical(direction) {
			return (
				direction == Hammer.DIRECTION_UP || direction == Hammer.DIRECTION_DOWN
			);
		},
		stopDefaultBrowserBehavior: function stopDefaultBrowserBehavior(
			element,
			css_props
		) {
			var prop,
				vendors = ["webkit", "khtml", "moz", "ms", "o", ""];
			if (!css_props || !element.style) {
				return;
			}
			for (var i = 0; i < vendors.length; i++) {
				for (var p in css_props) {
					if (css_props.hasOwnProperty(p)) {
						prop = p;
						if (vendors[i]) {
							prop =
								vendors[i] +
								prop.substring(0, 1).toUpperCase() +
								prop.substring(1);
						}
						element.style[prop] = css_props[p];
					}
				}
			}
			if (css_props.userSelect == "none") {
				element.onselectstart = function () {
					return false;
				};
			}
		},
	};
	Hammer.detection = {
		gestures: [],
		current: null,
		previous: null,
		stopped: false,
		startDetect: function startDetect(inst, eventData) {
			if (this.current) {
				return;
			}
			this.stopped = false;
			this.current = {
				inst: inst,
				startEvent: Hammer.utils.extend({}, eventData),
				lastEvent: false,
				name: "",
			};
			this.detect(eventData);
		},
		detect: function detect(eventData) {
			if (!this.current || this.stopped) {
				return;
			}
			eventData = this.extendEventData(eventData);
			var inst_options = this.current.inst.options;
			for (var g = 0, len = this.gestures.length; g < len; g++) {
				var gesture = this.gestures[g];
				if (!this.stopped && inst_options[gesture.name] !== false) {
					if (
						gesture.handler.call(gesture, eventData, this.current.inst) ===
						false
					) {
						this.stopDetect();
						break;
					}
				}
			}
			if (this.current) {
				this.current.lastEvent = eventData;
			}
			if (
				eventData.eventType == Hammer.EVENT_END &&
				!eventData.touches.length - 1
			) {
				this.stopDetect();
			}
			return eventData;
		},
		stopDetect: function stopDetect() {
			this.previous = Hammer.utils.extend({}, this.current);
			this.current = null;
			this.stopped = true;
		},
		extendEventData: function extendEventData(ev) {
			var startEv = this.current.startEvent;
			if (
				startEv &&
				(ev.touches.length != startEv.touches.length ||
					ev.touches === startEv.touches)
			) {
				startEv.touches = [];
				for (var i = 0, len = ev.touches.length; i < len; i++) {
					startEv.touches.push(Hammer.utils.extend({}, ev.touches[i]));
				}
			}
			var delta_time = ev.timeStamp - startEv.timeStamp,
				delta_x = ev.center.pageX - startEv.center.pageX,
				delta_y = ev.center.pageY - startEv.center.pageY,
				velocity = Hammer.utils.getVelocity(delta_time, delta_x, delta_y);
			Hammer.utils.extend(ev, {
				deltaTime: delta_time,
				deltaX: delta_x,
				deltaY: delta_y,
				velocityX: velocity.x,
				velocityY: velocity.y,
				distance: Hammer.utils.getDistance(startEv.center, ev.center),
				angle: Hammer.utils.getAngle(startEv.center, ev.center),
				direction: Hammer.utils.getDirection(startEv.center, ev.center),
				scale: Hammer.utils.getScale(startEv.touches, ev.touches),
				rotation: Hammer.utils.getRotation(startEv.touches, ev.touches),
				startEvent: startEv,
			});
			return ev;
		},
		register: function register(gesture) {
			var options = gesture.defaults || {};
			if (options[gesture.name] === undefined) {
				options[gesture.name] = true;
			}
			Hammer.utils.extend(Hammer.defaults, options, true);
			gesture.index = gesture.index || 1000;
			this.gestures.push(gesture);
			this.gestures.sort(function (a, b) {
				if (a.index < b.index) {
					return -1;
				}
				if (a.index > b.index) {
					return 1;
				}
				return 0;
			});
			return this.gestures;
		},
	};
	Hammer.gestures = Hammer.gestures || {};
	Hammer.gestures.Hold = {
		name: "hold",
		index: 10,
		defaults: {hold_timeout: 500, hold_threshold: 1},
		timer: null,
		handler: function holdGesture(ev, inst) {
			switch (ev.eventType) {
				case Hammer.EVENT_START:
					clearTimeout(this.timer);
					Hammer.detection.current.name = this.name;
					this.timer = setTimeout(function () {
						if (Hammer.detection.current.name == "hold") {
							inst.trigger("hold", ev);
						}
					}, inst.options.hold_timeout);
					break;
				case Hammer.EVENT_MOVE:
					if (ev.distance > inst.options.hold_threshold) {
						clearTimeout(this.timer);
					}
					break;
				case Hammer.EVENT_END:
					clearTimeout(this.timer);
					break;
			}
		},
	};
	Hammer.gestures.Tap = {
		name: "tap",
		index: 100,
		defaults: {
			tap_max_touchtime: 250,
			tap_max_distance: 10,
			tap_always: true,
			doubletap_distance: 20,
			doubletap_interval: 300,
		},
		handler: function tapGesture(ev, inst) {
			if (ev.eventType == Hammer.EVENT_END) {
				var prev = Hammer.detection.previous,
					did_doubletap = false;
				if (
					ev.deltaTime > inst.options.tap_max_touchtime ||
					ev.distance > inst.options.tap_max_distance
				) {
					return;
				}
				if (
					prev &&
					prev.name == "tap" &&
					ev.timeStamp - prev.lastEvent.timeStamp <
						inst.options.doubletap_interval &&
					ev.distance < inst.options.doubletap_distance
				) {
					inst.trigger("doubletap", ev);
					did_doubletap = true;
				}
				if (!did_doubletap || inst.options.tap_always) {
					Hammer.detection.current.name = "tap";
					inst.trigger(Hammer.detection.current.name, ev);
				}
			}
		},
	};
	Hammer.gestures.Swipe = {
		name: "swipe",
		index: 40,
		defaults: {swipe_max_touches: 1, swipe_velocity: 0.7},
		handler: function swipeGesture(ev, inst) {
			if (ev.eventType == Hammer.EVENT_END) {
				if (
					inst.options.swipe_max_touches > 0 &&
					ev.touches.length > inst.options.swipe_max_touches
				) {
					return;
				}
				if (
					ev.velocityX > inst.options.swipe_velocity ||
					ev.velocityY > inst.options.swipe_velocity
				) {
					inst.trigger(this.name, ev);
					inst.trigger(this.name + ev.direction, ev);
				}
			}
		},
	};
	Hammer.gestures.Drag = {
		name: "drag",
		index: 50,
		defaults: {
			drag_min_distance: 10,
			drag_max_touches: 1,
			drag_block_horizontal: false,
			drag_block_vertical: false,
			drag_lock_to_axis: false,
			drag_lock_min_distance: 25,
		},
		triggered: false,
		handler: function dragGesture(ev, inst) {
			if (Hammer.detection.current.name != this.name && this.triggered) {
				inst.trigger(this.name + "end", ev);
				this.triggered = false;
				return;
			}
			if (
				inst.options.drag_max_touches > 0 &&
				ev.touches.length > inst.options.drag_max_touches
			) {
				return;
			}
			switch (ev.eventType) {
				case Hammer.EVENT_START:
					this.triggered = false;
					break;
				case Hammer.EVENT_MOVE:
					if (
						ev.distance < inst.options.drag_min_distance &&
						Hammer.detection.current.name != this.name
					) {
						return;
					}
					Hammer.detection.current.name = this.name;
					if (
						Hammer.detection.current.lastEvent.drag_locked_to_axis ||
						(inst.options.drag_lock_to_axis &&
							inst.options.drag_lock_min_distance <= ev.distance)
					) {
						ev.drag_locked_to_axis = true;
					}
					var last_direction = Hammer.detection.current.lastEvent.direction;
					if (ev.drag_locked_to_axis && last_direction !== ev.direction) {
						if (Hammer.utils.isVertical(last_direction)) {
							ev.direction =
								ev.deltaY < 0 ? Hammer.DIRECTION_UP : Hammer.DIRECTION_DOWN;
						} else {
							ev.direction =
								ev.deltaX < 0 ? Hammer.DIRECTION_LEFT : Hammer.DIRECTION_RIGHT;
						}
					}
					if (!this.triggered) {
						inst.trigger(this.name + "start", ev);
						this.triggered = true;
					}
					inst.trigger(this.name, ev);
					inst.trigger(this.name + ev.direction, ev);
					if (
						(inst.options.drag_block_vertical &&
							Hammer.utils.isVertical(ev.direction)) ||
						(inst.options.drag_block_horizontal &&
							!Hammer.utils.isVertical(ev.direction))
					) {
						ev.preventDefault();
					}
					break;
				case Hammer.EVENT_END:
					if (this.triggered) {
						inst.trigger(this.name + "end", ev);
					}
					this.triggered = false;
					break;
			}
		},
	};
	Hammer.gestures.Transform = {
		name: "transform",
		index: 45,
		defaults: {
			transform_min_scale: 0.01,
			transform_min_rotation: 1,
			transform_always_block: false,
		},
		triggered: false,
		handler: function transformGesture(ev, inst) {
			if (Hammer.detection.current.name != this.name && this.triggered) {
				inst.trigger(this.name + "end", ev);
				this.triggered = false;
				return;
			}
			if (ev.touches.length < 2) {
				return;
			}
			if (inst.options.transform_always_block) {
				ev.preventDefault();
			}
			switch (ev.eventType) {
				case Hammer.EVENT_START:
					this.triggered = false;
					break;
				case Hammer.EVENT_MOVE:
					var scale_threshold = Math.abs(1 - ev.scale);
					var rotation_threshold = Math.abs(ev.rotation);
					if (
						scale_threshold < inst.options.transform_min_scale &&
						rotation_threshold < inst.options.transform_min_rotation
					) {
						return;
					}
					Hammer.detection.current.name = this.name;
					if (!this.triggered) {
						inst.trigger(this.name + "start", ev);
						this.triggered = true;
					}
					inst.trigger(this.name, ev);
					if (rotation_threshold > inst.options.transform_min_rotation) {
						inst.trigger("rotate", ev);
					}
					if (scale_threshold > inst.options.transform_min_scale) {
						inst.trigger("pinch", ev);
						inst.trigger("pinch" + (ev.scale < 1 ? "in" : "out"), ev);
					}
					break;
				case Hammer.EVENT_END:
					if (this.triggered) {
						inst.trigger(this.name + "end", ev);
					}
					this.triggered = false;
					break;
			}
		},
	};
	Hammer.gestures.Touch = {
		name: "touch",
		index: -Infinity,
		defaults: {prevent_default: false, prevent_mouseevents: false},
		handler: function touchGesture(ev, inst) {
			if (
				inst.options.prevent_mouseevents &&
				ev.pointerType == Hammer.POINTER_MOUSE
			) {
				ev.stopDetect();
				return;
			}
			if (inst.options.prevent_default) {
				ev.preventDefault();
			}
			if (ev.eventType == Hammer.EVENT_START) {
				inst.trigger(this.name, ev);
			}
		},
	};
	Hammer.gestures.Release = {
		name: "release",
		index: Infinity,
		handler: function releaseGesture(ev, inst) {
			if (ev.eventType == Hammer.EVENT_END) {
				inst.trigger(this.name, ev);
			}
		},
	};
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = Hammer;
	} else {
		window.Hammer = Hammer;
		if (typeof window.define === "function" && window.define.amd) {
			window.define("hammer", [], function () {
				return Hammer;
			});
		}
	}
})(this);
(function (window, document, $, undefined) {
	$.swipebox = function (elem, options) {
		var defaults = {
				useCSS: true,
				initialIndexOnArray: 0,
				hideBarsDelay: 3000,
				videoMaxWidth: 1140,
				vimeoColor: "CCCCCC",
				beforeOpen: null,
				afterClose: null,
				labelImage:
					jimdoData.messages &&
					jimdoData.messages.lightBox &&
					jimdoData.messages.lightBox.image
						? jimdoData.messages.lightBox.image
						: "Image",
				labelOf:
					jimdoData.messages &&
					jimdoData.messages.lightBox &&
					jimdoData.messages.lightBox.of
						? jimdoData.messages.lightBox.of
						: "of",
			},
			plugin = this,
			elements = [],
			elem = elem,
			selector = elem.selector,
			$selector = $(selector),
			isTouch =
				document.createTouch !== undefined ||
				"ontouchstart" in window ||
				"onmsgesturechange" in window ||
				navigator.msMaxTouchPoints,
			supportSVG = !!window.SVGSVGElement,
			winWidth = window.innerWidth ? window.innerWidth : $(window).width(),
			winHeight = window.innerHeight ? window.innerHeight : $(window).height(),
			html =
				'<div id="swipebox-overlay">\
    <div id="swipebox-slider"></div>\
    <div id="swipebox-caption"></div>\
    <div id="swipebox-action">\
     <a id="swipebox-close"></a>\
     <span id="swipebox-info"></span>\
     <a id="swipebox-prev"></a>\
     <a id="swipebox-next"></a>\
    </div>\
  </div>',
			metaEl,
			oldViewportSettings,
			useHwAcceleration = !navigator.userAgent.match(/Android/i),
			pictureSpacing = 2;
		plugin.settings = {};
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);
			if ($.isArray(elem)) {
				elements = elem;
				ui.target = $(window);
				ui.init(plugin.settings.initialIndexOnArray);
			} else {
				$selector.click(function (e) {
					elements = [];
					var index, relType, relVal;
					if (!relVal) {
						relType = "rel";
						relVal = $(this).attr(relType);
					}
					if (relVal && relVal !== "" && relVal !== "nofollow") {
						$elem = $selector.filter("[" + relType + '="' + relVal + '"]');
					} else {
						$elem = $(selector);
					}
					$elem.each(function () {
						var title = null,
							href = null;
						if ($(this).attr("title")) title = $(this).attr("title");
						if ($(this).attr("href")) href = $(this).attr("href");
						elements.push({href: href, title: title});
					});
					index = $elem.index($(this));
					e.preventDefault();
					e.stopPropagation();
					ui.target = $(e.target);
					ui.init(index);
				});
			}
		};
		plugin.refresh = function () {
			if (!$.isArray(elem)) {
				ui.destroy();
				$elem = $(selector);
				ui.actions();
			}
		};
		var ui = {
			init: function (index) {
				if (plugin.settings.beforeOpen) plugin.settings.beforeOpen();
				this.target.trigger("swipebox-start");
				$.swipebox.isOpen = true;
				this.build();
				this.openSlide(index);
				this.openMedia(index);
				this.preloadMedia(index + 1);
				this.preloadMedia(index - 1);
			},
			build: function () {
				var $this = this;
				this.disableViewportScaling();
				$("body").append(html);
				if ($this.doCssTrans()) {
					$("#swipebox-overlay").css({
						"-webkit-transition": "opacity 1s ease",
						"-moz-transition": "opacity 1s ease",
						"-o-transition": "opacity 1s ease",
						"-khtml-transition": "opacity 1s ease",
						transition: "opacity 1s ease",
					});
					$("#swipebox-action, #swipebox-caption").css({
						"-webkit-transition": "0.5s",
						"-moz-transition": "0.5s",
						"-o-transition": "0.5s",
						"-khtml-transition": "0.5s",
						transition: "0.5s",
					});
				}
				$("#swipebox-slider").bind("dragstart", function (e) {
					e.preventDefault();
					e.stopPropagation();
				});
				if (supportSVG) {
					var bg = $("#swipebox-action #swipebox-close").css(
						"background-image"
					);
					bg = bg.replace("png", "svg");
					$(
						"#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close"
					).css({"background-image": bg});
				}
				$.each(elements, function () {
					$("#swipebox-slider").append('<div class="slide"></div>');
				});
				$this.setDim();
				$this.actions();
				$this.keyboard();
				$this.gesture();
				$this.animBars();
				$this.resize();
			},
			disableViewportScaling: function () {
				metaEl = $('meta[name="viewport"]');
				if (!metaEl.length) {
					metaEl = $('<meta name="viewport">').appendTo("head");
				} else {
					if (!oldViewportSettings) {
						oldViewportSettings = metaEl.attr("content");
					}
				}
				metaEl.attr(
					"content",
					"user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"
				);
			},
			enableViewportScaling: function () {
				if (metaEl) {
					if (oldViewportSettings) {
						metaEl.attr("content", oldViewportSettings);
						oldViewportSettings = null;
					} else {
						metaEl.attr("content", "user-scalable=yes");
					}
				}
			},
			setDim: function () {
				var width,
					height,
					sliderCss = {};
				if ("onorientationchange" in window) {
					window.addEventListener(
						"orientationchange",
						function () {
							if (window.orientation == 0) {
								width = winWidth;
								height = winHeight;
							} else if (
								window.orientation == 90 ||
								window.orientation == -90
							) {
								width = winHeight;
								height = winWidth;
							}
						},
						false
					);
				} else {
					width = window.innerWidth ? window.innerWidth : $(window).width();
					height = window.innerHeight ? window.innerHeight : $(window).height();
				}
				sliderCss = {width: width, height: height};
				$("#swipebox-overlay").css(sliderCss);
			},
			resize: function () {
				var $this = this;
				$(window)
					.resize(function () {
						$this.setDim();
					})
					.resize();
			},
			supportTransition: function () {
				var prefixes =
					"transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(
						" "
					);
				for (var i = 0; i < prefixes.length; i++) {
					if (document.createElement("div").style[prefixes[i]] !== undefined) {
						return prefixes[i];
					}
				}
				return false;
			},
			doCssTrans: function () {
				if (plugin.settings.useCSS && this.supportTransition()) {
					return true;
				}
			},
			gesture: function () {
				var $this = this,
					bars = $("#swipebox-caption, #swipebox-action");
				bars.addClass("visible-bars");
				$this.setTimeout();
				Hammer($("#swipebox-slider").get(0), {drag_lock_to_axis: true}).on(
					"tap touch release dragstart dragleft dragright swipeleft swiperight",
					function (e) {
						e.gesture.preventDefault();
						var current_pane = $("#swipebox-slider .slide").index(
								$("#swipebox-slider .slide.current")
							),
							pane_count = elements.length,
							pane_width = $("#swipebox-slider").width();
						switch (e.type) {
							case "dragright":
							case "dragleft":
								clearTimeout($this.releaseTimeout);
								$this.releaseTimeout = setTimeout(function () {
									$this.setSlide(
										$("#swipebox-slider .slide").index(
											$("#swipebox-slider .slide.current")
										)
									);
								}, 1000);
								var pane_offset = -100 * current_pane;
								var drag_offset = (100 / pane_width) * e.gesture.deltaX;
								if (
									(current_pane == 0 &&
										e.gesture.direction == Hammer.DIRECTION_RIGHT) ||
									(current_pane == pane_count - 1 &&
										e.gesture.direction == Hammer.DIRECTION_LEFT)
								) {
									drag_offset *= 0.2;
								}
								$this.setOffset(-(drag_offset + pane_offset));
								break;
							case "swipeleft":
								clearTimeout($this.releaseTimeout);
								$this.getNext();
								e.gesture.stopDetect();
								break;
							case "swiperight":
								clearTimeout($this.releaseTimeout);
								$this.getPrev();
								e.gesture.stopDetect();
								break;
							case "release":
								clearTimeout($this.releaseTimeout);
								if (Math.abs(e.gesture.deltaX) > pane_width / 2) {
									if (e.gesture.direction == "right") {
										$this.getPrev();
									} else {
										$this.getNext();
									}
								} else {
									$this.setSlide(current_pane);
								}
								break;
							case "tap":
								if (!bars.hasClass("visible-bars")) {
									$this.showBars();
									$this.setTimeout();
								} else {
									$this.clearTimeout();
									$this.hideBars();
								}
								break;
							default:
								break;
						}
					}
				);
			},
			setTimeout: function () {
				if (plugin.settings.hideBarsDelay > 0) {
					var $this = this;
					$this.clearTimeout();
					$this.timeout = window.setTimeout(function () {
						$this.hideBars();
					}, plugin.settings.hideBarsDelay);
				}
			},
			clearTimeout: function () {
				window.clearTimeout(this.timeout);
				this.timeout = null;
			},
			showBars: function () {
				var bars = $("#swipebox-caption, #swipebox-action");
				if (this.doCssTrans()) {
					bars.addClass("visible-bars");
				} else {
					$("#swipebox-caption").animate({top: 0}, 500);
					$("#swipebox-action").animate({bottom: 0}, 500);
					setTimeout(function () {
						bars.addClass("visible-bars");
					}, 1000);
				}
			},
			hideBars: function () {
				var bars = $("#swipebox-caption, #swipebox-action");
				if (this.doCssTrans()) {
					bars.removeClass("visible-bars");
				} else {
					$("#swipebox-caption").animate({top: "-50px"}, 500);
					$("#swipebox-action").animate({bottom: "-50px"}, 500);
					setTimeout(function () {
						bars.removeClass("visible-bars");
					}, 1000);
				}
			},
			animBars: function () {
				var $this = this;
				var bars = $("#swipebox-caption, #swipebox-action");
				bars.addClass("visible-bars");
				$this.setTimeout();
				$("#swipebox-action").hover(
					function () {
						$this.showBars();
						bars.addClass("force-visible-bars");
						$this.clearTimeout();
					},
					function () {
						bars.removeClass("force-visible-bars");
						$this.setTimeout();
					}
				);
			},
			keyboard: function () {
				var $this = this;
				$(window).bind("keyup.swipebox", function (e) {
					e.preventDefault();
					e.stopPropagation();
					if (e.keyCode == 37) {
						$this.getPrev();
					} else if (e.keyCode == 39) {
						$this.getNext();
					} else if (e.keyCode == 27) {
						$this.closeSlide();
					}
				});
			},
			actions: function () {
				var $this = this,
					clickEvent = isTouch ? "touchend" : "click";
				if (elements.length < 2) {
					$("#swipebox-prev, #swipebox-next").hide();
				} else {
					$("#swipebox-prev").bind(clickEvent, function (e) {
						e.preventDefault();
						e.stopPropagation();
						$this.getPrev();
						$this.setTimeout();
					});
					$("#swipebox-next").bind(clickEvent, function (e) {
						e.preventDefault();
						e.stopPropagation();
						$this.getNext();
						$this.setTimeout();
					});
				}
				$("#swipebox-close").bind("click", function (e) {
					$this.closeSlide();
				});
			},
			setOffset: function (percent, animate) {
				var slider = $("#swipebox-slider");
				percent =
					percent + (2 * Math.round(percent / 100) + 1) * pictureSpacing;
				slider.removeClass("animate");
				if (animate) {
					slider.addClass("animate");
				}
				if (this.doCssTrans()) {
					if (useHwAcceleration && Modernizr.csstransforms3d) {
						slider.css({
							"-webkit-transform":
								"translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
							"-moz-transform":
								"translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
							"-ms-transform":
								"translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
							"-o-transform":
								"translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
							"-khtml-transform":
								"translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
							transform: "translate3d(" + -percent + "%,0,0) scale3d(1,1,1)",
						});
					} else if (useHwAcceleration && Modernizr.csstransforms) {
						slider.css({
							"-webkit-transform": "translate(" + -percent + "%,0)",
							"-moz-transform": "translate(" + -percent + "%,0)",
							"-ms-transform": "translate(" + -percent + "%,0)",
							"-o-transform": "translate(" + -percent + "%,0)",
							"-khtml-transform": "translate(" + -percent + "%,0)",
							transform: "translate(" + -percent + "%,0)",
						});
					} else {
						slider.css({left: -percent + "%"});
					}
				} else {
					slider.animate({left: -percent + "%"});
				}
			},
			setSlide: function (index, isFirst) {
				isFirst = isFirst || false;
				var slider = $("#swipebox-slider");
				this.setOffset(index * 100, true);
				$("#swipebox-slider .slide").removeClass("current");
				$("#swipebox-slider .slide").eq(index).addClass("current");
				this.setTitle(index);
				if (isFirst) {
					slider.fadeIn();
				}
				$("#swipebox-prev, #swipebox-next").removeClass("disabled");
				if (index == 0) {
					$("#swipebox-prev").addClass("disabled");
				} else if (index == elements.length - 1) {
					$("#swipebox-next").addClass("disabled");
				}
				this.updateSlideInfo(index);
				if (index > 0) {
					this.preloadMedia(index - 1);
				}
				if (index < elements.length - 1) {
					this.preloadMedia(index + 1);
				}
			},
			openSlide: function (index) {
				$("html").addClass("swipebox");
				$(window).trigger("resize");
				this.setSlide(index, true);
			},
			updateSlideInfo: function (index) {
				$("#swipebox-info").html(
					plugin.settings.labelImage +
						" " +
						(index + 1) +
						" " +
						plugin.settings.labelOf +
						" " +
						elements.length
				);
			},
			preloadMedia: function (index) {
				var $this = this,
					src = null;
				if (elements[index] !== undefined) src = elements[index].href;
				if (!$this.isVideo(src)) {
					setTimeout(function () {
						$this.openMedia(index);
					}, 1000);
				} else {
					$this.openMedia(index);
				}
			},
			openMedia: function (index) {
				var $this = this,
					src = null;
				if (elements[index] !== undefined) src = elements[index].href;
				if (index < 0 || index >= elements.length) {
					return false;
				}
				if (!$this.isVideo(src)) {
					$this.loadMedia(src, function (img) {
						$("#swipebox-slider .slide").eq(index).html(img);
					});
				} else {
					$("#swipebox-slider .slide").eq(index).html($this.getVideo(src));
				}
			},
			setTitle: function (index, isFirst) {
				var title = null;
				$("#swipebox-caption").empty();
				if (elements[index] !== undefined) title = elements[index].title;
				if (title) {
					$("#swipebox-caption").append(title).removeClass("no-caption");
				} else {
					$("#swipebox-caption").addClass("no-caption");
				}
			},
			isVideo: function (src) {
				if (src) {
					if (
						src.match(/youtube\.com\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
						src.match(/vimeo\.com\/([0-9]*)/)
					) {
						return true;
					}
				}
			},
			getVideo: function (url) {
				var iframe = "";
				var output = "";
				var youtubeUrl = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
				var vimeoUrl = url.match(/vimeo\.com\/([0-9]*)/);
				if (youtubeUrl) {
					iframe =
						'<iframe width="560" height="315" src="//www.youtube.com/embed/' +
						youtubeUrl[1] +
						'" frameborder="0" allowfullscreen></iframe>';
				} else if (vimeoUrl) {
					iframe =
						'<iframe width="560" height="315"  src="http://player.vimeo.com/video/' +
						vimeoUrl[1] +
						"?byline=0&amp;portrait=0&amp;color=" +
						plugin.settings.vimeoColor +
						'" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				}
				return (
					'<div class="swipebox-video-container" style="max-width:' +
					plugin.settings.videomaxWidth +
					'px"><div class="swipebox-video">' +
					iframe +
					"</div></div>"
				);
			},
			loadMedia: function (src, callback) {
				if (!this.isVideo(src)) {
					var img = $("<img>").bind("load", function () {
						callback(this);
					});
					img.attr("src", src);
				}
			},
			getNext: function () {
				var $this = this;
				index = $("#swipebox-slider .slide").index(
					$("#swipebox-slider .slide.current")
				);
				if (index + 1 < elements.length) {
					index++;
					$this.setSlide(index);
					$this.preloadMedia(index + 1);
				} else {
					this.setSlide(index);
					$("#swipebox-slider").addClass("rightSpring");
					setTimeout(function () {
						$("#swipebox-slider").removeClass("rightSpring");
					}, 500);
				}
			},
			getPrev: function () {
				index = $("#swipebox-slider .slide").index(
					$("#swipebox-slider .slide.current")
				);
				if (index > 0) {
					index--;
					this.setSlide(index);
					this.preloadMedia(index - 1);
				} else {
					this.setSlide(index);
					$("#swipebox-slider").addClass("leftSpring");
					setTimeout(function () {
						$("#swipebox-slider").removeClass("leftSpring");
					}, 500);
				}
			},
			closeSlide: function () {
				this.enableViewportScaling();
				$("html").removeClass("swipebox");
				$(window).trigger("resize");
				this.destroy();
			},
			destroy: function () {
				$(window).unbind("keyup.swipebox");
				$("#swipebox-slider").unbind();
				$("#swipebox-overlay").remove();
				if (!$.isArray(elem)) elem.removeData("_swipebox");
				if (this.target) this.target.trigger("swipebox-destroy");
				$.swipebox.isOpen = false;
				if (plugin.settings.afterClose) plugin.settings.afterClose();
			},
		};
		plugin.init();
	};
	$.fn.swipebox = function (options) {
		if (!$.data(this, "_swipebox")) {
			var swipebox = new $.swipebox(this, options);
			this.data("_swipebox", swipebox);
		}
		return this.data("_swipebox");
	};
})(window, document, jQuery);
diy.core.namespace("diy.editor").getNewTopZIndex = function (
	fallback,
	type,
	container
) {
	var overlayTypes = {
		default: {min: 0, max: 900000},
		blockingModals: {min: 900001, max: 999999},
	};
	var $ = jQuery,
		min,
		max;
	if (type === undefined || !$.inArray(type, overlayTypes)) {
		type = "default";
	}
	min = overlayTypes[type]["min"];
	max = overlayTypes[type]["max"];
	if (isNaN(fallback)) {
		fallback = min;
	}
	if ($.type(container) !== "string") {
		container = "body";
	}
	var maxZ = Math.max.apply(
		null,
		$.map($(container + " div"), function (e, n) {
			if ($(e).css("position") != "static") {
				var zindex = parseInt($(e).css("z-index"));
				if (zindex > min && (max === null || zindex < max)) return zindex || 1;
			}
		})
	);
	if (!isNaN(fallback) && maxZ < fallback) {
		maxZ = fallback;
	}
	return maxZ + 1;
};
(function () {
	var decodeEl = document.createElement("div");
	diy.core.namespace("diy.editor").htmlDecode = function (input) {
		decodeEl.innerHTML = input;
		return decodeEl.childNodes.length === 0
			? ""
			: decodeEl.childNodes[0].nodeValue;
	};
})();
function showLoginOverlay(errorMsg) {
	if (jimdoData.isTrial !== 1) {
		return;
	}
	var page = jimdoData.pageId;
	jQuery.ajax({
		url: webPath + "cc/getloginbox.php?isTrialOverlay",
		type: "POST",
		data: "url=needed&page=" + page,
		success: function (data) {
			try {
				var newLoginboxData = jQuery.parseJSON(data);
				if (newLoginboxData && typeof newLoginboxData.html) {
					data = newLoginboxData.html;
				}
			} catch (e) {}
			var oldLayer = jQuery(".modal-persist-lock");
			var oldContent = jQuery(".lock-message");
			var oldLayerIsVisible = oldLayer.is(":visible");
			jQuery("div#loginboxOuter").empty();
			jQuery("div#loginbox").removeClass("show").addClass("hidden");
			jQuery('<div class="trial" />')
				.html('<div class="modal modal-login" />')
				.appendTo("body");
			jQuery(".modal-login").bind(jQuery.modal.OPEN, function () {
				if (oldLayerIsVisible) {
					oldLayer.hide();
					oldContent.hide();
				}
			});
			jQuery(".modal-login").bind(jQuery.modal.CLOSE, function () {
				jQuery(".modal-login").remove();
				if (oldLayerIsVisible) {
					oldLayer.show();
					oldContent.show();
				}
			});
			jQuery(".modal-login")
				.html(data)
				.modal({overlay: "#004192", zIndex: 1007, showClose: false});
			jQuery("#resendpw").hide();
			jQuery(".modal .close").click(function () {
				jQuery.modal.close();
			});
			jQuery(".modal-login input[type=password]")
				.attr("id", "loginPasswd")
				.focus();
			jQuery('<input type="hidden" name="source" value="overlay" />').appendTo(
				jQuery(".modal-login form")
			);
			if (diy.pfcSupport) {
				jQuery('<input type="hidden" name="pfc" value="31" />').appendTo(
					jQuery(".modal-login form")
				);
			}
			jQuery('<input type="hidden" name="goto" value="shop" />').appendTo(
				jQuery(".modal-login form")
			);
			if (errorMsg !== undefined) {
				var passField = jQuery(".modal-login .password");
				passField.addClass("error");
				var errorMessage = jQuery(
					'<span class="errorMessage">' +
						errorMsg +
						'<span class="arrowContainer"><span class="arrow"></span></span></span>'
				);
				passField.before(errorMessage);
				errorMessage.position({
					my: "center top",
					at: "center bottom",
					of: passField,
					using: function (should) {
						jQuery(this).css({top: should.top + 15, left: should.left});
					},
				});
			}
		},
	});
}
function showLoginBox(url) {
	if (jimdoData.isTrial === 1 && diy.web.expiration.isExpired()) {
		return;
	}
	function onSuccess(data) {
		if (data.isRedirect) {
			document.location.href = data.redirectUrl;
			return;
		}
		jQuery("div#loginboxOuter").html(data.html);
		jQuery("div#loginboxOuter form input[type=password]").attr(
			"id",
			"loginPasswd"
		);
		document.location.href = "#login";
		jQuery("div#loginbox").attr("class", "show");
		if (jQuery("#loginPasswd").length) {
			window.scrollTo(0, jQuery("#loginPasswd").offset().top);
			jQuery("input#loginPasswd").focus();
		}
		if (navigator.cookieEnabled == false) {
			jQuery("#login_container").css("display", "none");
			jQuery("#js_note").css("display", "block");
		}
	}
	var pageId = jimdoData.pageId;
	jQuery.ajax({
		url: webPath + "cc/getloginbox.php",
		type: "POST",
		data: "url=" + url + "&page=" + pageId,
		dataType: "json",
		success: onSuccess,
	});
}
function showLoginBoxAutomatically() {
	urlHash = window.location.hash;
	if (urlHash == "#open-login") {
		showLoginBox("");
	}
}
function CC_openEmailForm() {
	function onSuccess(data) {
		jQuery("#loginbox .message-alert").remove();
		jQuery('<div id="mail-form-div">' + data + "<div>").insertAfter(
			"#login_container"
		);
		jQuery("#email-for-passwd").focus();
		jQuery("#login_container").hide();
	}
	jQuery.ajax({
		url: webPath + "app/web/cmsproxy/openemailform",
		type: "POST",
		data: "resend=1",
		success: onSuccess,
	});
}
function CC_checkEmail() {
	jQuery.ajax({
		url: webPath + "app/web/cmsproxy/resendpassword",
		data: jQuery("#ask-for-email").serialize(),
		success: function (data) {
			r = jQuery.parseJSON(data);
			jQuery("#email-check-message").remove();
			jQuery("#loginbox img.logo").hide();
			if (r.error == 0) {
				jQuery("#mail-form-div").hide();
				jQuery("#login_container").show();
				jQuery(
					'<div id="email-check-message">' + r.message + "</div>"
				).insertBefore("#loginPasswd");
				jQuery("#email-check-message").addClass("message-ok");
				jQuery("#pwvergessenlink").hide();
			} else {
				jQuery(
					'<div id="email-check-message">' + r.message + "</div>"
				).insertAfter("#email-for-passwd");
				jQuery("#email-check-message").addClass("message-alert");
			}
		},
	});
	return false;
}
function CC_cancelSendEmail() {
	jQuery("#ask-for-email").hide();
	jQuery("#login_container").show();
}
function CC_close() {
	jQuery("#loginbox").attr("class", "hidden");
}
function PopupFenster(pfad) {
	F = window.open(
		pfad,
		"Druckversion",
		"width=700,height=600,scrollbars=yes,top=30,left=30,toolbar=yes,menubar=yes"
	);
}
function tellafriend(page) {
	jQuery("#content_start").load(
		webPath +
			"cc/templates/tellafriend.php?pageID=" +
			page +
			"&url=" +
			self.location.href
	);
	window.scrollTo(0, 0);
	jQuery("#content_start").css("display", "block");
}
function tellafriend_check(data) {
	var response = jQuery.parseJSON(data);
	if (response.body == "ok") {
		jQuery("#tellafriend_error").hide();
		jQuery("#tellsurl").html(response.thanks);
		jQuery("#tellstatus").html(response.sent);
		jQuery("#tellbody").hide();
		jQuery("#tellheader").fadeOut(5000);
	} else {
		jQuery("#tellafriend_error").css("display", "block");
		jQuery("#tellafriend_error").html(response.body);
		jQuery("#tellafriend_absenden").val(response.btn);
	}
	jQuery("#captchaImage" + response.captchaId).attr(
		"src",
		"/app/common/captcha/index/captchaId/" +
			response.captchaId +
			"/w/160/h/29/t/" +
			new Date().getTime()
	);
	jQuery("#tellafriend_form").prop("disabled", false);
	jQuery("#tellafriend_absenden").prop("disabled", false);
}
function tellafriend_send() {
	jQuery("#tellafriend_absenden").prop("disabled", true);
	jQuery.ajax({
		url: webPath + "cc/tellafriend.php",
		type: "POST",
		data: jQuery("#tellafriend_form").serialize(),
		success: tellafriend_check,
	});
	jQuery("#tellafriend_form").prop("disabled", true);
	return false;
}
function switchView(switchTo) {
	expiry_date = new Date();
	expiry_date.setDate(expiry_date.getDate() + 365);
	cookie_expiry_value = "expires=" + expiry_date.toUTCString();
	document.cookie =
		"DIY_mobileOverride=" + switchTo + "; " + cookie_expiry_value;
	location.reload();
}
if (!window.diy) {
	window.diy = {};
}
if (!window.diy.modules) {
	window.diy.modules = {};
}
diy.modules.guestbook = {};
diy.modules.guestbook.init = function () {
	var self = this;
	var refreshCaptcha = function () {
		var captchaJQ = jQuery(".cc-mm-guestbook").find(".captcha, .diys-cap2");
		captchaJQ.find("a.refresh").click();
		captchaJQ.find(".bottom input").val("");
	};
	jQuery(".cc-mm-guestbook")
		.jimdoForm(null, function (data) {
			if (data.status == "error") {
				refreshCaptcha();
				jQuery(".guestbook-response").html("");
			}
			if (data.status === undefined) {
				diy.modules.guestbook.init();
				refreshCaptcha();
			}
		})
		.bind("formSuccess", function (e, data) {
			var moduleId = data.data.moduleId,
				isModerated = data.data.isModerated;
			jQuery("#guestbook-" + moduleId).replaceWith(data.data.payload);
			if (isModerated) {
				jQuery("#guestbook-response-" + moduleId).html(
					'<div class="message-ok">' + data.message + "</div>"
				);
			} else {
				jQuery("#commentForm" + moduleId).remove();
				jQuery("#skiptoform" + moduleId).remove();
			}
			self.init();
		});
	jQuery(".skiptoform").click(function (e) {
		jQuery("html").scrollTo(jQuery(this).parent().find("form"), 500, {
			offset: -20,
		});
		return false;
	});
	jQuery(".guestbook-show-all").click(function (e) {
		var moduleId = jQuery(this).hide().attr("data-module-id");
		jQuery("#guestbook-" + moduleId)
			.find("li")
			.show();
		return false;
	});
};
jQuery(function ($) {
	diy.modules.guestbook.init();
});
(function ($) {
	$(document).ready(function () {
		window.diy.cms.ddm = {};
		var equalHeight = function (group) {
			var tallest = 0;
			group.each(function () {
				var thisHeight = $(this).height();
				if (thisHeight > tallest) {
					tallest = thisHeight;
				}
			});
			group.height(tallest);
		};
		var getSubMenu = function (element) {
			return $(element).find(".ddm_level_2");
		};
		var getSubMenuVisible = function (element) {
			return $(".ddm_level_1 .ddm_level_2:visible");
		};
		var updateEditNavButtonPosition = function () {
			if (
				window.diy.cms.Navigation &&
				window.diy.cms.Navigation.moveEditContainer
			) {
				var visibleSubMenu = getSubMenuVisible();
				var x = null;
				var y = 0;
				if (visibleSubMenu.length > 0) {
					y = $(visibleSubMenu).offset().top + $(visibleSubMenu).outerHeight();
				}
				window.diy.cms.Navigation.moveEditContainer(x, y);
			}
		};
		var editButtonUpdateTimeoutId = null;
		var updateEditNavButton = function () {
			clearTimeout(editButtonUpdateTimeoutId);
			editButtonUpdateTimeoutId = setTimeout(updateEditNavButtonPosition, 300);
		};
		var activateDropDownMenu = function (context) {
			$(".ddm_level_1 > li", context).hoverIntent({
				over: function (event) {
					var subMenu = getSubMenu(this);
					if (subMenu.length > 0) {
						subMenu.fadeTo("fast", 1).show(0, function () {
							var rowIndex = 0,
								rowItems;
							do {
								rowIndex++;
								rowItems = $("li.ddm_row_" + rowIndex, subMenu);
								if (rowItems.length) {
									equalHeight(rowItems);
								}
							} while (rowItems.length);
						});
					}
					updateEditNavButton();
				},
				out: function (event) {
					var subMenu = getSubMenu(this);
					if (subMenu.length > 0) {
						subMenu.fadeTo("fast", 0, function () {
							$(this).hide();
						});
					}
					updateEditNavButton();
				},
				timeout: 500,
			});
		};
		activateDropDownMenu();
		window.diy.cms.ddm.activateDropDownMenu = activateDropDownMenu;
	});
})(jQuery);
var GallerySlideshow = function (options) {
	this.settings = jQuery.extend(
		{
			debug: false,
			effect: "slide",
			slideshowSpeed: 5000,
			effectSpeed: 1000,
			navigation: true,
			maxHeight: "150px",
			imageSelector: ".thumb_pro1",
			imageBackground: "transparent",
			thumbWidth: "40px",
			thumbHeight: "25px",
			thumbBackground: "transparent",
			thumbClickEffect: "noeffect",
			fadeSpeed: 1000,
			clipSpeed: 1500,
			scaleSpeed: 1000,
			slideSpeed: 1500,
			startPaused: false,
			pauseOnClick: true,
		},
		options
	);
	this.object = null;
	this.imageContainer = null;
	this.currentItem = null;
	this.navigation = null;
	this.scene = null;
	this.paused = true;
	this.running = false;
	this.timeout = null;
	if (this.settings.debug) {
		jQuery.log("GallerySlideshow created.");
	}
};
var GS = GallerySlideshow.prototype;
GS.draw = function (parent, prepend, scanobject) {
	if (!this.drawed()) {
		if (this.settings.debug) {
			jQuery.group("Drawing GallerySlideshow...");
		}
		this.object = scanobject;
		jQuery.data(this.object.get(0), "object", this);
		this.images = this.object.find(this.settings.imageSelector);
		this.scene = jQuery('<div class="scene"></div>');
		this.object.prepend(this.scene);
		this.scene.css({
			position: "relative",
			overflow: "hidden",
			height: this.settings.maxHeight,
		});
		this.drawNavigation();
		this.drawImages();
		this.animate(this.imageContainer.children(":first"), "noeffect");
		if (!this.settings.startPaused) {
			this.startSlideshow();
		} else {
			this.stopSlideshow();
		}
		if (this.settings.debug) {
			jQuery.log("GallerySlideshow drawed.");
			jQuery.groupEnd();
		}
		return true;
	}
	return false;
};
GS.isFullscreenAvailable = function () {
	return (
		document.fullscreenEnabled ||
		document.webkitFullscreenEnabled ||
		document.mozFullScreenEnabled ||
		document.msFullscreenEnabled
	);
};
GS.isFullscreenOn = function () {
	return (
		document.fullscreenElement ||
		document.webkitFullscreenElement ||
		document.mozFullScreenElement ||
		document.msFullscreenElement
	);
};
GS.fullscreen = function (element) {
	if (this.isFullscreenAvailable()) {
		if (this.isFullscreenOn()) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		} else {
			if (element.requestFullscreen) {
				element.requestFullscreen();
			} else if (element.webkitRequestFullscreen) {
				element.webkitRequestFullscreen();
			} else if (element.mozRequestFullScreen) {
				element.mozRequestFullScreen();
			} else if (element.msRequestFullscreen) {
				element.msRequestFullscreen();
			}
		}
	}
};
GS.drawNavigation = function () {
	var t = this,
		navigation;
	this.object.append('<div class="navigation"></div>');
	navigation = this.navigation = this.object.children(".navigation");
	if (this.settings.navigation) {
		navigation
			.append('<div class="pause"></div>')
			.children(".pause")
			.bind("click", {t: t}, function (e) {
				t.toggleSlideshow();
			});
		if (this.isFullscreenAvailable()) {
			navigation
				.append('<div class="fullscreen"></div>')
				.children(".fullscreen")
				.bind("click", {t: t}, function () {
					t.fullscreen(t.object.get(0));
				});
		}
		this.object
			.append('<div class="scrollbutton right"></div>')
			.children(".scrollbutton.right")
			.bind("click", {t: t}, function (e) {
				if (t.settings.pauseOnClick) {
					t.stopSlideshow();
				}
				t.animate(t.getNextItem(), t.settings.thumbClickEffect);
			})
			.css("top", this.scene.height() / 2 + "px");
		this.object
			.append('<div class="scrollbutton left"></div>')
			.children(".scrollbutton.left")
			.bind("click", {t: t}, function (e) {
				if (t.settings.pauseOnClick) {
					t.stopSlideshow();
				}
				t.animate(t.getPrevItem(), t.settings.thumbClickEffect);
			})
			.css("top", this.scene.height() / 2 + "px");
	}
	this.scrollButtons = this.object.find(".scrollbutton").hide();
	this.object.bind("mouseenter", {t: this}, function (e) {
		e.data.t.scrollButtons.show();
	});
	this.object.bind("mouseleave", {t: this}, function (e) {
		e.data.t.scrollButtons.hide();
	});
	this.images.each(function () {
		jQuery(this)
			.children("*")
			.css({
				width: t.settings.thumbWidth,
				height: t.settings.thumbHeight,
				background: t.settings.thumbBackground,
			});
		jQuery(this).appendTo(navigation);
		jQuery(this).bind("click", {t: t}, function (e) {
			var t = e.data.t,
				id;
			if (t.settings.pauseOnClick) {
				t.stopSlideshow();
			}
			id = jQuery(this).attr("id").replace(/thumb/, "normal");
			if (t.animate(t.getItemOfId(id), t.settings.thumbClickEffect)) {
				return false;
			}
			return true;
		});
	});
	if (this.settings.navigation) {
		navigation.show();
	}
};
GS.drawImages = function () {
	this.object.prepend('<div class="imageContainer"></div>');
	var imageContainer = (this.imageContainer =
			this.object.children(".imageContainer")),
		t = this,
		src;
	this.images.each(function (x) {
		jQuery(this)
			.find("img")
			.load(function () {
				t.prepareThumbImage(jQuery(this));
				jQuery(this).unbind("load");
			});
		t.prepareThumbImage(jQuery(this).find("img"));
		var imageWithLink = jQuery(this)
			.attr("id", "image-thumb-" + x)
			.children(".innerthumbnail")
			.children()
			.clone();
		if (imageWithLink.get(0).nodeName.toLowerCase() !== "a") {
			imageWithLink = jQuery('<a href="#"></a>').append(imageWithLink);
		}
		imageWithLink.attr("id", "image-normal-" + x);
		imageWithLink.attr("title", imageWithLink.children("img").attr("title"));
		if (t.settings.debug) {
			jQuery.log(imageWithLink);
		}
		src = imageWithLink.children("img").attr("src");
		src = src.replace(/\/thumb(_|\/)/, "/cache$1");
		imageWithLink.children("img").attr("src", src).css({margin: "auto"});
		imageWithLink.css({
			display: "block",
			width: t.scene.width(),
			height: t.scene.height(),
			position: "absolute",
			left: "0px",
			top: "0px",
			background: t.settings.imageBackground,
		});
		if (t.settings.pauseOnClick) {
			imageWithLink.bind("click", {t: t}, function (e) {
				t.stopSlideshow();
				return true;
			});
		}
		t.prepareNormalImage(imageWithLink.children("img"));
		imageWithLink.appendTo(imageContainer);
	});
	var isTouchEnabled =
		diy.context.type === "editor"
			? diy.editor.uiPreference.isPointerModeTouch()
			: Modernizr.touch;
	if (isTouchEnabled && typeof jQuery.swipebox === "function") {
		jQuery("#" + this.object.attr("id") + " .imageContainer a[data-is-image]")
			.addClass("swipebox")
			.swipebox();
	} else {
		this.imageContainer.tinyLightbox({item: "a[data-is-image]", cycle: true});
	}
	this.scene.bind(
		"click",
		jQuery.proxy(function (e) {
			if (this.isFullscreenAvailable() && this.isFullscreenOn()) {
				return false;
			}
			this.currentItem.click();
			if (this.currentItem.attr("data-is-image")) {
				e.preventDefault();
			}
		}, this)
	);
};
GS.toggleSlideshow = function () {
	if (this.paused) {
		this.startSlideshow();
	} else {
		this.stopSlideshow();
	}
};
GS.startSlideshow = function () {
	if (!this.running && this.paused === true) {
		if (this.settings.navigation) {
			this.navigation.children(".pause").addClass("running");
		}
		this.paused = false;
		this.runningSlideshow();
	}
};
GS.stopSlideshow = function () {
	this.paused = true;
	window.clearTimeout(this.timeout);
	if (this.settings.navigation) {
		this.navigation.children(".pause").removeClass("running");
	}
};
GS.runningSlideshow = function () {
	var t = this;
	if (!this.paused) {
		this.timeout = setTimeout(function () {
			if (!t.paused) {
				t.running = true;
				var nextItem = t.getNextItem();
				if (nextItem && nextItem.parents("body").length > 0) {
					t.animate(t.getNextItem());
					t.runningSlideshow();
				} else {
					t.destroy();
				}
			}
			t.running = false;
		}, this.settings.changeTime);
	}
	t.running = false;
};
GS.prepareThumbImage = function (img) {
	var height = this.settings.thumbHeight,
		width = this.settings.thumbWidth;
	return this.prepareImage(img, height, width);
};
GS.prepareNormalImage = function (img) {
	var maxHeight = this.settings.maxHeight,
		maxWidth = this.object.width(),
		imgHeight = parseInt(img.attr("data-height"), 10),
		imgWidth = parseInt(img.attr("data-width"), 10);
	return this.prepareImage(img, maxHeight, maxWidth, true, imgHeight, imgWidth);
};
GS.getOriginalSizeOfImage = function (img) {
	var originalImg = new Image(),
		width,
		height;
	originalImg.src = img.attr ? img.attr("src") : img.src;
	width = parseInt(originalImg.width, 10);
	height = parseInt(originalImg.height, 10);
	return {width: width, height: height};
};
GS.prepareImage = function (
	img,
	maxHeight,
	maxWidth,
	verticalCentered,
	imgHeight,
	imgWidth
) {
	var originalImageSize, diff, top;
	if (!imgHeight || !imgWidth) {
		originalImageSize = this.getOriginalSizeOfImage(img);
		imgWidth = imgWidth || parseInt(originalImageSize.width, 10);
		imgHeight = imgHeight || parseInt(originalImageSize.height, 10);
	}
	maxWidth = parseInt(maxWidth, 10);
	maxHeight = parseInt(maxHeight, 10);
	diff = maxWidth / imgWidth;
	if (imgHeight * diff >= maxHeight && maxHeight <= imgHeight) {
		imgHeight = maxHeight;
		img.css({height: maxHeight + "px", width: ""});
	} else if (maxWidth <= imgWidth) {
		img.css({width: maxWidth + "px", height: ""});
		imgHeight = imgHeight * diff;
	} else {
		img.css({width: "", height: ""});
	}
	if (verticalCentered && imgHeight > 0) {
		top = parseInt(maxHeight / 2 - imgHeight / 2, 10);
		if (top >= 0) {
			img.parent().css("padding-top", top + "px");
		}
	}
};
GS.getItemOfId = function (id) {
	return this.imageContainer.find("#" + id);
};
GS.getNextItem = function () {
	if (this.currentItem) {
		var next = this.currentItem.next();
		if (next === null || next.length <= 0) {
			return this.imageContainer.children(":first");
		}
		return next;
	}
	return null;
};
GS.getPrevItem = function () {
	if (this.currentItem) {
		var prev = this.currentItem.prev();
		if (prev === null || prev.length <= 0) {
			return this.imageContainer.children(":last");
		}
		return prev;
	}
	return null;
};
GS.setSelectedItemId = function (id) {
	id = id.replace(/normal/, "thumb");
	this.navigation.children().removeClass("active");
	this.navigation.children("#" + id).addClass("active");
};
GS.animate = function (nextItem, effect) {
	if (!nextItem || nextItem.length <= 0) {
		if (this.settings.debug) {
			jQuery.log("No Item!");
		}
		return false;
	}
	if (
		this.currentItem !== null &&
		nextItem.attr("id") === this.currentItem.attr("id")
	) {
		if (this.settings.debug) {
			jQuery.log("Same as current Item!");
		}
		return true;
	}
	effect = effect || this.settings.effect;
	var clone = nextItem.clone(false);
	if (effect === "random") {
		do {
			effect = Math.floor(Math.random() * 4 + 1);
		} while (effect === this.lastRandomEffect);
		this.lastRandomEffect = effect;
	}
	if (this.settings.debug) {
		jQuery.log("Animate with: " + effect);
	}
	switch (effect) {
		case 1:
		case "fade":
			this.fade(clone);
			break;
		case 2:
		case "clip":
			this.clip(clone);
			break;
		case 3:
		case "scale":
			this.scale(clone);
			break;
		case "noeffect":
			this.noeffect(clone);
			break;
		default:
			this.slide(clone);
			break;
	}
	this.currentItem = nextItem;
	return true;
};
GS.fade = function (nextItem) {
	var curItem = this.scene.children(":eq(0)");
	nextItem.hide().appendTo(this.scene);
	curItem.fadeOut(this.settings.fadeSpeed, function () {
		jQuery(this).remove();
	});
	nextItem.fadeIn(this.settings.fadeSpeed);
	this.setSelectedItemId(nextItem.attr("id"));
};
GS.clip = function (nextItem) {
	var curItem = this.scene.children(":eq(0)");
	nextItem.hide().appendTo(this.scene);
	curItem.stop().hide("clip", this.settings.clipSpeed, function () {
		jQuery(this).remove();
	});
	nextItem.stop().show("clip", this.settings.clipSpeed);
	this.setSelectedItemId(nextItem.attr("id"));
};
GS.scale = function (nextItem) {
	var curItem = this.scene.children(":eq(0)");
	nextItem.hide().appendTo(this.scene);
	curItem
		.stop()
		.hide("scale", {percent: 0}, this.settings.scaleSpeed, function () {
			jQuery(this).remove();
		});
	nextItem.stop().show("scale", {percent: 100}, this.settings.scaleSpeed);
	this.setSelectedItemId(nextItem.attr("id"));
};
GS.noeffect = function (nextItem) {
	this.scene.empty().append(nextItem);
	this.setSelectedItemId(nextItem.attr("id"));
};
GS.slide = function (nextItem) {
	var curItem = this.scene.children(":eq(0)");
	nextItem.hide().appendTo(this.scene);
	curItem
		.stop()
		.effect(
			"slide",
			{direction: "right", mode: "hide"},
			this.settings.slideSpeed,
			function () {
				jQuery(this).remove();
			}
		)
		.css("display", "block");
	nextItem.stop().effect("slide", this.settings.slideSpeed);
	this.setSelectedItemId(nextItem.attr("id"));
};
GS.drawed = function () {
	return this.object ? true : false;
};
GS.destroy = function () {
	this.scene.children().stop(true, true);
	this.stopSlideshow();
};
jQuery(document).ready(function () {
	jQuery('body *[data-jsclass][data-jsclass!=""]').each(function () {
		if (jQuery(this) !== undefined) {
			jQuery(this).generateObject();
		}
	});
});
(function ($) {
	$.xLazyLoader = function (method, options) {
		if (typeof method == "object") {
			options = method;
			method = "init";
		}
		new xLazyLoader()[method](options);
	};
	$.xLazyLoader.defaults = {
		js: [],
		css: [],
		img: [],
		name: null,
		timeout: 20000,
		success: function () {},
		error: function () {},
		complete: function () {},
		each: function () {},
		useCrossOrigin: false,
	};
	var head = document.getElementsByTagName("head")[0];
	function xLazyLoader() {
		var self = this,
			s,
			opts,
			loaded = [],
			errors = [],
			tTimeout,
			cssTimeout,
			toLoad,
			files = [];
		this.init = function (options) {
			if (!options) return;
			opts = s = $.extend({}, $.xLazyLoader.defaults, options);
			toLoad = {js: s.js, css: s.css, img: s.img};
			$.each(toLoad, function (type, f) {
				if (typeof f == "string") f = f.split(",");
				files = files.concat(f);
			});
			if (!files.length) {
				dispatchCallbacks("error");
				return;
			}
			if (s.timeout) {
				tTimeout = setTimeout(function () {
					var handled = loaded.concat(errors);
					$.each(files, function (i, file) {
						$.inArray(file, handled) == -1 && errors.push(file);
					});
					dispatchCallbacks("error");
				}, s.timeout);
			}
			$.each(toLoad, function (type, urls) {
				if ($.isArray(urls))
					$.each(urls, function (i, url) {
						load(type, url);
					});
				else if (typeof urls == "string") load(type, urls);
			});
		};
		this.js = function (src, callback, name) {
			var $script = $('script[src*="' + src + '"]');
			if ($script.length) {
				$script.attr("pending")
					? $script.bind("scriptload", callback)
					: callback();
				return;
			}
			var s = document.createElement("script");
			s.setAttribute("type", "text/javascript");
			s.setAttribute("src", src);
			s.setAttribute("id", name);
			s.setAttribute("pending", 1);
			if (opts.useCrossOrigin) {
				s.setAttribute("crossorigin", "anonymous");
			}
			s.onerror = addError;
			$(s).bind("scriptload", function () {
				$(this).removeAttr("pending");
				callback();
				setTimeout(function () {
					$(s).unbind("scriptload");
				}, 10);
			});
			var done = false;
			s.onload = s.onreadystatechange = function () {
				if (
					!done &&
					(!this.readyState || /loaded|complete/.test(this.readyState))
				) {
					done = true;
					s.onload = s.onreadystatechange = null;
					$(s).trigger("scriptload");
				}
			};
			head.appendChild(s);
		};
		this.css = function (href, callback, name) {
			if ($('link[href*="' + href + '"]').length) {
				callback();
				return;
			}
			var link = $(
				'<link rel="stylesheet" type="text/css" media="all" href="' +
					href +
					'" id="' +
					name +
					'"></link>'
			)[0];
			if ($.browser.msie) {
				if (Number($.browser.version) > 10) {
					link.onload = callback;
				} else {
					link.onreadystatechange = function () {
						/loaded|complete/.test(link.readyState) && callback();
					};
				}
			} else {
				link.onload = callback;
			}
			head.appendChild(link);
		};
		this.img = function (src, callback) {
			var img = new Image();
			img.onload = callback;
			img.onerror = addError;
			img.src = src;
		};
		this.disable = function (name) {
			$("#lazy-loaded-" + name, head).prop("disabled", true);
		};
		this.enable = function (name) {
			$("#lazy-loaded-" + name, head).prop("disabled", false);
		};
		this.destroy = function (name) {
			$("#lazy-loaded-" + name, head).remove();
		};
		function load(type, url) {
			url = /^\/\//.test(url) ? window.location.protocol + url : url;
			self[type](
				url,
				function (status) {
					status == "error"
						? errors.push(url)
						: loaded.push(url) && s.each(url);
					checkProgress();
				},
				"lazy-loaded-" + (s.name ? s.name : new Date().getTime())
			);
		}
		function dispatchCallbacks(status) {
			s.complete(status, loaded, errors);
			s[status](status == "error" ? errors : loaded);
			clearTimeout(tTimeout);
			clearTimeout(cssTimeout);
		}
		function checkProgress() {
			if (loaded.length == files.length) dispatchCallbacks("success");
			else if (loaded.length + errors.length == files.length)
				dispatchCallbacks("error");
		}
		function addError() {
			errors.push(this.src);
			checkProgress();
		}
	}
})(jQuery);
(function ($) {
	if (!window.diy) {
		window.diy = {};
	}
	if (!window.diy.core) {
		window.diy.core = {};
	}
	window.diy.core = {
		dataObjectProperty: "diy-object",
		namespace: function (ns) {
			var pieces = ns.split(".");
			var base = window;
			while (pieces.length > 0) {
				var piece = pieces.shift();
				if (!base[piece]) {
					base[piece] = {};
				}
				base = base[piece];
			}
			return base;
		},
		namespaceExists: function (ns) {
			var pieces = ns.split(".");
			var base = window;
			while (pieces.length > 0) {
				var piece = pieces.shift();
				if (!base[piece]) {
					return false;
				}
				base = base[piece];
			}
			return true;
		},
		createObject: function (ns, el) {
			var clazz;
			if (typeof ns === "string") {
				if (!this.namespaceExists(ns)) {
					throw new Error("namespace " + ns + " doesn't exist");
				}
				clazz = this.namespace(ns);
			} else {
				clazz = ns;
			}
			if (!$.isFunction(clazz)) {
				throw new Error(ns + " is not a JavaScript class (function)");
			}
			var $el = $(el),
				options = $.extend($.parseJSON($el.attr("data-jsoptions") || "null"), {
					element: $el,
				});
			var obj = new clazz(options);
			this.setObject(el, obj);
			return obj;
		},
		getObject: function (el) {
			return $(el).data(this.dataObjectProperty);
		},
		setObject: function (el, obj) {
			$(el).data(this.dataObjectProperty, obj);
		},
	};
})(jQuery);
(function ($) {
	var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
		meta = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\",
		};
	$.toJSON =
		typeof JSON === "object" && JSON.stringify
			? JSON.stringify
			: function (o) {
					if (o === null) {
						return "null";
					}
					var type = typeof o;
					if (type === "undefined") {
						return undefined;
					}
					if (type === "number" || type === "boolean") {
						return "" + o;
					}
					if (type === "string") {
						return $.quoteString(o);
					}
					if (type === "object") {
						if (typeof o.toJSON === "function") {
							return $.toJSON(o.toJSON());
						}
						if (o.constructor === Date) {
							var month = o.getUTCMonth() + 1,
								day = o.getUTCDate(),
								year = o.getUTCFullYear(),
								hours = o.getUTCHours(),
								minutes = o.getUTCMinutes(),
								seconds = o.getUTCSeconds(),
								milli = o.getUTCMilliseconds();
							if (month < 10) {
								month = "0" + month;
							}
							if (day < 10) {
								day = "0" + day;
							}
							if (hours < 10) {
								hours = "0" + hours;
							}
							if (minutes < 10) {
								minutes = "0" + minutes;
							}
							if (seconds < 10) {
								seconds = "0" + seconds;
							}
							if (milli < 100) {
								milli = "0" + milli;
							}
							if (milli < 10) {
								milli = "0" + milli;
							}
							return (
								'"' +
								year +
								"-" +
								month +
								"-" +
								day +
								"T" +
								hours +
								":" +
								minutes +
								":" +
								seconds +
								"." +
								milli +
								'Z"'
							);
						}
						if (o.constructor === Array) {
							var ret = [];
							for (var i = 0; i < o.length; i++) {
								ret.push($.toJSON(o[i]) || "null");
							}
							return "[" + ret.join(",") + "]";
						}
						var name,
							val,
							pairs = [];
						for (var k in o) {
							type = typeof k;
							if (type === "number") {
								name = '"' + k + '"';
							} else if (type === "string") {
								name = $.quoteString(k);
							} else {
								continue;
							}
							type = typeof o[k];
							if (type === "function" || type === "undefined") {
								continue;
							}
							val = $.toJSON(o[k]);
							pairs.push(name + ":" + val);
						}
						return "{" + pairs.join(",") + "}";
					}
			  };
	$.evalJSON =
		typeof JSON === "object" && JSON.parse
			? JSON.parse
			: function (src) {
					return eval("(" + src + ")");
			  };
	$.secureEvalJSON =
		typeof JSON === "object" && JSON.parse
			? JSON.parse
			: function (src) {
					var filtered = src
						.replace(/\\["\\\/bfnrtu]/g, "@")
						.replace(
							/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
							"]"
						)
						.replace(/(?:^|:|,)(?:\s*\[)+/g, "");
					if (/^[\],:{}\s]*$/.test(filtered)) {
						return eval("(" + src + ")");
					} else {
						throw new SyntaxError("Error parsing JSON, source is not valid.");
					}
			  };
	$.quoteString = function (string) {
		if (string.match(escapeable)) {
			return (
				'"' +
				string.replace(escapeable, function (a) {
					var c = meta[a];
					if (typeof c === "string") {
						return c;
					}
					c = a.charCodeAt();
					return (
						"\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
					);
				}) +
				'"'
			);
		}
		return '"' + string + '"';
	};
})(jQuery);
(function ($) {
	var methods = {
		init: function (options) {
			return this.each(function () {
				var slideshow = this,
					$slideshow = $(this),
					data = $slideshow.data("rsf_slideshow"),
					settings;
				if (!data) {
					settings = $.extend(true, {}, $.rsfSlideshow.defaults);
					if (typeof options === "object") {
						$.extend(true, settings, options);
					}
					$slideshow.data("rsf_slideshow", {
						slides: [],
						this_slide: 0,
						effect_iterator: {this_effect: -1, direction: 1},
						settings: settings,
						interval_id: false,
						loaded_imgs: [],
						queued: 0,
					});
					data = $slideshow.data("rsf_slideshow");
				}
				settings = data.settings;
				$slideshow.rsfSlideshow("getSlidesFromMarkup");
				if (settings.slides.length) {
					$slideshow.rsfSlideshow("addSlides", settings.slides);
					settings.slides = [];
				}
				if (typeof settings.eventHandlers === "object") {
					$.each(settings.eventHandlers, function (evnt, fn) {
						$slideshow.bind(evnt, function (e) {
							fn($slideshow, e);
						});
					});
				}
				if (settings.controls.playPause.auto) {
					$slideshow.rsfSlideshow("addControl", "playPause");
				}
				if (settings.controls.previousSlide.auto) {
					$slideshow.rsfSlideshow("addControl", "previousSlide");
				}
				if (settings.controls.index.auto) {
					$slideshow.rsfSlideshow("addControl", "index");
				}
				if (settings.controls.nextSlide.auto) {
					$slideshow.rsfSlideshow("addControl", "nextSlide");
				}
				if (settings.autostart) {
					$slideshow.rsfSlideshow("startShow");
				}
			});
		},
		addSlides: function (slides) {
			return this.each(function () {
				if (slides instanceof Array) {
					for (var i = 0, len = slides.length; i < len; i++) {
						RssPrivateMethods._addSlide($(this), slides[i]);
					}
				} else {
					RssPrivateMethods._addSlide($(this), slides);
				}
			});
		},
		removeSlides: function (slide_keys) {
			if (slide_keys === undefined) {
				return this.each(function () {
					$(this).data("rsf_slideshow").slides = [];
				});
			} else if (slide_keys instanceof Array) {
				slide_keys.sort(function (a, b) {
					return b - a;
				});
				var removed = [];
				return this.each(function () {
					for (var i = 0, len = slide_keys.length; i < len; i++) {
						if ($.inArray(slide_keys[i], removed) === -1) {
							RssPrivateMethods._removeSlide($(this), slide_keys[i]);
							removed.push(slide_keys[i]);
						}
					}
				});
			} else {
				return this.each(function () {
					RssPrivateMethods._removeSlide($(this), slide_keys);
				});
			}
		},
		getSlideData: function (key) {
			if (key === undefined) {
				return this.data("rsf_slideshow").slides;
			}
			if (this.data("rsf_slideshow").slides[key]) {
				return this.data("rsf_slideshow").slides[key];
			}
			return false;
		},
		startShow: function (interval, instant) {
			return this.each(function () {
				var $slideshow = $(this);
				if (!$slideshow.data("rsf_slideshow").interval_id) {
					if (instant) {
						$slideshow.rsfSlideshow("nextSlide");
					}
					$slideshow.data("rsf_slideshow")._current_interval = interval;
					RssPrivateMethods._setTimeout($slideshow, interval);
					$slideshow.bind("_rsSlideReady", function (e, event_data) {
						RssPrivateMethods._setTimeout($slideshow, interval);
					});
					RssPrivateMethods._trigger($slideshow, "rsStartShow");
				}
			});
		},
		stopShow: function () {
			return this.each(function () {
				var $slideshow = $(this),
					data = $slideshow.data("rsf_slideshow");
				if (data.interval_id) {
					clearTimeout(data.interval_id);
					data.interval_id = false;
				}
				$slideshow.unbind("_rsSlideReady");
				RssPrivateMethods._trigger($(this), "rsStopShow");
			});
		},
		toggleShow: function () {
			return this.each(function () {
				if ($(this).rsfSlideshow("isRunning")) {
					$(this).rsfSlideshow("stopShow");
				} else {
					$(this).rsfSlideshow("startShow", false, true);
				}
			});
		},
		isRunning: function () {
			if (this.data("rsf_slideshow").interval_id) {
				return true;
			}
			return false;
		},
		currentSlideKey: function () {
			var data = this.data("rsf_slideshow");
			return data.this_slide;
		},
		totalSlides: function () {
			var data = this.data("rsf_slideshow");
			return data.slides.length;
		},
		getSlidesFromMarkup: function (options) {
			return this.each(function () {
				var data = $(this).data("rsf_slideshow");
				if (!options) {
					options = {};
				}
				if (!options.data_container) {
					options.data_container = data.settings.data_container;
				}
				var $cntnr;
				if (options.data_container.charAt(0) === "#") {
					$cntnr = $(options.data_container);
				} else {
					$cntnr = $(this).children(options.data_container);
				}
				if (!$cntnr.length) {
					return false;
				}
				if (!options.slide_data_container) {
					options.slide_data_container = data.settings.slide_data_container;
				}
				var slide_data_selectors = $.extend(
					true,
					{},
					data.settings.slide_data_selectors
				);
				if (options.slide_data_selectors) {
					$.extend(true, slide_data_selectors, options.slide_data_selectors);
				}
				options.slide_data_selectors = slide_data_selectors;
				var $self = $(this);
				$cntnr.children(options.slide_data_container).each(function () {
					var slide = RssPrivateMethods._findData(
						$(this),
						options.slide_data_selectors
					);
					$self.rsfSlideshow("addSlides", slide);
				});
			});
		},
		nextSlide: function () {
			return this.each(function () {
				var data = $(this).data("rsf_slideshow");
				data.this_slide++;
				if (data.this_slide >= data.slides.length) {
					if (data.settings.loop) {
						data.this_slide = 0;
					} else {
						data.this_slide = data.slides.length - 1;
						$(this).rsfSlideshow("stopShow");
						return true;
					}
				}
				$(this).rsfSlideshow("showSlide", data.slides[data.this_slide]);
			});
		},
		previousSlide: function () {
			return this.each(function () {
				var data = $(this).data("rsf_slideshow");
				data.this_slide--;
				if (data.this_slide < 0) {
					if (data.settings.loop) {
						data.this_slide = data.slides.length - 1;
					} else {
						data.this_slide = 0;
						$(this).rsfSlideshow("stopShow");
						return true;
					}
				}
				$(this).rsfSlideshow("showSlide", data.slides[data.this_slide]);
			});
		},
		switchToSlide: function (slideNumber) {
			return $(this).rsfSlideshow("goToSlide", slideNumber, true);
		},
		goToSlide: function (key, instant) {
			return this.each(function () {
				var data = $(this).data("rsf_slideshow");
				if (typeof data.slides[key] === "object") {
					data.this_slide = key;
					$(this).rsfSlideshow(
						"showSlide",
						data.slides[data.this_slide],
						instant
					);
				}
			});
		},
		showSlide: function (slide, instant) {
			var $slideshow = this,
				data = $slideshow.data("rsf_slideshow"),
				containerWidth = $slideshow.width(),
				containerHeight = $slideshow.height();
			RssPrivateMethods._trigger($slideshow, "rsPreTransition");
			$slideshow.children("img:first").css("z-index", 0);
			var whenLoaded = function (img) {
				var $img = $(img);
				$img.addClass("rsf-slideshow-image");
				var whenDimensions = function (width, height) {
					RssPrivateMethods._trigger($slideshow, "rsImageReady");
					var leftOffset = 0;
					if (width) {
						leftOffset = Math.ceil(containerWidth / 2 - width / 2);
					}
					var topOffset = 0;
					if (height) {
						topOffset = Math.ceil(containerHeight / 2 - height / 2);
					}
					$img.css({left: leftOffset});
					$img.css({top: topOffset});
					if (slide.image_title) {
						$img.attr("title", slide.image_title);
					}
					if (slide.image_alt) {
						$img.attr("alt", slide.image_alt);
					}
					if (slide.link_to) {
						$img = $('<a href="' + slide.link_to + '"></a>').append($img);
					}
					var $slide = $("<div></div>");
					if (slide.bgColor) {
						$slide.css("background-color", slide.bgColor);
					}
					$slide.addClass(data.settings.slide_container_class);
					$slide.append($img).css("display", "none");
					if (slide.caption) {
						var $capt = $("<div>" + slide.caption + "</div>");
						$capt.addClass(data.settings.slide_caption_class);
						$capt.appendTo($slide);
						if (slide.captionClass) {
							$capt.addClass(slide.captionClass);
						}
					}
					var effect = data.settings.effect;
					if (slide.effect) {
						effect = slide.effect;
					}
					if (instant) {
						effect = "none";
					}
					RssPrivateMethods._trigger($slideshow, "_rsSlideReady", {
						$slide: $slide,
					});
					RssPrivateMethods._trigger($slideshow, "rsSlideReady", {
						$slide: $slide,
					});
					RssPrivateMethods._transitionWith($slideshow, $slide, effect);
					return true;
				};
				RssPrivateMethods._getImageDimensions(
					$slideshow,
					$img,
					whenDimensions,
					(data.settings.interval * 1000) / 2,
					function () {
						whenDimensions();
					}
				);
			};
			var newImg = new Image();
			$(newImg).bind("load", function () {
				whenLoaded(this);
			});
			newImg.src = slide.url;
			return this;
		},
		addControl: function (type) {
			return this.each(function () {
				var $slideshow = $(this),
					settings = $slideshow.data("rsf_slideshow").settings;
				var $control = settings.controls[type].generate($slideshow);
				RssPrivateMethods._controlsContainer($slideshow);
				settings.controls[type].place($slideshow, $control);
				var bind_method =
					"bind" +
					type.substr(0, 1).toUpperCase() +
					type.substr(1, type.length);
				$slideshow.rsfSlideshow(bind_method, $control);
			});
		},
		bindPlayPause: function ($playPause) {
			return this.each(function () {
				var $slideshow = $(this);
				var data = $slideshow.data("rsf_slideshow");
				$playPause.bind("click.rsfSlideshow", function (e) {
					e.preventDefault();
					$slideshow.rsfSlideshow("toggleShow");
				});
			});
		},
		bindPreviousSlide: function ($prev, autostop) {
			return this.each(function () {
				var $slideshow = $(this);
				var data = $slideshow.data("rsf_slideshow");
				if (!autostop) {
					autostop = data.settings.controls.previousSlide.autostop;
				}
				$prev.bind("click.rsfSlideshow", function (e) {
					e.preventDefault();
					$slideshow.rsfSlideshow("previousSlide");
					if (autostop) {
						$slideshow.rsfSlideshow("stopShow");
					}
				});
			});
		},
		bindNextSlide: function ($next, autostop) {
			return this.each(function () {
				var $slideshow = $(this);
				var data = $slideshow.data("rsf_slideshow");
				if (!autostop) {
					autostop = data.settings.controls.nextSlide.autostop;
				}
				$next.bind("click.rsfSlideshow", function (e) {
					e.preventDefault();
					$slideshow.rsfSlideshow("nextSlide");
					if (autostop) {
						$slideshow.rsfSlideshow("stopShow");
					}
				});
			});
		},
		bindIndex: function ($index, autostop) {
			return this.each(function () {
				var $slideshow = $(this),
					settings = $slideshow.data("rsf_slideshow").settings;
				if (!autostop) {
					autostop = settings.controls.index.autostop;
				}
				var $indexLinks = settings.controls.index.getEach($slideshow);
				$indexLinks.bind("click.rsfSlideshow", function (e) {
					e.preventDefault();
					var slide_key = settings.controls.index.getSlideKey($(this));
					if (slide_key) {
						$slideshow.rsfSlideshow("goToSlide", slide_key);
						if (autostop) {
							$slideshow.rsfSlideshow("stopShow");
						}
					}
				});
				RssPrivateMethods._bindActiveIndex($slideshow);
			});
		},
	};
	$.fn.rsfSlideshow = function (method) {
		if (!this.length) {
			return this;
		}
		if (methods[method]) {
			return methods[method].apply(
				this,
				Array.prototype.slice.call(arguments, 1)
			);
		} else if (typeof method === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method + " does not exist on jQuery.rsfSlidehow");
		}
	};
	var RssPrivateMethods = {
		_findData: function ($slideData, slide_data_selectors) {
			var slide = {};
			var slide_attr;
			for (var key in slide_data_selectors) {
				if (slide_data_selectors.hasOwnProperty(key)) {
					var $slideDataClone = $slideData.clone();
					if (slide_data_selectors[key].selector) {
						$slideDataClone = $slideDataClone.children(
							slide_data_selectors[key].selector
						);
					}
					if (slide_data_selectors[key].attr) {
						slide_attr = $slideDataClone.attr(slide_data_selectors[key].attr);
					} else {
						slide_attr = $slideDataClone.html();
					}
					slide[key] = slide_attr;
				}
			}
			return slide;
		},
		_addSlide: function ($slideshow, slide) {
			var data = $slideshow.data("rsf_slideshow");
			if (typeof slide === "string") {
				var url = $.trim(slide);
				data.slides.push({url: url});
			} else if (slide.url) {
				for (var key in slide) {
					if (slide.hasOwnProperty(key)) {
						slide[key] = $.trim(slide[key]);
					}
				}
				data.slides.push(slide);
			}
		},
		_removeSlide: function ($slideshow, key) {
			$slideshow.data("rsf_slideshow").slides.splice(key, 1);
		},
		_transitionWith: function ($slideshow, $slide, effect) {
			var data = $slideshow.data("rsf_slideshow"),
				effect_iteration = "random",
				$prevSlide = $slideshow.find(
					"." + data.settings.slide_container_class + ":last"
				);
			if ($prevSlide.length) {
				$slide.insertAfter($prevSlide);
			} else {
				$slide.prependTo($slideshow);
			}
			if (typeof effect === "object" && effect.iteration && effect.effects) {
				effect_iteration = effect.iteration;
				effect = effect.effects;
			}
			if (effect instanceof Array) {
				switch (effect_iteration) {
					case "loop":
						data.effect_iterator.this_effect++;
						if (data.effect_iterator.this_effect > effect.length - 1) {
							data.effect_iterator.this_effect = 0;
						}
						break;
					case "backAndForth":
						data.effect_iterator.this_effect += data.effect_iterator.direction;
						if (data.effect_iterator.this_effect < 0) {
							data.effect_iterator.this_effect = 1;
							data.effect_iterator.direction =
								data.effect_iterator.direction * -1;
						}
						if (data.effect_iterator.this_effect > effect.length - 1) {
							data.effect_iterator.this_effect = effect.length - 2;
							data.effect_iterator.direction =
								data.effect_iterator.direction * -1;
						}
						break;
					default:
						data.effect_iterator.this_effect = Math.floor(
							Math.random() * effect.length
						);
						break;
				}
				effect = effect[data.effect_iterator.this_effect];
			}
			if (
				$.rsfSlideshow.transitions[effect] &&
				typeof $.rsfSlideshow.transitions[effect] === "function"
			) {
				$.rsfSlideshow.transitions[effect]($slideshow, $slide);
			}
		},
		_doSlide: function ($slideshow, $slide, left_offset, top_offset) {
			var data = $slideshow.data("rsf_slideshow"),
				$prevSlide = $slide.prev();
			$slide.css({top: top_offset, left: left_offset});
			$slide.css("display", "block");
			$slide
				.stop()
				.animate(
					{top: 0, left: 0},
					data.settings.transition,
					data.settings.easing,
					function () {
						RssPrivateMethods._endTransition($slideshow, $slide);
					}
				);
			$prevSlide
				.stop()
				.animate(
					{top: 0 - top_offset, left: 0 - left_offset},
					data.settings.transition,
					data.settings.easing
				);
		},
		_getImageDimensions: function (
			$slideshow,
			$img,
			sucesss,
			timeout,
			onTimeout,
			time
		) {
			if (!time) {
				time = 0;
				$slideshow.prepend($img);
			}
			var width = $img.outerWidth();
			var height = $img.outerHeight();
			if (width && height) {
				$img.detach();
				sucesss(width, height);
				return true;
			}
			if (timeout && time > timeout) {
				$img.detach();
				if (onTimeout && typeof onTimeout === "function") {
					onTimeout(timeout, time);
				}
				return false;
			}
			time += 200;
			setTimeout(function () {
				RssPrivateMethods._getImageDimensions(
					$slideshow,
					$img,
					sucesss,
					timeout,
					onTimeout,
					time
				);
			}, 200);
		},
		_endTransition: function ($slideshow, $slide) {
			$slide.prev().remove();
			RssPrivateMethods._trigger($slideshow, "rsPostTransition");
			if (
				$slideshow.rsfSlideshow("currentSlideKey") ===
				$slideshow.rsfSlideshow("totalSlides") - 1
			) {
				RssPrivateMethods._trigger($slideshow, "rsLastSlide");
			} else if ($slideshow.rsfSlideshow("currentSlideKey") === 0) {
				RssPrivateMethods._trigger($slideshow, "rsFirstSlide");
			}
		},
		_bindActiveIndex: function ($slideshow) {
			var indexSettings =
				$slideshow.data("rsf_slideshow").settings.controls.index;
			$slideshow.bind("rsPreTransition", function () {
				var current_slide_key = $(this).rsfSlideshow("currentSlideKey");
				indexSettings
					.getEach($slideshow)
					.removeClass(indexSettings.active_class);
				indexSettings
					.getSingleByKey($slideshow, current_slide_key)
					.addClass(indexSettings.active_class);
			});
		},
		_controlsContainer: function ($slideshow) {
			var settings = $slideshow.data("rsf_slideshow").settings;
			if (!settings.controls.container.get($slideshow).length) {
				var $container = settings.controls.container.generate($slideshow);
				settings.controls.container.place($slideshow, $container);
			}
		},
		_trigger: function ($slideshow, e, event_data) {
			var data = $slideshow.data("rsf_slideshow");
			if (typeof event_data !== "object") {
				event_data = {};
			}
			$.extend(event_data, {
				slide_key: data.this_slide,
				slide: data.slides[data.this_slide],
			});
			$slideshow.trigger(e, event_data);
		},
		_setTimeout: function ($slideshow, interval) {
			var data = $slideshow.data("rsf_slideshow");
			if (data.interval_id) {
				clearTimeout(data.interval_id);
			}
			if (!interval) {
				interval = data.settings.interval;
			}
			if (interval <= data.settings.transition / 1000) {
				interval = data.settings.transition / 1000 + 0.1;
			}
			data.interval_id = setTimeout(function () {
				$slideshow.rsfSlideshow("nextSlide");
			}, interval * 1000);
		},
	};
	$.rsfSlideshow = {
		defaults: {
			interval: 5,
			transition: 1000,
			effect: "fade",
			easing: "swing",
			loop: true,
			autostart: true,
			slides: [],
			slide_container_class: "slide-container",
			slide_caption_class: "slide-caption",
			data_container: "ol.slides",
			slide_data_container: "li",
			slide_data_selectors: {
				url: {selector: "a", attr: "href"},
				caption: {selector: "a", attr: "title"},
				link_to: {selector: "a", attr: "data-link-to"},
				effect: {selector: "a", attr: "data-effect"},
			},
			eventHandlers: {
				rsStartShow: function (rssObj, e) {
					var controlSettings =
						$(rssObj).data("rsf_slideshow").settings.controls.playPause;
					var $playPause = controlSettings.get($(rssObj));
					$playPause.html("Pause").addClass(controlSettings.playing_class);
				},
				rsStopShow: function (rssObj, e) {
					var controlSettings =
						$(rssObj).data("rsf_slideshow").settings.controls.playPause;
					var $playPause = controlSettings.get($(rssObj));
					$playPause.html("Play").addClass(controlSettings.paused_class);
				},
			},
			controls: {
				playPause: {
					generate: function ($slideshow) {
						return $(
							'<a href="#" class="rs-play-pause ' +
								$slideshow.data("rsf_slideshow").settings.controls.playPause
									.paused_class +
								'" data-control-for="' +
								$slideshow.attr("id") +
								'">Play</a>'
						);
					},
					place: function ($slideshow, $control) {
						var $container = $slideshow
							.data("rsf_slideshow")
							.settings.controls.container.get($slideshow);
						$container.append($control);
					},
					get: function ($slideshow) {
						return $(
							'.rs-play-pause[data-control-for="' + $slideshow.attr("id") + '"]'
						);
					},
					playing_class: "rs-playing",
					paused_class: "rs-paused",
					auto: false,
				},
				previousSlide: {
					generate: function ($slideshow) {
						return $(
							'<a href="#" class="rs-prev" data-control-for="' +
								$slideshow.attr("id") +
								'">&lt;</a>'
						);
					},
					place: function ($slideshow, $control) {
						var $container = $slideshow
							.data("rsf_slideshow")
							.settings.controls.container.get($slideshow);
						$container.append($control);
					},
					get: function ($slideshow) {
						return $(
							'.rs-prev[data-control-for="' + $slideshow.attr("id") + '"]'
						);
					},
					autostop: true,
					auto: false,
				},
				nextSlide: {
					generate: function ($slideshow) {
						return $(
							'<a href="#" class="rs-next" data-control-for="' +
								$slideshow.attr("id") +
								'">&gt;</a>'
						);
					},
					place: function ($slideshow, $control) {
						var $container = $slideshow
							.data("rsf_slideshow")
							.settings.controls.container.get($slideshow);
						$container.append($control);
					},
					get: function ($slideshow) {
						return $(
							'.rs-next[data-control-for="' + $slideshow.attr("id") + '"]'
						);
					},
					autostop: true,
					auto: false,
				},
				index: {
					generate: function ($slideshow) {
						var slide_count = $slideshow.rsfSlideshow("totalSlides"),
							$indexControl = $('<ul class="rs-index-list clearfix"></ul>');
						$indexControl.attr("data-control-for", $slideshow.attr("id"));
						for (var i = 0; i < slide_count; i++) {
							var $link = $('<a href="#"></a>');
							$link.addClass("rs-index");
							$link.attr("data-control-for", $slideshow.attr("id"));
							$link.attr("data-slide-key", i);
							$link.append(i + 1);
							if (i === $slideshow.rsfSlideshow("currentSlideKey")) {
								$link.addClass("rs-active");
							}
							var $li = $("<li></li>");
							$li.append($link);
							$indexControl.append($li);
						}
						return $indexControl;
					},
					place: function ($slideshow, $control) {
						var $container = $slideshow
							.data("rsf_slideshow")
							.settings.controls.container.get($slideshow);
						$container.append($control);
					},
					get: function ($slideshow) {
						return $(
							'.rs-index-list[data-control-for="' + $slideshow.attr("id") + '"]'
						);
					},
					getEach: function ($slideshow) {
						return $(
							'.rs-index[data-control-for="' + $slideshow.attr("id") + '"]'
						);
					},
					getSingleByKey: function ($slideshow, slide_key) {
						return $(
							'.rs-index[data-control-for="' +
								$slideshow.attr("id") +
								'"][data-slide-key="' +
								slide_key +
								'"]'
						);
					},
					getSlideKey: function ($controlItem) {
						return $controlItem.attr("data-slide-key");
					},
					active_class: "rs-active",
					autostop: true,
					auto: false,
				},
				container: {
					generate: function ($slideshow) {
						return $(
							'<div class="rs-controls clearfix" id="rs-controls-' +
								$slideshow.attr("id") +
								'"></div>'
						);
					},
					place: function ($slideshow, $control) {
						$slideshow.after($control);
					},
					get: function ($slideshow) {
						return $("#rs-controls-" + $slideshow.attr("id"));
					},
				},
			},
		},
		transitions: {
			none: function ($slideshow, $slide) {
				$slide.css("display", "block");
			},
			fade: function ($slideshow, $slide) {
				$slide.fadeIn(
					$slideshow.data("rsf_slideshow").settings.transition,
					function () {
						RssPrivateMethods._endTransition($slideshow, $slide);
					}
				);
			},
			slideLeft: function ($slideshow, $slide) {
				var left_offset = $slide.outerWidth();
				RssPrivateMethods._doSlide($slideshow, $slide, left_offset, 0);
			},
			slideRight: function ($slideshow, $slide) {
				var left_offset = 0 - $slide.outerWidth();
				RssPrivateMethods._doSlide($slideshow, $slide, left_offset, 0);
			},
			slideUp: function ($slideshow, $slide) {
				var top_offset = $slide.outerHeight();
				RssPrivateMethods._doSlide($slideshow, $slide, 0, top_offset);
			},
			slideDown: function ($slideshow, $slide) {
				var top_offset = 0 - $slide.outerHeight();
				RssPrivateMethods._doSlide($slideshow, $slide, 0, top_offset);
			},
		},
	};
})(jQuery);
(function ($) {
	"use strict";
	var $ehSlideShowEl = null,
		hideSlideShow = function () {
			$ehSlideShowEl.css("visibility", "hidden");
			$ehSlideShowEl
				.parents("#ehSlideshowPlaceholder")
				.css("visibility", "hidden");
		},
		showSlideShow = function () {
			$ehSlideShowEl.css("visibility", "visible");
			$ehSlideShowEl
				.parents("#ehSlideshowPlaceholder")
				.css("visibility", "visible");
		},
		isEditorOpen = function () {
			return (
				typeof CC !== "undefined" &&
				typeof CC.EmotionHeader !== "undefined" &&
				CC.EmotionHeader.isOpen()
			);
		},
		isEHBackgroundVisible = function () {
			if (
				typeof _backgroundDisabledByLayout !== "undefined" &&
				_backgroundDisabledByLayout
			) {
				return false;
			}
			if (
				typeof CC !== "undefined" &&
				typeof CC.EmotionHeader !== "undefined" &&
				typeof CC.EmotionHeader.model !== "undefined" &&
				CC.EmotionHeader.model !== null
			) {
				return CC.EmotionHeader.model.getBackgroundVisible();
			}
			var $bgImg = jQuery("#emotion-header-img");
			if (
				$bgImg.is(":hidden") ||
				"0" === $bgImg.css("opacity") ||
				"hidden" === $bgImg.css("visibility")
			) {
				return false;
			}
			return true;
		},
		defaultOptions = {
			interval: 4,
			transition: 1000,
			effect: "slideLeft",
			slides: [],
			autostart: false,
		},
		slideShowOptions = {};
	this.init = function (options) {
		$ehSlideShowEl = $("#ehSlideShow");
		$.extend(true, slideShowOptions, defaultOptions, options);
		$ehSlideShowEl.rsfSlideshow(slideShowOptions);
		hideSlideShow();
	};
	this.start = function (addSlides) {
		if (!isEHBackgroundVisible() || isEditorOpen() || $ehSlideShowEl === null) {
			return;
		}
		if (typeof addSlides !== "undefined") {
			$ehSlideShowEl.rsfSlideshow("removeSlides");
			$ehSlideShowEl.rsfSlideshow("addSlides", addSlides);
		}
		var countSlides = $ehSlideShowEl.rsfSlideshow("totalSlides");
		if (countSlides <= 1) {
			return;
		}
		$ehSlideShowEl.empty();
		showSlideShow();
		$ehSlideShowEl.rsfSlideshow("switchToSlide", 0);
		$ehSlideShowEl.rsfSlideshow("startShow");
	};
	this.stop = function () {
		hideSlideShow();
		$ehSlideShowEl.rsfSlideshow("stopShow");
	};
	this.toggle = function () {
		$ehSlideShowEl.rsfSlideshow("toggleShow");
	};
}.call(diy.core.namespace("diy.module.emotionHeader.slideShow"), jQuery));
(function ($) {
	"use strict";
	diy.core.namespace("diy.module").tableModule = {
		initFadeScroll: function (elemId) {
			var updateScrollTimer = null;
			var updateScrollDelay = 300;
			var requestAnimationFrame =
				window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame;
			var elem = $(elemId)
				.find(".tableContainer")
				.filter(function () {
					return $(this).children("table").length;
				});
			if (elem.length == 0) return;
			var start = 0,
				end = elem[0].scrollWidth - elem[0].clientWidth,
				hasScroll = !!end,
				endOffset = 10;
			if (!hasScroll) {
				return;
			}
			elem.addClass("fadeMask");
			var reachedTheEnd = null;
			var updateScrollFade = function (elem) {
				elem = $(elem);
				if (reachedTheEnd > 0) {
					if (requestAnimationFrame) {
						elem.scrollLeft(end - endOffset);
					}
					reachedTheEnd = null;
					return;
				}
				var scroll = elem.scrollLeft(),
					scrollClass;
				if (scroll == start) {
					scrollClass = "fadeRight";
				} else if (scroll >= end - endOffset) {
					scrollClass = "fadeLeft";
				} else {
					scrollClass = "fadeBoth";
				}
				$(["fadeRight", "fadeLeft", "fadeBoth"]).each(function (
					idx,
					className
				) {
					if (scrollClass !== className && elem.hasClass(className)) {
						elem.removeClass(className);
					}
				});
				if (!elem.hasClass(scrollClass)) {
					elem.addClass(scrollClass);
					if (scrollClass === "fadeLeft") {
						reachedTheEnd = true;
					}
				}
			};
			elem.addClass("fadeRight").bind("scroll", function () {
				if (!updateScrollTimer) {
					var callback = $.proxy(function () {
						updateScrollFade(this);
						updateScrollTimer = null;
					}, this);
					if (requestAnimationFrame) {
						updateScrollTimer = requestAnimationFrame(callback);
					} else {
						updateScrollTimer = setTimeout(callback, updateScrollDelay);
					}
				}
			});
		},
	};
})(jQuery);
(function ($) {
	var init = function () {
		$(document).ready(showLoginBoxAutomatically);
	};
	init();
	return $.extend(this, {});
}.call(diy.core.namespace("diy.editor.session"), jQuery));
jQuery(function ($) {
	if (window.diy && window.diy.context && window.diy.context.isPublicView) {
		$("body").addClass("publicview");
	}
});
window.perfBar = window.perfBar || {};
(function () {
	perfBar.init = function (config) {
		this.disabledMetrics = {};
		config = config || {};
		this.config = config;
		this.perf =
			window.performance ||
			window.msPerformance ||
			window.webkitPerformance ||
			window.mozPerformance;
		if (config.lazy) {
			setTimeout(function () {
				this.__runner();
			}, 1000);
			return;
		}
		this.__runner();
	};
	perfBar.__runner = function () {
		if (perfBar.perf) {
			perfBar.runPerfMetrics("perf");
		}
		perfBar.runPerfMetrics("others");
	};
	perfBar.metrics = {};
	perfBar.addMetric = function (metric) {
		if (typeof metric !== "object")
			return new Error("metric is not an Object.");
		if (!metric.id) return new Error("Id can't be empty.");
		if (!metric.label) return new Error("Label can't be empty.");
		if (!metric.hasOwnProperty("value"))
			return new Error("Value can't be empty.");
		if (this.disabledMetrics[metric.id]) return;
		this.mergeBudget(metric);
		this.metrics[metric.id] = metric;
	};
	perfBar.updateMetric = function (id, update) {
		if (typeof update !== "object")
			return new Error("update is not an Object.");
		if (!Object.keys(update).length) return;
		if (!this.metrics[id]) {
			update.id = id;
			return this.addMetric(update);
		}
		for (var key in update) {
			if (!update.hasOwnProperty(key)) return;
			switch (key) {
				case "value":
					this.metrics[id].value = update[key];
					break;
				case "label":
					this.metrics[id].label = update[key];
					break;
				case "unit":
					this.metrics[id].unit = update[key];
					break;
				case "budget":
					this.metrics[id].budget = update[key];
					break;
			}
		}
	};
	perfBar.deleteMetric = function (id) {
		if (!id || !this.metrics[id]) return;
		return delete this.metrics[id];
	};
	perfBar.enable = function (id) {
		if (!id) return;
		if (!this.disabledMetrics[id]) return true;
		delete this.disabledMetrics[id];
		if (this.metrics[id]) this.addMetric(this.metrics[id]);
		return true;
	};
	perfBar.disable = function (id) {
		if (!id) return;
		if (this.disabledMetrics[id]) return true;
		this.disabledMetrics[id] = this.metrics[id];
		return document.getElementById("perfBar-metric-" + id).remove();
	};
	var perfMetrics = {perf: [], others: []};
	perfBar.runPerfMetrics = function (type) {
		for (var i = 0; i < perfMetrics[type].length; i++) {
			perfMetrics[type][i]();
		}
		delete perfMetrics[type];
	};
	perfMetrics.perf.push(function addLoadTime() {
		perfBar.addMetric({
			id: "loadTime",
			value:
				perfBar.perf.timing.loadEventStart -
				perfBar.perf.timing.navigationStart,
			unit: "ms",
			label: "Load Time",
			budget: {max: 5000},
		});
	});
	perfMetrics.perf.push(function addLatency() {
		perfBar.addMetric({
			id: "latency",
			value:
				perfBar.perf.timing.responseStart - perfBar.perf.timing.connectStart,
			unit: "ms",
			label: "Latency",
			budget: {max: 50},
		});
	});
	perfMetrics.perf.push(function addFirstPaint() {
		var firstPaint = 0;
		var firstPaintTime = 0;
		if (window.chrome && window.chrome.loadTimes) {
			firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
			firstPaintTime =
				firstPaint - window.chrome.loadTimes().startLoadTime * 1000;
		} else if (typeof window.performance.timing.msFirstPaint === "number") {
			firstPaint = window.performance.timing.msFirstPaint;
			firstPaintTime = firstPaint - window.performance.timing.navigationStart;
		}
		if (!firstPaintTime) return;
		perfBar.addMetric({
			id: "firstPaint",
			value: Math.round(firstPaintTime),
			unit: "ms",
			label: "First Paint",
			budget: {max: 100},
		});
	});
	perfMetrics.perf.push(function addReqsNum() {
		var numReqs = "N/A";
		if ("getEntriesByType" in window.performance) {
			numReqs = window.performance.getEntriesByType("resource").length;
			perfBar.addMetric({
				id: "numOfReqs",
				value: numReqs,
				label: "Number of requests",
			});
		}
	});
	perfMetrics.perf.push(function addFrontEnd() {
		var max = Math.round(
			(perfBar.perf.timing.loadEventStart -
				perfBar.perf.timing.navigationStart) *
				0.8
		);
		perfBar.addMetric({
			id: "frontEnd",
			value:
				perfBar.perf.timing.loadEventStart - perfBar.perf.timing.responseEnd,
			unit: "ms",
			label: "Front End",
			budget: {max: max},
		});
	});
	perfMetrics.perf.push(function addBackEnd() {
		var max = Math.round(
			(perfBar.perf.timing.loadEventStart -
				perfBar.perf.timing.navigationStart) *
				0.2
		);
		perfBar.addMetric({
			id: "backEnd",
			value:
				perfBar.perf.timing.responseEnd - perfBar.perf.timing.navigationStart,
			unit: "ms",
			label: "Back End",
			budget: {max: max},
		});
	});
	perfMetrics.perf.push(function addDNS() {
		perfBar.addMetric({
			id: "dnsTime",
			value:
				perfBar.perf.timing.domainLookupEnd -
				perfBar.perf.timing.domainLookupStart,
			unit: "ms",
			label: "DNS",
		});
	});
	perfMetrics.perf.push(function addTCP() {
		perfBar.addMetric({
			id: "tcpTime",
			value: perfBar.perf.timing.connectEnd - perfBar.perf.timing.connectStart,
			unit: "ms",
			label: "TCP",
		});
	});
	perfMetrics.perf.push(function addResDuration() {
		perfBar.addMetric({
			id: "responseDuration",
			value:
				perfBar.perf.timing.responseEnd - perfBar.perf.timing.responseStart,
			unit: "ms",
			label: "Response Duration",
		});
	});
	perfMetrics.perf.push(function addReqDuration() {
		perfBar.addMetric({
			id: "requestDuration",
			value:
				perfBar.perf.timing.responseStart - perfBar.perf.timing.requestStart,
			unit: "ms",
			label: "Request Duration",
		});
	});
	perfMetrics.perf.push(function addRedirectsCount() {
		if (!perfBar.perf.navigation) return;
		perfBar.addMetric({
			id: "redirectCount",
			value: perfBar.perf.navigation.redirectCount,
			label: "Redirects",
		});
	});
	perfMetrics.perf.push(function addLoadEventTime() {
		perfBar.addMetric({
			id: "loadEventTime",
			value:
				perfBar.perf.timing.loadEventEnd - perfBar.perf.timing.loadEventStart,
			unit: "ms",
			label: "Load Event duration",
		});
	});
	perfMetrics.perf.push(function addDomLoaded() {
		perfBar.addMetric({
			id: "domContentLoaded",
			value:
				perfBar.perf.timing.domContentLoadedEventStart -
				perfBar.perf.timing.domLoading,
			unit: "ms",
			label: "DOM Content loaded",
		});
	});
	perfMetrics.perf.push(function addProcessing() {
		perfBar.addMetric({
			id: "processing",
			value:
				perfBar.perf.timing.loadEventStart - perfBar.perf.timing.domLoading,
			unit: "ms",
			label: "Processing Duration",
		});
	});
	perfMetrics.others.push(function addNumOfEl() {
		perfBar.addMetric({
			id: "numOfEl",
			value: document.documentElement.querySelectorAll("*").length,
			label: "DOM elements",
		});
	});
	perfMetrics.others.push(function addCssCount() {
		perfBar.addMetric({
			id: "cssCount",
			value: document.querySelectorAll('link[rel="stylesheet"]').length,
			label: "CSS",
		});
	});
	perfMetrics.others.push(function addJsCount() {
		perfBar.addMetric({
			id: "jsCount",
			value: document.querySelectorAll("script").length,
			label: "JavaScript",
		});
	});
	perfMetrics.others.push(function addImgCount() {
		perfBar.addMetric({
			id: "imgCount",
			value: document.querySelectorAll("img").length,
			label: "Images",
		});
	});
	perfMetrics.others.push(function addDataURI() {
		var count = 0;
		var images = document.querySelectorAll("img[src]");
		for (var i = 0; i < images.length; i++) {
			if (images[i].src.match(/^data:+/)) count++;
		}
		perfBar.addMetric({
			id: "dataURIImagesCount",
			value: count,
			label: "Data URI images",
		});
	});
	perfMetrics.others.push(function addInlineCssCount() {
		perfBar.addMetric({
			id: "inlineCSSCount",
			value: document.querySelectorAll("style").length,
			label: "Inline CSS",
		});
	});
	perfMetrics.others.push(function addInlineCss() {
		var js = document.querySelectorAll("script");
		var count = 0;
		for (var i = 0; i < js.length; i++) {
			if (!js[i].src) count++;
		}
		perfBar.addMetric({
			id: "inlineJSCount",
			value: count,
			label: "Inline JavaScript",
		});
	});
	perfMetrics.others.push(function add3rdCss() {
		var css = document.querySelectorAll('link[rel="stylesheet"]');
		var links = [];
		for (var i = 0; i < css.length; i++) {
			links.push(css[i].href);
		}
		var count = isThirdParty(links);
		perfBar.addMetric({
			id: "thirdCSSCount",
			value: count,
			label: "3rd Party CSS",
		});
	});
	perfMetrics.others.push(function add3rdCss() {
		var js = document.querySelectorAll("script[src]");
		var links = [];
		for (var i = 0; i < js.length; i++) {
			links.push(js[i].src);
		}
		var count = isThirdParty(links);
		perfBar.addMetric({
			id: "thirdJSCount",
			value: count,
			label: "3rd Party JavaScript",
		});
	});
	perfBar.mergeBudget = function (metric) {
		if (!this.config.budget) return;
		if (!this.config.budget[metric.id]) return;
		var budget = this.config.budget;
		if (!metric.budget || typeof metric.budget != "object") {
			metric.budget = budget[metric.id];
			return;
		}
		if (budget[metric.id].max) metric.budget.max = budget[metric.id].max;
		if (budget[metric.id].min) metric.budget.min = budget[metric.id].min;
	};
	function createHint(metric) {
		var budget = metric.budget;
		var minText = "Min Value is ";
		var maxText = "Max Value is ";
		var unitText = metric.unit || "";
		var hint = [];
		if (budget.hasOwnProperty("min"))
			hint.push(minText + budget.min + unitText + ".");
		if (budget.hasOwnProperty("max"))
			hint.push(maxText + budget.max + unitText + ".");
		metric.hint = hint.join(" ");
	}
	function isThirdParty(links) {
		var a = document.createElement("a");
		var counter = 0;
		for (var i = 0; i < links.length; i++) {
			a.href = links[i];
			if (
				a.hostname != window.location.hostname &&
				a.hostname.indexOf("website-start.de") == -1 &&
				a.hostname.indexOf("initial-website.com") == -1 &&
				a.hostname.indexOf("schlund.de") == -1 &&
				a.hostname.indexOf("petsi.lan") == -1 &&
				a.hostname.indexOf("mywebsite-editor.com") == -1 &&
				a.hostname.indexOf("1and1-editor.com") == -1
			)
				counter++;
		}
		return counter;
	}
	perfBar.send = function () {
		jQuery.ajax({
			url: perfBar.config.url,
			type: "POST",
			contentType: "application/vnd.oneandone.diy.perfdata+json; charset=UTF-8",
			data: JSON.stringify({
				websiteId: perfBar.config.websiteId,
				pageId: perfBar.config.pageId,
				mode: perfBar.config.mode,
				metrics: perfBar.metrics,
				referrer: document.referrer,
				type: perfBar.config.type,
				path: window.location.pathname,
				webcacheTimestamp: perfBar.config.webcacheTimestamp,
			}),
		});
	};
})();
(function ($) {
	$.diy = $.diy || {};
	$.diy.widget = function (name, base, prototype) {
		var fullName,
			existingConstructor,
			constructor,
			basePrototype,
			proxiedPrototype = {},
			namespace = name.split(".")[0];
		name = name.split(".")[1];
		fullName = namespace + "-" + name;
		if (!prototype) {
			prototype = base;
			base = $.Widget;
		}
		$.expr[":"][fullName.toLowerCase()] = function (elem) {
			return !!$.data(elem, fullName);
		};
		$[namespace] = $[namespace] || {};
		existingConstructor = $[namespace][name];
		constructor = $[namespace][name] = function (options, element) {
			if (!this._createWidget) {
				return new constructor(options, element);
			}
			if (arguments.length) {
				this._createWidget(options, element);
			}
		};
		$.extend(constructor, existingConstructor, {
			version: prototype.version,
			_proto: $.extend({}, prototype),
			_childConstructors: [],
		});
		basePrototype = new base();
		basePrototype.options = $.widget.extend({}, basePrototype.options);
		$.each(prototype, function (prop, value) {
			if (!$.isFunction(value)) {
				proxiedPrototype[prop] = value;
				return;
			}
			proxiedPrototype[prop] = (function () {
				var _super = function () {
						return base.prototype[prop].apply(this, arguments);
					},
					_superApply = function (args) {
						return base.prototype[prop].apply(this, args);
					};
				return function () {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;
					this._super = _super;
					this._superApply = _superApply;
					returnValue = value.apply(this, arguments);
					this._super = __super;
					this._superApply = __superApply;
					return returnValue;
				};
			})();
		});
		constructor.prototype = $.widget.extend(
			basePrototype,
			{
				widgetEventPrefix: existingConstructor
					? basePrototype.widgetEventPrefix
					: name,
			},
			proxiedPrototype,
			{
				constructor: constructor,
				namespace: namespace,
				widgetName: name,
				widgetFullName: fullName,
			}
		);
		if (existingConstructor) {
			$.each(existingConstructor._childConstructors, function (i, child) {
				var childPrototype = child.prototype;
				$.widget(
					childPrototype.namespace + "." + childPrototype.widgetName,
					constructor,
					child._proto
				);
			});
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push(constructor);
		}
		var target = constructor.prototype,
			mixins = target.mixins;
		if (mixins && mixins instanceof Array) {
			for (var i = 0; i < mixins.length; ++i) {
				var mixinParts = mixins[i].split(".");
				$.extend(true, target, $[mixinParts[0]][mixinParts[1]]);
			}
		}
		$.widget.bridge(namespace + "_" + name, constructor);
	};
	$.extend($.diy, {
		uid: 0,
		uniqueId: function () {
			return "diy-gen-" + $.diy.uid++;
		},
	});
})(jQuery);
(function ($) {
	"use strict";
	$.diy.widget("diy.switch", {
		options: {
			baseCls: "diy-switch",
			mode: "on-off",
			checked: false,
			showLabels: false,
			labels: {unchecked: "", checked: ""},
		},
		_getHtml: function () {
			var o = this.options;
			return (
				"" +
				'<span class="' +
				o.baseCls +
				"-label " +
				o.baseCls +
				'-unchecked-label"></span>' +
				'<div class="' +
				o.baseCls +
				'-btn-wrap">' +
				'<div class="' +
				o.baseCls +
				'-btn"></div>' +
				"</div>" +
				'<span class="' +
				o.baseCls +
				"-label " +
				o.baseCls +
				'-checked-label"></span>'
			);
		},
		_create: function () {
			this.element.addClass(this.options.baseCls);
			this.element.append(this._getHtml());
			this._getButtonWrap().bind("click", this._onBtnClick.bind(this));
		},
		_init: function () {
			this._setChecked(this.options.checked);
			this._setMode(this.options.mode);
			this._setShowLabels(this.options.showLabels);
			this._setLabels(this.options.labels);
			this._setOption("disabled", this.options.disabled);
		},
		_getButtonWrap: function () {
			return this.element.find("." + this.options.baseCls + "-btn-wrap");
		},
		_getButton: function () {
			return this.element.find("." + this.options.baseCls + "-btn");
		},
		_getLabel: function (checked) {
			var checkedCls = checked ? "checked" : "unchecked";
			return this.element.find(
				"." + this.options.baseCls + "-" + checkedCls + "-label"
			);
		},
		_setOption: function (key, value) {
			if (key === "checked") {
				this._setChecked(value);
			}
			if (key === "mode") {
				this._setMode(value);
			}
			if (key === "showLabels") {
				this._setShowLabels(value);
			}
			if (key === "labels") {
				this._setLabels(value);
			}
			this._super(key, value);
		},
		_setChecked: function (checked) {
			var o = this.options;
			checked = !!checked;
			this._getButton().toggleClass(o.baseCls + "-checked", checked);
			this._getLabel(false).toggleClass(o.baseCls + "-label-active", !checked);
			this._getLabel(true).toggleClass(o.baseCls + "-label-active", checked);
		},
		_setShowLabels: function (show) {
			this.element.toggleClass(this.options.baseCls + "-no-labels", !show);
		},
		_setLabels: function (labels) {
			this._getLabel(false).html(labels.unchecked);
			this._getLabel(true).html(labels.checked);
		},
		_setMode: function (mode) {
			var o = this.options;
			switch (mode) {
				case "slide":
				case "on-off":
					this.element.addClass(o.baseCls + "-" + mode);
					break;
				default:
					this.element.addClass(o.baseCls + "-on-off");
					break;
			}
		},
		_onBtnClick: function () {
			if (this.options.disabled) {
				return;
			}
			this._setOption("checked", !this.options.checked);
			this._trigger("change", this, {checked: this.options.checked});
		},
	});
})(jQuery);
