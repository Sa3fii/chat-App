import { Link } from 'react-router-dom';
import './Page403.css';
import { Container } from 'react-bootstrap';

const Page403 = () => {
  
  return <Container className='page403'>
    <p>You're not authorized to access this page!</p>
    <Link to="/">Go home</Link>
  </Container>
};

export default Page403;