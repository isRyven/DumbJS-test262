// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype has the property "valueOf"
 *
 * @path ch15/15.9/15.9.5/S15.9.5_A08_T1.js
 * @description The Date.prototype has the property "valueOf"
 */

if(Date.prototype.hasOwnProperty("valueOf") !== true){
  $ERROR('#1: The Date.prototype has the property "valueOf"');
}


