import React, { useEffect, useState } from "react";
import axios from "axios";
import "../scss/layout/_detyraLab2.scss";

export default function DetyraLab() {
  const [magazine, setMagazine] = useState({
    number: 0,
    name: "",
    type: "",
  });
  const [publishers, setPublishers] = useState([]);
  const [magazines, setMagazines] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [publisherId, setPublisherId] = useState(null);
  // const [selectPublisherId, setSelectPublisherId] = useState(null);
  const [publisherName, setPublisherName] = useState("");
  const [publisherSurname, setPublisherSurname] = useState("");
  const [publisherNameInput, setPublisherNameInput] = useState("");


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log('magazines', magazines);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3011/newMagazine", {
        number: magazine.number,
        name: magazine.name,
        type: magazine.type,
        PublisherID: publisherId
      })
      .then((res) => {
        console.log("Successful creation", res);
        setMagazines(prevMagazines => [...prevMagazines, res.data]);
        setMagazine({
          number: 0,
          name: "",
          type: ""
        })
        setPublisherId(null)
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleNewPublisher = (e) => {
    e.preventDefault()

    axios.post("http://localhost:3011/newPublisher", {
      name: publisherNameInput,
      surname: publisherSurname
    })
    .then((res) => {
      console.log('Successful', res);
      setPublishers(prevPublishers => [...prevPublishers, res.data]);
      setPublisherNameInput("")
      setPublisherSurname("")
    })
    .catch((err) => {
      console.log("error", err);
    });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3011/publisher")
      .then((res) => {
        console.log("Publishers", res);
        setPublishers(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3011/getMagazines")
      .then((res) => {
        console.log("Magazines", res);
        setMagazines(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  // const getPublishers = () => {
  //   axios
  //     .get("http://localhost:3011/publisher")
  //     .then((res) => {
  //       console.log("Publishers", res);
  //       setPublishers(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  const selectPublisher = (publisherId, publisherName, publisherSurname) => {
    setPublisherId(publisherId);
    setPublisherName(publisherName)
    setPublisherSurname(publisherSurname)
    setIsOpen(false);
    // setPublisherDetails((prevPublishers) => [
    //   ...prevPublishers,
    //   {
    //     id: publisherId,
    //     name: publisherName,
    //   },
    // ]);
  };

  const deletePublisher = (publisherId) => {
    axios
      .put(`http://localhost:3011/deletePublisher/${publisherId}`)
      .then((res) => {
        console.log("Publisher deleted", res);
        // getPublishers();
        setPublishers((prevPublishers) =>
          prevPublishers.filter((publisher) => publisher.PublisherID !== publisherId)
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const deleteMagazine = (magazineId) => {
    axios
      .put(`http://localhost:3011/deleteMagazine/${magazineId}`)
      .then((res) => {
        console.log("Magazine deleted", res);
        // getPublishers();
        setMagazines((prevMagazines) =>
          prevMagazines.filter((magazine) => magazine.MagazineID !== magazineId)
        );
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  return (
    <div className="mpCtn">
      <div className="magazines">
        <form action="" onSubmit={handleSubmit} className="addPubForm">
          <input
            style={{
              border: "1px solid black",
            }}
            type="number"
            // onChange={(e) => setNumber(e.target.value)}
            onChange={(e) => setMagazine({ ...magazine, number: e.target.value })}
            placeholder="Enter number of magazine"
          />
          <input
            style={{
              border: "1px solid black",
            }}
            type="text"
            // onChange={(e) => setName(e.target.value)}
            onChange={(e) => setMagazine({ ...magazine, name: e.target.value })}
            placeholder="Enter name of magazine"
          />
          <input
            style={{
              border: "1px solid black",
            }}
            type="text"
            // onChange={(e) => setType(e.target.value)}
            onChange={(e) => setMagazine({ ...magazine, type: e.target.value })}
            placeholder="Enter type of magazine"
          />

          <div className="flexRolesSubmit">
            <div className="dropdownDiv">
              <div
                className={`dropdown-button roleDd`}
                onClick={toggleDropdown}
              >
                {publisherName || "Select publisher"}
                {/* <img src={arrowDown} alt="" /> */}
              </div>
              {isOpen && (
                <ul className="dropdown-list">
                  {publishers.map((publisher) => (
                    <li
                      key={publisher.PublisherID}
                      onClick={() =>
                        selectPublisher(publisher.PublisherID, publisher.name, publisher.surname)
                      }
                    >
                      {publisher.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button>Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>M ID</th>
              <th>Magazine nr.</th>
              <th>Name</th>
              <th>Type</th>
              <th>Publisher</th>
            </tr>
          </thead>
          <tbody>
              {magazines.map((magazine) => {
                 return (
                  <tr key={magazine.MagazineID} className="borderRows">
                    <td>{magazine.MagazineID}</td>
                    <td>{magazine.number}</td>
                    <td>{magazine.name}</td> {/* Assuming you have a 'surname' property */}
                    <td>{magazine.type}</td> {/* Assuming you have a 'surname' property */}
                    <td>{magazine.PublisherID}</td> {/* Assuming you have a 'surname' property */}
                    <td>
                      <button style={{color: 'red'}} onClick={() => deleteMagazine(magazine.MagazineID)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
        </table>
      </div>

      <div className="publishers">
        <div className="magazines">
          <form action="" className="addPubForm" onSubmit={handleNewPublisher}>
           
            <input
              style={{
                border: "1px solid black",
              }}
              type="text"
              value={publisherNameInput}
              onChange={(e) => setPublisherNameInput(e.target.value)}
              placeholder="Enter name of the publisher"
            />
            <input
              style={{
                border: "1px solid black",
              }}
              type="text"
              value={publisherSurname}
              onChange={(e) => setPublisherSurname(e.target.value)}
              placeholder="Enter surname of the publisher"
            />


            <button>Submit</button>
          </form>
          <table>
            <thead>
  
              <tr>
                <th>Publisher ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Birthyear</th>
              </tr>
        
            </thead>
            <tbody>
              {publishers.map((publisher) => {
                 return (
                  <tr key={publisher.PublisherID} className="borderRows">
                    <td>{publisher.PublisherID}</td>
                    <td>{publisher.name}</td>
                    <td>{publisher.surname}</td> {/* Assuming you have a 'surname' property */}
                    <td>{publisher.birthyear}</td> {/* Assuming you have a 'surname' property */}
                    <td>
                      <button style={{color: 'red'}} onClick={() => deletePublisher(publisher.PublisherID)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
