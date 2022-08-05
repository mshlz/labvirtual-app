import { formatRelative, parseISO, format as fnsFormat } from "date-fns"
import { ptBR } from "date-fns/locale"

function parseDate(date: string | Date) {
  if (date instanceof Date) {
    return date
  } else if (typeof date === "string") {
    return parseISO(date)
  } else {
    throw new Error(`Cannot parse date "${date}"`)
  }
}

export function formatDate(date: string | Date, format: string = "dd/MM/yyyy") {
  return fnsFormat(parseDate(date), format, {
    locale: ptBR,
  })
}

export function relativeDate(date: string | Date, baseDate: Date = new Date()) {
  return formatRelative(parseDate(date), baseDate, {
    locale: ptBR,
  })
}
