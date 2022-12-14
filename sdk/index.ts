import { Evidence } from "./evidence";

export interface ConfigInterface {
  bearerToken: string;
  portfolioId: number;
  XCSRF: string,
}

export const configFiles: ConfigInterface = {
  XCSRF: "",
  portfolioId: 3,
  bearerToken: ""
}
export const createFetcher =
  (config: ConfigInterface) =>
    async (
      url: string,
      method: "GET" | "POST" | "DELETE",
      data: any = undefined
    ) => {
      const response = await fetch(`https://portfolio.drieam.app/api/v1/${url}`, {
        method,
        headers: {
          Authorization: `Bearer ${config.bearerToken}`,
          "Content-Type": "application/json",
        },
        body: data !== undefined ? JSON.stringify(data) : undefined,
      });

      return response.json();
    };

export const createClient = () => {
  return {
    evidence: Evidence(configFiles),
  };
};
