import './styles.css';
import Header from '../Header'
import Footer from '../Footer'

export default function Layout(props) {
  return (
    <>
      <Header />
      <div className='container_routes'>
        {props.children}
      </div>
      <Footer />
    </>
  )
}
