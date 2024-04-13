function Login() {
  return (
    <div>
      <form method="post">
        <section className="my-2">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" required className="block border-2" />
        </section>
        <section className="my-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            className="block border-2"
          />
        </section>
        <button
          type="submit"
          className="bg-teal-500 rounded-sm px-4 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
