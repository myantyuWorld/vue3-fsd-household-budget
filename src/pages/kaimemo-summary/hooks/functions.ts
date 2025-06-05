import { GET } from '@/shared/api'
import type { components } from '@/shared/api/v1'

export const fetchShoppingRecords = async (
  operatingCurrentDate: Date,
  selectedHouseholdBook: components['schemas']['HouseholdBook'],
) => {
  const { data, error } = await GET('/household/{householdID}/shopping/record', {
    params: {
      path: { householdID: selectedHouseholdBook.id },
      query: {
        date: operatingCurrentDate.toISOString().split('T')[0],
      },
    },
  })

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export const changeDate = (
  operatingCurrentDate: Date,
  offset: number,
  unit: 'month' | 'week',
): Date => {
  const newDate = new Date(operatingCurrentDate)

  if (unit === 'month') {
    newDate.setMonth(newDate.getMonth() + offset, 1)
  } else {
    newDate.setDate(newDate.getDate() - newDate.getDay())
    newDate.setDate(newDate.getDate() + offset * 7)
  }

  if (offset > 0 && newDate > new Date()) {
    return operatingCurrentDate
  }
  return newDate
}
