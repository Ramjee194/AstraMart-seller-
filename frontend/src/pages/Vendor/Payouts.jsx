import { useEffect, useState } from "react";
import API from "../../api/axios";

const Payouts = () => {
  const [payouts, setPayouts] = useState([]);

  const loadPayouts = async () => {
    const res = await API.get("/vendor/payouts");
    setPayouts(res.data.payouts);
  };

  useEffect(() => {
    loadPayouts();
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payouts</h1>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {payouts.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-3">{p.date}</td>
              <td className="p-3">₹{p.amount}</td>
              <td className="p-3">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Payouts;
