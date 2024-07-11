import AuthWrapper from "../auth_wrapper"

export default function Layout({ children }) {
  return (
    <html>
      <body>
          {children}
      </body>
    </html>
  )
}