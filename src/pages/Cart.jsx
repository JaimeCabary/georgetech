// // src/pages/Cart.jsx
// import React from 'react';
// import Navbar from '../components/ui/Navbar';
// import { useCart } from '../contexts/CartContext';

// const Cart = () => {
//   const { items, updateQuantity, removeFromCart, getCartTotal } = useCart();

//   const pageStyle = {
//     minHeight: '100vh',
//     backgroundColor: 'var(--color-bg-primary)'
//   };

//   const contentStyle = {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: 'var(--spacing-md)'
//   };

//   if (items.length === 0) {
//     return (
//       <div style={pageStyle}>
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
//     <div style={pageStyle}>
//       <Navbar />
      
//       <div style={contentStyle}>
//         <h1 style={{ 
//           fontSize: '2.25rem', 
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
//                 display: 'grid',
//                 gridTemplateColumns: '100px 1fr auto',
//                 gap: 'var(--spacing-md)',
//                 alignItems: 'center',
//                 padding: 'var(--spacing-md)',
//                 border: '1px solid var(--color-border)',
//                 borderRadius: 'var(--radius-md)',
//                 marginBottom: 'var(--spacing-md)',
//                 backgroundColor: 'var(--color-bg-primary)'
//               }}>
//                 <img 
//                   src={item.image} 
//                   alt={item.name}
//                   style={{
//                     width: '100px',
//                     height: '100px',
//                     objectFit: 'cover',
//                     borderRadius: 'var(--radius-md)'
//                   }}
//                 />
                
//                 <div>
//                   <h3 style={{ 
//                     fontWeight: '600',
//                     color: 'var(--color-text-primary)',
//                     marginBottom: 'var(--spacing-sm)'
//                   }}>
//                     {item.name}
//                   </h3>
//                   {item.variant && (
//                     <p style={{ 
//                       color: 'var(--color-text-secondary)',
//                       marginBottom: 'var(--spacing-sm)'
//                     }}>
//                       Variant: {item.variant}
//                     </p>
//                   )}
//                   <p style={{ 
//                     fontWeight: 'bold',
//                     color: 'var(--color-primary)'
//                   }}>
//                     ${item.price}
//                   </p>
//                 </div>

//                 <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
//                   <div style={{ display: 'flex', alignItems: 'center' }}>
//                     <button
//                       onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
//                       style={{
//                         padding: 'var(--spacing-sm)',
//                         border: '1px solid var(--color-border)',
//                         backgroundColor: 'var(--color-bg-primary)',
//                         color: 'var(--color-text-primary)',
//                         cursor: 'pointer'
//                       }}
//                     >
//                       -
//                     </button>
//                     <span style={{ 
//                       padding: 'var(--spacing-sm) var(--spacing-md)',
//                       borderTop: '1px solid var(--color-border)',
//                       borderBottom: '1px solid var(--color-border)',
//                       color: 'var(--color-text-primary)'
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
//                         cursor: 'pointer'
//                       }}
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item.id, item.variant)}
//                     style={{
//                       padding: 'var(--spacing-sm) var(--spacing-md)',
//                       backgroundColor: '#dc2626',
//                       color: 'white',
//                       border: 'none',
//                       borderRadius: 'var(--radius-md)',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div style={{
//             padding: 'var(--spacing-lg)',
//             border: '1px solid var(--color-border)',
//             borderRadius: 'var(--radius-lg)',
//             backgroundColor: 'var(--color-bg-primary)'
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
//                 ${getCartTotal().toFixed(2)}
//               </span>
//             </div>

//             <div style={{ 
//               display: 'flex', 
//               justifyContent: 'space-between',
//               marginBottom: 'var(--spacing-md)'
//             }}>
//               <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
//               <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>$10.00</span>
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
//                 ${(getCartTotal() + 10).toFixed(2)}
//               </span>
//             </div>

//             <button
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
//     </div>
//   );
// };

