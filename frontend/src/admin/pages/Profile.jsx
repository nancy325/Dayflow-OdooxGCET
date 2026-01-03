import AdminLayout from "../../layouts/AdminLayout";
import ProfileCard from "../../components/ProfileCard";

function Profile() {
  return (
    <AdminLayout>
      <h2 className="page-title">My Profile</h2>
      <p className="page-subtitle">
        View and update your HR/Admin information
      </p>

      <ProfileCard role="hr_admin" />
    </AdminLayout>
  );
}

export default Profile;
