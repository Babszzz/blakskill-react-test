import React, { Fragment, useState } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideTimer, setSlideTimer] = useState(null);

  const [slideDuration] = useState(3000);

  function onNextClick() {
    if (activeIndex !== catalogs.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  }

  function onPreviousClick() {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(catalogs.length - 1);
    }
  }

  function slideChange(e) {
    const checked = e.target.checked;

    if (checked) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          if (prevIndex !== catalogs.length - 1) {
            return prevIndex + 1;
          }
          return 0;
        });
      }, slideDuration);

      setSlideTimer(interval);
    } else {
      if (slideTimer) {
        clearInterval(slideTimer);
        setSlideTimer(null);
      }
    }
  }

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex]?.image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={onPreviousClick}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs
                items={catalogs}
                setActiveIndex={setActiveIndex}
                currentIndex={activeIndex}
              />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={() => onNextClick()}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            type="checkbox"
            data-testid="toggle-slide-show-button"
            onClick={(e) => {
              slideChange(e);
            }}
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
