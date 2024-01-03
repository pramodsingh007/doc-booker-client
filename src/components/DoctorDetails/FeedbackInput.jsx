/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import { BASE_URL } from "../../../config";
import { getCookie } from "../../../utils/getCookie";
import { useParams } from "react-router";
import { useToasts } from "react-toast-notifications";


function FeedbackInput({setFetchedReview}) {
  const [starRating,setStarRating] = useState(0)
  const {addToast} = useToasts()
  const {docId} = useParams()
  const submitHandler = async(e)=>{
      e.preventDefault()
      const reviewData = {
        "doctor":docId,
        "reviewText":e.target.review.value,
        "rating":starRating
      }
      const res = await fetch(`${BASE_URL}/api/v1/reviews`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("token"),
        },
        body:JSON.stringify(reviewData)
      });
      const data = await res.json();
      if (!res.ok) {
        return addToast(data.message,{appearance:'error'})
      }
      setFetchedReview((state)=>[...state,reviewData])
      addToast(data.message,{appearance:'success'})


  }


  return (
    <form onSubmit={submitHandler} method="POST" className=" space-y-3 mt-12">
      <p className=" text-headingColor font-semibold">
        How would you rate the overall experience?*
      </p>
      <div className="">
        <Rating onClick={(e)=>{setStarRating(e)}} SVGclassName="inline-block" transition size={25} />
      </div>
      <h1 className=" font-semibold">Share your feedback or suggestions*</h1>
      <textarea
        required={true}
        placeholder="Write your message"
        className=" resize-none border-2 w-full outline-none p-2"
        name="review"
        id=""
        cols="30"
        rows="5"
      ></textarea>
      <button type="submit" className=" bg-primaryColor  text-white px-4  py-2 rounded-full">
        Submit Feedback
      </button>
    </form>
  );
}

export default FeedbackInput;
