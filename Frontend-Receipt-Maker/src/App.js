import { useState } from "react";
import "./someCSS.css";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [fPrice, setFPrice] = useState(0);
  const [sPrice, setSPrice] = useState(0);

  const handleChange = (e) => {
    let keyId = e.target.id;
    if (keyId) {
      if (keyId === "name") {
        setName(e.target.value);
      }
      if (keyId === "receiptId") {
        setReceiptId(e.target.value);
      }
      if (keyId === "fPrice") {
        setFPrice(e.target.value);
      }
      if (keyId === "sPrice") {
        setSPrice(e.target.value);
      }
      if (keyId === "num") {
        setNum(e.target.value);
      }
    }
    console.log(e.target.id);
  };

  const createAndDownloadPDF = () => {
    axios
      .post("/create-pdf", {
        name,
        receiptId,
        fPrice,
        sPrice,
        num,
      })
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "smartDineReciept.pdf");
      });
    console.log(`submitted`);
    // console.log(state);
  };

  return (
    <div className="form">
      <div className="title">Welcome to SmartDine!!!</div>
      <div className="subtitle">Let's create your Invoice!</div>
      <div className="input-container ic1">
        <input
          id="name"
          value={name}
          className="input"
          type="text"
          placeholder=" "
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">
          Name
        </label>
      </div>
      <div className="input-container ic1">
        <input
          id="num"
          value={num}
          className="input"
          type="text"
          placeholder=" "
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label htmlFor="name" className="placeholder">
          Number
        </label>
      </div>
      <div className="input-container ic2">
        <input
          name="receiptId"
          id="receiptId"
          className="input"
          type="number"
          placeholder=" "
          value={receiptId}
          onChange={handleChange}
        />
        <div className="cut"></div>
        <label htmlFor="receiptId" className="placeholder">
          Receipt Id
        </label>
      </div>
      <div className="input-container ic2">
        <input
          name="fPrice"
          id="fPrice"
          className="input"
          type="number"
          placeholder=" "
          value={fPrice}
          onChange={handleChange}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="fPrice" className="placeholder">
          Price 1
        </label>
      </div>
      <div className="input-container ic2">
        <input
          name="sPrice"
          id="sPrice"
          className="input"
          type="number"
          placeholder=" "
          value={sPrice}
          onChange={handleChange}
        />
        <div className="cut cut-short"></div>
        <label htmlFor="sPrice" className="placeholder">
          Price 2
        </label>
      </div>
      <button type="text" className="submit" onClick={createAndDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
}

export default App;
