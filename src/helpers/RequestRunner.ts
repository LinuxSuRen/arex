import axios from 'axios';

import { HoppRESTRequest } from '../components/arex-request/data/rest';
import { HoppRESTResponse } from '../components/arex-request/helpers/types/HoppRESTResponse';
import { HoppTestResult } from '../components/arex-request/helpers/types/HoppTestResult';
import AgentAxios from './request';

export const runRESTRequest = async ({
  request,
}: {
  request: HoppRESTRequest;
}): Promise<{ response: HoppRESTResponse; testResult: HoppTestResult }> => {
  const response = await _runRESTRequest(request, 'EXTENSIONS_ENABLED');
  const testResult = await _runRESTRequestTest(request, response);
  console.log({
    response,
    testResult,
  });
  return {
    response,
    testResult,
  };
};

function _runRESTRequest(request: HoppRESTRequest, type: string): Promise<HoppRESTResponse> {
  if (type === 'EXTENSIONS_ENABLED') {
    const startTime = new Date().getTime();
    return AgentAxios({
      method: request.method,
      url: request.endpoint,
      headers: request.headers.reduce((p, c) => {
        return {
          ...p,
          [c.key]: c.value,
        };
      }, {}),
      // @ts-ignore
      data: ['GET'].includes(request.method) ? undefined : JSON.parse(request.body.body || '{}'),
      params: ['POST'].includes(request.method)
        ? undefined
        : request.params.reduce((p, c) => {
            return {
              ...p,
              [c.key]: c.value,
            };
          }, {}),
    }).then((res: any) => ({
      type: 'success',
      body: res.data,
      headers: res.headers,
      meta: {
        responseDuration: new Date().getTime() - startTime,
        responseSize: JSON.stringify(res.data).length,
      },
      statusCode: res.status,
    }));
  } else {
    return new Promise((resolve) => resolve({ type: 'loading' }));
  }
  // return {}
}

function _runRESTRequestTest(request: HoppRESTRequest, response: any): Promise<HoppTestResult> {
  const errTestResult = {
    description: '',
    expectResults: [],
    tests: [],
    envDiff: {
      global: {
        additions: [],
        deletions: [],
        updations: [],
      },
      selected: {
        additions: [],
        deletions: [],
        updations: [],
      },
    },
    scriptError: true,
  };

  return axios({
    method: 'POST',
    url: 'http://10.5.153.1:10001/preTest',
    data: {
      response: JSON.stringify({
        headers: response.headers,
        body: response.body,
        status: response.statusCode,
      }),
      preTestScripts: [request.testScript],
    },
  })
    .then((testRes) => {
      try {
        return testRes.data.body.caseResult;
      } catch (e) {
        return errTestResult;
      }
    })
    .catch(() => {
      return errTestResult;
    });
}