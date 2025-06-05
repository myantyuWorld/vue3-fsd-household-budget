import { z } from 'zod'

export const schema = z.object({
  tag: z.number({ required_error: '必ず選択してね' }),
})

export type AnalyzeSchema = z.infer<typeof schema>
