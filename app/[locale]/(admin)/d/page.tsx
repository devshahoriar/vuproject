import { ContentLayout } from '@/components/admin-panel/content-layout'
import { getSession } from '@/lib/auth-client'
import { headers } from 'next/headers'

const DashBoardHomePage = async () => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  })

  return (
    <ContentLayout title="Test">
      <div>Test</div>
    </ContentLayout>
  )
}

export default DashBoardHomePage
