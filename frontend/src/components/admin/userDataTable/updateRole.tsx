import { useState } from "react";
import api from "@/lib/axios";
import { User } from "@/types/user";
import { toast } from "sonner";

const UpdateRole = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);

  const handleRoleChange = async () => {
    try {
      setLoading(true);
      await api.put(`/user/update-role/${user._id}`, {
        userId: user._id,
        role: user.role === "admin" ? "user" : "admin",
      });

      toast.success("Role updated successfully!");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Error updating role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleRoleChange} disabled={loading}>
      {user.role === "admin" ? "Remove From Admin" : "Make Admin"}
    </button>
  );
};

export default UpdateRole;
