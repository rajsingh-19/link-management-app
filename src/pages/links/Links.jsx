import React, { useEffect, useState } from 'react';
import styles from "./links.module.css";
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import ConfirmCard from "../../modals/confirmcard/ConfirmCard";
import LinkModal from "../../modals/link/LinkModal";
import { getAllLinks, deleteLinkById } from '../../services/index';
import sortingIcon from "../../assets/sortingIcon.svg";
import editIcon from "../../assets/editIcon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import copyIcon from "../../assets/copyIcon.svg";
import tickIcon from "../../assets/tickIcon.svg";
import { toast } from 'react-toastify';

const Links = () => {
  const [copied, setCopied] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [confirmModalStatus, setConfirmModalStatus] = useState(false);
  const [linkIdToDelete, setLinkIdToDelete] = useState(null);
  const [linkIdToEdit, setLinkIdToEdit] = useState(null);
  const [linkData, setLinkData] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isGroupedByStatus, setIsGroupedByStatus] = useState(false);
  const [originalLinkData, setOriginalLinkData] = useState([]);
  const [editStatus, setEditStatus] = useState(false);
  const [islinkPage, setIsLinkPage] = useState(false);
  const searchResults = sessionStorage.getItem('searchResults');

  useEffect(() => {
    if (!islinkPage && !searchResults) {
      const fetchLinksData = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
          const res = await getAllLinks(userId, token, currentPage);

          if (res.status === 200) {
            const data = await res.json();
            const linkArr = data.result;

            const { totalItems } = data;

            // Set total items and calculate total pages
            setTotalItems(totalItems);
            setTotalPages(Math.ceil(totalItems / 8));

            // Sort the data based on the current sort order
            sortLinks(linkArr, sortOrder);
            setCurrentPage(currentPage);
          } else {
            const errorData = await res.json();
            const errorMessage = errorData.message || "An error occurred";
            toast.error(errorMessage);
          }
        } catch (error) {
          toast.error(error);
        }
      };

      fetchLinksData(currentPage);
    } else {
      setLinkData(JSON.parse(searchResults));
    }
  }, [currentPage, sortOrder, modalStatus, islinkPage, searchResults]);

  // Function to sort links by date
  const sortLinks = (links, order) => {
    const sortedLinks = [...links].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
    setLinkData(sortedLinks);
  };

  // Toggle sort order on button click
  const handleSort = () => {
    const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
    setSortOrder(newSortOrder); // Update sort order state
  };

  // Function to group links by status (Active on top)
  const groupLinksByStatus = (links) => {
    return [...links].sort((a, b) => {
      const statusA = a.linkExpiryDate && new Date(a.linkExpiryDate) > new Date() ? 'Active' : 'Inactive';
      const statusB = b.linkExpiryDate && new Date(b.linkExpiryDate) > new Date() ? 'Active' : 'Inactive';

      // Active links come before Inactive
      return statusA === 'Active' && statusB === 'Inactive' ? -1 :
        statusA === 'Inactive' && statusB === 'Active' ? 1 : 0;
    });
  };

  // Handle status sorting toggle
  const handleStatusSort = () => {
    if (!isGroupedByStatus) {
      // Store the original order if grouping is being applied for the first time
      setOriginalLinkData([...linkData]);
      const groupedLinks = groupLinksByStatus(linkData);
      setLinkData(groupedLinks); // Group links by status
    } else {
      // Restore the original order
      setLinkData(originalLinkData);
    }

    // Toggle the grouping state
    setIsGroupedByStatus(!isGroupedByStatus);
  };

  const handleCopyLink = (shortenUrl) => {
    // Copy the shorten URL to the clipboard
    navigator.clipboard.writeText(shortenUrl).then(() => {
      // Set copied state to true to show feedback
      setCopied(true);

      // Reset the copied state after a delay
      setTimeout(() => setCopied(false), 3000); // Reset after 2 seconds
    }).catch((error) => {
      console.error('Failed to copy text: ', error);
      toast.error('Failed to copy the link');
    });
  };

  //      function to open the edit link modal
  const handleEditLink = (id) => {
    setEditStatus(true);
    setLinkIdToEdit(id);
    setModalStatus(true); // Open the modal
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    };
  };

  //      function for open the create link
  const handleCreateLink = () => {
    setEditStatus(false);
    setLinkIdToEdit(null);
    setModalStatus(true);
  };

  const handleCloseModal = () => {
    setModalStatus(false);
  };

  //      function for opening the delete confirm modal
  const handleRemoveConfirm = (id) => {
    setLinkIdToDelete(id);
    setConfirmModalStatus(true);
  };

  const handleLinkDelete = async () => {
    const token = localStorage.getItem('token');

    if (!linkIdToDelete) {
      toast.error("No link ID provided");
      return;
    };

    try {
      const res = await deleteLinkById(linkIdToDelete, token);

      if (res.status === 200) {
        toast.success("Link Deleted");
        setLinkData((prevLinks) => prevLinks.filter(link => link._id !== linkIdToDelete));
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "An error occurred";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error);
    }
    setConfirmModalStatus(false);
  };

  //      function for closing the modal
  const handleConfirmCloseModal = (e) => {
    setConfirmModalStatus(false);
  };

  return (
    <div className={styles.linkContainer}>
      <div className={styles.navContainer}>
        <Navbar handleCreateLink={handleCreateLink} setLinkData={setLinkData} setIsLinkPage={setIsLinkPage} />
      </div>
      <div className={styles.sidebarContainer}>
        <Sidebar />
        {/*         copied link button     */}
        {
          copied && (
            <button className={styles.copiedLinkBtn}>
              <img className={styles.tickIcon} src={tickIcon} alt="copied link icon" />
              <span>Link Copied</span>
            </button>
          )
        }
      </div>
      {/* <div className={styles.pageSection}> */}
        <div className={styles.contentContainer}>
          <table className={styles.linkTable}>
            <thead>
              <tr>
                <th className={styles.dateHeading}>
                  <span>Date</span>
                  <img onClick={handleSort} className={styles.sortingIcon} src={sortingIcon} alt="sort icon" />
                </th>
                <th className={styles.orignalHeading}>Original Link</th>
                <th className={styles.shortHeading}>Short Link</th>
                <th className={styles.remarkHeading}>Remarks</th>
                <th className={styles.clicksHeading}>Clicks</th>
                <th className={styles.statusHeading}>
                  <span>Status</span>
                  <img onClick={handleStatusSort} className={styles.sortingIcon} src={sortingIcon} alt="sort icon" />
                </th>
                <th className={styles.actionHeading}>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                linkData && linkData.length > 0 && (
                  linkData.map((link, index) => (
                    <tr key={link._id || index}>
                      <td className={styles.dateData}>
                        {new Date(link.createdAt).toLocaleString("en-US", {
                          month: "short", // 'Jan'
                          day: "2-digit", // '14'
                          year: "numeric", // '2025'
                          hour: "2-digit", // '16'
                          minute: "2-digit", // '30'
                          hour12: false, // 24-hour format (remove this if you want 12-hour format with AM/PM)
                        })}
                      </td>
                      <td className={styles.originalData}>{link.originalUrl}</td>
                      <td className={styles.shortentData}>
                        <span>{link.shortenUrl}</span>
                        <img className={styles.tableDataIconsBtn} onClick={() => handleCopyLink(link.shortenUrl)} src={copyIcon} alt="copy icon" />
                      </td>
                      <td className={styles.remarkData}>{link.remarks}</td>
                      <td className={styles.clicksData}>{link.clicks.length}</td>
                      <td className={styles.statusData}>
                        <span
                          className={
                            !link.linkExpiryDate || new Date(link.linkExpiryDate) > new Date()
                              ? styles.activeStatus
                              : styles.inactiveStatus
                          }
                        >
                          {
                            !link.linkExpiryDate
                              ? "Active"
                              : new Date(link.linkExpiryDate) > new Date()
                                ? "Active"
                                : "Inactive"
                          }
                        </span>
                      </td>
                      <td className={styles.actionData}>
                        <button className={styles.tableDataIconsBtn} onClick={() => handleEditLink(link._id)}>
                          <img src={editIcon} alt="edit icon" />
                        </button>
                        <button className={styles.tableDataIconsBtn} onClick={() => handleRemoveConfirm(link._id)}>
                          <img src={deleteIcon} alt="delete icon" />
                        </button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
          {/*       pagination container     */}
          <div className={styles.paginationContainer}>
            {/* Left Arrow Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? styles.disabledButton : ''}`}
              style={{
                color: currentPage === 1 ? '#C4CDD5' : '',
                backgroundColor: currentPage === 1 ? '#919EAB' : ''
              }}
            >
              <span>&lt;</span>
            </button>
            {/*   Page Numbers   */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1; // Page numbers start from 1
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? styles.activeButton : ''}
                  style={{
                    color: currentPage === page ? 'blue' : '',
                  }}
                >
                  {page}
                </button>
              );
            })}
            {/* Right Arrow Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? styles.disabledButton : ''}`}
              style={{
                color: currentPage === totalPages ? '#C4CDD5' : '',
                backgroundColor: currentPage === totalPages ? '#919EAB' : ''
              }}
            >
              <span>&gt;</span>
            </button>
          </div>
        </div>
      {/* </div> */}
      {/*             Modal Container          */}
      {confirmModalStatus && (
        <div className={styles.confirmModalViewContainer}>
          <ConfirmCard handleAction={handleLinkDelete} handleCloseModal={handleConfirmCloseModal} label={"remove it ?"} />
        </div>
      )
      }
      {/*             create link modal        */}
      {editStatus ?
        (modalStatus && (
          <div className={styles.modalViewContainer}>
            <LinkModal handleCloseModal={handleCloseModal} id={linkIdToEdit} />
          </div>)) :
        (modalStatus && (<div className={styles.modalViewContainer}>
          <LinkModal handleCloseModal={handleCloseModal} />
        </div>))
      }
    </div>
  )
};

export default Links;
