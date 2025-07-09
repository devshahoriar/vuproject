import { ContentLayout } from '@/components/admin-panel/content-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getUserMembership } from '@/app/[locale]/(admin)/dashboard/user-actions';
import { Badge } from '@/components/ui/badge';
import { MembershipType } from '@/prisma/out';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function MyMembershipPage() {
  const user = await getUserMembership();
  
  const membershipInfo = {
    [MembershipType.USER]: {
      title: 'Free',
      description: 'Basic access with limited features',
      color: 'bg-slate-500',
      features: ['Access to gym during standard hours', 'Basic equipment usage']
    },
    [MembershipType.BASIC]: {
      title: 'Basic',
      description: 'Standard membership with core features',
      color: 'bg-blue-500',
      features: ['All FREE features', 'Access to one class per week', 'Locker access']
    },
    [MembershipType.PRO]: {
      title: 'Pro',
      description: 'Enhanced membership with additional benefits',
      color: 'bg-green-500',
      features: ['All BASIC features', 'Unlimited classes', 'Personal trainer session (1x/month)']
    },
    [MembershipType.ELIT]: {
      title: 'Elite',
      description: 'Premium all-inclusive membership',
      color: 'bg-purple-500',
      features: ['All PRO features', 'VIP access 24/7', 'Personal trainer sessions (4x/month)', 'Nutrition consultation']
    }
  };
  
  const currentMembership = user?.memberships || MembershipType.USER;
  const membershipData = membershipInfo[currentMembership];
  
  return (
    <ContentLayout title="My Membership" description="Manage your membership details and benefits">
      <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>My Membership</CardTitle>
              <Badge className={`${membershipData.color} text-white`}>
                {membershipData.title}
              </Badge>
            </div>
            <CardDescription>{membershipData.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Membership Benefits</h3>
              <ul className="list-disc pl-5 space-y-1">
                {membershipData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {currentMembership !== MembershipType.ELIT && (
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Upgrade Your Membership</h3>
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/membership">View Upgrade Options</Link>
                  </Button>
                </div>
              </div>
            )}          </CardContent>
        </Card>
    </ContentLayout>
  );
}
