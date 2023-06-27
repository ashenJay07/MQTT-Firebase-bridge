"use client";
import { getDatabase, ref, push, set } from "firebase/database";
import { useState } from "react";
import app from "../index";

export default function BridgeComponent() {
  const [data, setData] = useState({
    deviceId: null,
    topic: "",
    sensorValue: null,
  });
  const [topic, setTopic] = useState(["temperature", "vibration"]);

  const handleClick = (e) => {
    e.preventDefault();
    const database = getDatabase(app);
    const { deviceId, topic, sensorValue } = data;

    const newKey = push(ref(database, `${deviceId}/${topic}`)).key;

    // Write data to the database
    set(ref(database, `${deviceId}/${topic}/${newKey}`), sensorValue)
      .then(() => {
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  const handleChange = (e) => {
    const tempData = data;
    tempData[e.target.name] =
      e.target.name === "deviceId"
        ? e.target.value.toUpperCase()
        : e.target.value.toLowerCase();

    setData(tempData);
  };

  return (
    <>
      <div className="container col-8">
        <form>
          <div className="mb-3">
            <label htmlFor="deviceId" className="form-label">
              Device ID
            </label>
            <input
              type="email"
              className="form-control"
              id="deviceId"
              name="deviceId"
              aria-describedby="emailHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <select
              className="form-select"
              name="topic"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select a Topic
              </option>
              {topic.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="sensorValue" className="form-label">
              Data
            </label>
            <input
              type="email"
              className="form-control"
              id="sensorValue"
              name="sensorValue"
              aria-describedby="emailHelp"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleClick(e)}
          >
            Publish Data
          </button>
        </form>
      </div>
    </>
  );
}
