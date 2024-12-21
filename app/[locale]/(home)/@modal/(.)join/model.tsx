'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="w-full h-full backdrop-blur-md  fixed top-0 left-0 flex items-center justify-center">
      <dialog ref={dialogRef} className='bg-transparent' onClose={onDismiss}>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}