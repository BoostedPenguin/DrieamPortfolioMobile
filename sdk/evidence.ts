import { z } from "zod";
import { ConfigInterface, createFetcher } from ".";

export const EvidenceSchema = z.object({
  id: z.number(),
  portfolio_id: z.number(),
  evidence_type: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

interface CreateEvidenceDataInterface {
  name: string;
  description: string;
  evidence_type: "free_text";
  free_text: string;
}

export const Evidence = (config: ConfigInterface) => {
  const fetcher = createFetcher(config);

  return {
    async getAll(): Promise<z.infer<typeof EvidenceSchema>[]> {
      const response = await fetcher(
        `portfolios/${config.portfolioId}/evidence`,
        "GET"
      );

      return response.map((evidence: any) => EvidenceSchema.parse(evidence));
    },
    async get(evidenceId: number): Promise<z.infer<typeof EvidenceSchema>> {
      const response = await fetcher(`evidence/${evidenceId}`, "GET");

      return EvidenceSchema.parse(response);
    },
    async create(
      data: CreateEvidenceDataInterface
    ): Promise<z.infer<typeof EvidenceSchema>> {
      const response = await fetcher(
        `portfolios/${config.portfolioId}/evidence`,
        "POST",
        data
      );

      return EvidenceSchema.parse(response);
    },
    async delete(evidenceId: number): Promise<void> {
      await fetcher(`evidence/${evidenceId}`, "DELETE");
    },
  };
};
