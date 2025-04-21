import { ContentLayout } from '@/components/admin-panel/content-layout'
import prisma from '@/prisma/db'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"

const getPayment = async () => {
  return prisma.payment.findMany({
    select: {
      amount: true,
      createdAt: true,
      id: true,
      membershipType: true,
      status: true,
      currency: true,
      user: {
        select: {
          email: true,
          name: true,
          image: true,
        },
      },
    },
  })
}

const PaymentsPage = async () => {
  const pays = await getPayment()
  return <ContentLayout title="Payments"><div className="mb-4">
  <div className="text-muted-foreground">Total Payments: {pays.length}</div>
</div>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>User</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Membership Type</TableHead>
      <TableHead>Date</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {pays.map((payment) => (
      <TableRow key={payment.id}>
        <TableCell className="flex items-center gap-2">
          {payment.user.image ? (
            <img 
              src={payment.user.image} 
              alt={payment.user.name} 
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : null}
          {payment.user.name}
        </TableCell>
        <TableCell>{payment.user.email}</TableCell>
        <TableCell>{payment.amount} {payment.currency}</TableCell>
        <TableCell>{payment.status}</TableCell>
        <TableCell>{payment.membershipType}</TableCell>
        <TableCell>{payment.createdAt.toDateString()}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table></ContentLayout>
}
export default PaymentsPage
