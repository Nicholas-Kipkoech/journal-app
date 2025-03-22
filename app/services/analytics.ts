import { PrivateAxiosUtility } from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAnalytics(period = "30d"): Promise<any> {
  const res = await PrivateAxiosUtility.post("/analytics", { period });
  return res.data;
}
