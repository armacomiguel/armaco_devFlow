import ROUTES from '@/constants/routes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TagCard from '../cards/TagCard';

const hotQuestions = [
    {_id: "1", title: "¿Como crear una página en NEXT 15?"},
    {_id: "2", title: "¿Como utilizar TailwindCss?"},
    {_id: "3", title: "¿Como puedo crear un archivo de entorno?"},
    {_id: "4", title: "¿Qué es mejor JS o Python?"},
    {_id: "5", title: "¿Cuales son los mejores frameworks para react?"},
];

const popularTags = [
    {_id: "1", name: "react", questions: 100},
    {_id: "2", name: "javascript", questions: 23},
    {_id: "3", name: "python", questions: 75},
    {_id: "4", name: "java", questions: 58},
    {_id: "5", name: "node", questions: 142},
];

const RightSideBar = () => {
  return (
    <section className='pt-36 custom-scrollbar background-light900_dark200
    light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto
    border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
        <div>
            <h3 className='h3-bold text-dark200_light900'>Top Preguntas</h3>
            <div className='mt-7 flex w-full flex-col gap-[30px]'>
                {hotQuestions.map(({_id, title}) => (
                    <Link key={_id} href={ROUTES.PROFILE(_id)} className='flex cursor-pointer items-center justify-between gap-7'>
                        <p className='body-medium text-dark500_light700'>{title}</p>
                        <Image src="/icons/chevron-right.svg" alt='chevron' width={20} height={20} className='invert-colors' />
                    </Link>
                ))}
            </div>
        </div>

        <div className='mt-16'>
            <h3 className='h3-bold text-dark200_light900'>Tags Populares</h3>
            <div className='mt-7 flex flex-col gap-4'>
                {popularTags.map(({_id, name, questions}) => (
                    <TagCard key={_id} _id={_id} name={name} questions={questions} showCount compact />
                ))}
            </div>
        </div>
    </section>
  )
}

export default RightSideBar