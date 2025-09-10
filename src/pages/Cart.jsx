// // src/pages/Cart.jsx - Updated with responsive fixes
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/ui/Navbar';
// // import { Link } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext';
// // Add these imports at the top of your Cart.jsx file
// import { showNotification, sendBrowserNotification, setupPullToRefresh } from '../utils/notifications';

// const Cart = () => {
//   const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
//   const [showCheckoutModal, setShowCheckoutModal] = useState(false);
//   const [checkoutStep, setCheckoutStep] = useState('details'); // 'details', 'payment', 'success'
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [customerDetails, setCustomerDetails] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//     state: ''
//   });
//  const BACKEND_URL = process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5001'
//     : 'https://georgetech.onrender.com';

//   // Prevent background scrolling when modal is open
//   useEffect(() => {
//     if (showCheckoutModal) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
    
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [showCheckoutModal]);

//   // Setup pull-to-refresh
//   useEffect(() => {
//     const cleanup = setupPullToRefresh(() => {
//       showNotification('Refreshing cart...', 'info');
//       // Add any refresh logic here if needed
//     });

//     return cleanup;
//   }, []);

//   const formatNaira = (amount) => {
//     return `₦${Number(amount).toLocaleString('en-NG')}`;
//   };

//   const pageStyle = {
//     minHeight: '100vh',
//     backgroundColor: 'var(--color-bg-primary)',
//     overflowX: 'hidden' // Prevent horizontal scrolling on page
//   };

//   const contentStyle = {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: 'var(--spacing-md)',
//     boxSizing: 'border-box'
//   };

//   const shippingCost = 1500; // ₦1,500 shipping

//   const handleCheckout = () => {
//     setShowCheckoutModal(true);
//     setCheckoutStep('details');
//   };

//   const handleCustomerDetailsSubmit = async (e) => {
//     e.preventDefault();
//     setIsProcessing(true);

//     // Prepare order data
//     const orderData = {
//       items,
//       customerDetails,
//       subtotal: getCartTotal(),
//       shipping: shippingCost,
//       total: getCartTotal() + shippingCost,
//       orderDate: new Date().toLocaleString('en-NG'),
//       orderId: `GTS-${Date.now()}`
//     };

//     try {
//       // Send email notification (you'll need to implement this API endpoint)
//       // Change the fetch URL to point to your backend server
//       const response = await fetch(BACKEND_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         setCheckoutStep('payment');
//       } else {
//         throw new Error('Failed to process order');
//       }
//     } catch (error) {
//       console.error('Order processing error:', error);
//       alert('There was an error processing your order. Please try again.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handlePaymentConfirmation = () => {
//     setCheckoutStep('success');
//      // Show success notifications
//   showNotification('Order placed successfully! 🎉', 'success');
//   sendBrowserNotification('Order Confirmed', {
//     body: 'Your order has been received successfully!',
//   });
    
//     // Clear cart after successful order

//     setTimeout(() => {
//       clearCart();
//       setShowCheckoutModal(false);
//       setCheckoutStep('details');
//     }, 5000);
//   };

//   const closeModal = () => {
//     setShowCheckoutModal(false);
//     setCheckoutStep('details');
//   };

//   if (items.length === 0) {
//     return (
//       <div style={pageStyle} className='font-[Orbitron]'>
//         <Navbar />
//         <div style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
//           <h2 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
//             Your cart is empty
//           </h2>
//           <a 
//             href="/products" 
//             style={{
//               color: 'var(--color-primary)',
//               textDecoration: 'underline'
//             }}
//           >
//             Continue shopping
//           </a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={pageStyle} className='font-[Orbitron]'>
//       <Navbar />
      
//       <div style={contentStyle}>
//         <h1 style={{ 
//           fontSize: '2rem', 
//           fontWeight: 'bold',
//           color: 'var(--color-text-primary)',
//           margin: 'var(--spacing-xl) 0',
//           textAlign: 'center'
//         }}>
//           Shopping Cart
//         </h1>

