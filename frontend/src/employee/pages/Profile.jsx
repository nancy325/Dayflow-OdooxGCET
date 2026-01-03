import EmployeeLayout from "../../layouts/EmployeeLayout";
import ProfileCard from "../../components/ProfileCard";

function Profile() {
  return (
    <EmployeeLayout>
      <h2 className="page-title">My Profile</h2>
      <p className="page-subtitle">
        View and update your personal information
      </p>

      <ProfileCard role="employee" />
    </EmployeeLayout>
  );
}

export default Profile;
