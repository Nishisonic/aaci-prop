import { writeFile } from "fs";

const start2 = await fetch("https://raw.githubusercontent.com/Tibowl/api_start2/master/start2.json")

const masterData = await start2.json()
writeFile("static/START2.json", JSON.stringify(masterData), (err) => {
  if (err) {
    console.error(`START2 Failed.`);
  } else {
    console.log(`START2 Complete.`);
  }
});
