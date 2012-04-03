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

      _oItemFooDelay = {
        sUrl:'item/foo/delay',
        responseText:'responseFooDelay',
        statusCode:200,
        status:'OK',
        delay: 1000
      };

      _oItemRESTGET = {
        sUrl:'item/REST/GET',
        type: 'GET',
        responseText:'responseRESTGET',
        statusCode:200,
        status:'OK'
      };

      _oItemRESTPOST = {
        sUrl:'item/REST/POST',
        type: 'POST',
        responseText:'responseRESTPOST',
        statusCode:200,
        status:'OK'
      };

       _oItemRESTPUT = {
        sUrl:'item/REST/PUT',
        type: 'PUT',
        responseText:'responseRESTPUT',
        statusCode:200,
        status:'OK'
      };

      _oItemRESTDELETE = {
        sUrl:'item/REST/DELETE',
        type: 'DELETE',
        responseText:'responseRESTDELETE',
        statusCode:200,
        status:'OK'
      };

       _oItemRESTAPIONE = {
        sUrl:'item/REST/API',
        type: 'ONE',
        responseText:'responseRESTAPIONE',
        statusCode:200,
        status:'OK'
      };

      _oItemRESTAPITWO = {
        sUrl:'item/REST/API',
        type: 'TWO',
        responseText:'responseRESTAPITWO',
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
   * Mock call
   */
   it('should mock xhr-requests to registered urls using a different HTTP request methods (GET,POST,PUT,DELETE)',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemRESTGET.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemRESTPOST.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemRESTPUT.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemRESTDELETE.sUrl) ).toBeFalsy();


        jQuery.ajaxMock.register(_oItemRESTGET.sUrl,_oItemRESTGET);
        jQuery.ajaxMock.register(_oItemRESTPOST.sUrl,_oItemRESTPOST);
        jQuery.ajaxMock.register(_oItemRESTPUT.sUrl,_oItemRESTPUT);
        jQuery.ajaxMock.register(_oItemRESTDELETE.sUrl,_oItemRESTDELETE);

      });

      waits(500);

      // mocked _oItemRESTGET
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTGET.sUrl,type: _oItemRESTGET.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTGET.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTGET.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTGET.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });


      // mocked _oItemRESTPOST
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTPOST.sUrl,type: _oItemRESTPOST.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTPOST.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTPOST.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTPOST.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });
      // mocked _oItemRESTPUT
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTPUT.sUrl,type: _oItemRESTPUT.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTPUT.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTPUT.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTPUT.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

       // mocked _oItemRESTDELETE
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTDELETE.sUrl,type: _oItemRESTDELETE.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTDELETE.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTDELETE.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTDELETE.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

  });

   it('should mock xhr-requests to registered urls using the registered http request method and skip if the method is not registered',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemRESTGET.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemRESTPOST.sUrl) ).toBeFalsy();

        jQuery.ajaxMock.register(_oItemRESTGET.sUrl,_oItemRESTGET);
        jQuery.ajaxMock.register(_oItemRESTPOST.sUrl,_oItemRESTPOST);
      });

      waits(500);

      // mocked _oItemRESTGET
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTGET.sUrl,type: _oItemRESTGET.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTGET.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTGET.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTGET.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });


      // mocked _oItemRESTPOST
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTPOST.sUrl,type: _oItemRESTPOST.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTPOST.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTPOST.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTPOST.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

      // mocked _oItemRESTGET with different method: ain't registered fail!
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTGET.sUrl,type: "MOCK" , error:_fnSpy});
      });

       waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).not.toBe(_oItemRESTGET.responseText);
        expect(_fnSpy.argsForCall[0][1]).not.toBe("success");
        expect(jQuery.ajaxMock.last().url).not.toBe(_oItemRESTGET.sUrl);
        expect(jQuery.ajaxMock.last().type).not.toBe(_oItemRESTGET.type);
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTPOST.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTPOST.type);
        expect( _fnSpy.mostRecentCall.object.url).not.toBe(jQuery.ajaxMock.last().url);
      });

  });


  it('should mock xhr-requests to one urls using different http request methods',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemRESTAPIONE.sUrl) ).toBeFalsy();
        expect( $.ajaxMock.isRegistered(_oItemRESTAPITWO.sUrl) ).toBeFalsy();
        jQuery.ajaxMock.register(_oItemRESTAPIONE.sUrl,_oItemRESTAPIONE);
        jQuery.ajaxMock.register(_oItemRESTAPITWO.sUrl,_oItemRESTAPITWO);
      });

    // mocked _oItemRESTAPI, method 'ONE'
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTAPIONE.sUrl,type: _oItemRESTAPIONE.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTAPIONE.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTAPIONE.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTAPIONE.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });

      // mocked _oItemRESTAPI, method 'TWO'
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemRESTAPITWO.sUrl,type: _oItemRESTAPITWO.type, success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemRESTAPITWO.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemRESTAPITWO.sUrl);
        expect(jQuery.ajaxMock.last().type).toBe(_oItemRESTAPITWO.type);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
      });


  });

 /**
   * Mock call
   */
   it('should delay a mock xhr-requests',function () {

      var _fnSpy ;

      runs(function() {
        expect( $.ajaxMock.isRegistered(_oItemFooDelay.sUrl) ).toBeFalsy();
        jQuery.ajaxMock.register(_oItemFooDelay.sUrl,_oItemFooDelay);
      });

      waits(500);

      // mocked _oItemFooDelay
      runs(function() {
        _fnSpy= jasmine.createSpy('callback');
        $.ajax({url:_oItemFooDelay.sUrl,success:_fnSpy});
      });

      waits(500);

      runs(function() {
        expect(_fnSpy).not.toHaveBeenCalled();
        expect(jQuery.ajaxMock.last().url).not.toBe(_oItemFooDelay.sUrl);
      });

      waits(1000);

      runs(function() {
        expect(_fnSpy).toHaveBeenCalled();
        expect(_fnSpy.argsForCall[0][0]).toBe(_oItemFooDelay.responseText);
        expect(_fnSpy.argsForCall[0][1]).toBe("success");
        expect(jQuery.ajaxMock.last().url).toBe(_oItemFooDelay.sUrl);
        expect( _fnSpy.mostRecentCall.object.url).toBe(jQuery.ajaxMock.last().url);
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
        expect( $.ajaxMock.last().url ).toBe(undefined);

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
        expect(jQuery.ajaxMock.last().type).toBe(_oItemBar.type);
        expect(jQuery.ajaxMock.last().responseText).toBe(_oItemBar.responseText);
        expect(jQuery.ajaxMock.last().statusCode).toBe(_oItemBar.statusCode);
      });

  });

});
