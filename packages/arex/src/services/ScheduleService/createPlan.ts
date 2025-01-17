import axios from 'axios';

export type CreatePlanReq = {
  appId: string;
  sourceEnv: string | null;
  targetEnv: string | null;
  operator: string;
  replayPlanType: number;
  planName?: string;
  caseSourceType?: number;
  caseSourceFrom: number;
  caseSourceTo: number;
  operationCaseInfoList?: { operationId: string; replayIdList?: string[] }[];
};

export type CreatePlanRes = {
  desc: string;
  result: number;
};

export function createPlan(params: CreatePlanReq) {
  return new Promise<CreatePlanRes>((resolve, reject) => {
    return axios
      .post<CreatePlanRes>('/schedule/createPlan', params)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
