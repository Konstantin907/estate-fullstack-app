import { useRouteError, Link } from "react-router-dom";

const ProfileErrorPage = () => {
    const error = useRouteError();

  return (
    <div style={{ padding: 40 }}>
      <h2>Session expired</h2>
      <p>You are not logged in.</p>
      <Link to="/login">Go to login</Link>
    </div>
  )
}

export default ProfileErrorPage
