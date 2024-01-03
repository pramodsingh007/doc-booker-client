/* eslint-disable react/prop-types */
import FeedbackInput from "./FeedbackInput"
import { useState } from "react"
import { Rating } from "react-simple-star-rating"


function Feedback({fetchedReview,setFetchedReview}) {
    const [isFeedbackShow,setIsFeedbackShow]  = useState(false)
    const showFeedbackHandler =()=>{
        setIsFeedbackShow(true)
    }

    

  return (
    <div className=" mt-4">
        <h1 className=" font-semibold ">{fetchedReview.length===0?"no reviews":`All reviews (${fetchedReview?.length})`}</h1>
        {fetchedReview?.map((review,index)=><div key={index}><div  className=" mt-4 flex justify-between">
            <div className=" flex gap-4">
                <img width={50} className=" w-12 h-12 rounded-full" src={review?.user?.photo} alt="avatarpng" />
                <div>
                    <p className=" capitalize font-semibold">{review?.user?.name}</p>
                    <p className=" text-sm text-textColor">{new Date(review?.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
            <div className="flex">
            <Rating SVGclassName="inline-block" readonly transition initialValue={review?.rating}  size={25} />
            </div>
        </div>
        <p className=" text-textColor mt-3">{review?.reviewText}</p></div>)}
        
        {!isFeedbackShow&&(<div className="mt-12 flex justify-center">
            <button onClick={showFeedbackHandler} className=" bg-primaryColor  text-white px-4  py-2 rounded-full">Give Feedback</button>
        </div>)}
        {isFeedbackShow&&<FeedbackInput setFetchedReview={setFetchedReview}/>}
    </div>
  )
}

export default Feedback