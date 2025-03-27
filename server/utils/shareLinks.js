const generateShareLinks = (eventId, eventName) => {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
    const eventUrl = `${baseUrl}/event/${eventId}`;
    const encodedName = encodeURIComponent(eventName);
    const encodedUrl = encodeURIComponent(eventUrl);
  
    return {
      twitter: `https://twitter.com/intent/tweet?text=Check out this event: ${encodedName}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
  };
  
  module.exports = generateShareLinks;
  