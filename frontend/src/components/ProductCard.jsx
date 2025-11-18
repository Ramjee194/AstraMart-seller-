const ProductCard = ({ data }) => {
  return (
    <div className="border p-4 bg-white rounded shadow hover:shadow-lg">
      <img
        src={data.images?.[0]?.url || "/placeholder.png"}
        className="h-40 w-full object-cover rounded"
      />
      <h2 className="font-semibold mt-2">{data.title}</h2>
      <p className="text-gray-600">&#8377; {data.price}</p>
      <button className="bg-blue-600 text-white w-full mt-3 py-1 rounded">
        View
      </button>
    </div>
  );
};

export default ProductCard;
