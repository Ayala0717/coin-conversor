import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Props {
  selectedOption?: string
  options: string[]
  placeholder?: string
  handleValueChange?: (value: string) => void
}

function BoxSelect(props: Props) {
  return (
    <Select defaultValue={props.selectedOption} onValueChange={props.handleValueChange}>
      <SelectTrigger>
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
