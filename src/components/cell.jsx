import React from "react";

function Cell({ value, handleClick }) {
    return (
        <div className="cell" onClick={handleClick}>
            {value}
        </div>
    )
}

export default Cell;