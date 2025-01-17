import { request } from '@/utils';

export interface UpdateConfigTemplateReq {
  appId: string;
  configTemplate?: string;
}

export async function updateConfigTemplate(params: UpdateConfigTemplateReq) {
  const res = await request.post<boolean>('/report/config/yamlTemplate/pushConfigTemplate', params);
  return res.body;
}
