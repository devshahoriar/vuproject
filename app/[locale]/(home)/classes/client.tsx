'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


type SelectExType = {
  id: number
  title: string
  _count: {
    Class: number
  }
}[]

export const SelectExType = ({ classCat }: { classCat: SelectExType }) => {
  const [selected, setSelected] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('category', term)
    } else {
      params.delete('category')
    }
    setSelected(term)
    replace(`${pathname}?${params.toString()}`)
  }
  useEffect(() => {
    const query = searchParams.get('category')
    setSelected(query)
  }, [searchParams])
  return (
    <div className="flex items-center justify-between gap-2">
      <Select
        onValueChange={(value) => handleSearch(value)}
        value={selected ? selected : undefined}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          {classCat.map((category) => (
            <SelectItem key={category.id} value={category.title.toLowerCase()}>
              {category.title} ({category._count.Class})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {
        selected && (
          <Button variant="outline" onClick={() => handleSearch('')}>
            <X />
          </Button>
        )
      }
    </div>
  )
}

export const SearchBox = () => {
  const [term, setTerm] = useState('')
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    const query = searchParams.get('q')
    setTerm(query || '')
  }, [searchParams])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center justify-between gap-2">
      <Input 
        type="text" 
        placeholder="Search classes..." 
        className="w-full"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Button type="submit" variant="outline">
        <Search />
      </Button>
    </form>
  )
}
