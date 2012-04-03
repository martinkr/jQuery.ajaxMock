<a name="README">[jQuery.ajaxMoc](https://github.com/martinkr/jQuery.ajaxMoc)</a>
=======
jQuery.ajaxMock is a tiny yet powerful mocking plugin for jQuery 1.5+
Just register a fake response  (the mock object) . All subsequent $.ajax calls to registered urls will be incercepted, and their're callbacks will recieve the faked response. Keep in mind that no real XHRrequests will be made.
## Example
<code>
    Register your mock object:
    // jQuery.ajaxMock.register( URL ,  {reponseText: "{String} Mocked responseText", statusCode: "{Number} Mocked status code", status: "{String} Mocked status description", type: "{String} http request method"}
    jQuery.ajaxMock.register('http://example.com', {
          responseText:'responseFoo',
          statusCode:200,
          status:'OK',
          type: 'POST', // optional, takes a String as http request method default: 'GET'
          delay: 1000 // optional
        }
   );
</code>
And all $.ajax-calls to 'http://example.com' will return the mocked response.

## Requires
* jQuery JavaScript Library 1.5+ - http://jquery.com/; Copyright 2010, John Resig; Dual licensed under the MIT or GPL Version 2 licenses - http://jquery.org/license

## License
Dual licensed under the MIT and GPL licenses.

* MIT - http://www.opensource.org/licenses/mit-license.php
* GNU - http://www.gnu.org/licenses/gpl-3.0.html

Copyright (c) 2010-2012 Martin Krause (jquery.public.mkrause.info)
