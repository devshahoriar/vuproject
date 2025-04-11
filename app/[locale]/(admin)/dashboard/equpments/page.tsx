import { ContentLayout } from '@/components/admin-panel/content-layout'
import AddEquipment from './AddEqipment'

const AdminEqupmentPage = () => {
  return (
    <ContentLayout title="Eqipments">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-muted-foreground">Total Classes: {0}</div>
        <AddEquipment />
      </div>
    </ContentLayout>
  )
}

export default AdminEqupmentPage