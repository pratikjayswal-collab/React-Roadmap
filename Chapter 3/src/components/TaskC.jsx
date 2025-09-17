import React, { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext';

const TaskC = () => {

    const {language} = useContext(LanguageContext)
    const texts = {
    en: {
      welcome: "Welcome to our website!",
      about: "This is a demo of multi-language support.",
    },
    es: {
      welcome: "¡Bienvenido a nuestro sitio web!",
      about: "Esta es una demostración de soporte multilingüe.",
    },
  };

  return (
    <div className="max-w-lg bg-white rounded-2xl shadow-lg p-6 text-center">
      <h2 className="text-2xl font-semibold mb-3">{texts[language].welcome}</h2>
      <p className="text-gray-600">{texts[language].about}</p>
    </div>
  )
}

export default TaskC