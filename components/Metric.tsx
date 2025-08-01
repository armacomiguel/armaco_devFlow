import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback } from './ui/avatar'

interface Props {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles: string;
  imgStyles?: string;
  isAuthor?: boolean;
  titleStyles?: string;
}

const Metric = ({imgUrl, alt, value, title, href, textStyles, imgStyles, isAuthor, titleStyles}: Props) => {

  const initials = alt.split(' ').map((word: string) => word[0]).join("").toUpperCase().slice(0,2);
  
  const metricContent = (
    <>
      {
        imgUrl ? (
          <Image
            src={imgUrl}
            width={16}
            height={16}
            alt={alt}
            className={`rounded-full object-contain ${imgStyles}`}
            />
        ) : (
          <Avatar className="h-4 w-4">
            <AvatarFallback className={cn('primary-gradient font-space-grotesk tracking-wider text-white', imgStyles)}>
              {initials}
            </AvatarFallback>
          </Avatar>
        )
      }
        
      
        <p className={`${textStyles} flex items-center gap-1`}>
        {value}

        {title ? (
          <span className={cn(`small-regular line-clamp-1`, titleStyles)}>
            {title}
          </span>
        ) : null}
      </p>
      </>
  );

  return href ? (
    <Link href={href} className="flex-center gap-1">
      {metricContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricContent}</div>
  );
}

export default Metric;