// AdminDashboard.jsx
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminDashboard.css";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function AdminDashboard() {
  const { loggedIn, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("questions");
  const [questions, setQuestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "Generic",
    type: "spray",
    targets: [],
    activeIngredient: "",
    price: "",
    stock: 0,
    description: "",
    imageUrl: "",
    safeForPets: false,
    indoorUse: true,
    outdoorUse: true
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (!loggedIn || !isAdmin) {
      alert("Admin access required");
      navigate("/");
    }
  }, [loggedIn, isAdmin, navigate]);

  // Fetch questions
  useEffect(() => {
    if (activeTab === "questions" && loggedIn && isAdmin) {
      fetchQuestions();
    }
  }, [activeTab, loggedIn, isAdmin]);

  // Fetch products
  useEffect(() => {
    if (activeTab === "products" && loggedIn && isAdmin) {
      fetchProducts();
    }
  }, [activeTab, loggedIn, isAdmin]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiURL}/api/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setQuestions(data);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}/api/items`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiURL}/api/questions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setQuestions(questions.filter(q => q._id !== id));
      }
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleTargetsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setProductForm(prev => ({ ...prev, targets: options }));
  };



  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const url = editingProduct
        ? `${apiURL}/api/items/${editingProduct._id}`
        : `${apiURL}/api/items`;
      
      const method = editingProduct ? "PUT" : "POST";

      console.log('Submitting product:', productForm);

      // Convert imageUrl to images array for backend
      const submitData = {
        ...productForm,
        images: productForm.imageUrl ? [productForm.imageUrl] : []
      };
      delete submitData.imageUrl;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        alert(editingProduct ? "Product updated successfully!" : "Product created successfully!");
        resetProductForm();
        fetchProducts();
      } else {
        const errorMsg = data.error || data.message || "Failed to save product";
        setError(errorMsg);
        alert("Error: " + errorMsg);
      }
    } catch (err) {
      const errorMsg = "Network error: " + err.message;
      setError(errorMsg);
      alert(errorMsg);
      console.error("Error saving product:", err);
    } finally {
      setLoading(false);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      brand: product.brand || "Generic",
      type: product.type || "spray",
      targets: product.targets || [],
      activeIngredient: product.activeIngredient || "",
      price: product.price || "",
      stock: product.stock || 0,
      description: product.description || "",
      imageUrl: product.images?.[0] || "",
      safeForPets: product.safeForPets || false,
      indoorUse: product.indoorUse !== undefined ? product.indoorUse : true,
      outdoorUse: product.outdoorUse !== undefined ? product.outdoorUse : true
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiURL}/api/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProducts(products.filter(p => p._id !== id));
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const resetProductForm = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      brand: "Generic",
      type: "spray",
      targets: [],
      activeIngredient: "",
      price: "",
      stock: 0,
      description: "",
      imageUrl: "",
      safeForPets: false,
      indoorUse: true,
      outdoorUse: true
    });
  };

  if (!loggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <h1 className="admin-title">Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            User Questions
          </button>
          <button
            className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Product Management
          </button>
        </div>

        {/* Questions Tab */}
        {activeTab === "questions" && (
          <div className="tab-content">
            <h2>User Questions</h2>
            {loading ? (
              <p>Loading...</p>
            ) : questions.length === 0 ? (
              <p className="no-data">No questions yet</p>
            ) : (
              <div className="questions-list">
                {questions.map((q) => (
                  <div key={q._id} className="question-card">
                    <div className="question-header">
                      <h3>{q.productName}</h3>
                      <button
                        className="delete-btn"
                        onClick={() => deleteQuestion(q._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="question-text">{q.text}</p>
                    <div className="question-meta">
                      <span><strong>User:</strong> {q.userName}</span>
                      <span><strong>Email:</strong> {q.userEmail}</span>
                      <span><strong>Date:</strong> {new Date(q.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="tab-content">
            <div className="products-section">
              <div className="product-form-section">
                <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                
                {error && <p className="form-error">{error}</p>}

                <form onSubmit={handleProductSubmit} className="product-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={productForm.brand}
                        onChange={handleProductFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Type *</label>
                      <select
                        name="type"
                        value={productForm.type}
                        onChange={handleProductFormChange}
                        required
                      >
                        <option value="spray">Spray</option>
                        <option value="lotion">Lotion</option>
                        <option value="coil">Coil</option>
                        <option value="plug_in_electric">Plug-in Electric</option>
                        <option value="ultrasonic">Ultrasonic</option>
                        <option value="trap">Trap</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Targets *</label>
                      <select
                        name="targets"
                        multiple
                        value={productForm.targets}
                        onChange={handleTargetsChange}
                        required
                      >
                        <option value="mosquito">Mosquito</option>
                        <option value="fly">Fly</option>
                        <option value="spider">Spider</option>
                        <option value="wasp">Wasp</option>
                        <option value="ant">Ant</option>
                        <option value="moth">Moth</option>
                        <option value="roach">Roach</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={productForm.stock}
                        onChange={handleProductFormChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleProductFormChange}
                      rows="3"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Active Ingredient</label>
                      <input
                        type="text"
                        name="activeIngredient"
                        value={productForm.activeIngredient}
                        onChange={handleProductFormChange}
                        placeholder="e.g. DEET 25%"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={productForm.imageUrl}
                      onChange={handleProductFormChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    {productForm.imageUrl && (
                      <img 
                        src={productForm.imageUrl} 
                        alt="Preview" 
                        className="image-preview"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>

                  <div className="form-checkboxes">
                    <label>
                      <input
                        type="checkbox"
                        name="indoorUse"
                        checked={productForm.indoorUse}
                        onChange={handleProductFormChange}
                      />
                      Indoor Use
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="outdoorUse"
                        checked={productForm.outdoorUse}
                        onChange={handleProductFormChange}
                      />
                      Outdoor Use
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name="safeForPets"
                        checked={productForm.safeForPets}
                        onChange={handleProductFormChange}
                      />
                      Safe for Pets
                    </label>
                  </div>

                  <div className="form-actions">
                    {editingProduct && (
                      <button type="button" className="btn-secondary" onClick={resetProductForm}>
                        Cancel
                      </button>
                    )}
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? "Saving..." : editingProduct ? "Update Product" : "Create Product"}
                    </button>
                  </div>
                </form>
              </div>

              <div className="products-list-section">
                <h2>Existing Products</h2>
                {loading ? (
                  <p>Loading...</p>
                ) : products.length === 0 ? (
                  <p className="no-data">No products yet</p>
                ) : (
                  <div className="products-grid">
                    {products.map((product) => (
                      <div key={product._id || product.id} className="product-card-admin">
                        {product.images && product.images[0] && (
                          <img src={product.images[0]} alt={product.name} />
                        )}
                        <h3>{product.name}</h3>
                        <p className="product-price">${product.price}</p>
                        <p className="product-type">{product.type}</p>
                        <div className="product-actions">
                          <button
                            className="btn-edit"
                            onClick={() => editProduct(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => deleteProduct(product._id)}
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
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
