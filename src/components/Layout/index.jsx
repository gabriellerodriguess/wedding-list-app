import Header from '../Header'
import Footer from '../Footer'
import { FaWrench } from "react-icons/fa";
import './styles.css';

export default function Layout(props) {

  if (props.maintenance) {
    return (
      <div className='container_maintenance'>
        Our website is currently undergoing scheduled maintenance. We’ll be back shortly! <br></br>
        <FaWrench size={24} />
      </div>
    )
  }
  return (
    <>
      <Header event={props.event} isConfirmationPage={props.isConfirmationPage} />
      <div className='container_routes'>
        {props.children}
      </div >
      {
        props.showFooter &&
        <Footer />
      }
    </>
  )
}
