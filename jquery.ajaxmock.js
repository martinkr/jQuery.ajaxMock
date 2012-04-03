/**
 *
 * jQuery.ajaxMock - https://github.com/martinkr/jQuery.ajaxMock
 *
 * jQuery.ajaxMock is a tiny but yet powerful mocking plugin for jQuery 1.5+.
 *
 * @Version: 1.2
 *
 * @example:
 *
 *   Register your mock object:
 *   // jQuery.ajaxMock.register( URL ,  {reponseText: "{String} Mocked responseText", statusCode: "{Number} Mocked status code", status: "{String} Mocked status description", type: "{String} http request method"}
 *   jQuery.ajaxMock.register('http://example.com', {
 *         responseText:'responseFoo',
 *         statusCode:200,
 *         status:'OK',
 *         type: 'POST', // optional, takes a String as http request method default: 'GET'
 *         delay: 1000 // optional
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
    var _oLast = {
        url:undefined,
        type:undefined
    };
    // default http request method
    var _sTypeDefault = 'GET';

  /**
   * Creates a unique identifier using the url and the http request method
   * @param  {String} sKey_  Url
   * @param  {String} [sType_] http request method, default: _sTypeDefault
   * @return {String}  identifier method++url, e.g.: GET http://examaple.org => "GET%2B%2Bhttp%3A%2F%2Fexample.org"
   */
    var _normalizeKey = function(sKey_,sType_) {
      return encodeURIComponent([(sType_ ||_sTypeDefault),'++',sKey_].join(''));
    };

    /**
     * Register mock objeckt
     * @param  {String} sKey_     URL to mock
     * @param  {Object} oOptions_ Mocked response {statusCode:{Number} HTTP status code, status: {String}, responseText: {String}, responseXML: {String}, type: {String} }
     * @return {Void}
     */
    var _register = function (sKey_,oOptions_) {
      _oMocks[_normalizeKey(sKey_,oOptions_.type )] = oOptions_;
    };

    /**
     * Returns a registered mock object
     * @param  {String} sKey_ URL
     * @return {Object} {statusCode:{Number} HTTP status code, status: {String}, responseText: {String}, responseXML: {String} }
     */
    var _getObject = function (sKey_,sType_) {
        return _oMocks[_normalizeKey(sKey_,sType_)];
    };

    /**
     * Is there a mocked response?
     * @param  {String}  sKey_ URL
     * @return {Boolean}
     */
    var _isRegistered = function (sKey_,sType_) {
      // var _obj = _oMocks[encodeURIComponent(sKey_)];
      // var sType_ = sType_ || _sTypeDefault;
      // if (!!_obj) {
      //   return (_obj.type === sType_);
      // }
      return !!_oMocks[_normalizeKey(sKey_,sType_)];
    };

    /**
     * Flushes all registered mock objects and the last call
     * @return {Void}
     */
    var _flush = function (){
      _oMocks = {};
		  _oLast = {
        url:undefined,
        type:undefined
      };
    };

    /**
     * Sets/Gets the last mocked response
     * @param  {String} [sKey_] Identifier, sets last called object if supplied
     * @return {Object} {type : {String} || undefined, url : {String} || undefined}
     */
    var _last = function (sKey_,sType_) {
      if (sKey_) {
        var _sType = sType_ || _sTypeDefault;
        _oLast = _getObject(sKey_,_sType);
        _oLast.url = sKey_;
        _oLast.type =_sType;
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
        var _sType = options_.type || _sTypeDefault;
        //if there's a registered mock object for this url: return mock object
        if( $.ajaxMock.isRegistered(_sUrl,_sType) ) {
          return {
            // override jquery's send()
            send: function( _ , fnCb_ ) {
              // grab mock by url
              var _oOpt = $.ajaxMock.getObject(_sUrl,_sType);
              // implement own done()
              function done() {
                  // set last mocked object to current
                  $.ajaxMock.last(_sUrl,_sType);
                  // pass manipulated response to $.ajax's callbacks
                  fnCb_( (_oOpt.statusCode || 200 ),( _oOpt.status || 'OK'),{'text': (_oOpt.responseText || '' ),'type': _sType});
              }
              // proceed with $.ajax, implement delay
              if(_oOpt.delay) { window.setTimeout(done,_oOpt.delay); }
              else { done(); }
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

