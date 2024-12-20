import type { RatesResponse } from "@/types"

export function getRates() {
  return localStorage.getItem("rates") || ""
}

export function setRates(rates: RatesResponse) {
  localStorage.setItem("rates", JSON.stringify(rates))
}

export function removeRates() {
  localStorage.removeItem("rates")
}
