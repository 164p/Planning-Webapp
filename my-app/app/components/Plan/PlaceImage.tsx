'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function PlaceImage( props: any){

    // const [src, setSrc] = useState(''); 
    // useEffect(() => {
    //     const img = URL.createObjectURL(props.blobText);

    //     setSrc(img); // after component is mount, src will change
    // }, [src]);

    return (
        <Image src={props.blobText} 
            alt="Preview Images" width={0} height={0} sizes="120vw" priority={true}
            style={{ width: '100%', height: 'auto' }} className=''
        />
    )
}