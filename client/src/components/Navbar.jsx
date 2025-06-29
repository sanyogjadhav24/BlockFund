import React,{useState,useEffect} from 'react'
import {Link ,useNavigate} from 'react-router-dom';
import { CustomButton } from '.';
import {logo,menu,search,thirdweb} from '../assets';
import {useStateContext} from '../context';
import { navlinks } from '../constants';

const Navbar = ({onSearch}) => {
  const navigate=useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive,setIsActive]=useState('dashboard');

  const [toggleDrawer,settoggleDrawer]=useState(false);
const {connectWithMetamask,address}=useStateContext();
 
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flrx-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
   <input
  type="text"
  placeholder="Search for Campaigns"
  className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

<div
  className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer"
  onClick={() => onSearch(searchQuery)}
>
  <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />
</div>

      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton btnType="button"
        title={address?'Create a campaign': 'Connect'}
        styles={
  address
    ? 'bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 text-white'
    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
}
        handleClick={()=>
        {
          if(address) navigate('create-campaign')
          else connectWithMetamask()
        }
        }
        />

        <Link to="/profile" >
        <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer"> 
          <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
        </div>
        
        
        
        </Link>

      </div>



        {/* Small screen navigation*/ }
        <div className="sm:hidden flex justify-between items-center relative">
        

           <div className="w-[60px] h-[60px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer"> 
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain"/>
 </div>
          <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={()=>settoggleDrawer((prev)=>!prev)} 
          />
       
        <div className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${!toggleDrawer?'-translate-y-[100vh]':'translate-y-0'} transition-all duration-700` }>
        <ul className="mb-4">
          {navlinks.map((Link)=>(
            <li
            key={Link.name}
            className={`flex p-4 ${isActive===Link.name && 'bg-[#3a3a43]'}`}
            onClick={()=>{
              setIsActive(Link.name);
              settoggleDrawer(false);
              navigate(Link.link);
            }}>
              <img src={Link.imgUrl} 
              className={`w-[24px] h-[24px] object.contain ${isActive===Link.name ? 'grayscale-0': 'grayscale'}`}
              alt={Link.name}
              />
              <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive===Link.name ?'text-[#1dc071]': 'text -[#8080191]'}`}>
                {Link.name}
              </p>

            </li>
          ))}


        </ul>
        <div className="flex mx-4">
          <CustomButton 
          btnType="button"
          title={address?'Create a campaign': 'Connect'}
          styles={address?'bg-[#1dc071]':'bg-[#8c6dfd]'}
          handleClick={()=>
        {
          if(address) navigate('create-campaign')
          else connectWithMetamask()
        }
        }
        />

        </div>
        </div>
    </div>
    </div>
  )
}

export default Navbar
