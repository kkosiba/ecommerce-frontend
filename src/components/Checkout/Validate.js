export const required = value => value ? undefined : "Required";

export const phoneNumber = value => {
  if (value && !/^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|)\d{3,4})?$/g.test(value)) {
    return "Invalid UK phone number!";
  } else {
    return undefined;
  }
};

export const postcode = value => {
  if (value && !/^([A-Za-z][A-Ha-hK-Yk-y]?[0-9][A-Za-z0-9]? ?[0-9][A-Za-z]{2}|[Gg][Ii][Rr] 0[Aa]{2})$/gi.test(value)) {
    return "Invalid postcode!";
  } else {
    return undefined;
  }
};
