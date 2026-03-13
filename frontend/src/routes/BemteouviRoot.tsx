import { Outlet } from 'react-router-dom';

import SideBar from '../components/sidebar/SideBar';
import Player from '../components/player/Player';
import SurgirEmCima from '../components/SurgirEmCima';
import Header from '../components/header/Header';

const BemteouviRoot = () => {
  return (
    <div>
      <SurgirEmCima/>

      {/* Header */}
      <div className='fixed  w-full h-[6.25rem] z-50
      bg-[#FAFAFA]'>
        <Header/>
      </div>

      {/* Sidebar + Content */}
      <div className='flex'>
        <div className='fixed bg-[#FAFAFA] w-[15rem] h-screen border-r border-[#D43F5D] z-50'>
          <SideBar />
        </div>
        <div className='ml-[18.125rem] mt-28 mb-52'>
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