import type { components } from '@/shared/api/v1'

export const createCalenderItem = (
  item: components['schemas']['KaimemoAmount']
) => {
  if (item.amount >= 4000) {
    return {
      key: item.id,
      dot: true,
      dates: [new Date(item.date)],
      popover: {
        label: `${item.tag} / ${item.amount}円`
      }
    }
  }
  return {}
}
