import PlaceDetail from "@/app/components/PlaceDetail"
import Comment from "@/app/components/Comment"


export default function Home() {
  return (
    <main className="pb-12 pt-16">
      
      <PlaceDetail/>

      <div className="comment-section">
          <Comment/>
          <Comment/>
      </div>
      
    </main>
  )
}
