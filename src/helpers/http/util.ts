import { HoppRESTRequest } from '../../components/http/data/rest';
import { SaveInterfaceReq } from '../../services/FileSystem.type';
export function convertSaveRequestData(
  workspaceId: string,
  id: string,
  request: HoppRESTRequest,
): SaveInterfaceReq {
  return {
    id,
    body: request.body,
    headers: request.headers,
    workspaceId,
    params: request.params,
    preRequestScripts: [
      {
        disabled: false,
        icon: null,
        label: 'CustomScript',
        type: '0',
        value: request.preRequestScript,
      },
    ],
    testScripts: [
      {
        disabled: false,
        icon: null,
        label: 'CustomScript',
        type: '0',
        value: request.testScript,
      },
    ],
    address: {
      method: request.method,
      endpoint: request.endpoint,
    },
    testAddress: {
      method: request.compareMethod,
      endpoint: request.compareEndpoint,
    },
    description: request.description,
    inherited: request.inherited,
  };
}

// 转换成展示的数据
export function convertShowRequestData(data): HoppRESTRequest {
  const { address, body, params, headers, testScripts, preRequestScripts } = data;
  return {
    endpoint: address?.endpoint || '',
    method: address?.method || 'GET',
    body: body || { body: '', contentType: 'application/json' },
    params: params || [],
    headers: headers || [],
    testScript: (testScripts || []).length > 0 ? testScripts[0].value : '',
    preRequestScript: (preRequestScripts || []).length > 0 ? preRequestScripts[0].value : '',
  };
}
