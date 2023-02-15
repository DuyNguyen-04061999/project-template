const ERROR_MESSAGE = {
  require: "Vui lòng điền vào trường này",
  regex: "Vui lòng điền giá trị đúng",
  minMax: (min, max) =>
    `Vui lòng điền giá trị có độ dài trong khoản ${min} - ${max}`,
  min: (min) => `Vui lòng điền giá trị có độ dài tối thiểu là ${min}`,
  confirm: "Giá trị chưa chính xác",
};

const REGEXP = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  website:
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
  facebook:
    /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
};

export default function validate(rules = {}, form = {}) {
  const errObj = {};

  for (const name in rules) {
    for (const rule of rules[name]) {
      if (rule.require) {
        if (
          (typeof form[name] === "boolean" && !form[name]) ||
          (typeof form[name] !== "boolean" && !form[name]?.trim())
        ) {
          errObj[name] = rule.message || ERROR_MESSAGE.require;
        }
      }

      if (typeof form[name] !== "boolean" && form[name]?.trim()) {
        if (typeof rule === "function") {
          const message = rule(form[name], form);
          message && (errObj[name] = message);
          break;
        }

        if (rule.regex) {
          let regex = rule.regex;

          if (regex in REGEXP) {
            regex = REGEXP[regex];
          } else if (!(regex instanceof RegExp)) {
            regex = new RegExp();
          }

          if (!regex.test(form[name]?.trim())) {
            errObj[name] = rule.message || ERROR_MESSAGE.regex;
          }
        }

        if (rule.min && rule.max) {
          if (form[name].length < min || form[name].length > max) {
            errObj[name] =
              rule.message || ERROR_MESSAGE.minMax(rule.min, rule.max);
          }
        }

        if (rule.min) {
          if (form[name].length < rule.min) {
            errObj[name] = rule.message || ERROR_MESSAGE.min(rule.min);
          }
        }

        if (rule.confirm) {
          if (form[rule.confirm] !== form[name]) {
            errObj[name] = rule.message || ERROR_MESSAGE.confirm;
          }
        }
      }
    }
  }

  return errObj;
}

export const require = ({ require = true, message } = {}) => ({
  require,
  message,
});

export const regex = (regex, message) => ({
  regex,
  message,
});

export const min = (min, message) => ({
  min,
  message,
});

export const minMax = (min, max, message) => ({
  min,
  max,
  message,
});

export const confirm = (confirm, message) => ({
  confirm,
  message,
});
