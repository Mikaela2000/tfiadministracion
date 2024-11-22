import style from './landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Hero from '../../inc/Hero/Hero';
import AboutUs from "../../inc/AboutUs/AboutUs"
// import ContactUs from '../../inc/ContactUs/ContactUs';


const Landing = () => {
  return (
      <Container fluid className={style.landing}>
          <Hero/>
          <AboutUs/>
          {/* <ContactUs/> */}
      </Container>
  );
};

export default Landing;
