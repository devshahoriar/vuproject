'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useChangeLocale, useCurrentLocale } from '@/locales/client'

export const ChangeLanguage = () => {
  const currentLng = useCurrentLocale()
  const chgLocal = useChangeLocale()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="uppercase">
          {currentLng}
          <span className="sr-only">{currentLng}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => chgLocal('en')}>EN</DropdownMenuItem>
        <DropdownMenuItem onClick={() => chgLocal('bn')}>BN</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
