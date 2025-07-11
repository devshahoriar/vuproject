'use client'

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Youtube } from 'lucide-react'

interface EquipmentInstructionViewProps {
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
  equipmentName: string
}

const EquipmentInstructionView = ({ instructions, equipmentName }: EquipmentInstructionViewProps) => {
  if (instructions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Instructions Available</h3>
          <p className="text-muted-foreground text-center">
            There are no usage instructions for {equipmentName} yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {instructions.map((instruction) => (
        <Card key={instruction.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{instruction.title}</CardTitle>
                <CardDescription>
                  By {instruction.instructor.name} • {new Date(instruction.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              {instruction.youtubeUrl && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Youtube className="h-3 w-3" />
                  Video
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {instruction.description}
                </p>
              </div>

              {instruction.youtubeUrl && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    Video Tutorial
                  </h4>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={instruction.youtubeUrl.replace('watch?v=', 'embed/')}
                      title={instruction.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {instruction.safetyNotes && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <AlertTriangle className="h-4 w-4" />
                    Safety Notes
                  </h4>
                  <p className="text-amber-700 dark:text-amber-300 whitespace-pre-wrap">
                    {instruction.safetyNotes}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default EquipmentInstructionView
