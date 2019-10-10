let http = require("http");
let fs = require("fs");
let url = require("url");

http
  .createServer(function(request, response) {
    if (url.parse(request.url).pathname === "/fact") {
      var url_parts = url.parse(request.url, true);
      var query = url_parts.query;
      var k = query["k"];

      if (k.toString() == "x") {
        fs.readFile("./fact.html", (err, data) => {
          response.end(data);
        });
      } else {
        if (isNaN(k) == false) {
          if (k < 0) response.end("Result: NaN");
          else response.end("Result = " + factorial(k));
        } else response.end("Result: wrong parameter!");
      }
    } else if (url.parse(request.url).pathname === "/fact_nt") {
      var url_parts = url.parse(request.url, true);
      var query = url_parts.query;
      var k = query["k"];

      if (k.toString() == "x") {
        let res = "";
        for (i = 1; i <= 20; i++) {
          fact_cb(i, function(iter, result) {
            res +=
              "Result: " +
              "-" +
              iter.toString() +
              "/" +
              result.toString() +
              "\n";
            setImmediate(() => {
              if (iter == 20) response.end(res);
            });
          });
        }
      } else {
        if (isNaN(k) == false) {
          if (k < 0) response.end("Result: NaN");
          else response.end("Result = " + factorial(k));
        } else response.end("Result: invalid parameter!");
      }
    }
  })
  .listen(3000);

let chunk = null;
let state = "norm";

process.stdin.setEncoding("utf-8");
process.stdin.on("readable", () => {
  while ((chunk = process.stdin.read()) != null) {
    if (chunk.trim() == "exit") {
      process.exit(0);
    } else if (chunk.trim() == "norm") {
      state = "norm";
    } else if (chunk.trim() == "test") {
      state = "test";
    } else if (chunk.trim() == "idel") {
      state = "idel";
    }
    process.stdout.write(state + " -> ");
  }
});

function factorial(i) {
  return i != 1 ? i * factorial(i - 1) : 1;
}

function fact_cb(i, cb) {
  process.nextTick(function() {
    cb(i, factorial(i));
  });
}
