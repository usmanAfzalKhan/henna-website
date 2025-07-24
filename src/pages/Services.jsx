import React from "react";
import services from "../data/services";
import { Link } from "react-router-dom";

const Services = () => (
  <div>
    <h2>Our Services</h2>
    <div>
      {services.map((service) => (
        <div key={service.slug}>
          <img src={service.image} alt={service.title} />
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <Link to={`/services/${service.slug}`}>View Detail</Link>
        </div>
      ))}
    </div>
  </div>
);

export default Services;
