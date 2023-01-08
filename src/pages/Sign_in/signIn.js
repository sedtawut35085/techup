import React, { useState } from 'react';

function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    // Validate form fields and log the user in
  }

  return (
    <div className="container d-flex justify-content-center align-items-center text-center bg-color-white sh-xl" style={{height: "100vh"}}>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                id="email"
                className="form-control mt-2 mb-4"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                className="form-control mt-2 mb-4"
                value={password}
                onChange={event => setPassword(event.target.value)}
                />
            </div>
            <button type="submit" className="btn bg-color-1 hv-bg-color-2 color-white hv-color-white">
                Sign In
            </button>
        </form>
    </div>
  );
}

export default SignInForm;