export const setCSSVariable = (name, val) => document.documentElement.style.setProperty(name, val);

export const getCSSVariable = name => getComputedStyle(document.documentElement).getPropertyValue(name);