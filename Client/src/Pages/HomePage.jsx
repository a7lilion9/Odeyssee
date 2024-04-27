import { Link } from "react-router-dom";
import { Container } from "../Components";

export default function HomePage() {
  return (
    <Container>
      <Link to="/services">Services</Link>
      <Link to="/roles">Roles</Link>
      <Link to="/users">Users</Link>
      <Link to="/articletypes">Article Types</Link>
      <Link to="/articles">Articles</Link>
      <Link to="/errors">Errors</Link>
      <Link to="/items">Items</Link>
    </Container>
  );
}
