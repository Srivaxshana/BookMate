import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title mb-4">Profile Information</h2>
              <p className="text-muted mb-4">Manage your account details</p>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Full Name</label>
                <p>{user.fullName}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <p>{user.email}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Member Since</label>
                <p>{new Date(user.memberSince).toLocaleDateString()}</p>
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Role</label>
                <p>{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
