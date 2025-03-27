/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "cloud-burst": "#1C2346",
        "custom-orange": "#e06e0e",
        "orange-red": "#e92823",
        "custom-grey": "#76797a",
        "custom-blue": "#3c8dc7",
        "orange-button": "#e14715",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
  ],
};