//         <div style={{ 
//           display: 'grid', 
//           gridTemplateColumns: '1fr',
//           gap: 'var(--spacing-xl)'
//         }}>
//           {/* Cart Items */}
//           <div>
//             {items.map(item => (
//               <div key={`${item.id}-${item.variant}`} style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: 'var(--spacing-md)',
//                 padding: 'var(--spacing-md)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: 'var(--radius-md)',
//                 marginBottom: 'var(--spacing-md)',
//                 backgroundColor: 'var(--color-bg-primary)',
//                 boxSizing: 'border-box'
//               }}>
//                 <div style={{
//                   display: 'flex',
//                   gap: 'var(--spacing-md)',
//                   alignItems: 'flex-start'
//                 }}>
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     style={{
//                       width: '80px',
//                       height: '80px',
//                       minWidth: '80px',
//                       objectFit: 'cover',
//                       borderRadius: 'var(--radius-md)'
//                     }}
//                   />
                  
//                   <div style={{ flex: 1, minWidth: 0 }}> {/* Added minWidth: 0 to prevent overflow */}
//                     <h3 style={{ 
//                       fontWeight: '600',
//                       color: 'var(--color-text-primary)',
//                       marginBottom: 'var(--spacing-sm)',
//                       fontSize: '1rem',
//                       wordBreak: 'break-word' // Prevent long text from overflowing
//                     }}>
//                       {item.name}
//                     </h3>
//                     {item.variant && (
//                       <p style={{ 
//                         color: 'var(--color-text-secondary)',
//                         marginBottom: 'var(--spacing-sm)',
//                         fontSize: '0.875rem',
//                         wordBreak: 'break-word'
//                       }}>
//                         Variant: {item.variant}
//                       </p>
//                     )}
//                     <p style={{ 
//                       fontWeight: 'bold',
//                       color: 'var(--color-primary)',
//                       fontSize: '1.125rem'
//                     }}>
//                       {formatNaira(item.price)}
//                     </p>
//                   </div>
//                 </div>

//                 <div style={{ 
//                   display: 'flex', 
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   gap: 'var(--spacing-md)',
//                   paddingTop: 'var(--spacing-sm)',
//                   borderTop: '1px solid var(--color-border)',
//                   flexWrap: 'wrap' // Allow wrapping on small screens
//                 }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
//                       style={{
//                         padding: 'var(--spacing-sm)',
//                         border: '1px solid var(--color-border)',
//                         backgroundColor: 'var(--color-bg-primary)',
//                         color: 'var(--color-text-primary)',
//                         cursor: 'pointer',
//                         minWidth: '32px',
//                         height: '32px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}
//                     >
//                       -
//                     </button>
//                     <span style={{ 
//                       padding: 'var(--spacing-sm) var(--spacing-md)',
//                       borderTop: '1px solid var(--color-border)',
//                       borderBottom: '1px solid var(--color-border)',
//                       color: 'var(--color-text-primary)',
//                       minWidth: '40px',
//                       textAlign: 'center',
//                       height: '32px',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}>
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
//                       style={{
//                         padding: 'var(--spacing-sm)',
//                         border: '1px solid var(--color-border)',
//                         backgroundColor: 'var(--color-bg-primary)',
//                         color: 'var(--color-text-primary)',
//                         cursor: 'pointer',
//                         minWidth: '32px',
//                         height: '32px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => {
//                       removeFromCart(item.id, item.variant);
//                       showNotification(`${item.name} removed from cart`, 'info');
//                     }}
//                     style={{
//                       padding: 'var(--spacing-sm) var(--spacing-md)',
//                       backgroundColor: '#dc2626',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: 'var(--radius-md)',
//                       cursor: 'pointer',
//                       fontSize: '0.875rem',
//                       minHeight: '32px'
//                     }}
//                   >
//                     Remove
//                   </button>

//                 </div>

//                 <div style={{
//                   textAlign: 'right',
//                   color: 'var(--color-text-secondary)',
//                   fontSize: '0.875rem'
//                 }}>
//                   Subtotal: <span style={{ 
//                     fontWeight: 'bold',
//                     color: 'var(--color-primary)'
//                   }}>
//                     {formatNaira(item.price * item.quantity)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div style={{
//             padding: 'var(--spacing-lg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: 'var(--radius-lg)',
//             backgroundColor: 'var(--color-bg-primary)',
//             boxSizing: 'border-box'
//           }}>
//             <h2 style={{ 
//               fontSize: '1.5rem',
//               fontWeight: 'bold',
//               color: 'var(--color-text-primary)',
//               marginBottom: 'var(--spacing-lg)'
//             }}>
//               Order Summary
//             </h2>

//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between',
//               marginBottom: 'var(--spacing-md)'
//             }}>
//               <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal:</span>
//               <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
//                 {formatNaira(getCartTotal())}
//               </span>
//             </div>

//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between',
//               marginBottom: 'var(--spacing-md)'
//             }}>
//               <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
//               <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
//                 {formatNaira(shippingCost)}
//               </span>
//             </div>

//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between',
//               marginBottom: 'var(--spacing-lg)',
//               paddingTop: 'var(--spacing-md)',
//               borderTop: '1px solid var(--color-border)'
//             }}>
//               <span style={{ color: 'var(--color-text-secondary)' }}>Total:</span>
//               <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.25rem' }}>
//                 {formatNaira(getCartTotal() + shippingCost)}
//               </span>
//             </div>

//             <button
//               onClick={handleCheckout}
//               style={{
//                 width: '100%',
//                 padding: 'var(--spacing-md)',
//                 backgroundColor: 'var(--color-primary)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: 'var(--radius-md)',
//                 cursor: 'pointer',
//                 fontWeight: '600',
//                 fontSize: '1.125rem'
//               }}
//             >
//               Proceed to Checkout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Checkout Modal */}
//       {showCheckoutModal && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: 'rgba(0,0,0,0.8)',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           zIndex: 1000,
//           padding: 'var(--spacing-md)',
//           boxSizing: 'border-box',
//           overflow: 'hidden'
//         }}>
//           <div style={{
//             backgroundColor: 'var(--color-bg-primary)',
//             borderRadius: 'var(--radius-lg)',
//             maxWidth: '600px',
//             width: '100%',
//             maxHeight: '90vh',
//             overflow: 'auto',
//             position: 'relative',
//             boxSizing: 'border-box',
//             WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
//           }}>
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               style={{
//                 position: 'absolute',
//                 top: 'var(--spacing-md)',
//                 right: 'var(--spacing-md)',
//                 background: 'none',
//                 border: 'none',
//                 fontSize: '1.5rem',
//                 cursor: 'pointer',
//                 color: 'var(--color-text-secondary)',
//                 zIndex: 1001,
//                 width: '40px',
//                 height: '40px',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//             >
//               ×
//             </button>

//             {/* Customer Details Step */}
//             {checkoutStep === 'details' && (
//               <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
//                 <h2 style={{ 
//                   marginBottom: 'var(--spacing-lg)',
//                   color: 'var(--color-text-primary)',
//                   fontSize: '1.5rem',
//                   textAlign: 'center'
//                 }}>
//                   Customer Details
//                 </h2>
                
//                 <form onSubmit={handleCustomerDetailsSubmit}>
//                   <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
//                     <input
//                       type="text"
//                       placeholder="Full Name *"
//                       value={customerDetails.name}
//                       onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
//                       required
//                       style={{
//                         padding: 'var(--spacing-md)',
//                         border: '1px solid var(--color-border)',
//                         borderRadius: 'var(--radius-md)',
//                         fontSize: '1rem',
//                         width: '100%',
//                         boxSizing: 'border-box'
//                       }}
//                     />
                    
//                     <input
//                       type="email"
//                       placeholder="Email Address *"
//                       value={customerDetails.email}
//                       onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
//                       required
//                       style={{
//                         padding: 'var(--spacing-md)',
//                         border: '1px solid var(--color-border)',
//                         borderRadius: 'var(--radius-md)',
//                         fontSize: '1rem',
//                         width: '100%',
//                         boxSizing: 'border-box'
//                       }}
//                     />
                    
//                     <input
//                       type="tel"
//                       placeholder="Phone Number *"
//                       value={customerDetails.phone}
//                       onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
//                       required
//                       style={{
//                         padding: 'var(--spacing-md)',
//                         border: '1px solid var(--color-border)',
//                         borderRadius: 'var(--radius-md)',
//                         fontSize: '1rem',
//                         width: '100%',
//                         boxSizing: 'border-box'
//                       }}
//                     />
                    
//                     <textarea
//                       placeholder="Delivery Address *"
//                       value={customerDetails.address}
//                       onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
//                       required
//                       rows={3}
//                       style={{
//                         padding: 'var(--spacing-md)',
//                         border: '1px solid var(--color-border)',
//                         borderRadius: 'var(--radius-md)',
//                         fontSize: '1rem',
//                         fontFamily: 'inherit',
//                         resize: 'vertical',
//                         width: '100%',
//                         boxSizing: 'border-box'
//                       }}
//                     />
                    
//                     <div style={{ 
//                       display: 'grid', 
//                       gridTemplateColumns: '1fr',
//                       gap: 'var(--spacing-md)',
//                       '@media (min-width: 480px)': {
//                         gridTemplateColumns: '1fr 1fr'
//                       }
//                     }}>
//                       <input
//                         type="text"
//                         placeholder="City *"
//                         value={customerDetails.city}
//                         onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
//                         required
//                         style={{
//                           padding: 'var(--spacing-md)',
//                           border: '1px solid var(--color-border)',
//                           borderRadius: 'var(--radius-md)',
//                           fontSize: '1rem',
//                           width: '100%',
//                           boxSizing: 'border-box'
//                         }}
//                       />
                      
//                       <input
//                         type="text"
//                         placeholder="State *"
//                         value={customerDetails.state}
//                         onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
//                         required
//                         style={{
//                           padding: 'var(--spacing-md)',
//                           border: '1px solid var(--color-border)',
//                           borderRadius: 'var(--radius-md)',
//                           fontSize: '1rem',
//                           width: '100%',
//                           boxSizing: 'border-box'
//                         }}
//                       />
//                     </div>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={isProcessing}
//                     style={{
//                       width: '100%',
//                       padding: 'var(--spacing-md)',
//                       marginTop: 'var(--spacing-lg)',
//                       backgroundColor: isProcessing ? 'var(--color-secondary)' : 'var(--color-primary)',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: 'var(--radius-md)',
//                       cursor: isProcessing ? 'not-allowed' : 'pointer',
//                       fontWeight: '600',
//                       fontSize: '1.125rem',
//                       boxSizing: 'border-box'
//                     }}
//                   >
//                     {isProcessing ? 'Processing...' : 'Continue to Payment'}
//                   </button>
//                 </form>
//               </div>
//             )}

//             {/* Payment Step */}
//             {checkoutStep === 'payment' && (
//               <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
//                 <h2 style={{ 
//                   marginBottom: 'var(--spacing-lg)',
//                   color: 'var(--color-text-primary)',
//                   fontSize: '1.5rem',
//                   textAlign: 'center'
//                 }}>
//                   Payment Information
//                 </h2>
                
//                 <div style={{
//                   backgroundColor: 'var(--color-bg-secondary)',
//                   padding: 'var(--spacing-lg)',
//                   borderRadius: 'var(--radius-md)',
//                   marginBottom: 'var(--spacing-lg)',
//                   boxSizing: 'border-box'
//                 }}>
//                   <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Bank Transfer Details</h3>
                  
//                   <div style={{ marginBottom: 'var(--spacing-md)' }}>
//                     <strong>Bank:</strong> First Bank Nigeria
//                   </div>
//                   <div style={{ marginBottom: 'var(--spacing-md)' }}>
//                     <strong>Account Name:</strong> George Tech Stores Ltd
//                   </div>
//                   <div style={{ marginBottom: 'var(--spacing-md)' }}>
//                     <strong>Account Number:</strong> 1234567890
//                   </div>
//                   <div style={{ marginBottom: 'var(--spacing-md)' }}>
//                     <strong>Amount:</strong> {formatNaira(getCartTotal() + shippingCost)}
//                   </div>
                  
//                   <div style={{
//                     backgroundColor: '#fef3cd',
//                     border: '1px solid #fbbf24',
//                     borderRadius: 'var(--radius-sm)',
//                     padding: 'var(--spacing-md)',
//                     marginTop: 'var(--spacing-md)',
//                     fontSize: '0.9rem'
//                   }}>
//                     <strong>Important:</strong> Please use your order reference as transfer description. 
//                     We will process your order once payment is confirmed.
//                   </div>
//                 </div>

//                 <button
//                   onClick={handlePaymentConfirmation}
//                   style={{
//                     width: '100%',
//                     padding: 'var(--spacing-md)',
//                     backgroundColor: '#10b981',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: 'var(--radius-md)',
//                     cursor: 'pointer',
//                     fontWeight: '600',
//                     fontSize: '1.125rem',
//                     boxSizing: 'border-box'
//                   }}
//                 >
//                   I Have Made Payment
//                 </button>
//               </div>
//             )}

//             {/* Success Step */}
//             {checkoutStep === 'success' && (
//               <div style={{ 
//                 padding: 'var(--spacing-xl) var(--spacing-md)',
//                 textAlign: 'center'
//               }}>
//                 <div style={{
//                   fontSize: '4rem',
//                   color: '#10b981',
//                   marginBottom: 'var(--spacing-lg)'
//                 }}>
//                   ✓
//                 </div>
                
//                 <h2 style={{ 
//                   marginBottom: 'var(--spacing-lg)',
//                   color: 'var(--color-text-primary)',
//                   fontSize: '1.5rem'
//                 }}>
//                   Order Submitted Successfully!
//                 </h2>
                
//                 <p style={{ 
//                   marginBottom: 'var(--spacing-lg)',
//                   color: 'var(--color-text-secondary)'
//                 }}>
//                   Thank you for your order! We have sent a confirmation email with all the details. 
//                   We will contact you once payment is verified.
//                 </p>
                
//                 <p style={{ color: 'var(--color-text-secondary)' }}>
//                   This window will close automatically in 5 seconds...
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


// src/pages/Cart.jsx - Updated with PWA features
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { 
  showNotification, 
  sendBrowserNotification, 
  setupPullToRefresh,
  setBadgeCount,
  clearBadge,
  requestNotificationPermission
} from '../utils/notifications';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('details'); // 'details', 'payment', 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: ''
  });
  
  const BACKEND_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : 'https://georgetech.onrender.com';

  // Update badge count when cart items change
  useEffect(() => {
    if (items.length > 0) {
      setBadgeCount(items.reduce((total, item) => total + item.quantity, 0));
    } else {
      clearBadge();
    }
  }, [items]);

  // Request notification permission on component mount
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Send periodic notifications (every 2 hours)
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (items.length > 0 && Notification.permission === 'granted') {
        sendBrowserNotification('George Tech Stores', {
          body: `You have ${items.length} items in your cart waiting for you!`,
          icon: '/logo192.png',
          badge: '/logo192.png',
          tag: 'cart-reminder'
        });
      }
    }, 2 * 60 * 60 * 1000); // 2 hours

    return () => clearInterval(notificationInterval);
  }, [items]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showCheckoutModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCheckoutModal]);

  // Setup pull-to-refresh
  useEffect(() => {
    const cleanup = setupPullToRefresh(() => {
      showNotification('Refreshing cart...', 'info');
      // Add any refresh logic here if needed
    });

    return cleanup;
  }, []);

  const formatNaira = (amount) => {
    return `₦${Number(amount).toLocaleString('en-NG')}`;
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)',
    overflowX: 'hidden' // Prevent horizontal scrolling on page
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-md)',
    boxSizing: 'border-box'
  };

  const shippingCost = 1500; // ₦1,500 shipping

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    setCheckoutStep('details');
    
    // Send notification about checkout process
    if (Notification.permission === 'granted') {
      sendBrowserNotification('Checkout Started', {
        body: 'Your order is being processed. Complete your purchase!',
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'checkout-started'
      });
    }
  };

  // const handleCustomerDetailsSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsProcessing(true);

  //   // Prepare order data
  //   const orderData = {
  //     items,
  //     customerDetails,
  //     subtotal: getCartTotal(),
  //     shipping: shippingCost,
  //     total: getCartTotal() + shippingCost,
  //     orderDate: new Date().toLocaleString('en-NG'),
  //     orderId: `GTS-${Date.now()}`
  //   };

  //   try {
  //     // Send email notification (you'll need to implement this API endpoint)
  //     // Change the fetch URL to point to your backend server
  //     const response = await fetch(BACKEND_URL, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderData),
  //     });

  //     if (response.ok) {
  //       setCheckoutStep('payment');
        
  //       // Send payment notification
  //       if (Notification.permission === 'granted') {
  //         sendBrowserNotification('Payment Details', {
  //           body: 'Please complete your payment to finalize your order',
  //           icon: '/logo192.png',
  //           badge: '/logo192.png',
  //           tag: 'payment-details'
  //         });
  //       }
  //     } else {
  //       throw new Error('Failed to process order');
  //     }
  //   } catch (error) {
  //     console.error('Order processing error:', error);
  //     showNotification('There was an error processing your order. Please try again.', 'error');
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleCustomerDetailsSubmit = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  // Prepare order data
  const orderData = {
    items,
    customerDetails,
    subtotal: getCartTotal(),
    shipping: shippingCost,
    total: getCartTotal() + shippingCost,
    orderDate: new Date().toLocaleString('en-NG'),
    orderId: `GTS-${Date.now()}`
  };

  try {
    // Send email notification - CORRECTED ENDPOINT
    const response = await fetch(`${BACKEND_URL}/api/orders/send-order-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();
    
    if (response.ok) {
      setCheckoutStep('payment');
      showNotification('Order details submitted successfully!', 'success');
    } else {
      throw new Error(result.message || 'Failed to process order');
    }
  } catch (error) {
    console.error('Order processing error:', error);
    showNotification(error.message || 'There was an error processing your order. Please try again.', 'error');
  } finally {
    setIsProcessing(false);
  }
};

  const handlePaymentConfirmation = () => {
    setCheckoutStep('success');
    
    // Show success notifications
    showNotification('Order placed successfully! 🎉', 'success');
    
    if (Notification.permission === 'granted') {
      sendBrowserNotification('Order Confirmed', {
        body: 'Your order has been received successfully!',
        icon: '/logo192.png',
        badge: '/logo192.png',
        tag: 'order-confirmed'
      });
    }
    
    // Clear cart after successful order and reset badge
    setTimeout(() => {
      clearCart();
      clearBadge();
      setShowCheckoutModal(false);
      setCheckoutStep('details');
    }, 5000);
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    setCheckoutStep('details');
  };

  // Add to Home Screen functionality
  const promptToInstall = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          showNotification('George Tech Stores added to your home screen!', 'success');
        }
        window.deferredPrompt = null;
      });
    }
  };

  // Check if the app is running in standalone mode (installed)
  const isRunningStandalone = () => {
    return (window.matchMedia('(display-mode: standalone)').matches) || 
           (window.navigator.standalone) || 
           (document.referrer.includes('android-app://'));
  };

  if (items.length === 0) {
    return (
      <div style={pageStyle} className='font-[Orbitron]'>
        <Navbar />
        <div style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-md)' }}>
            Your cart is empty
          </h2>
          {/* <a 
            href="/products" 
            style={{
              color: 'var(--color-primary)',
              textDecoration: 'underline'
            }}
          >
            Continue shopping
          </a>
           */}
           <Link 
  to="/products" 
  className="text-[#FF4500] dark:text-[#ff6128] px-8 py-3 rounded-lg font-semibold relative inline-block
             underline decoration-[#FF4500] dark:decoration-[#ff6128]
             transition transform hover:scale-105
             hover:no-underline
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:w-0 after:h-[2px] after:bg-[#FF4500] dark:after:bg-[#ff6128] 
             after:transition-all after:duration-300 
             hover:after:w-full"
>
  Continue shopping
</Link>

          {/* Add to Home Screen Prompt */}
          {window.deferredPrompt && !isRunningStandalone() && (
            <div style={{
              marginTop: 'var(--spacing-xl)',
              padding: 'var(--spacing-md)',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}>
              <p style={{ marginBottom: 'var(--spacing-md)' }}>
                Install our app for a better shopping experience!
              </p>
              <button
                onClick={promptToInstall}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                Add to Home Screen
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle} className='font-[Orbitron]'>
      <Navbar />
      
      <div style={contentStyle}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold',
          color: 'var(--color-text-primary)',
          margin: 'var(--spacing-xl) 0',
          textAlign: 'center'
        }}>
          Shopping Cart
        </h1>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: 'var(--spacing-xl)'
        }}>
          {/* Cart Items */}
          <div>
            {items.map(item => (
              <div key={`${item.id}-${item.variant}`} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-md)',
                backgroundColor: 'var(--color-bg-primary)',
                boxSizing: 'border-box'
              }}>
                <div style={{
                  display: 'flex',
                  gap: 'var(--spacing-md)',
                  alignItems: 'flex-start'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      minWidth: '80px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  
                  <div style={{ flex: 1, minWidth: 0 }}> {/* Added minWidth: 0 to prevent overflow */}
                    <h3 style={{ 
                      fontWeight: '600',
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '1rem',
                      wordBreak: 'break-word' // Prevent long text from overflowing
                    }}>
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p style={{ 
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '0.875rem',
                        wordBreak: 'break-word'
                      }}>
                        Variant: {item.variant}
                      </p>
                    )}
                    <p style={{ 
                      fontWeight: 'bold',
                      color: 'var(--color-primary)',
                      fontSize: '1.125rem'
                    }}>
                      {formatNaira(item.price)}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  paddingTop: 'var(--spacing-sm)',
                  borderTop: '1px solid var(--color-border)',
                  flexWrap: 'wrap' // Allow wrapping on small screens
                }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer',
                        minWidth: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      minWidth: '40px',
                      textAlign: 'center',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer',
                        minWidth: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.id, item.variant);
                      showNotification(`${item.name} removed from cart`, 'info');
                    }}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      minHeight: '32px'
                    }}
                  >
                    Remove
                  </button>

                </div>

                <div style={{
                  textAlign: 'right',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.875rem'
                }}>
                  Subtotal: <span style={{ 
                    fontWeight: 'bold',
                    color: 'var(--color-primary)'
                  }}>
                    {formatNaira(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            padding: 'var(--spacing-lg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-bg-primary)',
            boxSizing: 'border-box'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-lg)'
            }}>
              Order Summary
            </h2>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Subtotal:</span>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {formatNaira(getCartTotal())}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {formatNaira(shippingCost)}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-lg)',
              paddingTop: 'var(--spacing-md)',
              borderTop: '1px solid var(--color-border)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Total:</span>
              <span style={{ fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '1.25rem' }}>
                {formatNaira(getCartTotal() + shippingCost)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.125rem'
              }}
            >
              Proceed to Checkout
            </button>
            
            {/* Add to Home Screen Prompt */}
            {window.deferredPrompt && !isRunningStandalone() && (
              <div style={{
                marginTop: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                textAlign: 'center'
              }}>
                <p style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.9rem' }}>
                  Install our app for a better shopping experience!
                </p>
                <button
                  onClick={promptToInstall}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Add to Home Screen
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: 'var(--spacing-md)',
          boxSizing: 'border-box',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg-primary)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            boxSizing: 'border-box',
            WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
          }}>
            {/* Close button */}
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 'var(--spacing-md)',
                right: 'var(--spacing-md)',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                zIndex: 1001,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ×
            </button>

            {/* Customer Details Step */}
            {checkoutStep === 'details' && (
              <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
                <h2 style={{ 
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}>
                  Customer Details
                </h2>
                
                <form onSubmit={handleCustomerDetailsSubmit}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                    <input
                      type="text"
                      placeholder="Full Name *"
                      value={customerDetails.name}
                      onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                      required
                      style={{
                        padding: 'var(--spacing-md)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      required
                      style={{
                        padding: 'var(--spacing-md)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      required
                      style={{
                        padding: 'var(--spacing-md)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    
                    <textarea
                      placeholder="Delivery Address *"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      required
                      rows={3}
                      style={{
                        padding: 'var(--spacing-md)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}
                    />
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr',
                      gap: 'var(--spacing-md)',
                      '@media (min-width: 480px)': {
                        gridTemplateColumns: '1fr 1fr'
                      }
                    }}>
                      <input
                        type="text"
                        placeholder="City *"
                        value={customerDetails.city}
                        onChange={(e) => setCustomerDetails({...customerDetails, city: e.target.value})}
                        required
                        style={{
                          padding: 'var(--spacing-md)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                      
                      <input
                        type="text"
                        placeholder="State *"
                        value={customerDetails.state}
                        onChange={(e) => setCustomerDetails({...customerDetails, state: e.target.value})}
                        required
                        style={{
                          padding: 'var(--spacing-md)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '1rem',
                          width: '100%',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isProcessing}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      marginTop: 'var(--spacing-lg)',
                      backgroundColor: isProcessing ? 'var(--color-secondary)' : 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      fontWeight: '600',
                      fontSize: '1.125rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    {isProcessing ? 'Processing...' : 'Continue to Payment'}
                  </button>
                </form>
              </div>
            )}

            {/* Payment Step */}
            {/* {checkoutStep === 'payment' && (
              <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
                <h2 style={{ 
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.5rem',
                  textAlign: 'center'
                }}>
                  Payment Information
                </h2>
                
                <div style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  padding: 'var(--spacing-lg)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--spacing-lg)',
                  boxSizing: 'border-box'
                }}>
                  <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Bank Transfer Details</h3>
                  
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <strong>Bank:</strong> First Bank Nigeria
                  </div>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <strong>Account Name:</strong> George Tech Stores Ltd
                  </div>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <strong>Account Number:</strong> 1234567890
                  </div>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <strong>Amount:</strong> {formatNaira(getCartTotal() + shippingCost)}
                  </div>
                  
                  <div style={{
                    backgroundColor: '#fef3cd',
                    border: '1px solid #fbbf24',
                    borderRadius: 'var(--radius-sm)',
                    padding: 'var(--spacing-md)',
                    marginTop: 'var(--spacing-md)',
                    fontSize: '0.9rem'
                  }}>
                    <strong>Important:</strong> Please use your order reference as transfer description. 
                    We will process your order once payment is confirmed.
                  </div>
                </div>

                <button
                  onClick={handlePaymentConfirmation}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1.125rem',
                    boxSizing: 'border-box'
                  }}
                >
                  I Have Made Payment
                </button>
              </div>
            )} */}

            {/* // Payment Step with multiple options */}
{checkoutStep === 'payment' && (
  <div style={{ padding: 'var(--spacing-xl) var(--spacing-md)' }}>
    <h2 style={{ 
      marginBottom: 'var(--spacing-lg)',
      color: 'var(--color-text-primary)',
      fontSize: '1.5rem',
      textAlign: 'center'
    }}>
      Choose Payment Method
    </h2>
    
    {/* Payment Method Selection */}
    <div style={{ marginBottom: 'var(--spacing-lg)' }}>
      <div style={{
        padding: 'var(--spacing-md)',
        border: '2px solid var(--color-primary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--spacing-md)',
        cursor: 'pointer'
      }}>
        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💰 Bank Transfer</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Transfer to our bank account
        </p>
      </div>
      
      <div style={{
        padding: 'var(--spacing-md)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--spacing-md)',
        cursor: 'pointer',
        opacity: 0.6
      }}>
        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>💳 Card Payment (Coming Soon)</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Pay securely with your debit/credit card
        </p>
      </div>
      
      <div style={{
        padding: 'var(--spacing-md)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--spacing-md)',
        cursor: 'pointer',
        opacity: 0.6
      }}>
        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>📱 USSD (Coming Soon)</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
          Pay using USSD code
        </p>
      </div>
    </div>

    {/* Bank Transfer Details */}
    <div style={{
      backgroundColor: 'var(--color-bg-secondary)',
      padding: 'var(--spacing-lg)',
      borderRadius: 'var(--radius-md)',
      marginBottom: 'var(--spacing-lg)',
      boxSizing: 'border-box'
    }}>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Bank Transfer Details</h3>
      
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <strong>Bank:</strong> First Bank Nigeria
      </div>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <strong>Account Name:</strong> George Tech Stores Ltd
      </div>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <strong>Account Number:</strong> 1234567890
      </div>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <strong>Amount:</strong> {formatNaira(getCartTotal() + shippingCost)}
      </div>
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <strong>Reference:</strong> {`GTS-${Date.now()}`}
      </div>
      
      {/* Receipt Upload Section */}
      <div style={{ marginTop: 'var(--spacing-lg)' }}>
        <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Upload Payment Receipt</h4>
        <input
          type="file"
          accept="image/*,.pdf"
          style={{
            width: '100%',
            padding: 'var(--spacing-sm)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-sm)'
          }}
        />
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          Upload a screenshot or photo of your payment confirmation
        </p>
      </div>
      
      <div style={{
        backgroundColor: '#fef3cd',
        border: '1px solid #fbbf24',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--spacing-md)',
        marginTop: 'var(--spacing-md)',
        fontSize: '0.9rem'
      }}>
        <strong>Important:</strong> Please use the order reference above as your transfer description.
        We will process your order once payment is confirmed.
      </div>
    </div>

    <button
      onClick={handlePaymentConfirmation}
      style={{
        width: '100%',
        padding: 'var(--spacing-md)',
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '1.125rem',
        boxSizing: 'border-box'
      }}
    >
      I Have Made Payment
    </button>
  </div>
)}
            {/* Success Step */}
            {checkoutStep === 'success' && (
              <div style={{ 
                padding: 'var(--spacing-xl) var(--spacing-md)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '4rem',
                  color: '#10b981',
                  marginBottom: 'var(--spacing-lg)'
                }}>
                  ✓
                </div>
                
                <h2 style={{ 
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-text-primary)',
                  fontSize: '1.5rem'
                }}>
                  Order Submitted Successfully!
                </h2>
                
                <p style={{ 
                  marginBottom: 'var(--spacing-lg)',
                  color: 'var(--color-text-secondary)'
                }}>
                  Thank you for your order! We have sent a confirmation email with all the details. 
                  We will contact you once payment is verified.
                </p>
                
                <p style={{ color: 'var(--color-text-secondary)' }}>
                  This window will close automatically in 5 seconds...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;