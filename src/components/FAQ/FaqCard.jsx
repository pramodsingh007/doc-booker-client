/* eslint-disable react/prop-types */
import { MinusSquare, PlusSquare } from 'lucide-react'
import { useState } from 'react'

function FaqCard({question,content}) {
    const [ishidden,setIshidden] = useState(false)
  const onClickHandler = ()=>{
    setIshidden(!ishidden)
  }
  return (
    <div className="border p-4 rounded-md">
                <div className="  flex justify-between items-center">
                  <h1 className=" font-semibold mb-2 text-headingColor">{question}</h1>
                  <button onClick={onClickHandler}>{!ishidden?<PlusSquare/>:<MinusSquare/>}</button>
                </div>
                {ishidden&&<p className=' text-textColor'>{content}</p>}
            </div>
  )
}

export default FaqCard