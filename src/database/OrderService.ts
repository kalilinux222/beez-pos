import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from './Firebase';

const DOC_NAME = 'Orders';
const ordersCollection = collection(db, DOC_NAME);

class OrderService {
  getAllOrders = () => {
    return getDocs(ordersCollection);
  };

  getOrder = (id: any) => {
    const document = doc(db, DOC_NAME, id);
    return getDoc(document);
  };
}

export default new OrderService();
