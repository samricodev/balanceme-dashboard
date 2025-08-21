import './style.css'

const Navbar = () => {
  return (
    <nav>
      <h1>Balanceme</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
