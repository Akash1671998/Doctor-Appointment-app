import React, { useEffect, useState } from "react";
import { APIUrl } from "../../utils";
import CustomTable from "../Table";
import UserActions from "../UserActions";
import { application } from "../../authentication/auth";
import DynamicFormDialog from "../DynamicForm";
import DeleteConfirmation from "../ConfirmationBox";
import CTLNotification from "../Notification";
import DashboardPageWrapper from "../layout/DashboardPageWrapper";

const DoctorList = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rowId, setRowId] = useState("");
  const [updateList, setUpdateList] = useState(Date.now());
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedRows, setSelectedRows] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const handleEdit = (row) => {
    setRowId(row._id);
    setSelectedUser(row);
    setDialogOpen(true);
  };

  const deleteRow = (rowId) => {
    setConfirmDelete(true);
    setSelectedRows(rowId._id);
  };

  const handleDialogSubmit = (updatedData) => {
    application
      .put(`${APIUrl}/doctor/update/${rowId}`, updatedData)
      .then((response) => {
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "User Details",
          message: response.data.message,
        });
        setDialogOpen(false);
        setUpdateList(Date.now());
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "User Details",
          message: error.response?.data?.message,
        });
      });
  };

  const handleDialogCancel = () => {
    setDialogOpen(false);
  };

  const columns = [
    { field: "firstName", headerName: "Fist Name", flex: 1, allowForm: true },
    { field: "lastName", headerName: "Last Name", flex: 1, allowForm: true },
    { field: "email", headerName: "Email", flex: 1, allowForm: true },
    { field: "phone", headerName: "Contact", flex: 1, allowForm: true },
    { field: "address", headerName: "Address", flex: 1, allowForm: true },
    {
      field: "specialization",
      headerName: "Specialization",
      flex: 1,
      allowForm: true,
    },
    { field: "experience", headerName: "Experience", flex: 1, allowForm: true },
    { field: "fees", headerName: "Fees", flex: 1, allowForm: true },
     { field: "fromTime", headerName: "From Timing", flex: 1, allowForm: true },
     { field: "toTime", headerName: "To Timing", flex: 1, allowForm: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <UserActions
          row={params.row}
          onEdit={handleEdit}
          onDelete={deleteRow}
        />
      ),
    },
  ];

  const handleDelete = () => {
    if (!selectedRows) return;
    application
      .delete(`/doctor/delete/${selectedRows}`)
      .then((response) => {
        setNotify({
          isOpen: true,
          type: "success",
          pagename: "Expense Data",
          message: response.data.message,
        });
        setUpdateList(Date.now());
      })
      .catch((error) => {
        setNotify({
          isOpen: true,
          type: "error",
          pagename: "Expense Data",
          message: error.response?.data?.message || "Delete failed",
        });
      });
    setConfirmDelete(false);
    setSelectedRows(null);
  };

  const onCancel = () => {
    setConfirmDelete(false);
    setSelectedRows(null);
  };
  return (
    <>
      <DashboardPageWrapper>
        <CustomTable
          dynamicSearch={false}
          searchEnable={true}
          filterEnable={true}
          title="Doctor Details"
          apiUrl={`${APIUrl}/doctor/list`}
          columns={columns}
          updateList={updateList}
        />

        <DynamicFormDialog
          open={dialogOpen}
          columns={columns}
          initialData={selectedUser}
          onSubmit={handleDialogSubmit}
          onCancel={handleDialogCancel}
          title="Edit User Details"
        />
        <DeleteConfirmation
          entityName="Doctor Details"
          confirmDelete={confirmDelete}
          onAgree={handleDelete}
          onCancel={onCancel}
        />
        <CTLNotification notify={notify} setNotify={setNotify} />
      </DashboardPageWrapper>
    </>
  );
};

export default DoctorList;
