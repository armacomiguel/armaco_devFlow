'use client';

import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({questionId}:{questionId: string}) => {

    const handleIncrement = async () => {

        const result = await incrementViews({questionId});
        if(result.success){
            toast.success("Views incrementes");
        } else {
            toast.error("Error", {description: result.error?.message});
        }
    };

    useEffect(() => {
      handleIncrement();
    }, [])
    

  return null;
}

export default View;