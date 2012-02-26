/**
 * @projectDescription
 *
 * Spec for:
 *  jQuery.ajaxMock - https://github.com/martinkr/jquery.ajaxmock
 *
 * Copyright (c) 2011 Martin Krause (jquery.public.mkrause.info)
 * Dual licensed under the MIT and GPL licenses.
 *
 * @author Martin Krause public@mkrause.info
 * @copyright Martin Krause (jquery.public.mkrause.info)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @license GNU http://www.gnu.org/licenses/gpl-3.0.html
 *
 * @requires
 *  jQuery JavaScript Library - http://jquery.com/
 *    Copyright 2010, John Resig
 *    Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license
 *
 *  Jasmine A JavaScript Testing Framework - https://github.com/pivotal/jasmine
 *    Copyright (c) 2008-2011 Pivotal Labs
 *    Licensed under the MIT license - https://github.com/pivotal/jasmine/MIT.LICENSE
 */


describe('jQuery.ajaxMock ', function() {

  beforeEach(function() {

      _oItemFoo = {
        sUrl:'item/foo',
        responseText:'responseFoo',
        statusCode:200,
        status:'OK'
      };

      _oItemBar = {
        sUrl:'item/bar',
        responseText:'responseBar',
        statusCode:200,
        status:'OK'
      };

  });

  afterEach(function() {
    $.ajaxMock.flush();
  });

  /**
   * Interface
   */

  it('should expose a method called "register" ',function () {
      expect(typeof $.ajaxMock.register).toBe('function');
  });

  it('should expose a method called "isRegistered" ',function () {
      expect(typeof $.ajaxMock.isRegistered).toBe('function');
  });

  it('should expose a method called "getObject" ',function () {
      expect(typeof $.ajaxMock.getObject).toBe('function');
  });

  it('should expose a method called "flush" ',function () {
      expect(typeof $.ajaxMock.flush).toBe('function');
  });

  it('should expose a method called "last" ',function () {
      expect(typeof $.ajaxMock.last).toBe('function');
  });

  it('should expose a method called "initialize" ',function () {
      expect(typeof $.ajaxMock.initialize).toBe('function');
  });

  /**
   * Register
   */
  it('should provide .register() to register a mock object ',function () {

      jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
      $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeTruthy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeTruthy();

  });

  /**
   * isRegistered
   */

  it('should provide .isRegistered() to see if a specific mock object is registered',function () {

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

      jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
      $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeTruthy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeTruthy();

      expect( $.ajaxMock.isRegistered('null') ).toBeFalsy();

  });

  /**
   * getObject
   */

  it('should provide .getObject() to get a specific mock object',function () {

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

      jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
      $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);

      expect( typeof( $.ajaxMock.getObject(_oItemFoo.sUrl) ) ).toBe('object');
      expect( typeof( $.ajaxMock.getObject(_oItemBar.sUrl) ) ).toBe('object');

      expect( $.ajaxMock.getObject(_oItemFoo.sUrl).sUrl ).toBe(_oItemFoo.sUrl);
      expect( $.ajaxMock.getObject(_oItemBar.sUrl).sUrl ).toBe(_oItemBar.sUrl);

      expect( $.ajaxMock.getObject(_oItemFoo.sUrl).responseText ).toBe(_oItemFoo.responseText);
      expect( $.ajaxMock.getObject(_oItemBar.sUrl).responseText ).toBe(_oItemBar.responseText);

  });

  /**
   * flush
   */

  it('should provide .flush() to flush all mock object',function () {

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

      jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
      $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);

      expect( typeof( $.ajaxMock.getObject(_oItemFoo.sUrl) ) ).toBe('object');
      expect( typeof( $.ajaxMock.getObject(_oItemBar.sUrl) ) ).toBe('object');

      jQuery.ajaxMock.flush();

      expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
      expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

  });

  /**
   * Mock call
   */
   it('should mock xhr-requests to registered urls',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

        jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
        $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);
      });

      waits(500);

      // mocked _oItemFoo
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemFoo.sUrl,success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemFoo.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemFoo.sUrl);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

      waits(500);

      // mocked _oItemBar
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemBar.sUrl,complete:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        // complete: different args
        expect(_fnSpy.argsForCall[0][0].responseText).toBe(_oItemBar.responseText);
        expect(_fnSpy.argsForCall[0][0].status).toBe(_oItemBar.statusCode);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemBar.sUrl);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

      waits(500);

       // non-mocked
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:'/',complete:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        // complete: different args
        expect(_fnSpy.argsForCall[0][0].responseText.indexOf('DOCTYPE')).not.toBe(-1);
        // called "/", last mocked call is still _oItemBar.sUrl
        expect( _fnSpy.mostRecentCall.object.url).toBe('/');
        expect(jQuery.ajaxMock.last().url).toBe(_oItemBar.sUrl);
      });

  });

  /**
   * last
   */
  it('should provide last() to return the last used mocked object ',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemFoo.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemBar.sUrl) ).toBeFalsy();

        jQuery.ajaxMock.register(_oItemFoo.sUrl,_oItemFoo);
        $.ajaxMock.register(_oItemBar.sUrl,_oItemBar);

       // mocked _oItemFoo
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemFoo.sUrl,success:_fnSpy});
        // mocked _oItemBar
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemBar.sUrl,success:_fnSpy});
      });

      waits(500);

      runs(function() {
        // successfully mocked
        expect(_fnSpy).toHaveBeenCalled();
        expect(jQuery.ajaxMock.last().url).toBe(_oItemBar.sUrl);

        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
        expect(jQuery.ajaxMock.last().url).toBe(_oItemBar.sUrl);
        expect(jQuery.ajaxMock.last().responseText).toBe(_oItemBar.responseText);
        expect(jQuery.ajaxMock.last().statusCode).toBe(_oItemBar.statusCode);
      });

  });

});
