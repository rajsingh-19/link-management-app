import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./settings.module.css";
import { getUserInfo, updateUser } from "../../services/index";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import ConfirmCard from "../../modals/confirmcard/ConfirmCard";
import { toast } from "react-toastify";

const Settings = () => {
  const navigate = useNavigate();

  const [updateFormData, setUpdateFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [modalStatus, setModalStatus] = useState(false);

  useEffect(() => {  
    const fetchUserData = async () => {
      const userDataRes = await getUserInfo();
      if(userDataRes.status === 200) {
        const data = await userDataRes.json();

        setUpdateFormData(data);
      } else {
        toast.error(userDataRes.status);
      }
    };

    // fetchUserData();
  },[]);

  // Form validation logic
  const validateForm = () => {
    const errors = {};

    if (!updateFormData.name.trim()) {
      errors.name = "Name is required.";
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updateFormData.email)) {
      errors.email = "Invalid email format.";
    };

    if (updateFormData.mobile.length < 10) {
      errors.mobile = "Enter 10 digit mobile number.";
    };

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  //               Function to handle user updation
  const handleUpdateUser = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (like refreshing the page)

    if (!validateForm()) {
      return;
    }

    try {
      const res = await updateUser(updateFormData); // Calls the `register` function with the form data
      if (res.status === 201) {
        // Checks if the response status indicates success
        setUpdateFormData({
          name: "",
          email: "",
          mobile: "",
        });

        toast.success("Updated Successfully");
      } else {
        // Handles any errors by logging the response and showing an alert
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage); // Show the error message from the backend
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  const handleDeleteConfirm = () => {
    setModalStatus(true);
  };

  //      function for closing the modal
  const handleCloseModal = (e) => {
    setModalStatus(false);
  };

  const handleAccountDelete = () => {
    navigate('/');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebarSection}>
        <Sidebar />
      </div>
      <div className={styles.pageSection}>
        <div className={styles.navContainer}>
          <Navbar />
        </div>
        <div className={styles.contentContainer}>
          {/*     Form for user login     */}
          <form onSubmit={handleUpdateUser} className={styles.updateFormContainer}>
            {/*     name       */}
            <div className={styles.fieldContainer}>
              <div>
                <label>Name</label>
              </div>
              <div>
                <div className={styles.inputContainer}>
                  <input className={styles.input} type="text" name='name' value={updateFormData.name} placeholder="Name" onChange={(e) => setUpdateFormData({...updateFormData, [e.target.name]: e.target.value})} />
                </div>
                <div className={styles.errorContainer}>
                  {errors.name ? ( <p className={styles.errorMessage}>{errors.name}</p>) : 
                  (<p className={styles.errorMessage}>&nbsp;</p>)}
                </div>
              </div>
            </div>
            {/*     email      */}
            <div className={styles.fieldContainer}>
              <div>
                <label>Email Id</label>
              </div>
              <div>
                <div className={styles.inputContainer}>
                  <input className={styles.input} type="email" name='email' value={updateFormData.email} placeholder="Email" onChange={(e) => setUpdateFormData({...updateFormData, [e.target.name]: e.target.value})} />
                </div>
                <div className={styles.errorContainer}>
                  {errors.email ? ( <p className={styles.errorMessage}>{errors.email}</p>) : 
                  (<p className={styles.errorMessage}>&nbsp;</p>)}
                </div>
              </div>
            </div>
            {/*     mobile     */}
            <div className={styles.fieldContainer}>
              <div>
                <label>Mobile no.</label>
              </div>
              <div>
                <div className={styles.inputContainer}>
                  <input className={styles.input} type="number" name='mobile' value={updateFormData.mobile} placeholder="Mobile" onChange={(e) => setUpdateFormData({...updateFormData, [e.target.name]: e.target.value})} />
                </div>
                <div className={styles.errorContainer}>
                  {errors.mobile ? ( <p className={styles.errorMessage}>{errors.mobile}</p>) : 
                  (<p className={styles.errorMessage}>&nbsp;</p>)}
                </div>
              </div>
            </div>
            {/*     update btn     */}
            <div>
              <button type="submit" className={styles.updateBtn}>Save Changes</button>
            </div>
          </form>
          <div>
              <button className={styles.deleteBtn} onClick={handleDeleteConfirm}>Delete Account</button>
            </div>
        </div>
      </div>
      {/*             Modal Container          */}
        {modalStatus && (
          <div className={styles.modalViewContainer}>
            <ConfirmCard handleAction={handleAccountDelete} handleCloseModal={handleCloseModal} label={"delete"} />
          </div>
        )}
    </div>
  );
};

export default Settings;
