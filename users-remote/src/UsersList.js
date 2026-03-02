import React, { useState, useMemo } from "react";
import "./index.css";

const initialUsers = [
  { id: 1, name: "Alice", role: "Admin" },
  { id: 2, name: "Bob", role: "Editor" },
  { id: 3, name: "Charlie", role: "Viewer" },
];

const ROLES = ["Admin", "Editor", "Viewer"];
const SORT_OPTIONS = [
  { value: "name-asc", label: "Name A–Z" },
  { value: "name-desc", label: "Name Z–A" },
  { value: "role-asc", label: "Role A–Z" },
  { value: "role-desc", label: "Role Z–A" },
];

const roleClass = (role) => {
  const r = (role || "").toLowerCase();
  if (r === "admin") return "users-table__role--admin";
  if (r === "editor") return "users-table__role--editor";
  return "users-table__role--viewer";
};

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const UsersList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [name, setName] = useState("");
  const [role, setRole] = useState("Viewer");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = q
      ? users.filter((u) => u.name.toLowerCase().includes(q) || (u.role && u.role.toLowerCase().includes(q)))
      : [...users];
    const [field, dir] = sort.split("-");
    list.sort((a, b) => {
      const va = field === "name" ? (a.name || "").toLowerCase() : (a.role || "").toLowerCase();
      const vb = field === "name" ? (b.name || "").toLowerCase() : (b.role || "").toLowerCase();
      const cmp = va.localeCompare(vb);
      return dir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [users, search, sort]);

  const roleCounts = useMemo(() => {
    const o = {};
    ROLES.forEach((r) => (o[r] = users.filter((u) => u.role === r).length));
    return o;
  }, [users]);

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const newUser = {
      id: Math.max(0, ...users.map((u) => u.id)) + 1,
      name: trimmed,
      role: role || "Viewer",
    };
    setUsers([...users, newUser]);
    setName("");
    setRole("Viewer");
  };

  const handleRemove = (id) => setUsers(users.filter((u) => u.id !== id));

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditName(user.name);
  };

  const saveEdit = () => {
    if (editingId == null) return;
    const trimmed = editName.trim();
    if (trimmed) {
      setUsers(users.map((u) => (u.id === editingId ? { ...u, name: trimmed } : u)));
    }
    setEditingId(null);
    setEditName("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="users-widget">
      <h2 className="users-widget__title">
        <span className="users-widget__title-icon" aria-hidden>👥</span>
        User Management
      </h2>

      <div className="users-widget__badges">
        {ROLES.map((r) => (
          <span key={r} className={`users-widget__badge users-widget__badge--${r.toLowerCase()}`}>
            {r}: {roleCounts[r] ?? 0}
          </span>
        ))}
      </div>

      <form className="users-widget__form" onSubmit={handleAdd}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            maxLength={100}
          />
        </label>
        <label>
          Role
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={!name.trim()}>Add User</button>
      </form>

      <div className="users-widget__toolbar">
        <input
          type="search"
          className="users-widget__search"
          placeholder="Search by name or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search users"
        />
        <select
          className="users-widget__sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort users"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="users-widget__table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th style={{ width: 48 }}></th>
              <th>Name</th>
              <th>Role</th>
              <th style={{ width: 120 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.length === 0 ? (
              <tr>
                <td colSpan={4} className="users-table__empty">
                  {search.trim() ? "No users match your search." : "No users yet. Add one above."}
                </td>
              </tr>
            ) : (
              filteredAndSorted.map((user) => (
                <tr key={user.id}>
                  <td>
                    <span className="users-table__avatar" title={user.name}>
                      {getInitials(user.name)}
                    </span>
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <div className="users-table__edit">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit();
                            if (e.key === "Escape") cancelEdit();
                          }}
                          autoFocus
                          className="users-table__edit-input"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="users-table__name-btn"
                        onClick={() => startEdit(user)}
                      >
                        {user.name}
                      </button>
                    )}
                  </td>
                  <td>
                    <span className={`users-table__role ${roleClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="users-table__actions">
                      {editingId !== user.id && (
                        <button
                          type="button"
                          className="users-table__btn-edit"
                          onClick={() => startEdit(user)}
                          aria-label={`Edit ${user.name}`}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        className="users-table__btn-remove"
                        onClick={() => handleRemove(user.id)}
                        aria-label={`Remove ${user.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {users.length > 0 && (
        <div className="users-widget__count">
          {filteredAndSorted.length} of {users.length} user{users.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
};

export default UsersList;
