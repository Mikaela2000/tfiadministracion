import style from '../../views/Landing/landing.module.css';
import { Container, Row, Col, Button} from 'react-bootstrap';
import LoginPanel from "../../inc/Login/LoginPanel"
import PanelRegistrarse from "../../inc/PanelRegistrarse/PanelRegistrarse"

function Hero () {
    return(
        <Container fluid className={`${style.containerHero} `} >
        <Row className='mt-5'>
        <Col className='col-12 d-flex text-start text-uppercase align-text-center text-nowrap'>
            <h1 className='fw-bolder text-light display-5 fw'>
               Bienvenido a <span style={{ color: 'rgb(7,33,69)' }} className='fw-bolder spanText'>SoftVision</span>
            </h1>
        </Col>
        <Col className='col-12 text-start'>
              <h3 className='fw-semibold text-light'>
              Ofrecemos soluciones de software innovadoras y de calidad.
              </h3>
        </Col>
        <Col className='col-12 mt-4 d-flex justify-content-start mb-5'>
            <LoginPanel/>
        </Col>
        {/* <Col className='col-12 d-flex justify-content-center align-items-center'>
            <small className='text-light fw-semibold mb-2 p-2' style={{ position: 'absolute', bottom: '0', backgroundColor: 'rgba(11, 12, 13, 0.4)'}}> 
                You do not have an account? <PanelRegistrarse />
            </small>
        </Col> */}
        </Row>
      </Container>
    )
}


export default Hero;
