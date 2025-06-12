import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Shield,
  Truck,
  ChefHat,
  Building,
  Mail,
  Phone,
  Calendar,
  MoreVertical,
  X,
  Check,
} from "lucide-react";

const ManageAccountPage = () => {
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // 'create', 'edit', 'delete'
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);

  // Form state for creating/editing accounts
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
    password: "",
    status: "active",
  });

  // Mock data - in real app, this would come from your API
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Junya",
      email: "junya@restaurant.com",
      phone: "7777777777",
      role: "admin",
      status: "active",
      dateCreated: "2024-01-15",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Lhenard",
      email: "lhenard@restaurant.com",
      phone: "6969696969",
      role: "manager",
      status: "active",
      dateCreated: "2024-01-20",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Karl",
      email: "karlredflag@delivery.com",
      phone: "6969696969",
      role: "rider",
      status: "active",
      dateCreated: "2024-02-01",
      lastLogin: "30 mins ago",
    },
    {
      id: 4,
      name: "Mjay",
      email: "Mjay@restaurant.com",
      phone: "6969696969",
      role: "staff",
      status: "inactive",
      dateCreated: "2024-02-10",
      lastLogin: "1 week ago",
    },
    {
      id: 5,
      name: "Carlo",
      email: "carlo@delivery.com",
      phone: "6969696969",
      role: "rider",
      status: "active",
      dateCreated: "2024-02-15",
      lastLogin: "5 mins ago",
    },
  ]);

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <Shield className="w-5 h-5 text-red-400" />;
      case "manager":
        return <Building className="w-5 h-5 text-blue-400" />;
      case "rider":
        return <Truck className="w-5 h-5 text-yellow-400" />;
      case "staff":
        return <ChefHat className="w-5 h-5 text-purple-400" />;
      default:
        return <Users className="w-5 h-5 text-gray-400" />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-900/20 text-red-400";
      case "manager":
        return "bg-blue-900/20 text-blue-400";
      case "rider":
        return "bg-yellow-900/20 text-yellow-400";
      case "staff":
        return "bg-purple-900/20 text-purple-400";
      default:
        return "bg-gray-900/20 text-gray-400";
    }
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-900/20 text-green-400"
      : "bg-red-900/20 text-red-400";
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesRole = selectedRole === "all" || account.role === selectedRole;
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleCreateAccount = () => {
    setModalType("create");
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "staff",
      password: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEditAccount = (account) => {
    setModalType("edit");
    setSelectedAccount(account);
    setFormData({
      name: account.name,
      email: account.email,
      phone: account.phone,
      role: account.role,
      password: "",
      status: account.status,
    });
    setShowModal(true);
    setShowDropdown(null);
  };

  const handleDeleteAccount = (account) => {
    setModalType("delete");
    setSelectedAccount(account);
    setShowModal(true);
    setShowDropdown(null);
  };

  const handleSubmit = () => {
  // Validation for create and edit modes
  if (modalType !== "delete") {
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      alert("Please fill in all required fields");
      return;
    }
    if (modalType === "create" && !formData.password.trim()) {
      alert("Password is required for new accounts");
      return;
    }
  }

  if (modalType === "create") {
      const newAccount = {
        id: accounts.length + 1,
        ...formData,
        dateCreated: new Date().toISOString().split("T")[0],
        lastLogin: "Never",
      };
      setAccounts([...accounts, newAccount]);
    } else if (modalType === "edit") {
      const updatedData = { ...formData };
      // Only update password if a new one was provided
      if (!formData.password.trim()) {
        delete updatedData.password;
      }
      setAccounts(
        accounts.map((acc) =>
          acc.id === selectedAccount.id ? { ...acc, ...updatedData } : acc
        )
      );
    } else if (modalType === "delete") {
      setAccounts(accounts.filter((acc) => acc.id !== selectedAccount.id));
    }
    setShowModal(false);
  };

  const roleStats = {
    total: accounts.length,
    admin: accounts.filter((acc) => acc.role === "admin").length,
    manager: accounts.filter((acc) => acc.role === "manager").length,
    rider: accounts.filter((acc) => acc.role === "rider").length,
    staff: accounts.filter((acc) => acc.role === "staff").length,
    active: accounts.filter((acc) => acc.status === "active").length,
  };

  return (
    <div className="min-h-screen bg-green-950 p-6 pt-9">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Account Management
          </h1>
          <p className="text-green-300">
            Manage user accounts for staff, riders, and administrators
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {roleStats.total}
            </div>
            <div className="text-green-300 text-sm">Total Users</div>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">
              {roleStats.admin}
            </div>
            <div className="text-green-300 text-sm">Admins</div>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {roleStats.manager}
            </div>
            <div className="text-green-300 text-sm">Managers</div>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {roleStats.rider}
            </div>
            <div className="text-green-300 text-sm">Riders</div>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">
              {roleStats.staff}
            </div>
            <div className="text-green-300 text-sm">Staff</div>
          </div>
          <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">
              {roleStats.active}
            </div>
            <div className="text-green-300 text-sm">Active</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 items-center flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
                />
              </div>

              {/* Role Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-green-300" />
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-green-800/50 border border-green-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="rider">Rider</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </div>

            {/* Add Account Button */}
            <button
              onClick={handleCreateAccount}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Add Account
            </button>
          </div>
        </div>

        {/* Accounts Table */}
        <div className="bg-green-900/30 border border-green-800/50 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-800/50">
                <tr>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    User
                  </th>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    Contact
                  </th>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    Role
                  </th>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    Last Login
                  </th>
                  <th className="text-left py-4 px-6 text-green-300 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="border-t border-green-800/30 hover:bg-green-800/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-white">
                          {account.name}
                        </div>
                        <div className="text-sm text-green-300">
                          ID: {account.id}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-green-300">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{account.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-300">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{account.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(
                          account.role
                        )}`}
                      >
                        {getRoleIcon(account.role)}
                        {account.role}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          account.status
                        )}`}
                      >
                        {account.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-green-300 text-sm">
                        {account.lastLogin}
                      </div>
                      <div className="text-xs text-green-400">
                        Created: {account.dateCreated}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setShowDropdown(
                              showDropdown === account.id ? null : account.id
                            )
                          }
                          className="p-2 hover:bg-green-800/30 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-green-300" />
                        </button>
                        {showDropdown === account.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-green-800 border border-green-700 rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditAccount(account)}
                              className="w-full text-left px-4 py-2 text-green-300 hover:bg-green-700/50 flex items-center gap-2 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                              Edit Account
                            </button>
                            <button
                              onClick={() => handleDeleteAccount(account)}
                              className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete Account
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-green-900 border border-green-800 rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-green-800">
                <h3 className="text-lg font-semibold text-white">
                  {modalType === "create" && "Create New Account"}
                  {modalType === "edit" && "Edit Account"}
                  {modalType === "delete" && "Delete Account"}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-green-400 hover:text-green-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {modalType === "delete" ? (
                  <div className="text-center">
                    <div className="text-red-400 mb-4">
                      <Trash2 className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-white mb-2">
                      Are you sure you want to delete this account?
                    </p>
                    <p className="text-green-300 text-sm">
                      {selectedAccount?.name} ({selectedAccount?.email})
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Role
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="staff">Staff</option>
                        <option value="rider">Rider</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    {(modalType === "create" || modalType === "edit") && (
                      <div>
                        <label className="block text-green-300 text-sm font-medium mb-2">
                          {modalType === "edit" ? "New Password (leave blank to keep current)" : "Password"}
                        </label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                          required={modalType === "create"}
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-green-300 text-sm font-medium mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-green-800/50 border border-green-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 bg-green-800/50 text-green-300 rounded-lg hover:bg-green-800/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                      modalType === "delete"
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                  >
                    {modalType === "create" && "Create Account"}
                    {modalType === "edit" && "Save Changes"}
                    {modalType === "delete" && "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAccountPage;
