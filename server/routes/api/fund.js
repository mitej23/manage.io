const express = require("express");
const router = express.Router();
const axios = require("axios");
const dateFns = require("date-fns");

function processDate(date) {
  var parts = date.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

router.get("/", async (req, res) => {
  try {
    const code = req.query.code;
    let doi, processedDoi;

    if (req.query.doi) {
      doi = req.query.doi;
      processedDoi = processDate(doi);
    }

    console.log(code, doi, processedDoi);

    await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        // map through and find lowest and highest
        let lowest = parseFloat(data.data[0].nav);
        let highest = parseFloat(data.data[0].nav);

        let indexOfDoiFound = false;
        let indexOfDoi = 0;

        let yearFound = false;
        let yearIndex = 0;
        let yearOldDate = dateFns.sub(processDate(data.data[0].date), {
          years: 1,
        });

        let threeYearFound = false;
        let threeYearIndex = 0;
        let threeYearDate = dateFns.sub(processDate(data.data[0].date), {
          years: 3,
        });

        data.data.forEach((element, i) => {
          //get index of dates
          // 1year index
          if (yearFound === false) {
            if (processDate(element.date) < yearOldDate) {
              console.log(element);
              yearFound = true;
              yearIndex = i;
            }
          }
          // 3year index
          if (threeYearFound === false) {
            if (processDate(element.date) < threeYearDate) {
              console.log(element);
              threeYearFound = true;
              threeYearIndex = i;
            }
          }
          // get index of doi

          if (req.query.doi) {
            if (indexOfDoiFound === false) {
              if (element.date === doi) {
                indexOfDoiFound = true;
                indexOfDoi = i;
              }
            }
          }

          if (parseFloat(element.nav) < lowest) {
            lowest = parseFloat(element.nav);
          }
          if (parseFloat(element.nav) > highest) {
            highest = parseFloat(element.nav);
          }
        });

        //get the data at date of investment
        let timeOfInv = data.data.filter((element) => {
          return element.date === doi;
        });

        if (req.query.doi) {
          return res.status(200).json({
            data,
            lowest,
            highest,
            timeOfInv,
            yearIndex,
            threeYearIndex,
            indexOfDoi,
          });
        } else {
          return res.status(200).json({
            data,
            lowest,
            highest,
            yearIndex,
            threeYearIndex,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, err: "Server Error" });
  }
});

router.get("/dates", async (req, res) => {
  try {
    const code = req.query.code;
    let response = await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        let dates = data.data.map((element) => {
          return element.date;
        });
        return res.status(200).json({ dates });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ success: false, err: "Server Error" });
  }
});

module.exports = router;
