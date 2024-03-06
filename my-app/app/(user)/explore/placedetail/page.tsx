import PlaceDetail from "@/app/components/PlaceDetail"
import Comment from "@/app/components/Comment"
import React, { useState, useEffect } from 'react';


const fetcher = (url : string) => fetch(url).then(r => r.json())
export default function Home() {
 
  return (
    <main className="container pb-12 pt-16">
      
      <PlaceDetail/>

      <div className="comment-section">
          <Comment/>
          <Comment/>
      </div>
      
    </main>
  )
}
