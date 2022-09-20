import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc7",
      }}
    >
      <div
        class="spinner-border"
        role="status"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          scale: "200%",
        }}
      >
        <span class="sr-only"></span>
      </div>
    </div>
  );
}
