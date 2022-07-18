import React, { useState } from "react";
import DisplayGoogleChart from "../DisplayGoogleChart/DisplayGoogleChart";

const DisplayLineOfEffort = ({ linesOfEffort }) => {
    


    return (
        <div>
            {linesOfEffort.map((loe, index) => {
                return (
                    <div key={index}>
                        <h1>{loe.name}</h1>
                        <DisplayGoogleChart loe={loe} />
                    </div>
                );
            })}
        </div>
    );
};

export default DisplayLineOfEffort;
