'use client';

import { AskQuestionSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { MDXEditorMethods } from '@mdxeditor/editor';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import TagCard from '../cards/TagCard';
import { createQuestion, editQuestion } from '@/lib/actions/question.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { ReloadIcon } from '@radix-ui/react-icons';

const Editor = dynamic(() => import("@/components/editor"), {
    ssr: false,
});

interface Params {
    question?: Question;
    isEdit?: boolean;
}


const QuestionForm = ({question, isEdit = false}: Params) => {

    const router = useRouter();
    const editorRef = useRef<MDXEditorMethods>(null);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AskQuestionSchema>>({
        resolver: zodResolver(AskQuestionSchema),
        defaultValues: {
            title: question?.title || "",
            content: question?.content || "",
            tags: question?.tags.map((tag) => tag.name) || [],
        },
    });

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: {value: string[]}) => {

        if(e.key === "Enter"){
            e.preventDefault();
            const tagInput = e.currentTarget.value.trim();

            if(tagInput && tagInput.length < 15 && !field.value.includes(tagInput)){
                form.setValue("tags", [...field.value, tagInput]);
                e.currentTarget.value = "";
                form.clearErrors("tags");
            } else if (tagInput.length > 15){
                form.setError("tags", {
                    type: "manual",
                    message: "Tag should be less tham 15 characters."
                });
            } else if(field.value.includes(tagInput)) {
                form.setError("tags",{
                    type: "manual",
                    message: "Esta etiqueta ya existe."
                });
            }
        };
    };

    const handleTagRemove = (tag: string, field: {value:  string[]}) => {
        const newTags = field.value.filter((t) => t !== tag);

        form.setValue("tags", newTags);

        if(newTags.length === 0){
            form.setError("tags",{
                type: "manual",
                message: "Tags are required."
            });
        }
    };

    const handleCreateQuestion = async(data: z.infer<typeof AskQuestionSchema>) => {

        startTransition(async () => {

            if(isEdit && question){
                const result = await editQuestion({
                    questionId: question?._id,
                    ...data,
                });

                if(result.success){
                    toast.success("Exitoso", {description: "Pregunta editada exitosamente."});
                    if(result.data) router.push(ROUTES.QUESTION(result.data._id));
                } else {
                    toast.error("Ups!", {description: result.error?.message || "Algo salió mal."});
                }

                return;
            }

            const result = await createQuestion(data);

            if(result.success){
                toast.success("Exitoso", {description: "Pregunta creada exitosamente."});
                if(result.data) router.push(ROUTES.QUESTION(result.data._id));
            } else {
                toast.error("Ups!", {description: result.error?.message || "Algo salió mal."});
            }
        });
    };

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
                            <Editor editorRef={editorRef} value={field.value} fieldChange={field.onChange}/>
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
                                    className="paragraph-regular background-light700_dark300
                                    light-border-2 text-dark300_light700 no-focus min-h-[56px]
                                    border"
                                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                                />
                                {field.value.length > 0 && (
                                    <div className='flex-start mt-2.5 flex-wrap gap-2.5'>
                                        {field?.value?.map((tag: string) => 
                                            <TagCard key={tag} _id={tag} name={tag} compact remove isButton handleRemove={() => handleTagRemove(tag, field)} />
                                        )}
                                    </div>
                                )}
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
                <Button type='submit' className='primary-gradient !text-light-900 w-fit' disabled={isPending}>
                    {isPending ? (
                        <>
                            <ReloadIcon className="mr-2 size-4 animate-spin"/>
                        </>
                    ): (
                        <>
                           {isEdit ? "Editar pregunta" : "Crear pregunta"}
                        </>
                    )}
                </Button>

            </div>
        </form>
    </Form>
  )
}

export default QuestionForm