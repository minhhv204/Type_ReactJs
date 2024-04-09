import { Outlet } from 'react-router-dom'
import { Footer, Header } from '..'

const LayoutWebsite = () => {
  return <>
        <Header />
        <Outlet/>
        <Footer/>
    </>
  
}

export default LayoutWebsite