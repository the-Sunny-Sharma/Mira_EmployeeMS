import './App.css';
import { Link } from 'react-router-dom';

export default function Page404() {
  return (
    <>
      <div className="div-center">
        <h2 className="h-5">Oops!</h2>
        <p className="p-2">404 - PAGE NOT NOT FOUND</p>
        <p className="p-0">
          The page you are looking for might have been removed or had its name
          changed or its name changed or is temporarily unavailable.
        </p>
        <button className="n-btn"><Link to="/">GO TO HOMEPAGE</Link></button>
      </div>
    </>
  );
}
