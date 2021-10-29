let pageNames = ["index", "search", "details", "ui", "account"].map((p) => {
  return { name: p, folder: p };
});
exports.pages = [
  ...pageNames,
  { name: "__login", folder: "account/__login", filename: "login" },
  { name: "__register", folder: "account/__register", filename: "register" },
];
