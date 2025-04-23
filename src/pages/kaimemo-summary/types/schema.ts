import { z } from 'zod'

export const schema = z.object({
  date: z
    .string({ required_error: '必ず選択してね' })
    .default(new Date().toISOString().split('T')[0]),
  tag: z.number({ required_error: '必ず選択してね' }),
  amount: z.number({ required_error: '必ず入力してね' }),
  memo: z.string().optional(),
})

export type KaimemoSummarySchema = z.infer<typeof schema>
