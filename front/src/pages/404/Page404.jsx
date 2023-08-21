import { Link } from 'react-router-dom';
import './Page404.css';
import { Container } from 'react-bootstrap';

const Page404 = () => {
  
  return <Container className='page404'>
    <p>It looks like you're lost!</p>
    <Link to="/">Go home</Link>
  </Container>
};

export default Page404;