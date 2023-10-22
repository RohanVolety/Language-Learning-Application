import React, { useState, useEffect } from "react";

const Greetings = () => {
  const [language, setLanguage] = useState("English");
  const [currentGreeting, setCurrentGreeting] = useState("Hello!");

  const languages = ["English", "Spanish", "French"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextLanguageIndex = (languages.indexOf(language) + 1) % languages.length;
      const nextLanguage = languages[nextLanguageIndex];
      setLanguage(nextLanguage);
      setCurrentGreeting(getGreeting(nextLanguage));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [language]);

  const getGreeting = (language) => {
    switch (language) {
      case "English":
        return "Hello!";
      case "Spanish":
        return "Hola!";
      case "French":
        return "Bonjour!";
      default:
        return "Hello!";
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>{currentGreeting}</h1>

    </div>
  );
};

export default Greetings;
