import { Link } from 'react-router-dom';
import '@/styles/error.css';

const ErrorPage = () => {
  return (
    <div id='oopss'>
      <div id='error-text'>
        <span>404</span>
        <p>PAGINA NO ENCONTRADA</p>
        <Link to={'/'} className=' back mt-12 '>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
