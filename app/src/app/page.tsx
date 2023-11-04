'use client'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function Home() {
  const {t} = useTranslation()

  return (
      <div>
        <h1>
          {t('app')}
        </h1>
      </div>
  )
}
