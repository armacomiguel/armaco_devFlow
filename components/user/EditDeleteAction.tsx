"use client";

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


interface Props {
    type: string;
    itemId: string;
}

const EditDeleteAction = ({type, itemId}: Props) => {

    const router = useRouter();

    const handleEdit = async () => {
        router.push(`/questions/${itemId}/edit`);
    };

    const handleDelete = async () => {
        if(type === "Question"){
            toast.success("Pregunta eliminada correctamente.");
        } else if(type === "Answer"){
            toast.success("Respuesta eliminada correctamente.")
        }
    };

  return <div className={`flex items-center justify-end gap-3 max-sm:w-full ${type === "Answer" && "gap-0 justify-center"}`}>
        {
            type === "Question" && (
                <Image
                    src="/icons/edit.svg"
                    alt='edit'
                    width={14}
                    height={14}
                    className='cursor-pointer object-contain'
                    onClick={handleEdit}
                />
            )
        }

        <AlertDialog>
            <AlertDialogTrigger className='cursor-pointer'>
                <Image src="/icons/trash.svg" alt='trash' width={14} height={14}/>
            </AlertDialogTrigger>
            <AlertDialogContent className='background-light800_dark300'>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your 
                        {" "} {type === "Question" ? "question" : "answer"} y borrarlo para siempre.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className='btn'>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className='!border-primary-100 !bg-primary-500 !text-light-800'
                    onClick={handleDelete}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
    </div>
  
}

export default EditDeleteAction;