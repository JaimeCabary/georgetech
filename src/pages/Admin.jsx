// src/pages/Admin.jsx
import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../hooks/useProducts';

const Admin = () => {
  const { user } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    inStock: true
  });

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-primary)' }}>
        <Navbar />
        <div style={{ padding: 'var(--spacing-2xl) 0', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-text-primary)' }}>Access Denied</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        featured: false
      };

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setEditingProduct(null);
      } else {
        await addProduct(productData);
      }

      setFormData({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        inStock: true
      });
      setIsAdding(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image,
      inStock: product.inStock
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      category: '',
      description: '',
      image: '',
      inStock: true
    });
  };

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg-primary)'
  };

  const contentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'var(--spacing-md)'
  };

  return (
    <div style={pageStyle}>
      <Navbar />
      
      <div style={contentStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: 'var(--color-text-primary)' }}>
            Admin Dashboard
          </h1>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Add New Product
          </button>
        </div>

        {isAdding && (
          <div style={{
            backgroundColor: 'var(--color-bg-secondary)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                style={{
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                style={{
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              >
                <option value="">Select Category</option>
                <option value="phones">Phones</option>
                <option value="laptops">Laptops</option>
                <option value="tvs">TVs</option>
                <option value="consoles">Consoles</option>
                <option value="accessories">Accessories</option>
              </select>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="3"
                style={{
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              />
              <input
                type="url"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                required
                style={{
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)',
                  color: 'var(--color-text-primary)'
                }}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                />
                <span style={{ color: 'var(--color-text-primary)' }}>In Stock</span>
              </label>
              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    backgroundColor: 'var(--color-text-secondary)',
                    color: 'white',
                    border: 'none',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h2 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-primary)' }}>Products</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
              <p style={{ color: 'var(--color-text-secondary)' }}>Loading products...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
              {products.map(product => (
                <div key={product.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: 'var(--spacing-md)',
                  alignItems: 'center',
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-md)'
                    }}
                  />
                  <div>
                    <h3 style={{ fontWeight: '600', color: 'var(--color-text-primary)' }}>
                      {product.name}
                    </h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>${product.price}</p>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{product.category}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <button
                      onClick={() => handleEdit(product)}
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      style={{
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
