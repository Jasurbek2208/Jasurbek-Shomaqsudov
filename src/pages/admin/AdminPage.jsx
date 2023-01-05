import React, { useState } from "react";
import styled from "styled-components";
import AddPage from "../../components/addPage/AddPage";
import Button from "../../components/button/Button";

export default function AdminPage() {
  const [open, setOpen] = useState(false);

  return (
    <StyledAdminPage>
      <div className="container">
        <h1>Admin Panel</h1>
        <div className="btn-wrapper">
          <Button
            className="add-btn"
            type="button"
            onClick={() => setOpen(true)}
            content="Add Portfolio"
          />
        </div>
      </div>
      <AddPage open={open} setOpen={setOpen} />
    </StyledAdminPage>
  );
}

const StyledAdminPage = styled.div`
  padding: 145px 0px;
  height: 100vh;
  background-color: #ececec;

  .container {
    h1 {
      text-align: center;
      font-weight: 800;
      font-size: 2rem;
      color: #1b1b1b;
    }

    .btn-wrapper {
      margin-top: 60px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .add-btn {
        cursor: pointer;
        padding: 12px 16px;
        border: none;
        background-color: #0068c4;
        border-radius: 10px;
        color: #fff;
        font-size: 16px;
        transition: 0.3s;

        &:hover {
          box-shadow: 8px 6px 8px 2px #ccc;
        }

        &:focus {
          outline: none;
          box-shadow: 8px 6px 8px 2px #ccc;
        }

        &:active {
          transform: scale(98%);
        }
      }
    }
  }
`;
