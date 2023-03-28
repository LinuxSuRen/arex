import sdk from 'postman-collection';
import runtime from 'postman-runtime';

export function proxy(req, expressRes) {
  const hopReq = req.body;
  var runner = new runtime.Runner();
  var rawCollection = {
    info: {
      _postman_id: '7b650e98-a5d2-4925-b23c-a4fb33a14832',
      name: 'test',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
      _exporter_id: '14623557',
    },
    item: [
      {
        name: hopReq.name,
        event: [
          {
            listen: 'prerequest',
            script: {
              exec: [hopReq.preRequestScript],
              type: 'text/javascript',
            },
          },
          {
            listen: 'test',
            script: {
              exec: [hopReq.testScript],
              type: 'text/javascript',
            },
          },
        ],
        request: {
          method: hopReq.method,
          header: hopReq.headers,
          body: {
            mode: 'raw',
            raw: hopReq.body.body,
            options: {
              raw: {
                language: 'json',
              },
            },
          },
          url: sdk.Url.parse(hopReq.endpoint),
        },
        response: [],
      },
    ],
  };
  var collection = new sdk.Collection(rawCollection);
  let assertionsBox = [];
  let res = {};
  runner.run(collection, {}, function (err, run) {
    run.start({
      assertion: function (cursor, assertions) {
        // console.log(assertions,'assertions')
        assertionsBox = [...assertionsBox, ...assertions];
        // cursor = {
        //     position: Number,
        //     iteration: Number,
        //     length: Number,
        //     cycles: Number,
        //     eof: Boolean,
        //     empty: Boolean,
        //     bof: Boolean,
        //     cr: Boolean,
        //     ref: String,
        //     scriptId: String,
        //     eventId: String
        // }

        // assertions: array of assertion objects
        // assertion: {
        //     error: Error,
        //     index: Number,
        //     name: String,
        //     skipped: Number,
        //     passed: Number
        // }
      },
      console: function (cursor, level, ...logs) {
        // console.log(logs,'1')
      },
      prerequest: function (err, cursor, results, item) {
        // err, cursor: Same as arguments for "start"
        // item: sdk.Item
        // results: Array of objects. Each object looks like this:
        //  {
        //      error: Error,
        //      event: sdk.Event,
        //      script: sdk.Script,
        //      result: {
        //          target: 'prerequest'
        //
        //          -- Updated environment
        //          environment: <VariableScope>
        //
        //          -- Updated globals
        //          globals: <VariableScope>
        //
        //          data: <Object of data variables>
        //          return: <Object, contains set next request params, etc>
        //      }
        //  }
      },
      responseData: function (cursor, data) {
        // console.log(cursor,data)
        // cursor - Same as arguments for "start"
        // data - Event buffer.
      },
      item: function (err, cursor, item, visualizer) {
        expressRes.send({
          response: res,
          assertionsBox,
        });
        // console.log('item',item.responses.toString())
        // err, cursor, item: Same as arguments for "beforeItem"

        // visualizer: null or object containing visualizer result that looks like this:
        //  {
        //      -- Tmeplate processing error
        //      error: <Error>
        //
        //      -- Data used for template processing
        //      data: <Object>
        //
        //      -- Processed template
        //      processedTemplate: <String>
        //  }
      },
      //调用一次，并对集合中的每个请求进行响应
      response: function (err, cursor, response, request, item, cookies, history) {
        res = {
          type: 'success',
          headers: Object.keys(response.headers).map((key) => ({
            key: key,
            value: String(response.headers[key]),
          })),
          statusCode: response.code,
          body: JSON.parse(response.stream.toString()),
          meta: {
            responseSize: response.responseSize, // in bytes
            responseDuration: response.responseTime, // in millis
          },
          request,
        };
        // const s = sdk.Response()
        // console.log(cursor,response.stream.toString())
        // expressRes.send({
        //     type:'success',
        //     headers: Object.keys(response.headers).map(key=>({key:key,value: String(response.headers[key])})),
        //     statusCode:response.code,
        //     body:JSON.parse(response.stream.toString()),
        //     meta: {
        //         responseSize: response.responseSize, // in bytes
        //         responseDuration: response.responseTime, // in millis
        //     }
        // })
      },
    });
  });
}
