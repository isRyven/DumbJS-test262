if (typeof require !== 'undefined') {
  var fs = require('fs');
  var vm = require('vm');
  var fetchFile = function(path) {
      return fs.readFileSync(path, { encoding: 'utf8' });
  };
  var evalScriptContext = function() {
    var context = {};
    vm.createContext(context);
    for (var i = 0; i < arguments.length; i++) {
      vm.runInContext(arguments[i], context);
    }
  }
  var exit = process.exit;
} else {
  var fetchFile = __getFile;
  var evalScriptContext = __evalScriptContext;
  var exit = __exit;
}

function startTesting(testCasePaths) {
  var start = Date.now();
	var testCasePathsLen = testCasePaths.length;
  var totalPass = 0;
  var totalFail = 0;
  var scriptHelpers = fetchFile(getDirpath(scriptPath) + "/test-helpers.js");

  for (var i = 0; i < testCasePathsLen; i++) {
		var testCasePath = testCasePaths[i];
    if (!testCasePath) continue;
		var script = fetchFile(getDirpath(scriptPath) + "/" + testCasePath);
		var description = script.match(/@description[:]*\s+(.+)/);
    var isNegative = script.match(/@negative/);
		try {
      console.log(' > ' + description[1]);
      evalScriptContext(scriptHelpers, script);
      totalPass++;
		}
		catch (e) {
      if (isNegative) {
        totalPass++;
      } else {
        console.log('       ' + '[FAIL] ' + description[1]); 
        console.log('       ' + testCasePath);
        if (e) {
          console.log('       ' + e.message); 
        } else {
          console.log('       <no error specified>');
        }
        totalFail++;
      }
		}
	}

  console.log('--------------------');
  console.log('time: ' + ((Date.now() - start) / 1000) + "s");
  console.log('pass: ' + totalPass);
  console.log('fail: ' + totalFail);

  if (totalFail > 0) {
    exit(1);
  }

  console.log('success');
}

if (typeof process !== 'undefined') {
  var scriptPath = process.argv[1];
} else {
  var scriptPath = scriptArgs[0];
}

if (!scriptPath) {
  exit(1);
}

var testCasePaths = JSON.parse(fetchFile(getDirpath(scriptPath) + "/" + "test-cases.json"));
var testCasePathsRejected = JSON.parse(fetchFile(getDirpath(scriptPath) + "/" + "test-rejected.json"));

startTesting(filterTestCasePaths(testCasePaths, testCasePathsRejected));

function getDirpath(path) {
  var splits = path.split(/[/\\]/);
  var lastSegment = splits[splits.length - 1];
  if (/\.\w+$/.test(lastSegment)) {
    splits.pop();
  }
  return splits.join("/");
}

function filterTestCasePaths(fullList, rejectedList) {
  return fullList.filter(function(item) {
    return rejectedList.indexOf(item) === -1;
  });
}
