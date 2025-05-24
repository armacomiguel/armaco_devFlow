"use client";

import { createVote } from '@/lib/actions/vote.action';
import { formatNumber } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { use, useState } from 'react'
import { toast } from 'sonner';

interface Params {
    targetType: "question" | "answer";
    targetId: string;
    upvotes: number;
    downvotes: number;
    hasVotedPromise: Promise<ActionResponse<HasVotedResponse>>;
}

const Votes = ({upvotes, downvotes, hasVotedPromise, targetType, targetId}: Params) => {

    const session = useSession();
    const userId = session.data?.user?.id;

    const {success, data} = use(hasVotedPromise);

    const [isLoading, setIsLoading] = useState(false);

    const {hasUpvoted, hasDownvoted} = data || {};

    const handleVote = async (voteType: "upvote" | "downvote") => {
        if(!userId) return toast.info("Solo los usuarios logeados pueden votar.");

        try {
            const result = await createVote({
                targetId,
                targetType,
                voteType,
            });

            if(!result.success){
                return toast.error("Falló al votar." ,{description: result.error?.message})
            }

            const successMessage = voteType === "upvote" ? `Upvote ${!hasDownvoted ? "added" : "removed"} Correctamente`
                : `Downvote ${!hasDownvoted ? "added" : "removed"}Correctamente`
            toast.success(successMessage, {description: "Tu voto ha sido registrado."});
        } catch {
            toast.warning("Ócurrio un error durante la votación, intenteló más tarde.")
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
            <Image
                src={success && hasUpvoted ? "/icons/upvoted.svg" : "/icons/upvote.svg"}
                width={18}
                height={18}
                alt='upvote'
                className={`cursor-pointer ${isLoading && "opacity-50"}`}
                aria-label='Upvote'
                onClick={() => !isLoading && handleVote('upvote')}
            />
            <div className='flex-center background-light700_dark400 min-w-5 rounded-sm p-1'>
                <p className='subtle-medium text-dark400_light900'>
                    {formatNumber(upvotes)}
                </p>
            </div>
        </div>
            {/* downvotes */}
         <div className='flex-center gap-1.5'>
            <Image
                src={success && hasDownvoted ? "/icons/downvoted.svg" : "/icons/downvote.svg"}
                width={18}
                height={18}
                alt='downvote'
                className={`cursor-pointer ${isLoading && "opacity-50"}`}
                aria-label='Downvote'
                onClick={() => !isLoading && handleVote('downvote')}
            />
            <div className='flex-center background-light700_dark400 min-w-5 rounded-sm p-1'>
                <p className='subtle-medium text-dark400_light900'>
                    {formatNumber(downvotes)}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Votes;