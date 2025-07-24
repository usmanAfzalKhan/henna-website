import React from "react";
import { useParams } from "react-router-dom";
import services from "../data/services";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) return <div>Service not found.</div>;

  return (
    <div>
      <h2>{service.title}</h2>
      <img src={service.image} alt={service.title} />
      <p>{service.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ServiceDetail;
