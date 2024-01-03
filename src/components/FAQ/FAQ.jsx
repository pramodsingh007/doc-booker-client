import FaqCard from "./FaqCard"
const faqs = [
  {
    question: "What is your medical care?",
    content:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We do this through innovative design, excellent customer service, and the efficient use of technology.",
  },
  {
    question: "What happens if I need to go a hospital?",
    content:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We do this through innovative design, excellent customer service, and the efficient use of technology.",
  },
  {
    question: "What happens if I need to go a hospital?",
    content:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We do this through innovative design, excellent customer service, and the efficient use of technology.",
  },
  {
    question: "Can I visit your medical office?",
    content:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We do this through innovative design, excellent customer service, and the efficient use of technology.",
  },
  {
    question: "Does you provide urgent care?",
    content:
      "One Medical was founded on a better model of care one designed around patients needs that provides a higher level of quality and service affordably. We do this through innovative design, excellent customer service, and the efficient use of technology.",
  },
];


function Faq() {
  
  return (
    <section className="px-5 sm:px-10 lg:px-32 pt-24 ">
      <div className=" grid grid-cols-1 place-items-center gap-12 sm:grid-cols-2">
        <div>
          <img className=" rounded-lg" src="/images/faq-img.png" alt="faqimg" />
        </div>
        <div>
            <h1 className=" text-3xl font-semibold mb-8"> Most questions by our beloved patients</h1>
            <div className=" space-y-3">
                {faqs.map((item,index)=><FaqCard  key={index} question={item.question} content={item.content}/>)}
            </div>
            
        </div>
      </div>
    </section>
  )
}

export default Faq