import SocialAuthForm from '@/components/forms/SocialAuthForm';
import Image from 'next/image';
import React, { ReactNode } from 'react'

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center
    bg-no-repeat dark:bg-auth-dark px-4 py-10
    '>
      <section className='light-border background-light800_dark200 shadow-light100_dark100
      min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8'>
        <div className='flex items-center justify-between gap-2'>
          <div className='space-y-2.5'>
            <h1 className='h2-bold text-dark100_light900'>Unete a DevFlow</h1>
            <p className='paragraph-regular text-dark500_light400'>Para obtener respuesta a tus preguntas.</p>
          </div>
          <Image
            src="images/site-logo.svg"
            width={50}
            height={50}
            className='object-contain'
            alt='img fomr'
          />
        </div>
        {children}
        <SocialAuthForm />
      </section>
    </main>
  )
}

export default AuthLayout;