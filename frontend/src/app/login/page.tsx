import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="mx-auto flex flex-col gap-4 border p-10 rounded-lg bg-white shadow-lg">
        <p>Login</p>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button>Login</Button>
      </div>
    </div>
  );
};
export default login;
