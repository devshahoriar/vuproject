import ProtectedPage from '@/components/shared/ProtectedPage';
import EquipmentHistoryForm from '@/components/shared/EquipmentHistoryForm';
import { getLoginUser } from '@/lib/auth-client';
import { headers } from 'next/headers';
import prisma from '@/prisma/db';

export const dynamic = 'force-dynamic';

const getActiveEquipment = async () => {
  return prisma.equipment.findMany({
    where: {
      active: true,
    },
    select: {
      id: true,
      name: true,
      desc: true,
      active: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
};

const ReportEquipmentIssuePage = async () => {
  const user = await getLoginUser(headers);
  if (!user) return null;

  const equipment = await getActiveEquipment();

  return (
    <ProtectedPage
      permission="view:equipment"
      title="Report Equipment Issue"
      description="Report equipment problems, maintenance needs, or damage"
    >
      <EquipmentHistoryForm equipment={equipment} currentUserId={user.id} />
    </ProtectedPage>
  );
};

export default ReportEquipmentIssuePage;
