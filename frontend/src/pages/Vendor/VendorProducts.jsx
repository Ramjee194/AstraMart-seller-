import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendorProducts } from "../../store/vendorSlice";
import API from "../../api/axios";

const VendorProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((s) => s.vendor);

  useEffect(() => {
    dispatch(fetchVendorProducts());
  }, []);

  const deleteProduct = async (id) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    await API.delete(`/vendor/delete-product/${id}`);
    alert("Product deleted");

    // reload products
    dispatch(fetchVendorProducts());
  };

  if (loading) return <p className="p-10 text-center text-lg">Loading...</p>;

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Your Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No products found. Add new products!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((p) => (
            <div 
              key={p._id} 
              className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
            >
              <img
                src={p.images?.[0]?.url}
                alt={p.title}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
              <p className="text-gray-600">₹{p.price}</p>

              <p className="text-sm text-gray-500 mt-1">
                Stock: 
                <span className={p.stock > 0 ? "text-green-700" : "text-red-600"}>
                  {" "}{p.stock}
                </span>
              </p>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 transition">
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorProducts;
