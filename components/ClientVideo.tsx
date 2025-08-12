"use client";

import React from "react";

const ClientVideo = () => {
  return (
    <video
      className="w-full h-full object-cover"
      autoPlay
      playsInline
      muted
    >
      {/* If you need to stream video from Vapi or another service, replace this src */}
      <source src="/sample-video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default ClientVideo;
