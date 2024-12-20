"use client"
import { BoxAlertWarning } from "@/components/box/alerts"
import { BoxSelect } from "@/components/box/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EXCHANGE_RATE_API_URL } from "@/constans"
import { useOnlineStatus } from "@/hooks/onlineStatus"
import { getRates, setRates } from "@/store"
import { isEmptyArray } from "@/utils/arrays"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [amount, setAmount] = useState(1) // Monto a convertir
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState<number | null>(null)
  const [currencies, setCurrencies] = useState<string[]>([])
  const currentAmmount = useRef(0)

  const isOnline = useOnlineStatus()

  useEffect(() => {
    // Carga inicial de monedas disponibles
    fetch(`${EXCHANGE_RATE_API_URL}/USD`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates))
        setRates(data)
      })
      .catch((error) => console.error("Error fetching currencies:", error))
  }, [])

  const handleConvert = () => {
    // Llamada a la API para convertir
    if (isOnline) {
      fetch(`${EXCHANGE_RATE_API_URL}${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          const rate = data.rates[toCurrency]
          setResult(rate * amount)
        })
        .catch((error) => console.error("Error fetching conversion rate:", error))
    } else {
      const rates = JSON.parse(getRates())
      setResult(rates.rates[toCurrency] * amount)
    }

    currentAmmount.current = amount
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
        {!isOnline && <BoxAlertWarning title="Sin conexión" description="No se puede conectar a internet" wrapperClasses="absolute top-1 md:w-96" />}
        <h1 className="text-2xl font-bold mb-4">Conversor de Monedas</h1>

        <div className="flex flex-col gap-4 items-center">
          <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Monto" />

          <div className="flex gap-2">
            <BoxSelect
              placeholder="Selecciona una moneda"
              selectedOption={fromCurrency}
              options={currencies}
              disabled={isEmptyArray(currencies)}
              handleValueChange={(value) => setFromCurrency(value)}
            />

            <span className="self-center">➡️</span>

            <BoxSelect
              placeholder="Selecciona una moneda"
              selectedOption={toCurrency}
              options={currencies}
              disabled={isEmptyArray(currencies)}
              handleValueChange={(value) => setToCurrency(value)}
            />
          </div>

          <Button onClick={handleConvert}>Convertir</Button>

          {result !== null && (
            <p className="text-lg font-semibold">
              {currentAmmount.current} {fromCurrency} = {result.toFixed(2)} {toCurrency}
            </p>
          )}
        </div>
      </div>
    </>
  )
}
