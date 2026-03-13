import BarraPesquisa from "./BarraPesquisa"
import PerfilHeader from "./PerfilHeader"

const NavBar = () => {
  return (
    <div className='ml-60 w-full h-16
    pr-6
    flex flex-row items-center'>
      <BarraPesquisa/>
      <PerfilHeader/>
    </div>


  )
}

export default NavBar