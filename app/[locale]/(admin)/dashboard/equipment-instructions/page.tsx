import { ContentLayout } from "@/components/admin-panel/content-layout"
import { getAllEquipmentWithInstructions } from "@/query/get/equipment-instructions"
import EquipmentInstructionsClient from "./equipment-instructions-client"

export default async function EquipmentInstructionsPage() {
  const equipmentData = await getAllEquipmentWithInstructions()

  return (
    <ContentLayout title="Equipment Usage Instructions">
      <EquipmentInstructionsClient equipmentData={equipmentData} />
    </ContentLayout>
  )
}
