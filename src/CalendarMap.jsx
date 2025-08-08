import { Fragment, useEffect, useState } from "react"
import { SETTINGS } from "./constants";

//bhaskar.aggarwal@telusinternational.com
//bhaskaraggarwal794@gmail.com


const initializeMap = (days, time) => {

    let cMap = {};

    for (let i = 0; i < time; i++) {
        cMap[i] = {};
        for (let j = 0; j < days; j++) {
            cMap[i][j] = {
                cellState: SETTINGS.CELL_STATE.INITIAL
            };
        }
    }

    cMap[3][0] = {
        cellState: SETTINGS.CELL_STATE.FILLED,
        title: "title 1"
    }
    cMap[6][0] = {
        cellState: SETTINGS.CELL_STATE.FILLED,
        title: "title 1"
    }
    cMap[4][1] = {
        cellState: SETTINGS.CELL_STATE.FILLED,
        title: "title 1"
    }
    return cMap
}


export default function CalendarMap({ days = SETTINGS.DAYS, time = SETTINGS.time }) {
    const [cmap, setCMap] = useState(initializeMap(days, time));

    const dragStarted = (evt) => {
        const sourceEl = evt.target;
        console.log(sourceEl);
        // evt.dataTransfer.setData("")
    }

    const onDropped = (evt) => {
        console.log("dropped", evt);
    }

    const onDraggedOver = (evt) => {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = "move";
    }

    useEffect(() => {
        document.addEventListener('dragstart', dragStarted);
        document.addEventListener('drop', onDropped);

        return () => {
            document.removeEventListener('dragstart', dragStarted);
            document.removeEventListener('drop', onDropped);
        }
    });
    return <>
        <div className="cal-grid" >
            {Object.entries(cmap).map(([key, val], idx) => <div className="cal-row" key={idx}>
                {Object.entries(val).map(([cellKey, cellObj], cellIdx) => <div onDrop={onDropped} className="cal-col" key={`${idx}${cellIdx}`}>
                    <div onDragOver={onDraggedOver} className="cell-container" draggable style={{ backgroundColor: `var(${cellObj.cellState})` }}>
                        <h3>{cellObj.title}</h3>
                    </div>
                </div>)}
            </div>)}
        </div>
    </>
}