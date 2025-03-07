import { Label } from '@ff/design-system/components/ui/label'
import { cn } from '@ff/design-system/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ff/design-system/components/ui/tooltip'

export default function NonRequiredLabel({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Label className={cn('font-heading font-bold w-fit', className)}>
          {children}
        </Label>
      </TooltipTrigger>
      <TooltipContent>
        {children} is not required. Add it if you like.
      </TooltipContent>
    </Tooltip>
  )
}
