/// Copyright (c) 2012 Ecma International.  All rights reserved. 
/// Ecma International makes this code available under the terms and conditions set
/// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the 
/// "Use Terms").   Any redistribution of this code must retain the above 
/// copyright and this notice and otherwise comply with the Use Terms.
/**
 * @path ch07/7.6/7.6.1/7.6.1.2/7.6.1-25-s.js
 * @description 7.6 - SyntaxError expected: reserved words used as Identifier Names in UTF8: \u0073\u0074\u0061\u0074\u0069\u0063 (static)
 * @onlyStrict
 */




function testcase() {
        "use strict";

        try {
            eval("var \u0073\u0074\u0061\u0074\u0069\u0063 = 123;");
            return false;
        } catch (e) {
            return e instanceof SyntaxError;
        }
}
runTestCase(testcase);