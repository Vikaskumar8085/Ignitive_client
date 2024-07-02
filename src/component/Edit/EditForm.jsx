import React, { useState } from "react";

function EditForm({
  handleSubmit,
  setIsfile,
  setTitle,
  setuser,
  user,
  isFile,
  title,
}) {
  const OnSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user", user);
    formData.append("title", title);
    formData.append("Pdffiles", isFile);

    handleSubmit(formData);
  };
  return (
    <>
      <div className="edit-form">
        <form onSubmit={OnSubmit}>
          <div className="mb-3">
            <label className="">User</label>
            <input
              type="text"
              className=""
              onChange={(e) => setuser(e.target.value)}
              value={user}
              placeholder="Please Enter Your Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              required
              className="w-100 my-2 p-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Please Enter Your Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PdfFile">Attachment</label>
            <input
              type="file"
              onChange={(e) => {
                setIsfile(e.target.files[0]);
              }}
              defaultValue={""}
              required
            />
          </div>
          <div className="mb-3">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditForm;
