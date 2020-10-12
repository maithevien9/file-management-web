const Upload = async (formdata) => {
  // console.log(IDFolder + " = " + Token);
  //   var url = `http://192.168.137.64:8000/Upload/`;
  //   return fetch(url).then((response) => response.json());

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  return await fetch(
    "http://192.168.137.64:8000/upload/",
    requestOptions
  ).then((response) => response.json());
};

export default Upload;
