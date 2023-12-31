(function ($) {
	diy.core.namespace("diy").pfcSupport = {
		setLinkParam: function (linkSelector, pfcValue) {
			var linkJQ = $(linkSelector);
			if (!linkJQ.is("a")) {
				return false;
			}
			var aHref = linkJQ.attr("href");
			if (!aHref) {
				return false;
			}
			aHref = this.setLinkParamToString(aHref, pfcValue);
			if (aHref) {
				linkJQ.attr("href", aHref);
				return true;
			}
			return false;
		},
		setLinkParamToString: function (link, pfcValue) {
			if (isNaN(pfcValue)) {
				return false;
			}
			if (link.length == 0 || link == "#") {
				return false;
			}
			if (link.indexOf("pfc=") === -1) {
				var delim = link.indexOf("?") > 0 ? "&" : "?";
				link += delim + "pfc=" + pfcValue;
			} else {
				link = link.replace(/pfc=[\d]+/, "pfc=" + pfcValue);
			}
			return link;
		},
		pfcs: {
			seoSpotlightExternalUrl: 23,
			seoReadyServiceExternalUrl: 23,
			newsletterToolExternalUrl: 24,
			newsletterModule: 25,
			websiteHideLoginSetting: 26,
			orderDomainExternalUrl: 27,
			connectDomainExternalUrl: 27,
			domainOverviewExternalUrl: 27,
			editEmailExternalUrl: 28,
		},
		initialize: function () {
			$(document).bind({
				"diy-siteadmin-sac-ready": function (ev, iframeWindow) {
					var pfcs = {
						"a.seo-spotlight-shop": 1,
						"a.seo-spotlight": 2,
						"a.seo-ready-service-shop": 3,
						"a.seo-ready-service": 4,
						"a#upgradeLink": 11,
					};
					for (var selector in pfcs) {
						if (pfcs.hasOwnProperty(selector)) {
							var linkJQ = iframeWindow.jQuery(selector);
							diy.pfcSupport.setLinkParam(linkJQ, pfcs[selector]);
						}
					}
				},
				"diy-editor-setting-page-loaded": function (ev, iframeWindow) {
					var pfcs = {
						".order_domain a": 5,
						".domain a": 6,
						".domain_overview a": 7,
						"a.email-overview": 8,
						"a.send-newsletter": 9,
					};
					for (var selector in pfcs) {
						if (pfcs.hasOwnProperty(selector)) {
							var linkJQ = iframeWindow.jQuery(selector);
							diy.pfcSupport.setLinkParam(linkJQ, pfcs[selector]);
						}
					}
				},
				"diy-siteadmin-initialized": function (ev, data) {
					diy.pfcSupport.setLinkParam("a#cc-sa-item-controlpanel", 10);
				},
				"diy-editor-sitebuilder-pageLoaded": function (ev, data) {
					diy.pfcSupport.setLinkParam(".expirationNotice a.shop", 22);
					diy.pfcSupport.setLinkParam(".expirationNotice a.shoplink", 35);
				},
				"diy-webview-pageLoaded": function (ev, data) {
					diy.pfcSupport.setLinkParam(".expirationNotice .loggedin a.shop", 29);
					diy.pfcSupport.setLinkParam(
						".modal.lock-message .loggedin a.buy",
						30
					);
					diy.pfcSupport.setLinkParam(
						".expirationNotice .loggedin a.shoplink",
						36
					);
				},
			});
		},
	};
	diy.pfcSupport.initialize();
	if (window.diy && window.diy.context && window.diy.context.type === "web") {
		$(function () {
			$(document).trigger("diy-webview-pageLoaded");
		});
	}
})(jQuery);
