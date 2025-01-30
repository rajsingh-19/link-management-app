import React, { useEffect, useState } from 'react';
import styles from "./link.module.css";
import crossWhite from '../../assets/crossWhite.svg';
import date from '../../assets/date.svg';
import Switch from "react-switch";
import { toast } from 'react-toastify';
import { createLink, getLink, updateLink } from '../../services';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LinkModal = ({ handleCloseModal, id }) => {
  const [isExpiry, setIsExpiry] = useState(false);
  const [linkFormData, setLinkFormData] = useState({
    originalUrl: '',
    remarks: '',
    linkExpiryDate: null,
    user: localStorage.getItem('userId')
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetchLink();
    }
  }, [id]);

  const fetchLink = async () => {
    const token = localStorage.getItem('token');
    try {
      const result = await getLink(id, token);
      if (result.status === 200) {
        const data = await result.json();

        if (data.result.linkExpiryDate) {
          setIsExpiry(true);

          setLinkFormData({
            originalUrl: data.result.originalUrl,
            remarks: data.result.remarks,
            linkExpiryDate: new Date(data.result.linkExpiryDate),
          });
        } else {
          setLinkFormData({
            originalUrl: data.result.originalUrl,
            remarks: data.result.remarks,
            linkExpiryDate: '',
          });
        }
      } else {
        const error = await result.json();
        const errorMessage = error.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    };
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinkFormData({ ...linkFormData, [name]: value });
  };

  // form validation logic
  const validateForm = () => {
    const errors = {};

    if (!linkFormData.originalUrl.trim()) {
      errors.originalUrl = "This field is mandatory";
    };

    if (!linkFormData.remarks.trim()) {
      errors.remarks = "This field is mandatory";
    };

    if (isExpiry) {
      if (!linkFormData.linkExpiryDate) {
        errors.linkExpiryDate = "Please choose a date";
      };
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleClear = () => {
    setLinkFormData({
      originalUrl: '',
      remarks: '',
      linkExpiryDate: '',
      userId: localStorage.getItem('userId')
    })
  }

  const handleExpiry = () => {
    setIsExpiry(!isExpiry);
    setErrors({
      ...errors,
      linkExpiryDate: ''
    });
  }

  const handleCreateLink = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    };
    const token = localStorage.getItem('token');

    try {
      const res = await createLink(linkFormData, token);
      if (res.status === 201) {
        handleClear();

        toast.success("Link Created Sucessfully");
        handleCloseModal();
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  }

  const handleUpdateLink = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    };
    const token = localStorage.getItem('token');

    try {
      const res = await updateLink(linkFormData, token, id);
      if (res.status === 200) {
        handleClear();

        toast.success("Link Updated Sucessfully");
        handleCloseModal();
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred:", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.firstSection}>
        {id ? <div>Edit Link</div> : <div>New Link</div>}
        <img src={crossWhite} alt="" onClick={handleCloseModal} style={{ cursor: 'pointer' }} />
      </div>
      <div className={styles.secondSection}>
        <div className={styles.urlContainer}>
          <div className={styles.label}>Destination Url <span style={{ color: 'red' }}>*</span></div>
          <div>
            <input type="text" className={styles.input} onChange={handleChange} value={linkFormData.originalUrl} name='originalUrl' placeholder='https://web.whatsapp.com/' />
            <div className={styles.errorContainer}>
              {errors.originalUrl ? (<p className={styles.errorMessage}>{errors.originalUrl}</p>) :
                (<p className={styles.errorMessage}>&nbsp;</p>)}
            </div>
          </div>
        </div>
        <div className={styles.remarksContainer}>
          <div className={styles.label}>Remarks <span style={{ color: 'red' }}>*</span></div>
          <div>
            <textarea name="remarks" id="remarks" className={styles.textarea} onChange={handleChange} value={linkFormData.remarks} placeholder='Add Remarks' rows={6}></textarea>
            <div className={styles.errorContainer}>
              {errors.remarks ? (<p className={styles.errorMessage}>{errors.remarks}</p>) :
                (<p className={styles.errorMessage}>&nbsp;</p>)}
            </div>
          </div>
        </div>
        <div className={styles.linkExpireContainer}>
          <div className={styles.toggleBox}>
            <div className={styles.label}>Link Expiration</div>
            <Switch onChange={handleExpiry} checked={isExpiry} offColor='#B1B1B1' onColor='#1A5FFF' uncheckedIcon={false} checkedIcon={false} height={25} />
          </div>
          <div style={{ width: '100%' }}>
            {isExpiry && (
              <div style={{ position: 'relative' }}>
                <DatePicker
                  selected={linkFormData.linkExpiryDate}
                  onChange={(date) => setLinkFormData({ ...linkFormData, linkExpiryDate: date })}
                  showTimeSelect
                  dateFormat="MMM d, yyyy, h:mm aa"
                  placeholderText="Select date and time"
                  className={styles.showDate}
                />
                <img src={date} alt="" className={styles.date} />
              </div>
            )}
            <div className={styles.errorContainer}>
              {errors.linkExpiryDate ? (<p className={styles.errorMessage}>{errors.linkExpiryDate}</p>) :
                (<p className={styles.errorMessage}>&nbsp;</p>)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.clear} onClick={handleClear}>Clear</div>
        {id ? <div className={styles.createNew} onClick={handleUpdateLink}>Update</div> : <div className={styles.createNew} onClick={handleCreateLink}>Create new</div>}
      </div>
    </div >
  )
};

export default LinkModal;