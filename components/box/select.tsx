import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
  selectedOption?: string
  options: string[]
  placeholder?: string
  disabled?: boolean
  handleValueChange?: (value: string) => void
}

function BoxSelect(props: Props) {
  return (
    <Select defaultValue={props.selectedOption} onValueChange={props.handleValueChange} disabled={props.disabled}>
      <SelectTrigger className="w-[80px]">
        <SelectValue placeholder={props.placeholder || "Selecciona una opción"} />
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export { BoxSelect }
