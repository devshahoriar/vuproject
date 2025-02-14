import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface MembershipProps {
  memberships: {
    id: string
    userId: string
    amount: number
    currency: string
    status: string
    sessionId: string
    membershipType: any
    createdAt: Date
    updatedAt: Date
  }[]
}

export function MembershipList({ memberships }: MembershipProps) {
  const isActive = (createdAt: Date) => {
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    return new Date(createdAt) > oneMonthAgo
  }

  const activeMembership = memberships.find(m => isActive(m.createdAt))

  return (
    <Card className="max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Membership Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeMembership && (
            <div className="bg-primary/10 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Active Membership</h3>
                <Badge>{activeMembership.membershipType}</Badge>
              </div>
              <p className="text-sm mt-2">
                Valid until: {format(new Date(activeMembership.createdAt).setMonth(
                  new Date(activeMembership.createdAt).getMonth() + 1
                ), 'PPP')}
              </p>
            </div>
          )}

          <div className="divide-y">
            {memberships.map((membership) => (
              <div key={membership.id} className="py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{membership.membershipType}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(membership.createdAt), 'PPP')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {membership.amount} {membership.currency}
                    </p>
                    <Badge variant={membership.status === 'succeeded' ? 'default' : 'secondary'}>
                      {membership.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
