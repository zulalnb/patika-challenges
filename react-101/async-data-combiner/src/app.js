import getData from "./lib/service.js";

(async () => {
  const data = await getData(1);
  console.log(data);
})();
