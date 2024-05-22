

const Footer = () => {
  return (
    <div>
    <div className="mt-8 w-full bg-black px-8  flex justify-between text-sm md:text-md py-8 md:mt-8">
      <div className="flex flex-col text-white text-base pl-2 ">
         <p>Featured Blog</p>
         <p>Most Viewed</p>
         <p>Readers Choice</p>
      </div>
      <div className="flex flex-col text-white text-base">
         <p>Forum</p>
         <p>Support</p>
         <p>Recent Posts</p>
      </div>
      <div className="flex flex-col text-white pr-2 text-base">
         <p>Privacy policy</p>
         <p>About us</p>
         <p>Terms & Conditions</p>
         <p>Terms of Service</p>
      </div>
    </div>
    <p className="py-2 pb-2 text-center text-white bg-black">All rights reserved @Blog</p>
    </div>
  )
}

export default Footer
