import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'


interface Props {
    totalQuestions: number;
    totalAnswers: number;
    badges: BadgeCounts;
    reputationPoints: number;
}

interface StatsCardProps {
    imgUrl: string;
    value: number;
    title: string;
}

const StatsCard = ({imgUrl, value, title}: StatsCardProps) => (
    <div className='light-border background-light900_dark300 flex flex-wrap
        items-center justify-start gap-4 rounded-md border p-6
        shadow-light-300 dark:shadow-dark-200'>
        <Image src={imgUrl} alt={title} width={40} height={50}/>
        <div>
            <p className='paragraph-semibold text-dark200_light900'>{value}</p>
            <p className='body-medium text-dark300_light700'>{title}</p>
        </div>
    </div>
);

const Stats = ({totalQuestions, totalAnswers, badges, reputationPoints}: Props) => {
  return (
    <div className='mt-3'>
        <h4 className="h3-semibold text-dark200_light900">
            Estadisticas{" "}
            <span className="small-semibold primary-text-gradient">
                {formatNumber(reputationPoints)}
            </span>
        </h4>
        {/* PREGUNTAS */}
        <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
            <div className='light-border background-light900_dark300 flex flex-wrap
            items-center justify-evenly gap-4 rounded-md border p-6
            shadow-light-300 dark:shadow-dark-200'>
                <div>
                    <p className='paragraph-semibold text-dark200_light900'>{formatNumber(totalQuestions)}</p>
                    <p className='body-medium text-dark400_light700'>Preguntas</p>
                </div>
            {/* RESPUESTAS */}
                <div>
                    <p className='paragraph-semibold text-dark200_light900'>{formatNumber(totalAnswers)}</p>
                    <p className='body-medium text-dark400_light700'>Respuestas</p>
                </div>
            </div>
             <StatsCard
                imgUrl="/icons/gold-medal.svg"
                value={badges.GOLD}
                title="Gold Badges"
            />
            <StatsCard
                imgUrl="/icons/silver-medal.svg"
                value={badges.SILVER}
                title="Silver Badges"
            />
             <StatsCard
                imgUrl="/icons/bronze-medal.svg"
                value={badges.BRONZE}
                title="Bronze Badges"
            />
        </div>
    </div>
  )
}

export default Stats;