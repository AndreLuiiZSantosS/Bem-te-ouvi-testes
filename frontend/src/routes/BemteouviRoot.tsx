import { Outlet } from 'react-router-dom';

import SideBar from '../components/sidebar/SideBar';
import NavBar from '../components/header/NavBar';
import Player from '../components/player/Player';
import SurgirEmCima from '../components/SurgirEmCima';

const BemteouviRoot = () => {
  return (
    <div>
      <SurgirEmCima/>


      {/* Header */}
      <div className='fixed  w-full h-[100px] z-50
      bg-[#FAFAFA]'>
        <NavBar />
      </div>

      {/* Sidebar + Content */}
      <div className='flex'>
        <div className='fixed bg-[#FAFAFA] w-[240px] h-screen border-r border-[#D43F5D] z-50'>
          <SideBar />
        </div>
        <div className='ml-[290px] mt-[115px]'>
          <Outlet />
        </div>
      </div>

      {/* Player */}
      <div className='fixed bottom-0 left-0 w-full z-50'>
        <Player />
      </div>
    </div>
  );
};

export default BemteouviRoot;


        // <div className='mt-[100px] ml-[240px] pb-[160px]'>
        //   <Outlet />
        // </div>