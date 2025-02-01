import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./settings.module.css";
import { getUserInfo, updateUser, deleteUser } from "../../services/index";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import LinkModal from "../../modals/link/LinkModal";
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
  const [confirmModalStatus, setConfirmModalStatus] = useState(false);  
  const [isDeleting, setIsDeleting] = useState(false); // Track deletion status
  const [matchingEmail, setMatchingEmail] = useState("");

  useEffect(() => {  
    let isMounted = true; // Variable to track whether the component is mounted

    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        console.error("Missing user ID or token");
        navigate('/'); 
        return;   // Stop further execution
      };

      try {
        const userDataRes = await getUserInfo(userId, token);
        if(isMounted && userDataRes.status === 200) {
          const data = await userDataRes.json();
          
          // Set the values in the state
          setUpdateFormData({
            name: data.result.name,
            email: data.result.email,
            mobile: data.result.mobile
          });
          setMatchingEmail(data.result.email);
        } else if (isMounted) {
          const errorData = await userDataRes.json();
          const errorMessage = errorData.message || "An error occurred";
          toast.error(errorMessage);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          toast.error("An unexpected error occurred.");
        }
      };
    };
    
    // fetchUserData();
    if (!isDeleting) {
      fetchUserData(); // Only fetch user data if not deleting
    };

    return () => {
      isMounted = false; // Cleanup to prevent state updates after unmount
    };
  },[navigate, isDeleting]);

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
    };

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error("Missing user ID or token");
      return { error: "User ID or token is missing." };
    };

    try {
      const res = await updateUser(updateFormData, userId, token);
      if (res.status === 201) {

        toast.success("Updated Successfully");
        if(matchingEmail !== updateFormData.email) {
          localStorage.removeItem('userId');
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          navigate('/');
        }
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage); // Show the error message from the backend
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  };

  //      function for open the create link
  const handleCreateLink = () => {
    setModalStatus(true);
  };
  
  //      function for closing the modal
  const handleCloseModal = (e) => {
    setModalStatus(false);
  };

  //      function for opening the modal
  const handleDeleteConfirm = () => {
    setConfirmModalStatus(true);
  };

  //      function for closing the modal
  const handleConfirmCloseModal = (e) => {
    setConfirmModalStatus(false);
  };

  //               Function to handle user deletion
  const handleAccountDelete = async () => {
    setIsDeleting(true); // Set deleting status to true
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      console.error("Missing user ID or token");
      return { error: "User ID or token is missing." };
    };

    try {
      const res = await deleteUser(userId, token); 

      if (res.status === 200) {

        // Clear localStorage and navigate to the login page immediately
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        toast.success("Account Deleted Successfully");
        navigate('/');
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

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.navContainer}>
        <Navbar handleCreateLink={handleCreateLink} />
      </div>
      <div className={styles.sidebarContainer}>
        <Sidebar />
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
      {/*             Modal Container          */}
        {confirmModalStatus && (
          <div className={styles.confirmModalViewContainer}>
            <ConfirmCard handleAction={handleAccountDelete} handleCloseModal={handleConfirmCloseModal} label={"delete the account ?"} />
          </div>
        )
      }
      {/*             create link modal        */}
      {modalStatus && (
        <div className={styles.modalViewContainer}>
          <LinkModal handleCloseModal={handleCloseModal} />
        </div>
      )
      }
    </div>
  );
};

export default Settings;
