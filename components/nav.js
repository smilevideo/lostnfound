import Link from 'next/link'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>Lost n' found</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 40px;
      }
    `}</style>
  </nav>
)

export default Nav
