import CreateUser from "./create-user";
import ListUsers from "./list-users";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <CreateUser />
      <ListUsers />
    </div>
  );
}
