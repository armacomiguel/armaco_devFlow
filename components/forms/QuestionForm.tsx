'use client';

import { AskQuestionSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const QuestionForm = () => {

    const form = useForm({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: "",
            content: "",
            tags: [],
        },
    });

    const handleCreateQuestion = () => {};

  return (
    <Form {...form}>
        <form className='flex w-full flex-col gap-10' onSubmit={form.handleSubmit(handleCreateQuestion)}>
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Question Title <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            <Input autoComplete="off"
                                {...field}
                                className="paragraph-regular background-light700_dark300
                                light-border-2 text-dark300_light700 no-focus min-h-[56px]
                                border"
                            />
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Se especifico e imagina que preguntas a otra persona.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Explicación detallada de tu problema <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            Editor Component
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Explica el problema y describe el evento.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                    <FormItem className="flex w-full flex-col gap-3">
                        <FormLabel className="paragraph-semibold text-dark400_light800">
                            Etiquetas <span className='text-primary-500'>*</span>
                        </FormLabel>
                        <FormControl>
                            <div>
                                <Input
                                    placeholder='Agrega etiquetas...' 
                                    autoComplete="off"
                                    {...field}
                                    className="paragraph-regular background-light700_dark300
                                    light-border-2 text-dark300_light700 no-focus min-h-[56px]
                                    border"
                                />
                                Tags
                            </div>
                        </FormControl>
                        <FormDescription className='body-regular text-light-500 mt-2.5'>
                            Agrega 3 etiquetas acerca de tu pregunta. Presiona enter para agregar.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='mt-16 flex justify-end'>
                <Button type='submit' className='primary-gradient !text-light-900 w-fit'>
                    Haz tu pregunta
                </Button>

            </div>
        </form>
    </Form>
  )
}

export default QuestionForm