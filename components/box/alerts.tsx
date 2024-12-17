import { AlertCircle, AlertOctagon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

interface Props {
  title?: string
  description?: string
  wrapperClasses?: string
}

function BoxAlertBase(props: Props) {
  return (
    <Alert variant="default" className={props.wrapperClasses}>
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.description && <AlertDescription>{props.description}</AlertDescription>}
    </Alert>
  )
}

function BoxAlertWarning(props: Props) {
  return (
    <Alert variant="warning" className={props.wrapperClasses}>
      <AlertOctagon className="w-4 h-4" />
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.description && <AlertDescription>{props.description}</AlertDescription>}
    </Alert>
  )
}

function BoxAlertDestructive(props: Props) {
  return (
    <Alert variant="destructive" className={props.wrapperClasses}>
      <AlertCircle className="w-4 h-4" />
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {props.description && <AlertDescription>{props.description}</AlertDescription>}
    </Alert>
  )
}

export { BoxAlertBase, BoxAlertWarning, BoxAlertDestructive }
