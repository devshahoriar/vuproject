'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, Youtube, AlertTriangle, ChevronRight } from 'lucide-react'
import EquipmentInstructionView from '@/components/shared/EquipmentInstructionView'

interface Equipment {
  id: number
  name: string
  desc: string
  active: boolean
  instructions: Array<{
    id: number
    title: string
    description: string
    youtubeUrl?: string | null
    safetyNotes?: string | null
    createdAt: Date
    instructor: {
      name: string
    }
  }>
  _count: {
    instructions: number
  }
}

interface EquipmentInstructionsClientProps {
  equipmentData: Equipment[]
}

export default function EquipmentInstructionsClient({ equipmentData }: EquipmentInstructionsClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

  const filteredEquipment = equipmentData.filter(equipment =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    equipment.desc?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const equipmentWithInstructions = filteredEquipment.filter(equipment => 
    equipment._count.instructions > 0
  )

  if (selectedEquipment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedEquipment(null)}
            className="p-0 h-auto hover:bg-transparent"
          >
            Equipment Instructions
          </Button>
          <ChevronRight className="h-4 w-4" />
          <span>{selectedEquipment.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{selectedEquipment.name}</h1>
            <p className="text-muted-foreground">
              {selectedEquipment.desc || "Learn how to use this equipment safely and effectively"}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedEquipment(null)}
          >
            Back to All Equipment
          </Button>
        </div>

        <EquipmentInstructionView 
          instructions={selectedEquipment.instructions} 
          equipmentName={selectedEquipment.name}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Equipment Usage Instructions</h1>
          <p className="text-muted-foreground">
            Learn how to use gym equipment safely and effectively
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {equipmentWithInstructions.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Instructions Available</h3>
            <p className="text-muted-foreground text-center">
              {searchTerm 
                ? `No equipment found matching "${searchTerm}" with instructions.`
                : "There are no equipment usage instructions available yet."
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {equipmentWithInstructions.map((equipment) => (
            <Card key={equipment.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{equipment.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {equipment.desc || "Equipment usage instructions"}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {equipment._count.instructions} {equipment._count.instructions === 1 ? 'guide' : 'guides'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>{equipment._count.instructions} instruction{equipment._count.instructions === 1 ? '' : 's'}</span>
                  </div>
                  
                  {equipment.instructions.some(inst => inst.youtubeUrl) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Youtube className="h-4 w-4 text-red-500" />
                      <span>Video tutorials available</span>
                    </div>
                  )}
                  
                  {equipment.instructions.some(inst => inst.safetyNotes) && (
                    <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Safety notes included</span>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full mt-4" 
                    onClick={() => setSelectedEquipment(equipment)}
                  >
                    View Instructions
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
