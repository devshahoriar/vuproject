import ProtectedPage from '@/components/shared/ProtectedPage';
import { getEquipmentWithHistory, getEquipmentHistory } from '@/lib/actions/equipment-history';
import EquipmentHistoryList from '@/components/admin-panel/EquipmentHistoryList';
import EquipmentOverview from '@/components/admin-panel/EquipmentOverview';
import { getLoginUser } from '@/lib/auth-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

const EquipmentHistoryPage = async () => {
  const user = await getLoginUser(headers);
  if (!user) return null;

  const [equipmentResult, historyResult] = await Promise.all([
    getEquipmentWithHistory(),
    getEquipmentHistory()
  ]);

  if (!equipmentResult.success || !historyResult.success) {
    return (
      <ProtectedPage
        permission="view:equipment"
        title="Equipment History"
        description="View equipment maintenance and repair history"
      >
        <div className="text-center text-muted-foreground">
          Failed to load equipment data
        </div>
      </ProtectedPage>
    );
  }

  const equipment = equipmentResult.data || [];
  const history = historyResult.data || [];

  return (
    <ProtectedPage
      permission="view:equipment"
      title="Equipment History"
      description="View equipment maintenance and repair history"
    >
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Equipment Overview</TabsTrigger>
          <TabsTrigger value="history">History Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <EquipmentOverview equipment={equipment} />
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <EquipmentHistoryList history={history} currentUserId={user.id} />
        </TabsContent>
      </Tabs>
    </ProtectedPage>
  );
};

export default EquipmentHistoryPage;
