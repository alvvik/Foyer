export const getInitials = (firstName,lastName) => {
    const first = firstName?.trim()?.[0] || "";
    const last = lastName?.trim()?.[0] || "";
    return (first + last).toUpperCase() || "?";
  };