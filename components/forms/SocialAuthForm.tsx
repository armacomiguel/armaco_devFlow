'use client';

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import ROUTES from '@/constants/routes';

const SocialAuthForm = () => {

    const buttonClass = 'background-dark400_light900 body-medium text-dark200_light800 rounded-2 min-h-12 flex-1 px-4 py-3';

    const handleSignIn = async (provider: "github" | "google") => {
        try {

            toast.info("Redireccionando...");

            await signIn(provider,{
                redirectTo: ROUTES.HOME,
                redirect: false,
            });


        } catch (error) {
            console.log(error);
            toast.error('Falló inicio de sesión',{
                description:
                    error instanceof Error 
                    ? error.message
                    : "Ocurrió un error durante el inicio de sesión.",
            });
        }
    }

  return (
    <div className='mt-10 flex flex-wrap gap-2.5'>
        <Button className={buttonClass} onClick={() => handleSignIn("github")}>
            <Image src="/icons/github.svg" alt='Github logo' width={20} height={20} className='invert-colors mr-2.5 object-contain' />
            <span>Iniciar sesión con Github</span>
        </Button>

        <Button className={buttonClass} onClick={() => handleSignIn("google")}>
            <Image src="/icons/google.svg" alt='Google logo' width={20} height={20} className='mr-2.5 object-contain' />
            <span>Iniciar sesión con Google</span>
        </Button>
    </div>
  )
}

export default SocialAuthForm