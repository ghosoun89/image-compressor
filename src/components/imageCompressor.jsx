import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import imageCompression from "browser-image-compression";

class ImageCompressor extends Component {
  state = {
    CompressedLink:
      "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
    originalImage: "",
    originalLink: "",
    outputFileName: "",
    clicked: false,
    uploadImage: false,
  };

  onChangeHandler = e => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
      uploadImage: true,
    });
  };

  compressHandler = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    let outPut;
    imageCompression(this.state.originalImage, options).then((imageData) => {
      outPut = imageData;
      const downloadLink = URL.createObjectURL(outPut);
      this.setState({ CompressedLink: downloadLink});
    });

    this.setState({ clicked: true });
  };

  render() {
    return (
      <div className="m-5">
        <div className="text-light text-center">
          <h1>Three Simple Steps</h1>
          <h3>1. Upload Image</h3>
          <h3>2. Click on Compress</h3>
          <h3>3. Download Compressed Image</h3>
        </div>
        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            {this.state.uploadImage ? (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src={this.state.CompressedLink}
              ></Card.Img>
            )}
            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={e => this.onChangeHandler(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={(e) => this.compressHandler(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.CompressedLink}></Card.Img>
            {this.state.clicked ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default ImageCompressor;
