import { z } from 'zod'

export const schema = z.object({
  name: z.string({
    required_error: '必ず入力してね'
  }),
  tag: z.number({
    required_error: '必ず選択してね'
  })
})

export type KaimemoSchema = z.infer<typeof schema>
