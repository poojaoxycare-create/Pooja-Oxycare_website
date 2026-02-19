
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { getRentedOrders } from '../api/api';

const Dashboard = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [rentedProducts, setRentedProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pendingOrdersList, setPendingOrdersList] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Fetch products
        const productsRes = await api.get('/products');
        setProductCount(productsRes.data.length);

        // Fetch orders (admin)
        const token = await getToken();
        const ordersRes = await api.get('/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const orders = ordersRes.data;
        const pending = orders.filter(o => o.orderStatus === 'pending');
        setPendingOrders(pending.length);
        setPendingOrdersList(pending);

        // Fetch accepted rented orders
        const rentedRes = await getRentedOrders(token);
        setRentedProducts(rentedRes.data.length);
      } catch (err) {
        setProductCount(0);
        setPendingOrders(0);
        setRentedProducts(0);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    // eslint-disable-next-line
  }, []);

  // Accept/reject handlers for dashboard orders
  const handleAccept = async (orderId) => {
    try {
      const token = await getToken();
      await api.post(`/orders/${orderId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh stats and pending orders
      setPendingOrdersList(list => list.filter(o => o._id !== orderId));
      setPendingOrders(n => n - 1);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to accept order');
    }
  };

  const handleReject = async (orderId) => {
    try {
      const token = await getToken();
      await api.post(`/orders/${orderId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPendingOrdersList(list => list.filter(o => o._id !== orderId));
      setPendingOrders(n => n - 1);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject order');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{loading ? '...' : productCount}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-sm text-gray-500">Pending Orders</div>
          <div className="text-2xl font-bold">{loading ? '...' : pendingOrders}</div>
        </div>

        <button
          onClick={() => navigate('/admin/rented-products')}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow text-left"
        >
          <div className="text-sm text-gray-500">Rented Products (Accepted)</div>
          <div className="text-2xl font-bold">{loading ? '...' : rentedProducts}</div>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Pending Orders</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading orders...</p>
        ) : pendingOrdersList.length === 0 ? (
          <p className="text-center text-gray-500">No pending orders</p>
        ) : (
          <div className="rounded shadow-sm overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="p-3 w-10"></th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrdersList.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr className="border-t text-sm hover:bg-gray-50">
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setExpandedOrderId(expandedOrderId === order._id ? null : order._id)}
                          className="text-blue-500 hover:text-blue-700 font-bold text-lg"
                          title={expandedOrderId === order._id ? "Hide details" : "Show details"}
                        >
                          {expandedOrderId === order._id ? '−' : '+'}
                        </button>
                      </td>
                      <td className="p-3 font-mono text-xs">{order._id.slice(-8)}</td>
                      <td className="p-3">{order.fullName}</td>
                      <td className="p-3">{order.userEmail}</td>
                      <td className="p-3">{order.productSnapshot?.productName || 'N/A'}</td>
                      <td className="p-3 capitalize">{order.orderType}</td>
                      <td className="p-3">₹{order.finalPrice}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleAccept(order._id)} className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                          Accept
                        </button>
                        <button onClick={() => handleReject(order._id)} className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                          Reject
                        </button>
                      </td>
                    </tr>
                    {expandedOrderId === order._id && (
                      <tr className="border-t bg-gray-50">
                        <td colSpan="9" className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Contact Information</h4>
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                  <span className="font-medium">Phone:</span> {order.phone}
                                </div>
                                <div>
                                  <span className="font-medium">Email:</span> {order.userEmail}
                                </div>
                              </div>
                            </div>
                            {/* Delivery Address */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Delivery Address</h4>
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>{order.addressLine1}</div>
                                <div>{order.city}, {order.state} - {order.pincode}</div>
                              </div>
                            </div>
                            {/* Product Details */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Product Details</h4>
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                  <span className="font-medium">Product:</span> {order.productSnapshot?.productName || 'N/A'}
                                </div>
                                <div>
                                  <span className="font-medium">Quantity:</span> {order.quantity}
                                </div>
                                <div>
                                  <span className="font-medium">Price per unit:</span> ₹{order.orderType === 'buy' ? order.productSnapshot?.buyPrice : order.productSnapshot?.rentPrice}
                                </div>
                              </div>
                            </div>
                            {/* Pricing & Payment */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Pricing & Payment</h4>
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                  <span className="font-medium">Total Amount:</span> ₹{order.finalPrice}
                                </div>
                                <div>
                                  <span className="font-medium">Payment Status:</span> <span className={`ml-1 px-2 py-1 rounded text-xs font-semibold ${
                                    order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {order.paymentStatus}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {/* Rental Details (if applicable) */}
                            {order.orderType === 'rent' && (
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Rental Details</h4>
                                <div className="space-y-2 text-sm text-gray-700">
                                  <div>
                                    <span className="font-medium">Start Date:</span> {order.rentStartDate ? new Date(order.rentStartDate).toLocaleDateString() : 'N/A'}
                                  </div>
                                  <div>
                                    <span className="font-medium">Duration:</span> {order.rentDays} days
                                  </div>
                                </div>
                              </div>
                            )}
                            {/* Order Timeline */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm">Order Timeline</h4>
                              <div className="space-y-2 text-sm text-gray-700">
                                <div>
                                  <span className="font-medium">Ordered:</span> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                {order.updatedAt !== order.createdAt && (
                                  <div>
                                    <span className="font-medium">Updated:</span> {new Date(order.updatedAt).toLocaleDateString()} {new Date(order.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
