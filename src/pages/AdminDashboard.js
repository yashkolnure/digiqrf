import { useEffect, useState } from "react";
import api from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Super Admin Dashboard
      </h1>

      <div className="overflow-auto">

        <table className="w-full border text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Username</th>
              <th>Plan</th>
              <th>Views</th>
              <th>Leads</th>
              <th>Profile</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>@{u.username}</td>
                <td>{u.plan}</td>
                <td>{u.views}</td>
                <td>{u.leads}</td>

                <td>
                  <a
                    href={u.profileLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600"
                  >
                    Open
                  </a>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}