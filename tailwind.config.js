// /** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: "selector",
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       borderWidth: {
//         0.9: "0.5px",
//       },
//       colors: {
//         primary: "#4A3BCB",
//         silver: "#C0C0C0",
//         text: {
//           light: "#37474F",
//           dark: "#DEE4E7",
//         },
//       },
//       backgroundImage: {
//         "black-to-white":
//           "linear-gradient(180deg, rgba(46,46,46,1) 0%, rgba(21,21,21,1) 100%)",
//       },
//     },
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           primary: "#4A3BCB",
//           "base-100": "#FFFFFF",
//           text: "#37474F",
//         },
//         dark: {
//           primary: "#4A3BCB",
//           "base-100": "#1A202C",
//           text: "#DEE4E7",
//         },
//       },
//     ],
//   },
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#52B2AD",
      },
      boxShadow: {
        customFocus: "0 0 0 2px rgba(74, 59, 203, 0.6)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
