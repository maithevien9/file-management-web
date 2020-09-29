import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Document.scss";
import { Scrollbars } from "react-custom-scrollbars";
import Folder from "../../../public/image/folder2.png";
import GetFolderFromRoom from "../../../RestAPI/Folder/GetFolderFromRoom";
import GetFolderAndFileFromFolder from "../../../RestAPI/Folder/GetFolderAndFileFromFolder";

import { connect } from "react-redux";

Document.propTypes = {};

function Document(props) {
  const [DataDocument, setDataDocument] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  var dataArrayFolder = JSON.parse(JSON.stringify(props.DataFolderRoom));
  const [valueDocument, setValueDocument] = useState(true);
  const [tempValue, setTempValue] = useState("");
  var DataFolderRoom = [];
  var tempBack = 0;

  useEffect(() => {
    // setDataRoom(["2", "3"]);
    // console.log("??");
    // console.log(dataRoom);
    // GetFolderFromRoom(101)
    //   .then((json) => {
    //     DataFolderRoom = JSON.parse(JSON.stringify(json));
    //     console.log(DataFolderRoom);
    //     if (DataFolderRoom.dataString === "THANH_CONG") {
    //       // if (handleLogin) {
    //       //   handleLogin();
    //       //   SaveDataLogin(DataLoginUser);
    //       // }
    //     } else {
    //       alert("NetWork fail");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error + "fail");
    //   });
  }, []);

  const HandleGetFolderFromRoom = () => {
    props.dispatch({
      type: "Reset",
    });
    console.log("Reset");
    GetFolderFromRoom(props.IDRoom)
      .then((json) => {
        DataFolderRoom = JSON.parse(JSON.stringify(json));

        props.dispatch({
          type: "SetDataFolder",
          data: DataFolderRoom.data,
        });
        props.dispatch({
          type: "SetDataFile",
          dataFile: [],
        });
      })
      .catch((error) => {
        console.error(error + "fail");
      });
  };
  const handleClickFolder = (value) => {
    setValueDocument(true);

    setTempValue(value);

    props.dispatch({
      type: "SetBackAdd",
      data: value,
    });

    GetFolderAndFileFromFolder(value)
      .then((json) => {
        var DataFileFolder = JSON.parse(JSON.stringify(json));
        console.log(DataFileFolder.data);
        console.log(DataFileFolder.file);

        props.dispatch({
          type: "SetDataFolder",
          data: DataFileFolder.data,
        });

        props.dispatch({
          type: "SetDataFile",
          dataFile: DataFileFolder.file,
        });
      })
      .catch((error) => {
        console.error(error + "fail");
      });
    // props.dispatch({
    //     type: "SetDataFolder",
    //     data: DataFolderRoom.data,
    //   });
  };
  const HandleBack = (value) => {
    alert(value[0].id);
    props.dispatch({
      type: "Setback",
      IDFolder: value[0].id,
    });
    if (value.length >= 2) {
      if (value[1].id != "temp") {
        console.log(props.DataBack[1].id);
        GetFolderAndFileFromFolder(props.DataBack[1].id)
          .then((json) => {
            var DataFileFolder = JSON.parse(JSON.stringify(json));
            console.log(DataFileFolder.data);
            console.log(DataFileFolder.file);

            props.dispatch({
              type: "SetDataFolder",
              data: DataFileFolder.data,
            });

            props.dispatch({
              type: "SetDataFile",
              dataFile: DataFileFolder.file,
            });
          })
          .catch((error) => {
            console.error(error + "fail");
          });
      } else {
        HandleGetFolderFromRoom();
      }
    }
  };
  const handleRightClickFolder = () => {
    alert("Right Click");
  };
  //
  return (
    <div>
      <Scrollbars style={styles.wrapperDocument}>
        {/* <button onClick={HandleGetFolderFromRoom}>Room</button> */}
        <button onClick={() => HandleBack(props.DataBack)}>BACK</button>
        <div className="wrapperRooms">
          <div className="wrapperHeader">
            <div className="wrapperNameFolder">
              <p>Name + {props.DataBack.length}</p>
            </div>
            <div className="wrapperdiv"></div>
            <div className="wrapperOwner">
              <p>By ID</p>
            </div>
            <div className="wrapperTime">
              <p> Last Modified</p>
            </div>
          </div>

          {props.DataFolderRoom.map((e) => (
            <div
              className="wrapperFolder"
              key={e.ID}
              onClick={() => handleClickFolder(e.ID)}
              onContextMenu={() => handleRightClickFolder()}
            >
              <div className="wrapperNameFolder">
                <img className="wrapperImage" src={Folder} alt="user" />
                <p>{e.Name}</p>
              </div>
              <div className="wrapperdiv"></div>
              <div className="wrapperOwner">
                <p>{e.IDuser}</p>
              </div>
              <div className="wrapperTime">
                <p>{e.SendTime}</p>
              </div>
            </div>
          ))}

          <div className="wrapperHeaderFile"></div>

          {props.FileFromFolder.map((e) => (
            <div className="wrapperFile" key={e.ID}>
              <div className="wrapperNameFolder">
                <p>{e.name}</p>
              </div>
              <div className="wrapperdiv"></div>
              <div className="wrapperOwner">
                <p>{e.IDuser}</p>
              </div>
              <div className="wrapperTime">
                <p>{e.SendTime}</p>
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
    </div>
  );
}
var styles = {
  wrapperDocument: {
    width: 1700,
    height: 950,
    backgroundColor: "#E8E8E8",
  },
};
function mapStateToProps(state) {
  return {
    DataUser: state.DataUser,
    DataFolderRoom: state.DataFolderRoom,
    FileFromFolder: state.FileFromFolder,
    DataBack: state.DataBack,
    IDRoom: state.IDRoom,
  };
}
export default connect(mapStateToProps)(Document);
