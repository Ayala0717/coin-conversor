"use client"

import { useState } from "react"

export default function Home() {
  const [amount, setAmount] = useState(1) // Monto a convertir
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number>(0)
  const [currencies, setCurrencies] = useState<string[]>([
    "USD",
    "EUR",
    "JPY",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "DKK",
    "HKD",
    "INR",
    "NZD",
    "RUB",
    "SGD",
    "TRY",
    "ZAR"
  ])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Conversor de Monedas</h1>

      <div className="flex flex-col gap-4 items-center">
        <input type="number" className="p-2 border rounded" placeholder="Monto" />

        <div className="flex gap-2">
          <select className="p-2 border rounded">
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <span className="self-center">➡️</span>

          <select className="p-2 border rounded" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Convertir</button>

        {
          <p className="text-lg font-semibold">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        }
      </div>
    </div>
  )
}
