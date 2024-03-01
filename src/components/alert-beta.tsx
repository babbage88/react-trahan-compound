import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function BetaNotice() {
  return (
    
    <Alert className="h-20 w-65 justify-between flex flex-col">
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription className="text-nowrap">
        This is a side project, I'm a Devops Engineer by day an created this to learn react.
      </AlertDescription>
    </Alert>
  )
}
