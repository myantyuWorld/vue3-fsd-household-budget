import { z } from "zod"

export const categoryLimitSchema = z.object({
    name: z.string({ required_error: '必ず入力してね' }),
    limitAmount: z.number({ required_error: '必ず入力してね' }).min(5000, { message: '5000円以上入力してね' }),
})

export const householdBookSchema = z.object({
    title: z.string({ required_error: '必ず入力してね' }),
    description: z.string({ required_error: '必ず入力してね' }),
})

export type HouseholdBookSchema = z.infer<typeof householdBookSchema>
export type CategoryLimitSchema = z.infer<typeof categoryLimitSchema>