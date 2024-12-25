import Image from "next/image"

const SuspendedPage = () => {

  return (
    <section className="flex h-[90vh] items-center justify-center">
      <div className="flex justify-center flex-col text-center">
     <Image style={{

      transitionTimingFunction: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
     }} className="animate-[wiggle_2s_infinite] transform-gpu origin-top" src="/imgs/sus2.png" width={800} height={800} alt="suspended" />
      <p className="">Your account <span className="text-red-500 font-bold">blocked!</span></p>
      <p>Contact with admin!</p>
      <p>0177********</p>
      </div>
    </section>
  )
}

export default SuspendedPage