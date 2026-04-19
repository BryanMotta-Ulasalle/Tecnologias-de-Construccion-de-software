import { useState } from "react";
import { useTranslation } from "react-i18next";

function Form() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: ""
  });

  const [errors, setErrors] = useState({});

  const nameRegex = /^[a-zA-Z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};

    if (!nameRegex.test(form.name)) {
      newErrors.name = t("errorName");
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = t("errorEmail");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(" OK");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {t("title")}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* NAME */}
        <div>
          <label className="block mb-1 font-medium">
            {t("name")}
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.name ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="block mb-1 font-medium">
            {t("email")}
          </label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-500"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {t("submit")}
        </button>

      </form>
    </div>
  );
}

export default Form;