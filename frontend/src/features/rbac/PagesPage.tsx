import { useCallback, useEffect, useState, type FormEvent } from "react";
import { createPage, getPages } from "./rbac.service";
import type { PagePermission } from "./rbac.types";

const PagesPage = () => {
  const [pages, setPages] = useState<PagePermission[]>([]);
  const [name, setName] = useState("");
  const [route, setRoute] = useState("");

  const load = useCallback(async () => {
    const data = await getPages();
    setPages(data);
  }, []);

    useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await createPage({ name, route });
    setName("");
    setRoute("");
    await load();
  };

  return (
    <div className="page">
      <h1>Pages</h1>
      <div className="grid-2">
        <section className="card">
          <h3>Create Page</h3>
          <form className="stack" onSubmit={submit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Page name" required />
            <input value={route} onChange={(e) => setRoute(e.target.value)} placeholder="Route (ex: /reports)" required />
            <button type="submit">Create Page</button>
          </form>
        </section>
        <section className="card">
          <h3>Page List</h3>
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Route</th></tr></thead>
            <tbody>{pages.map((page) => <tr key={page.id}><td>{page.id}</td><td>{page.name}</td><td>{page.route}</td></tr>)}</tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default PagesPage;
