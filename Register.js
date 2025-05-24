import React, { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email.includes('@')) errs.email = 'Valid email required';
    if (form.password.length < 6) errs.password = 'Password min 6 chars';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setMessage('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setMessage('');
            setErrors({ form: data.error });
          } else {
            setMessage(data.message);
            setForm({ name: '', email: '', password: '' });
            setErrors({});
          }
        })
        .catch(() => setErrors({ form: 'Server error' }));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🧾 Registration Form</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      <div style={{ color: 'red' }}>{errors.name}</div>

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <div style={{ color: 'red' }}>{errors.email}</div>

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <div style={{ color: 'red' }}>{errors.password}</div>

      <button type="submit">Register</button>

      <div style={{ color: 'green' }}>{message}</div>
      <div style={{ color: 'red' }}>{errors.form}</div>
    </form>
  );
}
