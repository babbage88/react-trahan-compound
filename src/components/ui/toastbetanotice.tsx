import { useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function BetaToast() {
  const { toast } = useToast()

  useEffect(() => {
    // Trigger the toast automatically when the component mounts
    toast({
      title: "Just FYI",
      description: "This is a side project, I'm a Devops Engineer by day this  frontend. I'm hoping to expand capability as I learn. I wasn't a fan of the other compound interest calculatlrss on Google, so started building this.",
      action: (
        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
      ),
    })
  }, [toast]) // Ensure toast function is available before triggering

  return null; // You can return null or any other element you prefer, as the toast will be shown automatically
}

