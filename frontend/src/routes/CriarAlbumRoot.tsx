import { Outlet } from 'react-router-dom'

import SideBar from '../components/sidebar/SideBar'
import NavBar from '../components/header/NavBar'
import Player from '../components/player/Player'

const CriarAlbumRoot = () => {
  return (
    <div>
      <div className='fixed bg-[#FAFAFA] w-full h-[100px] z-50'>
        <NavBar/>
      </div>
      <div className='pb-[80px] flex flex-row'>
        <div className='fixed bg-[#FAFAFA] w-[240px] h-[1024px] border-r border-[#D43F5D] z-50'>
        <SideBar/>
        </div>
        <div className='mt-[75px] ml-[240px] pb-[120px]'>
          <Outlet/>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full z-50'>
        <Player/>
      </div>
    </div>


  )
}

import { Outlet } from 'react-router-dom'

import SideBar from '../components/sidebar/SideBar'
import NavBar from '../components/header/NavBar'
import Player from '../components/player/Player'

const CriarAlbumRoot = () => {
  return (
    <div>
      <div className='fixed bg-[#FAFAFA] w-full h-[100px] z-50'>
        <NavBar/>
      </div>
      <div className='pb-[80px] flex flex-row'>
        <div className='fixed bg-[#FAFAFA] w-[240px] h-[1024px] border-r border-[#D43F5D] z-50'>
        <SideBar/>
        </div>
        <div className='mt-[75px] ml-[240px] pb-[120px]'>
          <Outlet/>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full z-50'>
        <Player/>
      </div>
    </div>


  )
}

export default CriarAlbumRoot