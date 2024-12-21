'use client'

import { usePathname } from 'next/navigation'

import { JoinPage } from '../../join/Client'
import { Modal } from './model'

export default function LoginRegistrationPage() {
  const path = usePathname()
  if (!path.endsWith('/join')) return null

  return (
    <Modal>
      <JoinPage />
    </Modal>
  )
}
