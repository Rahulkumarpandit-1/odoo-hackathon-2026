import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "manager",
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setUsers(res.data);
    } catch (err) {
      console.log("Error fetching users");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setShowModal(false);
      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "manager",
      });

      fetchUsers();
    } catch (err) {
      console.log("Create failed");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers();
    } catch (err) {
      console.log("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} />
      {isOpen && <Sidebar />}

      <div
        className="dashboard-content"
        style={{
          marginLeft: isOpen ? "260px" : "0",
        }}
      >
        <h1 className="dashboard-title">Users Management 👥</h1>

     <button
  className="add-user-btn"
  onClick={() => setShowModal(true)}
>
  + Add User
</button>

        <div className="card">
          <table width="100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(user._id)}
                      style={{ background: "red", color: "white" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== Modal ===== */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-card">
              <h2>Create New User</h2>

              <form onSubmit={createUser} className="modal-form">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  required
                />

                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                >
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>

                <div className="modal-buttons">
                  <button type="submit" className="create-btn">
                    Create
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;