import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedPaymentRoute = ({ children }) => {
  const paymentInitiated = useSelector(state => state.payment?.initiated);
  
  if (!paymentInitiated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedPaymentRoute;