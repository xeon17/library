const defaultTheme = require("tailwindcss/defaultTheme");
export default {
    theme: {
        extend: {
            fontFamily: {
                sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                loginPage: "#f9fbfc",
                loginButton: "#24a0ed",
                loginHover: "#0ba6ff",
                profilePage: "#f5f4f8",
                mainPage: "#fafbfd",
            },
            boxShadow: {
                default: "0px 1px 3px rgba(0,0,0,0.1), 0px 6px 12px rgba(0,0,0,0.08)",
            },
            backgroundImage: {
                home: "url(/background.png)",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