// export default Cart;
// src/pages/Cart.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import { useCart } from '../contexts/CartContext';
import { featuredProducts } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Get suggested products from existing products
  useEffect(() => {
    // Filter out products that are already in the cart
    const cartProductIds = items.map(item => item.id);
    const availableSuggestions = featuredProducts.filter(
      product => !cartProductIds.includes(product.id)
    );
    
    // Select specific products: PS5, S25, and two others
    const ps5 = availableSuggestions.find(p => p.name.includes('PlayStation 5'));
    const s25 = availableSuggestions.find(p => p.name.includes('Samsung Galaxy S25'));
    
    // Get two other random products (excluding PS5 and S25 if found)
    const otherProducts = availableSuggestions.filter(
      p => p !== ps5 && p !== s25
    ).slice(0, 2);
    
    // Combine all suggested products
    const suggestions = [];
    if (ps5) suggestions.push(ps5);
    if (s25) suggestions.push(s25);
    suggestions.push(...otherProducts);
    
    setSuggestedProducts(suggestions);
  }, [items]);

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-md)'
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(0.1); // 10% discount
      alert('Coupon applied! 10% discount added.');
    } else {
      alert('Invalid coupon code. Try "SAVE10" for a 10% discount.');
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      setIsProcessing(false);
    }, 1500);
  };

  const confirmRemove = (item) => {
    setItemToRemove(item);
    setShowConfirmation(true);
  };

  const handleRemove = () => {
    removeFromCart(itemToRemove.id, itemToRemove.variant);
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const cancelRemove = () => {
    setShowConfirmation(false);
    setItemToRemove(null);
  };

  const addSuggestedProduct = (product) => {
    // In a real app, this would add to cart
    alert(`Added ${product.name} to cart!`);
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal + shipping - discountAmount;

  if (items.length === 0) {
    return (
      <div style={pageStyle}>
        <Navbar />
        <div style={{ 
          padding: 'var(--spacing-2xl) 0', 
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: 'var(--spacing-md)',
            opacity: 0.5
          }}>
            <FontAwesomeIcon icon={faCartShopping} size="lg" />
          </div>
          <h2 style={{ 
            color: 'var(--color-text-primary)', 
            marginBottom: 'var(--spacing-md)',
            fontSize: '1.8rem'
          }}>
            Your cart is empty
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <a 
            href="/products" 
            style={{
              display: 'inline-block',
              padding: 'var(--spacing-md) var(--spacing-xl)',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Continue shopping
          </a>

          {/* Suggested products */}
          <div style={{ marginTop: 'var(--spacing-2xl)' }}>
            <h3 style={{ 
              marginBottom: 'var(--spacing-lg)',
              color: 'var(--color-text-primary)'
            }}>
              You might also like
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--spacing-md)',
              justifyContent: 'center'
            }}>
              {suggestedProducts.map(product => (
                <div key={product.id} style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-md)',
                  textAlign: 'center',
                  maxWidth: '180px',
                  backgroundColor: 'var(--color-bg-primary)',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      marginBottom: 'var(--spacing-sm)'
                    }}
                  />
                  <h4 style={{ 
                    fontSize: '0.9rem',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)'
                  }}>
                    {product.name}
                  </h4>
                  <p style={{ 
                    fontWeight: 'bold',
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--spacing-md)'
                  }}>
                    ${(product.price / 100).toFixed(2)}
                  </p>
                  <button
                    onClick={() => addSuggestedProduct(product)}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={contentStyle}>
        <h1 style={{ 
          fontSize: '2.25rem', 
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
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: 'var(--spacing-md)',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--spacing-md)',
                backgroundColor: 'var(--color-bg-primary)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)'
                  }}
                />
                
                <div>
                  <h3 style={{ 
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-sm)'
                  }}>
                    {item.name}
                  </h3>
                  {item.variant && (
                    <p style={{ 
                      color: 'var(--color-text-secondary)',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '0.9rem'
                    }}>
                      Variant: {item.variant}
                    </p>
                  )}
                  <p style={{ 
                    fontWeight: 'bold',
                    color: 'var(--color-primary)'
                  }}>
                    ${item.price}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: item.quantity === 1 ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: item.quantity === 1 ? 'not-allowed' : 'pointer',
                        opacity: item.quantity === 1 ? 0.5 : 1,
                        borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)'
                      }}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span style={{ 
                      padding: 'var(--spacing-xs) var(--spacing-md)',
                      borderTop: '1px solid var(--color-border)',
                      borderBottom: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      style={{
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        border: '1px solid var(--color-border)',
                        backgroundColor: 'var(--color-bg-primary)',
                        color: 'var(--color-text-primary)',
                        cursor: 'pointer',
                        borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => confirmRemove(item)}
                    style={{
                      padding: 'var(--spacing-sm) var(--spacing-md)',
                      backgroundColor: 'transparent',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#dc2626';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#dc2626';
                    }}
                  >
                    Remove
                  </button>
                </div>

                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-secondary)'
                }}>
                  ${(item.price * item.quantity).toFixed(2)}
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
            position: 'sticky',
            top: '20px'
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
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-md)'
            }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Shipping:</span>
              <span style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}
              </span>
            </div>

            {/* Coupon Code Section */}
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)'
              }}>
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-sm)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
                <button
                  onClick={applyCoupon}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'var(--color-secondary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  Apply
                </button>
              </div>
            </div>

            {discount > 0 && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: 'var(--spacing-md)',
                color: '#10b981'
              }}>
                <span>Discount:</span>
                <span style={{ fontWeight: '600' }}>
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-lg)',
              paddingTop: 'var(--spacing-md)',
              borderTop: '1px solid var(--color-border)'
            }}>
              <span style={{ 
                color: 'var(--color-text-secondary)',
                fontWeight: 'bold'
              }}>Total:</span>
              <span style={{ 
                fontWeight: 'bold', 
                color: 'var(--color-primary)', 
                fontSize: '1.25rem' 
              }}>
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                backgroundColor: isProcessing ? 'var(--color-secondary)' : 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '1.125rem',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                if (!isProcessing) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }
              }}
              onMouseOut={(e) => {
                if (!isProcessing) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {isProcessing ? (
                <>
                  <span style={{ opacity: 0 }}>Proceed to Checkout</span>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                  </div>
                </>
              ) : (
                'Proceed to Checkout'
              )}
            </button>

            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}
            </style>
          </div>
        </div>

        {/* You might also like section (shown even when cart has items) */}
        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
          <h2 style={{ 
            marginBottom: 'var(--spacing-lg)',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            fontSize: '1.8rem'
          }}>
            You might also like
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--spacing-md)',
            justifyContent: 'center'
          }}>
            {suggestedProducts.map(product => (
              <div key={product.id} style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--spacing-md)',
                textAlign: 'center',
                maxWidth: '200px',
                backgroundColor: 'var(--color-bg-primary)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--spacing-sm)'
                  }}
                />
                <h4 style={{ 
                  fontSize: '1rem',
                  marginBottom: 'var(--spacing-sm)',
                  color: 'var(--color-text-primary)'
                }}>
                  {product.name}
                </h4>
                <p style={{ 
                  fontWeight: 'bold',
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--spacing-md)'
                }}>
                  ${(product.price / 100).toFixed(2)}
                </p>
                <button
                  onClick={() => addSuggestedProduct(product)}
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Remove Confirmation Modal */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--color-bg-primary)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
              Remove Item
            </h3>
            <p style={{ 
              marginBottom: 'var(--spacing-xl)',
              color: 'var(--color-text-secondary)'
            }}>
              Are you sure you want to remove "{itemToRemove.name}" from your cart?
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center' }}>
              <button
                onClick={cancelRemove}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-xl)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-xl)',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;