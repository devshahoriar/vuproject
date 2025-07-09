import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getUserClasses } from '@/app/[locale]/(admin)/dashboard/user-actions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Clock, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function EnrolledClassesPage() {
  const classes = await getUserClasses();
  
  return (
    <ContentLayout title="My Classes" description="Classes you are currently enrolled in">
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>
              Classes you are currently enrolled in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {classes.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="font-medium text-lg mb-2">No Classes Found</h3>
                <p className="text-muted-foreground mb-4">You are not enrolled in any classes yet.</p>
                <Button asChild>
                  <Link href="/classes">Browse Available Classes</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {classes.map((classItem) => (
                  <Card key={classItem.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 relative">
                        {classItem.coverImage && (
                          <img 
                            src={classItem.coverImage.url} 
                            alt={classItem.title}
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <div className="p-4 md:p-6 w-full md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{classItem.title}</h3>
                            <Badge variant="outline" className="mb-2">
                              {classItem.category.title}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {classItem.desc}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{classItem.duration} minutes</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{classItem.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2 md:col-span-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage 
                                  src={classItem.instructor.image || ''} 
                                  alt={classItem.instructor.name} 
                                />
                                <AvatarFallback>
                                  {classItem.instructor.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{classItem.instructor.name}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}          </CardContent>
        </Card>
    </ContentLayout>
  );
}
