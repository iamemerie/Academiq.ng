import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls

function BookingModal({ tutor, onClose }) {
  const [requests, setRequests] = useState([]); // State to hold the list of requests

  const [selectedRequest, setSelectedRequest] = useState(null); // State to hold the currently selected request

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRequest) {
      alert("Please select a request before submitting.");
      return;
    }
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      await axios.post(
        "http://localhost:5000/api/requests/create-request/",
        {
          tutorId: tutor._id, // Pass the tutor's ID in the request body
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
        },
      );
      alert("Request sent successfully!");
      onClose(); // Close the modal after successful submission
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }

    useEffect(() => {
      // Fetch the list of requests for the tutor when the component mounts
      const fetchRequests = async () => {
        try {
          const token = localStorage.getItem("token"); // Get the token from localStorage
          const response = await axios.get(
            "http://localhost:5000/api/requests/my-requests/",
            {
              headers: { Authorization: `Bearer ${token}` }, // Include the token in the request headers
            },
          );
          setRequests(response.data); // Update the state with the fetched requests
        } catch (error) {
          console.error("Error fetching requests:", error);
        }
      };

      fetchRequests(); // Call the function to fetch requests
    }, []); // Empty dependency array to run the effect only once on mount

    const handleRequestClick = (request) => {
      setSelectedRequest(request); // Set the selected request when a request is clicked
    };
  };
}
