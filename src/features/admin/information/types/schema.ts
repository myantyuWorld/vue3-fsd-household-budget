import { z } from 'zod'

export const createInformationSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  content: z.string().min(1, { message: '内容は必須です' }),
  category: z.enum(['bug_report', 'feature_request', 'other'])
})

export type CreateInformationSchema = z.infer<typeof createInformationSchema>
