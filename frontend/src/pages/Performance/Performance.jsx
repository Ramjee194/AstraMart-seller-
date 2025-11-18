import { useState, useEffect } from "react";

const Performance = () => {
    const [metrics, setMetrics] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Mock data
        setMetrics({
            sellerRating: 4.7,
            orderDefectRate: 1.2,
            cancellationRate: 2.1,
            responseTime: "4.2 hours",
            onTimeDelivery: 96.5,
            customerService: 4.8
        });

        setReviews([
            { id: 1, customer: "Ramjee kumar yadav", rating: 5, comment: "Great product and fast delivery!", date: "2025-11-15" },
            { id: 2, customer: "Shamshul Ansari", rating: 4, comment: "Good quality but packaging could be better", date: "2025-11-14" },
            { id: 3, customer: "Dhiraj Dhoni", rating: 3, comment: "Product was okay, delivery was late", date: "2025-11-13" },
            { id: 4, customer: "Piyush Mishra", rating: 3, comment: "Product was okay, delivery was late", date: "2025-11-13" },

        ]);
    }, []);

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 4.0) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getPerformanceColor = (value, isReverse = false) => {
        if (isReverse) {
            if (value <= 2) return 'text-green-600';
            if (value <= 5) return 'text-yellow-600';
            return 'text-red-600';
        }
        if (value >= 90) return 'text-green-600';
        if (value >= 80) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Seller Performance</h1>
                    <p className="text-gray-600 mt-1">Track your marketplace performance metrics</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Seller Rating</h3>
                            <span className={`text-2xl font-bold ${getRatingColor(metrics.sellerRating)}`}>
                                {metrics.sellerRating}/5
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${(metrics.sellerRating / 5) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Based on customer feedback</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">On-Time Delivery</h3>
                            <span className={`text-2xl font-bold ${getPerformanceColor(metrics.onTimeDelivery)}`}>
                                {metrics.onTimeDelivery}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${metrics.onTimeDelivery}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Orders delivered on time</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">Order Defect Rate</h3>
                            <span className={`text-2xl font-bold ${getPerformanceColor(metrics.orderDefectRate, true)}`}>
                                {metrics.orderDefectRate}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-red-600 h-2 rounded-full"
                                style={{ width: `${metrics.orderDefectRate}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Target: Below 2%</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Performance Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                            {[
                                { label: "Cancellation Rate", value: `${metrics.cancellationRate}%`, target: "Below 3%" },
                                { label: "Average Response Time", value: metrics.responseTime, target: "Under 24 hours" },
                                { label: "Customer Service Rating", value: `${metrics.customerService}/5`, target: "Above 4.0" },
                                { label: "Return Rate", value: "1.8%", target: "Below 5%" },
                                { label: "Positive Feedback", value: "94%", target: "Above 90%" },
                            ].map((metric, index) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <div>
                                        <p className="font-medium text-gray-900">{metric.label}</p>
                                        <p className="text-sm text-gray-500">Target: {metric.target}</p>
                                    </div>
                                    <span className="font-semibold text-gray-900">{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Reviews */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Reviews</h3>
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-gray-900">{review.customer}</p>
                                            <div className="flex items-center space-x-1">
                                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            View All Reviews
                        </button>
                    </div>
                </div>

                {/* Performance Tips */}
                <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <span className="text-blue-600 mt-1">💡</span>
                            <div>
                                <p className="font-medium text-gray-900">Improve Response Time</p>
                                <p className="text-sm text-gray-600">Respond to customer queries within 24 hours to maintain good ratings.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                            <span className="text-green-600 mt-1">🚚</span>
                            <div>
                                <p className="font-medium text-gray-900">Optimize Shipping</p>
                                <p className="text-sm text-gray-600">Use reliable courier partners to ensure on-time delivery.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                            <span className="text-yellow-600 mt-1">📦</span>
                            <div>
                                <p className="font-medium text-gray-900">Quality Packaging</p>
                                <p className="text-sm text-gray-600">Invest in good packaging to reduce product damage during transit.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                            <span className="text-purple-600 mt-1">⭐</span>
                            <div>
                                <p className="font-medium text-gray-900">Request Reviews</p>
                                <p className="text-sm text-gray-600">Politely ask satisfied customers to leave positive reviews.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;