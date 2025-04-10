'use client';

import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url';

const filters = [
    {name: "Next", value: "next"},
    {name: "React", value: "react"},
  // {name: "Newest", value: "newest"},
  // {name: "Pupular", value: "popular"},
  // {name: "Unanswered", value: "unanswered"},
  // {name: "Recomended", value: "recomended"},
];
const HomeFilter = () => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter");
  const [active, setActive] = useState(filterParams || '');

  const handleTypeClick = (filter:string) => {
    let newUrl = "";
    if(filter !== active){
      setActive(filter);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });
    } else {
        setActive("");
        newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["filter"],
        });
      } 

      router.push(newUrl, {scroll: false});
  }

  return (
    <div className='mt-10 hidden flex-wrap gap-3 sm:flex'>
      {filters.map((filter) => (
        <Button 
          key={filter.name}
          onClick={() => handleTypeClick(filter.value)}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize
             shadow-none`,
            active === filter.value ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400" : 
            "cursor-pointer bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
            )}
          >
            {filter.name}
          </Button>
      ))}
    </div>
  )
}

export default HomeFilter;