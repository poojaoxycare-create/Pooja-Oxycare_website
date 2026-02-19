import React, { useState, useEffect } from "react";
import "./Loader.css";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
