import {IF} from "../url"

const ProfilePorts = ({p}) => {
  return (
    <div>
      <div className="w-full flex mt-8 ml-4 ">
      <div className="pr-2 w-[35%] h-[200px] flex justify-center items-center ">
        <img className=" pr-8 rounded-lg " src={IF+p.photo} alt="img" />

      </div>
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold ">
          {p.title}
        </h1>
        <div className="flex mt-2 mb-2 text-sm font-semibold text-grey-500 items-center justify-between md:mb-4">
        <p>{p.username}</p>
        <div className="flex space-x-2">
        <p>{new Date(p.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(p.updatedAt).toString().slice(16,24)}</p>
        </div>

        </div>
        <p className="text-sm md:text-lg">{p.desc}</p>
      </div>
    
    </div>
    </div>
  )
}

export default ProfilePorts
