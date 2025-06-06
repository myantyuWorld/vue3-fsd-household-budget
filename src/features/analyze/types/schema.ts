import { z } from 'zod'

export const analyzeSchema = z.object({
  tag: z.number({ required_error: '必ず選択してね' }),
})

export type AnalyzeSchema = z.infer<typeof analyzeSchema>
