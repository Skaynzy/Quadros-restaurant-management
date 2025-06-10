import React, { useState } from "react";
import MetricCard from "../components/dashboard/MetricCard";
import {
  PhilippinePeso,
  ShoppingCart,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Calendar,
  Filter,
} from "lucide-react";

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock data for now || this should come from API
  const dashboardData = {
    metrics: {
      totalRevenue: 12450.75,
      totalOrders: 156,
      activeCustomers: 89,
      averageOrderValue: 79.81,
      pendingOrders: 12,
      completedOrders: 144,
      cancelledOrders: 8,
      deliveryTime: 28,
    },
    recentTransactions: [
      {
        id: "ORD-001",
        customer: "John Doe",
        amount: 45.5,
        status: "completed",
        time: "2 mins ago",
        items: 3,
      },
      {
        id: "ORD-002",
        customer: "Sarah Smith",
        amount: 67.25,
        status: "pending",
        time: "5 mins ago",
        items: 2,
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        amount: 23.75,
        status: "preparing",
        time: "8 mins ago",
        items: 1,
      },
      {
        id: "ORD-004",
        customer: "Emma Wilson",
        amount: 89.0,
        status: "delivered",
        time: "12 mins ago",
        items: 4,
      },
      {
        id: "ORD-005",
        customer: "David Brown",
        amount: 34.5,
        status: "cancelled",
        time: "15 mins ago",
        items: 2,
      },
    ],
    hourlyData: [
      { hour: "9AM", orders: 12, revenue: 456 },
      { hour: "10AM", orders: 18, revenue: 678 },
      { hour: "11AM", orders: 25, revenue: 892 },
      { hour: "12PM", orders: 35, revenue: 1245 },
      { hour: "1PM", orders: 42, revenue: 1567 },
      { hour: "2PM", orders: 28, revenue: 987 },
      { hour: "3PM", orders: 22, revenue: 743 },
      { hour: "4PM", orders: 19, revenue: 654 },
    ],
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "text-green-400 bg-green-900/20";
      case "pending":
      case "preparing":
        return "text-yellow-400 bg-yellow-900/20";
      case "cancelled":
        return "text-red-400 bg-red-900/20";
      default:
        return "text-gray-400 bg-gray-900/20";
    }
  };

  return (
    <div className="min-h-screen bg-green-950 p-6 pt-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Restaurant Dashboard
          </h1>
          <p className="text-green-300">
            Monitor your restaurant's performance and transactions
          </p>
        </div>

        {/* Filters */}
        <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-300" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-green-800/50 border border-green-700 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-green-300" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-green-800/50 border border-green-700 rounded px-3 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={dashboardData.metrics.totalRevenue}
            icon={PhilippinePeso}
            change={12.5}
            format="currency"
          />
          <MetricCard
            title="Total Orders"
            value={dashboardData.metrics.totalOrders}
            icon={ShoppingCart}
            change={8.2}
          />
          <MetricCard
            title="Active Customers"
            value={dashboardData.metrics.activeCustomers}
            icon={Users}
            change={15.3}
          />
          <MetricCard
            title="Avg Order Value"
            value={dashboardData.metrics.averageOrderValue}
            icon={TrendingUp}
            change={-2.1}
            format="currency"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Pending Orders"
            value={dashboardData.metrics.pendingOrders}
            icon={Clock}
            format="number"
          />
          <MetricCard
            title="Completed Orders"
            value={dashboardData.metrics.completedOrders}
            icon={CheckCircle}
            format="number"
          />
          <MetricCard
            title="Cancelled Orders"
            value={dashboardData.metrics.cancelledOrders}
            icon={XCircle}
            format="number"
          />
          <MetricCard
            title="Avg Delivery Time"
            value={dashboardData.metrics.deliveryTime}
            icon={Truck}
            format="time"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hourly Performance Chart */}
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Hourly Performance
            </h3>
            <div className="space-y-4">
              {dashboardData.hourlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-green-300 font-medium w-12">
                      {data.hour}
                    </span>
                    <div className="flex-1 bg-green-800/30 rounded-full h-2 relative">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.orders / 45) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-16">
                      {data.orders} orders
                    </span>
                  </div>
                  <span className="text-green-400 font-medium ml-4">
                    ₱{data.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Recent Transactions
            </h3>
            <div className="space-y-4">
              {dashboardData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-green-800/20 rounded-lg hover:bg-green-800/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-white">
                        {transaction.id}
                      </span>
                      <span className="text-green-400 font-semibold">
                        ₱{transaction.amount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-300">
                        {transaction.customer}
                      </span>
                      <span className="text-green-300">
                        {transaction.items} items
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-400">
                        {transaction.time}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 bg-green-800/50 hover:bg-green-800/70 text-green-300 rounded-lg transition-colors font-medium">
              View All Transactions
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-white mb-2">
              Order Success Rate
            </h4>
            <div className="text-3xl font-bold text-green-400 mb-1">94.8%</div>
            <p className="text-green-300 text-sm">+2.3% from last week</p>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-white mb-2">
              Peak Hours
            </h4>
            <div className="text-3xl font-bold text-green-400 mb-1">
              12-2 PM
            </div>
            <p className="text-green-300 text-sm">Highest order volume</p>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-white mb-2">
              Customer Satisfaction
            </h4>
            <div className="text-3xl font-bold text-green-400 mb-1">4.7/5</div>
            <p className="text-green-300 text-sm">Based on 234 reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
