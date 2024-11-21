import style from '../../Views/Landing/landing.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import img from '../../../assets/AboutUsImage.webp';
import AboutUsItem from '../AboutUsItems/itemsAboutUs';
import Secure from '../../../assets/securityIcon.svg';
import Comfortable from '../../../assets/comfortableIcon.svg';
import Fast from '../../../assets/fastIcon.svg';

const AboutUs = () => {
  return (
    <Container fluid className='mb-5'>
      <Row style={{ backgroundColor: '#fff', height: '70vh'}}> 
        <Col className='col-12 d-flex justify-content-center text-uppercase align-text-center text-nowrap'>
              <h2 className='fw-bolder text-dark fw'>
                  Sobre <span className='fw-bolder text-danger'>Nosotros</span>
              </h2>
          </Col>
          <div className='d-flex justify-content-center align-items-center p-5 ms-5' style={{ position: 'absolute', width: '90%'}}>
          <Col lg={7} md={6} sm={12} xs={12} className='px-2'>
           <p className="lh-lg fst-italic fw-bold text-start mx-2 mb-5" style={{ textAlign: 'justify', fontFamily: 'Open Sans, sans-serif' }}>
             SoftVision, fundada en 2023 por un equipo apasionado de expertos en tecnología, tiene como misión ofrecer soluciones de software innovadoras y de alta calidad. Nos especializamos en productos que facilitan el trabajo diario, impulsan la productividad y permiten a las empresas alcanzar sus objetivos tecnológicos. Nuestro compromiso con la excelencia nos impulsa a brindar un servicio excepcional y productos que superan las expectativas.
           </p>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12} className='d-flex justify-content-center p-5'>
            <img src={img} alt="" style={{ width: '400px', height: '350px' }} fluid/>
          </Col>
          </div>
          </Row>
         <Row>
          <Col className='col-12 mt-2'>
            <h3 className='text-danger text-start text-uppercase text-decoration-underline'>¿Por Qué Elegirnos?</h3>
          </Col>
          <AboutUsItem img={Secure} title={'Seguro'} text={'Nuestros productos cumplen con los más altos estándares de seguridad, garantizando la protección de la información empresarial.'}/>
          <AboutUsItem img={Comfortable} title={'Fácil de Usar'} text={'Ofrecemos software intuitivo y fácil de usar, diseñado para mejorar la experiencia del usuario y optimizar el tiempo.'}/>
          <AboutUsItem img={Fast} title={'Eficiente'} text={'Nuestras soluciones son rápidas y confiables, asegurando un rendimiento excelente en todo momento.'}/>
         </Row>
   </Container>
  );
};

export default AboutUs;
