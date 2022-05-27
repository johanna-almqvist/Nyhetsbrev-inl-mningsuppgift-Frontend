import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Header></Header>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
