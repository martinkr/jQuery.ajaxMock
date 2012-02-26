/**
 *
 * jQuery.ajaxMock - https://github.com/martinkr/jQuery.ajaxMock
 *
 * jQuery.ajaxMock is a tiny but yet powerful mocking plugin for jQuery 1.5+.
 *
 * @Version: 1.0
 *
 * @example:
 *
 *   Register your mock object:
 *   // jQuery.ajaxMock.register( URL ,  {reponseText: "{String} Mocked responseText", statusCode: "{Number} Mocked status code", status: "{String} Mocked status description"}
 *   jQuery.ajaxMock.register('http://example.com', {
 *         responseText:'responseFoo',
 *         statusCode:200,
 *         status:'OK'
 *       }
 *  );
 *
 *  And all $.ajax-calls to 'http://example.com' will return the mocked response.
 *
 * Copyright (c) 2010-2012 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @requires
 *  jQuery JavaScript Library - http://jquery.com/, v1.5+
 *    Copyright 2010, John Resig
 *    Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license
 *
 */

// JSLint setting, @see http://www.jslint.com/lint.html#options
/*jslint devel: false, browser: true, continue: true, eqeq: true, vars: true, evil: true, white: true, forin: true, css: true, cap: true, nomen: true, plusplus: true, maxerr: 500, indent: 4 */

(function($) {
  $.ajaxMock = function() {


    // registered Mocks
    var _oMocks = {};
    var _oLast = {};

    /**
     * Register mock objeckt
     * @param  {String} sKey_     URL to mock
     * @param  {Object} oOptions_ Mocked response {statusCode:{Number} HTTP status code, status: {String}, responseText: {String}, responseXML: {String} }
     * @return {Void}
     */
    var _register = function (sKey_,oOptions_) {
      _oMocks[encodeURIComponent(sKey_)] = oOptions_;
    };

    /**
     * Returns a registered mock object
     * @param  {String} sKey_ URL
     * @return {Object} {statusCode:{Number} HTTP status code, status: {String}, responseText: {String}, responseXML: {String} }
     */
    var _getObject = function (sKey_) {
        return _oMocks[encodeURIComponent(sKey_)];
    };

    /**
     * Is there a mocked response?
     * @param  {String}  sKey_ URL
     * @return {Boolean}
     */
    var _isRegistered = function (sKey_) {
      return !!_oMocks[encodeURIComponent(sKey_)];
    };

    /**
     * Flushes all registered mock objects
     * @return {Void}
     */
    var _flush = function (){
		_oMocks = {};
    };

    /**
     * Sets/Gets the last mocked response
     * @param  {String} [sKey_] Identifier, sets last called object if supplied
     * @return {Object}
     */
    var _last = function (sKey_) {
      if (sKey_) {
        _oLast = _getObject(sKey_);
        _oLast.url = sKey_;
      }
      return _oLast;
    };

   /**
   * Constructor: sets $.ajaxTransport intercepting the original $.ajax
   * @return {Void}
   */
    var _initialize = function () {
      // check all requests
      $.ajaxTransport( "+*", function(  options_  ) {

        var _sUrl = options_.url;
        //if there's a registered mock object for this url: return mock object
        if( $.ajaxMock.isRegistered(_sUrl) ) {

          return {
            // override jquery's send()
            send: function( _ , fnCb_ ) {
              // implement own done()
              function done() {
                  // grab mock by url
                  var _oOpt = $.ajaxMock.getObject(_sUrl);
                  // set last mocked object to current
                  $.ajaxMock.last(_sUrl);
                  // pass manipulated response to $.ajax's callbacks
                  fnCb_( (_oOpt.statusCode || 200 ),( _oOpt.status || 'OK'),{'text': (_oOpt.responseText || '' )});
              }
              // proceed with $.ajax
              done();
            }
          };
        }
      });
    };
    /**
     * Public API
     */
    return {
      getObject : _getObject ,
      register: _register,
      isRegistered: _isRegistered,
      flush : _flush,
      last : _last,
      initialize: _initialize

    };

  }();
})(jQuery);

$.ajaxMock.initialize();

