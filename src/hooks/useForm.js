import validate from "@/utils/validate";
import { useRef, useState } from "react";

export const useForm = (rules = {}, initialValue = {}) => {
  const [form, setForm] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const formRef = useRef();
  const register = (name) => {
    return {
      error: errors[name],
      value: form[name] || "",
      id: name,
      name,
      onChange: (e) => {
        let _value = { [name]: e.target.value };
        if (Array.isArray(rules[name]) && rules[name].length > 0) {
          const errObj = validate(
            {
              [name]: rules[name],
            },
            _value
          );

          setErrors((error) => ({ ...error, [name]: "" }));
        }
        setForm((form) => ({ ...form, [name]: e.target.value }));
      },
    };
  };

  const _validate = () => {
    const errorObject = validate(rules, form);
    setErrors(errorObject);
    if (formRef.current && Object.keys(errorObject).length > 0) {
      const fieldName = Object.keys(errorObject);
      formRef.current.querySelector(`input[name=${fieldName[0]}]`)?.focus();
    }

    return Object.keys(errorObject).length === 0;
  };

  const reset = () => {
    setForm({});
  };

  return {
    form,
    errors,
    register,
    validate: _validate,
    reset,
    formRef,
  };
};
