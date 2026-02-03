import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToUsers,
  addUser,
  updateUser,
  deleteUser,
  setEditingUser,
} from "./Features/User/userSlice";

function Toast({ show, variant, message, onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 2800);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;
  return (
    <Alert
      variant={variant}
      className="position-fixed top-0 end-0 m-3 shadow"
      style={{ zIndex: 1100, minWidth: 260, maxWidth: 340 }}
      dismissible
      onClose={onClose}
    >
      {message}
    </Alert>
  );
}

function EditRow({ user, onSave, onCancel }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  return (
    <div className="card border-0 shadow-sm mb-2" style={{ borderLeft: "4px solid #6366f1" }}>
      <div className="card-body py-3 px-4">
        <div className="row g-2 align-items-end">
          <div className="col-12 col-md-4">
            <Form.Label className="fw-semibold mb-1" style={{ fontSize: 13 }}>
              Name
            </Form.Label>
            <Form.Control
              size="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
            />
          </div>
          <div className="col-12 col-md-4">
            <Form.Label className="fw-semibold mb-1" style={{ fontSize: 13 }}>
              Email
            </Form.Label>
            <Form.Control
              size="sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
            />
          </div>
          <div className="col-12 col-md-4 d-flex gap-2">
            <Button
              size="sm"
              variant="success"
              className="flex-grow-1"
              onClick={() => {
                if (!name.trim()) return;
                onSave({ id: user.id, name: name.trim(), email: email.trim() });
              }}
            >
              ✓ Save
            </Button>
            <Button size="sm" variant="outline-secondary" onClick={onCancel}>
              ✕ Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisplayRow({ user, onEdit, onDelete, confirmingDelete, onConfirmDelete, onCancelDelete }) {
  return (
    <div className="card border-0 shadow-sm mb-2" style={{ borderLeft: "4px solid #cbd5e1" }}>
      <div className="card-body py-3 px-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <div className="fw-semibold" style={{ fontSize: 15 }}>
              {user.name}
            </div>
            <div className="text-muted" style={{ fontSize: 13 }}>
              {user.email || <span className="fst-italic">no email</span>}
            </div>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-md-end gap-2">
            {!confirmingDelete ? (
              <>
                <Button size="sm" variant="outline-primary" onClick={onEdit}>
                  ✎ Edit
                </Button>
                <Button size="sm" variant="outline-danger" onClick={onDelete}>
                  🗑 Delete
                </Button>
              </>
            ) : (
              <>
                <span className="align-self-center text-danger fw-semibold" style={{ fontSize: 13 }}>
                  Sure?
                </span>
                <Button size="sm" variant="danger" onClick={onConfirmDelete}>
                  Yes, delete
                </Button>
                <Button size="sm" variant="outline-secondary" onClick={onCancelDelete}>
                  No
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function App() {

  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.list);
  const status = useSelector((s) => s.users.status);
  const editingUser = useSelector((s) => s.users.editingUser);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState({ show: false, variant: "success", message: "" });
  const unsubRef = useRef(null);


  useEffect(() => {
    unsubRef.current = subscribeToUsers(dispatch);
    return () => unsubRef.current && unsubRef.current();
  }, [dispatch]);

  const showToast = useCallback((variant, message) => {
    setToast({ show: true, variant, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);





  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addUser({ name: name.trim(), email: email.trim() })).then((action) => {
      if (!action.error) {
        showToast("success", "User added successfully");
        setName("");
        setEmail("");
      }
    });
  };

  const handleUpdate = (payload) => {
    dispatch(updateUser(payload)).then((action) => {
      if (!action.error) showToast("success", "User updated successfully");
    });
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id)).then((action) => {
      if (!action.error) showToast("success", "User deleted successfully");
      setConfirmDelete(null);
    });
  };


  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q)
    );
  });


  return (
    <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
      <Toast show={toast.show} variant={toast.variant} message={toast.message} onClose={hideToast} />

      <Container className="pt-5 pb-5" style={{ maxWidth: 720 }}>

        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="mb-0" style={{ fontWeight: 700, letterSpacing: "-0.5px" }}>
            User Manager
          </h2>
          <Badge bg="success" className="d-flex align-items-center gap-1 px-2 py-1">
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
            Live
          </Badge>
        </div>


        <div className="card border-0 shadow-sm mb-4" style={{ borderLeft: "4px solid #6366f1" }}>
          <div className="card-body px-4 py-3">
            <div className="fw-semibold mb-2" style={{ fontSize: 14, color: "#6366f1" }}>
              + New User
            </div>
            <Form onSubmit={handleAdd}>
              <div className="row g-2">
                <div className="col-12 col-sm-5">
                  <Form.Control
                    size="sm"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-12 col-sm-5">
                  <Form.Control
                    size="sm"
                    type="email"
                    placeholder="Email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12 col-sm-2">
                  <Button type="submit" size="sm" variant="primary" className="w-100">
                    Add
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>


        <InputGroup className="mb-3" size="sm">
          <InputGroup.Text style={{ background: "#fff", border: "1px solid #dee2e6" }}>
            🔍
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button variant="outline-secondary" size="sm" onClick={() => setSearch("")}>
              ✕
            </Button>
          )}
        </InputGroup>


        {status === "loading" && (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        )}


        {status !== "loading" && filtered.length === 0 && (
          <div className="text-center text-muted py-4" style={{ fontSize: 15 }}>
            {search ? "No users match your search." : "No users yet. Add one above!"}
          </div>
        )}


        {filtered.map((user) =>
          editingUser && editingUser.id === user.id ? (
            <EditRow
              key={user.id}
              user={editingUser}
              onSave={handleUpdate}
              onCancel={() => dispatch(setEditingUser(null))}
            />
          ) : (
            <DisplayRow
              key={user.id}
              user={user}
              onEdit={() => dispatch(setEditingUser({ id: user.id, name: user.name, email: user.email }))}
              onDelete={() => setConfirmDelete(user.id)}
              confirmingDelete={confirmDelete === user.id}
              onConfirmDelete={() => handleDelete(user.id)}
              onCancelDelete={() => setConfirmDelete(null)}
            />
          )
        )}


        {users.length > 0 && (
          <div className="text-end text-muted mt-3" style={{ fontSize: 13 }}>
            {filtered.length} of {users.length} user{users.length !== 1 ? "s" : ""}
          </div>
        )}
      </Container>
    </div>
  );
}