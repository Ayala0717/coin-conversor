"use client"
import { EXCHANGE_RATE_API_URL } from "@/constans"
import { useState, useEffect } from "react"

export default function Home() {
  const [amount, setAmount] = useState(1) // Monto a convertir
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [currencies, setCurrencies] = useState<string[]>([])

  useEffect(() => {
    // Carga inicial de monedas disponibles
    fetch(`${EXCHANGE_RATE_API_URL}/USD`)
      .then((response) => response.json())
      .then((data) => setCurrencies(Object.keys(data.rates)))
      .catch((error) => console.error("Error fetching currencies:", error))
  }, [])

  const handleConvert = () => {
    // Llamada a la API para convertir
    fetch(`${EXCHANGE_RATE_API_URL}${fromCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[toCurrency]
        setResult(rate * amount)
      })
      .catch((error) => console.error("Error fetching conversion rate:", error))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Conversor de Monedas</h1>

      <div className="flex flex-col gap-4 items-center">
        <input type="number" className="p-2 border rounded" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Monto" />

        <div className="flex gap-2">
          <select className="p-2 border rounded" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
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

        <button onClick={handleConvert} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Convertir
        </button>

        {result !== null && (
          <p className="text-lg font-semibold">
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        )}
      </div>
    </div>
  )
}
