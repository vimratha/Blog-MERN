import {IF} from "../url"

const HomePoster = ({post}) => {
  return (
    <div className="w-full flex mt-8 ml-4 ">
      <div className="pr-4 w-1/3 md:w-1/4 h-48 md:h-auto flex justify-center items-center ">
        <img className=" object-cover pr-8 rounded-lg  " src={IF+post.photo}  alt="img" />

      </div>
      <div className="flex flex-col w-2/3 md:w-3/4">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mt-2 mb-2 text-sm font-semibold text-grey-500 items-center justify-between md:mb-4">
        <p>{post.username}</p>
        <div className="flex space-x-2">
          <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
        </div>

        </div>
        <p className="text-sm md:text-lg">{post.desc.slice(0,200)+"  ...Read More"}</p>
      </div>
    </div>
  )
}

export default HomePoster
